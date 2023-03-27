import StakingPool from '../web3/abi/StakingPool.json'
import QuickSwapRouter from '../web3/abi/QuickSwapRouter.json'
import QuickSwapFactory from '../web3/abi/QuickSwapFactory.json'

import ETHPng from '../assets/images/mining/pool/ETH.svg'
import MaticSvg from '../assets/images/mining/pool/MATIC.svg'
import QuickPng from '../assets/images/mining/pool/QUICK.png'
import GuardPng from '../assets/images/mining/pool/GUARD.png'
import GuardShortSvg from '../assets/images/mining/pool/guard-short.png'
import GuardQuickRewardSvg from '../assets/images/mining/pool/guard-quick-reward.png'
import GuardMaticSvg from '../assets/images/mining/pool/guard-matic.png'
import { ChainId } from '../web3/address'

export const MATIC_ADDRESS = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'
export const GUARD_ADDRESS = '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8'
export const USDC_ADDRESS = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
export const QUICK_ADDRESS = '0x831753DD7087CaC61aB5644b308642cc1c33Dc13'
export const DQUICK_ADDRESS = '0xf28164a485b0b2c90639e47b0f377b4a438a16b1'
export const WETH_ADDRESS = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619'


const poolTemplate = {
  guardCall: {
    title: 'Guard Short Token Pool',
    name: 'Guard',
    icon: GuardPng,
    rewardIcon: GuardPng,
    shortToken: 'GUARD',
    rewards1: 'GUARD',
    rewards2: null,
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null, // MATIC
    sort: {
      collateral: GUARD_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS,
    settleTokenDecimal: 6,
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    time: '',
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: ChainId.MATIC,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '1X',
    core: true,
    showLptValue: false, // 展示奖励2总价值
    ledLight: true,
  },
  guardPut: {
    title: 'Guard Short Token Pool',
    name: 'Guard',
    icon: GuardPng,
    rewardIcon: GuardPng,
    shortToken: 'GUARD',
    rewards1: 'GUARD',
    rewards2: null,
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: GUARD_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // 用哪个来计算，一般都是usdc
    settleTokenDecimal: 6,
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    time: '',
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    core: true,
    showLptValue: false, // 展示奖励2总价值
  },
  quickCall: {
    title: 'Quick Short Token Pool',
    name: 'Quick',
    icon: QuickPng,
    rewardIcon: GuardPng,
    shortToken: 'QUICK',
    rewards1: 'GUARD',
    rewards2: null,
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: QUICK_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${QUICK_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    time: '',
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  quickPut: {
    title: 'Quick Short Token Pool',
    name: 'Quick',
    icon: QuickPng,
    rewardIcon: GuardPng,
    shortToken: 'QUICK',
    rewards1: 'GUARD',
    rewards2: null,
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: QUICK_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${USDC_ADDRESS}`,
    abi: StakingPool,
    time: '',
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  maticCall: {
    title: 'Matic Short Token Pool',
    name: 'Matic', // 用于
    icon: MaticSvg,
    rewardIcon: GuardPng,
    shortToken: 'MATIC',
    rewards1: 'GUARD',
    rewards2: null,
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    sort: {
      collateral: MATIC_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    time: '',
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false, // 展示奖励2总价值
    ledLight: true,
  },
  maticPut: {
    title: 'Matic Short Token Pool',
    name: 'Matic',
    icon: MaticSvg,
    rewardIcon: GuardPng,
    shortToken: 'MATIC',
    rewards1: 'GUARD',
    rewards2: null,
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: MATIC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    time: '',
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  ethCall: {
    title: 'ETH Short Token Pool',
    name: 'ETH',
    icon: ETHPng,
    rewardIcon: GuardPng,
    shortToken: 'ETH',
    rewards1: 'GUARD',
    rewards2: null,
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: WETH_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    time: '',
    earnName: 'APR',
    rewards: 'ETH Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  }
}


export default [
  {
    title: 'Guard-USDC LPT Pool',
    name: 'Guard',
    icon: GuardShortSvg,
    rewardIcon: GuardQuickRewardSvg,
    shortToken: 'ETH',
    rewards1: 'GUARD',
    rewards2: 'dQUICK',
    address: '0x1dbdfea5f5cfb066ec5a74d3e8b9324cd2717c43',
    rewards1Address: GUARD_ADDRESS,
    rewards2Address: DQUICK_ADDRESS,
    reserve0: USDC_ADDRESS, // lpt的其中一个
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xD2EeeEdfcAF1457F7BC9cbA28d5316F73BB83b49', // 质押的资产
    byLink: `https://quickswap.exchange/#/add/${GUARD_ADDRESS}/${USDC_ADDRESS}`,
    byLinkName: 'Guard-USDC LPT',
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1628092800,
    openDate: 1628092800,
    time: '',
    dueDate: '',
    earnName: 'APR',
    rewards: 'Guard-USDC LPT Token',
    decimal: 18,
    is_coming: false,
    mdexReward: true, // 是否有奖励2
    networkId: 137,
    splitDigits: 8,
    cover: '', // Call看涨 Put看跌 空不展示
    strikeprice: '4288', // 翻倍或者腰斩价
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 2,
    ledLight: true, // 呼吸灯
    multiple: '6X', // 倍数
    core: true, // 星标
    showLptValue: true, // 展示奖励2总价值
    isNew: true,
    unstack: true, // 不堆叠
  },
  {
    title: 'Guard-USDC LPT Pool',
    name: 'Guard',
    icon: GuardShortSvg,
    rewardIcon: GuardQuickRewardSvg,
    shortToken: 'ETH',
    rewards1: 'GUARD',
    rewards2: 'QUICK',
    address: '0x51d0b183454c4d621dc789bd15Fe42Ca4B3D9871',
    rewards1Address: GUARD_ADDRESS,
    rewards2Address: QUICK_ADDRESS,
    reserve0: USDC_ADDRESS, // lpt的其中一个
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xD2EeeEdfcAF1457F7BC9cbA28d5316F73BB83b49', // 质押的资产
    byLink: `https://quickswap.exchange/#/add/${GUARD_ADDRESS}/${USDC_ADDRESS}`,
    byLinkName: 'Guard-USDC LPT',
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1628092800,
    openDate: 1628092800,
    time: '',
    dueDate: '1634227200',
    earnName: 'APR',
    rewards: 'Guard-USDC LPT Token',
    decimal: 18,
    is_coming: false,
    mdexReward: true, // 是否有奖励2
    networkId: 137,
    splitDigits: 8,
    cover: '', // Call看涨 Put看跌 空不展示
    strikeprice: '4288', // 翻倍或者腰斩价
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 2,
    ledLight: false, // 呼吸灯
    multiple: '', // 倍数
    core: false, // 星标
    showLptValue: true, // 展示奖励2总价值
    unstack: true, // 不堆叠
    warningTipLocal: 'mining_text28'
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
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    settleToken: USDC_ADDRESS,
    settleTokenDecimal: 6,
    MLP: '0xa2338656Ae2135CE743092b9049cbab1026ec601', // 质押的资产 stakingToken
    sort: {
      collateral: GUARD_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1628092800,
    openDate: 1628092800,
    time: '',
    dueDate: 1630080000,
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '5.14336',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
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
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: GUARD_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // 用哪个来计算，一般都是usdc
    settleTokenDecimal: 6,
    MLP: '0xeb33baeaC3B7921AfaaA491c6F9Ee8fd684a6B87', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    start_at: 1628092800,
    openDate: 1628092800,
    time: '',
    dueDate: 1630080000,
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '1.28584',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
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
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: MATIC_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xdBac5ccD625cCC9f373F1EC0163DF8f55f24F35C', // 质押的资产 stakingToken
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1627480800,
    openDate: 1627480800,
    time: '',
    dueDate: 1630080000,
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '1.841094',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
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
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: MATIC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x37cd121e89cfc85a800720f05810d6fc66266a13', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    start_at: 1627480800,
    openDate: 1627480800,
    time: '',
    dueDate: 1630080000,
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.460273',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'Quick Short Token Pool',
    name: 'Quick',
    icon: QuickPng,
    rewardIcon: GuardPng,
    shortToken: 'QUICK',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x8aE671d05937C78c4735C997974E38f54814d70a',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: QUICK_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x62e4210cA2B844EeeD5e906dE6a7C5EF9A69C372', // 质押的资产
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${QUICK_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1627480800,
    openDate: 1627480800,
    time: '',
    dueDate: 1630080000,
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '652',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
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
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: QUICK_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x4d37D091dfD455fa25CA645453cC85BC9A3f02cB', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${USDC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1627480800,
    openDate: 1627480800,
    time: '',
    dueDate: 1630080000,
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '163',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'ETH Short Token Pool',
    name: 'ETH',
    icon: ETHPng,
    rewardIcon: GuardPng,
    shortToken: 'ETH',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x05f7bd01433bfab7b8511788e678de5fa92e276a',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: WETH_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x75A0669062C2a0BbC76719f542880C1185279549', // 质押的资产
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1627480800,
    openDate: 1627480800,
    time: '',
    dueDate: 1630080000,
    earnName: 'APR',
    rewards: 'ETH Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '4288',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },

  // new

  {
    title: 'Guard Short Token Pool',
    name: 'Guard', // 用于
    icon: GuardPng,
    rewardIcon: GuardMaticSvg,
    shortToken: 'GUARD',
    rewards1: 'GUARD',
    rewards2: 'MATIC',
    address: '0x9A1C484fE5c81b7bcEcd39256Ae682Badc200F71',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: MATIC_ADDRESS, // MATIC 100个/d
    sort: {
      collateral: GUARD_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS,
    settleTokenDecimal: 6,
    MLP: '0x2aeF01c1744fdAEaecEcdda941976251fb735257', // 质押的资产 stakingToken
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1630080000,
    openDate: 1630080000,
    time: '',
    dueDate: 1632758400,
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: true, // 是否有奖励2
    networkId: ChainId.MATIC,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '1.1',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '1.5X',
    core: true,
    showLptValue: false, // 展示奖励2总价值
    ledLight: true,
    childPools: [ // 用来计算奖励，总奖励相加
      {
        // matic奖励
        address: '0x6AAafef56D17E6896B05F1C082dF5059ac52f159', // 子池地址
      }
    ]
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
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: GUARD_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // 用哪个来计算，一般都是usdc
    settleTokenDecimal: 6,
    MLP: '0x46D065e627B0fABb9179ffa9F8a75104B4dfE397', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    start_at: 1630080000,
    openDate: 1630080000,
    time: '',
    dueDate: 1632758400,
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.275',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
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
    sort: {
      collateral: QUICK_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xd5dc9Acb1CAA449C54C6cf8E449E0a08CaBadDCC', // 质押的资产
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${QUICK_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1630080000,
    openDate: 1630080000,
    time: '',
    dueDate: 1632758400,
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '1200',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
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
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: QUICK_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x622a12113f7699D9385E5FAE3c35A502910c8890', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${USDC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1630080000,
    openDate: 1630080000,
    time: '',
    dueDate: 1632758400,
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '300',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    title: 'Matic Short Token Pool',
    name: 'Matic', // 用于
    icon: MaticSvg,
    rewardIcon: GuardMaticSvg,
    shortToken: 'MATIC',
    rewards1: 'GUARD',
    rewards2: 'MATIC',
    address: '0x7580543F9C2C2B5b7aB5ecD2ed5a9F900e83e8f7',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: MATIC_ADDRESS,
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x76C06A374ad8Ce05B57AC043DE7643316772d6A5', // 质押的资产 stakingToken
    sort: {
      collateral: MATIC_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1630080000,
    openDate: 1630080000,
    time: '',
    dueDate: 1632758400,
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: true, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '2.8',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '1X',
    showLptValue: false, // 展示奖励2总价值
    ledLight: true,
    childPools: [ // 用来计算奖励，总奖励相加
      {
        // matic奖励
        address: '0x4e18bb070806d7000979Cf4055aC0E608231d7C1',
      }
    ]
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
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: MATIC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xc74947c65d99aADA1881Ade918FE19a61041c44d', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    start_at: 1630080000,
    openDate: 1630080000,
    time: '',
    dueDate: 1632758400,
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.7',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
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
    sort: {
      collateral: WETH_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x5458F3aeD04F6cDc2E57d374d20F226F84540569', // 质押的资产
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1630080000,
    openDate: 1630080000,
    time: '',
    dueDate: 1632758400,
    earnName: 'APR',
    rewards: 'ETH Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '6248',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },

  // 20210927

  {
    title: 'Guard Short Token Pool',
    name: 'Guard', // 用于
    icon: GuardPng,
    rewardIcon: GuardMaticSvg,
    shortToken: 'GUARD',
    rewards1: 'GUARD',
    rewards2: 'MATIC',
    address: '0x5Ad79fa55C55AfA81b647EAEEA3a791Dee06A601',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: MATIC_ADDRESS, // MATIC 100个/d
    sort: {
      collateral: GUARD_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS,
    settleTokenDecimal: 6,
    MLP: '0x9d0474eAD10A8a2E993109561D863e35Bf7B5095', // 质押的资产 stakingToken
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1632758400,
    openDate: 1632758400,
    time: '',
    dueDate: 1635523200,
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: true, // 是否有奖励2
    networkId: ChainId.MATIC,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '0.38',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '1.5X',
    core: true,
    showLptValue: false, // 展示奖励2总价值
    ledLight: true,
    childPools: [ // 用来计算奖励，总奖励相加
      {
        // matic奖励
        address: '0x3692cdb6b664e5be46c04d9e82cec34ed1be4b81', // 子池地址
      }
    ]
  },
  {
    staticFinish: true,
    title: 'Guard Short Token Pool',
    name: 'Guard',
    icon: GuardPng,
    rewardIcon: GuardPng,
    shortToken: 'GUARD',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x678bc3295e2915d22ace04cd8996e3c7fc239e0e',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: GUARD_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // 用哪个来计算，一般都是usdc
    settleTokenDecimal: 6,
    MLP: '0x78f20EE868AfD86eA77637d12f4CAC030C70A97f', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    start_at: 1632758400,
    openDate: 1632758400,
    time: '',
    dueDate: 1635523200,
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.095',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
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
    address: '0x00402a5d0d30ca9495cceec62fac9fe8cbfb4b63',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: QUICK_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x5Cfcc3D43727fd56ef0eef7A0d9B9D2a24a86190', // 质押的资产
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${QUICK_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1632758400,
    openDate: 1632758400,
    time: '',
    dueDate: 1635523200,
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '688.3',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'Quick Short Token Pool',
    name: 'Quick',
    icon: QuickPng,
    rewardIcon: GuardPng,
    shortToken: 'QUICK',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x7038d78f73b0a16e6feae6d53f28cf810eedb852',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: QUICK_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x8a87981F5D90BdDe119c0F394993cf3A08736484', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${USDC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1632758400,
    openDate: 1632758400,
    time: '',
    dueDate: 1635523200,
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '172.075',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'Matic Short Token Pool',
    name: 'Matic', // 用于
    icon: MaticSvg,
    rewardIcon: GuardMaticSvg,
    shortToken: 'MATIC',
    rewards1: 'GUARD',
    rewards2: 'MATIC',
    address: '0xC78eEfDC4D31A44A45182713d64Dbc8505636CcB',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: MATIC_ADDRESS,
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xaCBed2650021f3818304531fA6217B26fcFebAC5', // 质押的资产 stakingToken
    sort: {
      collateral: MATIC_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1632758400,
    openDate: 1632758400,
    time: '',
    dueDate: 1635523200,
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: true, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '2.18',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '1X',
    showLptValue: false, // 展示奖励2总价值
    ledLight: true,
    childPools: [ // 用来计算奖励，总奖励相加
      {
        // matic奖励
        address: '0xa9579F94A285DD51EBA60aC48Fb61ca50E803217',
      }
    ]
  },
  {
    staticFinish: true,
    title: 'Matic Short Token Pool',
    name: 'Matic',
    icon: MaticSvg,
    rewardIcon: GuardPng,
    shortToken: 'MATIC',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x9cd59b3cc31f13f672116bf6519c676da3438508',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: MATIC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x127a8d364730f61F070C6a35B689f6e5c1D3EeA6', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    start_at: 1632758400,
    openDate: 1632758400,
    time: '',
    dueDate: 1635523200,
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.545',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'ETH Short Token Pool',
    name: 'ETH',
    icon: ETHPng,
    rewardIcon: GuardPng,
    shortToken: 'ETH',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0xda8668a0b8b7a2caa2b753fed0cce95ba05fc0f3',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: WETH_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x47d81F02434Ce113AEd0796ae3bfF03129ebc689', // 质押的资产
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1632758400,
    openDate: 1632758400,
    time: '',
    dueDate: 1635523200,
    earnName: 'APR',
    rewards: 'ETH Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '5724',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },

  // 20211029

  {
    title: 'Guard Short Token Pool',
    name: 'Guard', // 用于
    icon: GuardPng,
    rewardIcon: GuardMaticSvg,
    shortToken: 'GUARD',
    rewards1: 'GUARD',
    rewards2: 'MATIC',
    address: '0x16F00095adF805906151b00d2c4A968934406AB3',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: MATIC_ADDRESS, // MATIC
    sort: {
      collateral: GUARD_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS,
    settleTokenDecimal: 6,
    MLP: '0x6d2Cb85d2D15f27D0eE78A67Ae2119d6722f80c6', // 质押的资产 stakingToken
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1635523200,
    openDate: 1635523200,
    time: '',
    dueDate: 1637942400,
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: true, // 是否有奖励2
    networkId: ChainId.MATIC,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '0.28',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '1.5X',
    core: true,
    showLptValue: false, // 展示奖励2总价值
    ledLight: true,
    childPools: [ // 用来计算奖励，总奖励相加
      {
        // matic奖励
        address: '0x68B41C5A1D26bcF112eB76104509D903a8Fb3a2b', // 子池地址
      }
    ]
  },
  {
    staticFinish: true,
    title: 'Guard Short Token Pool',
    name: 'Guard',
    icon: GuardPng,
    rewardIcon: GuardPng,
    shortToken: 'GUARD',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0xb7f165e09986b0c2163A03b78e7a94bC86BdDC30',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: GUARD_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // 用哪个来计算，一般都是usdc
    settleTokenDecimal: 6,
    MLP: '0xDc0D8Fe8e521f7Cc5d5C0CAd44A07c896B68C95B', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    start_at: 1635523200,
    openDate: 1635523200,
    time: '',
    dueDate: 1637942400,
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.07',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    core: true,
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'Quick Short Token Pool',
    name: 'Quick',
    icon: QuickPng,
    rewardIcon: GuardPng,
    shortToken: 'QUICK',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x374fBC93F4b835572CD4927ffF7D2d7C4a0245f3',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: QUICK_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xeFC2F6D1517E2b009a4Ce55542a5CC18C2CFba98', // 质押的资产
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${QUICK_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1635523200,
    openDate: 1635523200,
    time: '',
    dueDate: 1637942400,
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '860',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'Quick Short Token Pool',
    name: 'Quick',
    icon: QuickPng,
    rewardIcon: GuardPng,
    shortToken: 'QUICK',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x1BF41c4972265565324a587E1fDBC1318D7D3c2e',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: QUICK_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x70Ec09a5C261BFa41217f6EE9DC26bbDFF654f23', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${USDC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1635523200,
    openDate: 1635523200,
    time: '',
    dueDate: 1637942400,
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '215',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'Matic Short Token Pool',
    name: 'Matic', // 用于
    icon: MaticSvg,
    rewardIcon: GuardMaticSvg,
    shortToken: 'MATIC',
    rewards1: 'GUARD',
    rewards2: 'MATIC',
    address: '0x8f3F11b4Fb532dF7cDC373b9aDB1B9a962d30fC4',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: MATIC_ADDRESS,
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x63f4Ec3Fddcc1ea3453eEFE29F6D01049401AB2c', // 质押的资产 stakingToken
    sort: {
      collateral: MATIC_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1635523200,
    openDate: 1635523200,
    time: '',
    dueDate: 1637942400,
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: true, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '3.74',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '1X',
    showLptValue: false, // 展示奖励2总价值
    ledLight: true,
    childPools: [ // 用来计算奖励，总奖励相加
      {
        // matic奖励
        address: '0xdba27394D07F6C336B45419828Deea02bb166Bd9',
      }
    ]
  },
  {
    staticFinish: true,
    title: 'Matic Short Token Pool',
    name: 'Matic',
    icon: MaticSvg,
    rewardIcon: GuardPng,
    shortToken: 'MATIC',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0xdE0BB2645Cc10Fe0e2C9869DF0FD183BF0eea6D3',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: MATIC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x40334113964E6C6F9DadD8607010A001edA0EB37', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    start_at: 1635523200,
    openDate: 1635523200,
    time: '',
    dueDate: 1637942400,
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.93',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'ETH Short Token Pool',
    name: 'ETH',
    icon: ETHPng,
    rewardIcon: GuardPng,
    shortToken: 'ETH',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x994B0DC767967e8079D0571aCa58a25f0FaAe353',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: WETH_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x1310B8C9f36B69D4d2DAC2E0A7D0bEA9cAEc3A8c', // 质押的资产
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1635523200,
    openDate: 1635523200,
    time: '',
    dueDate: 1637942400,
    earnName: 'APR',
    rewards: 'ETH Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '8000',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },

  // 20211126

  {
    title: 'Guard Short Token Pool',
    name: 'Guard',
    icon: GuardPng,
    rewardIcon: GuardPng,
    shortToken: 'GUARD',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x48D6c50323211e435409DFA710d613021C96d891',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null, // MATIC
    sort: {
      collateral: GUARD_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS,
    settleTokenDecimal: 6,
    MLP: '0xCf07E78B12960fd22C293f8A80d4d5E14D65033e', // 质押的资产 stakingToken
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1637942400,
    openDate: 1637942400,
    time: '',
    dueDate: 1640966400,
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: ChainId.MATIC,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '0.14',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '1X',
    core: true,
    showLptValue: false, // 展示奖励2总价值
    ledLight: true,
  },
  {
    staticFinish: true,
    title: 'Guard Short Token Pool',
    name: 'Guard',
    icon: GuardPng,
    rewardIcon: GuardPng,
    shortToken: 'GUARD',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0xE9A7f54170F21803be62AA2F2818A586e117F834',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: GUARD_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // 用哪个来计算，一般都是usdc
    settleTokenDecimal: 6,
    MLP: '0x2E16489F65670A04cE5C0707f1B7CBcc08d17339', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    start_at: 1637942400,
    openDate: 1637942400,
    time: '',
    dueDate: 1640966400,
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.035',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    core: true,
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'Quick Short Token Pool',
    name: 'Quick',
    icon: QuickPng,
    rewardIcon: GuardPng,
    shortToken: 'QUICK',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x014e21ee729Bfb9b9D60f424Efcc4A72B9Ef9290',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: QUICK_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x26E5b665fFCfF6C57a2377C8b7eeBDafdCA23c2c', // 质押的资产
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${QUICK_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1637942400,
    openDate: 1637942400,
    time: '',
    dueDate: 1640966400,
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '660',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'Quick Short Token Pool',
    name: 'Quick',
    icon: QuickPng,
    rewardIcon: GuardPng,
    shortToken: 'QUICK',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x845E2c65EEFA3a793114f5dd7e1f51ef0F83b6a0',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: QUICK_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x17502b3cC19f5c208E34fa5eDC5CE6264F6D66e2', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${USDC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1637942400,
    openDate: 1637942400,
    time: '',
    dueDate: 1640966400,
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '165',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
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
    rewards2: null,
    address: '0x5483a412dc15f2102c767528D486f80a53994118',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xD1a1b7c3a4785168CFD864218BFf5EC02E908f02', // 质押的资产 stakingToken
    sort: {
      collateral: MATIC_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1637942400,
    openDate: 1637942400,
    time: '',
    dueDate: 1640966400,
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '3.6',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false, // 展示奖励2总价值
    ledLight: true,
  },
  {
    staticFinish: true,
    title: 'Matic Short Token Pool',
    name: 'Matic',
    icon: MaticSvg,
    rewardIcon: GuardPng,
    shortToken: 'MATIC',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0xE057daBC7630326819390e5D97B69633921cda65',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: MATIC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x03693b265f8c9E5d7783549f99C7Bfb84951FA71', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    start_at: 1637942400,
    openDate: 1637942400,
    time: '',
    dueDate: 1640966400,
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.9',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'ETH Short Token Pool',
    name: 'ETH',
    icon: ETHPng,
    rewardIcon: GuardPng,
    shortToken: 'ETH',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x6806b808e54a41501f9Acb7Ca6824adCfb892608',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: WETH_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x88d6061512a9f9A9a7b869154e4d52536754876c',
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1637942400,
    openDate: 1637942400,
    time: '',
    dueDate: 1640966400,
    earnName: 'APR',
    rewards: 'ETH Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '8600',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },


  // 20211230

  {
    staticFinish: true,
    title: 'Guard Short Token Pool',
    name: 'Guard',
    icon: GuardPng,
    rewardIcon: GuardPng,
    shortToken: 'GUARD',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0xEC21DDF06EFC25940b77d5B4B119057B0F2F329D',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null, // MATIC
    sort: {
      collateral: GUARD_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS,
    settleTokenDecimal: 6,
    MLP: '0xc2770ea4b167f94546449b0d6cc594da12e2e34a', // 质押的资产 stakingToken
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1640966400,
    openDate: 1640966400,
    time: '',
    dueDate: 1643385600,
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: ChainId.MATIC,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '0.10',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '1X',
    core: true,
    showLptValue: false, // 展示奖励2总价值
    ledLight: true,
  },
  {
    staticFinish: true,
    title: 'Guard Short Token Pool',
    name: 'Guard',
    icon: GuardPng,
    rewardIcon: GuardPng,
    shortToken: 'GUARD',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0xbD0721a5F84a60175c1710a35111C1Cc0c0f3537',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: GUARD_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // 用哪个来计算，一般都是usdc
    settleTokenDecimal: 6,
    MLP: '0x81d944dacf2329718dc593cb0b8842bafc705210', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    start_at: 1640966400,
    openDate: 1640966400,
    time: '',
    dueDate: 1643385600,
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.025',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    core: true,
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'Quick Short Token Pool',
    name: 'Quick',
    icon: QuickPng,
    rewardIcon: GuardPng,
    shortToken: 'QUICK',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x9704Db475fFCB4f769156918Db83f9a39668a43d',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: QUICK_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x1ea4756f2cec8de1cf9a85089e773008279fef08', // 质押的资产
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${QUICK_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1640966400,
    openDate: 1640966400,
    time: '',
    dueDate: 1643385600,
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '660',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
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
    address: '0xd78D090e85B32365d52943e024d87f821e86293d',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: QUICK_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x23cf6215abca66de464076a840c37c721c38f0b5', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${USDC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1640966400,
    openDate: 1640966400,
    time: '',
    dueDate: 1643385600,
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '165',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'Matic Short Token Pool',
    name: 'Matic', // 用于
    icon: MaticSvg,
    rewardIcon: GuardPng,
    shortToken: 'MATIC',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x4310B87Fa73669A47E616E000d7eD3E50E95f45B',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x92dbe68b978e4bbc498df0866b9e39d292202f1b', // 质押的资产 stakingToken
    sort: {
      collateral: MATIC_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1640966400,
    openDate: 1640966400,
    time: '',
    dueDate: 1643385600,
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '5.0',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false, // 展示奖励2总价值
    ledLight: true,
  },
  {
    staticFinish: true,
    title: 'Matic Short Token Pool',
    name: 'Matic',
    icon: MaticSvg,
    rewardIcon: GuardPng,
    shortToken: 'MATIC',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x7E2FA80d26d72396cc51f27362fCAf523B10df48',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: MATIC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x646f605a1f61fb68b9eeb8d3c52ba0cfcd42572c', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    start_at: 1640966400,
    openDate: 1640966400,
    time: '',
    dueDate: 1643385600,
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '1.25',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'ETH Short Token Pool',
    name: 'ETH',
    icon: ETHPng,
    rewardIcon: GuardPng,
    shortToken: 'ETH',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x1265E267A745A147a37cFfb06a00888086343583',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: WETH_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x2059824e627ecb7de3e7441560f19bdfcab3af6d',
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1640966400,
    openDate: 1640966400,
    time: '',
    dueDate: 1643385600,
    earnName: 'APR',
    rewards: 'ETH Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '7200',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },

  // 20220128

  {
    staticFinish: true,
    title: 'Guard Short Token Pool',
    name: 'Guard',
    icon: GuardPng,
    rewardIcon: GuardPng,
    shortToken: 'GUARD',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x396B15793dFf5814d606610B8AC4AC2b1B2EF013',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null, // MATIC
    sort: {
      collateral: GUARD_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS,
    settleTokenDecimal: 6,
    MLP: '0xff7c25a67cb55a8fc318508c6b038ba90770daa1', // 质押的资产 stakingToken
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1643385600,
    openDate: 1643385600,
    time: '',
    dueDate: 1645804800,
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: ChainId.MATIC,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '0.06',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '1X',
    core: true,
    showLptValue: false, // 展示奖励2总价值
    ledLight: true,
  },
  {
    staticFinish: true,
    title: 'Guard Short Token Pool',
    name: 'Guard',
    icon: GuardPng,
    rewardIcon: GuardPng,
    shortToken: 'GUARD',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x85a8704CD0C2f898dDFC7C5F7877c2cE80Bcf53c',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: GUARD_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // 用哪个来计算，一般都是usdc
    settleTokenDecimal: 6,
    MLP: '0x402ab513f788152effdf43275eb256bf20145799', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    start_at: 1643385600,
    openDate: 1643385600,
    time: '',
    dueDate: 1645804800,
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.015',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    core: true,
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'Quick Short Token Pool',
    name: 'Quick',
    icon: QuickPng,
    rewardIcon: GuardPng,
    shortToken: 'QUICK',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x343C94CecF62B296BcBd019Ef5906DF23bA25dAC',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: QUICK_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x8594c0c578ef0940c392625c7b5f2c1db21bacbc', // 质押的资产
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${QUICK_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1643385600,
    openDate: 1643385600,
    time: '',
    dueDate: 1645804800,
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '354',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'Quick Short Token Pool',
    name: 'Quick',
    icon: QuickPng,
    rewardIcon: GuardPng,
    shortToken: 'QUICK',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x2790881D3Cd60721AEA870758da5abF84D7d5c0f',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: QUICK_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x750134a200ce03adf34a11d96d32e9ba2fbcef8a', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${USDC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1643385600,
    openDate: 1643385600,
    time: '',
    dueDate: 1645804800,
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '88.5',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'Matic Short Token Pool',
    name: 'Matic', // 用于
    icon: MaticSvg,
    rewardIcon: GuardPng,
    shortToken: 'MATIC',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x60d43ea612ee03162ba36cd22b6c6427523607f0',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x52af47aa9167c9510de93af2d0ea291d48fbfb2a', // 质押的资产 stakingToken
    sort: {
      collateral: MATIC_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1643385600,
    openDate: 1643385600,
    time: '',
    dueDate: 1645804800,
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '3.28',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false, // 展示奖励2总价值
    ledLight: true,
  },
  {
    staticFinish: true,
    title: 'Matic Short Token Pool',
    name: 'Matic',
    icon: MaticSvg,
    rewardIcon: GuardPng,
    shortToken: 'MATIC',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x161C75bD49836CBbe96F02E45CAA67CD48B0E021',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: MATIC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xd9721427c48bc4d15ae92d6a73382d41a04ebd23', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    start_at: 1643385600,
    openDate: 1643385600,
    time: '',
    dueDate: 1645804800,
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.82',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'ETH Short Token Pool',
    name: 'ETH',
    icon: ETHPng,
    rewardIcon: GuardPng,
    shortToken: 'ETH',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x61ea5aaa350407f20deb8a6b4f2483537fc11ac0',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: WETH_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xf05dedd46aac10003088227addadb08c112548d9',
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1643385600,
    openDate: 1643385600,
    time: '',
    dueDate: 1645804800,
    earnName: 'APR',
    rewards: 'ETH Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '4936',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },

  // 20220225
  {
    title: 'Guard Short Token Pool',
    name: 'Guard',
    icon: GuardPng,
    rewardIcon: GuardPng,
    shortToken: 'GUARD',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0xb684b18637fc91aeead915f43f9ce5bd8876389d',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null, // MATIC
    sort: {
      collateral: GUARD_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS,
    settleTokenDecimal: 6,
    MLP: '0x10806030497cEc428a397F77dfCbAF984214BCa6', // 质押的资产 stakingToken
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1645804800,
    openDate: 1645804800,
    time: '',
    dueDate: 1648224000,
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: ChainId.MATIC,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '0.04',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '1X',
    core: true,
    showLptValue: false, // 展示奖励2总价值
    ledLight: true,
  },
  {
    staticFinish: true,
    title: 'Guard Short Token Pool',
    name: 'Guard',
    icon: GuardPng,
    rewardIcon: GuardPng,
    shortToken: 'GUARD',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0xa72cd1b3b6793626ae1a8e0e7a3835fc18162663',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: GUARD_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // 用哪个来计算，一般都是usdc
    settleTokenDecimal: 6,
    MLP: '0xE858393E613c2CaDd912337DdD11f58883BE9af7', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    start_at: 1645804800,
    openDate: 1645804800,
    time: '',
    dueDate: 1648224000,
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.01',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    core: true,
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'Quick Short Token Pool',
    name: 'Quick',
    icon: QuickPng,
    rewardIcon: GuardPng,
    shortToken: 'QUICK',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x6536938d028e28b94c7dadc900458d5812bec041',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: QUICK_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xA5396d9e32Da2603F6016608EA75f07512755F1F', // 质押的资产
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${QUICK_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1645804800,
    openDate: 1645804800,
    time: '',
    dueDate: 1648224000,
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '304',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'Quick Short Token Pool',
    name: 'Quick',
    icon: QuickPng,
    rewardIcon: GuardPng,
    shortToken: 'QUICK',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x28dedafad4e1cb1c49bb316e57059f9bc6b35995',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: QUICK_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xa96d085E9c302e5d37A463342FB3Ee4d877a5D71', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${USDC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1645804800,
    openDate: 1645804800,
    time: '',
    dueDate: 1648224000,
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '76',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'Matic Short Token Pool',
    name: 'Matic', // 用于
    icon: MaticSvg,
    rewardIcon: GuardPng,
    shortToken: 'MATIC',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x4be6e7dfbef42ae514a956a3d06d409b36272a00',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x07856e2A5c92Dad1cD74f4aa8f349891C4Cd1FC1', // 质押的资产 stakingToken
    sort: {
      collateral: MATIC_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1645804800,
    openDate: 1645804800,
    time: '',
    dueDate: 1648224000,
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '2.6',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false, // 展示奖励2总价值
    ledLight: true,
  },
  {
    staticFinish: true,
    title: 'Matic Short Token Pool',
    name: 'Matic',
    icon: MaticSvg,
    rewardIcon: GuardPng,
    shortToken: 'MATIC',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x1787a1e192213da6525b9f6c9903862c162849c5',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: MATIC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x13703F046d174a1c0C2b5AF63dCa4Cb0AbdE37FD', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    start_at: 1645804800,
    openDate: 1645804800,
    time: '',
    dueDate: 1648224000,
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.7',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'ETH Short Token Pool',
    name: 'ETH',
    icon: ETHPng,
    rewardIcon: GuardPng,
    shortToken: 'ETH',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0xef0f0f5a93606419ff2b8adaf4e42feefbe28d58',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: WETH_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x04435f5E4A1631D9a0EB1a644e60621EB3cEA96C',
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1645804800,
    openDate: 1645804800,
    time: '',
    dueDate: 1648224000,
    earnName: 'APR',
    rewards: 'ETH Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '4800',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },

  // 20220324
  {
    staticFinish: true,
    title: 'Guard Short Token Pool',
    name: 'Guard',
    icon: GuardPng,
    rewardIcon: GuardPng,
    shortToken: 'GUARD',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x49a985d1c9b846383924c76201C90001698cBb7F',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null, // MATIC
    sort: {
      collateral: GUARD_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS,
    settleTokenDecimal: 6,
    MLP: '0x976d7541E71Aad02639527f4e8495931ef5eC0a6', // 质押的资产 stakingToken
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1648224000,
    openDate: 1648224000,
    time: '',
    dueDate: 1651248000,
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: ChainId.MATIC,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '0.04',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '1X',
    core: true,
    showLptValue: false, // 展示奖励2总价值
    ledLight: true,
  },
  {
    staticFinish: true,
    title: 'Guard Short Token Pool',
    name: 'Guard',
    icon: GuardPng,
    rewardIcon: GuardPng,
    shortToken: 'GUARD',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x06528DEFA1a8376b4b4B5628fba2C62E1D1192D8',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: GUARD_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // 用哪个来计算，一般都是usdc
    settleTokenDecimal: 6,
    MLP: '0xC433d049De4A64E575219BDECB48dcC9e189BCF5', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    start_at: 1648224000,
    openDate: 1648224000,
    time: '',
    dueDate: 1651248000,
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.01',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    core: true,
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'Quick Short Token Pool',
    name: 'Quick',
    icon: QuickPng,
    rewardIcon: GuardPng,
    shortToken: 'QUICK',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x8a9a5Ecfa03789655Dd4D828F781638A290Aba69',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: QUICK_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xA9702Ad6c304614cdbd9f421A6F15E820698496d', // 质押的资产
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${QUICK_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1648224000,
    openDate: 1648224000,
    time: '',
    dueDate: 1651248000,
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '400',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'Quick Short Token Pool',
    name: 'Quick',
    icon: QuickPng,
    rewardIcon: GuardPng,
    shortToken: 'QUICK',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x0778F4164d3Edab34D9e927CF778FC45De872853',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: QUICK_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x5155D36D3baAA3fd0cC15Ac911dB3c307656e053', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${USDC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1648224000,
    openDate: 1648224000,
    time: '',
    dueDate: 1651248000,
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '100',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'Matic Short Token Pool',
    name: 'Matic', // 用于
    icon: MaticSvg,
    rewardIcon: GuardPng,
    shortToken: 'MATIC',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0xc1F3Fda024504248d87F973686DcD97B2037A5CD',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xf85C81d3024637a481714ebe49c267170f8E587F', // 质押的资产 stakingToken
    sort: {
      collateral: MATIC_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1648224000,
    openDate: 1648224000,
    time: '',
    dueDate: 1651248000,
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '3.2',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false, // 展示奖励2总价值
    ledLight: true,
  },
  {
    staticFinish: true,
    title: 'Matic Short Token Pool',
    name: 'Matic',
    icon: MaticSvg,
    rewardIcon: GuardPng,
    shortToken: 'MATIC',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x031cc01f0f5648E5cfB858006F8302EafABEec2E',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: MATIC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x1b4377cC5f9E1EDB6B76585555d65115481905ec', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    start_at: 1648224000,
    openDate: 1648224000,
    time: '',
    dueDate: 1651248000,
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.8',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },
  {
    staticFinish: true,
    title: 'ETH Short Token Pool',
    name: 'ETH',
    icon: ETHPng,
    rewardIcon: GuardPng,
    shortToken: 'ETH',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0xE8dD9fA886e586C9aD705A8Ac923fEd7A31E7319',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: WETH_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x372398cFE75caa2f477C9534f4145F0c0FabeE0B',
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1648224000,
    openDate: 1648224000,
    time: '',
    dueDate: 1651248000,
    earnName: 'APR',
    rewards: 'ETH Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '6000',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },

  // 20200429
  {
    title: 'Guard Short Token Pool',
    name: 'Guard',
    icon: GuardPng,
    rewardIcon: GuardPng,
    shortToken: 'GUARD',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x7108F4e70832489CFfB899Ba0adf75EF29Ba7ea2',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null, // MATIC
    sort: {
      collateral: GUARD_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS,
    settleTokenDecimal: 6,
    MLP: '0xA07DCCAB46b698ec54803FdC67468684d96cD113', // 质押的资产 stakingToken
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1651248000,
    openDate: 1651248000,
    time: '',
    dueDate: 1653667200,
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: ChainId.MATIC,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '0.02',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '1X',
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
    address: '0xBE2641DDB67ad19c9F808882605394001C5BB7a5',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: GUARD_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // 用哪个来计算，一般都是usdc
    settleTokenDecimal: 6,
    MLP: '0xbEd53a14c302b2CaeB621C19d44f55601d8D621D', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    start_at: 1651248000,
    openDate: 1651248000,
    time: '',
    dueDate: 1653667200,
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.005',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
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
    address: '0x22F4fE0273a32271a639d9ab04c4053331e01feC',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: QUICK_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x5Fa11F89a07D1EE73ceC734c9eF4ca1F1bc1c6b6', // 质押的资产
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${QUICK_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1651248000,
    openDate: 1651248000,
    time: '',
    dueDate: 1653667200,
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '320',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
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
    address: '0x25746C02DC9739781c29191642e244acd8E3CFDf',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: QUICK_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x99451475a11F23a4b39a4837882cA68eD4a3B776', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${USDC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1651248000,
    openDate: 1651248000,
    time: '',
    dueDate: 1653667200,
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '80',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
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
    rewards2: null,
    address: '0xa0327d51d5bbdc83810b4883E1532962DBBEA538',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xC2fFF205c69778a64C12B18DdA0CB8F986cd7Cf6', // 质押的资产 stakingToken
    sort: {
      collateral: MATIC_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1651248000,
    openDate: 1651248000,
    time: '',
    dueDate: 1653667200,
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '2.5',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
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
    address: '0xe22B2dC95E0C0abe2e2523b9d977ef85995a7E9f',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: MATIC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xd146806ba83c61229841b0457c06053C2Ae0c91F', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    start_at: 1651248000,
    openDate: 1651248000,
    time: '',
    dueDate: 1653667200,
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.625',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
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
    address: '0x9B47423274Ca65B880a1ce3E2649bA4aEa9Ebf65',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: WETH_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xe774F0AA23B73A6eF5523e368C537aD311fF7839',
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1651248000,
    openDate: 1651248000,
    time: '',
    dueDate: 1653667200,
    earnName: 'APR',
    rewards: 'ETH Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '5800',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },

  // 20200527
  {
    title: 'Guard Short Token Pool',
    name: 'Guard',
    icon: GuardPng,
    rewardIcon: GuardPng,
    shortToken: 'GUARD',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x821518080780dcE3Ce486F0225b17293B743d94D',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null, // MATIC
    sort: {
      collateral: GUARD_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS,
    settleTokenDecimal: 6,
    MLP: '0x620e9f1335536573574f88d9BD753369b99296d0', // 质押的资产 stakingToken
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1653667200,
    openDate: 1653667200,
    time: '',
    dueDate: 1656086400,
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: ChainId.MATIC,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '0.02',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '1X',
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
    address: '0x007f3fCEa77715437C0A0297235E366aFA206088',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: GUARD_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // 用哪个来计算，一般都是usdc
    settleTokenDecimal: 6,
    MLP: '0x7d06Bd9d90D46B9cE200eD3a1864fbf5cA583Fa8', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    start_at: 1653667200,
    openDate: 1653667200,
    time: '',
    dueDate: 1656086400,
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.005',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
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
    address: '0x81182B0ED25a5DBb10176130654bd59e05312C27',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: QUICK_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x6A7bE1c00aF5b7e3687722C9A85A617170cA17bE', // 质押的资产
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${QUICK_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1653667200,
    openDate: 1653667200,
    time: '',
    dueDate: 1656086400,
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '140',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
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
    address: '0xb51827D4ec917795A6Fe53308A0e95FC19864bF3',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: QUICK_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x43abb8F30342CC4cC8Ec53c6607F8314651AbC44', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${USDC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1653667200,
    openDate: 1653667200,
    time: '',
    dueDate: 1656086400,
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '35',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
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
    rewards2: null,
    address: '0x1E3dAe6166F24750C78e0C19d6Bd293fD6Ef1aB4',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xB0510795d56B648A8845872d5f3aB5E2022b8C1d', // 质押的资产 stakingToken
    sort: {
      collateral: MATIC_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1653667200,
    openDate: 1653667200,
    time: '',
    dueDate: 1656086400,
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '1',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
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
    address: '0xE48d49De466fE514162bAeE1BDcCAeFb8ea1B48e',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: MATIC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xf9a12d265e964C25f58176ee1CdD3C1F4F2c053e', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    start_at: 1653667200,
    openDate: 1653667200,
    time: '',
    dueDate: 1656086400,
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.25',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
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
    address: '0x94bf5FC7108e81F5E18d79BF225A08101c2e5f59',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: WETH_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xc7bEde2B202d8566ECd4BB0dDbC03EC96Cf7fCf3',
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1653667200,
    openDate: 1653667200,
    time: '',
    dueDate: 1656086400,
    earnName: 'APR',
    rewards: 'ETH Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '3600',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },

  // 20200626
  {
    title: 'Guard Short Token Pool',
    name: 'Guard',
    icon: GuardPng,
    rewardIcon: GuardPng,
    shortToken: 'GUARD',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0x43E84d4B03D986a4468512CeF7F5f92Bb74AFd5F',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null, // MATIC
    sort: {
      collateral: GUARD_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS,
    settleTokenDecimal: 6,
    MLP: '0x9e0ed648C35d293d5664264b4D4c1256fa016Db5', // 质押的资产 stakingToken
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1656259200,
    openDate: 1656259200,
    time: '',
    dueDate: 1659110400,
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: ChainId.MATIC,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '0.016',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '1X',
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
    address: '0xE162e12941C2376B7998981C473FfA4f809827cc',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: GUARD_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // 用哪个来计算，一般都是usdc
    settleTokenDecimal: 6,
    MLP: '0xFDDc6F7f1372d2f35b9a850ef7B1F25B642db201', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    start_at: 1656259200,
    openDate: 1656259200,
    time: '',
    dueDate: 1659110400,
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.004',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
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
    address: '0x69Ff7E75F980Bdea026bccd442621984Ce38b045',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: QUICK_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x8dB73cdb84d1Fdf0b172158c7d81E610A89b2ed1', // 质押的资产
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${QUICK_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1656259200,
    openDate: 1656259200,
    time: '',
    dueDate: 1659110400,
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '100',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
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
    address: '0x90Eb6EB298C8f53a7c528b47299a3Ebc483cfF85',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: QUICK_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x641CBE683a378de1ab2a6c2082060f20a196A0C8', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${USDC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1656259200,
    openDate: 1656259200,
    time: '',
    dueDate: 1659110400,
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '25',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
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
    rewards2: null,
    address: '0xbEbAb0e4D78B902d503e57A91cF90fcc47C5C869',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x19CED413Cd90d97a03e9F01bCEB55621616865Cb', // 质押的资产 stakingToken
    sort: {
      collateral: MATIC_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1656259200,
    openDate: 1656259200,
    time: '',
    dueDate: 1659110400,
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '1',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
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
    address: '0x6CdD3c4fC38a279c41Ba12995Ebc3BaB3A4B57Cb',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: MATIC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xd1cDF1F7B2c78dc295926B21eb6f5d4A74715AF1', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    start_at: 1656259200,
    openDate: 1656259200,
    time: '',
    dueDate: 1659110400,
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.25',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
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
    address: '0xBDfB45Cae6f4940Ae582205527fe27CA8b78aD9f',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: WETH_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x247884FE13aF8C743A772f4B1Db577156B3BebAf',
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1656259200,
    openDate: 1656259200,
    time: '',
    dueDate: 1659110400,
    earnName: 'APR',
    rewards: 'ETH Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '2400',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },

  // 20200728
  {
    title: 'Guard Short Token Pool',
    name: 'Guard',
    icon: GuardPng,
    rewardIcon: GuardPng,
    shortToken: 'GUARD',
    rewards1: 'GUARD',
    rewards2: null,
    address: '0xF82842010DeA682CeFAA52Fb2aC0f57207B8Db2F',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null, // MATIC
    sort: {
      collateral: GUARD_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS,
    settleTokenDecimal: 6,
    MLP: '0x75852e4A9f4a9a99A42866F7b6c099aF18e4De89', // 质押的资产 stakingToken
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1659110400,
    openDate: 1659110400,
    time: '',
    dueDate: 1661529600,
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: ChainId.MATIC,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '0.02',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '1X',
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
    address: '0x520C3d872A28cD9298e15F618159791a6671199F',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: GUARD_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // 用哪个来计算，一般都是usdc
    settleTokenDecimal: 6,
    MLP: '0xa09c7A33f06550C51b25de6a689bBDe19f686eC7', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    start_at: 1659110400,
    openDate: 1659110400,
    time: '',
    dueDate: 1661529600,
    earnName: 'APR',
    rewards: 'Guard Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.005',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
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
    address: '0x4846C91C2530648Ee35c12c7Db9a467c3aC22AC7',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: QUICK_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xAEE32515aDD0322c2C3f4190756B23C52B4AF9b6', // 质押的资产
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${QUICK_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1659110400,
    openDate: 1659110400,
    time: '',
    dueDate: 1661529600,
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '160',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
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
    address: '0x74466009Ec5d2177C4C86F4005DF855B4F87b618',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: QUICK_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0x2490E447E367173f46a89996515D7E38Eac0e211', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${USDC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1659110400,
    openDate: 1659110400,
    time: '',
    dueDate: 1661529600,
    earnName: 'APR',
    rewards: 'Quick Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '40',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
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
    rewards2: null,
    address: '0x5D8b733A603EE3A73d2Bc6122fdb2ca15AEE3336',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xB2e5A9CafE3296e341536ffb6d99F032Dc4720a2', // 质押的资产 stakingToken
    sort: {
      collateral: MATIC_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    mlpDecimal: 18,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${MATIC_ADDRESS}`,
    abi: StakingPool,
    start_at: 1659110400,
    openDate: 1659110400,
    time: '',
    dueDate: 1661529600,
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '1.8',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
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
    address: '0x785aE0547ca237DE7ce19177f7985337AC0EA09a',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: USDC_ADDRESS, //  抵押物
      underlying: MATIC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xD28E031963f556A4a13E04A8048da121A95F0300', // 质押的资产
    mlpDecimal: 6,
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    start_at: 1659110400,
    openDate: 1659110400,
    time: '',
    dueDate: 1661529600,
    earnName: 'APR',
    rewards: 'Matic Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Put', // Call看涨 Put看跌
    strikeprice: '0.45',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
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
    address: '0x0aF7733e4e3c668a0B3F0009FFe8f38817FFbb6A',
    rewards1Address: GUARD_ADDRESS, // GUARD
    rewards2Address: null,
    sort: {
      collateral: WETH_ADDRESS, //  抵押物
      underlying: USDC_ADDRESS, // 标的物
    },
    settleToken: USDC_ADDRESS, // usdc
    settleTokenDecimal: 6,
    MLP: '0xc1b6c67730Bd10f8dcd2B48eF7a165499372b549',
    byLink: `https://quickswap.exchange/#/swap?outputCurrency=${GUARD_ADDRESS}`,
    abi: StakingPool,
    mlpDecimal: 18,
    start_at: 1659110400,
    openDate: 1659110400,
    time: '',
    dueDate: 1661529600,
    earnName: 'APR',
    rewards: 'ETH Short Token',
    decimal: 18,
    is_coming: false,
    mdexReward: false, // 是否有奖励2
    networkId: 137,
    splitDigits: 4,
    cover: 'Call', // Call看涨 Put看跌
    strikeprice: '3200',
    mineMountainAddress: '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699', // 矿山地址
    routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    routerAbi: QuickSwapRouter,
    factoryAddress: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    factoryAbi: QuickSwapFactory,
    quickToken: QUICK_ADDRESS,
    poolType: 3,
    multiple: '0.5X',
    showLptValue: false // 展示奖励2总价值
  },

  // 20200826
  {
    ...poolTemplate.guardCall,
    address: '0x8aDB6c2B2DD54c713Cc52CA7c0dC91b02c72A7cF',
    MLP: '0xd4Abbad8ca24A8b136666e1D18aAd5363c15283C', // 质押的资产 stakingToken
    start_at: 1661529600,
    openDate: 1661529600,
    dueDate: 1664553600,
    strikeprice: '0.012',

  },
  {
    ...poolTemplate.guardPut,
    address: '0x428ffc7587411aF0ee798DCC1D4384E61AC8F9cC',
    MLP: '0xB5D71CedE949Fd3e4c15135c06f17A9d5e42F250', // 质押的资产
    start_at: 1661529600,
    openDate: 1661529600,
    dueDate: 1664553600,
    strikeprice: '0.003',
  },
  {
    ...poolTemplate.quickCall,
    address: '0x65Eb76829944fD82686a172390B875C7B698D9aA',
    MLP: '0x59d40C8D0dCf35519DFB1c617e6aDAd6e9a6C4b1', // 质押的资产
    start_at: 1661529600,
    openDate: 1661529600,
    dueDate: 1664553600,
    strikeprice: '150',
  },
  {
    ...poolTemplate.quickPut,
    address: '0x1FC1c3459A4482a22F54496639dc1095655160F9',
    MLP: '0x1549451604fEa3024D03a02672eE67651c4BF141', // 质押的资产
    start_at: 1661529600,
    openDate: 1661529600,
    dueDate: 1664553600,
    strikeprice: '47.5',
  },
  {
    ...poolTemplate.maticCall,
    address: '0x2F1f3f7caf70D5E764E8eD45E00971A600791338',
    MLP: '0x47824504A2c01F1b449835295bb82690b2965645', // 质押的资产 stakingToken
    start_at: 1661529600,
    openDate: 1661529600,
    dueDate: 1664553600,
    strikeprice: '1.6',
  },
  {
    ...poolTemplate.maticPut,

    address: '0x7Abec3240Af807cd6cEFbe6DCa9178E11b79fFdC',
    MLP: '0xFDEAec304A682459c1070f1ffA29b20c6783BFAE', // 质押的资产
    start_at: 1661529600,
    openDate: 1661529600,
    dueDate: 1664553600,
    strikeprice: '0.4',
  },
  {
    ...poolTemplate.ethCall,

    address: '0x6297F9D2D838CB57c194393f8d1EC3528aa0e08a',
    MLP: '0xaB4b54DF2CD793138Bad7CA81377D47Fc3A394Bb',
    start_at: 1661529600,
    openDate: 1661529600,
    dueDate: 1664553600,
    strikeprice: '3400',
  },
  // 20200930
  {
    ...poolTemplate.guardCall,
    address: '0x129F0b06Fd8384Ae2559Ac88cF3682bAb21BC929',
    MLP: '0x681c8dd2A7F65B111dEbdF71d9c3372AF3BEF662', // 质押的资产 stakingToken
    start_at: 1664553600,
    openDate: 1664553600,
    dueDate: 1666972800,
    strikeprice: '0.01',

  },
  {
    ...poolTemplate.guardPut,
    address: '0x5f88980D51929A5459f0861B0D6C3Ed0C17c0f3D',
    MLP: '0x142515f442CadBAEdf7a0b7427DD2e4fb4000492', // 质押的资产
    start_at: 1664553600,
    openDate: 1664553600,
    dueDate: 1666972800,
    strikeprice: '0.0025',
  },
  {
    ...poolTemplate.quickCall,
    address: '0xE98A436f848C3bd8677F410b78a3720c176235B1',
    MLP: '0x6C1ad11d3eF2f41FF76ED1C09477615d1fBFA7f1', // 质押的资产
    start_at: 1664553600,
    openDate: 1664553600,
    dueDate: 1666972800,
    strikeprice: '100',
  },
  {
    ...poolTemplate.quickPut,
    address: '0x0190dcA0FEf2aF2c86370da63104D97425FC7A29',
    MLP: '0xF19d9753470C9191CFd38e4Ec17410A43CAc5Ad7', // 质押的资产
    start_at: 1664553600,
    openDate: 1664553600,
    dueDate: 1666972800,
    strikeprice: '25',
  },
  {
    ...poolTemplate.maticCall,
    address: '0x42f9c8c47050cA13Bd7FF4b6b729F335af850f15',
    MLP: '0x7A00Ebf0276e0D0A788fc8c019B19Ab77402454f', // 质押的资产 stakingToken
    start_at: 1664553600,
    openDate: 1664553600,
    dueDate: 1666972800,
    strikeprice: '1.4',
  },
  {
    ...poolTemplate.maticPut,

    address: '0xC1102942606498f9F94a541f6001c548E7810F20',
    MLP: '0xb56C7FecB60D40d67f6dE21B45434f7c5AE2375d', // 质押的资产
    start_at: 1664553600,
    openDate: 1664553600,
    dueDate: 1666972800,
    strikeprice: '0.35',
  },
  {
    ...poolTemplate.ethCall,

    address: '0x8353865D1Dd7F88884282f662ED8553887c8A9Bd',
    MLP: '0xD00674eBd0608d6bCB2cde1EaB7a8192c30c1349',
    start_at: 1664553600,
    openDate: 1664553600,
    dueDate: 1666972800,
    strikeprice: '2600',
  },

  // 20201028
  {
    ...poolTemplate.guardCall,
    address: '0x550579f657e8F5466b895c9485E4B8972dfAcB2D',
    MLP: '0xc185650Ef1eeE906eDd3fF6778B7d520ab8Af9ff', // 质押的资产 stakingToken
    start_at: 1666972800,
    openDate: 1666972800,
    dueDate: 1669392000,
    strikeprice: '0.01',
  },
  {
    ...poolTemplate.guardPut,
    address: '0x489F6df108b8C03f3fe47f76EEEA95F99b8ca3DF',
    MLP: '0xAe522Cc6668869ad65f1443CEa8bacA4450e687d', // 质押的资产
    start_at: 1666972800,
    openDate: 1666972800,
    dueDate: 1669392000,
    strikeprice: '0.002',
  },
  {
    ...poolTemplate.quickCall,
    address: '0x0F1903092F8003Df0AA9C332D99D26201b4c379d',
    MLP: '0x7fA449ab5b8855A60D8634c47c9a0F1eb154cA35', // 质押的资产
    start_at: 1666972800,
    openDate: 1666972800,
    dueDate: 1669392000,
    strikeprice: '120',
  },
  {
    ...poolTemplate.quickPut,
    address: '0x83Ee9c6d4C43bccA274C0e82A87c6f1E51e55D39',
    MLP: '0x600C18d151D72a7c5e55dA7CB5Aa5A663D684691', // 质押的资产
    start_at: 1666972800,
    openDate: 1666972800,
    dueDate: 1669392000,
    strikeprice: '30',
  },
  {
    ...poolTemplate.maticCall,
    address: '0xb250Ad68244a662fBC195501f214DA656A64a41c',
    MLP: '0x61fC167Dca585c2bF81a148942A9A79F416A3292', // 质押的资产 stakingToken
    start_at: 1666972800,
    openDate: 1666972800,
    dueDate: 1669392000,
    strikeprice: '1.8',
  },
  {
    ...poolTemplate.maticPut,
    address: '0x0Be5f4ba2f31788DF281CDb847e3A8c5276EA4f8',
    MLP: '0xe20A3C300e91178e972a8B1BC9334D80EE2a9e31', // 质押的资产
    start_at: 1666972800,
    openDate: 1666972800,
    dueDate: 1669392000,
    strikeprice: '0.45',
  },
  {
    ...poolTemplate.ethCall,
    address: '0xe41E96aa828A916Cf98f1f936d0EfaF6d3079c47',
    MLP: '0xe5D4DD2b56dD6a522Ef8F6E9a8d9eaADcb5D8Baf',
    start_at: 1666972800,
    openDate: 1666972800,
    dueDate: 1669392000,
    strikeprice: '3000',
  },

  // 20201124
  {
    ...poolTemplate.guardCall,
    address: '0x82d4AcD99Eea8d6f4396f42221Ede048020CFb2a',
    MLP: '0x460949AD7082A7913754A850d414220d5241DCE6', // 质押的资产 stakingToken
    start_at: 1669392000,
    openDate: 1669392000,
    dueDate: 1672416000,
    strikeprice: '0.008',
  },
  {
    ...poolTemplate.guardPut,
    address: '0x37A37C15bc8D63941A78BD805D34cD96b952F587',
    MLP: '0xEfFbc0B41e72d0E2A366B8d2F23914C2A379Dde7', // 质押的资产
    start_at: 1669392000,
    openDate: 1669392000,
    dueDate: 1672416000,
    strikeprice: '0.002',
  },
  {
    ...poolTemplate.quickCall,
    address: '0x31120Eb3Dc8Ef92bF68447852c583d77690FDc3a',
    MLP: '0xAaEf61c3fdF1F7A6499302273E450F0FdE341547', // 质押的资产
    start_at: 1669392000,
    openDate: 1669392000,
    dueDate: 1672416000,
    strikeprice: '100',
  },
  {
    ...poolTemplate.quickPut,
    address: '0x2f2881E4FcD6ca7D6A9F3E564bcEcC5149b74c78',
    MLP: '0x3A6cf1304739769a056dC01c9584A3e51672368b', // 质押的资产
    start_at: 1669392000,
    openDate: 1669392000,
    dueDate: 1672416000,
    strikeprice: '25',
  },
  {
    ...poolTemplate.maticCall,
    address: '0x944075Cbd248fa2974fbc96060f5d00CBaf134CE',
    MLP: '0x571d520F60351E18349B7F5487D82a3ca0524BD5', // 质押的资产 stakingToken
    start_at: 1669392000,
    openDate: 1669392000,
    dueDate: 1672416000,
    strikeprice: '1.6',
  },
  {
    ...poolTemplate.maticPut,
    address: '0x4E6e196e501aD3d82dDab82Cd0B9191Be98Df46a',
    MLP: '0x0BA8eFD90112A4DC9CE0C79D890a4eb8f6938e9b', // 质押的资产
    start_at: 1669392000,
    openDate: 1669392000,
    dueDate: 1672416000,
    strikeprice: '0.4',
  },
  {
    ...poolTemplate.ethCall,
    address: '0x944cabb5881BFeC5386AF0CAB84728fe2a148702',
    MLP: '0xD85bbE74C1568E4edf73dD6DCe22936f92165311',
    start_at: 1669392000,
    openDate: 1669392000,
    dueDate: 1672416000,
    strikeprice: '2400',
  },

  // 20221230
  {
    ...poolTemplate.guardCall,
    address: '0xD2518922cc4D54F592270307d0F15b8332916Cf6',
    MLP: '0xcb24ec65307FDc6b7D02BdAC7e460E56251BF3DD', // 质押的资产 stakingToken
    start_at: 1672416000,
    openDate: 1672416000,
    dueDate: 1675440000,
    strikeprice: '0.008',
  },
  {
    ...poolTemplate.guardPut,
    address: '0x83e4dFE0e4fD296Afb01Ca7B2EC8d28EebE32c78',
    MLP: '0xa9E52A20846597BA26b2a2E8Dc8F44d5Ec78263C', // 质押的资产
    start_at: 1672416000,
    openDate: 1672416000,
    dueDate: 1675440000,
    strikeprice: '0.002',
  },
  {
    ...poolTemplate.quickCall,
    address: '0x97aBdbB4eDd882740146fecba8C8fADE1342D585',
    MLP: '0x7F698b4ad03D8DC7A89b33FDFC3f7Cd9F58aB12d', // 质押的资产
    start_at: 1672416000,
    openDate: 1672416000,
    dueDate: 1675440000,
    strikeprice: '92',
  },
  {
    ...poolTemplate.quickPut,
    address: '0xc8EDA19aEB0F924C19Cbb8706AF9b9e081fcC27c',
    MLP: '0x3f51c56486400D20999F9B81A776C3e88E91627D', // 质押的资产
    start_at: 1672416000,
    openDate: 1672416000,
    dueDate: 1675440000,
    strikeprice: '23',
  },
  {
    ...poolTemplate.maticCall,
    address: '0x13d08c23b0b580207149550123f81eFa02560d23',
    MLP: '0x7720824377E759a10dDe54249a509445F3B7dD4F', // 质押的资产 stakingToken
    start_at: 1672416000,
    openDate: 1672416000,
    dueDate: 1675440000,
    strikeprice: '1.6',
  },
  {
    ...poolTemplate.maticPut,
    address: '0x19864738386b6B992cf596aA70d315aD7180b9cA',
    MLP: '0x649dc0993b94E5E49AAfc5fA6789298d45C1DC77', // 质押的资产
    start_at: 1672416000,
    openDate: 1672416000,
    dueDate: 1675440000,
    strikeprice: '0.4',
  },
  {
    ...poolTemplate.ethCall,
    address: '0xCfFbBB2E353dCe035b4FCc170861ec2F07B4844d',
    MLP: '0xD67008215386ab6cf48AC6d31aeF1faC6D0A5460',
    start_at: 1672416000,
    openDate: 1672416000,
    dueDate: 1675440000,
    strikeprice: '2400',
  },

  // 20230203
  {
    ...poolTemplate.guardCall,
    address: '0x15CE6B80899A7Af66398b867f5d2BC8b48708336',
    MLP: '0x1B7aCEcb55557Ae5DD3a78b2d87857A694063B9C', // 质押的资产 stakingToken
    start_at: 1675440000,
    openDate: 1675440000,
    dueDate: 1677513600,
    strikeprice: '0.008',
  },
  {
    ...poolTemplate.guardPut,
    address: '0x045De5E81Bf31bE4C946ADf599D0a4C51Cd97652',
    MLP: '0x645Fd9C3E12c2055A087Be570A3aAf3C08fcbe33', // 质押的资产
    start_at: 1675440000,
    openDate: 1675440000,
    dueDate: 1677513600,
    strikeprice: '0.002',
  },
  {
    ...poolTemplate.quickCall,
    address: '0x3a88Af41a40bE71912D53dCD0a16e5036f9e4bde',
    MLP: '0x0161b61b3F20ce6B2E94F5E5a2B543d7f688cE3d', // 质押的资产
    start_at: 1675440000,
    openDate: 1675440000,
    dueDate: 1677513600,
    strikeprice: '120',
  },
  {
    ...poolTemplate.quickPut,
    address: '0xdb6B17010B28cF1893DaD5DF5606a343399145bd',
    MLP: '0x6B05CA51d1481Ec4B892C33e108e556D8771E0Df', // 质押的资产
    start_at: 1675440000,
    openDate: 1675440000,
    dueDate: 1677513600,
    strikeprice: '30',
  },
  {
    ...poolTemplate.maticCall,
    address: '0xbcc8e45a1759EFAac980aA33dD3a8aaEa8eB0456',
    MLP: '0x40be0d6DD580d1a74811391ff6316bC7BFD8f0B1', // 质押的资产 stakingToken
    start_at: 1675440000,
    openDate: 1675440000,
    dueDate: 1677513600,
    strikeprice: '2.4',
  },
  {
    ...poolTemplate.maticPut,
    address: '0x8AA837f37B079352CD418C95c7C2adbB98815c4B',
    MLP: '0x29903E768AD827787781e6e853E2A5763AF603ff', // 质押的资产
    start_at: 1675440000,
    openDate: 1675440000,
    dueDate: 1677513600,
    strikeprice: '0.6',
  },
  {
    ...poolTemplate.ethCall,
    address: '0x76FDC332d24d7AaFDBD39AE0F7d98863f2849544',
    MLP: '0xCb1fAD0a878adA430DE5c8596f18706B8cB492da',
    start_at: 1675440000,
    openDate: 1675440000,
    dueDate: 1677513600,
    strikeprice: '3366',
  },


  // 20230227
  {
    ...poolTemplate.guardCall,
    address: '0xd5Ab91989C42709F62171810fFac2781a789e7D5',
    MLP: '0xFE1EE6D7522c348a4b56FdEb35D60c0477f5799D', // 质押的资产 stakingToken
    start_at: 1677513600,
    openDate: 1677513600,
    dueDate: 1679932800,
    strikeprice: '0.006',
  },
  {
    ...poolTemplate.guardPut,
    address: '0x52B49E09078c7A3807F0E1f9080f7260A37e40fB',
    MLP: '0xEAb4D6E8017208AB67b99f67dBAd3a7D01a1B596', // 质押的资产
    start_at: 1677513600,
    openDate: 1677513600,
    dueDate: 1679932800,
    strikeprice: '0.0015',
  },
  {
    ...poolTemplate.quickCall,
    address: '0x9d64D8355d9C87e42C63cdFB06977D5bBEaDEE5F',
    MLP: '0x06e65Ca21b84fAb9522384b71A6851602c9CC486', // 质押的资产
    start_at: 1677513600,
    openDate: 1677513600,
    dueDate: 1679932800,
    strikeprice: '228',
  },
  {
    ...poolTemplate.quickPut,
    address: '0x64Fb77700dEc36F441c0E7f1D38E454fBF8E6817',
    MLP: '0x541350dcb86674192c80750Ba3295b2A74C6185F', // 质押的资产
    start_at: 1677513600,
    openDate: 1677513600,
    dueDate: 1679932800,
    strikeprice: '57',
  },
  {
    ...poolTemplate.maticCall,
    address: '0xc46aEEf55FB8E22FE58C9313e5BeDbC0b9bCf212',
    MLP: '0xc49A2CB710AEe0e24633e6D5A8132677EEf8D99F', // 质押的资产 stakingToken
    start_at: 1677513600,
    openDate: 1677513600,
    dueDate: 1679932800,
    strikeprice: '2.5',
  },
  {
    ...poolTemplate.maticPut,
    address: '0xC6B8AaBE458FA63F9690Dc495DF59cE0BBB4B3eA',
    MLP: '0xe0853D2201DD99B338BC5D3EBECCdFf38cD435BC', // 质押的资产
    start_at: 1677513600,
    openDate: 1677513600,
    dueDate: 1679932800,
    strikeprice: '0.62',
  },
  {
    ...poolTemplate.ethCall,
    address: '0xF4410E5383548BcB2Fad4A3a80Ea3190c3FdeA22',
    MLP: '0x59f03eEfF0edb14707aC2cE4a3A13A003eDB3a18',
    start_at: 1677513600,
    openDate: 1677513600,
    dueDate: 1679932800,
    strikeprice: '3200',
  },

  // 20230327
  {
    ...poolTemplate.guardCall,
    address: '0x13b6c0CB9D4c36B4e615799c3B5da9b923B79249',
    MLP: '0xA4628683AeE7a4CE0e5363e7A630367e04fcFD43', // 质押的资产 stakingToken
    start_at: 1677513600,
    openDate: 1677513600,
    dueDate: 1687708800,
    strikeprice: '0.006',
  },
  {
    ...poolTemplate.guardPut,
    address: '0x5BFC7FbD74a665b987AD3E8aE2FA5E033B738429',
    MLP: '0xc8Eb142B82B9982bf7BE8fE14d5B2dE506F80643', // 质押的资产
    start_at: 1679932800,
    openDate: 1679932800,
    dueDate: 1687708800,
    strikeprice: '0.0015',
  },
  {
    ...poolTemplate.quickCall,
    address: '0x64a864a802aedd18eaa318953628623bae300916',
    MLP: '0x55c766550677bEEAA0C497F380B20D53677730E2', // 质押的资产
    start_at: 1679932800,
    openDate: 1679932800,
    dueDate: 1687708800,
    strikeprice: '196',
  },
  {
    ...poolTemplate.quickPut,
    address: '0x04555069d4e22fAbA5B91c03401db22272A30785',
    MLP: '0x7FDdBbA6FE4a43aB53adF2749e121F5710a02e41', // 质押的资产
    start_at: 1679932800,
    openDate: 1679932800,
    dueDate: 1687708800,
    strikeprice: '49',
  },
  {
    ...poolTemplate.maticCall,
    address: '0xe42e4De733054C6B2488899dD85a4dAdd700B306',
    MLP: '0x11BD65BEAd3C5F8eBE38688031BB67dB8Edb8A8A', // 质押的资产 stakingToken
    start_at: 1679932800,
    openDate: 1679932800,
    dueDate: 1687708800,
    strikeprice: '2.2',
  },
  {
    ...poolTemplate.maticPut,
    address: '0xFC4aE9309ACB1E6201F80Bc6A7a0CD201B39D644',
    MLP: '0xa157B42C4Bb3a59853Ed3F4B6B2b1C8Ba5111a07', // 质押的资产
    start_at: 1679932800,
    openDate: 1679932800,
    dueDate: 1687708800,
    strikeprice: '0.55',
  },
  {
    ...poolTemplate.ethCall,
    address: '0xBf02d03FF0e5dBF10f99269a9e14D4b8Da131df6',
    MLP: '0xbDb8971F9457E70e18F5b0186F23DaBAB0d1598F',
    start_at: 1679932800,
    openDate: 1679932800,
    dueDate: 1687708800,
    strikeprice: '3556',
  }
]
// 更新 address MLP start_at openDate dueDate strikeprice multiple childPools
