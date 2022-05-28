<template>
  <div id="profileMsg">
    <div class="content">
        <!-- 顶部基本信息 -->
      <basic-msg :basicMsg="basicMsg"/>
      <!-- 播放记录 -->
      <div class="c-play-record" v-if="record.length != 0">
        <div class="title">
          <h2>听歌排行</h2>
          <p>
            <a :class="{active: isWeek}" href="javascript:;" @click="getPlayRecordFunc(1)"><span>最近一周</span></a>
              | 
            <a :class="{active: !isWeek}" href="javascript:;" @click="getPlayRecordFunc(0)"><span>所有时间</span></a>
          </p>
      </div>
        <div class="c-d">
            <el-table
            :data="record"
            :row-class-name="setrowIndex"
            @cell-mouse-enter="showOperations"
            @cell-mouse-leave="hiddenOperations"
            :show-header="false"
            stripe
            style="width: 100%">
            <el-table-column
              width="40">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column
              width="550">
              <template slot-scope="scope">
                <div>
                  <i class="btnPlay" @click="getSongUrlAct({songItem: scope.row.song.id})"></i>
                  <router-link class="sname hover" :to="`/song?id=${scope.row.song.id}`"><span>{{scope.row.song.name}}</span></router-link>
                  <span class="ar" >--
                    <router-link class="hover" v-for="(item, index) in scope.row.song.ar" :to="`/artist?id=${item.id}`" :key="index">
                      {{item.name}}
                      <i v-if="index != scope.row.song.ar.length - 1">/</i>
                    </router-link>
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-progress :show-text="false" 
                  :stroke-width="31" 
                  :percentage="scope.row.score" ></el-progress>
              </template>
            </el-table-column>
            </el-table>
            <p class="rowHover" ref="rowHover">
              <ul>
                <li @click.stop="opereationClick"><img src="~assets/img/mymusic/add-icon.png" alt="add"></li>
                <li @click.stop="opereationClick"><img src="~assets/img/mymusic/collect-icon.png" alt="collect"></li>
                <li @click.stop="opereationClick"><img src="~assets/img/mymusic/share-icon.png" alt="share"></li>
                <li @click.stop="opereationClick"><img src="~assets/img/mymusic/download-icon.png" alt="download"></li>
              </ul>
            </p>
            <router-link class="more hover" :to="`/user/songs/rank?uid=${$route.query.uid}`">查看更多 ></router-link>
        </div>
      </div>
      <!-- 我创建的歌单 -->
      <div class="b-song-sheet" v-if="myPlayList.length != 0">
        <song-sheet :songList="myPlayList">
          <span slot="songSheetNavBar" v-if="basicMsg.userId === userInfo.userId ">我创建的歌单</span>
          <span slot="songSheetNavBar" v-else >{{basicMsg.nickname}}创建的歌单</span>
        </song-sheet>
      </div>
      <!-- 我收藏的歌单 -->
       <div class="b-song-sheet" v-if="myCollect.length != 0">
        <song-sheet :songList="myCollect">
          <span slot="songSheetNavBar" v-if="basicMsg.userId === userInfo.userId ">我收藏的歌单</span>
          <span slot="songSheetNavBar" v-else >{{basicMsg.nickname}}收藏的歌单</span>
        </song-sheet>
      </div>
    </div>
  </div>
</template>

<script>
import {getPlayRecord, getUserMsg, getUserSongSheets} from 'network/user'
import BasicMsg from './childCpn/BasicMsg.vue';
import PlayRecordRank from './childCpn/PlayRecordRank.vue';
import SongSheet from 'views/song/SongSheet.vue'
import {mapState,mapMutations,mapActions} from 'vuex'

