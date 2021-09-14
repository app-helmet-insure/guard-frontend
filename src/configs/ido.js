import starterLimitAbi from '../web3/abi/IBO_StarterLimit.json'
import AirAllowListAbi from '../web3/abi/AirAllowList.json'
import PolyIcon from '../assets/images/ido/poly.png'
import {ChainId} from '../web3/address'

const HELMET_ADDRESS = '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8'

export const idoPools = [
  {
    name: 'PRED',
    address: '0x014e21ee729Bfb9b9D60f424Efcc4A72B9Ef9290',
    abi: starterLimitAbi,
    startTime: '1631617200', // sol->offerBegin
    endTime: '1631802600', // sol->time
    claimTime: '1631802600', // sol->timeSettle
    is_coming: false,
    currency: {
      address: HELMET_ADDRESS,
      decimal: 18,
      symbol: 'HELMET',
    },
    icon: PolyIcon,
    underlying: {
      address: '0xbdd2e3fdb879aa42748e9d47b7359323f226ba22',
      decimal: 18,
      symbol: 'PRED',
      name: 'PRED',
    },
    amount: '1600000',
    pool_info: {
      min_allocation: 200,
      max_allocation: 500,
      min_swap_level: '200 Helmet',
      maxAccount: 200,
    },
    progress: 0,
    ratio: '1 HELMET = 30 PRED',
    purchasedCurrencyOf: 0,
    totalPurchasedAmount: '53333333333333332800000',
    totalPurchasedUnderlying: '0',
    totalPurchasedCurrency: '0',

    duration: '',
    winningRate: '-',
    committed: '',
    total: '',
    poolType: 0,
    networkId: ChainId.LOCALHOST,
    claimTimeTipI18n: 'IBO_text43',
    light: true
  },
]
