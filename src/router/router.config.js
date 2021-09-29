// import loadable from '@/utils/loadable' // 懒加载

import Home from '../pages/home'
import Insurance from '../pages/insurance'
import Mining from '../pages/mining'
import MyPolicylicy from '../pages/mypolicy'
import MySupply from '../pages/mysupply'
import MySettle from '../pages/mysettle'
import Ido from '../pages/ido'

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
  {
    path: '/ibo',
    component: Ido,
    exact: true,
  },
]
