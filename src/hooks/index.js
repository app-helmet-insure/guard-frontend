import { useEffect, useMemo, useState } from 'react'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { WAR_USDT_LPT } from '../web3/address'
import ERC20_ABI from '../web3/abi/ERC20.json'
import Web3 from 'web3'

export const getContract = (library, abi, address) => {
  const web3 = new Web3(library.provider)
  return new web3.eth.Contract(abi, address)
}

export const useBalance = (
  blockHeight,
  address = WAR_USDT_LPT.address,
  abi = WAR_USDT_LPT.abi
) => {
  const [balance, setBalance] = useState('0')
  const { account, library } = useWeb3ReactCore()
  useMemo(() => {
    if (account) {
      const contract = getContract(library, abi, address)
      contract.methods
        .balanceOf(account)
        .call()
        .then((balance_) => {
          console.log('balance_', balance_)
          setBalance(balance_.toString())
        })
    }
  }, [account, blockHeight])

  return balance
}
