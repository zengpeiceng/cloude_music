<template>
    <div id="g_nav2">
      <div class="wrap_gnav2">
        <ul class="nav2_titles">
          <li v-for="(item, index) in g_nav2">
            <a href="#" @click="changeNav2Active(index)">
              <em :class="{nav2Active: currNav2 === index}">{{item}}</em>
            </a>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
 export default {
   name: 'Nav2TabBar',
   data() {
     return {
       //  顶部下面的标签栏标题
      g_nav2: [
        '推荐','排行榜','歌单','歌手'
      ],
      // 控制顶部下面的标签栏的当前样式变量
      currNav2: 0
     }
   },
   watch: {
     '$route.path': function() {
        const path = this.$route.path.toString()
        if(path.indexOf('playlist') != -1) {
          this.currNav2 = 2
        }else if(path.indexOf('toplist') != -1) {
          this.currNav2 = 1
        }else if(path.indexOf('artist') != -1) {
          this.currNav2 = 3
        }else {
          this.currNav2 = 0
        }
     }
   },
   created() {
     
     const path = this.$route.path.toString()
     if(path.indexOf('playlist') != -1) {
       this.currNav2 = 2
     }else if(path.indexOf('toplist') != -1) {
       this.currNav2 = 1
     }else if(path.indexOf('artist') != -1) {
       this.currNav2 = 3
     }
   },
   methods: {
     changeNav2Active(index) {
       if(index != this.currNav2) {
          this.currNav2 = index
          switch(index) {
            case 0: this.$router.push('/');break;
            case 1: this.$router.push('/discover/toplist');break;
            case 2: this.$router.push('/discover/playlist');break;
            case 3: this.$router.push('/discover/artist/cat?type=-1');break;
          }
       }
     },
   },
};

</script>
<style  scoped>
  /* 顶部下面的标签栏 */
  
  #g_nav2 {
    margin: 0 auto;

    height: 35px;
    
    background-color: #c20c0c;
    text-align: center;
    line-height: 35px;
    
  }
  #g_nav2 .wrap_gnav2 {
    margin: 0 auto;
    width: 650px;

  }
  .nav2_titles {
    display: flex;
    width: 504px;
  }
  .nav2_titles li {
    flex: 1;
  }
  .nav2_titles li em {
    display: inline-block;
    height: 20px;
    margin-top: 7px;
    padding: 0 10px;
    line-height: 20px;
    color: #fff;
  }
  .nav2Active {
    background-color: #9b0909;
    border-radius: 20px;
  }
  .nav2_titles li:hover em {
    background-color: #9b0909;
    border-radius: 20px;
  }
  
</style>