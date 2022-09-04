<template>
  <div id="app">
    <main-tab-bar/>
    <div class="in">
      <el-backtop :bottom="100">
        <div class="back"></div>
        <div>TOP</div>
      </el-backtop>
      <div v-if="isShowDialog">
        <add-song-dialog/>
      </div>
      <div v-if="loginBox.isShowLoginDialog">
        <login-box></login-box>
      </div>
    <router-view/>
    <Floor v-if="$route.path.indexOf('/mymusic/music') === -1"/>
    <song-player v-if="$route.path != '/video'"/>
    </div>
  </div>
</template>

<script>
import MainTabBar from 'views/tabbar/MainTabBar'
import SongPlayer from 'views/player/SongPlayer.vue'
import Floor from 'views/foot/Floor.vue'

import AddSongDialog from 'views/song/AddSongDialog'
import LoginBox from 'components/login/LoginBox'
import { mapMutations, mapState } from 'vuex' 
export default {
  name: 'app',
  data() {
    return {
    }
  },
  components: {
    MainTabBar,
    SongPlayer,
    Floor,
    AddSongDialog,
    LoginBox
  },
  computed: {
    ...mapState('MySheets', ['isShowDialog']),
    ...mapState('UserModule', ['loginBox'])
  },
  methods: {
    ...mapMutations('UserModule', ['showDialog', 'hiddenDialog']),
  }
}
</script>

<style lang="scss" scoped>
  .in ::v-deep .el-backtop {
    flex-direction: column;
    justify-content: space-evenly;
    border-radius: 3px;
    background-color: #f0f0f0;
    border: .5px solid rgb(196, 194, 194);
    color: rgb(126, 124, 124);
    font-size: 14px;
    &:hover{
      background-color: #eaeaea;
    }
  }
  .in {
    .back {
      margin-top: 5px;
      width: 5px;
      height: 5px;
      border-top: 1px solid rgb(126, 124, 124);
      border-left: 1px solid rgb(126, 124, 124);
      transform: rotate(45deg)
    }
  }
</style>
