<template>
  <div class="home">
    <a-button v-on:click="loginOut">退出</a-button>
  </div>
</template>

<script>
export default {
  methods: {
    loginOut() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
