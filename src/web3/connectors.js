import {ChainId} from './address'

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
