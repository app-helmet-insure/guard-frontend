import React, { useContext, useState, useMemo } from 'react'
import { processResult, getOnlyMultiCallProvider } from '../web3/multicall'
import { Contract } from 'ethers-multicall-x'
import BigNumber from 'bignumber.js'

export const getClaimInfo = (pool, account) => {
  if (pool.is_coming) return pool
  const multicallProvider = getOnlyMultiCallProvider(pool.networkId)
  const pool_contract = new Contract(pool.address, pool.abi)
  const promise_list = []
  if (account) {
    promise_list.push(
      pool_contract.claimingList(account), // 奖励1
      pool_contract.claimedList(account)
    )
  }
  return multicallProvider.all(promise_list).then((data) => {
    data = processResult(data)
    const [claiming = 0, claimed = 0] = data
    const earned = new BigNumber(claiming)
      .minus(new BigNumber(claimed))
      .toString()
    const newPool = Object.assign({}, pool, {
      earned
    })
    return newPool
  })
}