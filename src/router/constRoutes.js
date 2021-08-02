// 静态路由
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Index.vue'),
  },
  {
    path: '/err',
    name: 'err',
    component: () => import('@/views/err/Index.vue'),
  }
];
export default routes;
// 未匹配到路由时显示的页面
export const noMatchRoute = {
  path: '*',
  redirect: '/err'
};
