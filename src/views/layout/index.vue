<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <!-- 边侧菜单 -->
      <side-menu />
    </a-layout-sider>
    <a-layout>
      <AppHeader :collapsed="collapsed" @toggle="toggle" />
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <home-index />
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        <AppFooter />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import { CONTENT_WIDTH_TYPE, SIDEBAR_TYPE, TOGGLE_MOBILE_TYPE } from '@/store/mutation-types'
import defaultSettings from '@/config/defaultSettings'
import SideMenu from '@/components/AppMenu/SideMenu'
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'
import HomeIndex from '../Home'

export default {
  name: 'LayoutIndex',
  components: {
    SideMenu,
    AppHeader,
    AppFooter,
    HomeIndex
  },
  data() {
    return {
      collapsed: false,
      title: defaultSettings.title,
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
  watch: {
    // sidebarOpened(val) {
    //   this.collapsed = !val
    // }
  },
  created() {
    // 处理侧栏收起状态
    this.$watch('collapsed', () => {
      this.$store.commit(SIDEBAR_TYPE, this.collapsed)
    })
    this.$watch('isMobile', () => {
      this.$store.commit(TOGGLE_MOBILE_TYPE, this.isMobile)
    })
  },
  mounted() {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
  },
  methods: {
    toggle() {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style lang="less" scoped>
#components-layout-demo-custom-trigger {
  margin: 0 auto;
  height: 100%;
}
#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
