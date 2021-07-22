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

export const useAllowance = (contract_address, address, owner_address, _chainId) => {
  const { account, active, library, chainId } = useActiveWeb3React()
  const [allowance, setAllowance] = useState(0)
  const {blockHeight} = useContext(VarContext)
  useEffect(() => {
    if (!_chainId && !chainId) {
      return () => { }
    }
    const contract = createContractERC20(_chainId || chainId, contract_address)
    try {
      contract.methods
        .allowance(owner_address, address)
        .call()
        .then((res) => {
          setAllowance(res)
        })
    } catch (e) {
      console.log('load token allowance error:', e)
    }
    return () => { }
  }, [account, library, active, blockHeight])
  return allowance
}