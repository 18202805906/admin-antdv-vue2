import { get, post } from '../utils/request';
export default {
  login: (params) => post('/auth/login', params, { _noRefresh: true, _noTips: true }),
  refreshToken: (params) => post('/auth/refresh_token', params, { _noRefresh: true, _noTips: true }),
  getMenus: () => get('/auth/menus'),
  unloadCount: () => get('/auth/unreadCount')
};
