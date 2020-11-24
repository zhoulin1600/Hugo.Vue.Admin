<template>
  <a-config-provider :locale="zhCN">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

// import { AppDeviceEnquire } from '@/utils/mixin'

export default {
  // name
  // components
  // props
  // data
  // created
  // methods
  // mounted
  // computed
  // watch
  // mixins: [AppDeviceEnquire],
  data() {
    return {
      zhCN
    }
  },
  mounted() {
  }
}
</script>

<style lang="less">
#app {
  height: 100%;
}
</style>
