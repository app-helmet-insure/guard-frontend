import React, {createContext, useMemo, useState} from 'react'
import {useBalance} from './hooks'
import {getHttpWeb3} from './web3'
import {ChainId} from './web3/address'

export const VarContext = createContext()
const web3 = getHttpWeb3(ChainId.MATIC)
function Context (props) {

  const [blockHeight, setBlockHeight] = useState(0)
  const balance = useBalance(blockHeight)

  useMemo(()=>{
    const getBlockHeight = async () => {
      const height = await web3.eth.getBlockNumber()
      console.log('height', height)
      setBlockHeight(height)
      setTimeout(getBlockHeight, 15000)
    }
    getBlockHeight()
  }, [])

  return (
    <VarContext.Provider value={{
      blockHeight,
      balance
    }}>
      {props.children}
    </VarContext.Provider>
  )
}
export default Context
