<template>
  <div id="songDetail">
    <div class="sc">
      <!-- 顶部描述 -->
      <div class="sc-c">
          <song-desc :song_details="song_details">
            <span slot="sign" class="sign"></span>
            <template v-slot:creatorMsg = "data">
              <div class="d-message" >
                <div v-if="data.creatorMsg.creator">
                  <a href="#"><img :src="data.creatorMsg.creator.avatarUrl" alt=""></a>
                  <router-link :to="`/user/home?uid=${data.creatorMsg.creator.userId}`">{{ data.creatorMsg.creator.nickname }}</router-link>
                  <span>{{ data.creatorMsg.createTime | dateFormat}} 创建</span>
                </div>
              </div>
            </template>
          </song-desc>
          <!-- 歌曲列表 -->
          <song-list :songList="songList">
            <template slot="playCount">
                <i>播放: <em>{{song_details.playCount}}</em>次</i>
            </template>
          </song-list>
          <!-- 评论 -->
          <song-comment></song-comment>
      </div>
      <div class="sc-r">
        <song-addition>
          <div slot="sc-r-nav" class="sc-r-nav">喜欢这个歌单的人</div>
          <template slot="sc-r-con">
             <ul class="similar">
              <li v-for="(item, index) in song_details.subscribers">
                <router-link :to="`/user/home?uid=${item.userId}`"><img :src="item.avatarUrl" alt=""></router-link>
              </li>
            </ul>
          </template>
        </song-addition>
      </div>
    </div>
  </div>
</template>

<script>

import SongDesc from 'views/song/SongDesc.vue'
import SongList from 'views/song/SongList.vue'
import SongAddition from 'views/song/SongAddition'
import SongComment from 'views/song/SongComment.vue'


import { getSheetSongs, getListDetails } from 'network/songSheetApi.js'
export default {
  components: { SongDesc, SongList, SongAddition, SongComment },
  name: 'SongDetail',
  data() {
    return {
      song_details: {},
      songList: []
    };
  },
  created() {
    getSheetSongs(this.$route.query.id, 1000).then(res => {
      this.songList = res.songs
    })
    getListDetails(this.$route.query.id).then(res => {
      this.song_details = res.playlist
    })
  },
  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
#songDetail {
  background-color: #fff;
  
  .sc {
    width: 982px;
    margin: 0 auto;
    display: flex;
    flex-shrink: 0;
    border-left: 1px solid #dfdfdf;
    border-right: 1px solid #dfdfdf;
    .sc-c {
      padding: 47px 30px 40px 39px;
      border-right: 1px solid #dfdfdf;
    }
    .sc-r {
      .similar {
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
        margin-bottom: 40px;
        li {
          padding-right: 10px;
          padding-bottom: 10px;
          img {
            width: 40px;
            height: 40px;
            &:last-child {
              padding-right: 0;
            }
          }
        }
      }
    }
  }
}
</style>