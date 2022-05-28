<template>
  <div id="new">
    <el-dialog
      title="新建歌单"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div class="form">
        <span>歌单名：</span>
        <el-input v-model="name"></el-input>
        <p>可通过“收藏”将音乐添加到歌单中</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createSheetFunction(name)">新 建</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
export default {
  name: 'CreateSongSheet',

  data() {
    return {
        dialogVisible: true,
        name: '' // 歌单名
      };
  },

  mounted() {
    
  },

  methods: {
    ...mapMutations('MySheets', ['hiddenDialog']),
    ...mapActions('MySheets', ['createSheetFunc']),
    createSheetFunction() {
      const id = this.createSheetFunc(this.name)
      this.$emit('closeDialog', id);
      
    },
    handleClose() {
      this.$emit('closeDialog');
    }

  },
};
</script>

<style lang="scss" scoped>
#new {
  /deep/ .el-dialog {
    border-radius: 5px;
    width: 480px;
    height: 249px;
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
      padding-bottom: 0;
    }
    .el-dialog__footer {
      text-align: center;
      .el-button {
        padding: 0;
        height: 31px;
        font-size: 12px;
        width: 80px;
      }
    }
  }
  .form {
    text-align: center;
    margin-top: 20px;
    span {
      font-size: 12px;
    }
    p {
      padding-top: 20px;
      font-size: 12px;
      color: #999;
    }
  }
  /deep/ .el-input {
    width: 85%;
  }
}
</style>