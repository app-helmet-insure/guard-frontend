import StakingPool3 from '../web3/abi/StakingPool3.json'

export default [
  {
    name: 'TESTB (DAO)',
    icon: 'PAUL-HT_small@2x.png',
    rewards1: 'TESTB',
    rewards2: null,
    address: '0xfdb3Fd63fded5092a1Cd889cF03cAD7CE97362a8',
    rewards1Address: '0xbe67e4de16854e687089bebcc0cd1ac7ae7ea2d4',
    rewards2Address: null,
    // apr
    valueAprToken: '0xbe67e4de16854e687089bebcc0cd1ac7ae7ea2d4', // WAR
    valueAprPath: [
      '0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F', // WHT
    ],
    rewardsAprPath: [
      '0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F', // WHT
    ],
    settleToken: '0xa71EdC38d189767582C38A3145b5873052c3e47a', //usdt
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
    cover: 'put',
  },
]
