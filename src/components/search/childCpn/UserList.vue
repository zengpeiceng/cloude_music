<template>
  <div id="userList">
    <div v-if="userprofiles.length != 0">
      <el-table
        :data="userprofiles"
        :show-header="false"
        stripe
        style="width: 100%">
        <el-table-column
          width="62">
          <template slot-scope="scope">
            <div class="avatar">
              <router-link :to="`/user/home?uid=${scope.row.userId}`">
                <img :src="scope.row.avatarUrl" alt="">
              </router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="480">
          <template slot-scope="scope">
            <div class="nickname">
              <router-link :to="`/user/home?uid=${scope.row.userId}`">
                <span>{{scope.row.nickname}}</span>
              </router-link>
              <i class="genderIcon man" v-if="scope.row.gender === 1"></i>
              <i class="genderIcon woman" v-else></i>
              <p style="font-size: 12px;color: #999">{{ scope.row.signature}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="116">
          <template slot-scope="scope">
            <div class="followBtn"><span>关注</span></div>
          </template>
        </el-table-column>
        <el-table-column
          width="116">
          <template slot-scope="scope">
            <span>歌单：{{ scope.row.playlistCount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="116">
          <template slot-scope="scope">
            <span>粉丝：{{ scope.row.followeds }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <h2 v-else>
      <empty>
        <p slot="content">很抱歉，未能找到相关搜索结果！</p>
      </empty></h2>
  </div>
</template>

<script>
import Empty from 'views/empty/Empty.vue';
export default {
  name: 'UserList',
  components: { Empty },
  props: {
    userprofiles: []
  },
  data() {
    return {
    };
  },

  mounted() {
  },

  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
#userList {
  .avatar {
    a {
      display: inline-block;
      width: 50px;
      height: 50px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .nickname {
    cursor: pointer;
    a:hover {
      text-decoration: underline;
    }
  }
  .genderIcon {
    display: inline-block;
    width: 14px;
    height: 15px;
    margin-left: 5px;
    background: url('https://s2.music.126.net/style/web2/img/icon.png?2916f420d7a5ac50cd19024f7c3094ac');
  }
  .woman {
      background-position: -70px 0;
    }
  .man {
    background-position: -70px -20px;
  }
  .followBtn {
    width: 64px;
    height: 27px;
    line-height: 27px;
    font-size: 12px;
    cursor: pointer;
    background: url('https://s2.music.126.net/style/web2/img/button.png?b27a02eb15993d69c735b6b28ca39d75') no-repeat;
    background-position: 0 -990px;
    text-align: right;
    span {
      position: relative;
      right: 15px;
    }
  }
}
</style>