<template>
  <div class="page-wrap">
    <a-card class="page-control">
      <a-button type="primary" icon="plus" ghost @click="handleAdd">新建 </a-button>
      <a-input-search class="space fr" placeholder="请输入关键字" style="width: 300px" enter-button="搜索" allow-clear></a-input-search>
    </a-card>
    <a-card>
      <a-table :columns="columns" :data-source="tableData" size="small" row-key="id" :pagination="pagination" @change="handlePageChange">
        <div slot="action" slot-scope="row">
          <a-button @click="handleEdit(row)" type="link" size="small">编辑</a-button>
          <a-divider type="vertical" class="divider-primary" />
          <a-button @click="handleAuth(row)" type="link" size="small">授权</a-button>
          <a-divider type="vertical" class="divider-primary" />
          <a-button @click="handleDel(row)" type="link" size="small">删除</a-button>
        </div>
      </a-table>
    </a-card>
    <!-- 新增和编辑 -->
    <a-modal v-model="showEditModal" :title="isAdd ? '新建' : '编辑'" :keyboard="false" :maskClosable="false" @ok="handleOk" :afterClose="() => $refs.ruleForm.resetFields()">
      <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
        <a-form-model-item has-feedback label="角色名称" prop="roleName">
          <a-input v-model="form.roleName" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="角色编码" prop="roleCode">
          <a-input v-model="form.roleCode" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="所属部门" prop="selectDept">
          <a-cascader
            :options="deptList"
            :default-value="[form.deptCode]"
            :field-names="{ label: 'label', value: 'code', children: 'children' }"
            v-model="selectDept"
            placeholder="请选择所属部门"
          ></a-cascader>
        </a-form-model-item>
        <a-form-model-item has-feedback label="角色描述" prop="roleDesc">
          <a-input type="textarea" v-model="form.roleDesc" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <!-- 授权  -->
    <auth-menu-modal :show.sync="showAuthModal" v-model="selectAuth"></auth-menu-modal>
  </div>
</template>

<script>
import config from '@/config';
import AuthMenuModal from './components/AuthMenuModal.vue';
import { ganerTableIndex } from '@/utils';
import roleApi from '@/api/system/role';
import departmentApi from '@/api/system/department';
const pagination = config.pagination;
const initForm = {
  roleName: '',
  roleCode: '',
  deptName: '',
  deptId: 0,
  deptCode: 0,
  roleDesc: ''
};
export default {
  components: { AuthMenuModal },
  data() {
    const columns = [
      { title: '序号', customRender: (value, row, index) => ganerTableIndex(this.pagination.current, this.pagination.pageSize, index), width: 50 },
      { title: '名称', dataIndex: 'title', ellipsis: true },
      { title: '编码', dataIndex: 'code', ellipsis: true },
      { title: '部门', dataIndex: 'deptName' },
      { title: '描述', dataIndex: 'describe', ellipsis: true },
      { title: '创建时间', dataIndex: 'createTime', width: 200 },
      { title: '操作', scopedSlots: { customRender: 'action' }, align: 'center', width: 300 }
    ];
    return {
      tableData: [],
      tableLoading: false,
      columns: Object.freeze(columns),
      pagination: {
        ...pagination,
        pageSize: 20
      },
      searchValue: '',
      deptList: [],
      selectDept: [],
      showEditModal: false,
      isAdd: true,
      form: {},
      rules: {
        roleName: [{ required: true, trigger: 'blur', message: '请输入角色名称' }],
        roleCode: [{ required: true, trigger: 'blur', message: '请输入角色编码' }],
        deptId: [{ required: true, trigger: 'blur', message: '请选择所属部门' }]
      },
      showAuthModal: false,
      selectAuth: []
    };
  },
  created() {
    this.getData(1);
    this.getDeptList();
  },
  methods: {
    getData(pageNow = 1) {
      this.tableLoading = true;
      roleApi
        .list({
          pageSize: this.pagination.pageSize,
          pageNow
        })
        .then((res) => {
          this.pagination.current = res.current;
          this.pagination.total = res.total;
          this.tableData = res.list;
          this.tableLoading = false;
        });
    },
    getDeptList() {
      departmentApi
        .list({
          pageSize: 10000,
          pageNow: 1
        })
        .then((res) => {
          this.deptList = res.list;
        });
    },
    handleAdd() {
      this.isAdd = true;
      this.showEditModal = true;
      this.form = { ...initForm };
    },
    handleEdit(row) {
      console.log(row);
      this.isAdd = false;
      this.showEditModal = true;
      this.form = { ...row };
    },
    handleAuth(row) {
      console.log(row);
      this.showAuthModal = true;
    },
    handleDel(row) {
      this.$modal.confirm({
        title: '提示',
        content: () => <span>您确定要删除【{<span class="text-primary">{row.roleName}</span>}】吗？</span>,
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
    handleOk() {}
  }
};
</script>
