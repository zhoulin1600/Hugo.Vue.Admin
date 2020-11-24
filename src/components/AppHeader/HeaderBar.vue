<template>
  <div class="toolbar">
    <span class="open action ant-dropdown-link user-dropdown-menu" @click="fullScreen">
      <a-icon style="font-size: 16px" type="fullscreen" v-if="!isFullScreen" />
      <a-icon style="font-size: 16px" type="fullscreen-exit" v-else />
    </span>
    <span class="open action ant-dropdown-link user-dropdown-menu" @click="toggle">
      <!-- <a-icon type="setting" style="font-size: 16px" /> -->
      <setting-drawer :settings="settings" @change="handleSettingChange" />
    </span>
    <a-button v-on:click="loginOut">退出</a-button>
  </div>
</template>

<script>
import { SettingDrawer, updateTheme } from '@ant-design-vue/pro-layout'
import defaultSettings from '@/config/defaultSettings'
import { CONTENT_WIDTH_TYPE } from '@/store/mutation-types'
import Token from '@/cache/token'
export default {
  name: 'HeaderBar',
  components: {
    SettingDrawer
  },
  data() {
    return {
      isFullScreen: false,
      settings: {
        // 布局类型
        layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
        // CONTENT_WIDTH_TYPE
        contentWidth: defaultSettings.layout === 'sidemenu' ? CONTENT_WIDTH_TYPE.Fluid : defaultSettings.contentWidth,
        // 主题 'dark' | 'light'
        theme: defaultSettings.navTheme,
        // 主色调
        primaryColor: defaultSettings.primaryColor,
        fixedHeader: defaultSettings.fixedHeader,
        fixSiderbar: defaultSettings.fixSiderbar,
        colorWeak: defaultSettings.colorWeak,

        hideHintAlert: false,
        hideCopyButton: false
      }
    }
  },
  methods: {
    // 全屏
    fullScreen() {
      const element = document.documentElement
      if (this.isFullScreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.isFullScreen = !this.isFullScreen
    },
    handleSettingChange({ type, value }) {
      console.log('type', type, value)
      type && (this.settings[type] = value)
      switch (type) {
        case 'contentWidth':
          this.settings[type] = value
          break
        case 'layout':
          if (value === 'sidemenu') {
            this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
          } else {
            this.settings.fixSiderbar = false
            this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fixed
          }
          break
      }
    },
    // 设置
    toggle() {
      this.$store.dispatch('ToggleThemed', true)
    },
    loginOut() {
      Token.delToken()
      this.$router.push('/login')
    }
  },
  mounted() {
    // first update color
    // TIPS: THEME COLOR HANDLER!! PLEASE CHECK THAT!!
    if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
      updateTheme(this.settings.primaryColor)
    }
  }
}
</script>

<style lang="less" scoped>
.toolbar {
  float: right;
}
.open {
  padding: 0 12px;
  display: inline-block;

  i {
    font-size: 24px;
    line-height: 64px;
  }
}
.action {
  cursor: pointer;
  padding: 0 10px;
  display: inline-block;
  transition: all 0.3s;
  color: rgba(0, 0, 0, 0.65);
  &:hover {
    background: rgba(0, 0, 0, 0.035);
  }

  .avatar {
    margin: 20px 8px 20px 0;
    color: #1890ff;
    background: hsla(0, 0%, 100%, 0.85);
    vertical-align: middle;
  }

  .icon {
    font-size: 16px;
    padding: 4px;
  }
}
</style>
