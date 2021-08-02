import { getStorage } from '@/utils/storage';
import { authDirective } from '@bwrong/auth-tool';
import AuthButton from '@/components/AuthButton';
let authMap = null;
export default (Vue) => {
  // 注册权限指令
  Vue.use(authDirective, {
    hasAuth(authValue) {
      authMap = authMap || getStorage('permissions');
      return authMap.includes(authValue);
    }
  });
  Vue.component('AuthButton', AuthButton);
};
