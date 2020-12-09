<template>
  <div id="app">
    <!-- 使用动态的 transition name -->
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      transitionName: 'slide-left',
    }
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'

      // // cordova插件会定义一个StatusBar对象，当它只能在deviceready后才能使用
      // if (this.$cordova.platformId == 'android') {
      //   // 安卓需要特殊处理，参见 cordova 官方文档
      //   this.$StatusBar.overlaysWebView(true)
      // }
      // this.onDeviceReady()
    },
  },
  beforeCreate() {
    this.$StatusBar.overlaysWebView(true)
  },
  created() {
    // // 保证安卓第一次进入状态栏能覆盖webview
    // this.onDeviceReady()

    //在页面加载时读取sessionStorage里的状态信息
    if (localStorage.getItem('store')) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(localStorage.getItem('store')),
        ),
      )
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
  // methods: {
  //   onDeviceReady() {
  //     // 根据路由动态改变状态栏样式
  //     // 我给状态栏字体色为白色的路由都设置了一个路由元meta,属性 statusBarbackgroundColor 为1
  //     this.$route.meta.statusBarbackgroundColor
  //       ? this.$StatusBar.styleLightContent()
  //       : this.$StatusBar.styleDefault()
  //   },
  // },
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.75s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.child-view {
  position: absolute;
  transition: all 0.75s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
