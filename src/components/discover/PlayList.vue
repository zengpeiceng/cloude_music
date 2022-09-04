<template>
  <!-- 推荐全部歌单 -->
  <div id="dPlayList">
    <div class="g-bd">
      <song-sheet :songList="s_list">
        <template v-slot:songSheetNavBar>
          <span>{{ currCatTab }}</span>
        </template>
        <div ref="triggerCat" slot="categories" class="c-menu">
          <!-- 是否显示分类 -->
          <span
            ref="triggerCatShow"
            @click="isshowCategories = !isshowCategories"
            >选择分类</span
          >
          <div v-show="isshowCategories" ref="categories">
            <p></p>
            <div class="categories">
              <div class="top">
                <div>
                  <a
                    href="javascript:void(0);"
                    @click="$router.push('/discover/playlist?cat=全部风格')"
                    >全部风格</a
                  >
                </div>
              </div>
              <dl v-for="(title, index) in categories">
                <dt class="titles"><i></i>{{ title }}</dt>
                <dd class="items">
                  <div v-for="item in sub" v-if="item.category == index">
                    <router-link :to="`/discover/playlist?cat=${item.name}`"
                      >{{ item.name }}
                    </router-link>
                    <span>|</span>
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </song-sheet>
    </div>
    <el-pagination
      ref="pagination"
      background
      layout="prev, pager, next"
      :page-size="35"
      :current-page.sync="currPage"
      @current-change="handleCurrentChange"
      :hide-on-single-page="true"
      :page-count="totalPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import SongSheet from "views/song/SongSheet";

import { getCatList, getTopPlayList } from "network/discover.js";
import closeTargetEle from "utils/closeTargetEle.js";
export default {
  name: "Playlist",
  components: { SongSheet },
  data() {
    return {
      isshowCategories: false,
      currPage: 1,
      sub: [],
      categories: [],
      s_list: [],
      totalPage: 0,
      playlist: { order: "hot", offset: "0", cat: "全部", limit: "35" },
    };
  },
  mounted() {
    // 获取分类标签
    getCatList()
      .then((res) => {
        this.categories = res.categories;
        this.sub.push(...res.sub);
      })
      .catch((err) => {
        console.log(err);
      });
    // 获取歌单
    //  this.getPlayList(this.playlist);
    if (JSON.stringify(this.$route.query) == "{}") {
      this.getPlayList(this.playlist);
    } else {
      this.playlist.cat = this.$route.query.cat;
      this.getPlayList(this.playlist);
    }
  },
  created() {
    document.addEventListener("click", this.NonTargetIsClicked);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.NonTargetIsClicked);
  },
  watch: {
    "$route.query.cat": function () {
      this.currPage = 1;
      this.playlist.cat = this.$route.query.cat;
      this.getPlayList(this.playlist);
      this.isshowCategories = false;
    },
  },
  computed: {
    currCatTab() {
      const cat = this.$route.query;
      console.log(JSON.stringify(cat));
      if (JSON.stringify(cat) == "{}") {
        return "全部风格";
      } else {
        return cat.cat;
      }
    },
  },
  methods: {
    // ----------------网络请求-------------
    // 请求分类数据
    getPlayList(playlist) {
      getTopPlayList(playlist).then((res) => {
        this.s_list = [];
        this.s_list.push(...res.playlists.slice(0, 35));
        this.totalPage = res.total;
        for (let key of this.s_list) {
          key.picUrl = key.coverImgUrl;
        }
      });
    },
    // ----------------点击事件-------------
    // 当页码发生改变时触发
    handleCurrentChange(val) {
      this.playlist.offset = val - 1;
      this.getPlayList(this.playlist);
    },
    //
    NonTargetIsClicked(e) {
      if (this.isshowCategories) {
        const target = e.target;
        const showTargetEle = this.$refs.categories;
        const triggerTargetEle = this.$refs.triggerCatShow;
        const flag = closeTargetEle(target, showTargetEle, triggerTargetEle);
        if (!flag) {
          this.isshowCategories = false;
        }
      }
    },
  },
  beforeDestroy() {
    document.removeEventListener("click", this.NonTargetIsClicked);
  },
};
</script>


<style lang="scss" scoped>
#dPlayList {
  .g-bd {
    width: 980px;
    padding-top: 20px;
    background-color: #fff;
    margin: 0 auto;
    .c-menu {
      position: relative;
      left: 20px;
      top: 5px;
      display: inline-block;
      border: 1px solid #eaeaea;
      padding: 0px 20px;
      font-size: 14px;
      height: 25px;
      cursor: pointer;
      p {
        position: relative;
        width: 15px;
        height: 15px;
        border-top: 1px solid #d8d7d7;
        border-left: 1px solid #d8d7d7;
        background-color: #fff;
        transform: rotate(45deg);
        top: -7px;
        z-index: 10;
      }
      span {
        position: relative;
        top: -7px;
      }
      .categories {
        position: absolute;
        background-color: #fff;
        z-index: 9;
        top: 40px;
        left: -100px;
        width: 700px;
        border: 1px solid #d8d7d7;
        box-shadow: 1px 1px 1px 1px #eaeaea;
        .top {
          border-bottom: 1px solid #d8d7d7;
          div {
            margin: 10px 20px;
            border: 1px solid #eaeaea;
            font-size: 12px;
            height: 25px;
            line-height: 25px;
            width: 70px;
            text-align: center;
          }
        }
        dl {
          display: flex;
          font-size: 12px;
          dt {
            width: 71px;
            margin-left: 25px;
            border-right: 1px solid #eaeaea;
            padding-top: 15px;
            flex-shrink: 0;
            i {
              position: relative;
              top: 5px;
              right: 4px;
              display: inline-block;
              width: 23px;
              height: 23px;
            }
          }
          dd {
            display: flex;
            flex-wrap: wrap;
            padding: 16px 15px 0 15px;
            align-items: center;
            div {
              height: 20px;
              line-height: 20px;
            }
            a {
              padding: 0 5px;
            }
            span {
              position: relative;
              top: -1px;
            }
          }
          &:nth-child(2) {
            i {
              background: url("~assets/img/mymusic/icon.png") no-repeat -20px -735px;
            }
          }
          &:nth-child(3) {
            i {
              background: url("~assets/img/mymusic/icon.png") no-repeat 0px -60px;
            }
          }
          &:nth-child(4) {
            i {
              background: url("~assets/img/mymusic/icon.png") no-repeat 0px -88px;
            }
          }
          &:nth-child(5) {
            i {
              background: url("~assets/img/mymusic/icon.png") no-repeat -0px -117px;
            }
          }
          &:nth-child(6) {
            i {
              background: url("~assets/img/mymusic/icon.png") no-repeat -0px -141px;
            }
          }
        }
      }
    }
  }
  .content {
    margin-top: 20px;
  }
  ::v-deep .el-pagination {
    margin: 20px;
    text-align: center;
    .el-pager {
      li {
        background-color: #eaeaea;
        &:not(.active):hover {
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


