import { request } from "utils/main";

// 获取歌单分类标签
export function getCatList() {
  return request({
    url: 'playlist/catlist',
  })
}
export function getTopPlayList(playlist) {
  return request({
    url: '/top/playlist',
    params: {
      order: playlist.order,
      cat: playlist.cat,
      limit: playlist.limit,
      offset: playlist.offset
    }
  })
}
// 分页展示
// cat 类别，limit 每页显示条数 offset 请求第几页数据
export function paginationDisplay(playlist) {
  return request.post({
    url: '/top/playlist',
    params: {
      order: playlist.order,
      cat: playlist.cat,
      limit: playlist.limit,
      offset: playlist.offset
    }
  })
}

/**
 * 热门歌手
说明 : 调用此接口 , 可获取热门歌手数据
可选参数 : limit: 取出数量 , 默认为 50
offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
接口地址 : /top/artists
调用例子 : /top/artists?offset=0&limit=30
 * 
 */
export function artistTop(limit, offset) {
  return request({
    url: '/top/artists',
    params: {
      limit,
      offset
    }
  })
}
/**
 * 歌手分类列表
说明 : 调用此接口,可获取歌手分类列表
可选参数 :
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 initial: 按首字母索引查找参数,如 /artist/list?type=1&area=96&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传 0
接口地址 : /artist/list
调用例子 : /artist/list?type=1&area=96&initial=b /artist/list?type=2&area=2&initial=b
type: -1:全部 1:男歌手  2:女歌手  3:乐队
area: -1:全部 7华语 96欧美  8:日本  16韩国  0:其他
 * 
 */
export function getArtists(type, area, initial, limit = 90) {
  return request({
    url: '/artist/list',
    params: {
      type,
      area,
      initial,
      limit
    }
  })
}