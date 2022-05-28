import { request } from "utils/main";
// 获取歌手描述
export function getArtistDesc(id) {
  return request({
    url: '/artist/desc',
    params: {
      id
    }
  })
}
// 获取歌手详情
export function getArtistDetail(id) {
  return request({
    url: '/artist/detail',
    params: {
      id
    }
  })
}
// 获取歌手单曲：传入歌手 id, 可获得歌手部分信息和热门歌曲
export function getArtistSongs(id) {
  return request({
    url: '/artists',
    params: {
      id
    }
  })
}
// 获取歌手MV：调用此接口 , 传入歌手 id, 可获得歌手 mv 信息 , 具体 mv 播放地址
export function getArtistMVs(id, limit, offset) {
  return request({
    url: '/artist/mv',
    params: {
      id,
      limit,
      offset
    }
  })
}
// 获取歌手专辑, limit: 取出数量 , 默认为 50,offset 用于分页
export function getArtistAlbums(id, limit, offset) {
  return request({
    url: '/artist/album',
    params: {
      id,
      limit,
      offset
    }
  })
}
// 获取相似歌手
export function getArtistSimi(id) {
  return request({
    url: '/simi/artist',
    params: {
      id
    }
  })
}

// 获取热门歌手（在没有相似的歌手时展示热门歌手）
export function getArtistHot(limit = 8, offset = 0) {
  return request({
    url: '/top/artists',
    params: {
      offset,
      limit
    }
  })
}