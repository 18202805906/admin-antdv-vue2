import { mapState } from 'vuex';
import LSider from '@/layouts/components/LSider';
import LLogo from '@/layouts/components/LLogo.vue';
import LFooter from '@/layouts/components/LFooter';
import LHeader from '@/layouts/components/LHeader.vue';
import LBreadCrumb from '@/layouts/components/LBreadCrumb';
import { convertToTree } from '@/utils';
import { getStorage } from '@/utils/storage';
function getActiveRoute(activeMenuPath, router, activeRoutes = []) {
  let activeRoute = router.resolve(activeMenuPath).route;
  activeRoutes.unshift(activeRoute);
  let activeMenu = activeRoute.meta?.activeMenu;
  return activeMenu && activeMenu !== activeMenuPath ? getActiveRoute(activeMenu, router, activeRoutes) : activeRoutes;
}
export default () => {
  return {
    components: {
      LSider,
      LFooter,
      LHeader,
      LLogo,
      LBreadCrumb
    },
    data() {
      return {
        menus: [],
        collapse: false
      };
    },

    computed: {
      ...mapState({
        theme: (state) => state.theme
      }),
      activeMenu() {
        return this.$route.meta?.activeMenu || '';
      },
      matchedRoutes() {
        let matched = [...this.$route.matched];
        if (this.activeMenu) {
          let activeRoutes = getActiveRoute(this.activeMenu, this.$router);
          matched.splice(matched.length - 1, 0, ...activeRoutes);
        }
        return matched;
      },
      curtMenuKey() {
        return this.activeMenu ? [this.activeMenu, this.$route.path] : [this.$route.path];
      },
      parentMenus() {
        return this.matchedRoutes
          .filter((item) => item.meta?.name)
          .map((item) => ({
            icon: item.meta.icon,
            title: item.meta.name,
            url: item.path
          }));
      },
      openeds() {
        return this.collapse ? [] : this.parentMenus.map((item) => item.url);
      }
    },
    created() {
      let userInfo = getStorage('userinfo');
      if (userInfo) {
        this.$store.commit('user/SET_USERINFO', userInfo);
      } else {
        this.$router.push('/login');
      }
      let menus = getStorage('menus') || [];
      this.menus = convertToTree({ data: menus, pid: 0 });
    }
  };
};
