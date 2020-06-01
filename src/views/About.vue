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
      fullPath: '',
      uploadUrl: 'http://192.168.10.208:8088/erp/api/api_audio',
    }
  },
  computed: {
    fileName() {
      return new Date().getTime() + '.m4a'
    },
    filePath() {
      if (this.$device.platform === 'iOS') {
        return this.$cordova.file.tempDirectory
      } else {
        return this.$cordova.file.externalRootDirectory
      }
    },
  },
  mounted() {
    console.log(this.fileName)
    console.log(this.filePath)
    this.fullPath = this.filePath + this.fileName
    console.log(this.fullPath)
  },
  methods: {
    mediaSuccess() {
      console.log('Media成功')
    },
    mediaError(err) {
      console.log(err)
    },
    record() {
      this.$toast('开始录音')
      console.log(this.fullPath)
      this.mediaRec = new this.$Media(
        this.fileName,
        this.mediaSuccess,
        this.mediaError,
      )
      // 启动录制音频
      this.mediaRec.startRecord()
    },
    stop() {
      this.$toast('停止录音')
      this.mediaRec.stopRecord()
      console.log(123)
      console.log(this.mediaRec.getCurrentPosition)
      // this.mediaRec.getCurrentPosition(
      //   position => {
      //     console.log(position)
      //   },
      //   err => {
      //     console.log(err)
      //   },
      // )
    },
    play() {
      this.$toast('开始播放')
      // this.mediaRec = new this.$Media(
      //   this.fileName,
      //   // success callback
      //   function() {
      //     console.log('playAudio():Audio Success')
      //   },
      //   // error callback
      //   function(err) {
      //     console.log(err)
      //   },
      // )
      this.mediaRec.play({
        playAudioWhenScreenIsLocked: true,
      })
    },
    pause() {
      this.$toast('暂停')
      this.mediaRec.pause()
    },

    upload() {
      console.log(this.fullPath)
      window.resolveLocalFileSystemURL(
        this.fullPath,
        dirEntry => {
          console.log(5666)
          console.log(dirEntry)
          dirEntry.file(file => {
            // const fileReader = new FileReader()
            // fileReader.onloadend = function() {
            //   fileReader.readAsArrayBuffer(file)
            //   console.log(file)
            // }
            this.uploadFileFn(file)
          })
          // var isAppend = true
          // createFile(dirEntry, 'fileToAppend.txt', isAppend)
        },
        function(err) {
          console.log(123)
          console.log(err)
        },
      )
    },
    uploadFileFn(file) {
      var options = new this.$FileUploadOptions()
      options.fileKey = 'file'
      options.fileName = file.name
      options.mimeType = 'text/plain'

      var headers = { headerParam: 'headerValue' }

      options.headers = headers

      let ft = new this.$FileTransfer()
      console.log(ft)
      console.log('upload')
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '上传中...',
      })
      ft.onprogress = function(progressEvent) {
        console.log(progressEvent)
        if (progressEvent.lengthComputable) {
          var rate = parseInt(
            (progressEvent.loaded / progressEvent.total) * 100,
          )
          toast.message = `上传中...${rate}`
        } else {
          this.$toast.clear()
        }
      }
      ft.upload(
        file.localURL,
        encodeURI(this.uploadUrl),
        res => {
          this.$toast('上传成功')
          console.log('data')
          console.log(res)
        },
        err => {
          alert('出错了== ' + JSON.stringify(err))
          // alert("An error has occurred: Code = " + err.code);
          // alert("upload error source " + err.source);
          // alert("upload error target " + err.target);
          //_that.$toast('上传失败！')
        },
        options,
      )
    },
  },
}
</script>
