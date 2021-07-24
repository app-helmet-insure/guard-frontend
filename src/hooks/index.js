import { useEffect, useMemo, useState } from 'react'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { WAR_USDT_LPT } from '../web3/address'
import ERC20_ABI from '../web3/abi/ERC20.json'
import Web3 from 'web3'
import {formatAmount} from '../utils/format'

export const getContract = (library, abi, address) => {
  const web3 = new Web3(library.provider)
  return new web3.eth.Contract(abi, address)
}

export const useBalance = (
  blockHeight,
  address,
  abi = ERC20_ABI.abi
) => {
  const [balance, setBalance] = useState('0')
  const { account, library } = useWeb3ReactCore()
  useMemo(() => {
    if (account && address) {
      const contract = getContract(library, abi, address)
      console.log(contract)
      contract.methods
        .balanceOf(account)
        .call()
        .then((balance_) => {
          const resBalance = formatAmount(balance_)
          console.log('balance', balance_, 'format', resBalance)
          setBalance(resBalance)
        })
    }
  }, [account, blockHeight, address])

  return balance
}
