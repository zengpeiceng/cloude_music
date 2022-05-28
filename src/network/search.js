import { request } from "utils/main";

// 搜索 
// keywords 搜索的关键词，type 搜索的类别，如单曲，歌手，专辑，用户等
// limit 每页显示条数 offset 请求第几页数据
export function getSearchMsg(keywords, type, limit, offset) {
  return request({
    url: '/cloudsearch',
    params: {
      keywords,
      type,
      limit,
      offset
    }
  })
}
// 搜索推荐 keywords 搜索的关键字
export function getSearchSug(keywords) {
  return request({
    url: '/search/suggest',
    params: {
      keywords
    }
  })
}