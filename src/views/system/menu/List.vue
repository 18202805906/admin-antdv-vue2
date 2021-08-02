<template>
  <div class="page-wrap">
    <a-card class="page-control">
      <a-space>
        <a-button type="primary" icon="plus" ghost @click="handleAdd">新建 </a-button>
      </a-space>
    </a-card>
    <a-card>
      <a-table :columns="columns" :data-source="tableData" size="small" rowKey="id" :pagination="pagination" @change="handlePageChange">
        <a-tag slot="type" slot-scope="type" :color="type === '0' ? '' : 'orange'">{{ type === '0' ? '菜单' : '按钮' }}</a-tag>
        <a-icon slot="icon" slot-scope="icon" :type="icon" />
        <div slot="action" slot-scope="row">
          <a-button @click="handleEdit(row)" type="link" size="small">编辑</a-button>
          <a-divider type="vertical" class="divider-primary" />
          <a-button @click="handleAddChild(row)" type="link" size="small">添加子项</a-button>
          <a-divider type="vertical" class="divider-primary" />
          <a-button @click="handleHide(row, true)" type="link" v-if="!row.hide" size="small">隐藏</a-button>
          <a-button @click="handleHide(row, false)" type="link" v-else size="small">显示</a-button>
          <a-divider type="vertical" class="divider-primary" />
          <a-button @click="handleDel(row)" type="link" size="small">删除</a-button>
        </div>
      </a-table>
    </a-card>
    <!-- 新增编辑 -->
    <a-modal v-model="showEditModal" :title="isAdd ? '新建' : '编辑'" :keyboard="false" :maskClosable="false" @ok="handleOk" :afterClose="() => $refs.ruleForm.resetFields()">
      <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
        <a-form-model-item has-feedback label="类型" prop="type">
          <a-radio-group v-model="form.type">
            <a-radio :value="key" v-for="(item, key) in menuType" :key="key">
              {{ item }}
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item has-feedback label="父级目录" prop="parentId">
          <a-input v-model="form.parentId" />
        </a-form-model-item>
        <a-form-model-item has-feedback :label="`${menuType[form.type]}名称`" prop="name">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="权限标识" prop="code">
          <a-input v-model="form.code" />
        </a-form-model-item>
        <template v-if="form.type === '0'">
          <a-form-model-item has-feedback label="图标" prop="icon">
            <a-input v-model="form.icon" readonly>
              <a-popover placement="right" :autoAdjustOverflow="false" title="选择图标" slot="addonAfter">
                <div class="menu-icon" slot="content">
                  <icon-picker v-model="form.icon" />
                </div>
                <a-icon :type="form.icon" v-if="form.icon" />
                <span v-else>选择</span>
              </a-popover>
            </a-input>
          </a-form-model-item>
          <a-form-model-item has-feedback label="序号" prop="priority">
            <a-input-number v-model="form.priority" class="width-full" />
          </a-form-model-item>
        </template>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { getStorage } from '@/utils/storage';
import { convertToTree } from '@/utils';
import { MENU_TYPE } from '@/config/dictionary';
import IconPicker from '@/components/IconPicker';
import config from '@/config';
const pagination = config.pagination;
const initForm = {
  name: '',
  parentId: 0,
  code: '',
  icon: '',
  type: '0',
  priority: 0
};
export default {
  data() {
    const columns = [
      { title: '菜单名字', dataIndex: 'name', ellipsis: true },
      { title: '权限标识', dataIndex: 'code', ellipsis: true },
      { title: '图标', dataIndex: 'icon', scopedSlots: { customRender: 'icon' } },
      { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' } },
      { title: '操作', scopedSlots: { customRender: 'action' }, align: 'center', width: 360 }
    ];
    const menu = getStorage('menus');
    const menuTree = convertToTree({ data: menu, pid: 0 });
    return {
      tableData: menuTree,
      tableLoading: false,
      columns: Object.freeze(columns),
      pagination: {
        ...pagination,
        pageSize: 20
      },
      showEditModal: false,
      isAdd: true,
      menuType: MENU_TYPE,
      form: {},
      rules: {
        name: [{ required: true, trigger: 'blur', message: '请输入菜单名称' }],
        code: [{ required: true, trigger: 'blur', message: '请输入菜单权限标识' }]
      }
    };
  },
  components: {
    IconPicker
  },
  methods: {
    handleAdd() {
      this.isAdd = true;
      this.showEditModal = true;
      this.form = { ...initForm };
    },
    handleAddChild(row) {
      this.isAdd = true;
      this.showEditModal = true;
      this.form = { ...initForm, parentId: row.id };
    },
    handleEdit(row) {
      console.log(row);
      this.isAdd = false;
      this.showEditModal = true;
      this.form = { ...row };
    },
    handleHide(row, status) {
      console.log(row, status);
      row.hide = status;
      this.$message.success('操作成功');
    },
    handleDel(row) {
      this.$modal.confirm({
        title: '提示',
        content: () => <span>您确定要删除【{<span class="text-primary">{row.name}</span>}】吗？</span>,
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.$message.success('操作成功');
        }
      });
    },
    handlePageChange(pagination, filters, sorter) {
      this.pagination = pagination;
      console.log(pagination, filters, sorter);
    },
    handleOk() {
      this.showEditModal = false;
      this.$message.success('操作成功');
    }
  }
};
</script>

<style lang="less" scoped>
.menu-icon {
  width: 400px;
  height: 400px;
  overflow-y: auto;
}
</style>
