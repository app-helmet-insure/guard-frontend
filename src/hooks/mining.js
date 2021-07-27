import React from 'react'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import ERC20 from '../web3/abi/ERC20.json'
import LPT from '../web3/abi/LPT.json'
import MDexPool from '../web3/abi/MDexPool.json'
import { numToWei } from '../utils/format'
import Mining from '../configs/mining'
import { processResult, getOnlyMultiCallProvider } from '../web3/multicall'
import { Contract } from 'ethers-multicall-x'
import {
  ADDRESS_0,
  MDEX_POOL_ADDRESS,
  MDEX_ADDRESS,
  getRpcUrl,
} from '../web3/address'
import { getAllowance } from './wallet'

export const getMiningInfo = (address, account) => {
  // const blockHeight = useBlockHeight()
  const pool = Mining.find(o => o.address === address)
  const multicallProvider = getOnlyMultiCallProvider(pool.networkId)
  const pool_contract = new Contract(pool.address, pool.abi)
  const currency_token = new Contract(pool.MLP, ERC20.abi)
  const promise_list = [
    pool_contract.begin(), // 开始时间
    pool_contract.totalSupply(), // 总抵押
  ]
  if (account) {
    promise_list.push(
      pool_contract.earned(account), // 奖励1
      pool_contract.balanceOf(account), // 我的抵押
      currency_token.allowance(account, pool.address),
    )
    if (pool.rewards2) {
      promise_list.push(pool_contract.earned2(account))
    }
  }
  return multicallProvider
    .all(promise_list)
    .then(data => {
      data = processResult(data)
      const [
        begin,
        totalSupply,
        earned = 0,
        balanceOf = 0,
        currency_allowance = 0,
        earned2 = 0,
      ] = data
      // console.log('begin', begin)
      const newPool = Object.assign({}, pool, {
        start_at: begin,
        earned,
        earned2,
        totalSupply,
        balanceOf: Web3.utils.fromWei(String(balanceOf), 'ether'),
        allowance: currency_allowance,
      })
      return newPool
    })
}

export const getTotalRewards = (miningPools) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(getRpcUrl(miningPools.networkId)))
  const contract = new web3.eth.Contract(miningPools.abi, miningPools.address)
  return contract.methods
    .rewards(ADDRESS_0)
    .call()
    .then((totalRewards) => {
      // console.log('totalRewards', totalRewards)
      return totalRewards
    })
}

export const getSpan = (address, abi, _chainId) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(getRpcUrl(_chainId)))
  const contract = new web3.eth.Contract(abi, address)
  return contract.methods
    .rewardsDuration()
    .call()
    .then((_span) => {
      return _span
    })
}

/**
 * 获取ltp的价值
 * @param address
 */
export const getLTPValue = (
  address,
  token_address,
  pool_address,
  pool_abi,
  miningPools
) => {
  const multicallProvider = getOnlyMultiCallProvider(miningPools.networkId)
  const poolContract = new Contract(pool_address, pool_abi)

  if (miningPools.poolType === 1) {
    // 报错默认是token
    return multicallProvider.all([poolContract.totalSupply()]).then((data) => {
      data = processResult(data)
      const [poolTotalSupply] = data
      // console.log('poolTotalSupply', poolTotalSupply)
      return new BigNumber(poolTotalSupply)
    })
  }

  // lpt
  if (miningPools.poolType === 2) {
    const contract = new Contract(address, LPT)
    const promise_list = [
      contract.token0(),
      contract.token1(),
      contract.getReserves(),
      contract.totalSupply(),
      poolContract.totalSupply(),
    ]
    return multicallProvider
      .all(promise_list)
      .then((data) => {
        data = processResult(data)
        debugger
        const [
          token0_address,
          token1_address,
          [_reserve0, _reserve1],
          totalSupply,
          poolTotalSupply,
        ] = data
        if (token_address === token0_address) {
          return new BigNumber(_reserve0)
            .multipliedBy(new BigNumber(2))
            .multipliedBy(
              new BigNumber(poolTotalSupply).div(new BigNumber(totalSupply))
            )
        }
        if (token_address === token1_address) {
          return new BigNumber(_reserve1)
            .multipliedBy(new BigNumber(2))
            .multipliedBy(
              new BigNumber(poolTotalSupply).div(new BigNumber(totalSupply))
            )
        }
        return 0
      })
  }
  // short
  if (miningPools.poolType === 3) {
    const collateral = new Contract(token_address, ERC20.abi) // quick的合约
    const short = new Contract(address, ERC20.abi) // quick的合约
    return multicallProvider.all([poolContract.totalSupply(), collateral.balanceOf(address), short.totalSupply()]).then((data) => {
      data = processResult(data)
      const [poolTotalSupply, shortAmount, tokenTotalSupply] = data
      console.log('poolTotalSupply, shortAmount, tokenTotalSupply', poolTotalSupply, shortAmount, tokenTotalSupply)
      return new BigNumber(poolTotalSupply).div(new BigNumber(shortAmount)).multipliedBy(tokenTotalSupply)
    })
  }
}

