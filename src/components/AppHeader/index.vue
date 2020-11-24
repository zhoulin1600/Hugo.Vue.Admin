<template>
  <transition name="showHeader">
    <div class="header-animat">
      <a-layout-header
        :style="{ padding: '0', background: '#fff' }"
      >
        <div class="header">
          <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggle" />
          <span>导航面包屑</span>
          <HeaderBar />
        </div>
      </a-layout-header>
    </div>
  </transition>
</template>

<script>
import { baseMixin } from '@/store/app-mixin'
import HeaderBar from './HeaderBar'

export default {
  name: 'AppHeader',
  components: {
    HeaderBar
  },
  mixin: [baseMixin],
  props: {
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    toggle() {
      this.$emit('toggle')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../index.less';

.showHeader-enter-active {
  transition: all 0.25s ease;
}
.showHeader-leave-active {
  transition: all 0.5s ease;
}
.showHeader-enter, .showHeader-leave-to {
  opacity: 0;
}

.header-animat {
  position: relative;
  z-index: @ant-global-header-zindex;
}

.header {
  height: 64px;
  padding: 0 15px 0 0;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: relative;
}
// toggle
.trigger {
  font-size: 20px;
  line-height: 64px;
  padding: 0 15px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    background: rgba(0, 0, 0, 0.035);
  }
}
</style>
