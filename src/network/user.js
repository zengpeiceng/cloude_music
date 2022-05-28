import { request } from "utils/main";

// 获取账号信息
export function getUserAccountMsg(cookie) {
  return request({
    url: '/user/account',
    params: {
      cookie
    }
  })
}

// 获取用户播放记录：登录后调用此接口 , 传入用户 id, 可获取用户播放记录
// 必选参数 : uid : 用户 id
// 可选参数 : type : type=1 时只返回 weekData, type=0 时返回 allData
// 接口地址 : /user/record
export function getPlayRecord(uid, type) {
  return request({
    url: '/user/record',
    params: {
      uid,
      type
    }
  })
}

// 获取用户信息，包括头像，个人介绍，性别等
export function getUserMsg(uid) {
  return request({
    url: '/user/detail',
    params: {
      uid
    }
  })
}
// 获取用户创建的电台 
export function getUserCreateAudios(uid) {
  return request({
    url: '/user/audio',
    params: {
      uid
    }
  })
}

// 获取用户的歌单
export function getUserSongSheets(uid, limit=1000) {
  return request({
    url: '/user/playlist',
    params: {
      uid,
      limit
    }
  })
}
// 获取用户关注的歌手 
export function getFollowers(id) {
  return request({
    url: '/artist/sublist',
    params: {
      id
    }
  })
}
// 获取用户关注列表包括歌手、用户、音乐人等
export function getUserFollows(uid) {
  return request({
    url: '/user/follows',
    params: {
      uid
    }
  })
}

// 关注/取消关注用户
/**
 * id : 用户 id
 * t : 1为关注,其他为取消关注
 * 调用例子 : /follow?id=32953014&t=1
 */
export function follow(id, t) {
  return request({
    url: '',
    params: {
      id,
      t
    }
  })
}

// 新建歌单 name: 歌单名
export function createSheet(name) {
  return request({
    url: '/playlist/create',
    params: {
      name
    }
  })
}

// 删除歌单
export function deleteSheet(id) {
  return request({
    url: '/playlist/delete',
    params: {
      id
    }
  })
}

// 收藏/取消收藏歌单 t : 类型,1:收藏,2:取消收藏 id : 歌单 id
export function collectOperate(id, t) {
  return request({
    url: '/playlist/subscribe',
    params: {
      t,
      id
    }
  })
}
/**
 * 
 * 对歌单添加或删除歌曲
说明 : 调用此接口 , 可以添加歌曲到歌单或者从歌单删除某首歌曲 ( 需要登录 )
必选参数 :
op: 从歌单增加单曲为 add, 删除为 del
pid: 歌单 id 
tracks: 歌曲 id,可多个,用逗号隔开
接口地址 : /playlist/tracks
调用例子 : /playlist/tracks?op=add&pid=24381616&tracks=347231 ( 对应把歌曲添加到 ' 我 ' 的歌单 , 测试的时候请把这里的 pid 换成你自己的, id 和 tracks 不对可能会报 502 错误)
 */
export function addToSheet(op, pid, tracks) {
  return request({
    url: '/playlist/tracks',
    params: {
      op,
      pid,
      tracks
    }
  })
}