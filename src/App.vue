<template>
  <a-config-provider :locale="locale">
   <div id="app">
    <router-view></router-view>
  </div>
  </a-config-provider>
</template>
<script>
import config from '@/config';

export default {
  data() {
    return {
      locale:{}
    };
  },
  created(){
    let lang = config.lang;
    this.locale = require(`ant-design-vue/es/locale/${lang}`).default;
  }
};
</script>
