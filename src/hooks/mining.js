import React, {useState, useMemo, useContext} from 'react'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import { useActiveWeb3React, useBlockHeight } from '../web3'
import ERC20 from '../web3/abi/ERC20.json'
import LPT from '../web3/abi/LPT.json'
import MDexFactory from '../web3/abi/MDexFactory.json'
import MDexPool from '../web3/abi/MDexPool.json'
import MDexRouter from '../web3/abi/MDexRouter.json'
import { numToWei } from '../utils/format'
import Mining from '../configs/mining'
import { processResult, getOnlyMultiCallProvider } from '../web3/multicall'
import { Contract } from 'ethers-multicall-x'
import {VarContext} from '../context'
import {
  ChainId,
  ADDRESS_0,
  WAR_ADDRESS,
  USDT_ADDRESS,
  MINE_MOUNTAIN_ADDRESS,
  MDEX_POOL_ADDRESS,
  MDEX_ADDRESS,
  MDEX_ROUTER_ADDRESS,
  MDEX_FACTORY_ADDRESS,
  getRpcUrl,
} from '../web3/address'
import { useAllowance } from './wallet'

export const useMiningInfo = (address = '') => {
  const { account } = useActiveWeb3React()
  // const blockHeight = useBlockHeight()
  const {blockHeight} = useContext(VarContext)
  const pool = Mining.find(o => o.address === address)

  const now = parseInt(Date.now() / 1000)

  const [miningPoolsInfo, setMiningPoolsInfo] = useState(pool)

  useMemo(() => {
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
    multicallProvider
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
        const newPool = Object.assign({}, pool, {
          start_at: begin,
          earned,
          earned2,
          totalSupply,
          balanceOf: Web3.utils.fromWei(String(balanceOf), 'ether'),
          allowance: currency_allowance,
        })
        setMiningPoolsInfo(newPool)
      })

  }, [account, address, blockHeight])
  return miningPoolsInfo
}

export const useTotalRewards = (address, abi, _chainId) => {
  const [total, setTotal] = useState(0)
  const { blockHeight } = useContext(VarContext)
  var web3 = new Web3(new Web3.providers.HttpProvider(getRpcUrl(_chainId)))
  const contract = new web3.eth.Contract(abi, address)
  useMemo(() => {
    if (address) {
      contract.methods
        .rewards(ADDRESS_0)
        .call()
        .then((_total) => {
          setTotal(_total)
        })
    }
    return () => {}
  }, [blockHeight])
  return total
}

export const useSpan = (address, abi, _chainId) => {
  const [span, setSpan] = useState(0)
  const { blockHeight } = useContext(VarContext)
  useMemo(() => {
    if (address) {
      var web3 = new Web3(new Web3.providers.HttpProvider(getRpcUrl(_chainId)))
      const contract = new web3.eth.Contract(abi, address)
      contract.methods
        .rewardsDuration()
        .call()
        .then((_span) => {
          setSpan(_span)
        })
    }
    return () => {}
  }, [blockHeight])
  return span
}

/**
 * 获取ltp的价值
 * @param address
 */
export const useLTPValue = (
  address,
  token_address,
  pool_address,
  pool_abi,
  _chainId
) => {
  const [value, setValue] = useState(0)
  const { blockHeight } = useContext(VarContext)
  useMemo(() => {
    if (pool_address) {
      const multicallProvider = getOnlyMultiCallProvider(_chainId)

      const pool_contract = new Contract(pool_address, pool_abi)

      const contract = new Contract(address, LPT)

      const promise_list = [
        contract.token0(),
        contract.token1(),
        contract.getReserves(),
        contract.totalSupply(),
        pool_contract.totalSupply(),
      ]
      multicallProvider
        .all(promise_list)
        .then((data) => {
          data = processResult(data)
          const [
            token0_address,
            token1_address,
            [_reserve0, _reserve1],
            totalSupply,
            poolTotalSupply,
          ] = data
          if (token_address == token0_address) {
            setValue(
              new BigNumber(_reserve0)
                .multipliedBy(new BigNumber(2))
                .multipliedBy(
                  new BigNumber(poolTotalSupply).div(new BigNumber(totalSupply))
                )
            )
          } else if (token_address == token1_address) {
            setValue(
              new BigNumber(_reserve1)
                .multipliedBy(new BigNumber(2))
                .multipliedBy(
                  new BigNumber(poolTotalSupply).div(new BigNumber(totalSupply))
                )
            )
          }
        })
        .catch((e) => {
          // 报错默认是token
          multicallProvider.all([pool_contract.totalSupply()]).then((data) => {
            data = processResult(data)
            const [poolTotalSupply] = data
            setValue(new BigNumber(poolTotalSupply))
          })
        })
    }
    return () => {}
  }, [blockHeight])
  return value
}

