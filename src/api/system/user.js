import { get } from '../../utils/request';
const prefix = '/system/user';
export default {
  list: (params) => get(`${prefix}`, params),
  info: (params) => get(`${prefix}/info`, params)
};
