<template>
  <div id="search">
    <div class="s-con">
      <!-- 搜索框 -->
      <div class="top" ref="searchPanel">
        <input type="text" 
          @focus="isShowRec = true" 
          @keyup.enter="searchSubmit"
          class="searchBox" ref="inputBox" 
          v-model="inputCon">
        <div ref="SUG">
            <search-suggestion v-if="isShowRec" :s_content="inputCon"/>
        </div>
        <span @click="searchSubmit" style="cursor: pointer">搜索</span>
      </div>
      <!-- 标签页 -->
      <p>搜索“{{searchMsg}}”，找到 {{ resultsNum }} 条内容</p>
      <div>
        <el-tabs type="card" v-model="activeTab" @tab-click="handleTabClick">
            <el-tab-pane label="单曲" name="songs">
              <song-list-con :songList="songs" v-if="songs.length != 0"/>
              <h2 v-else>
                <empty>
                  <p slot="content">很抱歉，未能找到相关搜索结果！</p>
                </empty></h2>
              </h2>
            </el-tab-pane>
            <el-tab-pane label="歌手" name="artists">
              <singer-list :artists="artists" ></singer-list></el-tab-pane>
            <el-tab-pane label="专辑" name="albums">
              <album-list :albums="albums"></album-list>
            </el-tab-pane>
            <el-tab-pane label="视频" name="videos">
              <video-list :videos="videos"/>
            </el-tab-pane>
            <el-tab-pane label="用户" name="userprofiles">
              <user-list :userprofiles="userprofiles"/>
            </el-tab-pane>
        </el-tabs>
      </div>
      <!-- 分页 -->
      <el-pagination ref="pagination"
        background
        layout="prev, pager, next"
        :page-size="30"
        :current-page.sync="currPage"
        @current-change="handleCurrentChange"
        :hide-on-single-page="true"
        :page-count="totalPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import SingerList from './childCpn/SingerList.vue'
import AlbumList from './childCpn/AlbumList.vue'
import VideoList from './childCpn/VideoList.vue'
import UserList from './childCpn/UserList.vue'

import SongListCon from 'views/song/SongListCon'
import SearchSuggestion from 'views/search/SearchSuggestion'
import Empty from 'views/empty/Empty.vue';

import {getSearchMsg} from 'network/search'
import closeTargetEle from 'utils/closeTargetEle.js'

