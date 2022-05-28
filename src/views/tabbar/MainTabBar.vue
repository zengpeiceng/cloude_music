<template>
  <div id="mainTabBar">
    <div class="m-top">
      <div class="logo">
        <img src="~assets/img/home/web-logo.jpeg" alt="">
        <span class="T-title">网易云音乐</span>
      </div>
      <ul class="top-titles">
        <li v-for="(item, index) in titles" 
          :class="{active: curr === index}"
          @click="changeActive(index, item)"
          >
          {{item}}
          <div class="arrow" v-if="curr === index"></div>
        </li>
      </ul>
      <div class="search" ref="searchPanel">
        <span class="sc-img"><img src="~assets/img/home/search.png" alt=""></span>
        <input placeholder="音乐/视频/电台/用户" 
          class="search-input" 
          v-model="inputCon"
          @keyup.enter="inputSubmit"
          @focus="isShowRec = true"
          type="text">
          <div ref="SUG">
            <search-suggestion v-if="isShowRec" :s_content="inputCon"/>
          </div>
      </div>
      <div class="creation">
        <a href="https://music.163.com/#/creatorcenter" target="_blank"><span>创作者中心</span></a>
      </div>
      <div class="profile">
        <a class="loginBtn" href="javascript: void(0);" @click="showDialog()" v-if="!userState.isLogin">
          <span>登录</span>
        </a>
        <a class="photo" href="javascript: void(0);" v-else @mouseenter="showOptions" @mouseleave="hiddenOptions">
          <img :src="userInfo.avatarUrl" alt="" >
          <div style="display:none;" ref="options">
            <i class="arrow"></i>
            <ul class="setup">
              <li @click="toUserHome(1)"><i class="icon icon1"></i><span>我的主页</span></li>
              <li @click="toUserHome(2)"><i class="icon icon2"></i><span>我的消息</span></li>
              <li @click="toUserHome(3)"><i class="icon icon3"></i><span>我的等级</span></li>
              <li @click="toUserHome(4)"><i class="icon icon4"></i><span>个人设置</span></li>
              <li @click="toUserHome(5)"><i class="icon icon5"></i><span>退出</span></li>
            </ul>
          </div>
        </a>
      </div>
    </div>
    <div class="tab-bottom"></div>
    <div v-show="$route.path === '/' || $route.path.includes('discover')">
      <nav2-tab-bar/>
    </div>
  </div>
</template>

<script>
import Nav2TabBar from './Nav2TabBar.vue'
import SearchSuggestion from 'views/search/SearchSuggestion'
import closeTargetEle from 'utils/closeTargetEle.js'
import LoginBox from 'components/login/LoginBox'

import {mapMutations, mapState} from 'vuex'

import { getUserSongSheets } from 'network/user'
 export default {
   name: 'MainTabBar',
   components: {
     Nav2TabBar,
     SearchSuggestion,
     LoginBox
   },
   data() {
     return {
      //  顶部导航栏标题
       titles: [
         '发现音乐',
         '我的音乐',
         '商城',
         '音乐人',
         '下载客户端'
       ],
       curr: 0, // 控制顶部的当前样式变量,
       inputCon: '',
       isShowRec: true,
     }
   },
    created() {
     if(this.$route.path.toString() === '/mymusic/music/playlist') {
       this.curr = 1;
     }else {
       this.curr = 0;
     }
   },
   watch: {
     '$route.path': function() {
        if(this.$route.path.toString() === '/mymusic/music/playlist') {
       this.curr = 1;
     }else {
       this.curr = 0;
     }
     }
   },
   mounted() {
     document.addEventListener('click', this.NonTargetIsClicked)
   },
   computed: {
     ...mapState('UserModule', ['userInfo', 'userState'])
   },
   methods: {
    //  vuex
     ...mapMutations('UserModule', ['logout', 'showDialog']),
    // -------------- 请求事件 -------------------
     inputSubmit() {
       if(this.inputCon) {
         let keywords = this.inputCon
          this.$router.push({
            path: '/search',
            query: {
              keywords
            }
          })
       }
       this.isShowRec = false;
     },
    // -------------- 自定义事件 -------------------
    //  切换顶部导航栏当前下标
     changeActive(index, item) {
       this.curr = index;
       if(item === '发现音乐') {
         this.$router.push('/');
       }else if(item === '我的音乐') {
        if(this.userState.isLogin) {
          getUserSongSheets(this.userInfo.userId).then(res => {
            if(res.code === 200) {
               const id = res.playlist[0].id
               this.$router.push(`/mymusic/music/playlist?id=${id}`);
            }
          })
        }else {
          this.$router.push('/')
          this.$message.error('您还未登录，请先登录');
          this.showDialog();
        }
       }else if(item === '关注') {
         this.$router.push('friends');
       }else if(item === '商城') {
         window.open('https://music.163.com/store/product');
       }else if(item === '音乐人') {
         window.open('https://music.163.com/st/musician')
       }else if(item === '下载客户端') {
       }
     },
    //  鼠标移动事件
     mouseOver(index) {
      let Ttitles = document.querySelector('.top-titles');
      for(let i = 0; i < Ttitles.children.length; i++) {
        Ttitles.children[i].className = '';
      }
      Ttitles.children[index].className = 'active';
     },
    //  鼠标移走事件
     mouseOut() {
      let Ttitles = document.querySelector('.top-titles');
      for(let i = 0; i < Ttitles.children.length; i++) {
        Ttitles.children[i].className = '';
      }
      Ttitles.children[this.curr].className = 'active';
     },
    // 鼠标移到头像，出现选项包括：我的主页，我的消息，设置等
    showOptions() {
      this.$refs.options.style = 'display:block'
    },
    hiddenOptions() {
      this.$refs.options.style = 'display:none'
    },
    toUserHome(item) {
      switch(item) {
        case 1: this.$router.push(`/user/home?uid=${this.userInfo.userId}`);break;
        case 5: this.logout();this.$router.push('/');break;
      }
    },
    // 点击空白处，隐藏搜索推荐
    NonTargetIsClicked(e) {
        if(this.isShowRec){
          const target = e.target;
          const showTargetEle = this.$refs.SUG;
          const triggerTargetEle = this.$refs.searchPanel;
          // showTargetEle 当前要隐藏/显示的元素，showTargetEle,triggerTargetEle 
          const flag = closeTargetEle(target,showTargetEle,triggerTargetEle);
          if(!flag){
            this.isShowRec = false
        }
      }
    }
   },
   beforeDestroy() {
    document.removeEventListener('click', this.NonTargetIsClicked)
  }
};

