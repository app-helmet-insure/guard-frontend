import BigNumber from 'bignumber.js'
import ERC20 from '../web3/abi/ERC20.json'
import StakingRewards from '../web3/abi/StakingRewards.json'
import ShortOptionAbi from '../web3/abi/ShortOption.json'
import {formatAmount, fromWei} from '../utils/format'
import {multicallClient, ClientContract} from '../web3/multicall'
import CalcAbi from '../web3/abi/Calc.json'
import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import {toWei} from 'web3-utils'
// 计算apr的合约
const CALC_ADDRESS = '0x4dFeCeE12bd7cA3899D26643F20C79F4a2147EBf'
const sameAddress = (address1, address2) => {
  if (address1.toLowerCase() === address2.toLowerCase()) {
    return [address1]
  }
  return [address1, address2]
}

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/sameepsi/quickswap03',
  cache: new InMemoryCache(),
})
// lpt的年奖励
const getVolume = async (miningPools, price, poolTotalSupply) => {
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
      const factory = new ClientContract(
        miningPools.factoryAbi,
        miningPools.factoryAddress,
        miningPools.networkId
      )
      const pairHourDatas = (res.data && res.data.pairHourDatas) || []
      return pairHourDatas.reduce((sum, i) => {
        sum = sum.plus(new BigNumber(i.hourlyVolumeUSD))
        return sum
      }, new BigNumber(0))
    }).catch(() => new BigNumber(0))

  const contract = new ClientContract(
    // '0x8782772E35e262Ba7f481DDDb015424Fc1aABC62',
    StakingRewards,
    '0xF5c305F9D817a462Fa0eCE578a552C3F05F58b40',
    miningPools.networkId
  )
  const [rewardRate, totalSupply] = await multicallClient([contract.rewardRate(), contract.totalSupply()])
    .then(res => {
      const [rewardRate_, totalSupply_] = res
      return [rewardRate_, totalSupply_]
    })
  // quick日产量  (rewardRate * 86400) / 10 ** 18
  const dayVolume =
    fromWei(new BigNumber(poolTotalSupply).div(new BigNumber(totalSupply)).multipliedBy(new BigNumber(rewardRate).multipliedBy(86400))) * price

  // 手续费 ： thegraph 查询结果 hourlyVolumeUSD 之和  乘以 24 乘以 0.003
  // debugger
  const fee = new BigNumber(poolTotalSupply).div(new BigNumber(totalSupply)).multipliedBy(volumeTotal.multipliedBy(0.003))
  return fee.plus(dayVolume)
}

