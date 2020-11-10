import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入全局样式
import './assets/css/global.css'

import axios from 'axios'

// ant-design-vue
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// 全局请求根路径
axios.defaults.baseURL = 'http://localhost:9000/Api/'
Vue.prototype.$http = axios

Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
