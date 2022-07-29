import { ChainId } from './address'
import { changeShowSwitchWallet } from '../redux/actions/index'
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError,
} from '@web3-react/injected-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { useCallback, useEffect, useMemo } from 'react'
import store from '../redux/store'

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
    rpcUrls: ['https://http-mainnet-node.huobichain.com'],
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
    rpcUrls: ['https://polygon-rpc.com'],
    blockExplorerUrls: [SCAN_ADDRESS[ChainId.MATIC]],
  },
}

export const injected = new InjectedConnector({
  supportedChainIds: [ChainId.MATIC, ChainId.LOCALHOST],
})

export const changeNetwork = chainId =>
  new Promise(reslove => {
    const { ethereum } = window
    if (ethereum && ethereum.isMetaMask && networkConf[chainId]) {
      ethereum
        .request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              ...networkConf[chainId],
            },
          ],
        })
        .then(() => {
          setTimeout(reslove, 500)
          console.log(chainId)
        })
    } else {
      reslove()
    }
  })

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

const maticWalletConnector = new WalletConnectConnector({
  rpc: { 137: 'https://polygon-rpc.com' },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

export const walletConnector = {
  [ChainId.HECO]: hecoWalletConnector,
  [ChainId.BSC]: bscWalletConnector,
  [ChainId.MATIC]: maticWalletConnector,
}

export const useConnectWallet = () => {
  const { activate, deactivate, active } = useWeb3React()
  const connectWallet = useCallback(
    (connector, chainId) =>
      changeNetwork(chainId).then(() =>
        activate(connector, undefined, true)
          .then(e => {
            // 隐藏切换网络弹窗
            store.getState().index.showSwitchWallet &&
              store.dispatch(
                changeShowSwitchWallet({ showSwitchWallet: false })
              )
            if (window.ethereum && window.ethereum.on) {
              // 监听chainID变化
              window.ethereum.on('chainChanged', chainID => {
                if (chainID * 1 === 56) {
                  window.location.href = 'https://www.helmet.insure/home/'
                }
              })
              // 监听钱包事件
              // const { ethereum } = window
              window.ethereum.on('accountsChanged', accounts => {
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

              window.ethereum.on('message', message => {
                console.log('message', message)
              })
            }
          })
          .catch(error => {
            switch (true) {
              case error instanceof UnsupportedChainIdError:
                store.dispatch(
                  changeShowSwitchWallet({ showSwitchWallet: true })
                )
                break
              case error instanceof NoEthereumProviderError:
                break
              case error instanceof UserRejectedRequestError:
                break
              default:
                console.log(error)
            }
          })
      ),
    []
  )

  useMemo(() => {
    !active && connectWallet(injected)
    window.ethereum &&
      window.ethereum.on('networkChanged', chainID => {
        // 切换网络后，尝试连接
        !active && connectWallet(injected)
      })
  }, [])
  return connectWallet
}
