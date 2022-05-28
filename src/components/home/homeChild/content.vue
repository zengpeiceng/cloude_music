<template>
  <div id="content">
    <div class="c-wrap">
      <song-sheet :songList="s_list">
        <span slot="songSheetNavBar" class="rc" @click="toPlayList">热门推荐</span>
      </song-sheet>
      <div class="wrap2">
        <div class="r-nav" @click="toTopList">榜单</div>
        <div class="s-list">
          <top-list class="s-item" v-for="(item, index) in t_list.slice(0, 4)" :key="index" :t_list="item"/>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
 import SongSheet from 'views/song/SongSheet'
 import TopList from './TopList.vue'

 import {getLivelySongList, getTopList} from 'network/home.js'
 export default {
   name: 'Content',
   components: {SongSheet, TopList},
   data() {
     return {
      //  歌单列表
       s_list: [],
      //  榜单列表
       t_list: []
     }
   },
   methods: {
    //  热门推荐分类
     toPlayList() {
       this.$router.push('/discover/playlist');
     },
     toTopList() {
       this.$router.push('discover/toplist')
     }
   },
   mounted() {
    //  获得推荐歌单
     getLivelySongList().then(res => {
       this.s_list.push(...res.result.slice(0, 10));
     }).catch(err => {
       console.log(err);
     })
      //  获取榜单
    getTopList().then(res => {
      this.t_list.push(...res.list) 
    })
   },
};

</script>
<style lang="scss" scoped>
/* 推荐歌单 */
  .c-wrap {
    width: 978px;
    margin: 0 auto;
    border: 1px solid #ccc8c8;
    background-color: #fff;
  }
  .rc {
    cursor: pointer;
  }
  /* 榜单 */
  .r-nav::before {
    content: '';
    position: relative;
    top: 6px;
    
    display: inline-block;
    width: 34px;
    height: 30px;
    
    background: url('~assets/img/home/index.png');
    background-position: -225px -156px;
    background-color: #fff;
  }
  .r-nav {
    display: inline-block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    color: #333;
    border-bottom: 2px solid #C10D0C;
    margin-bottom: 20px;
    cursor: pointer;
  }
  .s-list {
    width: 100%;
    display: flex;
    justify-content: center;
    .s-item {
      width: 220px;
      border: 1px solid rgba(51, 51, 51, 0.3);
    }
  }
</style>