import * as filters from './filters';
export default (Vue) => {
  // 注册过滤器
  Object.keys(filters).map((key) => Vue.filter(key, filters[key]));
};
