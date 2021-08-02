<template>
  <a-modal title="修改密码" :visible="value" :confirm-loading="confirmLoading" @cancel="handleCancel" :keyboard="false" :maskClosable="false">
    <a-form-model
      class="form"
      :model="updatePwdForm"
      :rules="rules"
      @keydown.enter.native="updatePsd('updatePsdForm')"
      ref="updatePsdForm"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item prop="oldPassword" label="原始密码">
        <a-input auto-complete="off" placeholder="请输入原始密码" type="password" v-model="updatePwdForm.oldPassword"></a-input>
      </a-form-model-item>
      <a-form-model-item prop="newPassword" label="新密码">
        <a-input auto-complete="off" placeholder="请输入新密码" type="password" v-model="updatePwdForm.newPassword"></a-input>
      </a-form-model-item>
      <a-form-model-item prop="reNewPassword" label="重复密码">
        <a-input auto-complete="off" placeholder="请输入重复密码" type="password" v-model="updatePwdForm.reNewPassword"></a-input>
      </a-form-model-item>
    </a-form-model>
    <div slot="footer">
      <a-button style="margin: 10px 0" :loading="loading" icon="check" @click.native.prevent="updatePsd('updatePsdForm')" type="primary">提 交</a-button>
    </div>
  </a-modal>
</template>

<script>
import { cryptoPassword } from '@/utils';
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let validateNewPassword = (rule, value, callback) => {
      let regx = new RegExp(/(^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,15}$)/);
      if (regx.test(value)) {
        callback();
      } else {
        callback(new Error('长度至少8位，至少一个大写字母，一个小写字母，一个特殊字符，一个数字！'));
      }
    };
    let validateRePassword = (rule, value, callback) => {
      if (value !== this.updatePwdForm.newPassword) {
        callback(new Error('两次输入的新密码不一致'));
      } else {
        callback();
      }
    };
    return {
      confirmLoading: false,
      loading: false,
      updatePwdForm: {
        oldPassword: '',
        newPassword: '',
        reNewPassword: ''
      },
      rules: {
        oldPassword: [
          {
            type: 'string',
            required: true,
            trigger: 'blur',
            message: '请输入原始密码'
          }
        ],
        newPassword: [
          {
            type: 'string',
            required: true,
            trigger: 'blur',
            message: '请输入新密码'
          },
          { validator: validateNewPassword }
        ],
        reNewPassword: [
          {
            type: 'string',
            required: true,
            trigger: 'blur',
            message: '请再次输入密码'
          },
          { validator: validateRePassword }
        ]
      }
    };
  },
  methods: {
    handleCancel() {
      this.$emit('input', false);
    },
    updatePsd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          let { oldPassword, newPassword, reNewPassword } = this.updatePwdForm;
          let params = {
            oldPassword: cryptoPassword(oldPassword),
            newPassword: cryptoPassword(newPassword),
            reNewPassword: cryptoPassword(reNewPassword)
          };
          console.log(params);
          this.$message.success('操作成功！');
          this.handleCancel();
        } else {
          this.loading = false;
          // this.$message.error('密码输入不正确！');
          return false;
        }
      });
    }
  }
};
</script>
