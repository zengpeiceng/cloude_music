<template>
  <div id="albumsList">
    <div v-if="hotAlbums.length != 0">
    <ul>
      <li v-for="(item, index) in hotAlbums" @click="toAlbumMsg(item)">
        <div>
          <img :src="item.picUrl" alt="">
          <img class="ablumright" src="~assets/img/search/album.png" alt="">
          <i @click.stop="getSongList({songId: item.id, type:'album'})"></i>
        </div>
        <p>{{ item.name }}</p>
      </li>
    </ul>
    </div>
     <div v-else>
        <empty>
          <h2 slot="content">暂无专辑</h2>
        </empty>
      </div>
    <!-- 分页 -->
    <el-pagination ref="pagination"
      background
      layout="prev, pager, next"
      :page-size="12"
      :current-page.sync="currPage"
      @current-change="handleCurrentChange"
      :hide-on-single-page="true"
      :page-count="totalPage"
      v-if="totalPage != 0">
    </el-pagination>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import Empty from 'views/empty/Empty.vue'

import { getArtistAlbums } from 'network/artist'
export default {
  name: 'AlbumList',
  components: { Empty },
  data() {
    return {
      hotAlbums: [],
      currPage: 1,
      totalPage: 0,
    };
  },
  created() {
    const aid = this.$route.query.id
    if( this.$route.query.offset != undefined) {
      this.currPage = this.$route.query.offset / 12 + 1;
      getArtistAlbums(aid, 12, this.$route.query.offset).then(res => {
        this.hotAlbums = res.hotAlbums
      })
    }else {
      console.log('album');
      getArtistAlbums(aid, 12, 0).then(res => {
        this.hotAlbums = res.hotAlbums
      })
    }
    getArtistAlbums(aid, 1000, 0).then(res => {
      console.log(res.hotAlbums);
      this.totalPage = Math.ceil(res.hotAlbums.length / 12);
    })
  },
  mounted() {
    
  },

  methods: { 
    ...mapActions('PlayerModule', ['getSongList']),
    handleCurrentChange(val) {
      const aid = this.$route.query.id
      getArtistAlbums(aid, 12, val + 11).then(res => {
        this.hotAlbums = res.hotAlbums
      })
      this.$router.push({
        path: '/artist/album',
        query: {
          id: aid,
          limit: 12,
          offset: val * 12 - 12
        }
      })
    },
    // 跳转到专辑详情页面
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
      flex-shrink: 0;
      flex-grow: 0;
      div {
        position: relative;
        white-space: nowrap;
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
  /deep/ .el-pagination {
    margin: 20px;
    text-align: center;
   .el-pager {
      li {
        background-color: #eaeaea;
        width: 22px;
        height: 28px;
        padding: 0 4px;
        margin: 0 5px;
        &:not(.active):hover{
          color: #c20c0c;
        }
      }
      .active {
      background-color: #c20c0c;
      }
    }
  }
}
</style>

