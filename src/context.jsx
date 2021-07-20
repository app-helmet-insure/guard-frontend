import React, {createContext, useEffect, useMemo, useRef, useState} from 'react'
import {useBalance} from './hooks'
import {getHttpWeb3, getWeb3} from './web3'
import {ChainId} from './web3/address'
import {connect} from 'react-redux'
import {useWeb3React} from '@web3-react/core'
import {injected} from './web3/connectors'

export const VarContext = createContext()
let timer = null
function Context (props) {
  const {chainId, library} = useWeb3React()

  // 块高度
  const [blockHeight, setBlockHeight] = useState(0)
  // 账户余额
  const balance = useBalance(blockHeight)

  const web3 = injected.supportedChainIds.includes(chainId) ? getWeb3(library) : getHttpWeb3(ChainId.MATIC)
  const getBlockHeight = (callback) => {
    web3.eth.getBlockNumber().then(height => {
      console.log('height', height)
      setBlockHeight(height)
      callback && callback()
      return height
    })
  }

  const timeoutGetBlockHeight = () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      getBlockHeight(timeoutGetBlockHeight)
    }, 8000)
  }

  useMemo(()=>{
    if (props.updateCount === 0) {
      timeoutGetBlockHeight()
    } else {
      getBlockHeight()
    }
    return ()=>{
      clearTimeout(timer)
    }
  }, [props.updateCount, chainId])

  return (
    <VarContext.Provider value={{
      blockHeight,
      balance
    }}>
      {props.children}
    </VarContext.Provider>
  )
}
export default connect(state => state.reduxWeb3)(Context)
