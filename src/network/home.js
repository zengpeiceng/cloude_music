import { request } from "utils/main";

// 获取banner
export function getBannerUrl() {
  return request({
    url: 'banner',
    params: {
      type: 0
    }
  })
}

// 获取热门推荐歌单
export function getLivelySongList() {
  return request({
    url: '/personalized'
  })
}

// 获取首页榜单内容
export function getTopList() {
  return request({
    url: '/toplist'
  })
}
