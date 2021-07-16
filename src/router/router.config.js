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
  }
]
