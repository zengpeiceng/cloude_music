<template>
  <div id="videoList">
    <div v-if="videos.length != 0">
      <ul>
        <li v-for="(item, index) in videos" @click="goVideoPlay(item)">
          <div>
            <p class="playTime">
              <span>{{ item.playTime}}</span>
            </p>
            <img :src="item.coverUrl" alt="">
            <p class="duration"><span>{{ item.durationms | timeFormat }}</span></p>
          </div>
          <p class="title">{{ item.title }}</p>
        </li>
      </ul>
    </div>
    <h2 v-else>
      <empty>
        <p slot="content">很抱歉，未能找到相关搜索结果！</p>
      </empty>
      </h2>
  </div>
</template>

<script>
import Empty from 'views/empty/Empty.vue';
export default {
  components: { Empty },
  name: 'VideoList',
  props: {
    videos: {
      type: Array
    }
  },
  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    goVideoPlay(item) {
      //vid 有两种形式，一种是：B57DB94643C67E424BF22D6A7009EE65 调用 video, 一种是：14479273 调用MV
      let patt = /[a-z|A-Z]/  
      if(patt.test(item.vid)) {  
        this.$router.push({
          path: '/video',
          query: {
            id: item.vid
          }
        })
      }else {
        this.$router.push({
          path: '/MV',
          query: {
            id: item.vid
          }
        })
      }
    }
  },
};
</script>

<style lang="scss" scoped>
#videoList {
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    li {
      position: relative;
      padding: 0 25px 30px 0;
      cursor: pointer;
      .playTime {
        position: absolute;
        width: 90px;
        height: 20px;
        right: 25px;
        background-image: url('https://music.163.com/style/web2/img/mask.png?1259f7f20cfa3ed400177f15379c9802');
        text-align: right;
        color: #fff;
        &::before {
          content: '';
          display: inline-block;
          margin-right: 5px;
          background: url('https://s2.music.126.net/style/web2/img/icon2.png?f85d623c84ed737efac8e1693b1f7519') no-repeat;
          background-position: -60px -310px;
          width: 15px;
          height: 10px;
        }
      }
      img {
        width: 150px;
        height: 100px;
      }
      .duration {
        position: absolute;
        bottom: 60px;
        width: 150px;
        height: 20px;
        background: url('https://s2.music.126.net/style/web2/img/mask.png?1259f7f20cfa3ed400177f15379c9802') no-repeat;
        background-position: 0 -25px;
        color: #fff;
        span {
          padding-left: 5px;
          text-shadow: -1.5px 1px #474747;
        }
      }
      .title {
        margin-top: 5px;
        &::before {
          content: '';
          display: inline-block;
          position: relative;
          top: 3px;
          margin-right: 5px;
          background: url('https://s2.music.126.net/style/web2/img/icon2.png?f85d623c84ed737efac8e1693b1f7519') no-repeat;
          background-position: -270px -480px;
          width: 26px;
          height: 16px;
        }
        width: 120px;
        height: 25px;
        line-height: 25px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>