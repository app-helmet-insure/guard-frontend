import loadable from '@/utils/loadable'

export default [
  {
    path: '/',
    component: loadable('/insurance'),
    exact: true,
  },
  {
    path: '/home',
    component: loadable('/demo/home/index'),
    exact: true,
  },
  {
    path: '/counter',
    component: loadable('/demo/counter/index'),
    exact: true,
  },
  {
    path: '/detail',
    redirect: '/detail/a',
    component: loadable('/demo/detail/index'),
    // exact: true,
    routes: [
      {
        path: '/detail/a',
        component: loadable('/demo/detail/a/index'),
        exact: true,
      },
      {
        path: '/detail/b',
        component: loadable('/demo/detail/b/index'),
        exact: true,
      },
    ],
  },
  {
    path: '/mining',
    component: loadable('/mining/index'),
    exact: true,
  }
]
