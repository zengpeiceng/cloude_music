<template>
  <div id="qrLogin">
     <el-dialog
      title="登录"
      :visible.sync="dialogVisible"
      :before-close="handleClose">
        <div class="qr">
          <div v-if="!isAuthorization" class="wait">
            <div class="ph-img"><img src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9643571155/525c/faac/2dc6/fe695c03c7c358ddaa4651736b26a55f.png" alt=""></div>
            <div class="qr-img">
              <h3>扫码登录</h3>
              <div style="posistion: relative">
                <img :src="codeImg" alt="">
                <div class="layer" ref="layer">
                  <p>二维码已失效</p>
                  <a class="refresh" href="javascript:void(0)" @click="getqrKeyFunc()">点击刷新</a>
                </div>
              </div>
              <p>使用 <a style="color: #0c73c2;" href="https://music.163.com/#/download" target="_blank">网易云音乐APP</a> 扫码登录</p>
            </div>
          </div>
          <div v-else class="authorization">
            <img src="https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9765284460/1b1d/9f46/2fa3/2d5d07bb5fcf8c24c1ad788c923ef313.png" alt="">
            <p>扫描成功</p>
            <p>请在手机上确认登录</p>
          </div>
        </div> 
        <div slot="footer" class="dialog-footer" @click="$emit('changeLoginMode')" >
          <span>手机号登录</span>
        </div>       
    </el-dialog>
  </div>
</template>

<script>
import { qr_check, qrKey, qr_create } from 'network/account'
export default {
  name: 'QrLogin',
  data() {
    return {
      dialogVisible: true, // 控制登录窗口的显示
      codeImg: '', // 二维码图片
      isAuthorization: false, // 二维码登录：扫描二难码状态，扫描成功为true 授权中
      t: null, // 值为定时迭代器
    };
  },
  created() {
    this.getqrKeyFunc();
  },
  mounted() {
    
  },
  methods: {
    // 获得二维码key
    getqrKeyFunc() {
      qrKey().then(res => {
        const key = res.data.unikey
        qr_create(key).then(res => {
          this.$refs.layer.style.display = 'none'
          this.codeImg = res.data.qrimg
          this.qrCheckFunc(key)
        })
      })
    },
    // 二维码状态检测
    qrCheckFunc(key) {
      this.t = setInterval(() => {
        const timer = new Date().getTime(); // 当前时间戳
        qr_check(key, timer).then(res => {
            if(res.code === 802) { // 授权中
              this.isAuthorization = true
            }
            else if(res.code === 803) { // 用户扫了码，状态为803 授权成功
              let userState = {isLogin: true, cookie: res.cookie}
              this.$emit('setUserInfoFunc', userState)
              this.handleClose();
            }else if(res.code === 800) {
              console.log(res); 
              //  二维码不存在或过期, 重新获取二维码
               this.$refs.layer.style.display = 'block'
               clearInterval(this.t)
            }
        })
      }, 1000);
    },
     handleClose() {
      clearInterval(this.t)
      this.$emit('close')
    },
  },
};
</script>

<style lang="scss" scoped>
#qrLogin {
  /deep/ .el-dialog {
    border-radius: 5px;
    width: 530px;
    height: 366px;
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
    .qr {
      .wait {
        display: flex;
        justify-content: center;
        .ph-img {
          width: 125px;
          height: 220px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .qr-img {
          flex: 0.7;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          text-align: center;
          h3 {
            font-weight: normal;
            color: #000;
          }
          div {
            position: relative;
            margin: 0 auto;
            width: 138px;
            height: 138px;
            img {
              width: 100%;
              height: 100%;
            }
            p {
              font-size: 12px;
              color: #999;
            }
            .layer {
              display: none;
              position: absolute;
              top: 0;
              width: 100%;
              height: 100%;
              background: rgba(255, 255, 255, 0.9);
              p {
                margin-top: 40px;
                color: #666;
              }
              .refresh {
                display: block;
                margin: 0 auto;
                width: 66px;
                height: 26px;
                line-height: 26px;
                background-image: linear-gradient(rgb(129, 221, 129) 0%, rgb(85, 160, 85) 100%);
                color: #fff;
                font-size: 12px;
                border-radius: 5px;
                margin-top: 10px;
              }
            }
          }
        }
      }
      .authorization {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        img {
          width: 140px;
          height: 140px;
        }
        p {
          margin-top: 10px;
          font-size: 14px;
          color: #333;
        }
      }
    }
    .el-dialog__footer {
      padding: 0;
      .dialog-footer {
        margin: 0 auto;
        width: 100px;
        height: 31px;
        line-height: 31px;
        text-align: center;
        font-size: 12px;
        border: 1px solid #ccc;
        border-radius: 15px;
        cursor: pointer;
      }
    }
  }
}
</style>