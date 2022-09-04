<template>
  <div id="phoneLogin">
    <el-dialog
      title="手机号登录"
      :visible.sync="dialogVisible"
      :before-close="handleClose">
      <el-form :model="phoneLoginForm" status-icon :rules="rules" ref="phoneLoginForm" class="demo-ruleForm">
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" v-model="phoneLoginForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="vCode">
            <el-input placeholder="请输入验证码" v-model="phoneLoginForm.vCode" autocomplete="off"></el-input>
            <a href="javascript: void(0)" @click="getVCode()" v-if="!isGetVcode">获取验证码</a>
            <a href="javascript: void(0)" v-else class="disabled">{{timer}}s</a>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('phoneLoginForm')">登录</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer"  >
          <a href="javascript:void(0)" @click="$emit('register')">&lt;没有账户？免费注册</a>
          <img @click="$emit('changeLoginMode')" src="https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9656441793/9f07/c197/3af2/f07b8d6ef20964be159ce812841fc9d2.png" alt="">
      </div>  
    </el-dialog>
  </div>
</template>

<script>
import { sentCode, ph_login, checkCode } from 'network/account'
export default {
  name: 'PhoneLogin',
  data() {
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else if(!/^1[345678]\d{9}$/.test(value)){
        callback(new Error('手机号格式错误'));
      }else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('验证码不能为空'));
      }else {
        callback();
      }
    };
    return {
      dialogVisible: true,
      isGetVcode: false,// 控制显示获取验证码或倒计时
      timer: 60, // 倒计时时间
      phoneLoginForm: {
        phone: '', // 手机号
        vCode: '' // 验证码,
      },
      rules: {
        phone: { validator: validatePhone, trigger: 'blur' },
        vCode: {validator: validateCode, trigger: 'blur'}
      }
    };
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证验证码是否正确
          this.checkCodeFunc();
        } else {
          return false;
        }
      });
    },
    // ------------------ 请求事件 --------------
    // 获取验证码
    getVCode(e) {
      this.isGetVcode = true;
      sentCode(this.phoneLoginForm.phone).then(res => {
        if(res.code === 200) {
          let t = setInterval(() => {
            // 验证获取成功，进入倒计时
            if(this.timer === 0) {
              // 倒计时为0后，重新显示获取验证码，清除倒计时迭代器
              clearInterval(t);
              this.isGetVcode = false
              this.timer = 60
            }
            this.timer--;
          }, 1000)
        }else {
          this.$message.error('手机号未注册或错误');
        }
      })
    },
    // 网络请求，验证验证码
    checkCodeFunc() {
      const phone = this.phoneLoginForm.phone
      const captcha = this.phoneLoginForm.vCode
      checkCode(phone, captcha).then(res => {
        if(res.code === 200) {
          this.ph_loginFunc(phone, captcha);
        }else {
          this.$message.error('验证码错误');
        }
      })
    },
    // 手机号登录 
    ph_loginFunc(phone, captcha) {
      ph_login(phone, captcha).then(res => {
        if(res.code === 200) {  
          let userState = {isLogin: true, cookie: res.cookie}
          this.$emit('setUserInfoFunc', userState)
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
#phoneLogin {
  ::v-deep .el-dialog {
    border-radius: 5px;
    width: 530px;
    height: 313px;
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
      .el-form-item:nth-child(2) {
        .el-input {
          width: 130px;
        }
        a {
          margin-left: 10px;
          display: inline-block;
          width: 75px;
          height: 28px;
          line-height: 28px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 12px;
          text-align: center;
        }
      }
      .el-form-item:nth-child(3) {
        position: relative;
        top: 10px;
      }
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
        img {
          width: 52px;
          height: 52px;
          cursor: pointer;
        }
        a {
          padding-left: 20px;
          float: left;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .disabled {
      background: rgb(245, 245, 245);
      cursor: not-allowed;
      color: rgb(196, 196, 196);
    }
  }
}
</style>