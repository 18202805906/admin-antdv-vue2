import antd from './antd';
import auth from './auth';
import './moment';

export default (Vue) => {
  Vue.use(antd);
  Vue.use(auth);
};