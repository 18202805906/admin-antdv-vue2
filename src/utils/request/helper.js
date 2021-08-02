import axios from 'axios';
import Cookie from 'js-cookie';
import appConfig from '@/config';
import auth from '@/api/auth';
import { computedExpires } from '@/utils/token';
let requestCache = new Map(); // 请求暂存列表，列表中的请求会被取消
const { tokenExpiresKey, refreshTokenKey } = appConfig;
/**
 * 刷新token
 * @param {string} refreshToken
 */
export const handleRefreshToken = (refreshToken) => {
  if (handleRefreshToken.refreshDoing) return;
  handleRefreshToken.refreshDoing = true; // 加锁，防止重复刷新
  auth
    .refreshToken({ refresh_token: refreshToken })
    .then((res) => {
      Cookie.set(appConfig.tokenKey, res.access_token);
      Cookie.set(appConfig.refreshTokenKey, res.refresh_token);
      Cookie.set(appConfig.tokenExpiresKey, String(computedExpires(res.data.expires_in)));
    })
    .finally(() => {
      handleRefreshToken.refreshDoing = false;
    });
};
/**
 * 检查更新token
 * @param config
 */
export function checkAndUpdateToken(config) {
  //  token即将过期，刷新token
  const tokenExpires = Cookie.get(tokenExpiresKey);
  if (Number(tokenExpires) <= Date.now() && !config.isNotRefreshToken) {
    handleRefreshToken(Cookie.get(refreshTokenKey));
  }
}
/**
 * 生成存储的key
 * @param {object} config
 */
export function generateKey({ method, url, params }) {
  const paramsStr = JSON.stringify(params);
  return `${method}-${url}-${paramsStr}`;
}
/**
 * 添加请求到暂存列表
 * @param {object} config 当前请求配置
 * @param {function} cancel - 请求中断函数
 */
export function addRequest(config, cancel) {
  const key = generateKey(config);
  requestCache.has(key) ? cancel('请求被取消,config:', config) : requestCache.set(key, true);
}
/**
 * 生成cancelToken
 * @param config
 * @returns
 */
export function ganerCancelToken(config) {
  return new axios.CancelToken((cancel) => addRequest(config, cancel));
}
/**
 * 从暂存列表删除请求，即释放拦截
 * @param {object} config 当前请求配置
 * @param {number} time 阻止时间
 */
export function removeRequest(config, time = 500) {
  const key = generateKey(config);
  setTimeout(() => requestCache.delete(key), time);
}
