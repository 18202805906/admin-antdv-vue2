import { get, post } from '../../utils/request';
const prefix = '/system/message';
export default {
  list: (params) => get(`${prefix}`, params)
};
