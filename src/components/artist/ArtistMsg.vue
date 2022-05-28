<template>
  <div id="artist">
    <div class="center">
      <h2>{{artist.name}}</h2>
      <div class="cover">
        <img :src="artist.picUrl" alt="">
      </div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="热门作品" name="first">
          <template slot-scope="scope">
            <song-list-con :songList="hotSongs"/>
          </template>
        </el-tab-pane>
        <el-tab-pane label="所有专辑" name="second">
          <template slot-scope="scope">
            <router-view/>
          </template>
        </el-tab-pane>
        <el-tab-pane label="相关MV" name="third">
          <router-view/>
        </el-tab-pane>
        <el-tab-pane label="艺人介绍" name="fourth">
          <template slot-scope="scope">
            <router-view/>
          </template>
        </el-tab-pane>
    </el-tabs>
    </div>
    <div class="sc-r">
      <song-addition>
        <div slot="sc-r-nav" class="sc-r-nav" v-if="simiArtist.length != 0">相似歌手</div>
        <div slot="sc-r-nav" class="sc-r-nav" v-else>热门歌手</div>
        <template slot="sc-r-con">
          <ul class="similar">
            <li v-for="(item, index) in getArtists">
              <router-link :to="`/artist?id=${item.id}`">
                <img :src="item.img1v1Url" alt="">
                <p style="margin-top: 5px;width:40px;text-overflow:ellipsis;white-space: nowrap;overflow:hidden;">{{item.name}}</p>
              </router-link>
            </li>
          </ul>
        </template>
      </song-addition>
    </div>
  </div>
</template>

<script>
import SongListCon from 'views/song/SongListCon.vue';
import AlbumList from 'components/search/childCpn/AlbumList'
import SongAddition from 'views/song/SongAddition.vue';
import { getArtistSongs, getArtistSimi, getArtistHot} from 'network/artist.js'



export default {
  name: 'ArtistMsg',
  components: {SongListCon, AlbumList, SongAddition},
  data() {
    return {
      aid: '',
      activeName: 'first',
      artist: {},
      hotSongs: [],
      hotAlbums: [],
      introduction: [],
      briefDesc: '', 
      simiArtist: [], // 相似歌手 
      hostArtist: []  // 热门歌手 
    };
  },
  created() {
    const aid = this.$route.query.id
    this.getArtistSongsFunc(aid);
    this.getArtistSimiFunc(aid);
    switch(this.$route.path) {
        case '/artist': this.activeName = 'first';break;
        case '/artist/album': this.activeName = 'second';break;
        case '/artist/mv': this.activeName = 'third';break;
        case '/artist/desc': this.activeName = 'fourth';break;
    }
  },
  watch: {
    '$route.query.id': function() {
      this.getArtistSimiFunc(this.$route.query.id);
      this.getArtistSongsFunc(this.$route.query.id)
    },
    '$route.path': function(to) {
      switch(to) {
        case '/artist': this.activeName = 'first';break;
        case '/artist/album': this.activeName = 'second';break;
        case '/artist/mv': this.activeName = 'third';break;
        case '/artist/desc': this.activeName = 'fourth';break;
      }
    }
  },
  mounted() {
    
  },
  methods: {
    //--------------- 点击事件----------------------
     handleClick(tab) {
       const aid = this.$route.query.id
       switch(tab.name) {
         case 'first': this.$router.push(`/artist?id=${aid}`);break;
         case 'second': this.$router.push(`/artist/album?id=${aid}`);break;
         case 'third': this.$router.push(`/artist/mv?id=${aid}`);break;
         case 'fourth': this.$router.push(`/artist/desc?id=${aid}`);break;
       }
    },
     //--------------- 请求事件----------------------
    //  获取歌手描述
    getArtistSongsFunc(aid) {
      getArtistSongs(aid).then(res => {
        this.artist = res.artist
        this.hotSongs = res.hotSongs
        window.scrollTo(0, 0)
      })
    },
    // 获取相似歌手 
    getArtistSimiFunc(aid) {
      getArtistSimi(aid).then(res => {
        this.simiArtist = res.artists
        if(res.artists.length ===0) {
          // 没有相似歌手就请求热门歌手
          getArtistHot().then(res => {
            this.hostArtist = res.artists
          })
        }
      })
    }
  },
  computed: {
    // 没有相似歌手就展示热门歌手 
    getArtists() {
      return this.simiArtist.length != 0 ? this.simiArtist.slice(0, 8) : this.hostArtist;
    }
  }
};
</script>

<style lang="scss" scoped>
#artist {
  display: flex;
  width: 980px;
  margin: 0 auto;
  border-left: 1px solid #dfdfdf;
  border-right: 1px solid #dfdfdf;
  .center {
    width: 640px;
    padding: 20px 30px 40px 39px;
    h2 {
      font-size: 24px;
      font-weight: normal;
      margin-bottom: 10px;
    }
    .cover {
      width: 640px;
      height: 300px;
      img {
        width: 100%;
        height: 100%;
        // object-fit 一般用于 img 和 video 标签，一般可以对这些元素进行保留原始比例的剪切、缩放或者直接进行拉伸等。
        object-fit: cover;
        // object-position 属性一般与 object-fit一起使用，用来设置元素的位置。
        object-position: center;
      }
    }
    /deep/ [data-v-809d416a] li {
      padding-right: 18px;
      div {
        img:nth-child(1) {
          width: 120px;
          height: 120px;
        }
        img:nth-child(2) {
          height: 120px;
          width: 20px;
        }
      }
      &:last-child {
        padding-right: 0;
      }
    }
  }
  .sc-r {
      .similar {
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
        margin-bottom: 40px;
        li {
          padding-right: 10px;
          padding-bottom: 10px;
          img {
            width: 40px;
            height: 40px;
            &:last-child {
              padding-right: 0;
            }
          }
        }
      }
  }
}
</style>