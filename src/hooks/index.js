import {useEffect, useState} from 'react'
import {
  UnsupportedChainIdError,
  useWeb3React as useWeb3ReactCore,
} from '@web3-react/core'
import {connectWallet, injected} from '../web3/connectors'
import { isMobile } from 'react-device-detect'

export function useEagerConnect() {
  const { activate, deactivate, active } = useWeb3ReactCore() // specifically using useWeb3ReactCore because of what this hook does
  const [tried, setTried] = useState(false)
  useEffect(() => {
    // 如果已经验证过的话，直接链接
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        connectWallet(activate, injected, deactivate)
          .then(() => {
            console.log('连接成功')
          })
          .catch(() => {
            setTried(true)
          })
      } else {
        // 如果是手机前钱包，尝试直接链接
        if (isMobile && window.ethereum) {
          connectWallet(activate, injected, deactivate)
            .then(() => {
              console.log('连接成功')
            })
            .catch(() => {
              setTried(true)
            })
        } else {
          // 其他情况
          setTried(true)
        }
      }
    })
  }, [activate]) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true)
    }
  }, [active])

  return tried
}
