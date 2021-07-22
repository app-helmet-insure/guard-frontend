import WarUsdtLpt from './abi/WarUsdtLpt.json'
export const ChainId = {
  BSC: 56,
  HECO: 128,
  MATIC: 137
}

export const WAR_USDT_LPT = {
  address: '0x2eAB1e47Bf1660bf6De9437BD061db666111e041',
  abi: WarUsdtLpt
}

export const MULTICALL_NETWORKS = {
  // [ChainId.RINKEBY]: '0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821',
  // [ChainId.ETH]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  [ChainId.BSC]: '0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb',
}

export const getRpcUrl = chainId => {
  const RPC_URLS = {
    [ChainId.HECO]: 'https://http-mainnet-node.huobichain.com',
    [ChainId.BSC]: 'https://bsc-dataseed.binance.org/',
    [ChainId.MATIC]: 'https://rpc-mainnet.maticvigil.com'
  }
  return RPC_URLS[chainId]
}
export const getTokenName = address=>{
  const Address = address.toLocaleLowerCase()
  switch (Address) {
    case '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270':
      return 'MATIC'
    case '0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8':
      return 'GUARD'
    default:
      return ''
  }
}
