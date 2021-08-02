import copy from './copy';
import longpress from './longpress';
import debounce from './debounce';
const directives = {
  copy,
  longpress,
  debounce
};

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key]);
    });
  }
};
