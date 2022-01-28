import React from 'react'
import BigNumber from 'bignumber.js'
import {multicallClient, ClientContract} from '../web3/multicall'

export const getClaimInfo = (pool, account) => {
  if (pool.is_coming) return pool
  const pool_contract = new ClientContract(pool.abi, pool.address, pool.networkId)
  const promise_list = []
  if (account) {
    promise_list.push(
      pool_contract.claimingList(account), // 奖励1
      pool_contract.claimedList(account)
    )
  }
  return multicallClient(promise_list).then(data => {
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
