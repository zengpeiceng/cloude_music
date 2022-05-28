<template>
  <div id="basicMsg">
    <div class="t-basic-msg">
        <dl>
          <dt>
            <img v-if="basicMsg.avatarUrl" :src="basicMsg.avatarUrl" alt="">
          </dt>
          <dd>
            <h2>
              <span class="uname">{{basicMsg.nickname}}</span>
              <span class="icon level">
                {{basicMsg.level}}
                <i class="icon"></i>
              </span>
              <span class="gender boy" v-if="basicMsg.gender === 1"></span>
              <span class="gender girl" v-else></span>
              <div class="operate" v-if="basicMsg.userId !== userInfo.userId">
                <a href="javascript:;"><span>发私信</span></a>
                <a href="javascript:;"><span>关注</span></a>
              </div>
              <div v-else class="edit">编辑个人资料<i></i></div>
            </h2>
            <ul>
              <li>
                <span>{{ basicMsg.eventCount }}</span>
                <p>动态</p>
              </li>
              <li>
                <span>{{ basicMsg.follows }}</span>
                <p>关注</p>
              </li>
              <li>
                <span>{{ basicMsg.followeds }}</span>
                <p>粉丝</p>
              </li>
            </ul>
            <p class="signature">
              个人介绍：
              <span v-if="basicMsg.signature">{{basicMsg.signature}}</span>
              <span v-else>暂无</span>
            </p>
          </dd>
        </dl>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'BasicMsg',
  props: {
    basicMsg: {}
  },
  data() {
    return {
      
    };
  },
  computed: {
    ...mapState('UserModule', ['userInfo'])
  },
  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
#basicMsg {
  .t-basic-msg {
      width: 100%;
      dl {
        display: flex;
        dt {
          border: 1px solid #dfdfdf;
          margin-right: 30px;
          img {
            width: 188px;
            height: 188px;
            padding: 5px;
          }
        }
        dd {
          flex: 1;
          height: 200px;
          h2 {
            font-size: 22px;
            padding-bottom: 20px;
            font-weight: normal;
            border-bottom: 1px solid #ddd;
            .icon {
              display: inline-block;
              background: url('https://s2.music.126.net/style/web2/img/icon2.png?78744c80d6abc783b952bf9bd11342b4') -135px -190px;
            }
            .level {
              margin: 0 20px;
              width: 50px;
              height: 19px;
              line-height: 20px;
              color: #e03a24;
              font-size: 12px;
              font-style: italic;
              text-align: right;
              i {
                float: right;
                width: 9px;
                height: 19px;
                background-position: -191px -190px;
              }
            }
            .gender {
              position: relative;
              top: 5px;
              right: 10px;
              display: inline-block;
              width: 20px;
              height: 20px;
              background: url('https://s2.music.126.net/style/web2/img/icon.png?68f683ea74b61d088af88c3a9aa4411b') -41px -57px;
            }
            .girl {
              background-position: -41px -27px;
            }
            .operate {
              display: inline-block;
              a {
                display: inline-block;
                font-size: 12px;
                font-weight: normal;
                background: url('https://s2.music.126.net/style/web2/img/button.png?f84cecde1baef312091802276d4ebf1b');
                text-align: right;
                height: 31px;
                line-height: 31px;
                height: 31px;
                span {
                  padding-right: 10px;
                }
                &:nth-child(1) {
                  width: 75px;
                  background-position: 0 -810px;
                }
                &:nth-child(2) {
                  color: #fff;
                  width: 71px;
                  background-position: 0 -720px;
                  margin: 0 10px;

                }
              }
            }
            .edit {
              float: right;
              position: relative;
              width: 107px;
              height: 31px;
              line-height: 31px;
              font-size: 12px;
              font-weight: normal;
              text-align: center;
              background: url('https://s2.music.126.net/style/web2/img/button2.png?a25229b289933c54f25a169a8d716765') 0 -59px;
              cursor: pointer;
              i {
                position: absolute;
                right: 0;
                width: 5px;
                height: 31px;
                display: inline-block;
                background: url('https://s2.music.126.net/style/web2/img/button2.png?a25229b289933c54f25a169a8d716765') 100% -100px;
              }
            }
          }
          ul {
            padding-top: 10px;
            width: 260px;
            display: flex;
            li {
              
              flex: 1;
              color: #666;
              
              &:nth-child(2), &:nth-child(3) {
                padding-left: 30px;
                border-left: 1px solid #ddd;
              }
              span {
                font-size: 24px;
                font-weight: 700;
              }

            }
          }
          .signature {
            margin-top: 20px;
            color: #666;
            font-size: 12px;
          }
        }
      }
    }
}
</style>