// eslint-disable-next-line no-async-promise-executor
export const getMiningInfo = (pool, account) => new Promise(async resolve => {
  const staticPool = Object.assign({}, pool, {
    earned: '0',
    earned2: '0',
    totalSupply: '0',
    balanceOf: '0',
    allowance: '0',
    APR: '0',
    LPTStakeValue: '0',
    balance: '0'
  })
  if (pool.staticFinish) {
    resolve(staticPool)
    return
  }
  const pool_contract = new ClientContract(pool.abi, pool.address, pool.networkId)

  const totalSupply_ = await multicallClient([pool_contract.totalSupply()]).then(res => res[0])
  const currency_token = new ClientContract(ERC20.abi, pool.MLP, pool.networkId)
  const calc_contract = new ClientContract(CalcAbi, CALC_ADDRESS, pool.networkId)

  const promise_list = [
    pool_contract.begin(), // 开始时间
    pool_contract.totalSupply(), // 总抵押
  ]
  const now = new Date().getTime() / 1000
  const hasApr = totalSupply_ > 0 && (pool.dueDate > now || !pool.dueDate) && pool.address
  // 还没结束，算apr
  if (hasApr && pool.poolType === 3) {
    // sort
    promise_list.push(
      calc_contract.getShortApr(
        pool.address,
        sameAddress(pool.sort.collateral, pool.settleToken),
        sameAddress(pool.sort.underlying, pool.settleToken),
        sameAddress(pool.rewards1Address, pool.settleToken),
        pool.mineMountainAddress))

    // 有奖励2,取子池子的总量,【目前只有一个子池】
    if (pool.mdexReward && pool.childPools) {
      promise_list.push(
        calc_contract.getShortApr(
          pool.childPools[0].address,
          sameAddress(pool.sort.collateral, pool.settleToken),
          sameAddress(pool.sort.underlying, pool.settleToken),
          sameAddress(pool.rewards2Address, pool.settleToken),
          pool.mineMountainAddress))
    }
  } else if (pool.poolType === 2) {
    // LP  奖励1 apr
    promise_list.push(
      calc_contract.getLPTApr(
        pool.address,
        sameAddress(pool.reserve0, pool.settleToken),
        sameAddress(pool.rewards1Address, pool.settleToken),
        pool.mineMountainAddress))

    // 获取lp reserve0的价格
    promise_list.push(calc_contract.getPrice(sameAddress(pool.reserve0, pool.settleToken)))
    // 获取lpt的总抵押价值
    promise_list.push(calc_contract.getLPTStakeValue(pool.address, sameAddress(pool.reserve0, pool.settleToken)))
  }

  if (account) {
    promise_list.push(
      pool_contract.earned(account), // 奖励1
      pool_contract.balanceOf(account), // 我的抵押
      currency_token.allowance(account, pool.address),
      currency_token.balanceOf(account), // 余额
    )
    if (pool.rewards2) {
      promise_list.push(pool_contract.earned2(account))
    }
  }
  multicallClient(promise_list).then(async data => {
    const begin = data[0],
      totalSupply = data[1]
    if (begin === null) {
      // resolve(pool)
      return pool
    }

    let APR = 0,
      APR2 = 0,
      earned = 0,
      balanceOf = 0,
      allowance = 0,
      earned2 = 0,
      LPTStakeValue = 0,
      balance = 0

    if (hasApr && pool.poolType === 3) {
      if (pool.mdexReward) {
        // sort有奖励2的情况，取值顺序有变
        APR = data[2]
        APR2 = data[3]
        earned  = data[4]
        balanceOf = data[5]
        allowance = data[6]
        balance = data[7]
        earned2 = data[8]
      } else {
        APR = data[2]
        earned  = data[3]
        balanceOf = data[4]
        allowance = data[5]
        balance = data[6]
        earned2 = data[7]
      }
    } else if (pool.poolType === 2) {
      // lpt
      if (hasApr) {
        APR = data[2]
      }
      const reserve0Price = fromWei(data[3][0], data[3][1]).toString()
      LPTStakeValue = formatAmount(data[4], pool.settleTokenDecimal, 2)
      earned  = data[5]
      balanceOf = data[6]
      allowance = data[7]
      balance = data[8]
      earned2 = data[9]
      // 计算奖励2的apr
      // 日产量+手续费
      const volumeTotal = await getVolume(pool, reserve0Price, totalSupply)
      // 年奖励
      const totalRewardValue = volumeTotal.multipliedBy(new BigNumber(365))
      if (LPTStakeValue === '0' || !hasApr) {
        APR2 = 0
      } else {
        APR2 = toWei(String((totalRewardValue / LPTStakeValue).toFixed(18)))
      }
    } else {
      earned  = data[2]
      balanceOf = data[3]
      allowance = data[4]
      balance = data[5]
      earned2 = data[6]
    }
    const APR_ = fromWei(new BigNumber(APR).plus(new BigNumber(APR2)).toString(), 18).multipliedBy(100).toFixed(2)
    const newPool = Object.assign({}, pool, {
      start_at: pool.openDate > begin ? pool.openDate : begin,
      earned,
      earned2,
      balance: fromWei(balance, pool.mlpDecimal),
      totalSupply,
      balanceOf: fromWei(balanceOf, pool.mlpDecimal),
      allowance,
      APR: APR_,
      LPTStakeValue
    })
    resolve(newPool)
  })
})

/**
 * 获取sort抵押物以及标的物(获取结果放入配置)
 * @param miningPools
 */
export const getSortToken = miningPools => new Promise(reslove => {
  // short
  if (miningPools.poolType === 3) {
    const short = new ClientContract(ShortOptionAbi, miningPools.MLP, miningPools.networkId) // quick的合约
    multicallClient([
      short.underlying(), // 标的物
      short.collateral(), // 抵押物
    ])
      .then(data => {
        console.log('data', data)
        const [underlying, collateral] = data
        console.log('抵押物', collateral, '标的物', underlying)
        reslove({
          underlying,
          collateral
        })
      })
  }
})
