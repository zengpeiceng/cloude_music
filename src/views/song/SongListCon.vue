<template>
  <div id="s-l-con">
     <el-table v-if="songList.length != 0"
        @cell-mouse-enter="showCurrHover"
        @cell-mouse-leave="hiddenHoverItem"
        :row-class-name="rowClassName"
        :data="songList"
        stripe
        style="width: 100%">
        <el-table-column
          prop="num"
          width="80">
          <template slot-scope="scope">
            <div class="ply" @click="getSongUrlAct({songItem: `${scope.row.id}`})" >
              <span>{{scope.$index + 1}}</span>
              <img src="~assets/img/mymusic/playbtn.png" alt="">
            </div>
            </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="name"
          label="歌曲标题"
          width="280">
        </el-table-column>
        <el-table-column
          prop="duration"
          label="时长"
          width="100">
            <template slot-scope="scope">
              <div class="select" >
                <span v-show="currHoverRowIndex != scope.$index + 1">{{ scope.row.dt | timeFormat}}</span>
                <div v-show="currHoverRowIndex === scope.$index + 1" class="items">
                  <ul>
                    <li @click.stop="opereationClick"><img src="~assets/img/mymusic/add-icon.png" alt="add"></li>
                    <li @click.stop="opereationClick"><img src="~assets/img/mymusic/collect-icon.png" alt="collect"></li>
                    <li @click.stop="opereationClick"><img src="~assets/img/mymusic/share-icon.png" alt="share"></li>
                    <li @click.stop="opereationClick"><img src="~assets/img/mymusic/download-icon.png" alt="download"></li>
                  </ul>
                </div>
              </div>
            </template>
        </el-table-column>
        <el-table-column
          prop="ar[0].name"
          show-overflow-tooltip
          label="歌手"
          width="100">
          <template slot-scope="scope" v-if="scope.row.ar">
            <router-link :to="`/artist?id=${scope.row.ar[0].id}`">
              {{ scope.row.ar[0].name}}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="al.name"
          label="专辑">
        </el-table-column>
      </el-table>
      <div v-else>
         <empty>
           <h2 slot="content">暂无音乐</h2>
         </empty>
      </div>
  </div>
</template>

<script>
import Empty from 'views/empty/Empty.vue'
import { mapMutations,mapActions, mapState } from 'vuex'
export default {
  name: 'SongListCon',
  components: { Empty },
  props: {
    songList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
       currHoverRowIndex: -1,
    };
  },
  computed: {
    ...mapState('UserModule', ['userState'])
  },
  methods: {
    ...mapActions('PlayerModule', ['getSongUrlAct']),
    ...mapMutations('PlayerModule', ['pushSong']),
    ...mapMutations('MySheets', ['showDialog']),
    ...mapMutations('UserModule', ['showDialog']),
     rowClassName({row, rowIndex}) {
          //把每一行的索引放进row
          row.index = rowIndex + 1;
     },
     showCurrHover(row) {
       this.currHoverRowIndex = row.index;
     },
     hiddenHoverItem() {
       this.currHoverRowIndex = -1;
     },
     opereationClick(e) {
       if(e.path[0].alt === 'add') {
        //  添加到播放列表
         this.pushSong(this.songList[this.currHoverRowIndex - 1]);
         this.$message.success('已添加到播放列表');
       }else if(e.path[0].alt === 'collect') {
        //  收藏到歌单
        if(this.userState.isLogin) {
          this.showDialog(this.songList[this.currHoverRowIndex - 1]);
        }else {
          this.showDialog();
        }
       }else if(e.path[0].alt === 'share') {
        //  分享
         console.log('shareClicked');
       }else {
        //  下载
         console.log('downloadClicked');
       }
     },
  },
};
</script>

<style lang="scss" scoped>

#s-l-con {
   ::v-deep .el-table__cell {
      padding: 5px 0;
    }
    ::v-deep .cell {
      font-size: 12px;
    }
    
   .ply {
      img {
        float: right;
        position: relative;
        top: 4px;
        width: 25%;
        height: 25%;
      }
    }
    .select {
      position: relative;
      
      height: 23px;
      .items {
        ul {
          position: absolute;
          left: -15px;
          display: flex;
          justify-content: flex-end;
          width: 110px;
          li {
            width: 17px;
            height: 17px;
            padding: 3px 3px;
            img {
              position: relative;
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
}

</style>