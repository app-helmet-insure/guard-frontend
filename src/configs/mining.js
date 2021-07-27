import StakingPool3 from '../web3/abi/StakingPool3.json'
import StakingPool from '../web3/abi/StakingPool.json'
import QuickSwapRouter from '../web3/abi/QuickSwapRouter.json'
import QuickSwapFactory from '../web3/abi/QuickSwapFactory.json'


export default [
  {
    name: 'Quick Short',
    icon: 'Guard-USDC',
    shortToken: 'QUICK',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x8aE671d05937C78c4735C997974E38f54814d70a',
    rewards1Address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8', // GUARD
    rewards2Address: null,
    // apr
    valueAprToken: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8', // LPT: lpt*2 Short： 抵押物
    valueAprPath: [],
    rewardsAprPath: [],
    settleToken: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // usdc
    MLP: '0x62e4210cA2B844EeeD5e906dE6a7C5EF9A69C372', // 质押的资产
    byLink: 'https://quickswap.exchange/#/swap?outputCurrency=0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
    abi: StakingPool,
    start_at: 1627401600,
    time: '',
    openDate: 1627401600,
    dueDate: 1629993600,
    earnName: 'APR',
    status: 0,
    rewards: 'Quick Short',
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
    poolType: 3
  },
  {
    name: 'Matic Short',
    icon: 'Guard-USDC',
    shortToken: 'MATIC',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x6a2dfb87F5923a0D6ad8e5127ed001CDe29fE77a',
    rewards1Address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8', // GUARD
    rewards2Address: null,
    // apr
    valueAprToken: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8', // lpt*2
    valueAprPath: [],
    rewardsAprPath: [],
    settleToken: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // usdc
    MLP: '0xdBac5ccD625cCC9f373F1EC0163DF8f55f24F35C', // 质押的资产 stakingToken
    byLink: 'https://quickswap.exchange/#/swap?outputCurrency=0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
    abi: StakingPool,
    start_at: 1627401600,
    time: '',
    openDate: 1627401600,
    dueDate: 1629993600,
    earnName: 'APR',
    status: 0,
    rewards: 'Matic Short',
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
    poolType: 3
  },
  {
    name: 'Quick Short',
    icon: 'Guard-USDC',
    shortToken: 'QUICK',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0xf56197bc80c70024c925a2Cfe8ce27a5Be7835d7',
    rewards1Address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8', // GUARD
    rewards2Address: null,
    // apr
    valueAprToken: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8', // lpt*2
    valueAprPath: [],
    rewardsAprPath: [],
    settleToken: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // usdc
    MLP: '0x4d37D091dfD455fa25CA645453cC85BC9A3f02cB', // 质押的资产
    byLink: 'https://quickswap.exchange/#/swap?outputCurrency=0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
    abi: StakingPool,
    start_at: 1627401600,
    time: '',
    openDate: 1627401600,
    dueDate: 1629993600,
    earnName: 'APR',
    status: 0,
    rewards: 'Quick Short',
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
    poolType: 3
  },
  {
    name: 'Matic Short',
    icon: 'Guard-USDC',
    shortToken: 'MATIC',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x18869BC6A45cA83880D2564B249E61A793b794a1',
    rewards1Address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8', // GUARD
    rewards2Address: null,
    // apr
    valueAprToken: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8', // lpt*2
    valueAprPath: [],
    rewardsAprPath: [],
    settleToken: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // usdc
    MLP: '0x37cD121e89cfc85a800720f05810d6Fc66266A13', // 质押的资产
    byLink: 'https://quickswap.exchange/#/swap?outputCurrency=0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
    abi: StakingPool,
    start_at: 1627401600,
    time: '',
    openDate: 1627401600,
    dueDate: 1629993600,
    earnName: 'APR',
    status: 0,
    rewards: 'Matic Short',
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
    poolType: 3
  },
  {
    name: 'Eth Short',
    icon: 'Guard-USDC',
    shortToken: 'MATIC',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x05f7bd01433bfab7b8511788e678de5fa92e276a',
    rewards1Address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8', // GUARD
    rewards2Address: null,
    // apr
    valueAprToken: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8', // lpt*2
    valueAprPath: [],
    rewardsAprPath: [],
    settleToken: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // usdc
    MLP: '0x75a0669062c2a0bbc76719f542880c1185279549', // 质押的资产
    byLink: 'https://quickswap.exchange/#/swap?outputCurrency=0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
    abi: StakingPool,
    start_at: 1627401600,
    time: '',
    openDate: 1627401600,
    dueDate: 1629993600,
    earnName: 'APR',
    status: 0,
    rewards: 'Eth Short',
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
    poolType: 3
  }
]
