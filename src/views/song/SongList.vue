<template>
  <div id='songList'>
    <div class="navbar" >
      <span>歌曲列表</span>
      <i>共{{songList.length}}首歌</i>
      <slot name="playCount"></slot>
    </div>
    <song-list-con :songList="songList"/>
  </div>
</template>

<script>
import SongListCon from './SongListCon.vue';

 export default {
   name: 'SongList',
   components: {SongListCon},
   props: {
     songList: {
       type: Array,
       default() {
         return  [
          {
            num: '1',
            name: '大眠',
            ar: [{name: '王心凌'}],
            duration: '03:11',
            album: 'CYNDILOVES2SING '
          }
        ]
       }
     }
   },
   data() {
     return {
     }
   },
   mounted() {

   },
   methods: {
   },
};

</script>
<style lang="scss"  scoped>
  .navbar {
    border-bottom: 2px solid #c20c0c;
    font-size: 18px;
    span {
      padding-left: 40px;
    }
    i {
      color: #999;
      font-size: 12px;
      padding-left: 20px;
      em {
        color: #c20c0c;
      }
      &:nth-child(3) {
        float: right;
        padding-right: 10px;
      }
    }
  }
</style>