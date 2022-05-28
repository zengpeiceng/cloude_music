<template>
  <div>
    <div class="g_mymusic">
      <div class="p-mymusic">
        <left-navigation ref="LeftNavigation" @showDialog="showDialog"/>
        <div class="p-center">
          <router-view></router-view>
        </div>
      </div>
      <div v-if="isShowDialog">
        <create-song-sheet @closeDialog="closeDialog($event)"/>
      </div>
    </div>
  </div>
</template>

<script>
 import LeftNavigation from './childCpn/LeftNavigation.vue'
import { getUserSongSheets } from 'network/user'
import { mapState } from 'vuex'
import CreateSongSheet from './childCpn/CreateSongSheet.vue';
 export default {
   name: 'MyMusic',
   components: {
     LeftNavigation,
     CreateSongSheet,
   },
   data() {
     return {
       isShowDialog: false
     }
   },
   created() {
     getUserSongSheets(this.userInfo.userId).then(res => {
      if(res.code === 200) {
          const id = res.playlist[0].id
          this.$router.push(`/mymusic/music/playlist?id=${id}`);
      }
    })
   },
   methods: {
     showDialog() {
       this.isShowDialog = true
     },
     closeDialog(id) {
       this.isShowDialog = false
       if(id) {
         this.$refs.LeftNavigation.getUserSongSheetsFunc();
        //  this.$router.push(`/mymusic/music/playlist?id=${id}`)
       }
     }
   },
   computed: {
    ...mapState('UserModule', ['userInfo'])
   }
};

</script>
<style lang="scss"  scoped>
  .g_mymusic {
    overflow: auto;
    height: 465px;
    .p-mymusic {
      width: 982px;
      height: 100%;
      margin: 0 auto;
      .p-center {
        float: right;
        width: 740px;
        height: 100%;      
        background-color: #fff;
        border-right: 1px solid #dfdfdf;
      }
    }
  }
  .active {
    z-index: 9;
    background-color: rgb(221, 219, 219);
  }
</style>