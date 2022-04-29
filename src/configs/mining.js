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
import {ChainId} from '../web3/address'

const MATIC_ADDRESS = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'
const GUARD_ADDRESS = '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8'
const USDC_ADDRESS = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
const QUICK_ADDRESS = '0x831753DD7087CaC61aB5644b308642cc1c33Dc13'
const DQUICK_ADDRESS = '0xf28164a485b0b2c90639e47b0f377b4a438a16b1'
const WETH_ADDRESS = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619'

export default  [
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
]
// 更新 address MLP start_at openDate dueDate strikeprice multiple childPools
