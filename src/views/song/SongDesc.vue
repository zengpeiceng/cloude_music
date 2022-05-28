<template>
  <div class="t-desc" v-if="song_details != null">
    <dl>
      <dt>
        <div class="cover">
        <img :src="song_details.coverImgUrl || song_details.blurPicUrl" alt="">
      </div>
      </dt>
      <dd>
        <div class="detials">
        <div class="d-title">
          <slot name="sign"></slot>
          <span class="title">{{song_details.name}}</span>
        </div>
        <slot name="TimeMsg" :SongMsg="song_details"></slot>
        <slot name="creatorMsg" :creatorMsg="song_details" class="d-message"></slot>
        <div class="d-operation">
          <div class="d-button"  @click="getSongListFunc()">
            <a href="javascript:;" class="d-play icon">
              <i><img src="~assets/img/mymusic/playbtn.png"></img>播放</i>
            </a>
          </div>
          <div class="d-button" @click="collectSheetFunction(song_details.id)">
            <a href="javascript:;" class="d-collect icon">
              <i><img src="~assets/img/mymusic/collect-icon.png"></img>
                  <span v-if="song_details.subscribedCount"> ({{song_details.subscribedCount | dataFormat}})</span>
              </i>
            </a>
          </div>
          <div class="d-button">
            <a href="javascript:;" class="d-share icon">
              <i><img src="~assets/img/mymusic/share-icon.png"></img>分享</i>
            </a>
          </div>
          <div class="d-button">
            <a href="javascript:;" class="d-download icon">
              <i><img src="~assets/img/mymusic/download-icon.png"></img>下载</i>
            </a>
          </div>
          <div class="d-button">
            <a href="javascript:;" class="d-comment icon">
            <i><img src="~assets/img/mymusic/comment-icon.png"></img>评论</i>
            </a>
          </div>
        </div>
        </div>
      </dd>
    </dl>
    <slot name="introduce"></slot>
  </div>
</template>

<script>

import { mapState, mapMutations, mapActions } from 'vuex'
 export default {
   name: 'SongDesc',
   props: {
     song_details: {
       type: Object,
       default() {
         return {
           coverImgUrl: '~assets/img/home/biaoshengbang.jpg',
           name: '未知歌单',
           subscribedCount: '无相关信息',
           trackUpdateTime: 0,
           updateFrequency: '无相关信息',
           creator: {nickname: '',avatarUrl: '~assets/img/home/biaoshengbang.jpg'}
         }
       }
     }
   },
   computed: {
     ...mapState('UserModule', ['userState'])
   },
   methods: {
     ...mapActions('PlayerModule', ['getSongList']),
     ...mapMutations('UserModule', ['showDialog']),
     ...mapActions('MySheets', ['collectSheetFunc']),
     getSongListFunc() {
       const songId = this.song_details.id
       if(this.$route.path.indexOf('playlist') != -1) {
         this.getSongList({songId, type: 'playlist'})
       }else if(this.$route.path.indexOf('album') != -1) {
         this.getSongList({songId, type: 'album'})
       }
     },
    collectSheetFunction(id) {
      if(this.userState.isLogin) {
        this.collectSheetFunc(id);
      }else {
        this.showDialog();
      }
    }
   }
};

</script>
<style lang="scss" scoped>
.t-desc {
    margin-bottom: 40px;
    dl {
      display: flex;
      padding-right: 20px;
      dt {
        .cover {
          width: 150px;
          height: 150px;
          padding: 5px;
          margin-right: 20px;
          border: 1px solid #c5c4c4;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      dd {
        flex: 1;
        .detials {
          flex: 1;
          height: 150px;
          .d-title {
            flex: 1;
             .sign {
              position: relative;
              top: 5px;
              margin-right: 10px;
              display: inline-block;
              width: 54px;
              height: 24px;
              background: url('~assets/img/mymusic/icon.png') no-repeat 0 -243px;
            }
            .title {
              font-size: 18px;
            }
          }
           .d-message {
            padding: 20px 0;
            img {
              width: 35px;
              height: 35px;
            }
            a {
              color: #0c73c2;
              padding-right: 10px;
            }
            span {
              margin-left: 10px;
              color: #999;
            }

          }
          .d-operation {
            display: flex;
            justify-content: space-between;
            .d-button {
              border: 1px solid #d6d6d6;
              background-color: rgb(241, 240, 240);
              border-radius: 5px;
              height: 31px;
              line-height: 31px;
              .d-play {
                display: inline-block;
                height: 31px;
                }
                &:hover {
                  background-color: rgb(218, 216, 216);
                } 
              } 
              .icon {
                i {
                  text-align: center;
                  color: #333;
                  padding: 0 5px;
                  img {
                    display: inline-block;
                    padding: 0 5px;
                    width: 18px;
                    height: 18px;
                  }
                }
            }
          }
        }
      }
    }
  }
</style>