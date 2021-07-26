import StakingPool3 from '../web3/abi/StakingPool3.json'
import QuickSwapRouter from '../web3/abi/QuickSwapRouter.json'
import QuickSwapFactory from '../web3/abi/QuickSwapFactory.json'


export default [
  {
    name: 'Guard-USDC LPT',
    icon: 'Guard-USDC',
    shortToken: 'TESTB',
    rewards1: 'TESTB',
    rewards2: null,
    address: '0xfdb3Fd63fded5092a1Cd889cF03cAD7CE97362a8',
    rewards1Address: '0xbe67e4de16854e687089bebcc0cd1ac7ae7ea2d4',
    rewards2Address: null,
    // apr
    valueAprToken: '0xbe67e4de16854e687089bebcc0cd1ac7ae7ea2d4', // WAR
    valueAprPath: [
      // '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // USDC
    ],
    rewardsAprPath: [
      // '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // USDC
    ],
    settleToken: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // usdc
    MLP: '0xbe67e4de16854e687089bebcc0cd1ac7ae7ea2d4', // WAR
    byLink:
      'https://ht.mdex.com/#/swap?outputCurrency=0x910651f81a605a6ef35d05527d24a72fecef8bf0',
    abi: StakingPool3,
    start_at: '',
    time: '',
    openDate: null,
    dueDate: null,
    earnName: 'APY',
    status: 0,
    rewards: 'TESTB',
    decimal: 18,
    is_coming: false,
    mdexReward: false,
    networkId: 137,
    mdexDaily: 0,
    mdexPid: '',
    splitDigits: 4,
    cover: 'Call',
    strikeprice: '0.6',
    mineMountainAddress: '0x471C9A8acc6562bb28cEbE041668cC224AD0F3Bd', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
    poolType: 1,
    reward2DailyProduction: '0.2', // 奖励2日产量
  },
]
