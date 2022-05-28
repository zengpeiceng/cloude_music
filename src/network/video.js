import { request } from "utils/main";
// 获取相关视频 
export function getRealtedVideo(id) {
  return request({
    url: '/related/allvideo',
    params: {
      id
    }
  })
}

// 视频详情，包括封面等
export function getVideoDetails(id) {
  return request({
    url: '/video/detail',
    params: {
      id
    }
  })
}
// 获取视频点赞转发评论数数据
export function getVideoOthersInfo(vid) {
  return request({
    url: '/video/detail/info',
    params: {
      vid
    }
  })
}
// 获取视频播放地址
export function getVideoUrl(id) {
  return request({
    url: '/video/url/',
    params: {
      id
    }
  })
}

// 获取 mv 数据
/**
 * 说明 : 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 
 * 可获取对应 MV 数据 , 数据包含 mv 名字 , 歌手 , 发布时间 , mv 视频地址等数据 , 
 * 其中 mv 视频 网易做了防盗链处理 , 可能不能直接播放 , 需要播放的话需要调用 ' mv 地址' 接口
 */
export function getMVDetail(mvid) {
  return request({
    url: '/mv/detail',
    params: {
      mvid
    }
  })
}
// 获取 mv 点赞转发评论数数据
export function getMVOtherInfo(mvid) {
  return request({
    url: '/mv/detail/info',
    params: {
      mvid
    }
  })
}
// mv 地址
export function getMVUrl(id) {
  return request({
    url: '/mv/url',
    params: {
      id
    }
  })
}
