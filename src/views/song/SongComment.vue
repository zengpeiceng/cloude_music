<template>
  <div id="c-comment">
    <div class="c-navbar">
      <span class="c-title">评论</span>
      <span class="c-count">共0条评论</span>
    </div>
    <div class="m-cmmtipt">
      <div class="avatar"><img src="~assets/img/home/recommend.jpg" alt=""></div>
      <div class="commentBox">
        <i></i>
        <el-input
        type="textarea"
        :rows="2"
        resize='none'
        :show-word-limit="true"
        maxlength="140"
        placeholder="评论"
        v-model="comment">
      </el-input>
      <div class="comment-btn">评论</div>
      </div>
    </div>
  </div>
</template>

<script>
 export default {
   name: 'SongComment',
   data() {
     return {
       comment:''
     }
   },
};

</script>
<style lang="scss" scoped>
  #c-comment {
    .c-navbar {

      border-bottom: 2px solid #c20c0c;
      margin-top: 30px;
      font-size: 18px;
      .c-title {
        padding: 5px 20px 5px 40px;
      }
      .c-count {
        font-size: 12px;
        color: #999;
      }
  }
  .m-cmmtipt {
    margin: 20px 0 50px 0;
      display: flex;
      justify-content: space-evenly;
      .avatar {
        width: 50px;
        height: 50px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .commentBox {
        position: relative;
        width: 600px;
        i {
          position: absolute;
          top: 15px;
          left: -4.4px;
          width: 8px;
          height: 8px;
          z-index: 9;
          background-color: #fff;
          border-top: 1px solid rgb(161, 161, 161);
          border-left: 1px solid rgb(161, 161, 161);
          transform: rotate(-45deg);
        }
        /deep/ .el-textarea__inner {
          border-color: rgb(161, 161, 161);
        }
        .comment-btn {
          position: absolute;
          text-align: center;
          bottom: -40px;
          right: 10px;
          width: 60px;
          height: 30px;
          line-height: 30px;
          background-color: rgb(24, 124, 201);
          color: #fff;
        }
      }
    }
  }
</style>