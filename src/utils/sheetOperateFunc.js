import vueMain from '../main';
import {collectOperate} from 'network/user'
export function collectSheet(id) {
  collectOperate(id, 1).then(res => {
    if(res.code === 200) {
      vueMain.$message({type: 'success', message: '收藏成功'})
    }
  })
}