import BasisTable from './BasisTable';
import DeleteButton from './DeleteButton';
import AuthButton from './AuthButton';
export default (Vue) => {
  Vue.component('BasisTable', BasisTable);
  Vue.component('DeleteButton', DeleteButton);
  Vue.component('AuthButton', AuthButton);
};