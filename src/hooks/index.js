import { useContext, useEffect, useMemo, useState } from 'react'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { WAR_USDT_LPT } from '../web3/address'
import ERC20_ABI from '../web3/abi/ERC20.json'
import Web3 from 'web3'
import { formatAmount } from '../utils/format'
import { VarContext } from '../context'
import { getWeb3 } from '../web3'

export const getContract = (library, abi, address) => {
  const web3 = new Web3(library.provider)
  return new web3.eth.Contract(abi, address)
}

export const useBalance = (
  blockHeight,
  address,
  abi = ERC20_ABI.abi,
  decimals = 18,
) => {
  const [balance, setBalance] = useState('0')
  const { account, library, active } = useWeb3ReactCore()
  useMemo(() => {
    if (active && address && blockHeight !== 0) {
      // console.log(active, address, account)
      const contract = getContract(library, abi, address)
      contract.methods
        .balanceOf(account)
        .call()
        .then(balance_ => {
          const resBalance = formatAmount(balance_, decimals)
          // console.log('balance', balance_, 'format', resBalance)
          // console.log(address, resBalance)
          setBalance(resBalance)
        }).catch(e=>{})
    }
  }, [account, active, blockHeight, address])

  return balance
}

export const useEthBalance = (address = null) => {
  const { account, active, library } = useWeb3ReactCore()
  address = !address ? account : address
  const [balance, setBalance] = useState('0')
  const { blockHeight } = useContext(VarContext)

  useMemo(() => {
    if (library && active) {
      const web3 = getWeb3(library)
      web3.eth.getBalance(address).then(_balance => {
        const resBalance = formatAmount(_balance)
        setBalance(resBalance)
      })
    }
  }, [active, blockHeight])
  return balance
}

