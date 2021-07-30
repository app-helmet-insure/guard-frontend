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
  const [isActive, setIsActive] = useState(true)
  // 块高度
  const [blockHeight, setBlockHeight] = useState(0)
  // 当前账户余额 GUARD
  const balance = useBalance(blockHeight, '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8')

  const web3 = injected.supportedChainIds.includes(chainId) ? getWeb3(library) : getHttpWeb3(ChainId.MATIC)
  const getBlockHeight = callback => {
    web3.eth.getBlockNumber().then(height => {
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
  useMemo(() => {
    document.addEventListener('visibilitychange', ()=> {
      const isActive_ = document.visibilityState === 'visible'
      console.log('isActive', isActive_)
      if (isActive_) {
        getBlockHeight()
        timeoutGetBlockHeight()
      } else {
        clearTimeout(timer)
      }
      setIsActive(isActive_)
    })
  }, [])

  useMemo(()=>{
    if (props.updateCount === 0) {
      timeoutGetBlockHeight()
    }
    getBlockHeight()
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
