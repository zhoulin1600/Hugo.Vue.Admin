import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { VueAxios } from './utils/axios' // axios
import './global.less' // 全局样式
import './utils/antd' // ant-design-vue

Vue.config.productionTip = false

Vue.use(VueAxios)
console.log(process.env)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
