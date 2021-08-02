<template>
  <div class="page-wrap">
    <a-card class="page-control">
      <span class="fl">
        <a-button type="primary" ghost icon="check-circle" style="margin-right: 10px" @click="allRead">全部已读</a-button>
        <a-button type="primary" ghost icon="check-circle" @click="batchRead">批量已读</a-button>
      </span>
      <span class="flex" style="justify-content: flex-end">
        <a-select placeholder="消息类型(可选)" style="width: 15%" v-model="form.type">
          <a-select-option v-for="(item, key) in messageType" :key="key" :value="key">{{ item }}</a-select-option>
        </a-select>
        <a-select placeholder="消息状态(可选)" style="width: 15%; margin: 0 10px" v-model="form.state">
          <a-select-option value="0">未读</a-select-option>
          <a-select-option value="1">已读</a-select-option>
        </a-select>
        <a-range-picker show-time format="YYYY-MM-DD HH:mm:ss" style="width: 28%; margin-right: 10px" @change="selectTimes" v-model="times"></a-range-picker>
        <div class="r-nw-fe-c" style="float: right">
          <a-button type="primary" icon="search" style="margin-right: 10px" @click="search">搜索</a-button>
          <a-button type="primary" icon="reload" style="margin-right: 10px" ghost @click="reset">重置</a-button>
        </div>
      </span>
    </a-card>
    <a-card>
      <basis-table
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        :columns="columns"
        :dataSource="dataList"
        :pagination="pagination"
      >
        <template #action="text">
          <a-button @click="goToDetail(text)" type="link" size="small">详情</a-button>
        </template>
      </basis-table>
    </a-card>
    <a-modal title="消息详情" :visible="visible" @ok="handleOk" @cancel="handleCancel" :keyboard="false" :maskClosable="false">
      <p>{{ row.content }}</p>
      <span slot="footer">
        <div class="footer" @click="handleOk">已读</div>
      </span>
    </a-modal>
  </div>
</template>

<script>
import BasisTable from '@/components/BasisTable';
import messageApi from '@/api/system/message';
import { MESSAGE_TYPE, MESSAGE_STATUS } from '@/config/dictionary';
// import { getStorage } from '@/utils/storage';
import { Modal } from 'ant-design-vue';
import config from '@/config';
const pagination = config.pagination;
export default {
  data() {
    const columns = [
      {
        title: '发送者',
        dataIndex: 'sender',
        width: '180px'
      },
      {
        title: '类型',
        dataIndex: 'type',
        width: '180px',
        customRender: (text) => MESSAGE_TYPE[text]
      },
      {
        title: '内容',
        dataIndex: 'content',
        ellipsis: true
      },
      {
        title: '状态',
        width: '100px',
        dataIndex: 'state',
        align: 'center'
      },
      {
        title: '发送时间',
        dataIndex: 'createTime',
        align: 'center',
        width: '220px'
      },
      {
        title: '操作',
        width: '200px',
        ellipsis: true,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }
    ];
    return {
      messageType: MESSAGE_TYPE,
      messageStatus: MESSAGE_STATUS,
      columns,
      form: {
        page: 1,
        size: 10,
        asc: false,
        orderBy: 'createTime',
        type: undefined,
        state: undefined,
        startTime: '',
        endTime: ''
      },
      pagination: {
        ...pagination,
        showTotal: (total) => `共 ${total} 条`,
        onShowSizeChange: (current, pageSize) => {
          this.form.size = pageSize;
          this.getData();
        },
        onChange: (val) => {
          this.form.page = val;
          this.getData();
        }
      },
      dataList: [],
      selectedRowKeys: [],
      times: ['', ''],
      visible: false,
      row: {}
    };
  },
  mounted() {
    this.getData();
  },
  components: {
    BasisTable
  },
  methods: {
    getData(pageNow = 1) {
      this.tableLoading = true;
      messageApi
        .list({
          pageSize: this.pagination.pageSize,
          pageNow
        })
        .then((res) => {
          this.pagination.currentPage = res.current;
          this.pagination.total = res.total;
          this.dataList = res.list;
          this.tableLoading = false;
        });
    },
    // 查询
    search() {
      this.form.page = 1;
      this.form.size = 10;
      this.getData();
    },
    // 选择时间
    selectTimes(data, values) {
      this.times = data;
      this.form.startTime = values[0];
      this.form.endTime = values[1];
    },
    // 详情
    goToDetail(row) {
      this.row = { ...row };
      this.visible = true;
    },
    // 重置
    reset() {
      this.form.page = 1;
      this.form.size = 10;
      this.form.type = '';
      this.form.state = '';
      this.times = [];
    },
    // 选择表格数据
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    // 全部已读
    allRead() {
      if (this.selectedRowKeys.length === 0) {
        Modal.confirm({
          title: ' 批量标记为已读消息',
          content: '未选中任何未读消息!'
        });
      } else {
        let that = this;
        Modal.confirm({
          title: '全部标记为已读消息',
          content: '确定把所有未读消息标记为已读吗?',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            // let params = {
            //   messageIds: this.rowKeys,
            //   receiver: getStorage('userinfo').username
            // };
            // console.log('params', params);
            that.$message.success('全部已读成功');
            that.selectedRowKeys = [];
          }
        });
      }
    },
    // 批量已读
    batchRead() {
      if (this.selectedRowKeys.length === 0) {
        Modal.confirm({
          title: ' 批量标记为已读消息',
          content: '未选中任何未读消息!'
        });
      } else {
        let that = this;
        Modal.confirm({
          title: '全部标记为已读消息',
          content: '确定把所有未读消息标记为已读吗?',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            // let params = {
            //   messageIds: this.rowKeys,
            //   receiver: getStorage('userinfo').username
            // };
            // console.log('params', params);
            that.$message.success('全部已读成功');
            that.selectedRowKeys = [];
          }
        });
      }
    },
    // 已读
    handleOk() {
      this.$message.success('该消息状态变更为已读');
      this.handleCancel();
    },
    // 取消
    handleCancel() {
      this.visible = false;
      this.row = {};
    }
  },
  created() {
    // this.rowSelection.selectedRowKeys = this.selectedRowKeys;
  }
};
</script>

<style lang="less" scoped>
.footer {
  margin: 0 auto;
  width: 100px;
  height: 35px;
  border-radius: 2px;
  line-height: 35px;
  letter-spacing: 4px;
  color: #fff;
  background: #1890ff;
  cursor: pointer;
}
</style>
