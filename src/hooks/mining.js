import React from 'react'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import ERC20 from '../web3/abi/ERC20.json'
import LPT from '../web3/abi/LPT.json'
import StakingRewards from '../web3/abi/StakingRewards.json'
import MDexPool from '../web3/abi/MDexPool.json'
import { fromWei, numToWei } from '../utils/format'
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
import { ApolloClient, gql, InMemoryCache } from '@apollo/client'

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
      currency_token.allowance(account, pool.address)
    )
    if (pool.rewards2) {
      promise_list.push(pool_contract.earned2(account))
    }
  }
  return multicallProvider.all(promise_list).then(data => {
    data = processResult(data)
    const [
      begin,
      totalSupply,
      earned = 0,
      balanceOf = 0,
      currency_allowance = 0,
      earned2 = 0,
    ] = data
    const newPool = Object.assign({}, pool, {
      start_at: pool.openDate > begin ? pool.openDate : begin,
      earned,
      earned2,
      totalSupply,
      balanceOf: fromWei(balanceOf, pool.mlpDecimal),
      allowance: currency_allowance,
    })
    return newPool
  })
}

export const getTotalRewards = miningPools => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(getRpcUrl(miningPools.networkId))
  )
  const contract = new web3.eth.Contract(miningPools.abi, miningPools.address)
  return contract.methods
    .rewards(ADDRESS_0)
    .call()
    .then(
      totalRewards =>
        // console.log('totalRewards', totalRewards)
        totalRewards
    )
}

