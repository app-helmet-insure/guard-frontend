import {useState, useEffect, useContext} from 'react'
import { useActiveWeb3React, useBlockHeight } from '../web3'
import {VarContext} from '../context'

export const useAllowance = (contract_address, address, owner_address, _chainId) => {
  const { account, active, library, chainId } = useActiveWeb3React()
  const [allowance, setAllowance] = useState(0)
  // const blockHeight = useBlockHeight()
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