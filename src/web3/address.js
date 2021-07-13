export const ChainId = {
  BSC: 56,
  HECO: 128,
  MATIC: 137
}

export const getRpcUrl = chainId => {
  const RPC_URLS = {
    [ChainId.HECO]: 'https://http-mainnet-node.huobichain.com',
    [ChainId.BSC]: 'https://bsc-dataseed.binance.org/',
    [ChainId.MATIC]: 'https://rpc-mainnet.maticvigil.com'
  }
  return RPC_URLS[chainId]
}

