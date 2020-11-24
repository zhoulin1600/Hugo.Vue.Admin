import Axios from 'axios'
import TokenCache from '@/cache/token'

// 创建 axios 实例
const axios = Axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: parseInt(process.env.VUE_APP_API_TIME_OUT)
})

// 请求拦截器
axios.interceptors.request.use(config => {
  const token = TokenCache.getToken()
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器 - 在获取数据之前对数据做一些加工处理
axios.interceptors.response.use(result => {
  // 授权失败
  if (!result.data.Success && result.data.StatusCode === 401) {
    TokenCache.delToken()
    location.href = '/'
  }
  return result.data
}, error => {
  const result = { Success: false }
  if (error.message.includes('timeout')) {
    result.StatusCode = 408
    result.Message = '请求超时'
  } else {
    result.StatusCode = 500
    result.Message = '请求异常'
  }
  return Promise.resolve(result)
})

const VueAxios = {
  vm: {},
  install(vue, instance) {
    if (this.installed) return
    this.installed = true
    if (!instance) {
      console.log('You have to install axios')
      return
    }
    vue.axios = instance

    Object.defineProperties(vue.prototype, {
      axios: {
        get: function get() {
          return instance
        }
      },
      $http: {
        get: function get() {
          return instance
        }
      }
    })
  }
}

const installer = {
  vm: {},
  install(vue) {
    vue.use(VueAxios, axios)
  }
}

export default axios

export {
  installer as VueAxios,
  axios
}

// export default {
//   install(Vue) {
//     Object.defineProperty(Vue.prototype, '$http', { value: axios })
//     Object.defineProperty(Vue.prototype, '$rootUrl', { value: process.env.VUE_APP_API_BASE_URL })
//   }
// }
