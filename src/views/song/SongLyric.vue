<template>
<!-- 歌词 -->
  <div id="lyric">
    <div class="left">
      <div class="s-cover" v-if="song.al">
        <img :src="song.al.picUrl" alt="">
      </div>
      <div class="s-con">
        <h3 class="s-name"><span class="sign"></span><span>{{song.name}}</span></h3>
        <p class="ar-name" v-if="song.ar">
          <router-link :to="`/artist?id=${song.ar[0].id}`">歌手：<span>{{song.ar[0].name}}</span></router-link>
        </p>
        <p class="al-name" v-if="song.al"><router-link :to="`/album?id=${song.al.id}`">所属专辑：<span>{{song.al.name}}</span></router-link></p>
        <ul class="lyric-con" v-show="isShowMusicList" ref="lyric">
          <li :class="{each:true, choose: (index==lyricIndex)}" v-for="(item, key, index) in currentMUsicLyric" :key="key">{{item}}</li>
        </ul>
      </div>  
       <song-comment />
    </div>
     <div class="sc-r">
      <div class="sc-r-nav">相似歌曲</div>
      <ul class="similar">
        <!-- <li v-for="(item, index) in simiArtist">
          <router-link :to="`/artist?id=${item.id}`">
            <img :src="item.img1v1Url" alt="">
            <p style="margin-top: 5px;width:40px;text-overflow:ellipsis;white-space: nowrap;overflow:hidden;">{{item.name}}</p>
          </router-link> -->
        </li>
      </ul>
      <div class="sc-r-nav">网易云音乐多端下载</div>
      <div class="sys">
        <ul>
          <li><a href="https://apps.apple.com/cn/app/id590338362" target="_blank">iPhone</a></li>
          <li><a href="https://music.163.com/api/pc/download/latest" target="_blank">PC</a></li>
          <li><a href="https://music.163.com/api/android/download/latest2" target="_blank">Android</a></li>
        </ul>
        <p>同步歌单，随时畅听320k好音乐</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getLyric, getSongDetails} from 'network/songSheetApi.js'
import SongComment from './SongComment.vue'
import { mapState } from 'vuex'
 export default {
   name: 'SongLyric',
   components: {SongComment},
   data() {
     return {
       currentMUsicLyric: null,
       isShowMusicList: true,
       lyricIndex: 0,
       song: {}
     }
   },
   created() {
     const id = this.$route.query.id
     this.getAll(id);
   },
   methods: {
     getAll(id) {
        getSongDetails(id).then(res => {
       this.song = res.songs[0]
     })
     getLyric(id).then(res => {
       // 处理歌词，转化成key为时间，value为歌词的对象
      let lyricArr = res.lrc.lyric.split('[').slice(1); // 先以[进行分割
      let lrcObj = {};
      lyricArr.forEach(item => {
          let arr = item.split(']');	// 再分割右括号
          // 时间换算成秒
          let m = parseInt(arr[0].split(':')[0])
          let s = parseInt(arr[0].split(':')[1])
          arr[0] = m*60 + s;
          if (arr[1] != '\n') { // 去除歌词中的换行符
              lrcObj[arr[0]] = arr[1];
          }
      })
      // 存储数据
      this.currentMUsicLyric = lrcObj;
      }).catch(err => {
        console.log(err);
      })
     }
   },
   computed: {
     ...mapState('PlayerModule', ['player', 'audioSlider'])
   },
   watch: {
     'audioSlider.sliderVal'() {
       const flag = this.$route.query.id === this.player.songs[this.player.index].id
      // 当前插放是这首歌则滚动
       if(flag) {
          let i = 0
          // 循环歌词对象
          for (let key in this.currentMUsicLyric) {
          // key表示歌词对象中的时间，如果key等于歌曲进度value，改变当前歌词进度		lyricIndex
              if (+key == this.audioSlider.sliderVal) {
                  this.lyricIndex = i;
                  // 当歌词进度大于5，即播放到了第5句歌词，开始滚动
                  if (i > 5) {
                      this.$refs.lyric.scrollTop = 30 * (i - 5);
                  }
              }
              i++;
          }
       }
      },
      '$route.query.id': function() {
        this.getAll(this.$route.query.id)
      }
   }
};

</script>
<style lang="scss" scoped>
#lyric {
  width: 980px;
  margin: 0 auto;
  border-left: 1px solid #dfdfdf;
  border-right: 1px solid #dfdfdf;
  display: flex;
  flex-shrink: 0;
  .left {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 640px;
    padding: 47px 30px 40px 39px;
    .s-cover {
      text-align: center;
      width: 206px;
      height: 205px;
      background: url('https://s2.music.126.net/style/web2/img/coverall.png?faaf1474e4ce11fcad702bbc6944cfcf');
      background-position: -140px -580px;
      img {
        position: relative;
        top: 37.5px;
        width: 130px;
        height: 130px;
        border-radius: 50%;
      }
    }
    .s-con {
      flex: 1;
      margin-left: 30px;
      h3 {
        font-size: 24px;
        color: #333;
        .sign {
          position: relative;
          top: 5px;
          margin-right: 10px;
          display: inline-block;
          width: 54px;
          height: 24px;
          background: url('~assets/img/mymusic/icon.png') no-repeat 0 -463px;
        }
      }
      p {
        padding-top: 10px;
      }
      a {
        color: #999;
        span {
          color: #0c73c2;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    .lyric-con {
        height: 300px;
        overflow: auto;
        width: 100%;
        color: #333;
        font-size: 10px;
        font-weight: normal;
        margin-top: 40px;
        li {
          padding: 5px 0;
        }
        .choose {
          height: 30px;
          line-height: 30px;
          font-size: 20px;
          color: #c20c0c;
          text-shadow: 0 0 5px #e1dada,0 0 5px #c5c3c3,0 0 5px #ca2f2f,0 0 5px #df3434 ;
        }
        // 修改滚动条样式
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }
  .sc-r {
      width: 200px;
      height: 500px;
      padding: 20px 40px 40px 30px;
      border-left: 1px solid #dfdfdf;
      .sc-r-nav {
        font-weight: bold;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgb(204, 204, 204);
      }
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
      .sys {
        ul {
          display: flex;
          justify-content: space-between;
          background: url('https://s2.music.126.net/style/web2/img/sprite.png?2550c99247d5de88c3128a13ed6de92c');
          background-position: 0 -392px;
          height: 65px;
          li {
            line-height: 48px;
            text-align: center;
            &:nth-child(1) {
              width: 42px;
              height: 48px;
            }
            &:nth-child(2) {
              width: 116px;
              height: 48px;
            }
            &:nth-child(3) {
              width: 42px;
              height: 48px;
            }
            a {
              display: inline-block;
              height: 100%;
              width: 100%;
              color:rgba(255,255,255,0)
            }
          }
        }
      }
  }
}

</style>