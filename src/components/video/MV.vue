<template>
  <div id="MV">
     <div class="center">
      <div style="margin-bottom: 10px;line-height: 30px">
        <h2>{{ details.name }}</h2>
        <span>
          <a style="color: #0c73c2"> {{ details.artistName}}
          </a>
        </span>
      </div>
      <div class="v-content">
        <video 
          controls 
          width="640"
          height="360"
          :src="url">
        </video>
        <ul>
          <li><a href=""><i class="icon"></i><span>({{likedCount}})</span></a></li>
          <li><a href=""><i class="icon subscribeCount"></i><span>({{details.subCount}})</span></a></li>
          <li><a href=""><i class="icon shareCount"></i><span>({{shareCount}})</span></a></li>
          <li><i class="icon"></i><span>未经作者授权，禁止转载</span></li>
        </ul>
        <song-comment></song-comment>
      </div>
    </div>
    <div class="sc-r">
        <div class="sc-r-nav">
          <p class="title">视频简介</p>
          <div class="bf">
            <p>发布时间：{{details.publishTime | dateFormat}}</p>
            <p>插放次数：{{ details.playCount}}</p>
            <p>{{details.desc}}</p>
        </div>
        </div>
        
        <div class="sc-r-nav">
          <p class="title">相关推荐</p>
          <ul class="similar">
            <li v-for="(item, index) in related">
              <div class="cover">
                <router-link :to="`/MV?id=${item.vid}`"><img :src="item.coverUrl" alt=""></router-link>
                <i>
                  <span>{{details.playCount}}</span>
                </i>
              </div>
              <div class="msg">
                <router-link :to="`/video?id=${item.vid}`"><p>{{item.title}}</p></router-link>
                <p>{{item.durationms | timeFormat}}</p>
                <router-link :to="`/user/home?uid=${item.creator[0].userId}`"><p style="color: #999">by {{item.creator[0].userName}}</p></router-link>
              </div>
            </li>
          </ul>
        </div>
        
        <div class="sc-r-nav">
          <p class="title">网易云音乐多端下载</p>
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
  </div>
</template>

<script>
import SongComment from 'views/song/SongComment'
  import { 
    getRealtedVideo, getMVUrl, getMVDetail, getMVOtherInfo
  } from 'network/video.js'
export default {
  name: 'MV',
  components: {SongComment},
  data() {
    return {
      url: '', //视频地址,
      likedCount: 0, // 点赞数，
      shareCount: 0, // 分享数
      commentCount: 0, // 评论数,
      details: {},
      related:  []
    };
  },
  watch: {
    '$route.query': function(to) {
      let patt = /[a-z|A-Z]/  
      if(patt.test(to.id)) {  
        this.$router.push({
          path: '/video',
          query: {
            id: to.id
          }
        })
      }else {
        this.getMVMsg(to.id)
      }
      
    }
  },
  mounted() {
    
  },
    created() {
    const vid = this.$route.query.id
    this.getMVMsg(vid);
  },
  methods: {
    getMVMsg(vid) {
      getMVUrl(vid).then(res => {
        this.url = res.data.url
      })
      getMVOtherInfo(vid).then(res => {
        this.commentCount = res.commentCount;
        this.likedCount = res.likedCount;
        this.shareCount = res.shareCount
      })
      getMVDetail(vid).then(res => {
        this.details = res.data
      })
      getRealtedVideo(vid).then(res => {
        this.related = res.data
      })
    }
  },
};
</script>

<style lang="scss" scoped>
#MV {
  display: flex;
  width: 980px;
  margin: 0 auto;
  border-left: 1px solid #dfdfdf;
  border-right: 1px solid #dfdfdf;
  .center {
    padding: 30px 30px 40px 39px;
    width: 640px;
    h2 {
      float: left;
      font-size: 24px;
      font-weight: normal;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      max-width: 80%;
      margin-right: 20px;
    }
    ul {
      position: relative;
      display: flex;
      line-height: 31px;
      height: 31px;
      margin: 20px 0 ;
      li {
        &:nth-child(-n+3) {
        width: 60px;
        border-radius: 5px;
        border: 1px solid #dfdfdf;
        margin-right: 10px;
        a {
          display: block;
          width: 100%;
          height: 100%;
          .icon {
            position: relative;
            top: 3px;
            left: 7px;
            display: inline-block;
            background: url('~assets/img/mymusic/fabulous.png');
            background-size: contain;
            width: 15px;
            height: 15px;
          }
          .subscribeCount {
            background: url('~assets/img/mymusic/collect-icon.png');
            background-size: contain;
          }
          .shareCount {
            background: url('~assets/img/mymusic/share-icon.png');
            background-size: contain;
          }
          span {
            padding-left: 15px;
          }
        }
        }
        &:last-child {
          position: absolute;
          right: 0;
          // right: 40px;
          i {
            position: relative;
            top: 3px;
            right: 7px;
            display: inline-block;
            width: 15px;
            height: 15px;
            background: url('~assets/img/mymusic/alert.png');
            background-size: contain;
          }
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
      margin-bottom: 20px;
      .title {
        font-weight: bold;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgb(204, 204, 204);
      }
      .bf {
        p {
          color: #999;
          &:nth-child(3) {
            margin-top: 10px;
          }
        }
      }
    }
    .similar {
      li {
        margin-bottom: 10px;
        .cover {
          float: left;
          position: relative;
          margin-right: 10px;
          img {
            width: 96px;
            height: 54px;
          }
          i {
            position: absolute;
            right: 0;
            color: #fff;
            text-align: right;
            display: inline-block;
            width: 85px;
            height: 20px;
            background: url('https://s2.music.126.net/style/web2/img/mask.png?db582d8c51453ed34967087774752942');
            &::before {
              content: '';
              display: inline-block;
              width: 15px;
              height: 10px;
              background: url('https://s2.music.126.net/style/web2/img/icon2.png?07f8b15ba6f1f17e6c452e059d55c775');
              background-position: -60px -310px;
              margin-right: 3px;
              margin-top: 3px;
            }
          }
        }
        .msg {
            p {
              overflow: hidden;
              text-overflow: ellipsis;
              min-width: 0;
              white-space: nowrap;
              &:nth-child(1):hover, &:nth-child(3):hover {
                text-decoration: underline;
              }
              &:nth-child(2){
                color: #999;
              }
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