/* 用户相关请求模块 */
import Axios from '@/utils/axios'

const api = {
  Login: 'Account'
}

// 管理后台用户登录
export const apiLogin = (data) => {
  return Axios({
    method: 'post',
    url: api.Login,
    data: data
  })
}
