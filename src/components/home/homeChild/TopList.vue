<template>
  <div>
    <div class="dt-top">
          <img :src="t_list.coverImgUrl" alt="">
          <div class="tit">
            <div>{{t_list.name}}</div>
            <span @click="getSongList({songId:t_list.id, type: 'playlist'})" class="player"></span>
            <span class="collecte" @click="collectSheetFunction(t_list.id)"></span>
          </div>
      </div>
      <ul class="lists">
        <li class="l-item" v-for="(item, index) in s_list" @mouseenter="showOperations(index)" @mouseleave="hiddenOperations(index)">
              <span>{{index + 1}}</span>
              <p style="display:inline-block" @click="$router.push(`/song?id=${item.id}`)">{{item.name}}</p>
              <ul class="hiddenOperate" ref="operate">
                <li @click.stop="opereationClick(item, $event)"><img src="~assets/img/mymusic/playbtn.png" alt="play"></li>
                <li @click.stop="opereationClick(item, $event)"><img src="~assets/img/mymusic/add-icon.png" alt="add"></li>
                <li @click.stop="opereationClick(item, $event)"><img src="~assets/img/mymusic/collect-icon.png" alt="collect"></li>
              </ul>
        </li>
        <li class="l-item more">
          <p style="text-align: right">
            <router-link :to="`discover/toplist?id=${t_list.id}`">查看全部></router-link>
          </p>
        </li>
      </ul>
  </div>
</template>

<script>
import { collectSheet } from 'utils/sheetOperateFunc'
import {getSheetSongs} from 'network/songSheetApi.js'
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'TopList',
  props: {
    t_list: {
      type: Object
    }
  },
  data() {
    return {
      s_list: []
    };
  },
  created() {
    getSheetSongs(this.t_list.id, 10).then(res => {
      this.s_list.push(...res.songs)
    }).catch(err => {
      console.log(err);
    })
  },
  computed: {
    ...mapState('UserModule', ['userState'])
  },
  methods: {
    ...mapMutations('PlayerModule', ['pushSong', 'setSongs']),
    ...mapMutations('UserModule', ['showDialog']),
    ...mapActions('PlayerModule', ['getSongList', 'getSongUrlAct']),
    ...mapActions('MySheets', ['collectSheetFunc']),
    showOperations(index) {
      this.$refs.operate[index].className = 'operate'
    },
    hiddenOperations(index) {
      this.$refs.operate[index].className = 'hiddenOperate'
    },
    opereationClick(item, e) {
       if(e.path[0].alt === 'play') { // 播放
          this.getSongUrlAct({songItem: item.id})
       }else if(e.path[0].alt === 'add') { //  添加到播放列表
         this.pushSong(item.id);
         this.$message.success('已添加到播放列表');
       }else if(e.path[0].alt === 'collect') {
        //  收藏到歌单
       }
     },
     collectSheetFunction(id) {
      if(this.userState.isLogin) {
        this.collectSheetFunc(id);
      }else {
        this.showDialog();
      }
    }
  },
};
</script>

<style lang="scss" scoped>
  .dt-top {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    font-weight: bold;
    padding: 20px 10px 20px 20px;
    background-color: rgb(241, 236, 236);
    img {
      width: 100px;
      height: 100px;
    }
    .tit {
      margin-left: 20px;
      div {
        cursor: pointer;
      }
    }
  }
  .player, .collecte {
    display: inline-block;
    
    margin: 10px 10px 0 0;
    width: 24px;
    height: 30px;
    cursor: pointer;
    background: url('~assets/img/home/index.png');
  }
  /* 插放按钮 */
  .player{
    background-position: -267px -205px;
  }
  /* 收藏按钮 */
  .collecte {
    background-position: -300px -205px;
  }
  .lists {
    a:hover {
      text-decoration: underline;
    }
    .l-item {
      display: flex;
      height: 35px;
      line-height: 35px;
      position: relative;
      span { 
        display: inline-block;
        text-align: center;
        padding-left: 15px;
        width: 30px;
        font-size: 16px;
      }
      background-color: rgb(247, 241, 241);
      &:nth-child(2n+1) {
        background-color: rgb(235, 231, 231);
      }
      &:nth-child(-n+3) {
        color: #c10d0c;
      }
      p {
        flex: 1;
        color: #333;
        cursor: pointer;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  /* 查看全部 */
  .more {
      padding-right: 20px;
  }
  .operate {
      display: flex;
      justify-content: flex-end;
      flex-shrink: 0;
      width: 81px;
      li {
        padding: 0 5px;
        img {
          width: 17px;
          height: 17px;
        }
      }
  }
  .hiddenOperate {
    display: none;
  }
</style>