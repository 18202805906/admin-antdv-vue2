<template>
  <div class="basic-table">
    <a-table bordered size="small" :rowKey="rowKey" :columns="computedColumns" :pagination="pagination"  v-on="$listeners" v-bind="$attrs">
      <template v-for="(item, key) in $scopedSlots" v-slot:[key]="data">
        <slot :name="key" v-bind="data"></slot>
      </template>
    </a-table>
  </div>
</template>
<script>
function ganerTableIndex(pageNow = 1, pageSize = 10, index = 0) {
  return (pageNow - 1) * pageSize + index + 1;
}
export default {
  name: 'BasisTable',
  inheritAttrs: false,
  props: {
    rowKey: {
      type: String,
      default: 'id'
    },
    showIndex: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      required: true
    },
    pagination: {
      type: [Object, Boolean],
      default: false
    }
  },
  computed: {
    computedColumns() {
      // 判断是否需要显示序号
      if (!this.showIndex) return this.columns;
      let pagination = this.pagination || { current: 1, pageSize: 0 };
      let { current = 1, pageSize = 10 } = pagination;
      return [{ title: '序号', width: 80, customRender: (text, record, index) => ganerTableIndex(current, pageSize, index), align: 'center' }, ...this.columns];
    }
  }
};
</script>
