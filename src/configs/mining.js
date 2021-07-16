import StakingPool3 from '../web3/abi/StakingPool3.json'

export default [
  {
    name: 'WAR POOL (DAO)',
    icon: 'PAUL-HT_small@2x.png',
    rewards1: 'WAR',
    rewards2: null,
    address: '0xF01f44B1b5770d3c5dc54FE1455786d1227736CC',
    rewards1Address: '0x910651F81a605a6Ef35d05527d24A72fecef8bF0',
    rewards2Address: null,
    // apr
    valueAprToken: '0x910651F81a605a6Ef35d05527d24A72fecef8bF0', // WAR
    valueAprPath: [
      '0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F', // WHT
    ],
    rewardsAprPath: [
      '0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F', // WHT
    ],
    settleToken: '0xa71EdC38d189767582C38A3145b5873052c3e47a', //usdt
    MLP: '0x910651F81a605a6Ef35d05527d24A72fecef8bF0', // WAR
    byLink:
      'https://ht.mdex.com/#/swap?outputCurrency=0x910651f81a605a6ef35d05527d24a72fecef8bf0',
    abi: StakingPool3,
    start_at: '',
    time: '',
    openDate: '1623153600',
    dueDate: null,
    earnName: 'APY',
    status: 0,
    rewards: 'WAR',
    decimal: 18,
    is_coming: false,
    mdexReward: false,
    networkId: 128,
  },
]
