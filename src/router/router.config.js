import loadable from '@/utils/loadable'

export default [
  {
    path: '/',
    component: loadable('/home'),
    exact: true,
  },
  {
    path: '/insurance',
    component: loadable('/insurance'),
    exact: true,
  },
  {
    path: '/mining',
    component: loadable('/mining/index'),
    exact: true,
  },
  {
    path: '/mypolicy',
    component: loadable('/mypolicy/index'),
    exact: true,
  },
  {
    path: '/mysupply',
    component: loadable('/mysupply/index'),
    exact: true,
  },
  {
    path: '/mysettle',
    component: loadable('/mysettle/index'),
    exact: true,
  },
]
