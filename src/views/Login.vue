<template>
  <div class="login">
    <van-nav-bar
      title="登录"
      fixed
      safe-area-inset-top
      z-index="9999"
      :style="`padding-top: ${this.$StatusBarHeight}px`"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="setting-o" size="18" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit">
      <div class="logo">
        <img alt="logo" src="@/assets/logo.png" />
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
      // logoSrc: require('../assets/logo.png'),
      username: '',
      password: '',
      actionsShow: false,
      actionsList: [],
    }
  },
  created() {
    // this.$StatusBar.backgroundColorByHexString('#f7f8fa')
    console.log(process.env.VUE_APP_DEBUG)
    // if (!process.env.VUE_APP_DEBUG) {
    //   this.logoSrc = 'img/logo.png'
    // }
  },
  methods: {
    onClickRight() {
      this.$router.push('/setting')
    },
    onSubmit(values) {
      if (!values.username.trim()) {
        this.$toast('请输入账号')
        return
      }
      let formData = new FormData()
      formData.append('username', values.username)
      formData.append('password', values.password)
      this.$http.login(formData).then(res => {
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
      let formData = new FormData()
      formData.append('compid', action.id)
      formData.append('username', this.username)
      formData.append('password', this.password)
      this.$http.loginCompany(formData).then(res => {
        this.actionsShow = false
        console.log('res: ', res)
        let userInfo = res.info
        userInfo.compid = action.id
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
  // height: 100%;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  padding-top: 100px;

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
