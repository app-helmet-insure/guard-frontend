import WarUsdtLpt from './abi/WarUsdtLpt.json'
export const ChainId = {
  BSC: 56,
  HECO: 128,
  MATIC: 137
}

export const ADDRESS_0 = '0x0000000000000000000000000000000000000000'

export const MDEX_POOL_ADDRESS = '0xFB03e11D93632D97a8981158A632Dd5986F5E909'
export const MDEX_ADDRESS = '0x25D2e80cB6B86881Fd7e07dd263Fb79f4AbE033c'
export const MDEX_ROUTER_ADDRESS = '0xED7d5F38C79115ca12fe6C0041abb22F0A06C300'

export function WAR_ADDRESS(chainId) {
  switch (chainId) {
    case ChainId.BSC:
      return '0x910651F81a605a6Ef35d05527d24A72fecef8bF0'
    case ChainId.HECO:
      return '0x910651F81a605a6Ef35d05527d24A72fecef8bF0'
    case ChainId.MATIC:
      return '0xbe67e4de16854e687089bebcc0cd1ac7ae7ea2d4'
    default:
      return '0x910651F81a605a6Ef35d05527d24A72fecef8bF0'
  }
}

export function USDT_ADDRESS(chainId) {
  switch (chainId) {
    case ChainId.BSC:
      return '0xa71edc38d189767582c38a3145b5873052c3e47a'
    case ChainId.HECO:
      return '0xa71edc38d189767582c38a3145b5873052c3e47a'
    default:
      return '0xa71edc38d189767582c38a3145b5873052c3e47a'
  }
}

export function MDEX_FACTORY_ADDRESS(chainId) {
  switch (chainId) {
    case ChainId.BSC:
      return '0xb0b670fc1F7724119963018DB0BfA86aDb22d941'
    case ChainId.HECO:
      return '0xb0b670fc1F7724119963018DB0BfA86aDb22d941'
    default:
      return '0xb0b670fc1F7724119963018DB0BfA86aDb22d941'
  }
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

export function MINE_MOUNTAIN_ADDRESS(chainId) {
  switch (chainId) {
    case ChainId.BSC:
      return '0xEEC6169616d6E50560E52460A2C74f74Cdf57b6F'
    case ChainId.HECO:
      return '0xEEC6169616d6E50560E52460A2C74f74Cdf57b6F'
    default:
      return '0xEEC6169616d6E50560E52460A2C74f74Cdf57b6F'
  }
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
