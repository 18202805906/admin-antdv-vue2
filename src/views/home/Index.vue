<template>
  <div class="page-wrap">
    <a-card>
      <h3>首页</h3>
      <a-space>
        <auth-button auth="testAuth">auth-button</auth-button>
        <a-button v-auth="'testAuth'">v-auth</a-button>
      </a-space>
      <h3>表格</h3>
      <basis-table show-index :columns="columns" :loading="loading" :data-source="data.list" :pagination="pagination">
        <template #action="text">
          <a-space class="table-action">
            <span class="text-primary"> 查看 </span>
            <delete-button type="icon" :title="text.name"></delete-button>
          </a-space>
        </template>
      </basis-table>
      <h3>图标</h3>
      <p style="color: red"><a-icon type="step-forward" :style="{ color: 'blue' }"></a-icon><a-icon type="user"></a-icon></p>
      <h3>按钮</h3>
      <a-space>
        <a-button type="primary" size="large">常规</a-button>
        <a-button disabled size="large">禁用</a-button>
        <a-button type="primary" ghost size="large">常规</a-button>
        <a-button disabled ghost size="large">禁用</a-button>
        <a-button type="primary" shape="round" size="large"> 常 规 </a-button>
        <a-button disabled shape="round" size="large"> 禁 用 </a-button>
      </a-space>
      <h3>颜色</h3>
      <p class="text-primary">主色 #006DFF</p>
      <p class="text-heading">标题 #152C4B</p>
      <p class="text-normal">内容 #4B617F</p>
      <p class="text-secondary">辅助 #5F7498</p>
      <p class="text-success">成功 #4B617F</p>
      <p class="text-disabled">禁用 #D2DAE8</p>
      <p class="text-error">错误 #FF2528</p>
      <h3>字体</h3>
      <p class="text-mini">辅助文本 12px</p>
      <p class="text-normal">内容文本 14px</p>
      <p class="text-medium">标题文本 16px</p>
      <p class="text-large">大标题文本 18px</p>
    </a-card>
  </div>
</template>
<script>
import configApi from '@/api/system/config';
const columns = [
  {
    title: 'title',
    dataIndex: 'title'
  },
  {
    title: 'code',
    dataIndex: 'code'
  },
  {
    title: 'type',
    dataIndex: 'type'
  },
  {
    title: 'describe',
    dataIndex: 'describe'
  },
  {
    title: 'updateTime',
    dataIndex: 'updateTime'
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
];
export default {
  data() {
    return {
      columns,
      loading: false,
      data: [],
      pagination: {
        ...this.$pagination,
        pageSize: 5
      }
    };
  },
  inject: ['$pagination'],
  created() {
    this.loading = true;
    configApi.list({ a: 123 }).then((res) => {
      this.data = res;
      this.loading = false;
    });
  }
};
</script>
<style scoped>
h3 {
  margin: 20px 0;
}
</style>
