// import loadable from '@/utils/loadable' // 懒加载

import Home from '../pages/home'
import Insurance from '../pages/insurance'
import Mining from '../pages/mining'
import MyPolicylicy from '../components/insurance/mypolicy'
import MySupply from '../components/insurance/mysupply'
import MySettle from '../components/insurance/mysettle'

export default [
  {
    path: '/',
    component: Home, // loadable('/home'),
    exact: true,
  },
  {
    path: '/insurance',
    component: Insurance,
    exact: true,
  },
  {
    path: '/mining',
    component: Mining,
    exact: true,
  },
  {
    path: '/mypolicy',
    component: MyPolicylicy,
    exact: true,
  },
  {
    path: '/mysupply',
    component: MySupply,
    exact: true,
  },
  {
    path: '/mysettle',
    component: MySettle,
    exact: true,
  },
]
