<template>
  <a-layout class="layout">
    <a-layout-sider :theme="theme" v-model="collapse" :trigger="null" collapsible breakpoint="lg">
      <l-logo :mini="collapse" class="logo"></l-logo>
      <l-sider :menus="menus" :theme="theme" :collapse.sync="collapse" :open-keys="openeds" :selected-keys="curtMenuKey"></l-sider>
    </a-layout-sider>
    <a-layout class="layout-main">
      <l-header :collapse.sync="collapse" :bread-crumb="parentMenus" />
      <div class="app-scroll-wrap">
        <l-bread-crumb :data="parentMenus" :collapse.sync="collapse"/>
        <div class="app-main">
          <transition mode="out-in" name="fade-transform">
            <router-view></router-view>
          </transition>
        </div>
      </div>
      <l-footer></l-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import LayoutMinxin from '@/mixins/layout.mixin';
export default {
  name: 'default-layout',
  mixins:[LayoutMinxin()]
};
</script>
<style lang="less" scoped>
@import url('../assets/styles/layout.less');
.logo{
  background-color: #1B90FF;
  font-size: 14px;
}
</style>
