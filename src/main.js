import Vue from 'vue';
import router from './router';
import store from './store';
import '@/assets/styles/common.less';
import App from './App.vue';
import components from '@/components';
import filters from '@/filters';
import plugins from '@/plugins';
import config from '@/config';
Vue.config.productionTip = false;

Vue.use(components);
Vue.use(filters);
Vue.use(plugins);

new Vue({
  router,
  store,
  provide: {
    $pagination: config.pagination // 注入分页基础设置
  },
  render: (h) => h(App)
}).$mount('#app');
