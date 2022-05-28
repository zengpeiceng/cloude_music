<template>
  <div id="albumMsg">
    <div class="content" >
      <song-desc :song_details="album">
          <span slot="sign" class="sign"></span>
          <template v-slot:creatorMsg = "data">
            <div class="d-message">
                <div v-if="data.creatorMsg.artists">
                  <router-link :to="`/artist?id=${data.creatorMsg.artist.id}`">
                    歌手：<span>{{ data.creatorMsg.artist.name }}</span>
                  </router-link>
                  <p>发行时间：<span>{{ data.creatorMsg.publishTime | dateFormat}}</span></p>
                </div>
              </div>
          </template>
          <template slot="introduce">
            <div class="introduce">
              <h3>专辑介绍：</h3>
              <p v-if="album.description != ''">{{ album.description }}</p>
              <p v-else>暂无</p>
            </div>
          </template>
      </song-desc>
      <song-list :songList="songs"></song-list>
    </div>
    <div class="sr-c">
      <song-addition>
        <div slot="sc-r-nav" class="sc-r-nav" v-if="album.artist">
          Ta的其他热门专辑 
          <router-link :to="`/artist/album?id=${album.artist.id}`">全部></router-link>
        </div>
        <template slot="sc-r-con">
          <ul>
            <li v-for="(item, index) in hotAlbums">
              <router-link :to="`/album?id=${item.id}`">
                <img :src="item.blurPicUrl" alt="">
              </router-link>
              <div>
                <a href="">{{ item.name }}</a>
                <p>{{ item.publishTime | dateFormat}}</p>
              </div>
            </li>
          </ul>
        </template>
      </song-addition>

    </div>
  </div>
</template>

<script>
import SongDesc from 'views/song/SongDesc'
import SongList from 'views/song/SongList'
import SongAddition from 'views/song/SongAddition.vue'

import { getAlbumMsg } from 'network/album'
import {getArtistAlbums} from 'network/artist'

export default {
  name: 'AlbumMsg',
  components: { SongDesc, SongList, SongAddition },
  data() {
    return{
      album: {},
      songs: [],
      hotAlbums: []
    };
  },
  watch: {
    '$route.query.id': function() {
      this.getAlbumMsgFunc(this.$route.query.id)
    }
  },
  created() {
  },

  mounted() {
    this.getAlbumMsgFunc(this.$route.query.id);
  },

  methods: {
    getAlbumMsgFunc(id) {
      getAlbumMsg(id).then(res => {
        this.album = res.album
        this.songs = res.songs
        getArtistAlbums(res.album.artist.id, 5, 0).then(res => {
          this.hotAlbums = res.hotAlbums
        })
      })
    }
  },
};
</script>

<style lang="scss" scoped>
#albumMsg {
  display: flex;
  width: 980px;
  margin: 0 auto;
  background: #fff;
  border-right: 1px solid #dfdfdf;
  border-left: 1px solid #dfdfdf;
  .content {
    width: 640px;
    padding: 47px 30px 40px 39px;
    border-right: 1px solid #dfdfdf;
    .sign {
      background-position: 0 -186px;
    }
    .d-message {
      margin-top: 15px;
      a {
        span {
          color: #0c73c2;
        }
      }
      p {
        margin: 10px 0;
      }
    }
    .introduce {
      margin-top: 20px;
      p {
        padding-top: 10px;
        line-height: 20px;
        text-indent: 2em;
        white-space: pre-wrap;
        max-height: 188px;
        overflow: hidden;
        text-overflow: ellipsis;
        
      }
    }
  }
  .sr-c {
    flex: 1;
    ul {
      li {
        display: flex;
        padding-bottom: 10px;
        align-items: center;
        img {
          width: 50px;
          height: 50px;
        }
        div {
          margin-left: 10px;
          a {
            font-size: 14px;
            &:hover {
              text-decoration: underline;
            }
          }
          p {
            padding: 7px 0;
            color: #666;
          }
        }
      }
    }
  }
}
</style>