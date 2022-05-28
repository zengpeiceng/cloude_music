<template>
   <div class="g_playlist" v-if="isShowWindow">
      <div class="listhd bg-img">
        <div class="thdl">
          <h4>播放列表</h4>
          <p>
            <span><i class="icon col-all"></i>收藏全部</span>
            <i style="color: #333">|</i>
            <span @click="removeSongs()" style="cursor: pointer;"><i class="icon delete"></i>清除</span>
          </p>
        </div>
        <div class="thdr">
          <h4 v-if="player.songs.length != 0">{{ player.songs[player.index].name }}</h4>
          <span @click="isShowWindow = false"></span>
        </div>
      </div>
      <div class="listbd bg-img">
        <div v-if="player.songs.length != 0">
           <ul class="frame" style="height:100%">
              <li v-for="(item, i) in player.songs" @click.stop="getSongUrlAct({songItem: `${item.id}`})">
                <em :style="{display: i === player.index ? 'inline-block': 'none'}" class="active"></em>
                <span class="s-name col">{{ item.name }}</span>
                <span class="ar-name col" v-if="item.ar">{{ item.ar[0].name }}</span>
                <span class="col duration">
                  {{ item.dt | timeFormat }}
                  <a href=""><i></i></a>
                </span>
                <ul class="opreation">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </li>
            </ul>
        </div>
       <div class="empty" v-else>
         <i></i>
         <p>你还没添加任何歌曲</p>
       </div>
        <div class="lyric" >
          <ul class="lyric-con" ref="lyric" v-if="player.songs.length != 0">
            <li :class="{each:true, choose: (index==lyricIndex)}" v-for="(item, key, index) in currentMUsicLyric" :key="key">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'
import { getLyric } from 'network/songSheetApi.js'
import SongLyric from 'views/song/SongLyric.vue';
import Empty from 'views/empty/Empty'
export default {
  components: { SongLyric, Empty },
  data() {
    return {
      currentMUsicLyric: null,
      isShowWindow: true,
      lyricIndex: 0
    };
  },
  watch: {
    'audioSlider.sliderVal'() {
              let i = 0
            // 循环歌词对象
            for (let key in this.currentMUsicLyric) {
            // key表示歌词对象中的时间，如果key等于歌曲进度value，改变当前歌词进度		lyricIndex
                if (+key == this.audioSlider.sliderVal) {
                    this.lyricIndex = i;
                    // 当歌词进度大于5，即播放到了第5句歌词，开始滚动
                    if (i > 3) {
                        this.$refs.lyric.scrollTop = 38 * (i - 3);
                    }
                }
                i++;
            }
      },
    'player.index': {
      handler() {
        this.getLyricFunc();
       }
    }
  },
  created() {
   this.getLyricFunc();

  },
  computed: {
    ...mapState('PlayerModule', ['player', 'audioSlider'])
  
  },
  methods: {
    ...mapMutations('PlayerModule', ['removeSongs']),
    ...mapActions('PlayerModule', ['getSongUrlAct']),

    getLyricFunc() {
      if(this.player.songs.length != 0) {
         const id = this.player.songs[this.player.index].id
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
    }
  },
};
</script>

<style lang="scss" scoped>
.g_playlist {
      position: absolute;
      top: -295px;
      left: 141px;
      width: 986px;
      height: 301px;
      color: #ccc;
      .bg-img {
        background: url('https://s2.music.126.net/style/web2/img/frame/playlist_bg.png?bfb1c397988b55559c003ce7f37d80c7') repeat;
      }
      .listhd {
        display: flex;
        align-items: center;
        height: 40px;
        color: #ccc;
        .thdl, .thdr {
          flex: 1;
        }
        .thdl {
          display: flex;
          justify-content: space-between;
          h4{
            font-size: 14px;
            margin-left: 24px;
          }
          p {
            span {
              margin:  0 10px;
            }
            .icon {
              position: relative;
              top: 3px;
              right: 5px;
              display: inline-block;
              background: url('https://s2.music.126.net/style/web2/img/frame/playlist.png?ff0332bbd1ceb587e0dce25fddca3819');
              width: 16px;
              height: 16px;
            }
            .col-all {
              background-position: -24px 0;
            }
            .delete {
              width: 13px;
              background-position: -51px 0;
            }
          }
        }
        .thdr {
          text-align: center;
          h4 {
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            padding-left: 40px;
            max-width: 413px;
          }
          span {
            position: absolute;
            top: 5px;
            right: 10px;
            display: inline-block;
            width: 30px;
            height: 30px;
            background: url('https://s2.music.126.net/style/web2/img/frame/playlist.png?ff0332bbd1ceb587e0dce25fddca3819');
            background-position: -195px 9px;
            cursor: pointer;
          }
        }
      }
      .listbd {
        display: flex;
        height: 261px;
        background-position: -1014px 0;
        .empty, .frame, .lyric {
          flex: 1;
        }
        .frame, .lyric-con{
          overflow-y: scroll;
        }
        ::-webkit-scrollbar {
          width: 6px;
          border-radius: 5px;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          background: #000;
        }
        ::-webkit-scrollbar-button {
          display: none;
        }
        ::-webkit-scrollbar-track {
          display: none;
        }
        ::-webkit-scrollbar-thumb {
          width: 4px;
          background: #868686;
          border-radius: 5px;
        }
        ul {
          li {
            position: relative;
            margin-left: 24px;
            height: 28px;
            line-height: 28px;
            &:hover {
              background-color: #000;
              color: #fff;
            }
            .col {
              display: inline-block;
              color: #ccc;
              width: 80px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              cursor: pointer;
            }
            .s-name {
              margin-left: 10px;
              width: 270px;
            }
            .ar-name {
              margin-left: 18px;
              &:hover {
                text-decoration: underline;
              }
            }
            .duration {
              i {
                position: relative;
                top: 5px;
                display: inline-block;
                background: url('https://s2.music.126.net/style/web2/img/frame/playlist.png?ff0332bbd1ceb587e0dce25fddca3819');
                background-position: -80px 0;
                width: 14px;
                height: 16px;
                margin-left: 20px;
                &:hover {
                  background-position: -80px -20px;
                }
              }
            }
            .opration {
              position: absolute;
              display: flex;
            }
          }
        }
        .opreation {
          position: absolute;
        }
        .lyric {
          .lyric-con {
            height: 100%;
            width: 99.5%;
            color: rgb(185, 185, 185);
            font-size: 5px;
            font-weight: normal;
            li {
              padding: 5px 0;
              text-align: center;
            }
            .choose {
              height: 30px;
              line-height: 30px;
              font-size: 14px;
              color: #fff;
            }
          }
        }
      }
}
.active{
  display: none;
  position: absolute;
  left: -10px;
  top: 7px;
  background: url('https://music.163.com/style/web2/img/frame/playlist.png?bcb46af427ca3816e900cc28b138dc92') -182px 0;
  width: 10px;
  height: 14px;
}
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    display: block;
    width: 36px;
    height: 29px;
    background: url('https://s2.music.126.net/style/web2/img/frame/playlist.png?bcb46af427ca3816e900cc28b138dc92') -138px 0;
  }
  p {
    padding: 0 20px;
  }
}
</style>