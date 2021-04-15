<template>
  <div class="about">
    <!-- <h1>This is an about page</h1>
    <van-button type="default" @click="record">录音</van-button>
    <van-button type="primary" @click="stop">停止</van-button>
    <van-button type="info" @click="play">播放</van-button>
    <van-button type="warning" @click="pause">暂停</van-button>
    <van-button type="danger" @click="upload">上传</van-button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      mediaRec: null,
      fullPath: '',
      uploadUrl: this.$store.getters.baseURL + '/erp/api/api_audio',
    }
  },
  props: {
    rz: {
      type: Object,
      required: true,
    },
    cus: {
      type: Object,
      required: true,
    },
  },
  computed: {
    fileName() {
      // return new Date().getTime() + '.aac'
      return new Date().getTime() + '.aac'
    },
    filePath() {
      if (this.$device) {
        console.log('this.$cordova.file: ', this.$cordova.file)
        if (this.$device.platform === 'iOS') {
          return this.$cordova.file.tempDirectory
        } else {
          return this.$cordova.file.externalRootDirectory
        }
      } else {
        return ''
      }
    },
  },
  mounted() {
    console.log(this.fileName)
    console.log(this.filePath)
    this.fullPath = this.filePath + this.fileName
    console.log(this.fullPath)
    this.record()
  },
  methods: {
    mediaSuccess() {
      console.log('Media成功12')
    },
    mediaError(err) {
      console.log(err)
    },
    record() {
      this.$toast('开始录音')
      console.log(this.fullPath)
      const src = this.fullPath.replace('file:///', 'cdvfile://')
      console.log('src: ', src)
      this.mediaRec = new this.$Media(src, this.mediaSuccess, this.mediaError)
      // 启动录制音频
      this.mediaRec.startRecord()
    },
    stop(isBack) {
      this.$toast('停止录音')
      this.mediaRec.stopRecord()
      console.log(123)
      console.log(this.mediaRec.getCurrentPosition)
      console.log('isBack: ', isBack)
      if (!isBack) {
        this.upload()
      }
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
      console.log('this.filePath: ', this.filePath);
      window.resolveLocalFileSystemURL(
        // this.fullPath,
        this.filePath + '1618282122048.aac',
        dirEntry => {
          console.log(5666)
          console.log(dirEntry)
          dirEntry.file(file => {
            const fileReader = new FileReader()
            fileReader.onloadend = function() {
              fileReader.readAsArrayBuffer(file)
              console.log('file: ', file);
              console.log(file)
            }
            this.uploadFileFn(file)
          })
          // var isAppend = true
          // createFile(dirEntry, 'fileToAppend.txt', isAppend)
        },
        err => {
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
      options.chunkedMode = true
      // var headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

      // options.headers = headers
      //上传参数
      let params = {
        cid: this.cus.KEYID,
        rzcusname: this.cus.CNAME,
        userid: this.$store.state.userInfo.userId,
        compid: this.$store.state.userInfo.compid,
        tandanbuchong: this.rz.tandanbuchong,
      }

      options.params = params

      let ft = new this.$FileTransfer()
      console.log(ft)
      console.log('upload')
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '上传中...',
      })
      ft.onprogress = progressEvent => {
        console.log(progressEvent)
        if (progressEvent.lengthComputable) {
          var rate = parseInt(
            (progressEvent.loaded / progressEvent.total) * 100,
          )
          toast.message = `上传中...${rate}%`
        } else {
          this.$toast.clear()
        }
      }
      ft.upload(
        file.localURL,
        encodeURI(this.uploadUrl),
        res => {
          console.log('res: ', res)
          if (res.responseCode === 200) {
            this.$toast.clear()
            let data = JSON.parse(res.response)
            console.log('data: ', data)
            console.log('data.code: ', data.code)
            console.log('options: ', options)
            // if (data.code === 100) {
            this.$toast({
              type: 'success',
              message: '上传成功',
              onClose: () => {
                this.$router.push('/')
              },
            })
            // }
          }
        },
        err => {
          // 1 = FileTransferError.FILE_NOT_FOUND_ERR
          // 2 = FileTransferError.INVALID_URL_ERR
          // 3 = FileTransferError.CONNECTION_ERR
          // 4 = FileTransferError.ABORT_ERR
          // 5 = FileTransferError.NOT_MODIFIED_ERR
          this.$toast.clear()
          switch (err.code) {
            case 1:
              this.$dialog.alert('文件未找到')
              break
            case 2:
              this.$dialog.alert('无效的网址')
              break
            case 3:
              this.$dialog
                .alert({
                  message: '网络链接失败',
                  confirmButtonText: '重新上传',
                })
                .then(() => {
                  this.upload()
                })
              break
            case 4:
              this.$dialog
                .alert({
                  message: '上传中断',
                  confirmButtonText: '重新上传',
                })
                .then(() => {
                  this.upload()
                })
              break
            case 5:
              this.$dialog.alert('NOT_MODIFIED_ERR')
              break

            default:
              break
          }
          console.log(err)
        },
        options,
      )
    },
  },
}
</script>
