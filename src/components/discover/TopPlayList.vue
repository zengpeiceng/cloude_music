<template>
  <div>
    <div class="g_mymusic">
      <div class="p-mymusic">
        <div class="p-left">
          <div class="p-left-content">
            <h3>云音乐特色榜</h3>
            <ul>
              <li 
                :class="cur == item.id ? 't-item active': 't-item'" 
                v-for="(item, index) in t_titles.slice(0, 4)"
                @click="changeCur(item)">
                <img :src="item.coverImgUrl" alt="">
                <div>
                  <a>{{item.name}}</a>
                  <p>{{item.updateFrequency}}</p>
                </div>
              </li>
            </ul>
            <h3>全球媒体榜</h3>
            <ul>
              <li 
                :class="cur == item.id ? 't-item active': 't-item'" 
                v-for="(item, index) in t_titles.slice(5, )"
                @click="changeCur(item)">
                <img :src="item.coverImgUrl" alt="">
                <div>
                  <a>{{item.name}}</a>
                  <p>{{item.updateFrequency}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="p-center">
          <div class="g-wrap">
            <!-- 顶部描述 -->
            <song-desc :song_details="currSheet">
              <template v-slot:TimeMsg = "data">
                <div class="d-message">
                  <span>最近更新：{{data.SongMsg.trackUpdateTime | dateFormat}}</span>
                </div>
              </template>
            </song-desc>
            <!-- 中间歌曲列表 -->
            <div class="c-content">
              <song-list :songList="t_songs">
                <template slot="playCount">
                <i>播放: <em>{{currSheet.playCount}}</em>次</i>
              </template>
              </song-list>
            </div>
            <!-- 评论 -->
            <div class="b-comment">
              <song-comment/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import SongList from 'views/song/SongList'
import SongDesc from 'views/song/SongDesc'
import SongComment from 'views/song/SongComment'

import {getTopLists, getSheetSongs, getListDetails } from 'network/songSheetApi.js'
export default {
  name: 'TopPlayList',
  components: { SongList, SongDesc, SongComment},
  data() {
    return {
      t_titles: [],    // 左侧的歌单列表
      cur: 0,         // 当前歌单的id
      t_songs: [],    // 当前歌单的全部歌曲
      currSheet: {}   // 当前歌单的详情包括歌单名，封面等
    };
  },
  created() {
    getTopLists().then(res => {
        this.t_titles.push(...res.list)  
        if(this.$route.query.id) {
          this.cur = this.$route.query.id
        }else {
          this.cur = this.t_titles[0].id;
        }
        this.getTopDetails(this.cur) 
      })
  },
  methods: {
    // -----------------网络请求---------------------
    getTopDetails(id) {
      // 获取歌单所有歌曲
      getSheetSongs(id, 1000).then(res => {
        this.t_songs = res.songs
        this.getCurDetails(id);
      }).catch(err => {
        console.log(err);
      })
    },
    // 获取歌单的详细信息如播放量
    getCurDetails(id) {
      getListDetails(id).then(res => {
        this.currSheet = res.playlist
      })
    },
    // -----------------点击事件---------------------
    // 给当前活跃item添加active类
    changeCur(item) {
      if( this.cur != item.id) {  
        this.cur = item.id
        this.getTopDetails(item.id);
        this.$router.push('/discover/toplist?id=' + item.id)
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.g_mymusic {
    overflow: auto;
    .p-mymusic {
      width: 982px;
      margin: 0 auto;
      border: 1px solid #d4d4d4;
      .p-left {
        h3 {
          margin: 10px 0 10px 10px;
        }
        float: left;
        width: 240px;
        border: 1px solid #d4d4d4;
        .p-left-content {
          padding-top: 40px;
        }
        .t-item {
          display: flex;
          padding: 10px;
          &:hover {
            background-color: #eeeded;
          }
          img {
            width: 40px;
            height: 40px;
            margin-right: 10px;
          }
          div {
            p {
              color: #999;
            }
          }
        }
      }
      .p-center {
        float: right;
        width: 740px;
        .g-wrap {
          padding: 30px;
          border: 1px solid #cfcfcf;
          background-color: #fff;
          .d-message {
              margin: 10px 0;
              color: #666;
              span:nth-child(2) {
                padding: 0 5px;
                color: #999
              }
            }
          .c-content {
            width: 100%;
            border-bottom: 1px solid rgb(207, 207, 207);
          }
          .b-comment {
            width: 100%;
          }
        }
      }
    }
  }
.active {
  background-color: rgb(221, 219, 219) !important;
}
</style>