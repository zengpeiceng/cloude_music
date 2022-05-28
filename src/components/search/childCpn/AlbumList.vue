<template>
  <div id="albumsList">
    <div v-if="albums.length != 0">
    <ul>
      <li v-for="(item, index) in albums" @click="toAlbumMsg(item)">
        <div>
          <img :src="item.picUrl" alt="">
          <img class="ablumright" src="~assets/img/search/album.png" alt="">
          <i @click.stop="getSongList({songId: item.id, type:'album'})"></i>
        </div>
        <p>{{ item.name }}</p>
      </li>
    </ul>
  </div>
  <h2 v-else>
      <empty>
        <p slot="content">很抱歉，未能找到相关搜索结果！</p>
      </empty></h2>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import Empty from 'views/empty/Empty.vue';
export default {
  name: 'AlbumList',
  components: { Empty },
  props: {
    albums: {
      type: Array,
      default() {
        return []
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
     ...mapActions('PlayerModule', ['getSongList']),
    toAlbumMsg(item) {
      this.$router.push(`/album?id=${item.id}`)
    }
  },
};
</script>

<style lang="scss" scoped>
#albumsList {
  ul {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: left;
    li {
      flex: 1;
      padding: 0 25px 20px 0;
      div {
        position: relative;
        img {
          &:nth-child(1) {
            width: 130px;
            height: 130px;
          }
          &:nth-child(2) {
            width: 23px;
            height: 130px;
          }
        }
        i {
          display: none;
          position: absolute;
          bottom: 10px;
          right: 40px;
          background: url('~assets/img/search/playbtn.png') no-repeat;
          background-size: 100%;
          width: 25px;
          height: 25px;
        }
      }
      &:hover i {
        display: inline-block;
      }
      p { 
        margin-top: 5px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 140px;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>