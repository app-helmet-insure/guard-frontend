import StakingPool from '../web3/abi/StakingPool.json'
import QuickSwapRouter from '../web3/abi/QuickSwapRouter.json'
import QuickSwapFactory from '../web3/abi/QuickSwapFactory.json'

import ETHPng from '../assets/images/mining/pool/ETH.svg'
import MaticSvg from '../assets/images/mining/pool/MATIC.svg'
import QuickPng from '../assets/images/mining/pool/QUICK.png'
import GuardPng from '../assets/images/mining/pool/GUARD.png'
import GuardShortSvg from '../assets/images/mining/pool/guard-short.png'
import GuardQuickRewardSvg from '../assets/images/mining/pool/guard-quick-reward.png'

const MATIC_ADDRESS = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'
const GUARD_ADDRESS = '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8'
const USDC_ADDRESS = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
export default [
  {
    title: 'Guard-USDC LPT Pool',
    name: 'Guard',
    icon: GuardShortSvg,
    rewardIcon: GuardQuickRewardSvg,
    shortToken: 'ETH',
    rewards1: 'GUARD',
    rewards2: 'QUICK',
    address: '0x51d0b183454c4d621dc789bd15Fe42Ca4B3D9871',
    rewards1Address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
    rewards2Address: '0x831753dd7087cac61ab5644b308642cc1c33dc13',
    // apr
    valueAprToken: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8', // lpt*2
    valueAprPath: [],
    rewardsAprPath: [],
    settleToken: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174', // usdc
    settleTokenDecimal: 6,
    MLP: '0xD2EeeEdfcAF1457F7BC9cbA28d5316F73BB83b49', // 质押的资产
    byLink:
      'https://quickswap.exchange/#/add/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    byLinkName: 'Guard-USDC LPT',
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1628092800,
    openDate: 1628092800,
    time: '',
    dueDate: '',
    earnName: 'APR',
    status: 0,
    rewards: 'Guard-USDC LPT Token',
    decimal: 18,
    is_coming: false,
    mdexReward: true, // 是否有奖励2
    networkId: 137,
    mdexDaily: '300', // 奖励2的每日产量
    mdexPid: '', // 奖励2池子id
    splitDigits: 8,
    cover: '', // Call看涨 Put看跌 空不展示
    strikeprice: '4288',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
    poolType: 2,
    ledLight: true,
    multiple: '8.5X',
    core: true,
    showLptValue: true // 展示奖励2总价值
  },

  {
    title: 'Guard Short Token Pool',
    name: 'Guard', // 用于
    icon: GuardPng,
    rewardIcon: GuardPng,
    shortToken: 'GUARD',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x5a331c3FEc3bcE6E168199a6f649811Fc02C9b54',
    rewards1Address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8', // GUARD
    rewards2Address: null,
    // apr
    valueAprToken: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8', // lpt*2
    valueAprPath: [],
    rewardsAprPath: [],
    settleToken: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // usdc质押的
    settleTokenDecimal: 6,
    MLP: '0xa2338656Ae2135CE743092b9049cbab1026ec601', // 质押的资产 stakingToken
    mlpDecimal: 18,
    byLink:
      'https://quickswap.exchange/#/swap?outputCurrency=0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    abi: StakingPool,
    start_at: 1628092800,
    openDate: 1628092800,
    time: '',
    dueDate: 1630080000,
    earnName: 'APR',
    status: 0,
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    mdexDaily: 0, // 奖励2的每日产量
    mdexPid: '', // 奖励2池子id
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '5.14336', // 翻倍价
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
    poolType: 3,
    multiple: '1X',
    core: true,
    showLptValue: false // 展示奖励2总价值
  },
  {
    title: 'Guard Short Token Pool',
    name: 'Guard',
    icon: GuardPng,
    rewardIcon: GuardPng,
    shortToken: 'GUARD',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0xF73CD2D21f66cBBF1a7c3656bf81B19AE4D47604',
    rewards1Address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8', // GUARD
    rewards2Address: null,
    // apr
    valueAprToken: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // 如果是LP，则按照哪个来 算价值，因为后面需要 * price
    valueAprPath: [],
    rewardsAprPath: [],
    settleToken: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // 用哪个来计算，一般都是usdc
    settleTokenDecimal: 6,
    MLP: '0xeb33baeaC3B7921AfaaA491c6F9Ee8fd684a6B87', // 质押的资产
    mlpDecimal: 6,
    byLink:
      'https://quickswap.exchange/#/swap?outputCurrency=0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
    abi: StakingPool,
    start_at: 1628092800,
    openDate: 1628092800,
    time: '',
    dueDate: 1630080000,
    earnName: 'APR',
    status: 0,
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    mdexDaily: 0, // 奖励2的每日产量
    mdexPid: '', // 奖励2池子id
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '1.28584',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
    poolType: 3,
    multiple: '0.5X',
    core: true,
    showLptValue: false // 展示奖励2总价值
  },

  {
    title: 'Matic Short Token Pool',
    name: 'Matic', // 用于
    icon: MaticSvg,
    rewardIcon: GuardPng,
    shortToken: 'MATIC',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x6a2dfb87F5923a0D6ad8e5127ed001CDe29fE77a',
    rewards1Address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8', // GUARD
    rewards2Address: null,
    // apr
    valueAprToken: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', // lpt*2
    valueAprPath: [],
    rewardsAprPath: [],
    settleToken: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // usdc
    settleTokenDecimal: 6,
    MLP: '0xdBac5ccD625cCC9f373F1EC0163DF8f55f24F35C', // 质押的资产 stakingToken
    mlpDecimal: 18,
    byLink:
      'https://quickswap.exchange/#/swap?outputCurrency=0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    abi: StakingPool,
    start_at: 1627480800,
    openDate: 1627480800,
    time: '',
    dueDate: 1630080000,
    earnName: 'APR',
    status: 0,
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    mdexDaily: 0, // 奖励2的每日产量
    mdexPid: '', // 奖励2池子id
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '1.841094',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    title: 'Matic Short Token Pool',
    name: 'Matic',
    icon: MaticSvg,
    rewardIcon: GuardPng,
    shortToken: 'MATIC',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x18869BC6A45cA83880D2564B249E61A793b794a1',
    rewards1Address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8', // GUARD
    rewards2Address: null,
    // apr
    valueAprToken: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // lpt*2
    valueAprPath: [],
    rewardsAprPath: [],
    settleToken: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // usdc
    settleTokenDecimal: 6,
    MLP: '0x37cd121e89cfc85a800720f05810d6fc66266a13', // 质押的资产
    mlpDecimal: 6,
    byLink:
      'https://quickswap.exchange/#/swap?outputCurrency=0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
    abi: StakingPool,
    start_at: 1627480800,
    openDate: 1627480800,
    time: '',
    dueDate: 1630080000,
    earnName: 'APR',
    status: 0,
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    mdexDaily: 0, // 奖励2的每日产量
    mdexPid: '', // 奖励2池子id
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.460273',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },

  {
    title: 'Quick Short Token Pool',
    name: 'Quick',
    icon: QuickPng,
    rewardIcon: GuardPng,
    shortToken: 'QUICK',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x8aE671d05937C78c4735C997974E38f54814d70a',
    rewards1Address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8', // GUARD
    rewards2Address: null,
    // apr
    valueAprToken: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13', // LPT: lpt*2 Short： 抵押物
    valueAprPath: [],
    rewardsAprPath: [],
    settleToken: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // usdc
    settleTokenDecimal: 6,
    MLP: '0x62e4210cA2B844EeeD5e906dE6a7C5EF9A69C372', // 质押的资产
    byLink:
      'https://quickswap.exchange/#/swap?outputCurrency=0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1627480800,
    openDate: 1627480800,
    time: '',
    dueDate: 1630080000,
    earnName: 'APR',
    status: 0,
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    mdexDaily: 0, // 奖励2的每日产量
    mdexPid: '', // 奖励2池子id
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '652',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值

  },
  {
    title: 'Quick Short Token Pool',
    name: 'Quick',
    icon: QuickPng,
    rewardIcon: GuardPng,
    shortToken: 'QUICK',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0xf56197bc80c70024c925a2Cfe8ce27a5Be7835d7',
    rewards1Address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8', // GUARD
    rewards2Address: null,
    // apr
    valueAprToken: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // lpt*2
    valueAprPath: [],
    rewardsAprPath: [],
    settleToken: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // usdc
    settleTokenDecimal: 6,
    MLP: '0x4d37D091dfD455fa25CA645453cC85BC9A3f02cB', // 质押的资产
    mlpDecimal: 6,
    byLink:
      'https://quickswap.exchange/#/swap?outputCurrency=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    abi: StakingPool,
    start_at: 1627480800,
    openDate: 1627480800,
    time: '',
    dueDate: 1630080000,
    earnName: 'APR',
    status: 0,
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    mdexDaily: 0, // 奖励2的每日产量
    mdexPid: '', // 奖励2池子id
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '163',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    title: 'ETH Short Token Pool',
    name: 'ETH',
    icon: ETHPng,
    rewardIcon: GuardPng,
    shortToken: 'ETH',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x05f7bd01433bfab7b8511788e678de5fa92e276a',
    rewards1Address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8', // GUARD
    rewards2Address: null,
    // apr
    valueAprToken: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', // lpt*2
    valueAprPath: [],
    rewardsAprPath: [],
    settleToken: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // usdc
    settleTokenDecimal: 6,
    MLP: '0x75A0669062C2a0BbC76719f542880C1185279549', // 质押的资产
    byLink:
      'https://quickswap.exchange/#/swap?outputCurrency=0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1627480800,
    openDate: 1627480800,
    time: '',
    dueDate: 1630080000,
    earnName: 'APR',
    status: 0,
    rewards: 'ETH Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    mdexDaily: 0, // 奖励2的每日产量
    mdexPid: '', // 奖励2池子id
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '4288',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },

  // new
  {
    title: 'Guard Short Token Pool',
    name: 'Guard', // 用于
    icon: GuardPng,
    rewardIcon: GuardPng,
    shortToken: 'GUARD',
    rewards1: 'GUARD',
    rewards2: 'MATIC',
    address: '0x9A1C484fE5c81b7bcEcd39256Ae682Badc200F71',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: MATIC_ADDRESS, // MATIC 100个/d
    valueAprToken: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8', // lpt*2
    valueAprPath: [],
    rewardsAprPath: [],
    settleToken: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // usdc质押的
    settleTokenDecimal: 6,
    MLP: '0x2aeF01c1744fdAEaecEcdda941976251fb735257', // 质押的资产 stakingToken
    mlpDecimal: 18,
    byLink:
      'https://quickswap.exchange/#/swap?outputCurrency=0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    abi: StakingPool,
    start_at: 1630080000,
    openDate: 1630080000,
    time: '',
    dueDate: 1632758400,
    earnName: 'APR',
    status: 0,
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: true, // 是否有奖励2
    networkId: 137,
    mdexDaily: 0, // 奖励2的每日产量
    mdexPid: '', // 奖励2池子id
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '1.1', // 翻倍价
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
    poolType: 3,
    multiple: '1.5X',
    core: true,
    showLptValue: false, // 展示奖励2总价值
    ledLight: true,
  },
  {
    title: 'Guard Short Token Pool',
    name: 'Guard',
    icon: GuardPng,
    rewardIcon: GuardPng,
    shortToken: 'GUARD',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x2b4beF09F553F6107a4b313d08616Df05a02E3A6',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    // apr
    valueAprToken: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // 如果是LP，则按照哪个来 算价值，因为后面需要 * price
    valueAprPath: [],
    rewardsAprPath: [],
    settleToken: USDC_ADDRESS, // 用哪个来计算，一般都是usdc
    settleTokenDecimal: 6,
    MLP: '0x46D065e627B0fABb9179ffa9F8a75104B4dfE397', // 质押的资产
    mlpDecimal: 6,
    byLink:
      'https://quickswap.exchange/#/swap?outputCurrency=0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
    abi: StakingPool,
    start_at: 1630080000,
    openDate: 1630080000,
    time: '',
    dueDate: 1632758400,
    earnName: 'APR',
    status: 0,
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    mdexDaily: 0, // 奖励2的每日产量
    mdexPid: '', // 奖励2池子id
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.275',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
    poolType: 3,
    multiple: '0.5X',
    core: true,
    showLptValue: false // 展示奖励2总价值
  },
  {
    title: 'Quick Short Token Pool',
    name: 'Quick',
    icon: QuickPng,
    rewardIcon: GuardPng,
    shortToken: 'QUICK',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0xc3990a56169f1621573C5D5fa5693A883a2f79F8',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    // apr
    valueAprToken: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13', // LPT: lpt*2 Short： 抵押物
    valueAprPath: [],
    rewardsAprPath: [],
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xd5dc9Acb1CAA449C54C6cf8E449E0a08CaBadDCC', // 质押的资产
    byLink:
      'https://quickswap.exchange/#/swap?outputCurrency=0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1630080000,
    openDate: 1630080000,
    time: '',
    dueDate: 1632758400,
    earnName: 'APR',
    status: 0,
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    mdexDaily: 0, // 奖励2的每日产量
    mdexPid: '', // 奖励2池子id
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '1200',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值

  },
  {
    title: 'Quick Short Token Pool',
    name: 'Quick',
    icon: QuickPng,
    rewardIcon: GuardPng,
    shortToken: 'QUICK',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0xeC6077700003CBa44aFA6c3a5d8A155596388045',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    // apr
    valueAprToken: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // lpt*2
    valueAprPath: [],
    rewardsAprPath: [],
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x622a12113f7699D9385E5FAE3c35A502910c8890', // 质押的资产
    mlpDecimal: 6,
    byLink:
      'https://quickswap.exchange/#/swap?outputCurrency=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    abi: StakingPool,
    start_at: 1630080000,
    openDate: 1630080000,
    time: '',
    dueDate: 1632758400,
    earnName: 'APR',
    status: 0,
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    mdexDaily: 0, // 奖励2的每日产量
    mdexPid: '', // 奖励2池子id
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '300',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    title: 'Matic Short Token Pool',
    name: 'Matic', // 用于
    icon: MaticSvg,
    rewardIcon: GuardPng,
    shortToken: 'MATIC',
    rewards1: 'GUARD',
    rewards2: 'MATIC',
    address: '0x7580543F9C2C2B5b7aB5ecD2ed5a9F900e83e8f7',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: MATIC_ADDRESS,
    // apr
    valueAprToken: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', // lpt*2
    valueAprPath: [],
    rewardsAprPath: [],
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x76C06A374ad8Ce05B57AC043DE7643316772d6A5', // 质押的资产 stakingToken
    mlpDecimal: 18,
    byLink:
      'https://quickswap.exchange/#/swap?outputCurrency=0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    abi: StakingPool,
    start_at: 1630080000,
    openDate: 1630080000,
    time: '',
    dueDate: 1632758400,
    earnName: 'APR',
    status: 0,
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: true, // 是否有奖励2
    networkId: 137,
    mdexDaily: 50, // 奖励2的每日产量
    mdexPid: '', // 奖励2池子id
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '2.8',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
    poolType: 3,
    multiple: '1X',
    showLptValue: false, // 展示奖励2总价值
    ledLight: true,
  },
  {
    title: 'Matic Short Token Pool',
    name: 'Matic',
    icon: MaticSvg,
    rewardIcon: GuardPng,
    shortToken: 'MATIC',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x5B546a0C6Adc3e42BFC1178788627039705d7217',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    // apr
    valueAprToken: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // lpt*2
    valueAprPath: [],
    rewardsAprPath: [],
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xc74947c65d99aADA1881Ade918FE19a61041c44d', // 质押的资产
    mlpDecimal: 6,
    byLink:
      'https://quickswap.exchange/#/swap?outputCurrency=0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
    abi: StakingPool,
    start_at: 1630080000,
    openDate: 1630080000,
    time: '',
    dueDate: 1632758400,
    earnName: 'APR',
    status: 0,
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    mdexDaily: 0, // 奖励2的每日产量
    mdexPid: '', // 奖励2池子id
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.7',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    title: 'ETH Short Token Pool',
    name: 'ETH',
    icon: ETHPng,
    rewardIcon: GuardPng,
    shortToken: 'ETH',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0xE1BcB05DD74C88BBae330801F6c9F4b5F4252E2a',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    // apr
    valueAprToken: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', // lpt*2
    valueAprPath: [],
    rewardsAprPath: [],
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x5458F3aeD04F6cDc2E57d374d20F226F84540569', // 质押的资产
    byLink:
      'https://quickswap.exchange/#/swap?outputCurrency=0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1630080000,
    openDate: 1630080000,
    time: '',
    dueDate: 1632758400,
    earnName: 'APR',
    status: 0,
    rewards: 'ETH Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    mdexDaily: 0, // 奖励2的每日产量
    mdexPid: '', // 奖励2池子id
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '6248',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
]
