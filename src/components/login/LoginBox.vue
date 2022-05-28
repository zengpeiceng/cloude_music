<template>
  <div id="LoginBox">
    <div v-if="loginMode === 'qr'">
      <qr-login 
        @setUserInfoFunc="setUserInfoFunc" 
        @close="hiddenDialog" 
        @changeLoginMode="loginMode = 'cell'">
        <div slot="footer" class="dialog-footer" @click="isByPhone = false" >
          <span>手机号登录</span>
        </div>
      </qr-login>
    </div>
    <div v-else-if="loginMode === 'cell'">
      <phone-login 
        @setUserInfoFunc="setUserInfoFunc" 
        @close="hiddenDialog" 
        @changeLoginMode="loginMode = 'qr'" 
        @register="loginMode = 'register'"></phone-login>
    </div>
    <div v-else>
      <register 
        @close="hiddenDialog" 
        @toLogin="loginMode = 'cell'"/>
    </div>
  </div>
</template>

<script>
import QrLogin from './childCpn/QrLogin.vue'
import PhoneLogin from './childCpn/PhoneLogin.vue'
import Register from './childCpn/register.vue'

import { getUserAccountMsg } from 'network/user'

import { mapMutations, mapState } from 'vuex'
export default {
  components: { QrLogin, PhoneLogin, Register },
  name: 'LoginBox',
  data() {
    return {
      isByPhone: true,
      loginMode: 'cell' // 登录模式 [qr(二维码), register(账户密码登录), cell(手机号登录)]
    };
    
  },
  mounted() {

  },
  computed: {
    ...mapState('UserModule', ['userInfo', 'userState'])
  },
  methods: {
    ...mapMutations('UserModule', ['setUserState', 'setUserInfo', 'hiddenDialog']),
    // 登录后设置用户状态和用户信息
    setUserInfoFunc(userState) {
      this.setUserState({userState})
      // 通过cookie 获取账户信息
      getUserAccountMsg(userState.cookie).then(res => {
        let userInfo = {
            userId: 0,
            avatarUrl: '',
            nickname: '',
            birthday: '',
            signature: '' ,// 签名
            gender: 1
          }
        // es6 一个对象给另一个对象中相同的属性赋值
        const list = (arra, arrb) => Object.keys(arra).forEach(key => arra[key] = arrb[key] || arra[key])  
        list(userInfo, res.profile)
        this.setUserInfo({userInfo})
        this.hiddenDialog();
      })
    },
  }
};
</script>

<style lang="scss" scoped>
#LoginBox {
}
</style>