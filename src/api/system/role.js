import { get } from '../../utils/request';
const prefix = '/system/role';
export default {
  list: (params) => get(`${prefix}`, params)
};
