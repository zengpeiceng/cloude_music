<template>
  <div id="singerMsg">
    <div>
      <img :src="artistMsg.picUrl" alt="">
      <p>
        <a href="" >{{artistMsg.name}}</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingerCover',
  props: {
    artistMsg: {
      type: Object,
      default() {
        return {
          id: '0',
          name: '未知歌手',
          imglvlUrl: 'https://p1.music.126.net/wVUAzd4tczNdpXeKc_I9hw==/109951166603810363.jpg'
        }
      }
    }
  },
  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
 #singerMsg {
   padding: 0 20px 24px 0;
   div {
     img {
       width: 130px;
       height: 130px;
   }
   p {
     font-size: 12px;
     margin-top: 5px;
     width: 130px;
     display: flex;
     justify-content: space-between;
     align-items: center;
     a {
        text-overflow: ellipsis;
        white-space: nowrap; 
        overflow: hidden;
        &:hover {
         text-decoration: underline;

        }
     }
     &::after {
       content: '';
       display: inline-block;
       width: 17px;
       height: 17px;
       background: url('~assets/img/user/icon.png') no-repeat;
       background-position: 0 -740px;
     }
   }
   }
 }
</style>