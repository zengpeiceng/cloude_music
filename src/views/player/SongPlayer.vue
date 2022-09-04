<template>
  <div id="s-player" ref="s_player"> 
    <div class="play-bar">
        <div class="opration">
           <!-- 上一首按钮 -->
          <span class="s-prev icon" @click="musicPlay('pre')"></span>
          <!-- 插放按钮 -->
          <span ref="btnPlay" :class="[ player.play ? 's-pause icon' : 's-play icon']" @click="musicPlay('play')"></span>
          <!-- 下一首按钮 -->
          <span class="s-next icon" @click="musicPlay('next')"></span>
        </div>
        <!-- 音乐封面 -->
        <router-link v-if="player.songs.length != 0" class="cover" :to="`/song?id=${player.songs[player.index].id}`">
          <img :src="player.musicImg" alt="">
        </router-link>
        <a href="javascript:;" v-else>
          <img src="https://s4.music.126.net/style/web2/img/default/default_album.jpg" class="cover" alt="">
        </a>
        <div class="play-detail">
          <div class="detail">
            <audio ref="audioBox"  @timeupdate="updateTime" @canplaythrough="updateTime"></audio>
            <span v-if="player.songs.length != 0" class="songName">{{ player.songs[player.index].name }}  
                                  {{ player.songs[player.index].ar[0].name }}</span>
            <!-- 音乐进度条 -->
            <el-slider class="slider"
                ref="s-slider"
                v-model="audioSlider.sliderVal"
                :min="0"
                :max="audioSlider.sliderMax"
                :show-tooltip="false"
                :format-tooltip="formatTooltip"
                @change="spliderSelect">
            </el-slider>
            <!-- 音乐时间 【当前|总时长】 -->
            <span class="timer">{{ player.currentTime }}/{{ player.duration }}</span>
            </div>
        </div>    
        <div class="opration">
          <div class="oper">
            <div class="rcov icon"></div>
          </div>
          <div class="volume-icon" ref="volumeIcon">
            <div :class="[player.volume > 0 ? 'image' : 'image2']" @click="isShowVolume = !isShowVolume"></div>
            <div class="barbg" ref="barbg" v-show="isShowVolume">
              <el-slider
                ref="v_slider"
                :step="0.01"  
                :max="1"
                v-model="player.volume"
                :show-tooltip="false"
                vertical
                height="100px"
                @change="adjustVolume()"
              >
            </el-slider> 
            </div>
          </div>
          <div class="s-list-icon" @click="isShowPlayList = !isShowPlayList">
              <span><i>{{player.songs.length}}</i></span>
          </div>
        </div>
    </div>
    <div ref="g_playlist" v-if="isShowPlayList">
      <small-window/>
    </div>
  </div>
</template>

<script>
import SmallWindow from './childCpn/SmallWindow.vue'
import {mapState, mapMutations, mapActions} from 'vuex'
import  closeTargetEle  from 'utils/closeTargetEle.js'
 export default {
   name: 'SongPlayer',
   components: { SmallWindow },
   data() {
     return {
       isShowPlayList: false,
       isShowVolume:false,
       currSong: {
         src: '',
         duration: '',
         musicImg: '',
         musicName: '',
       }
     }
   },
   watch: {
     'player.index': {
       handler() {
         this.updateTime();
       }
     },
     'player.currentTime': {
       handler() {
        //  播放初始状态 currentTime 可能会等于 this.player.duration
        if(this.player.duration != '00:00' && this.player.currentTime === this.player.duration) {
          this.musicPlay('next');
        }
       }
     }
   },
   created() {
     this.$nextTick(() => {
        this.init({audioBox: this.$refs.audioBox})
        this.getSongUrlAct({status: 'initial'});
        // updateTime 更新总时长，当前时长，在播放时长变化会自己调用, 初始化时要自己调用
        this.updateTime();
     });
    //  展示和关闭播放列表
     document.addEventListener('click', this.NonTargetIsClicked)
   },
   mounted() {
   },
   computed: {
     ...mapState('PlayerModule', ['player', 'audioSlider'])
   },
   methods: {
     ...mapMutations('PlayerModule', [
       'init',
       'updateTime',
       'formatTooltip',
       'spliderSelect',
       'musicPlay',
       'displayVolume',
       'adjustVolume',
     ]),
     ...mapActions('PlayerModule', ['getSongUrlAct']),
     NonTargetIsClicked(e) {
       if(this.isShowPlayList) {
         const currDoc = e.target
         const containerDoc = this.$refs.g_playlist;
         const trrigerDoc = this.$refs.s_player
         const flag = closeTargetEle(currDoc, containerDoc, trrigerDoc);
         if(!flag) {
           this.isShowPlayList = flag
         }
       }
       if(this.isShowVolume) {
         const currDoc = e.target
         const containerDoc = this.$refs.s_player
         const trrigerDoc = this.$refs.volumeIcon
         const flag = closeTargetEle(currDoc, containerDoc, trrigerDoc)
         
         if(!flag) {
           this.isShowVolume = flag
         }
       }
     }
   },
   beforeDestroy() {
    document.removeEventListener('click', this.NonTargetIsClicked)
  },
};

