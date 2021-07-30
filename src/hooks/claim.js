import React, { useContext, useState, useMemo } from 'react'
import { processResult, getOnlyMultiCallProvider } from '../web3/multicall'
import { Contract } from 'ethers-multicall-x'

export const getClaimInfo = (pool, account) => {
  if (pool.is_coming) return pool
  const multicallProvider = getOnlyMultiCallProvider(pool.networkId)
  const pool_contract = new Contract(pool.address, pool.abi)
  const promise_list = []
  if (account) {
    promise_list.push(
      pool_contract.claimingList(account) // 奖励1
    )
  }
  return multicallProvider.all(promise_list).then((data) => {
    data = processResult(data)
    const [earned = 0, earned2 = 0] = data
    const newPool = Object.assign({}, pool, {
      earned,
      earned2,
    })
    return newPool
  })
}