<template>
  <div>
    <!-- 歌单 -->
    <div class="r-nav">
      <slot name="songSheetNavBar">热门推荐</slot>
      <slot name="categories"></slot>
    </div>
    <div class="recommends">
      <ul class="r-list">
        <li v-for="item in songList" @click="goSheetDetails(item)">
          <img class="song-cover" :src="getSongCover(item)" alt="" >
            <div class="s-title">
              <p><a href="#">{{item.name}}</a></p>
              <div class="s-listener">
                <span class="icon-headset"></span>
                <span class="desc">{{item.playCount | dataFormat}}</span>
                <span class="btnPlay" @click.stop="getSongList({songId:item.id, type: 'playlist'})"></span>
              </div>
            </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SongSheet',
  props: {
    songList : {
      type: Array
    }
  },
  data() {
    return {
      songSheetDetails: {}
    };
  },
  methods: {
     ...mapActions('PlayerModule', ['getSongList']),
    goSheetDetails(item) {
      this.$router.push({
        path: '/playlist',
        query: {
          id: item.id
        }
      })
    }
  },
  computed: {
    getSongCover(item) {
      return function(item) {
        if(item.picUrl) {
        return item.picUrl
        }else if(item.coverImgUrl) {
          return item.coverImgUrl
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .c-wrap {
    width: 900px;
    margin: 0 auto;
    border: 1px solid #ccc8c8;
    background-color: #fff;
  }
  .r-nav::before {
    content: '';
    position: relative;
    top: 6px;
    
    display: inline-block;
    width: 34px;
    height: 30px;
    
    background: url('~assets/img/home/index.png');
    background-position: -225px -156px;
    background-color: #fff;
  }
  .r-nav {
    display: inline-block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    color: #333;
    border-bottom: 2px solid #C10D0C;
    margin-bottom: 20px;
  }
  .r-list {
    display: flex;
    justify-content: left;
    width: 900px;
    margin: 0 auto;
    flex-flow: wrap;
    li {
      
      width: 140px;
      padding-right: 42px;
      padding-bottom: 30px;
      &:nth-child(5n) {
        padding-right: 0;
      }
    }
    img {
      width: 140px;
      height: 140px;
      border: 1px solid #d6d5d5;
      cursor: pointer;
    }
  }
  .s-title {
    position: relative;
    width: 100%;
    p {
      width: 100%;  
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    padding-top: 10px;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .s-listener {
    position: absolute;
    top: -25px;
    width: 100%;
    height: 25px;
    line-height: 25px;
    background: url('https://s2.music.126.net/style/web2/img/coverall.png?c3f6557b90288c705d1fb2ea6549f303') 0 -537px;
    color: #ccc;
    font-size: 12px;
  }
  .icon-headset {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url('~assets/img/home/iconall.png');
    background-position: 0 -24px;
    margin: 7px;
  }.desc{
    position: relative;
    bottom: 12px;
    right: 2px;
  }
  /* 播放按钮 */
  .btnPlay {
    position: absolute;
    display: inline-block;
    width: 16px;
    height: 17px;
    background: url('~assets/img/home/iconall.png');
    background-position: 0 0;
    right: 5px;
    top: 4px;
  }
</style>