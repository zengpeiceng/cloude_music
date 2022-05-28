// 配置路由相关的信息
import Vue from "vue";
import VueRouter from "vue-router";

// 1. 通过Vue.use(安装插件)
Vue.use(VueRouter)

// 2. 创建VueRouter 对象
const routes = [
  {
    path: '/',
    component: () => import('components/home/Home'),
    children:[
      {
        path: '/',
        component: () => import('components/home/homeChild/Index')
      },
      {
        path: '/discover/playlist',
        component: () => import('components/discover/PlayList'),
      },
      {
        path: '/discover/artist',
        component: () => import('components/discover/Artist'),
        children: [
          {
            path: '/discover/artist/cat',
            component: () => import('components/discover/childCpn/CenterArtistList')
          }
        ]
      },
      {
        path: '/discover/toplist',
        component: () => import('components/discover/TopPlayList'),
      },
    ]
  },
  {
    path: '/mymusic',
    component: () => import('components/my-music/MyMusic'),
    children: [
      {
        path: '/mymusic/music/artist',
        component: () => import('components/my-music/childCpn/MyMusicArtists')
      },
      {
        path: '/mymusic/music/playlist',
        component: () => import('components/my-music/childCpn/MyPlayList'),
      },
      {
        path: '/mymusic/music/rideo',
        component: () => import('components/my-music/childCpn/MyRideo')
      }
    ]
  },
  {
    path: '/friends',
    component: () => import('components/concern_friends/ConcernFriends')
  },
  {
    path: '/search',
    component: () => import('components/search/SearchEngines'),
  },
  {
    path: '/playlist',
    component: () => import('components/discover/SongDetail')
  },
  {
    path: '/user/home',
    component: () => import('components/user/ProfileMsg'),
  },
  {
    path: '/user/songs/rank',
    component: () => import('components/user/childCpn/PlayRecordRank')
  },
  {
    path: '/video',
    component:() => import('components/video/Video')
  },
  {
    path: '/mv',
    component: () => import('components/video/MV')
  },
  {
    path: '/artist',
    component: () => import('components/artist/ArtistMsg'),
    children: [
      {
        path: '/artist/desc',
        component: () => import('components/artist/childCpn/ArtistIntroduction')
      },
      {
        path: '/artist/album',
        component: () => import('components/artist/childCpn/AlbumList')
      },
      {
        path: '/artist/mv',
        component: () => import('components/artist/childCpn/MVList')
      },

    ]
  },
  {
    path: '/song',
    component: () => import('views/song/SongLyric')

  },
  {
    path: '/album',
    component: () => import('components/album/AlbumMsg'),
  }
]
const router = new VueRouter({
  routes,
  // mode: 'history'
})

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
// 3. 将router对象传入到Vue实例
export default router