export const getSpan = (address, abi, _chainId) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(getRpcUrl(_chainId)))
  const contract = new web3.eth.Contract(abi, address)
  return contract.methods
    .rewardsDuration()
    .call()
    .then(_span => _span)
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
    return multicallProvider.all([poolContract.totalSupply()]).then(data => {
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
    return multicallProvider.all(promise_list).then(data => {
      data = processResult(data)
      const [
        token0_address,
        token1_address,
        [_reserve0, _reserve1],
        totalSupply,
        poolTotalSupply,
      ] = data
      if (token_address.toLowerCase() === token0_address.toLowerCase()) {
        return new BigNumber(_reserve0)
          .multipliedBy(new BigNumber(2))
          .multipliedBy(
            new BigNumber(poolTotalSupply).div(new BigNumber(totalSupply))
          )
      }
      if (token_address.toLowerCase() === token1_address.toLowerCase()) {
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
    return multicallProvider
      .all([
        poolContract.totalSupply(),
        collateral.balanceOf(address),
        short.totalSupply(),
      ])
      .then(data => {
        data = processResult(data)
        const [poolTotalSupply, shortAmount, tokenTotalSupply] = data
        // console.log('poolTotalSupply, shortAmount, tokenTotalSupply', poolTotalSupply, shortAmount, tokenTotalSupply)
        return new BigNumber(poolTotalSupply)
          .div(new BigNumber(shortAmount))
          .multipliedBy(tokenTotalSupply)
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
    const factory = new Contract(
      miningPools.factoryAddress,
      miningPools.factoryAbi
    ) // MDEX_FACTORY_ADDRESS(_chainId), MDexFactory
    const promise_list = [factory.getPair(address1_, address2_)]
    return multicallProvider
      .all(promise_list)
      .then(data => {
        const [pair_address] = processResult(data)
        // console.log('pair_address', pair_address)
        const pair_contract = new Contract(pair_address, LPT)
        const mdex_router_contract = new Contract(
          miningPools.routerAddress,
          miningPools.routerAbi
        )
        const promiseList = [
          pair_contract.token0(),
          pair_contract.token1(),
          pair_contract.getReserves(),
        ]

        // console.log('request___4')
        return multicallProvider.all(promiseList).then(promiseListData => {
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
              .then(amountOutData => {
                const [amountOut] = processResult(amountOutData)
                return fromWei(
                  amountOut,
                  miningPools.settleTokenDecimal
                ).toString()
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
              .then(amountOutData => {
                const [amountOut] = processResult(amountOutData)
                return fromWei(
                  amountOut,
                  miningPools.settleTokenDecimal
                ).toString()
              })
          }
        })
      })
      .catch(e => {})
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
      // console.log('_price', _price)
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

export const getAPR = async (miningPools, mode = 1) => {
  const dataRPCList = [
    getAllowance(miningPools), // 获取奖励1在矿山的总量,矿山授权矿池的额度
    getTotalRewards(miningPools), // 获取奖励1未发放的量
    getLTPValue(
      miningPools.MLP,
      miningPools.valueAprToken,
      miningPools.address,
      miningPools.abi,
      miningPools
    ), // 矿池总的LPT的价值
  ]

  if (miningPools.valueAprToken !== miningPools.settleToken) {
    dataRPCList.push(
      getMDexPrice(
        miningPools.valueAprToken,
        miningPools.settleToken,
        1,
        miningPools.valueAprPath,
        miningPools
      )
    )
  }
  const data = await Promise.all(dataRPCList)
  const [allowance, unClaimReward, lptValue, MDexPrice] = data

  // 计算奖励的量
  const reward1Vol = new BigNumber(allowance)
    .minus(new BigNumber(unClaimReward))
    .toString()

  let lptTotalValue
  if (miningPools.valueAprToken !== miningPools.settleToken) {
    const [lptTotalPrice] = MDexPrice
    // console.log('lptTotalPrice', miningPools.name, lptTotalPrice, lptValue)
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

  // 价格*量 = 奖励总价值
  const rewardsTotalValue = new BigNumber(rewardsTotalPrice)
    .multipliedBy(new BigNumber(reward1Vol))
    .toString()
  // console.log('reward1Vol', reward1Vol)

  const span = await getSpan(
    miningPools.address,
    miningPools.abi,
    miningPools.networkId
  )

  // console.log('span', span)
  // 奖励1的价值
  // const reward1 = useRewardsValue(reward1_address, WAR_ADDRESS(chainId), yearReward)

  // console.log('lptTotalValue',miningPools.name, lptTotalValue, rewardsTotalValue, span, mode)
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
    } else if (mode === 2) {
      // APY
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
const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/sameepsi/quickswap03',
  cache: new InMemoryCache(),
})
const getVolume = async (miningPools, price) => {
  const query = gql`
    {
      pairHourDatas(
        first: 24
        where: { pair: "0xd2eeeedfcaf1457f7bc9cba28d5316f73bb83b49" }
        orderBy: hourStartUnix
        orderDirection: desc
      ) {
        hourlyVolumeUSD
      }
    }
  `
  const volumeTotal = await client
    .query({
      query,
    })
    .then(res => {
      const factory = new Contract(
        miningPools.factoryAddress,
        miningPools.factoryAbi
      )
      const pairHourDatas = (res.data && res.data.pairHourDatas) || []
      return pairHourDatas.reduce((sum, i) => {
        sum = sum.plus(new BigNumber(i.hourlyVolumeUSD))
        return sum
      }, new BigNumber(0))
    })

  const multicallProvider = getOnlyMultiCallProvider(miningPools.networkId)
  const contract = new Contract(
    '0x8782772E35e262Ba7f481DDDb015424Fc1aABC62',
    StakingRewards
  )
  const rewardRate = await multicallProvider
    .all([contract.rewardRate()])
    .then(res => {
      const [rewardRate_] = processResult(res)
      return rewardRate_
    })
  // quick日产量  (rewardRate * 86400) / 10 ** 18
  const dayVolume =
    fromWei(new BigNumber(rewardRate).multipliedBy(86400)) * price

  // 手续费 ： thegraph 查询结果 hourlyVolumeUSD 之和  乘以 24 乘以 0.003
  const fee = volumeTotal.multipliedBy(0.003)
  return fee.plus(dayVolume)
}

export const getMdxARP = async miningPools => {
  // mdx 年释放总量 * 价值 /
  const multicallProvider = getOnlyMultiCallProvider(miningPools.networkId)
  const lptValue = await getLTPValue(
    miningPools.MLP,
    miningPools.settleToken,
    miningPools.address,
    miningPools.abi,
    miningPools
  )

  // console.log('lptValue__', lptValue)
  const [mdex2warPrice] = await getMDexPrice(
    miningPools.rewards2Address,
    miningPools.settleToken,
    1,
    miningPools.rewardsAprPath,
    miningPools
  )
  // console.log('mdex2warPrice', mdex2warPrice)

  // 日产量+手续费
  const volumeTotal = await getVolume(miningPools, mdex2warPrice)

  // console.log('volumeTotal', volumeTotal.toString())

  let apr = '0'
  if (lptValue > 0 && mdex2warPrice > 0) {
    const contract = new Contract(miningPools.MLP, LPT)
    const pool_contract = new Contract(miningPools.address, miningPools.abi)
    const promiseList = [contract.totalSupply(), pool_contract.totalSupply()]
    await multicallProvider.all(promiseList).then(data => {
      data = processResult(data)
      const [tokenTotalSupply, totalSupply] = data
      // const radio = new BigNumber(totalSupply).div(new BigNumber(volumeTotal))
      const totalRewardValue = volumeTotal
        .multipliedBy(new BigNumber(365))
        .multipliedBy(
          new BigNumber(totalSupply).div(new BigNumber(tokenTotalSupply))
        )
      apr = totalRewardValue
        .div(fromWei(lptValue, miningPools.settleTokenDecimal))
        .toString()
    })
  }
  return {
    apr,
    lptValue,
  }
}
