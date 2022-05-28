<template>
  <div id="introduction">
    <div v-if="briefDesc != '' || introduction.length != 0">
      <h2 class="title">简介</h2>
      <p class="txt" style="text-indent: 2em;">{{briefDesc}}</p>
      <ul class="i-ul">
        <li v-for="item in introduction">
          <h2 class="title">{{item.ti}}</h2>
          <p class="txt">{{item.txt}}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <empty><h2 slot="content">暂无介绍</h2></empty>
    </div>
  </div>
</template>

<script>
import Empty from 'views/empty/Empty.vue'
import {getArtistDesc} from 'network/artist.js'
export default {
  name: 'Artistintroduction',
  components: { Empty },
  data() {
    return {
      introduction: [],
      briefDesc: ''
    };
  },
  created() {
    const aid = this.$route.query.id 
    getArtistDesc(aid).then(res => {
      this.introduction = res.introduction
      this.briefDesc = res.briefDesc
    })
  },
  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
#introduction {
  .title {
    font-size: 16px;
    margin: 28px 0 8px 0;
  }
  .txt {
    color: #666;
    // 解析文本中的换行符
    white-space: pre-wrap;
  }
  .empty {
    width: 100%;
    text-align: center;
    padding: 105px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      display: inline-block;
      width: 64px;
      height: 50px;
      background: url('https://s2.music.126.net/style/web2/img/icon.png?e71b3dcf5df100518a4b5b9bda074ed6');
      background-position: 0 -347px;
      margin-right: 15px;
      vertical-align: center;
    }
  }
}
</style>