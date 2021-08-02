<template>
  <a-button
    type="link"
    size="small"
    v-bind="$attrs"
    v-on="$listeners"
    @click="handleClick"
  >
    <slot>删除</slot>
  </a-button>
</template>

<script>
export default {
  name: 'delete-button',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick() {
      this.$modal.confirm({
        title: '提示',
        content: () => this.title?(<span>您确定要删除【{<span class="text-primary">{this.title}</span>}】吗？</span>):(<span>您确定要删除该数据吗？</span>),
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.$emit('confirm');
        }
      });
    }
  }
};
</script>
