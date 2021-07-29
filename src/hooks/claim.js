import React, { useContext, useState, useMemo } from 'react'
import ClaimData from '../configs/claim'
import { processResult, getOnlyMultiCallProvider } from '../web3/multicall'
import { Contract } from 'ethers-multicall-x'
import { VarContext } from '../context'
import { useWeb3React } from '@web3-react/core'

export const getClaimInfo = (address = '') => {
  const { blockHeight } = useContext(VarContext)
  const { account } = useWeb3React()
  const [poolsInfo, setPoolsInfo] = useState(ClaimData)
  useMemo(() => {
    Promise.all(
      poolsInfo.map((pool) => {
        if (pool.is_coming) return pool
        const multicallProvider = getOnlyMultiCallProvider(pool.networkId)
        const pool_contract = new Contract(pool.address, pool.abi)
        const promise_list = []
        if (account) {
          promise_list.push(
            pool_contract.earned(account) // 奖励1
          )
          if (pool.rewards2) {
            promise_list.push(pool_contract.earned2(account))
          }
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
      })
    )
      .then((pools) => {
        console.log(pools)
        setPoolsInfo(pools)
      })
      .catch((e) => {
        console.log(e)
      })
      return () => {}
  }, [account, blockHeight])
  return poolsInfo
}