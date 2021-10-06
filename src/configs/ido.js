import starterLimitAbi from '../web3/abi/IBO_StarterLimit.json'
import AirAllowListAbi from '../web3/abi/AirAllowList.json'
import PolyIcon from '../assets/images/ido/poly.png'
import {ChainId} from '../web3/address'

const GUARD_ADDRESS = '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8'
const USDC_ADDRESS = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
const testNetwork = sessionStorage.getItem('guard_test_chain') && ChainId.LOCALHOST

if (testNetwork) {
  console.log('testNetwork', testNetwork)
}
export const idoPools = [
  {
    name: 'pNAUT',
    address: '0xC377efA77A704b80E71f0A738c3E473f57eEA9E0',
    abi: starterLimitAbi,
    startTime: '1633539600', // sol->offerBegin
    endTime: '1633582800', // sol->time
    claimTime: '1633584300', // sol->timeSettle
    is_coming: false,
    currency: {
      address: GUARD_ADDRESS,
      decimal: 18,
      symbol: 'GUARD',
    },
    icon: PolyIcon,
    underlying: {
      address: '0xca469963a030a3670ed76832a6a181d280af108d',
      decimal: 18,
      symbol: 'pNAUT',
      name: 'pNAUT',
    },
    amount: '160000',
    pool_info: {
      min_allocation: 0,
      max_allocation: 5000,
      maxAccount: 1000000,
    },
    progress: 0,
    ratio: '1 GUARD = 1.6 pNAUT',
    purchasedCurrencyOf: 0,
    totalPurchasedAmount: '100000000000000000000000',
    totalPurchasedUnderlying: '0',
    totalPurchasedCurrency: '0',

    duration: '',
    winningRate: '-',
    committed: '',
    total: '',
    poolType: 0,
    networkId: testNetwork || ChainId.MATIC,
    claimTimeTipI18n: 'IBO_text58',
    light: true,
    modal: {
      expected_trading_time: 'IBO_text58',
      trading_platform: 'https://jetswap.finance/',
      TG: 'https://t.me/astronaut_bsc',
      website: 'https://astronaut.to/'
    }
  },
  {
    name: 'pNAUT',
    address: '0x03F480d655BbC2921565Efe8afe693d02BE64D7F',
    abi: starterLimitAbi,
    startTime: '1633541400', // sol->offerBegin
    endTime: '1633582800', // sol->time
    claimTime: '1633584300', // sol->timeSettle
    is_coming: false,
    currency: {
      address: USDC_ADDRESS,
      decimal: 6,
      symbol: 'USDC',
    },
    icon: PolyIcon,
    underlying: {
      address: '0xca469963a030a3670ed76832a6a181d280af108d',
      decimal: 18,
      symbol: 'pNAUT',
      name: 'pNAUT',
    },
    amount: '640000',
    pool_info: {
      min_allocation: 0,
      max_allocation: 2000,
      maxAccount: 1000000,
    },
    progress: 0,
    ratio: '1 USDC = 8 pNAUT',
    purchasedCurrencyOf: 0,
    totalPurchasedAmount: '20000000000000000000000',
    totalPurchasedUnderlying: '0',
    totalPurchasedCurrency: '0',

    duration: '',
    winningRate: '-',
    committed: '',
    total: '',
    poolType: 0,
    networkId: testNetwork || ChainId.MATIC,
    claimTimeTipI18n: 'IBO_text58',
    light: true,
    modal: {
      expected_trading_time: 'IBO_text58',
      trading_platform: 'https://jetswap.finance/',
      TG: 'https://t.me/astronaut_bsc',
      website: 'https://astronaut.to/'
    }
  },
]