export const getMDexPrice = (
  address1,
  address2,
  amount = 1,
  path = [],
  miningPools
) => {
  if (amount === 0) return ['0', '0']
  const FEE_RADIO = '0.003'

  const multicallProvider = getOnlyMultiCallProvider(miningPools.networkId)
  const getPairPrice = (address1_, address2_, amount_) => {
    const factory = new Contract(miningPools.factoryAddress, miningPools.factoryAbi) // MDEX_FACTORY_ADDRESS(_chainId), MDexFactory
    const promise_list = [factory.getPair(address1_, address2_)]
    return multicallProvider.all(promise_list).then((data) => {
      const [pair_address] = processResult(data)
      // console.log('pair_address', pair_address)
      const pair_contract = new Contract(pair_address, LPT)
      const mdex_router_contract = new Contract(miningPools.routerAddress, miningPools.routerAbi)
      const promiseList = [
        pair_contract.token0(),
        pair_contract.token1(),
        pair_contract.getReserves(),
      ]

      // console.log('request___4')
      return multicallProvider.all(promiseList).then((promiseListData) => {
        const [token0, token1, getReserves] = promiseListData
        const { _reserve0, _reserve1 } = getReserves
        // console.log('request___5')
        if (token0.toLowerCase() == address2.toLowerCase()) {
          const mdexRouterList1 = [
            mdex_router_contract.getAmountOut(
              numToWei(amount_),
              _reserve1,
              _reserve0
            ),
          ]
          return multicallProvider
            .all(mdexRouterList1)
            .then((amountOutData) => {
              const [amountOut] = processResult(amountOutData)
              return Web3.utils.fromWei(amountOut, 'ether')
            })
        } else if (token1.toLowerCase() == address2.toLowerCase()) {
          // console.log(numToWei(amount), _reserve0, _reserve1)
          const mdexRouterList2 = [
            mdex_router_contract.getAmountOut(
              numToWei(amount),
              _reserve0,
              _reserve1
            ),
          ]
          return multicallProvider
            .all(mdexRouterList2)
            .then((amountOutData) => {
              const [amountOut] = processResult(amountOutData)
              return Web3.utils.fromWei(amountOut, 'ether')
            })
        }
      })
    }).catch(e => {
      console.log('eee', e)
    })
  }

  const getPrice = async () => {
    const _path = [address1, ...path, address2]
    let _price = 0
    _price = amount
    let _fee = '0'
    let _fee_amount = amount.toString()
    for (let i = 1; i < _path.length; i++) {
      const from_address = _path[i - 1]
      const to_address = _path[i]
      _price = await getPairPrice(from_address, to_address, _price)
      // _fee = _fee + _fee_amount * FEE_RADIO
      // _fee_amount = _fee_amount - _fee_amount * FEE_RADIO
      _fee = new BigNumber(_fee)
        .plus(new BigNumber(_fee_amount).multipliedBy(new BigNumber(FEE_RADIO)))
        .toString()
      _fee_amount = new BigNumber(_fee_amount)
        .minus(
          new BigNumber(_fee_amount).multipliedBy(new BigNumber(FEE_RADIO))
        )
        .toString()
    }
    return [_price, _fee]
  }

  return getPrice()
}