export default {
  components: { SingerList, SongListCon, SearchSuggestion, AlbumList, VideoList, UserList, Empty},
  name: 'SearchEngines',
  data() {
    return {
      currPage: 1,
      totalPage: 0,
      songs: [], //单曲 
      albums: [], //专辑
      artists: [], // 歌手 
      userprofiles: [], // 用户
      videos: [], // 视频 ,
      suggestionMsg: {}, //搜索推荐
      inputCon: '',
      searchMsg: '',
      isShowRec: true,
      currTabType: 1,
      resultsNum: 0,
      activeTab: 'songs'
    };
  },
  watch: {
    '$route.query.keywords': function() {
      const keywords = this.$route.query.keywords
      if(this.$route.query.type)
        this.currTabType = this.$route.query.type
      this.getSearchMsgFunc(keywords, this.currTabType )
    }
  },
  created() {
    document.addEventListener('click', this.NonTargetIsClicked)
    
    const keywords = this.$route.query.keywords
    if(this.$route.query.type)
      this.currTabType = this.$route.query.type
    this.inputCon = keywords
    this.searchMsg = keywords
    this.setInitialTabActive(this.currTabType)
    this.getSearchMsgFunc(keywords, this.currTabType, 30, 0)
  },
  mounted() {
    
  },
  methods: {
    // ----------------- 请求事件 ----------------
    searchSubmit() {
      this.isShowRec = false
      if(this.inputCon)
        this.getSearchMsgFunc(this.inputCon, this.currTabType , 30)
        this.searchMsg = this.inputCon
    },
    // 请求inputValue搜索相关信息
    getSearchMsgFunc(keywords, type, limit, offset) {
      getSearchMsg(keywords, type, limit, offset).then(res => {
        this.totalPage = 0
        this.resultsNum = 0
        this.songs = this.albums = this.artists = this.userprofiles = this.videos = []
        switch(parseInt(type)) {
          case 1: 
            this.songs.push(...res.result.songs), 
            this.resultsNum = res.result.songCount
            this.totalPage = Math.ceil(res.result.songCount/30);break;
          case 10: 
            this.albums.push(...res.result.albums), 
            this.resultsNum = res.result.albumCount
            this.totalPage = Math.ceil(res.result.albumCount/30);break;
          case 100: 
            this.artists.push(...res.result.artists), 
            this.resultsNum = res.result.artistCount
            this.totalPage = Math.ceil(res.result.artistCount/30);break;
          case 1014: 
            this.videos.push(...res.result.videos), 
            this.resultsNum = res.result.videoCount
            this.totalPage = Math.ceil(res.result.videoCount/30);break;
          case 1002: 
            this.userprofiles.push(...res.result.userprofiles), 
            this.resultsNum = res.result.userprofileCount
            this.totalPage = Math.ceil(res.result.userprofileCount/30);break;
        }
        this.$router.push({
          path: '/search',
          query: {
            keywords,
            type: this.currTabType,
          }
        })
      }).catch(err => {
        console.log(err);
      })
    },
    // ------------------ 自定义事件 ---------------
    searchClick() {

    },
    handleCurrentChange(val) {
      this.getSearchMsgFunc(this.searchMsg, this.currTabType, 30, val-1)
      
    },
    setInitialTabActive(type) {
      switch(type) {
          case '1': this.activeTab = 'songs';break;
          case '10': this.activeTab = 'albums';break;
          case '100': this.activeTab = 'artists';break;
          case '1014': this.activeTab = 'videos';break;
          case '1002': this.activeTab = 'userprofiles';break;
      }
    },
    handleTabClick(e) {
      this.currPage = 1
      const keywords = this.$refs.inputBox.value
      let index = e.index
      switch(index) {
        case '0': this.currTabType = 1;break; // 单曲 
        case '1': this.currTabType = 100;break; // 歌手 
        case '2': this.currTabType = 10;break;  // 专辑 
        case '3': this.currTabType = 1014;break; // 视频 
        case '4': this.currTabType = 1002;break; // 用户
      }
      this.getSearchMsgFunc(keywords, this.currTabType, 30, 0);
    },
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

  computed: {

  },
  beforeDestroy() {
    document.removeEventListener('click', this.NonTargetIsClicked)
  }
};
</script>

<style lang="scss" scoped>
#search {
  width: 100%;
  .s-con {
    width: 900px;
    background-color: #fff;
    margin: 0 auto;
    padding: 40px;
    border-left: 1px solid #d3d2d2;
    border-right: 1px solid #d3d2d2;
    /deep/ .el-tabs__nav {
      border: 1px solid #d3d2d2;
      border-radius: 0;
      background-color: #fff;
      .el-tabs__item {
        padding: 0 40px;
        &:hover {
        color: #c20c0c;
      }
      }
      .is-active {
        color: #c20c0c;
      }
    }
    .top {
      position: relative;
      display: flex;
      justify-content: right;
      align-items: center;
      width: 420px;
      height: 40px;
      line-height: 40px;
      background-color: #fff;
      text-align: center;
      border: 1px solid #d4d2d2;
      margin: 20px auto;
    
      .searchBox {
        width: 80%;
        height: 80%;
      }
      span {
        display: inline-block;
        width: 70px;
        font-size: 18px;
        background: #c20c0c;
        height: 100%;
        color: #f3f3f3;
        line-height: 40px;
        text-align: center;
      }
  }
}
/deep/ .el-pagination {
    margin: 20px;
    text-align: center;
    ul {
      li {
        background-color: #eaeaea;

        &:not(.active):hover{
          color: #c20c0c;
        }
      }
      .active {
      background-color: #c20c0c;
      }
    }
  }
}
</style>