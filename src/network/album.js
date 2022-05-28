import { request } from 'utils/main'

export function getAlbumMsg(id) {
  return request({
    url: '/album',
    params: { id }
  })
}