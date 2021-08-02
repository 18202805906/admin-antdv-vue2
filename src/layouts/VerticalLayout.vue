<template>
  <a-layout class="layout">
    <l-header :collapse.sync="collapse" :bread-crumb="parentMenus" class="layout-header__fixed">
      <l-logo slot="logo" style="margin: 0 20px 0 0"></l-logo>
    </l-header>
    <a-layout class="layout-main" style="padding-top: 64px">
      <a-layout-sider :theme="theme" v-model="collapse" :trigger="null" collapsible breakpoint="lg">
        <l-sider :menus="menus" :theme="theme" :collapse.sync="collapse" :open-keys="openeds" :selected-keys="curtMenuKey"></l-sider>
      </a-layout-sider>
      <a-layout-content class="app-scroll-wrap">
        <l-bread-crumb :data="parentMenus" :collapse.sync="collapse" />
        <div class="app-main">
          <transition mode="out-in" name="fade-transform">
            <router-view></router-view>
          </transition>
        </div>
        <l-footer></l-footer>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import LayoutMinxin from '@/mixins/layout.mixin';
export default {
  name: 'vertical-layout',
  mixins: [LayoutMinxin()]
};
</script>
<style lang="less" scoped>
@import url('../assets/styles/layout.less');
</style>