</script>
<style lang="scss" scoped>
  #mainTabBar {
    background-color: #242424;
    /* 顶部导航栏 */
    .m-top {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: 70px;

      font-size: 14px;
      color: #fff;
      text-align: center;
      line-height: 70px;
      
      border-bottom: 1px solid #000;
      background-color: #242424;

      max-width: 1100px;
      margin: 0 auto;
      .logo {
        cursor: pointer;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .T-title {
          padding-left: 10px;
          font-size: 20px;
          font-weight: bold;
        }
      }
      .top-titles {
        display: flex;
        font-weight: 200;
        li {
          position: relative;
          padding: 0 20px;
          &:hover {
          background: #000;
          cursor: pointer;
          }
          .arrow {
            position: absolute;
            width: 0;
            height: 0;

            bottom: -1px;

            border-bottom: 6px solid#c20c0c;
            border-top: 6px solid #000;
            border-right: 6px solid #000;
            border-left: 6px solid #000;
            background-color: #c20c0c;

            left: 0;
            right: 0;
            margin: 0 auto;
          }
        }
      }
      .search {
        position: relative;
        width: 180px;
        height: 30px;
        line-height: 30px;

        background-color: #fff;
        border-radius: 20px;
        // overflow: hidden;
        .sc-img {
          position: relative;
          background-color: #fff;
          img{
            width: 20px;
            height: 20px;
          }
        }
        .search-input {
          position: relative;
          font-size: 12px;
          left: 5px;
        }
      }
      .creation {
        display: inline-block;
        margin: 0 10px;
        width: 100px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        border: 1px solid #666;
        a {
          color: #ccc;
          font-size: 12px;
        }
      }
      .profile {
        .loginBtn {
          color: #666;
          font-size: 12px;
          :hover {
            text-decoration: underline;
            color: #999;
          }
        }
        .photo {
          position: relative;
          display: inline-block;
          width: 30px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
          .arrow {
            position: absolute;
            display: inline-block;
            top: 56px;
            right: 7px;
            width: 14px;
            height: 8px;
            background: url('https://s2.music.126.net/style/web2/img/frame/toplist.png?570defea93e9d06cb049b4b422b48e6e') -20px 0px;
          }
          .setup {
            position: absolute;
            right: -64px;
            top: 60px;
            width:158px;
            color: #ccc;
            background: #2b2b2b;
            z-index: 999999;
            li {
              display: flex;
              line-height: 30px;
              font-size: 12px;
              &:hover {
                color: #fff;
                background-color: rgb(59, 58, 58);
              }
              span {
                flex: 1;
                text-align: left;
              }
              .icon {
                display: inline-block;
                margin: 5px 10px 5px 20px;
                width: 18px;
                height: 18px;
                background: url('https://s2.music.126.net/style/web2/img/frame/toplist.png?570defea93e9d06cb049b4b422b48e6e');
                align-items: center;
              }
              .icon1 {
                background-position: 0 -80px;
              }
              .icon2 {
                background-position: -20px -120px;
              }
              .icon3 {
                background-position: 0 -100px;
              }
              .icon4 {
                background-position: 0 -140px;
              }
              .icon5 {
                background-position: 0 -200px;
              }
            }
          }
        }
      }
    }
    .active {
      background-color: #000;
    }
    .tab-bottom {
      width: 100%;
      height: 5px;
      background-color: #c20c0c;
    }
    .login {
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      z-index: 9999999;
    }
  }
  
</style>