export const useMDexPrice = (
  address1,
  address2,
  amount = 1,
  path = [],
  _chainId
) => {
  const FEE_RADIO = '0.003'
  const blockHeight = useBlockHeight()
  const [price, setPrice] = useState(0)
  const [fee, setFee] = useState(0)

  const multicallProvider = getOnlyMultiCallProvider(_chainId)
  const getPairPrice = (address1, address2, amount) => {
    const factory = new Contract(MDEX_FACTORY_ADDRESS(_chainId), MDexFactory)
    const promise_list = [factory.getPair(address1, address2)]

    // console.log('request___3')
    return multicallProvider.all(promise_list).then((data) => {
      let [pair_address] = processResult(data)
      const pair_contract = new Contract(pair_address, LPT)
      const mdex_router_contract = new Contract(MDEX_ROUTER_ADDRESS, MDexRouter)
      const promiseList = [
        pair_contract.token0(),
        pair_contract.token1(),
        pair_contract.getReserves(),
      ]

      // console.log('request___4')
      return multicallProvider.all(promiseList).then((promiseListData) => {
        const [token0, token1, getReserves] = promiseListData
        const { _reserve0, _reserve1 } = getReserves
        const mdexRouterList1 = [
          mdex_router_contract.getAmountOut(
            numToWei(amount),
            _reserve1,
            _reserve0
          ),
        ]
        const mdexRouterList2 = [
          mdex_router_contract.getAmountOut(
            numToWei(amount),
            _reserve0,
            _reserve1
          ),
        ]

        // console.log('request___5')
        if (token0.toLowerCase() == address2.toLowerCase()) {
          return multicallProvider
            .all(mdexRouterList1)
            .then((amountOutData) => {
              let [amountOut] = processResult(amountOutData)
              return Web3.utils.fromWei(amountOut, 'ether')
            })
        } else if (token1.toLowerCase() == address2.toLowerCase()) {
          // console.log(numToWei(amount), _reserve0, _reserve1)
          return multicallProvider
            .all(mdexRouterList2)
            .then((amountOutData) => {
              let [amountOut] = processResult(amountOutData)
              return Web3.utils.fromWei(amountOut, 'ether')
            })
        }
      })
    })
  }

  const getPrice = async (address1, address2, amount, path, _chainId) => {
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

  useMemo(() => {
    if (Web3.utils.isAddress(address1) && amount > 0 && blockHeight > 0) {
      // use path
      getPrice(address1, address2, amount, path, _chainId).then(
        ([_price, _fee]) => {
          setPrice(_price)
          setFee(_fee)
        }
      )
    }
    return () => {}
  }, [blockHeight, address1, address2, amount])
  if (amount == 0) return ['0', '0']

  return [price, fee]
}

export const useAPR = (
  pool_address,
  pool_abi,
  lpt_address,
  reward1_address,
  valueAprToken,
  valueAprPath,
  rewardsAprPath,
  settleToken,
  mode = 1,
  _chainId
) => {
  const { blockHeight } = useContext(VarContext)
  // const [yearReward, setYearReward] = useState(0)
  const [apr, setApr] = useState(0)

  const [reward1Vol, setReward1Vol] = useState('0')
  const [rewardsTotalValue, setRewardsTotalValue] = useState('0')
  const [lptTotalValue, setLptTotalValue] = useState('0')

  // 获取奖励1在矿山的总量
  const allowance = useAllowance(
    reward1_address,
    pool_address,
    MINE_MOUNTAIN_ADDRESS(_chainId),
    _chainId
  )

  // 获取奖励1未发放的量
  const unClaimReward = useTotalRewards(pool_address, pool_abi, _chainId)

  const span = useSpan(pool_address, pool_abi, _chainId)

  // 奖励1的价值
  // const reward1 = useRewardsValue(reward1_address, WAR_ADDRESS(chainId), yearReward)

  // 矿池总的LPT的价值
  const lptValue = useLTPValue(
    lpt_address,
    valueAprToken,
    pool_address,
    pool_abi,
    _chainId
  )

  // 通过转换后的lpt价格
  const [lptTotalPrice] = useMDexPrice(
    valueAprToken,
    settleToken,
    1,
    valueAprPath,
    _chainId
  )

  // 奖励转换后的价格
  const [rewardsTotalPrice] = useMDexPrice(
    reward1_address,
    settleToken,
    1,
    rewardsAprPath,
    _chainId
  )

  useMemo(() => {
    setLptTotalValue(
      new BigNumber(lptTotalPrice)
        .multipliedBy(new BigNumber(lptValue))
        .toString()
    )
  }, [lptTotalPrice])

  useMemo(() => {
    setRewardsTotalValue(
      new BigNumber(rewardsTotalPrice)
        .multipliedBy(new BigNumber(reward1Vol))
        .toString()
    )
  }, [rewardsTotalPrice])

  // 计算奖励的量
  useMemo(() => {
    if (allowance && pool_address) {
      const reward1_vol = new BigNumber(allowance).minus(
        new BigNumber(unClaimReward)
      )
      setReward1Vol(reward1_vol.toString())
    }
  }, [allowance, unClaimReward, _chainId])

  useMemo(() => {
    if (lptTotalValue && rewardsTotalValue && span > 0) {
      const dayRate = new BigNumber(1).div(
        new BigNumber(span).div(new BigNumber(86400))
      )

      if (mode === 1) {
        // 奖励的war
        const yearReward = dayRate
          .multipliedBy(new BigNumber(rewardsTotalValue))
          .multipliedBy(new BigNumber(365))
          .toFixed(0, 1)
        // setYearReward(yearReward)
        if (yearReward > 0) {
          const _arp = new BigNumber(yearReward)
            .div(new BigNumber(lptTotalValue))
            .toString()
          setApr(_arp)
        }
      } else if (mode === 2) {
        const _arp = dayRate
          .multipliedBy(new BigNumber(rewardsTotalValue))
          .dividedBy(new BigNumber(lptTotalValue))
          .plus(new BigNumber(1))
          .exponentiatedBy(new BigNumber(365))
        if (_arp > 0) {
          setApr(_arp)
        }
      }
    }
    return () => {}
  }, [span, lptTotalValue, rewardsTotalValue, blockHeight])
  return apr
}

export const useMdxARP = (
  pool_address,
  pool_abi,
  lpt_address,
  _chainId,
  daily,
  pid
) => {
  // mdx 年释放总量 * 价值 /
  const multicallProvider = getOnlyMultiCallProvider(_chainId)
  const [apr, setApr] = useState(0)
   const { blockHeight } = useContext(VarContext)

  const lptValue = useLTPValue(
    lpt_address,
    WAR_ADDRESS(ChainId.HECO),
    pool_address,
    pool_abi,
    _chainId
  )
  const [mdex2warPrice, mdex2warPriceFee] = useMDexPrice(
    MDEX_ADDRESS,
    WAR_ADDRESS(ChainId.HECO),
    daily,
    [USDT_ADDRESS(ChainId.HECO)],
    _chainId // 取价格的chainId只有在HECO上有
  )
  useMemo(() => {
    if (pool_address && lptValue > 0 && mdex2warPrice > 0) {
      const contract = new Contract(MDEX_POOL_ADDRESS, MDexPool)
      const pool_contract = new Contract(pool_address, pool_abi)
      const promiseList = [contract.poolInfo(pid), pool_contract.totalSupply()]
      // console.log('request___2')
      multicallProvider.all(promiseList).then((data) => {
        data = processResult(data)
        const [poolInfo, totalSupply] = data
        const totalAmount = poolInfo[5]
        const radio = new BigNumber(totalSupply).div(new BigNumber(totalAmount))
        const totalRewardValue = radio
          .multipliedBy(new BigNumber(numToWei(mdex2warPrice)))
          .multipliedBy(new BigNumber(365))
        const apr = totalRewardValue.div(lptValue).toString()
        setApr(apr)
      })
    }
  }, [lptValue, mdex2warPrice, blockHeight])
  return apr
}

