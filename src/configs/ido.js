// import starterLimitAbi from '../web3/abi/IBO_StarterLimit.json'
// import AirAllowListAbi from '~/web3/abis/AirAllowList.json'
// import PolyIcon from '../assets/images/ido/poly.png'
import {ChainId} from '@dinoswap/quickswap-sdk'

const HELMET_ADDRESS = '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8'

export const idoPools = [
  {
    name: 'MONI',
    address: '0x603366462A39CdbFCE7a7B274f5DA77cb51eA9b0',
    abi: null,
    startTime: '1631790000',
    endTime: '1631815380',
    claimTime: '1631815380',
    is_coming: false,
    currency: {
      address: HELMET_ADDRESS,
      decimal: 18,
      symbol: 'HELMET',
    },
    icon: null,
    underlying: {
      address: '0x9573c88aE3e37508f87649f87c4dd5373C9F31e0',
      decimal: 18,
      symbol: 'MONI',
      name: 'MONI',
    },
    amount: '200000',
    pool_info: {
      min_allocation: 400,
      max_allocation: 1000,
      min_swap_level: '400 Helmet',
      maxAccount: 600,
    },
    progress: 0,
    ratio: '1 HELMET = 1.35 MONI',
    purchasedCurrencyOf: 0,
    totalPurchasedAmount: '259259259259259259175000',
    totalPurchasedUnderlying: '0',
    totalPurchasedCurrency: '0',
    duration: '',
    winningRate: '-',
    committed: '',
    total: '',
    poolType: 0,
    networkId: ChainId.MATIC,
    claimTimeTipI18n: 'IBO.IBO_text46',
    light: true,
    airdrop: {
      begin: '1634407500',
      address: '0xDCBc091bC91b5b4DFB226C410Dc703dfF6a75eda',
      abi: null,
      amount: '175000',
      withdrawList: true,
      allowList: 0
    }
  },
]
