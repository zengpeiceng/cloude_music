<template>
  <div id="TopPalyListContent">
    <div class="g-wrap">
        <!-- 顶部描述 -->
        <song-desc :song_details="currSheet">
          <template v-slot:TimeMsg = "data">
            <div class="d-message">
              <span>最近更新：{{data.SongMsg.trackUpdateTime | dateFormat}}</span>
              <span>({{data.SongMsg.updateFrequency}})</span>
            </div>
          </template>
        </song-desc>
        <!-- 中间歌曲列表 -->
        <div class="c-content">
          <song-list :songList="t_songs" :playCount="playCount"/>
        </div>
        <!-- 评论 -->
        <div class="b-comment">
          <song-comment/>
        </div>
      </div>
  </div>
</template>
<script>
import {getSheetSongs, getListDetails} from 'network/songSheetApi.js'

import SongList from 'views/song/SongList'
import SongDesc from 'views/song/SongDesc'
import SongComment from 'views/song/SongComment'

export default {
  name: 'TopPlayListContent',
  components: { SongList, SongDesc, SongComment},
  props: {
    currSheet: {}
  },
  data() {
    return {
      t_songs: [],
      playCount: 0,
    };
  },
  created() {
    const SheetId = this.$router.query.id
    this.getTopDetails(SheetId);
    console.log(SheetId);
  },
  mounted() {
    
  },

  methods: {
    // -----------------网络请求---------------------
     getTopDetails(id) {
      // 获取歌单所有歌曲
      getSheetSongs(id, 1000).then(res => {
        let s = []
        s.push(...res.songs)
        // 给每个歌曲添加一个索引号
        for(let i = 0; i < s.length; i++) {
          s[i].num = i + 1;
        }
        this.t_songs = s;
        this.getCurDetails(id);
      })
    },
    // 获取歌单播放量
    getCurDetails(id) {
      getListDetails(id).then(res => {
        this.playCount = res.playlist.playCount
      })
    },
  },
};
</script>

<style lang="scss" scoped>
#TopPlayListContent {
  .g-wrap {
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
</style>