export const getAPR = async (
  miningPools,
  mode = 1,
) => {
  // 获取奖励1在矿山的总量,矿山授权矿池的额度
  const allowance = await getAllowance(miningPools)
  // console.log('apr_allowance', allowance)

  // 获取奖励1未发放的量
  const unClaimReward = await getTotalRewards(miningPools)
  // console.log('unClaimReward', unClaimReward)

  // 计算奖励的量
  const reward1Vol = new BigNumber(allowance).minus(new BigNumber(unClaimReward)).toString()
  // console.log('reward1Vol', reward1Vol, unClaimReward)
  // 矿池总的LPT的价值
  const lptValue = await getLTPValue(
    miningPools.MLP,
    miningPools.valueAprToken,
    miningPools.address,
    miningPools.abi,
    miningPools
  )
  // console.log('lptValue', lptValue)

  // 通过转换后的lpt价格
  let lptTotalValue
  if(miningPools.valueAprToken !== miningPools.settleToken){
    const [lptTotalPrice] =  await getMDexPrice(
      miningPools.valueAprToken,
      miningPools.settleToken,
      1,
      miningPools.valueAprPath,
      miningPools
    )
    // console.log('lptTotalPrice', lptTotalPrice)

    lptTotalValue = new BigNumber(lptTotalPrice)
      .multipliedBy(new BigNumber(lptValue))
      .toString()
  } else {
    lptTotalValue = lptValue
  }


  // 奖励转换后的价格
  const [rewardsTotalPrice] = await getMDexPrice(
    miningPools.rewards1Address,
    miningPools.settleToken,
    1,
    miningPools.rewardsAprPath,
    miningPools
  )
  // console.log('rewardsTotalPrice', rewardsTotalPrice)

  // 价格*量 = 总价值
  const rewardsTotalValue = new BigNumber(rewardsTotalPrice)
    .multipliedBy(new BigNumber(reward1Vol))
    .toString()
  // console.log('reward1Vol', reward1Vol)

  const span = await getSpan(miningPools.address, miningPools.abi, miningPools.networkId)
  // console.log('span', span)
  // 奖励1的价值
  // const reward1 = useRewardsValue(reward1_address, WAR_ADDRESS(chainId), yearReward)

  // console.log('lptTotalValue', lptTotalValue, rewardsTotalValue, span, mode)
  let apr = '0'
  if (lptTotalValue && rewardsTotalValue && span > 0) {
    const dayRate = new BigNumber(1).div(
      new BigNumber(span).div(new BigNumber(86400))
    )
    // 普通模式
    if (mode === 1) {
      // 年奖励率
      const yearReward = dayRate
        .multipliedBy(new BigNumber(rewardsTotalValue))
        .multipliedBy(new BigNumber(365))
        .toFixed(0, 1)
      // setYearReward(yearReward)
      if (yearReward > 0) {
        const _arp = new BigNumber(yearReward)
          .div(new BigNumber(lptTotalValue))
          .toString()
        apr = _arp
        // console.log('apr', apr)
      }
    } else if (mode === 2) { // APY
      // 利滚利模式
      // console.log('rewardsTotalValue,', rewardsTotalValue)
      const _arp = dayRate
        .multipliedBy(new BigNumber(rewardsTotalValue))
        .dividedBy(new BigNumber(lptTotalValue))
        .plus(new BigNumber(1))
        .exponentiatedBy(new BigNumber(365))
      if (_arp > 0) {
        apr = _arp
      }
    }
  }
  return apr
}

export const getMdxARP = async (miningPools) => {
  // mdx 年释放总量 * 价值 /
  const multicallProvider = getOnlyMultiCallProvider(miningPools.networkId)
  const lptValue = await getLTPValue(
    miningPools.MLP,
    miningPools.quickToken,
    miningPools.address,
    miningPools.abi,
    miningPools
  )

  // console.log('lptValue__', lptValue)


  const [mdex2warPrice] = getMDexPrice(
    MDEX_ADDRESS,
    miningPools.quickToken,
    miningPools.mdexDaily,
    miningPools.rewardsAprPath,
    miningPools.networkId, // 取价格的chainId只有在HECO上有
    miningPools
  )
  // console.log('mdex2warPrice', mdex2warPrice)

  let apr = '0'
  if (lptValue > 0 && mdex2warPrice > 0) {
    const contract = new Contract(MDEX_POOL_ADDRESS, MDexPool)
    const pool_contract = new Contract(miningPools.address, miningPools.abi)
    const promiseList = [contract.poolInfo(miningPools.mdexPid), pool_contract.totalSupply()]
    multicallProvider.all(promiseList).then((data) => {
      data = processResult(data)
      const [poolInfo, totalSupply] = data
      const totalAmount = poolInfo[5]
      const radio = new BigNumber(totalSupply).div(new BigNumber(totalAmount))
      const totalRewardValue = radio
        .multipliedBy(new BigNumber(numToWei(mdex2warPrice)))
        .multipliedBy(new BigNumber(365))
      apr = totalRewardValue.div(lptValue).toString()
    })
  }
  return apr
}

