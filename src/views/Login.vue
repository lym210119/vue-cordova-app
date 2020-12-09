<template>
  <div class="login">
    <van-nav-bar title="登录" fixed safe-area-inset-top z-index="9999" />
    <van-form @submit="onSubmit">
      <div class="logo">
        <img alt="logo" src="../assets/logo.png" />
      </div>
      <van-field
        v-model="username"
        name="username"
        label="账号"
        placeholder="用户名/手机号"
        :rules="[{ required: true, message: '请输入用户名/手机号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>

    <van-action-sheet
      v-model="actionsShow"
      :actions="actionsList"
      description="请选择公司"
      @select="onSelect"
    />
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      actionsShow: false,
      actionsList: [],
    }
  },
  created() {
    // this.$StatusBar.backgroundColorByHexString('#f7f8fa')
  },
  methods: {
    onSubmit(values) {
      if (!values.username.trim()) {
        this.$toast('请输入账号')
        return
      }
      this.$http.login(values).then(res => {
        // 判断是否为多公司
        if (!res.comparr) {
          let userInfo = res.info
          userInfo.compid = res.compid

          // 调用 Vuex
          this.$store.dispatch('login', userInfo).then(() => {
            this.$toast.success({
              message: res.msg || '登录成功！',
              forbidClick: true,
              onClose: () => {
                this.$router.push('/')
              },
            })
          })
        } else {
          this.actionsList = res.comparr.map(v => {
            return {
              name: v.compName,
              id: v.compId,
            }
          })

          this.actionsShow = true
        }
      })
    },
    onSelect(action) {
      let params = {
        compid: action.id,
        username: this.username,
        password: this.password,
      }
      this.$http.loginCompany(params).then(res => {
        this.actionsShow = false
        console.log('res: ', res)
        let userInfo = res.info
        userInfo.compid = params.compid
        this.$store.dispatch('login', userInfo).then(() => {
          this.$toast.success({
            message: res.msg,
            forbidClick: true,
            onClose: () => {
              this.$router.push('/')
            },
          })
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .logo {
    margin-bottom: 50px;
    text-align: center;
    img {
      width: 100px;
      border-radius: 50%;
    }
  }
}
</style>
