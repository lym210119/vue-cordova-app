<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  // mounted() {
  //   console.log(this.$Media)
  //   function mediaSuccess(e) {
  //     console.log(e)
  //     // console.log('Me123呃呃呃dia成功')
  //   }

  //   function mediaError(err) {
  //     console.log(err)
  //   }
  //   var src = '1.m4a'
  //   var mediaRec = new this.$Media(src, mediaSuccess, mediaError)
  //   // 启动录制音频
  //   mediaRec.startRecord()
  //   // 10秒后停止录制
  //   var recTime = 0
  //   var recInterval = setInterval(function() {
  //     recTime = recTime + 1
  //     if (recTime >= 10) {
  //       clearInterval(recInterval)
  //       mediaRec.stopRecord()
  //       alert('录制完成')
  //     }
  //   }, 1000)
  // },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
