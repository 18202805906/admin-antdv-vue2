import Vue from 'vue';
import VueRouter from 'vue-router';
import { get, remove } from 'js-cookie';

import NProgress from '@/plugins/nprogress';
import { removeStorage, setStorage, getStorage } from '@/utils/storage';
import config from '@/config';
import routes, { noMatchRoute } from './constRoutes';
import asyncRoutes from './asyncRoutes';
import { ganerAuthData } from '@bwrong/auth-tool';
// import authApi from '@/api/auth';
Vue.use(VueRouter);
// 重写路由的push方法，解决同一路由多次跳转报错 message: "Navigating to current location (XXX) is not allowed"
const { push: routerPush, replace: routerReplace } = VueRouter.prototype;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return routerPush.call(this, location, onResolve, onReject);
  return routerPush.call(this, location).catch((err) => err);
};
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) return routerReplace.call(this, location, onResolve, onReject);
  return routerReplace.call(this, location).catch((err) => err);
};
let routerLoaded = false; // 动态路由是否已加载
const createRouter = () => {
  routerLoaded = false; // 重置状态
  return new VueRouter({
    mode: config.routerMode,
    scrollBehavior: () => ({ y: 0, x: 0 }),
    base: config.routerBase,
    routes
  });
};
const router = createRouter();
router.beforeEach(async (to, from, next) => {
  // 进度条
  NProgress.start();
  const token = get(config.tokenKey);
  // 其实路由拦截后所做跳转仅有一下几种情况：
  // 1.已登录时跳转到登录页（非登出的情况）需要重定向到根路径
  if (token && to.path === '/login') return next('/');
  // 2.路由在白名单，或者已经登录且动态路由已加载完成，均放行
  if (config.whiteRoutes.includes(to.path) || (token && routerLoaded)) return next();
  // 3.未登录且不在白名单，重定向到登录页，带上回调地址，方便回归
  if (!token) return next(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
  // 4.根据后台返回权限标识洗出有权限的路由，并将洗过的路由表动态添加到路由中
  // 4.根据后台返回权限标识洗出有权限的路由，并将洗过的路由表动态添加到路由中
  let allowRoutes = await _getAllowRoutes(asyncRoutes);
  allowRoutes.push(noMatchRoute);
  // 未加载则动态加载
  router.addRoutes(allowRoutes);
  routerLoaded = true;
  next({ ...to, replace: true });
});
// 路由后置守卫
// 路由后置守卫
router.afterEach((to) => {
  NProgress.done();
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - ${config.appTitle}` : `${config.appTitle}`;
});


// 获取路由
async function _getAllowRoutes(asyncRoutes) {
  // const menus = await authApi.getMenus().then((res: any) =>  {
  //   setStorage('userinfo', res.detail);
  //   return res.menus;
  // });

  let menus = getStorage('rawMenu') || [];
  return _ganerRoutesAndMenus(asyncRoutes, menus);
}
/**
 * 生成权限路由和菜单
 * @param {*} routes 需要鉴权的路由
 * @param {*} permissions 菜单和权限标识集
 */
function _ganerRoutesAndMenus(routes, permissions) {
  const { routes: filterRoutes, menus,authMap } = ganerAuthData({
    routes,
    permissions,
    authKey: 'permission'
  });
  setStorage('authMap', authMap);
  setStorage('menus', menus);
  return filterRoutes;
}
// 重置路由
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}
// 登出
export function logout() {
  remove(config.tokenKey);
  remove(config.refreshTokenKey);
  remove(config.tokenExpiresKey);
  removeStorage('userinfo', 'menus');
  // router.replace('/login');
  resetRouter();
  location.reload();
}
export default router;
