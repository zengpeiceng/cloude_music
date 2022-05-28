<template>
  <div id="s-suggestion" v-show="showRecommend" >
    <p @click="$router.push(`/search?keywords=${s_content}&type=1002`)">搜索“{{s_content}}”相关用户></p>
    <div class="s-c" v-if="showRecommend">
      <dl v-for="(titles, index) in suggestionMsg.order">
        <dt><span>{{getTitle(titles)}}</span></dt>
        <dd>
          <div v-for="(item, i) in suggestionMsg[titles]">
            <span @click="changeRoute(item, index)">{{item.name}}</span>
          </div>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import debounce from 'utils/debounce.js'

import { getSearchSug } from 'network/search.js'

export default {
  name: 'Searchsuggestion',
  props: {
    s_content: ''
  },
  data() {
    return {
      suggestionMsg: {}
    };
  },
  watch: {
    s_content: function() {
      if(this.s_content) {
        this.getDebounceSug()
      }else {
        this.suggestionMsg = {}
      }
    }
  },
  created() {
    this.getDebounceSug = debounce(this.getRecommendMsg)
  },
  mounted() {
     document.addEventListener('click', this.NonTargetIsClicked)
  },
  computed: {
    getTitle(title) {
      return function(title) {
        switch(title) {
          case 'songs': return '单曲';
          case 'artists': return '歌手';
          case 'albums': return '专辑';
          case 'playlists': return '歌单';
        }
      }
    },
    showRecommend() {
      if( JSON.stringify(this.suggestionMsg) != '{}' && this.suggestionMsg != undefined ) {
        return true
      }else {
        return false
      }
    },
  },
  methods: {
    // -------------- 请求事件 ----------------
    getRecommendMsg() {
      getSearchSug(this.s_content).then(res => {
        this.suggestionMsg = res.result
      }).catch(err => {
        console.log(err);
      })
    },
    // // -------------- 自定义事件----------------
    changeRoute(item, index) {
      let basicRoute = '';
      switch(index) {
        case 0: basicRoute = '/song?id=';break;
        case 1: basicRoute = '/artist?id=';break;
        case 2: basicRoute = '/album?id=';break;
        case 3: basicRoute = '/playlist?id=';break;
      }
      this.$router.push(basicRoute + item.id)
    }
  },
};
</script>

<style lang="scss" scoped>
#s-suggestion {
  position: absolute;
  top: 45px;
  background-color: #fff;
  border-radius: 5px;
  z-index: 9;
  left: 0;
  width: 100%;
  border: 1px solid #cecece;
  font-size: 12px;
  
  text-align: left;
  line-height: normal;
  color: #333;
  p {
    padding: 10px 5px;
    border-bottom: 1px solid #cecece;
    cursor: pointer;
  }
  .s-c {
    dl {
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      &:last-child {
        border-bottom: none;
      }
      &:first-child {
        dt::before {
          content: '';
          display: inline-block;
          position: relative;
          top: 3px;
          width: 15px;
          height: 15px;
          background: url('~assets/img/search/song.png');
          background-size: contain;
        }
      }
      &:nth-child(2) {
        dt::before {
          content: '';
          display: inline-block;
          position: relative;
          top: 3px;
          width: 15px;
          height: 15px;
          background: url('~assets/img/search/singer.png');
          background-size: contain;
        }
      }
      &:nth-child(3) {
        dt::before {
          content: '';
          position: relative;
          top: 3px;
          display: inline-block;
          width: 15px;
          height: 15px;
          background: url('~assets/img/search/album-icon.png');
          background-size: contain;
        }
      }
      &:nth-child(4) {
        dt::before {
          content: '';
          position: relative;
          top: 3px;
          display: inline-block;
          width: 15px;
          height: 15px;
          background: url('~assets/img/search/sheet.png');
          background-size: contain;
        }
      }
      dt {
        width: 60px;
        flex-shrink: 0;
        text-align: center;
        border-right: 1px solid #cecece;
        padding-top: 10px;
        span {
          padding-left: 5px;
        }
      }
      dd {
        flex-grow: 1;
        padding: 5px 0;
        border-bottom: 1px solid #cecece;
        min-width:0;
        div {
          width: 100%;
          /* 强制文字一行内显示 */
          white-space: nowrap;
          /* 超出部分隐藏 */
          overflow: hidden;
          /* 
            用省略号替代超出部分 
            注：容器不可以是flex布局，若要使用flex布局，可以用flex布局的父元素包裹，或给父元素加min-width:0
          */
          text-overflow: ellipsis;
          padding: 2px 0;
          cursor: pointer;
          &:hover {
            background-color: #dfdede;
          }
          span {
            padding-left: 10px;
          }
        }
      }
    }
  }
}
</style>