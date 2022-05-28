<template>
  <div id="register">
     <el-dialog
      title="注册"
      :visible.sync="dialogVisible"
      :before-close="handleClose">
      <el-form :model="accountForm" status-icon :rules="rules" ref="accountForm" class="demo-ruleForm">
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" v-model="accountForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input placeholder="设置登录密码，不少于8位" v-model="accountForm.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('accountForm')">下一步</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" @click="$emit('toLogin')">
          <a href="javascript:void(0)">&lt;返回登录</a>
      </div>  
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CloudMusicRegister',

  data() {
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else {
        const pattern = /^1[345678]\d{9}$/
        if (!pattern.test(value)) {
          callback(new Error('手机号格式错误'));
        }
      }
    };
    var validatePwd = (rule, value, callback) => {
      if(value === '') {
        callback(new Error('密码不能为空'));
      }else if(!/^(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{8,20}$/.test(value)) { 
        callback(new Error('包含字母、数字、符号中至少两种'));
      }
    };
    return {
      dialogVisible: true,
      accountForm: {
        phone: '', // 手机号
        pwd: '' // 验证码,
      },
      rules: {
        phone: { validator: validatePhone, trigger: 'blur' },
        pwd: { validator: validatePwd, trigger: 'blur' }
      }
    };
  },

  mounted() {
    
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-dialog {
    border-radius: 5px;
    width: 530px;
    height: 313px;
    .el-form-item:nth-child(3) {
      position: relative;
      top: 10px;
    }
    .el-dialog__header {
      background-color: rgb(45, 45, 45);
      height: 38px;
      line-height: 38px;
      padding: 0 45px 0 18px;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
      .el-dialog__title {
        color: #fff;
        font-size: 14px;
      }
      .el-dialog__close {
        position: relative;
        top: -11px;
      }
    }
    .el-form {
      margin: 0 auto;
      width: 220px;
      .el-form-item {
        height: 30px;
        .el-input__inner {
          height: 30px;
        }
        .el-button {
          width: 220px;
        }
      }      
      // .el-form-item:nth-child(2) {
      //   a {
      //     margin-left: 10px;
      //     display: inline-block;
      //     width: 75px;
      //     height: 28px;
      //     line-height: 28px;
      //     border: 1px solid #ccc;
      //     border-radius: 5px;
      //     font-size: 12px;
      //     text-align: center;
      //   }
      // }
    }
    .el-dialog__footer {
      position: relative;
      bottom: -5px;
      padding: 0;
      .dialog-footer {
        border-top: 1px solid #ccc;
        background-color: #efefef;  
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        line-height: 52px;
        a {
          padding-left: 20px;
          float: left;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>