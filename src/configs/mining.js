import StakingPool from '../web3/abi/StakingPool.json'
import StakingPool3 from '../web3/abi/StakingPool3.json'

export default [
  {
    name: 'WAR-USDT LPT',
    icon: 'WAR-HT_small@2x.png',
    rewards1: 'WAR',
    rewards2: 'MDX',
    address: '0x777d69a99fE220471f23e2643007f9d086B7d714', // 超募合约地址
    rewards1Address: '0x910651F81a605a6Ef35d05527d24A72fecef8bF0',
    rewards2Address: '0x25D2e80cB6B86881Fd7e07dd263Fb79f4AbE033c',
    // apr
    valueAprToken: '0x910651F81a605a6Ef35d05527d24A72fecef8bF0', // WAR
    valueAprPath: [],
    rewardsAprPath: [],
    settleToken: '0xa71EdC38d189767582C38A3145b5873052c3e47a',

    MLP: '0x2eAB1e47Bf1660bf6De9437BD061db666111e041',
    byLink:
      'http://ht.mdex.com/#/add/0xa71EdC38d189767582C38A3145b5873052c3e47a/0x910651F81a605a6Ef35d05527d24A72fecef8bF0',
    abi: StakingPool,
    start_at: '1626350400',
    time: '',
    dueDate: null,
    openDate: null,
    earnName: 'APR',
    status: 0,
    rewards: 'LPT',
    decimal: 18,
    is_coming: true,
    splitDigits: 6,
    mdexReward: true,
    networkId: 128,
    lpToken: 'MDEX LP Token',
    mdexDaily: 1534.46,
    mdexPid: '0x5a',
  },
]
