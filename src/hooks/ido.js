import BigNumber from 'bignumber.js'
import {formatAmount, fromWei, numToWei} from '../utils/format'
import {Contract} from 'ethers-multicall-x'
import ERC20 from '../web3/abi/ERC20.json'
import {getOnlyMultiCallProvider, processResult} from '../web3/multicall'

export const getPoolInfo = (pool, account) => {
  const poolContract = new Contract(pool.address, pool.abi)
  if (!account) {
    return Promise.all([]).then(() => pool)
  }
  // const currencyContract = new Contract(pool.currency.address, ERC20.abi)
  const currencyToken = pool.currency.is_ht
    ? null
    : new Contract(pool.currency.address, ERC20.abi)
  const promiseList = [
    poolContract.price(),
    poolContract.totalPurchasedCurrency(),
    poolContract.purchasedCurrencyOf(account),
    // poolContract.totalSettleable(),
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
  if (currencyToken) {
    promiseList.push(currencyToken.allowance(account, pool.address))
    promiseList.push(currencyToken.balanceOf(account))
  }
  const multicallProvider = getOnlyMultiCallProvider()
  return multicallProvider
    .all(promiseList).then(res => {
      const now = parseInt(Date.now() / 1000, 10)
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
        currency_allowance = resData[15]
        balanceOf = resData[16]
        pool.airdrop = Object.assign(pool.airdrop, {
          begin: airdropBegin,
          allowList: fromWei(allowList, 18).toFixed(6) * 1,
          withdrawList: {
            true: true,
            false: false
          }[String(withdrawList)]
        })
      } else {
        currency_allowance = resData[12]
        balanceOf = resData[13]
      }

      const [completed_, amount, volume, rate] = settleable

      const totalPurchasedAmount = new BigNumber(
        fromWei(pool.amount, pool.decimal)
      )
        .multipliedBy(new BigNumber(price))
        .div(new BigNumber(fromWei('1', pool.underlying.decimal)))

      const totalPurchasedUnderlying = numToWei(
        new BigNumber(totalPurchasedCurrency)
          .dividedBy(new BigNumber(price))
          .toFixed(0, 1),
        pool.currency.decimal
      )

      Object.assign(pool.currency, {
        allowance: currency_allowance,
      })
      const num = new BigNumber(10).pow(pool.currency.decimal).multipliedBy(new BigNumber(10).pow(18)).div(new BigNumber(price).multipliedBy(new BigNumber(10).pow(pool.underlying.decimal))).toFixed(6) * 1
      return Object.assign({}, pool, {
        ratio: `1 ${pool.currency.symbol} = ${new BigNumber(num).toFormat()} ${
          pool.underlying.symbol
        }`,
        progress:
          new BigNumber(totalPurchasedCurrency)
            .dividedBy(totalPurchasedAmount)
            .toFixed(2, 1)
            .toString(),
        is_join: purchasedCurrencyOf > 0,
        totalPurchasedCurrency,
        totalPurchasedAmount: totalPurchasedAmount,
        totalPurchasedUnderlying,
        balanceOf: formatAmount(balanceOf, pool.currency.decimals, 6),
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
