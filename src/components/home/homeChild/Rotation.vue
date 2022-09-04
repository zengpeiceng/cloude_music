<template>
  <div id="banner">
    <div class="bg-blur">
    <el-carousel arrow="never" ref="carousel" >
      <div class="donwload"><img src="~assets/img/home/download.png" alt=""></div>
      <el-carousel-item 
        interval='3000'
        v-for="(item, index) in banners" :key="index">
        <div class="bImg"><img :src="item.imageUrl"></img></div>
      </el-carousel-item>
    </el-carousel>
    <div class="prev" @click.prevent="prevClick()"><i></i></div>
    <div class="next" @click.prevent="nextClick()"><i></i></div>
  </div>
  </div>
</template>

<script>
import {getBannerUrl} from 'network/home.js'
 export default {
   name: 'Rotation',
   data() {
     return {
      banners: []
     }
   },
  mounted() {
    // 请求轮播图数据
    getBannerUrl().then(res => {
      this.banners.push(...res.banners)
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {
    prevClick() {
      return this.$refs.carousel.prev();
    },
    nextClick() {
      return this.$refs.carousel.next();
    },
    change(pre, next) {
      console.log(pre);
    }
  },
  computed: {
  }
};

</script>
<style lang="scss"  scoped>
  #banner {
    position: relative;
    height: 300px;
    width: 100%;
    background: #dbacac
    
  }
  .bg-blur {
    max-width: 980px;
    margin: 0 auto;
  }
  #bg-blur ::v-deep .el-carousel {
    width: 77%;
    margin: 0 auto;
  }
  .donwload {
    position: absolute;
    height: 300px;
    right: 0;
    z-index: 8;
    background-color: #000;
  }
  .bImg {
    height: 300px;
    img {
     height: 100%;
    }
  }
  .prev, .next{
    position: absolute;
    top: 115px;
    bottom: 115px;
    margin: auto;
    height: 60px;
    width: 35px;
    text-align: center;
    line-height: 60px;
  }
  .prev {
    left: 80px;
    i {
      left: 8px;
      border-top: 3px solid #fff;
      border-left: 3px solid #fff;
      transform: rotate(-45deg);
    }
  }
  .next {
    right: 80px;
    i {
      right: 8px;
      border-top: 3px solid #fff;
      border-right: 3px solid #fff;
      transform: rotate(45deg);
    }
  }
  .prev i, .next i{
    position: relative;
    display: inline-block;
    margin-top: 18px;
    width: 24px;
    height: 24px;
  }
  .prev:hover, .next:hover {
    background-color: #333;
    opacity: 0.3;
  }
</style>