export default {
  components: { BasicMsg, PlayRecordRank, SongSheet },
  name: 'ProfileMsg',
  data() {
    return {
      basicMsg: {}, // 基本信息
      record: [], // 播放记录歌曲列表
      isWeek: true, // 播放记录（true: 最近一周，false: 全部时间）
      curr: 0, // 当前hover的行索引
      myPlayList: [], // 我创建的歌单
      myCollect: [], //我收藏的歌单
    };
  },
  watch: {
    '$route.query.uid': function() {
       const uid = this.$route.query.uid
       this.getUserMsgFunc(uid)
       this.getPlayRecordFunc(1);
    }
  },
  created() {
    const uid = this.$route.query.uid
    this.getUserMsgFunc(uid)
    this.getPlayRecordFunc(1);
    this.getUserSongSheetsFunc(uid);
  },
  computed: {
    ...mapState('UserModule', ['userInfo'])
  },
  methods: {
    ...mapActions('PlayerModule', ['getSongUrlAct']),
    ...mapMutations('PlayerModule', ['pushSong']),
    // ------------- 请求事件 ----------------
    // 请求用户详细信息：包括头像、性别等
    getUserMsgFunc(uid) {
      getUserMsg(uid).then(res => {
        this.basicMsg = res.profile
        this.basicMsg.level = res.level
        getUserSongSheets(uid).then(res => {
          this.playList = res.playList
        })
      })
    },
    // 请求播放记录，type：1 -> 最近更近， type: 2 --- 全部
     getPlayRecordFunc(type) {
      const uid = this.$route.query.uid
      getPlayRecord(uid, type).then(res => {
        if(res && res.code === 200) {
          if(type === 1) {
            this.isWeek = true
            this.record = res.weekData.slice(0, 10)
          }else {
            this.isWeek = false
            this.record = res.allData.slice(0, 10)
          }
        }
      })
    },
    // 请求用户的歌单
    getUserSongSheetsFunc(uid) {
      getUserSongSheets(uid).then(res => {
        const playList = res.playlist
        for(let i = 0; i < playList.length; i++) {
          if(playList[i].creator.userId == uid) {
            this.myPlayList.push(playList[i])
          }else{
            this.myCollect.push(playList[i])
          }
        }
      })
    },
    //  -------------- 自定义事件 -----------------
    // 给Table每行设置 index
     setrowIndex({row, rowIndex}) {
      row.index = rowIndex 
    },
    // 显示 添加、删除、收藏 等操作
    showOperations(row) {
      this.curr = row.index
      let distance = row.index * 31;
      this.$refs.rowHover.style = 'display: block; top: ' + distance + 'px;'
    },
    // 隐藏 添加、删除、收藏 等操作
    hiddenOperations() {
      this.$refs.rowHover.style = 'display:none';
    },
    opereationClick(e) {
       if(e.path[0].alt === 'add') {
        //  添加到播放列表
         this.pushSong(this.record[this.curr].song);
         this.$message.success('已添加到播放列表');
       }else if(e.path[0].alt === 'collect') {
        //  收藏到歌单
         console.log('collectClicked');
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
#profileMsg {
  width: 980px;
  margin: 0 auto;
  border-left: 1px solid #dfdfdf;
  border-right: 1px solid #dfdfdf;
  .content {
    padding: 40px;
    background: #fff;
    .c-play-record {
      margin-top: 40px;
        .details {
          padding: 40px;
        }
        .title {
          display: flex;
          margin-top: 20px;
          justify-content: space-between;
          color: #666;
          border-bottom: 2px solid #c20c0c;
          h2 {  
          font-size: 22px;
          }
          a {
            color: #666;
            font-size: 12px;
            padding: 0 6px;
          }
        }
        .c-d {
          position: relative;
        }
        /deep/ .el-table {
          border: 1px solid #ccc;
          border-top: 0;
            &::before {
              height: 0;
            }
          }
        /deep/ .el-table__body-wrapper {
         
            .el-table__body {
              .el-table__cell {
                padding: 0;
                height: 31px;
                border: none;
                &:nth-child(1) {
                  text-align: center;
                }
                &:nth-child(2) {
                  font-size: 12px;
                  .sname {
                    color: #000;
                  }
                  .ar {
                    padding-left: 20px;
                    color: #999;
                    a {
                      color: #999;
                    }
                  }
                }
              }
              .cell {
                padding: 0;
                .el-progress-bar__outer {
                  border-radius: 0;
                  background-color: #fff;
                  .el-progress-bar__inner {
                    border-radius: 0;
                    background-color: #4eb4f5;
                    opacity: .1;
                  }
                }
              }
              .btnPlay {
                position: relative;
                top: 5px;
                margin-right: 5px;
                display: inline-block;
                width: 17px;
                height: 17px;
                background: url('https://s2.music.126.net/style/web2/img/table.png?4943b9a72a763318d722adf3de64a824') 0 -103px;
                cursor: pointer;
              }
            }
        }
        .active {
          span {
            font-weight: 700;
            color: #000;
          }
        }
        .hover {
          &:hover {
            text-decoration: underline;
          }
        }
        .more {
          margin-top: 10px;
          float: right;
          color: #666;
        }
        .rowHover {
          display: none;
          position: absolute;
          width: 100%;
          background-color: rgb(219, 219, 219);
          opacity: .3;
          pointer-events: none;
          ul {
            display: flex;
            margin: 0 auto;
            height: 31px;
            justify-content: space-around;
            align-items: center;
            pointer-events: all;
            width: 100px;
            img {
              width: 20px;
              height: 20px;
            }
            
          }
        }
    }
  }
  
}
</style>