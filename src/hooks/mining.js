import React, { useState, useMemo } from 'react'
import Web3 from 'web3'
import { useActiveWeb3React, useBlockHeight } from '../web3'
import ERC20 from '../web3/abi/ERC20.json'
import Mining from '../configs/mining'
import { processResult, getOnlyMultiCallProvider } from '../web3/multicall'
import { Contract } from 'ethers-multicall-x'

export const useMiningInfo = (address = '') => {
  const { account } = useActiveWeb3React()
  const blockHeight = useBlockHeight()
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
      .then((data) => {
        data = processResult(data)
        let [
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

