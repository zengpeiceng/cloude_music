import { request } from "utils/main";
// 获取歌单所有歌曲
export function getSheetSongs(id, limit) {
  return request({
    url: '/playlist/track/all',
    params: {
      id,
      limit,
      offest: 0
    }
  })
}

// 获取所有榜单
export function getTopLists() {
  return request({
    url: '/toplist'
  })
}

// 获取歌单详情包括歌单播放量等
export function getListDetails(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}
// 获取歌曲详情包括时长等
export function getSongDetails(ids) {
  return request({
    url: '/song/detail',
    params: {
      ids
    }
  })
}

// 获取歌曲url
export function getSongUrl(id) {
  return request({
    url: '/song/url',
    params: {
      id
    }
  })
}

// 获取歌词
export function getLyric(id) {
  return request({
    url: 'lyric',
    method: 'get',
    params: {
      id
    }
  })
}