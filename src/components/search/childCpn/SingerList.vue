<template>
  <div id="singerList">
    <div class="s-c" v-if="artists.length != 0" >
      <div v-for="(item, index) in artists" @click="toArtistInterFace(item)">
        <singer-msg :artistMsg="item"></singer-msg>
      </div>
    </div>
    <h2 v-else>
      <empty>
        <p slot="content">很抱歉，未能找到相关搜索结果！</p>
      </empty></h2>
  </div>
</template>

<script>
import Empty from 'views/empty/Empty.vue';
import SingerMsg from 'views/singer/SingerCover.vue'
export default {
  name: 'SingerList',
  components: {
    SingerMsg,
    Empty
  },
  props: {
    artists: {
      type: Array,
      defalut() {
        return []
      }
    }
  },
  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    toArtistInterFace(item) {
      this.$router.push(`/artist?id=${item.id}`)
    }
  },
};
</script>

<style lang="scss" scoped>
#singerList {
  width: 100%;
  .s-c {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>