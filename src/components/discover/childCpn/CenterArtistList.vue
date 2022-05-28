<template>
  <div id="c-a-list">
    <h2>{{title}}</h2>
    <div class="words">
      <a href="javascript:;" 
        @click="changCurrWord(index)"
        :class="{active: index === currWord}" 
        v-for="(item, index) in words">{{item}}</a>
    </div>
    <!-- 前十个歌手 -->
    <div class="top10">
      <singer-list :artists="artists.slice(0, 10)"/>
    </div>
    <div class="more">
      <ul>
        <li v-for="(item, index) in artists.slice(11, 90)">
          <router-link :to="`/artist?id=${item.id}`">{{item.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getArtists, artistTop } from 'network/discover'
import SingerList from '../../search/childCpn/SingerList.vue';

export default {
  components: { SingerList },
  name: 'CenterArtistList',
  props: {
    title: '',
  },
  data() {
    return {
      artists: [],   
      words: ['热门', 'A', 'B', 'C', 'D', 'E', 'F','G', 'H', 
        'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
        'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      currWord: 0
    };
  },
  watch: {
    '$route.query': function() {
      const type = this.$route.query.type;
      const area = this.$route.query.area;
      const initial = this.$route.query.initial
      this.getArtistsFunc(type, area, initial)
    }
  },
  created() {
    this.$router.push('/discover/artist/cat?type=-1')
    this.getArtistsTopFunc(90, 0);
  },
  methods: {
    // 热门歌手 
    getArtistsTopFunc(limit, offset) {
      artistTop(limit, offset).then(res => {
        this.artists = res.artists
      })
    },
    getArtistsFunc(type, area, initial) {
      getArtists(type, area, initial).then(res => {
        this.artists = res.artists;
      })
    },
    // 设置字母curr样式及数据请求
    changCurrWord(index) {
      // 设置样式
      this.currWord = index;
      // 数据请求
      const type = this.$route.query.type;
      const area = this.$route.query.area;
      const word = this.words[index]
      if(index === 0) {
        this.$router.push(`/discover/artist/cat/?type=${type}&area=${area}&initial=-1`)
      }else {
        this.$router.push(`/discover/artist/cat/?type=${type}&area=${area}&initial=${word}`)
      }
    },
    
  },
};
</script>

<style lang="scss" scoped>
#c-a-list {
  width: 100%;
  h2 {
    padding-bottom: 10px;
    border-bottom: 2px solid #c20c0c;
  }
  .words {
    margin-top: 20px;
    a {
      padding: 5px 8px;
      text-align: center;
      font-size: 14px;
    }
    .active {
      color: #fff;
      background-color: #c20c0c;
      border-radius: 2px;
    }
  }
  .top10 {
    margin: 20px 0;
    /deep/ #singerMsg {
      padding-right: 12px;
      &:nth-child(5n) {
        padding-right: 0;
      }
    }
    border-bottom: 1px dotted #ccc;
  }
  .more {
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 140px;
        padding: 5px 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:hover {
          text-decoration: underline;
        }
        a::after {
          position: relative;
          top: 5px;
          left: 5px;
          display: inline-block;
          content: '';
          width: 18px;
          height: 17px;
          background: url('https://s2.music.126.net/style/web2/img/icon.png?68f683ea74b61d088af88c3a9aa4411b') 0 -740px;
          
        }
      }
    }
  }
}
</style>