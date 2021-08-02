<template>
  <div class="page-wrap">
    <a-card class="page-control">
      <!-- <a-input v-model="searchValue" placeholder="请输入部门名称..." allowClear class="vertical-top" style="width: 200px" />
      <a-button class="space" icon="search">搜索</a-button>
      <a-button class="space" icon="reload">重置</a-button> -->
      <a-button type="primary" icon="plus" ghost @click="handleAdd">新建 </a-button>
      <a-button class="space" type="primary" icon="medicine-box" ghost>数据修复 </a-button>
      <a-input-search class="space fr" placeholder="请输入部门名称" style="width: 300px" enter-button="搜索" allow-clear @search="handleSearch"></a-input-search>
    </a-card>
    <a-card>
      <a-table :columns="columns" :data-source="tableData" size="small" rowKey="id" :expandIconColumnIndex="1" :pagination="pagination" @change="handlePageChange">
        <span slot="index" slot-scope="text, row, index">{{ index + 1 }}</span>
        <div slot="action" slot-scope="row">
          <a-button @click="handleEdit(row)" type="link" size="small">编辑</a-button>
          <a-divider type="vertical" class="divider-primary" />
          <a-button @click="handleDel(row)" type="link" size="small">删除</a-button>
        </div>
      </a-table>
    </a-card>
    <!-- 新增和编辑 -->
    <a-modal v-model="showEditModal" :title="isAdd ? '新建' : '编辑'" :keyboard="false" :maskClosable="false" @ok="handleOk" :afterClose="() => $refs.ruleForm.resetFields()">
      <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
        <a-form-model-item has-feedback label="部门名称" prop="name">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="部门编码" prop="code">
          <a-input v-model="form.code" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="部门主管" prop="createUser">
          <a-select v-model="form.createUser">
            <a-select-option :value="item.id" v-for="item in userList" :key="item.id">{{ item.username }} </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item has-feedback label="描述" prop="deptDesc">
          <a-input type="textarea" v-model="form.deptDesc"></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import config from '@/config';
import { ganerTableIndex } from '@/utils';
import departmentApi from '@/api/system/department';
import userApi from '@/api/system/user';
const pagination = config.pagination;
const initForm = {
  name: '',
  code: '',
  createUser: '',
  deptDesc: ''
};
export default {
  data() {
    const columns = [
      { title: '序号', customRender: (value, row, index) => `${ganerTableIndex(this.pagination.current, this.pagination.pageSize, index)}`, width: 50 },
      { title: '部门名称', dataIndex: 'title', ellipsis: true },
      { title: '部门编码', dataIndex: 'code' },
      { title: '部门主管', dataIndex: 'createUser' },
      { title: '部门描述', dataIndex: 'describe', ellipsis: true },
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
        name: [{ required: true, trigger: 'blur', message: '请输入部门名称' }],
        code: [{ required: true, trigger: 'blur', message: '请输入部门编码' }]
      },
      showAuthModal: false,
      selectAuth: [],
      userList: []
    };
  },
  created() {
    this.getData(1);
    this.getUserList();
  },
  methods: {
    getData(pageNow = 1) {
      this.tableLoading = true;
      departmentApi
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
    getUserList() {
      userApi
        .list({
          pageSize: 1000,
          pageNow: 1
        })
        .then((res) => {
          this.userList = res.list;
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
        content: () => <span>您确定要删除【{<span class="text-primary">{row.name}</span>}】吗？</span>,
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.$message.success('操作成功');
        }
      });
    },
    handleSearch(key) {
      console.log(key);
    },
    handlePageChange(pagination, filters, sorter) {
      this.pagination = pagination;
      console.log(pagination, filters, sorter);
    },
    handleOk() {}
  }
};
</script>
