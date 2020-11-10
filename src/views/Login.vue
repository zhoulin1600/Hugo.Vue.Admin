<template>
  <div class="login_container">
    <div class="login_box">
      <!-- logo区域 -->
      <div class="avatar_box">
        <img src="@/assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <a-form :form="form" class="login-form" @submit="handleSubmit">
        <a-form-item>
          <a-input
            v-decorator="[
              'username',
              {
                rules: [{ required: true, message: '请输入用户名!' }]
              }
            ]"
            placeholder="用户名"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input-password
            v-decorator="[
              'password',
              {
                rules: [{ required: true, message: '请输入密码!' }]
              }
            ]"
            type="password"
            placeholder="密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-form-button"> 登 录 </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleSubmit: function (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const { data: result } = await this.$http.post('Account', values)
          if (result.StatusCode !== 200) return this.$message.error(result.Message)
          this.$message.success(result.Message)
          // 将登录成功的 token 保存到客户端的 sessionStorage 中
          window.sessionStorage.setItem('token', result.Data.token)
          // 通过编程式导航跳转到后台主页
          this.$router.push('/home')
        }
      })
    }
  },
  beforeCreate: function () {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  }
}
</script>

<style lang="less" scoped>
.login_container {
  width: 100%;
  min-height: 100%;
  background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
  background-size: 100%;
  padding: 110px 0 144px;
  position: relative;

  .login_box {
    min-width: 300px;
    width: 450px;
    height: 300px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #fff;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 50px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      img {
        widows: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
  }

  .login-form {
    min-width: 300px;
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 0 30px;
    box-sizing: border-box;
  }
  .login-form-button {
    width: 100%;
    //   display: flex;
    //   justify-content: flex-end;
  }
}
</style>
