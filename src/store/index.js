import Vue from 'vue'
import vuexAlong from 'vuex-along'
import Vuex from 'vuex'
import vueMain from '../main';


Vue.use(Vuex)
import { getSheetSongs, getSongUrl, getSongDetails } from 'network/songSheetApi';
import { getAlbumMsg } from 'network/album'

import { collectOperate, deleteSheet ,getUserCreateAudios, getUserSongSheets, createSheet, addToSheet} from 'network/user'
// 音乐播放器
const PlayerModule = {
  namespaced: true,
  state: {
    // 控制音频进度条的slider对象
    audioSlider: {
      sliderVal: 0, // 这个对接当前时长。
      sliderMax: 0, // 这个对接总时长。
    },
    player: {
      index: 0, //当前播放的音乐素质索引
      play: false, //播放状态，true为正在播放
      volume: 1, // 音量(默认)
      audioBox: undefined,
      songs: [
      ],
      duration: 0, // 总时长
      currentTime: 0, // 当前时长
      flag: false,  // 控制音量slider的显示与隐藏
      musicImg: '',
    }
  },
  mutations: {
    init(state, {audioBox}) {
      // audioBox：绑定audio对象
      state.player.audioBox = audioBox;
      // audio的音量，初始/最大为1，步长为0.1
      state.player.audioBox.volume = state.player.volume; 
      if(state.player.songs.length != 0) {
        state.audioSlider.sliderMax = state.player.songs[state.player.index].dt
      }else {
        state.audioSlider.sliderMax = 1
      }
      state.player.audioBox.onerror = function() {
        state.player.play = false
        state.player.audioBox.pause();
        console.log('加载出错！')
      }
    },
    updateTime(state) { // 更新时间
      const tTime = state.player.audioBox.duration // 音频总时长
      const cTime = state.player.audioBox.currentTime // 音频当前时长
      let total
      cTime ? total = {
        min: Math.floor(tTime / 60).toString().padStart(2, '0'),
        sec: Math.floor(tTime % 60).toString().padStart(2, '0')
      } : total = {
        min: '00',
        sec: '00'
      }
      let current = {
        min: Math.floor(cTime / 60).toString().padStart(2, '0'),
        sec: Math.floor(cTime % 60).toString().padStart(2, '0')
      }
      state.player.duration = `${total.min}:${total.sec}`  // 总时长格式化为 MM:SS格式
      state.player.currentTime = `${current.min}:${current.sec}`  //进度条 格式化为 MM:SS格式

      // 控制音频slider的进度条 和 audio对象audioBox绑定
      state.audioSlider.sliderMax = state.player.audioBox.duration;
      // 值为xx.xxxxx 需要取整
      state.audioSlider.sliderVal = Math.floor(state.player.audioBox.currentTime)
      if(state.player.songs.length != 0) {state.player.musicImg = state.player.songs[state.player.index].al.picUrl}
    },
    formatTooltip(state, val) {
      // 格式化毫秒数，由于组件提示为纯数字，所以这里需要将数字转化为我们所需要的的格式，string类型的。'03:45',
      // const time = this.formatTime(val)
      let time
      val ? time = {
        min: Math.floor(time / 60).toString().padStart(2, '0'),
        sec: Math.floor(time % 60).toString().padStart(2, '0')
      } : time = {
        min: '00',
        sec: '00'
      }
      return `${time.min}:${time.sec}`
    },
    // 控制音频slider change事件触发
    spliderSelect(state) {
      // 滑块松动后触发。更新当前时长，
      // 时长发生变动会init里的方法进行更新数据]
      if(state.player.audioBox)
        state.player.audioBox.currentTime = state.audioSlider.sliderVal
    },
    // 切播
    musicPlay(state, operate) {
      if(state.player.songs.length != 0) {
        switch (operate) {
          case 'pre':
            // 如果不是第一首，切换上一首
            if (state.player.index - 1 != -1) {
              state.player.index -= 1;
            } else {
              // 为第一首，点击上一首时，切换到最后一首
              state.player.index = state.player.songs.length -1;
            }
            state.player.play = true;
            break;
          case 'play':
            state.player.play = !state.player.play;
            break;
          case 'next':
            if (state.player.songs[state.player.index + 1]) {
              state.player.index += 1;
            } else {
              state.player.index = 0;
            }
            state.player.play = true;
            break;
        }
        state.player.play ? state.player.audioBox.play():state.player.audioBox.pause();
      }
    },
    // 调节音量
    adjustVolume(state) {
      state.player.audioBox.volume = state.player.volume
    },
    // 更新 Index 当前播放的歌曲的index
    updateCurrIndex(state, index) {
      if(index != undefined)
        state.player.index = index
    },
    // 歌单的全部歌曲添加到播放列表（播放）
    setSongs(state, songList) {
      state.player.songs = songList
      state.player.index = 0
    },
    setAudioBoxSrc(state, {src, status}) {
      state.player.audioBox.src = src;
      if(status != 'initial') {
        state.player.play = true
        setTimeout(() => {
          state.player.audioBox.play();
        })
      }
    },
    // 单个歌曲添加到播放列表
    pushSong(state, songItem) {
      let flag = false;
      // 播放列表中有就不添加了
      for(let i = 0; i < state.player.songs.length; i++) {
        if(state.player.songs[i].id === songItem.id)
          flag = true
      }
      if(!flag)
        state.player.songs.push(songItem);
    },
    // 清空播放列表
    removeSongs(state) {
      state.player.songs = []
      state.player.audioBox.pause();
      state.player.play = false
      state.player.audioBox = {
        src: '',
        duration: 0,
        currentTime: 0
      }
    }
  },
  actions: {
    // 获得歌曲列表
    getSongList({ commit, dispatch }, {songId, type}) {
      // 专辑与歌单的请求列表地址不同
      if(type === 'playlist') {
        getSheetSongs(songId).then(res => { // 是歌单播放全部
          if(res.code === 200) {
            commit('setSongs', res.songs)
            dispatch('getSongUrlAct', 0)
          }
        })
      }else if(type === 'album') {
        getAlbumMsg(songId).then(res => {   // 是专辑播放全部
          if(res.code === 200) {
            commit('setSongs', res.songs)
            dispatch('getSongUrlAct', 0)
          }
        })
      }
    },
     // 获得歌曲URL
    getSongUrlAct({ state, commit }, { songItem,status}) {
      // 单击某个歌单中的歌曲播放按钮，添加到播放列表中（有两种情况）
      // 1.播放列表中已有该歌曲，直接播放
      // 2.播放列表没有该歌曲，添加到播放列表，播放
      var currIndex = 0;
      if(songItem != undefined ) {
        const songs = state.player.songs
        let k = 0;
        for(; k < songs.length; k++) {  // 判断播放列表中是否已有该歌曲，没有则添加，有则不添加
          if(songs[k].id == songItem) {
            currIndex = k; // 该歌曲已在播放列表中，获取该歌曲在播放列表的位置
            break;
          }
        }
        if(k >= songs.length) {  // 播放列表中无该歌曲
          getSongDetails(songItem).then(res => {
            commit('pushSong', res.songs[0])// 将该歌曲添加到播放列表的末尾
            currIndex = state.player.songs.length - 1;   
          })
        }
      }
      if(state.player.songs.length != 0) {
        setTimeout(() => {
          // 这里commit 可能会先执行，setTimeout等前面的先执行
          commit('updateCurrIndex', currIndex) // 更新 Index 当前播放的歌曲的index 
          const id = state.player.songs[currIndex].id
            getSongUrl(id).then(res => {
              commit('setAudioBoxSrc', {src:res.data[0].url, status})
            })
        }, 500) 
      }
    },
  },
}
// 用户
const UserModule = {
  namespaced: true,
   state: {
    userInfo: {
      userId: 0,
      avatarUrl: '',
      nickname: '',
      gender: 1,
      birthday: '',
      signature: '' // 签名
    },
    userState: {
      isLogin: false,
      cookie: ''  
    },
    loginBox: {
      isShowLoginDialog: false
    }
   },
   mutations: {
    //  用户登录后设置用户信息
    setUserInfo(state, {userInfo}) {
      state.userInfo = userInfo
    },
    // 用户登录后设置登录状态和cookie
    setUserState(state, {userState}) {
      if(userState) 
        state.userState = userState
    },
    // 退出登录
    logout(state) {
      state.userState = {isLogin: false, cookie: ''};
      state.userInfo  =  {
        userId: 0,
        avatarUrl: '',
        nickname: '',
        gender: 1,
        birthday: '',
        signature: '' // 签名
      }
    },
    // 显示登录框
    showDialog(state) {
      state.loginBox.isShowLoginDialog = true
      // console.log(state.loginBox.isShowLoginDialog);
    },
    // 隐藏登录框
    hiddenDialog(state) {
      state.loginBox.isShowLoginDialog = false
    }
   },
   actions: {}
}
// 歌单
const MySheets = {
  namespaced: true,
  state: {
    createdMyList: [],
    myCollections: [],
    isShowDialog: false, // 是否显示添加到歌单的对话框
    song: {}
  },
  mutations: {
    // 设置我创建的歌单，我收藏的歌单
    setMySheets(state, {myPlayList, myCollect}) {
      state.createdMyList = myPlayList
      state.myCollections = myCollect
    },
    // 控制添加到歌单对话框的显示隐藏
    showDialog(state, song) {
      state.isShowDialog = true
      if(song) {
        state.song = song
      }
    },
    hiddenDialog(state) {
      state.isShowDialog = false
    }
  },
  actions: {
    // 请求我的歌单：包括创建的歌单createdMyList、收藏的歌单myCollections
    getUserSongSheetsFunc({commit, rootState}) {
      let myPlayList = []
      let myCollect = []
      const uid = rootState.UserModule.userInfo.userId
      getUserSongSheets(uid).then(res => {
        const playList = res.playlist
        for(let i = 0; i < playList.length; i++) {
          if(playList[i].creator.userId == uid) {
            myPlayList.push(playList[i])
          }else{
            myCollect.push(playList[i])
          }
        }
        commit('setMySheets', {myPlayList, myCollect})
      })
    },
    // 新建歌单
    createSheetFunc({dispatch}, name) {
      createSheet(name).then(res => {
        dispatch('getUserSongSheetsFunc')
        return res.id
      })
    },
    // 收藏歌单
    collectSheetFunc({dispatch}, id) {
      collectOperate(id, 1).then(res => {
        if(res.code === 200) {
          vueMain.$message({type: 'success', message: '收藏成功'})
          dispatch('getUserSongSheetsFunc')
        }
      })
    },
    // 添加歌曲到歌单
    addToSheetFunc({state, commit}, {op, pid}) {
      const tracks = state.song.id
      addToSheet(op, pid, tracks).then(res => {
        if(res.status === 200) {
          vueMain.$message({
            type: 'success',
            message: '收藏成功'
          })
          commit('hiddenDialog')
        }
      })
    },
    // 删除歌单
    deleteSheetFunc({dispatch}, item) {
      vueMain.$confirm('确定删除歌单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSheet(item.id).then(res => {
          if(res.code === 200) {
            vueMain.$message({
              type: 'success',
              message: '删除成功!'
            });
            dispatch('getUserSongSheetsFunc');
          }
        })
      })
    },
    // 取消收藏歌单
    cancleCollectFunc({dispatch}, item) {
      vueMain.$confirm('确定取消收藏歌单?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
         collectOperate(item.id, 2).then(res => {
           console.log(res);
           if(res.code === 200) {
             vueMain.$message({
               type: 'success',
               message: '已取消收藏!'
             });
              dispatch('getUserSongSheetsFunc');
           }
         })
       })
    },
  }
}
export default new Vuex.Store({
  modules: {
    PlayerModule,
    UserModule,
    MySheets
  },
  plugins: [
    vuexAlong({
      name: "music-vuex-along", // 设置保存的集合名字，避免同站点下的多项目数据冲突
      local: {
        list: ["PlayerModule", 'UserModule'],
      },
      session: {
        list: ['MySheets'] 
      }
    })
  ]
})