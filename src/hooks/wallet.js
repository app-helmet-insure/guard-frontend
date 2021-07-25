import {useState, useEffect, useContext} from 'react'
import Web3 from 'web3'
import { useActiveWeb3React } from '../web3'
import {VarContext} from '../context'
import ERC20 from '../web3/abi/ERC20.json'
import { getRpcUrl } from '../web3/address'

const createContractERC20 = (chainId, address) => {
  var web3 = new Web3(new Web3.providers.HttpProvider(getRpcUrl(chainId)))
  return new web3.eth.Contract(ERC20.abi, address) // WAR_ADDRESS(chainId)
}

export const getAllowance = (miningPools) => {
  const { chainId } = useActiveWeb3React()
  const contract = createContractERC20(miningPools.networkId || chainId, miningPools.rewards1Address)
  return contract.methods
    .allowance(miningPools.mineMountainAddress, miningPools.address)
    .call()
    .then((res) => {
      console.log('allowance', res)
      return res
    })
}
