import BigNumber from 'bignumber.js'
import {formatAmount, fromWei, numToWei} from '../utils/format'
import {Contract} from 'ethers-multicall-x'
import ERC20 from '../web3/abi/ERC20.json'
import {getOnlyMultiCallProvider, processResult} from '../web3/multicall'
import {getContract} from '../web3'
import Erc20ABI from '../web3/abi/ERC20.json'
import {getGasPrice} from '../utils'
import {ADDRESS_INFINITY} from '../web3/address'

export const getPoolInfo = (pool, account) => {
  const poolContract = new Contract(pool.address, pool.abi)
  const promiseList = [
    poolContract.price(),
    poolContract.totalPurchasedCurrency(),
    poolContract.purchasedCurrencyOf(account),
    poolContract.settleable(account),
    poolContract.totalSettledUnderlying(),
    poolContract.maxUser(),
    poolContract.curUserCount(),
    poolContract.amtLow(),
    poolContract.amtHigh(),
    poolContract.offerBegin(), // start time
    poolContract.time(), // end time
    poolContract.timeSettle(), // claim time
  ]
  if (pool.airdrop) {
    const airdropContract = new Contract(pool.airdrop.address, pool.airdrop.abi)
    promiseList.push(airdropContract.allowList(account))
    promiseList.push(airdropContract.withdrawList(account))
    promiseList.push(airdropContract.begin())
  }
  if (pool.currency.is_ht) {
    // get chain underlying asset
  } else {
    const currencyContract = new Contract(pool.currency.address, ERC20.abi)
    promiseList.push(currencyContract.allowance(account, pool.address))
    promiseList.push(currencyContract.balanceOf(account))

  }
  const multicallProvider = getOnlyMultiCallProvider(pool.networkId)
  return multicallProvider
    .all(promiseList).then(res => {
      const resData = processResult(res)
      const [
        price,
        totalPurchasedCurrency,
        purchasedCurrencyOf,
        // totalSettleable,
        settleable,
        totalSettledUnderlying,
        maxUser,
        curUserCount,
        amtLow,
        amtHigh,
        startTime,
        endTime,
        claimTime
      ] = resData
      let allowList,
        withdrawList,
        airdropBegin,
        currency_allowance,
        balanceOf

      if (pool.airdrop) {
        allowList = resData[12]
        withdrawList = resData[13]
        airdropBegin = resData[14]
        currency_allowance = resData[15] || 0
        balanceOf = resData[16] || 0
        pool.airdrop = Object.assign(pool.airdrop, {
          begin: airdropBegin,
          allowList: fromWei(allowList, 18).toFixed(6) * 1,
          withdrawList: {
            true: true,
            false: false
          }[String(withdrawList)]
        })
      } else {
        currency_allowance = resData[12] || 0
        balanceOf = resData[13] || 0
      }

      const [completed_, amount, volume, rate] = settleable
      const totalPurchasedUnderlying = numToWei(
        new BigNumber(totalPurchasedCurrency)
          .dividedBy(new BigNumber(price))
          .toFixed(0, 1),
        pool.underlying.decimal
      )

      Object.assign(pool.currency, {
        allowance: currency_allowance,
      })
      const num = new BigNumber(1).div(
        new BigNumber(price).div(new BigNumber(10).pow(pool.currency.decimal))
      ).toFixed(6) * 1
      return Object.assign({}, pool, {
        ratio: `1 ${pool.currency.symbol} = ${new BigNumber(num).toFormat()} ${
          pool.underlying.symbol
        }`,
        progress:
          new BigNumber(fromWei(totalPurchasedCurrency, pool.currency.decimal))
            .div(new BigNumber(pool.amount).div(new BigNumber(num)))
            .toFixed(6)
            .toString(),
        is_join: purchasedCurrencyOf > 0,
        totalPurchasedCurrency,
        totalPurchasedUnderlying,
        balanceOf: formatAmount(balanceOf, pool.currency.decimal, 6),
        purchasedCurrencyOf,
        totalSettledUnderlying,
        startTime,
        endTime,
        claimTime,
        settleable: {
          completed_,
          amount,
          volume,
          rate,
        },
        pool_info: {
          ...pool.pool_info,
          maxAccount: maxUser,
          curUserCount,
          min_allocation: fromWei(amtLow, pool.currency.decimal) * 1,
          max_allocation: fromWei(amtHigh, pool.currency.decimal) * 1,
        }
      })
    })
}

export const onApprove_ = async (library, account, contractAddress, poolAddress, callback = () => {
}) => {
  const Erc20Contracts = getContract(
    library,
    Erc20ABI.abi,
    contractAddress
  )
  const gasPrice = await getGasPrice()
  Erc20Contracts.methods
    .approve(
      poolAddress,
      ADDRESS_INFINITY
    )
    .send({from: account, gasPrice})
    .on('receipt', () => {
      callback(true)
    })
    .on('error', () => {
      console.log(1111111111)
      callback(false)
    })
}
export const onBurn_ = async (library, account, _amount, iboData, callback) => {
  const gasPrice = await getGasPrice()
  const myContract = getContract(
    library,
    iboData.abi,
    iboData.address
  )
  myContract.methods
    .purchase(numToWei(String(_amount), iboData.currency.decimal))
    .send({from: account, gasPrice})
    .on('receipt', () => callback(true))
    .on('error', () => callback(false))
}
export const onClaim_ = async (library, account, iboData, callback) => {
  const gasPrice = await getGasPrice()
  const myContract = getContract(
    library,
    iboData.abi,
    iboData.address
  )
  myContract.methods
    .settle()
    .send({from: account, gasPrice})
    .on('receipt', () => {
      callback(true)
    })
    .on('error', () => {
      callback(false)
    })
}
export const onAirdrop_ = async (library, account, iboData, callback) => {
  const gasPrice = await getGasPrice()
  const myContract = getContract(
    library,
    iboData.abi,
    iboData.address
  )
  myContract.methods
    .withdraw()
    .send({from: account, gasPrice})
    .on('receipt', () => {
      callback(true)
    })
    .on('error', () => {
      callback(false)
    })
}
