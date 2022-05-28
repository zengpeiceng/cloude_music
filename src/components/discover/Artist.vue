<template>
  <div id="artist">
    <div class="left">
      <keep-alive>
        <left-artist-cat @changeTitle="changeTitle"/>
      </keep-alive>
    </div>
    <div class="right">
      <keep-alive>
        <router-view :title="title"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import CenterArtistList from './childCpn/CenterArtistList.vue';
import LeftArtistCat from './childCpn/LeftArtistCat.vue';
export default {
  name: 'Artist',
  components: { LeftArtistCat, CenterArtistList },
  data() {
   return {
     title: '热门歌手'
    };
  },

  mounted() {
    
  },

  methods: {
    changeTitle(t) {
      this.title = t
    }
  },
};
</script>

<style lang="scss" scoped>
#artist {
  width: 980px;
  margin: 0 auto;
  border-left: 1px solid #dfdfdf;
  border-right: 1px solid #dfdfdf;
  display: flex;
  .left {
    width: 180px;
    border-right: 1px solid #dfdfdf;
  }
  .right {
    flex: 1px;
    padding: 40px;
  }
}
</style>