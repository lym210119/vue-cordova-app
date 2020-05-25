<template>
  <div class="about">
    <h1>This is an about page</h1>
    <van-button type="default" @click="record">录音</van-button>
    <van-button type="primary" @click="stop">停止</van-button>
    <van-button type="info" @click="play">播放</van-button>
    <van-button type="warning" @click="pause">暂停</van-button>
    <van-button type="danger" @click="upload">上传</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mediaRec: null,
      filePath: null,
    }
  },
  computed: {
    src() {
      return new Date().getTime() + '.m4a'
    },
    // filePath() {
    //   if (this.$device.platform === 'iOS') {
    //     return this.$cordova.file.tempDirectory
    //   } else {
    //     return this.$cordova.file.externalRootDirectory
    //   }
    // },
  },
  mounted() {},
  methods: {
    mediaSuccess() {
      console.log('Media成功')
    },
    mediaError(err) {
      console.log(err)
    },
    play() {
      this.$toast('开始播放')
      this.mediaRec = new this.$Media(
        this.filePath,
        // success callback
        function() {
          console.log('playAudio():Audio Success')
        },
        // error callback
        function(err) {
          console.log('playAudio():Audio Error: ' + err)
        },
      )
      this.mediaRec.play()
    },
    pause() {
      this.$toast('暂停')
      this.mediaRec.pause()
    },
    record() {
      this.$toast('开始录音')
      console.log(this.filePath)
      console.log(this.$Media)
      this.mediaRec = new this.$Media(
        this.src,
        this.mediaSuccess,
        this.mediaError,
      )
      // 启动录制音频
      this.mediaRec.startRecord()
    },
    stop() {
      this.$toast('停止录音')

      this.mediaRec.stopRecord()
      this.filePath = this.mediaRec.getCurrentPosition(function() {})
      console.log(this.filePath)
    },
    upload() {
      alert(this.mediaRec.getCurrentPosition)
      this.filePath = this.mediaRec.getCurrentPosition()
    },
  },
}
</script>
