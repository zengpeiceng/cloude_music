<template>
  <div id="cat">
    <ul>
      <li>
        <h2>推荐</h2>
        <div class="c-t"><a ref="recommend" href="javascript:;" @click="setActive($event)">热门歌手</a></div>
      </li>
      <li v-for="(item, index) in titles">
        <h2>{{item}}</h2>
        <div class="c-t"><a ref="titles" href="javascript:;" @click="setActive($event)">{{item}}男歌手</a></div>
        <div class="c-t"><a ref="titles" href="javascript:;" @click="setActive($event)">{{item}}女歌手</a></div>
        <div class="c-t"><a ref="titles" href="javascript:;" @click="setActive($event)">{{item}}组合/乐队</a></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LeftArtistCat',

  data() {
    return {
      titles: ['华语','欧美','日本','韩国','其他'],
    };
  },
  created() {
    
    // if(this.$route.path.toString().indexOf('cat')) {
    //   const type = this.$route.query.type
    //   const area = this.$route.query.area
    // }
   
  },
  mounted() {
    this.$refs.recommend.className = 'active'
  },
  methods: {
    setActive(e) {
      // 去除没有处于active的active样式
      const doc = this.$refs.titles
      for(let i = 0; i < doc.length; i++) {
        doc[i].className = '';
      }
      this.$refs.recommend.className = ''
      // 设置Active样式
      e.target.className = 'active'
      this.toActiveRoute(e.target.innerText)
      
      this.$emit('changeTitle', e.target.innerText)

    },
    toActiveRoute(text) {
      switch(text) {
        case '热门歌手': this.$router.push(`/discover/artist/cat?type=-1`);break;
        case '华语男歌手': this.$router.push(`/discover/artist/cat?type=1&area=7`);break;
        case '华语女歌手': this.$router.push(`/discover/artist/cat?type=2&area=7`);break;
        case '华语组合/乐队': this.$router.push(`/discover/artist/cat?type=3&area=7`);break;
        case '欧美男歌手': this.$router.push(`/discover/artist/cat?type=1&area=96`);break;
        case '欧美女歌手': this.$router.push(`/discover/artist/cat?type=2&area=96`);break;
        case '欧美组合/乐队': this.$router.push(`/discover/artist/cat?type=3&area=96`);break;
        case '日本男歌手': this.$router.push(`/discover/artist/cat?type=1&area=8`);break;
        case '日本女歌手': this.$router.push(`/discover/artist/cat?type=2&area=8`);break;
        case '日本组合/乐队': this.$router.push(`/discover/artist/cat?type=3&area=8`);break;
        case '韩国男歌手': this.$router.push(`/discover/artist/cat?type=1&area=16`);break;
        case '韩国女歌手': this.$router.push(`/discover/artist/cat?type=1&area=16`);break;
        case '韩国组合/乐队': this.$router.push(`/discover/artist/cat?type=2&area=16`);break;
        case '其他男歌手': this.$router.push(`/discover/artist/cat?type=3&area=0`);break;
        case '其他女歌手': this.$router.push(`/discover/artist/cat?type=3&area=0`);break;
        case '其他组合/乐队': this.$router.push(`/discover/artist/cat?type=3&area=0`);break;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
#cat {
  ul {
    li {
      margin-top: 20px;
      border-bottom: 1px solid #dfdfdf;
      padding: 0 10px;
      .c-t {
          width: 100%;
          padding: 5px 0;
          a {
            display: block;
            line-height: 29px;
            padding-left: 30px;
            background: url('https://s2.music.126.net/style/web2/img/singer.png?dd0acd4b283d47faf8e35978ba1dacf') 0 -30px;
          }
        .active {
          background-position: 0 0;
          color: #c20c0c ;
        }
      }
    }
  }
}
</style>