</script>
<style lang="scss" scoped>
  #s-player {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background: url('~assets/img/audio/playbar.png');
    background-position: 0 0;
    margin: 0 auto;
    z-index: 999;
    .icon {
      background: url('~assets/img/audio/playbar.png');
    }
     .play-bar{
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      bottom: 50%;
      margin: auto;
      height: 50%;
      display: flex;
      justify-content: center;
      width: 980px;
      color: rgb(232, 232, 232);
      ::v-deep .el-slider__button{
        background: url('~assets/img/home/iconall.png');
        background-position: 0 -250px;
        border: none;
        width: 22px;
        height: 24px;
      }
      .opration {
        display: flex;
        span {
          display: inline-block;
        }
        .s-play, .s-pause{
          width: 36px;
          height: 36px;
          margin: -3px 5px 0 5px;
        }
        .s-play {
          background-position: 0 -204px;
        }
        .s-pause {
          background-position: 0 -165px;
        }
        .s-play:hover {
          background-position: -40px -204px;
        }
        .s-pause:hover {
          background-position: -40px -165px;
        }
        .s-prev, .s-next{
          width: 28px;
          height: 28px;
          background-position: 0 -130px;
        }
        .s-prev:hover {
          background-position: -30px -130px;
        }
        .s-next {
          background-position: -80px -130px;
        }
        .s-next:hover {
          background-position: -110px -130px;
        }
        
        .rcov {
          width: 25px;
          height: 25px;
          background-position: -88px -163px;
          margin: 0 10px;
        }
          /* 音量>0时显示的图标样式 */
        .volume-icon {
          position: relative;
        }
        .volume-icon .image{
          right: 0;
          display: inline-block;
          width: 25px;
          height: 25px;
          
          background: url('~assets/img/audio/playbar.png');

          background-position: -2px -248px;
        }
        /* 音量<0时显示的图标样式 */
        .image2{
          right: 0;
          display: inline-block;
          width: 25px;
          height: 25px;
          
          background: url('~assets/img/audio/playbar.png');

          background-position: -104px -69px;
        }
        .barbg {
          position: absolute;
          top: -125px;
          right: -5px;
          background: #000;
          width: 32px;
          height: 120px;
          z-index: 999;
        }
        .barbg_focus {
          display: block;
        }
        .barbg:focus-within {
          display: none;
        }
        .barbg ::v-deep .el-slider__bar {
          background-color: #C20C0C;
        }
        .barbg ::v-deep .is-vertical {
          margin-top: 15px;
        }
        .s-list-icon {
          width: 59px;
          height: 36px;
          span {
            text-align: right;
            display: inline-block;
            background: url('https://s2.music.126.net/style/web2/img/frame/playbar.png?c15491f1bc699657def68627bd1e2831');
            width: 60px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            cursor: pointer;
            background-position: -42px -68px;
            color: #666;
            i {
              margin-left: 15px;
            }
          }
        }
        ::v-deep .el-slider__runway {
          width: 4px;
        }
        ::v-deep .el-slider__bar {
          width: 4px;
        }
        ::v-deep .el-slider__button{
          background: url('~assets/img/home/iconall.png');
          background-position: -40px -250px;
          border: none;
          width: 18px;
          height: 20px;
        }
        ::v-deep .el-slider__button-wrapper {
          width: 32px;
          height: 32px;
        }
      }
      .cover {
        height: 34px;
        width: 35px;
        background-position: 0 -80px;
        margin: 0 15px 0 20px;
        img {
          width: 34px;
          height: 34px;
        }
      }
      .play-detail {
        position: relative;
        width: 581px;
        .detail {
          position: absolute;
          height: 50%;
          top: 50%;
          bottom: 50%;
          margin: auto;
          ::v-deep .slider {
            display: inline-block;
            width: 466px;
          }
          ::v-deep .el-slider__bar {
            background: url('~assets/img/audio/statbar.png');
            background-position: 0 -66px;
          }
        }

        .songName {
          position: absolute;
          top: -8px;
          left: 0;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          max-width: 300px;
        }
        .timer {
          position: relative;
          left: 10px;
          bottom: 15px;
          
          color: rgb(121, 121, 121)
        }
      }
    }
    
    
  }
</style>