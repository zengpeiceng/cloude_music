<template>
  <div id="ln">
    <div class="p-left">
      <div class="p-left-content">
        <div class="title" @click.self="setActive('artist')" ref="artist">
          <span>我的歌手</span>
        </div>
        <div class="title" @click.self="setActive('rideo')" ref="rideo">
          <span>我的电台</span>
        </div>
        <div class="title">
         <p @click="changStatus(1)"><i ref="arrow1" class="arrow"></i><span class="">创建的歌单</span>
          <i class="create" @click.stop="$emit('showDialog')"><span>新建</span></i></p>
          <ul ref="playlist">
            <li v-for="(item, index) in createdMyList" 
              @click="setActive('playlist', item, index)"
              @mouseout="hiddenOperate(1, index)"
              @mouseover="showOperate(1, index)" 
              :class="{active: p_cur_index === index}">
              <dl>
                <dt><img :src="item.coverImgUrl" alt=""></dt>
                <dd>
                  <strong>{{item.name}}</strong>
                  <p>{{item.trackCount}}</p>
                </dd>
              </dl>
              <a v-if="index != 0" ref="delete1" @click.stop="deleteSheetFunc(item)" href="javascript:;" class="delete"></a>
            </li>
          </ul>
        </div>
        <div class="title">
         <p @click="changStatus(2)"><i ref="arrow2" class="arrow"></i><span>收藏的歌单</span></p>
          <ul ref="collect">
            <li v-for="(item, index) in myCollections" 
              @click="setActive('collect', item, index)" 
              @mouseout="hiddenOperate(2, index)"
              @mouseover="showOperate(2, index)" 
              :class="{active: c_cur_index === index}">
              <dl>
                <dt><img :src="item.coverImgUrl" alt=""></dt>
                <dd>
                  <strong>{{item.name}}</strong>
                  <p>{{item.trackCount}}首</p>
                </dd>
              </dl>
              <a href="javascript:;" ref="delete2" @click.stop="cancleCollectFunc(item)" class="delete"></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'LeftNavigation',
  data() {
    return {
      curr: 1,  // 当前active元素的位置，用于动态添加Active类
      myPlayList: [], // 我创建的歌单
      myCollect: [], // 我收藏的歌单
      p_cur_index: 0,
      c_cur_index:-1,
      isShowDialog: true
     };
  },

  created() {
    this.getUserSongSheetsFunc();
  },
  computed: {
    ...mapState('MySheets', ['createdMyList', 'myCollections'])
  },
  methods: {
    // ------------- vuex ------------------
    ...mapActions('MySheets', ['getUserSongSheetsFunc', 'deleteSheetFunc', 'cancleCollectFunc']),
    // ------------ 自定义事件 --------------
    getCurrClass(index) {
       this.curr = index
     },
    //  折叠与展开展示 
    changStatus(item) {
      if(item === 1) {
        if(this.$refs.arrow1.className == 'arrow') {
          this.$refs.arrow1.className = 'arrow arrow-fold';
          this.$refs.playlist.style = 'display: none';
        }else {
          this.$refs.arrow1.className = 'arrow'
          this.$refs.playlist.style = 'display: block';
        }
      }else {
        if(this.$refs.arrow2.className == 'arrow') {
          this.$refs.arrow2.className = 'arrow arrow-fold'
          this.$refs.collect.style = 'display: none';
        }else {
          this.$refs.arrow2.className = 'arrow'
          this.$refs.collect.style = 'display: block';
        }
      }
    },
    // 设置被选中item背景及路由跳转
    setActive(type, item, index) {
      switch(type) {
        case 'playlist': 
          this.p_cur_index = index; // 添加active样式
          this.$router.push(`/mymusic/music/playlist?id=${item.id}`); // 路由跳转
          /* 去除没有处于Active的样式*/
          this.c_cur_index = -1;  // 
          this.$refs.rideo.className = 'title';
          this.$refs.artist.className = 'title';break;
        case 'collect': 
          this.c_cur_index = index;// 添加active样式
           this.$router.push(`/mymusic/music/playlist?id=${item.id}`); // 路由跳转
          this.p_cur_index = -1;
          this.$refs.rideo.className = 'title';
          this.$refs.artist.className = 'title';break;
        case 'artist': 
          this.$refs.artist.className = 'title active'; // 添加active样式
          this.$router.push('/mymusic/music/artist') // 路由跳转
          this.$refs.rideo.className = 'title';
          this.p_cur_index = -1;
          this.c_cur_index = -1;break;
        case 'rideo': 
          this.$refs.rideo.className = 'title active'; // 添加active样式
          this.$router.push('/mymusic/music/rideo'); // 路由跳转
          this.$refs.artist.className = 'title';
          this.p_cur_index = -1;
          this.c_cur_index = -1;break;
      }
    },
    // 显示删除歌单图标
    showOperate(item, index) {
       switch(item) {
          case 1: 
            if(index != 0) this.$refs.delete1[index - 1].style = 'display: block';;break;
          case 2: this.$refs.delete2[index].style = 'display: block';break;
        }
    },
    // 隐藏删除歌单图标
    hiddenOperate(item, index) {
       switch(item) {
            case 1: if(index != 0) this.$refs.delete1[index - 1].style = 'display: none';;break;
            case 2: this.$refs.delete2[index].style = 'display: none';break;
       }
    },
  },
};
</script>

<style lang="scss" scoped>
.p-left {
      position: fixed;
      width: 240px;
      height: 465px;
      overflow-y: scroll;
      border: 1px solid #d4d4d4;
      background-color: #fff;
      .p-left-content {
        padding-top: 40px;
        .title {  
          position: relative;
          cursor: pointer;
          font-size: 14px;
          font-weight: 700;
          font-family: simsun,\5b8b\4f53;
          color: #000;
          &:nth-child(1), &:nth-child(2) {
            height: 31px;
            line-height: 31px;
            &:hover {
              background-color: #eaeaea;
            }
          }
          span {
            padding-left: 40px;
          }
          .create {
            float: right;
            display: inline-block;
            text-align: center;
            font-size: 12px;
            color: #999;
            font-weight: normal;
            width: 52px;
            height: 22px;
            line-height: 22px;
            cursor: pointer;
            background: url('https://s2.music.126.net/style/web2/img/button.png?f84cecde1baef312091802276d4ebf1b') 0 -96px;
            span {
              padding-left: 10px;
            }
          }
        }
        ul {
          width: 100%;
          margin-top: 10px;
          li {
            position: relative;
            padding: 5px 0;
            cursor: pointer;
            &:hover {
              background-color: #eaeaea;
            }
            dl {
              padding-left: 20px;
              width: 100%;
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
            .delete {
              display: none;
              position: absolute;
              top: 20px;
              right: 30px;
              width: 13px;
              height: 14px;
              background: url('https://s2.music.126.net/style/web2/img/icon.png?68f683ea74b61d088af88c3a9aa4411b') 0 -284px;
            }
          }
        }
      }
      &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(0,0,0,0.05);
        border-radius: 10px;
      }
      &::-webkit-scrollbar-track {
        border-radius: 10px;
      }
    }
.arrow {
    position: absolute;
    left: 20px;
    top: 8px;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-top: 6px solid #ccc;
}
// 折叠状态
.arrow-fold {
  top: 5px;
  left: 25px;
  transform: rotate(-90deg);
}
// 
.active {
  background-color: #eaeaea;
}
</style>