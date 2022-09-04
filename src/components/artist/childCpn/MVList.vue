<template>
  <div id="MVList">
    <ul v-if="mvs.length != 0">
      <li v-for="item in mvs">
        <div>
          <router-link :to="`/MV?id=${item.id}`">
            <img :src="item.imgurl" alt="">
          </router-link>
        </div>
        <p @click="$router.push(`/MV?id=${item.id}`)">{{ item.name }}</p>
      </li>
    </ul>
     <div v-else>
        <empty>
          <h2 slot="content">暂无MV</h2>
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
import Empty from 'views/empty/Empty.vue'
import { getArtistMVs } from 'network/artist.js'
export default {
  name: 'MVlist',
  components: { Empty },
  data() {
    return {
      mvs: [],
      totalPage: 0,
      currPage: 0,
    };
  },
  created() {
    const aid = this.$route.query.id
    if(this.$route.query.offset != undefined) {
      console.log(1);
      this.currPage = this.$route.query.offset / 12 + 1;
      getArtistMVs(aid, 12, this.$route.query.offset).then(res => {
        this.mvs = res.mvs
      })
    }else {
      console.log(2);
      getArtistMVs(aid, 12, 0).then(res => {
        this.mvs = res.mvs
      })
    }
    if( this.totalPage == 0 ){
      getArtistMVs(aid, 1000, 0).then(res => {
        this.totalPage = Math.ceil(res.mvs.length / 12);
      })
    }
  },
  mounted() {
    
  },

  methods: {
     handleCurrentChange(val) {
      const aid = this.$route.query.id
      getArtistMVs(aid, 12, val + 11).then(res => {
        this.mvs = res.mvs
      })
      this.$router.push({
        path: '/artist/mv',
        query: {
          id: aid,
          limit: 12,
          offset: val * 12 - 12
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
#MVList {
  ul {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    width: 100%;
    li {
      flex: 1;
      padding: 0 18px 30px 0;
      flex-shrink: 0;
      flex-grow: 0;
      div {
        img {
          width: 137px;
          height: 103px;
        }
      }
      p {
        margin-top: 10px;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  ::v-deep .el-pagination {
    margin: 20px;
    text-align: center;
    ul {
      li {
        background-color: #eaeaea;
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