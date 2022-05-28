<template>
  <div id="songAddition">
    <div class="sc-r">
        <slot name="sc-r-nav">喜欢这个歌单的人</slot>
        <slot name="sc-r-con"></slot>
        <div class="sc-r-nav">网易云音乐多端下载</div>
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
</template>

<script>
export default {
  name: 'SongAddition',

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
#songAddition {
  .sc-r {
      flex: 1;
      height: 500px;
      padding: 20px 40px 40px 30px;
      .sc-r-nav {
        font-weight: bold;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgb(204, 204, 204);
        a {
          float: right;
          color: #999;
          font-weight: normal;
          &:hover {
              text-decoration: underline;
          }
        }
      }
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