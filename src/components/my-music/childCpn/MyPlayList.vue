<template>
  <div id="playlist" class="g-wrap" >
    <div class="container">
        <!-- 顶部描述 -->
        <song-desc :song_details="song_details">
          <span slot="sign" class="sign"></span>
          <template v-slot:creatorMsg = "data">
            <div class="d-message" >
              <div v-if="data.creatorMsg.creator">
                <a href="javascript:;"><img :src="data.creatorMsg.creator.avatarUrl" alt=""></a>
                <router-link :to="`/user/home?uid=${data.creatorMsg.creator.userId}`">{{ data.creatorMsg.creator.nickname }}</router-link>
                <span>{{ data.creatorMsg.createTime | dateFormat}} 创建</span>
              </div>
            </div>
          </template>
        </song-desc>
        <!-- 中间歌曲列表 -->
        <div class="c-content">
          <song-list :songList="songList"/>
        </div>
        <!-- 评论 -->
        <div class="b-comment">
          <song-comment/>
        </div>
    </div>
  </div>
</template>

<script>
 import SongList from 'views/song/SongList'
 import SongDesc from 'views/song/SongDesc'
 import SongComment from 'views/song/SongComment'

import { getSheetSongs, getListDetails } from 'network/songSheetApi'

 export default {
  components: { SongList,SongDesc,SongComment },
   name: 'MyPlayList',
   data() {
      return {
        song_details: {}, // 歌单详情
        songList: [] // 歌单的所有歌曲列表 
      }
   },
   watch: {
     '$route.query.id': function() {
       const id = this.$route.query.id;
       this.getSheetMsgFun(id)
     }
   },
   created() {
     const id = this.$route.query.id;
     this.getSheetMsgFun(id);
   },
   methods: {
     getSheetMsgFun(id) {
      //  获取歌单详情
      getListDetails(id).then(res => {
        this.song_details = res.playlist
      })
      //  获取歌单所有歌曲
       getSheetSongs(id).then(res => {
         this.songList = res.songs
     })
     }
   },
};

</script>
<style lang="scss"  scoped>
.g-wrap {
  border: 1px solid #cfcfcf;
  background-color: #fff;
  .container {
    padding: 40px;
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