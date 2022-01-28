import { useContext, useMemo, useState } from 'react'
import ERC20_ABI from '../web3/abi/ERC20.json'
import Web3 from 'web3'
import { formatAmount } from '../utils/format'
import { VarContext } from '../context'
import {getWeb3, useActiveWeb3React} from '../web3'

export const getContract = (library, abi, address) => {
  const web3 = new Web3(library.provider)
  return new web3.eth.Contract(abi, address)
}

export const useBalance = (
  blockHeight,
  address,
  abi = ERC20_ABI.abi,
  decimals = 18,
  owner = null,
) => {
  const [balance, setBalance] = useState('0')
  const { account, library } = useActiveWeb3React()
  useMemo(() => {
    if (account && address && blockHeight !== 0) {
      owner = !owner ? account : owner
      const contract = getContract(library, abi, address)
      contract.methods
        .balanceOf(owner)
        .call()
        .then(balance_ => {
          const resBalance = formatAmount(balance_, decimals)
          setBalance(resBalance)
        }).catch(e=>{})
    }
  }, [account, blockHeight, address])
  return balance
}


export const useEthBalance = (address = null) => {
  const { account, active, library } = useActiveWeb3React()
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

