<template>
  <div id="addSong">
    <el-dialog
      title="添加到歌单"
      :visible.sync="dialogVisible"
      :before-close="handleClose">
      <div class="form">
        <!-- <div @click="addToNewSheet"><i></i><span>新歌单</span></div> -->
        <ul>
         <li v-for="(item, index) in createdMyList" @click="addToSheetFunc({op: 'add', pid: item.id})">
              <dl>
                <dt><img :src="item.coverImgUrl" alt=""></dt>
                <dd>
                  <strong>{{item.name}}</strong>
                  <p>{{item.trackCount}}</p>
                </dd>
              </dl>
            </li>
        </ul>
      </div>
    </el-dialog>
    <!-- <div v-if="isShowDialog">
      <create-song-sheet @closeDialog="closeDialog($event)"/>
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import CreateSongSheet from 'components/my-music/childCpn/CreateSongSheet'
export default {
  name: 'AddSongDialog',
  components: { CreateSongSheet },
  data() {
    return {
      dialogVisible: true,
      isShowDialog: false
    };
  },
  created() {
    this.getUserSongSheetsFunc();
  },
  computed: {
    ...mapState('MySheets', ['createdMyList'])
  },
  methods: {
    ...mapMutations('MySheets', ['showDialog', 'hiddenDialog']),
    ...mapActions('MySheets', ['getUserSongSheetsFunc', 'addToSheetFunc']),
    // addToNewSheet() {
    //   this.isShowDialog = true
    // },
    // closeDialog() {
    //   this.isShowDialog = false
    // },
    handleClose() {
      this.hiddenDialog();
    }
  },
};
</script>

<style lang="scss" scoped>
#addSong {
  ::v-deep .el-dialog {
    border-radius: 5px;
    width: 450px;
    height: 414px;
    .el-dialog__header {
      background-color: rgb(45, 45, 45);
      height: 38px;
      line-height: 38px;
      font-weight: 700;
      padding: 0 45px 0 18px;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
      .el-dialog__title {
        color: #fff;
        font-size: 14px;
      }
      .el-dialog__close {
        position: relative;
        top: -11px;
      }
    }
    .el-dialog__body {
      padding: 0;
      overflow-y: scroll;
    }
  }
  .form {
    div {
      display: flex;
      align-items: center;
      padding: 10px;
      padding-left: 25px;
      height: 36px;
      background-color: #ccc;
      cursor: pointer;
      i {
        display: inline-block;
        margin-right: 10px;
        width: 35px;
        height: 36px;
        background: url('https://s2.music.126.net/style/web2/img/icon.png?68f683ea74b61d088af88c3a9aa4411b') 0 -495px;
      }
    }
    ul {
          width: 100%;
          li {
            position: relative;
            padding: 5px 0;
            cursor: pointer;
            &:hover {
              background-color: #eaeaea;
            }
            dl {
              padding-left: 20px;
              width: 90%;
              display: flex;
              justify-content: left;
              align-items: stretch;
              font-size: 12px;
              color: #999;
              dt {
                width: 40px;
                height: 40px;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              dd {
                position: relative;
                flex: 1;
                padding-left: 10px;
                strong {
                  color: #333;
                  overflow: hidden;
                  min-width: none;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
              }
            }
          }
        }
  }
  ::v-deep .el-input {
    width: 85%;
  }
}
</style>