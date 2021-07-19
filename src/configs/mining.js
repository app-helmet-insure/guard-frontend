import StakingPool from '../web3/abi/StakingPool.json'

export default [
  {
    name: 'PAUL-USDT LPT',
    icon: 'PAUL-HT_small@2x.png',
    rewards1: 'WAR',
    rewards2: null,
    address: '0x5b0F4cb9041cED035Fd0a7Db3c0C2f7f4dC62A66',
    rewards1Address: '0x910651F81a605a6Ef35d05527d24A72fecef8bF0',
    rewards2Address: null,
    // apr
    valueAprToken: '0xFC01b8f883a89278235ba674bbE2bb48db96d9Cf', // FAUL
    valueAprPath: [],
    rewardsAprPath: [
      '0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F', // WHT
    ],
    settleToken: '0xa71EdC38d189767582C38A3145b5873052c3e47a', //usdt
    MLP: '0xD9baBF51f327829264f554B4Fa4e12Cec5BD0F50',
    byLink:
      'https://ht.mdex.com/#/add/0xa71EdC38d189767582C38A3145b5873052c3e47a/0xFC01b8f883a89278235ba674bbE2bb48db96d9Cf',
    abi: StakingPool,
    start_at: '',
    time: '',
    openDate: null,
    dueDate: null,
    earnName: 'APR',
    status: 0,
    rewards: 'LPT',
    decimal: 18,
    is_coming: false,
    mdexReward: false,
    networkId: 128,
    lpToken: 'MDEX LP Token',
  },
]
