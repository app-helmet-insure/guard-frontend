import starterLimitAbi from '../web3/abi/IBO_StarterLimit.json'
import AirAllowListAbi from '../web3/abi/AirAllowList.json'
import PolyIcon from '../assets/images/ido/poly.png'
import {ChainId} from '../web3/address'

const GUARD_ADDRESS = '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8'
const testNetwork = sessionStorage.getItem('guard_test_chain') && ChainId.LOCALHOST
if (testNetwork) {
  console.log('testNetwork', testNetwork)
}
export const idoPools = [
  {
    name: 'CTT',
    address: '0xc734Dd822ED6D8e76568f13e0b5f5347bA65801E',
    abi: starterLimitAbi,
    startTime: '1632891600', // sol->offerBegin
    endTime: '1632902400', // sol->time
    claimTime: '1632906000', // sol->timeSettle
    is_coming: false,
    currency: {
      address: GUARD_ADDRESS,
      decimal: 18,
      symbol: 'GUARD',
    },
    icon: PolyIcon,
    underlying: {
      address: '0x49F7e4bA2eC8E5844652fBC041cE1183c0B38CFF',
      decimal: 18,
      symbol: 'CTT',
      name: 'CTT',
    },
    amount: '1',
    pool_info: {
      min_allocation: 0.1,
      max_allocation: 0.2,
      maxAccount: 5,
    },
    progress: 0,
    ratio: '1 GUARD = 30 PRED',
    purchasedCurrencyOf: 0,
    totalPurchasedAmount: '53333333333333332800000',
    totalPurchasedUnderlying: '0',
    totalPurchasedCurrency: '0',

    duration: '',
    winningRate: '-',
    committed: '',
    total: '',
    poolType: 0,
    networkId: testNetwork || ChainId.MATIC,
    claimTimeTipI18n: 'IBO_text43',
    light: true
  },
]
