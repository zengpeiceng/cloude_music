<template>
  <div id="follows">
    <div class="content">
      <h2>我的歌手</h2>
      <ul>
        <li v-for="(item, index) in follows">
          <dl>
            <dt><router-link :to="`/artist?id=${item.id}`"><img :src="item.picUrl" alt=""></router-link></dt>
            <dd>
              <router-link :to="`/artist?id=${item.id}`">{{ item.name }}</router-link>
              <p>
                <span>{{ item.albumSize }}个专辑</span>
                <span>{{ item.mvSize }}个MV</span>
              </p>
            </dd>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Empty from 'views/empty/Empty'
import { getFollowers } from 'network/user'
import { mapState } from 'vuex'
 export default {
   name: 'MyMusicArtists',
   components: { Empty },
   data() {
     return {
       follows: []
     }
   },
   created() {
      getFollowers(this.userInfo.userId).then(res => {
        this.follows = res.data
      })
   },
   computed: {
     ...mapState('UserModule', ['userInfo'])
   }

};

</script>
<style lang="scss"  scoped>
#follows {
  .content {
    padding: 40px;
    h2 {
      padding-bottom: 10px;
      border-bottom: 2px solid #c20c0c;
    }
    ul {
      margin-top: 10px;
      li {
        margin: 5px 0;
        dl {
          display: flex;
          justify-content: left;
          dt {
            width: 80px;
            height: 80px;
            img {
              height: 100%;
              width: 100%;
            }
          }
          dd {
            flex: 1;
            padding-left: 10px;
            padding-top: 10px;
            a {
              font-size: 14px;
              color: #000;
              font-weight: 700;
              &:hover {
                text-decoration: underline;
              }
            }
            p {
              margin-top: 15px;
              span {
                color: #666;
                padding-right: 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>