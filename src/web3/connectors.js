import {ChainId} from './address'
import { InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError} from '@web3-react/injected-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import {useCallback, useEffect, useMemo} from 'react'

export const SCAN_ADDRESS = {
  [ChainId.BSC]: 'https://bscscan.com',
  [ChainId.HECO]: 'https://hecoinfo.com',
  [ChainId.MATIC]: 'https://polygonscan.com/',
}


const networkConf = {
  [ChainId.HECO]: {
    chainId: '0x80',
    chainName: 'HECO',
    nativeCurrency: {
      name: 'HT',
      symbol: 'HT',
      decimals: 18,
    },
    rpcUrls: [
      'https://http-mainnet-node.huobichain.com',
    ],
    blockExplorerUrls: [SCAN_ADDRESS[ChainId.HECO]],
  },
  [ChainId.BSC]: {
    chainId: '0x38',
    chainName: 'BSC',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: [SCAN_ADDRESS[ChainId.BSC]],
  },
  [ChainId.MATIC]: {
    chainId: '0x89',
    chainName: 'MATIC',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc-mainnet.maticvigil.com'],
    blockExplorerUrls: [SCAN_ADDRESS[ChainId.MATIC]],
  }
}


export const injected = new InjectedConnector({
  supportedChainIds: [ChainId.MATIC, ChainId.BSC, ChainId.HECO],
})

export const changeNetwork = chainId => {
  return new Promise(reslove => {
    const {ethereum} = window
    if (ethereum && ethereum.isMetaMask && networkConf[chainId]) {
      ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            ...networkConf[chainId]
          }
        ],
      }).then(() => {
        setTimeout(reslove, 500)
      })
    } else {
      reslove()
    }
  })
}

export const POLLING_INTERVAL = 12000

const bscWalletConnector = new WalletConnectConnector({
  rpc: { 56: 'https://bsc-dataseed.binance.org/' },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

const hecoWalletConnector = new WalletConnectConnector({
  rpc: { 128: 'https://http-mainnet-node.huobichain.com' },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

export const walletConnector = {
  [ChainId.HECO]: hecoWalletConnector,
  [ChainId.BSC]: bscWalletConnector,
}

export const useConnectWallet = () => {
  const {activate, deactivate, active} = useWeb3React()
  const connectWallet = useCallback((connector, chainId) => {
    return changeNetwork(chainId).then(() => {
      return new Promise((reslove, reject) => {
        activate(connector, undefined, true)
          .then((e) => {
            if ( window.ethereum && window.ethereum.on) {
              // 监听钱包事件
              console.log('注册事件')
              // const { ethereum } = window
              window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                  // 无账号，则代表锁定了,主动断开
                  deactivate()
                }
                // 账号改了，刷新网页
                // window.location.reload()
              })

              window.ethereum.on('disconnect', () => {
                // 断开连接
                deactivate()
              })

              window.ethereum.on('close', () => {
                // 断开连接
                deactivate()
              })

              window.ethereum.on('message', (e) => {
                console.log('message', e)
              })

            }
            reslove(e)
          })
          .catch((error) => {
            switch (true) {
              case error instanceof UnsupportedChainIdError:
                console.log('链错了')
                break
              case error instanceof NoEthereumProviderError:
                console.log('不是钱包环境')
                break
              case error instanceof UserRejectedRequestError:
                console.log('用户拒绝连接钱包')
                break
              default:
                console.log(error)
            }
            reslove(error)
          })
      })
    })


  }, [])

  useMemo(() => {
    !active && connectWallet(injected)
    window.ethereum && window.ethereum.on('networkChanged', () => {
      // 切换网络后，尝试连接
      !active && connectWallet(injected)
    })
  }, [])
  return connectWallet
}
