<template>
  <div class="upload">
    <van-field name="uploader" label="上传资料">
      <template #input>
        <van-uploader
          v-model="uploader"
          accept="image/*"
          :after-read="afterRead"
          :max-count="10"
          multiple
          :max-size="5 * 1024 * 1024"
          @oversize="onOversize"
        />
      </template>
    </van-field>
    <van-field v-model="qmurl" name="qmurl" v-show="false" />
  </div>
</template>

<script>
export default {
  props: {
    rz: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      uploader: [],
      qmurl: '',
    }
  },
  mounted() {
    if (this.rz.qmurl) {
      this.uploader = this.rz.qmurl.split('|').map(v => {
        return { url: v }
      })
      this.qmurl = this.rz.qmurl
    }
  },
  methods: {
    async afterRead(data) {
      console.log('this.rz.qmurl1: ', this.rz.qmurl)
      // 此时可以自行将文件上传至服务器
      console.log('afterRead-file: ', data)
      const compid = this.$store.state.userInfo.compid
      let formData = new FormData()
      formData.append('type', 'ipad')
      formData.append('file', data.file)
      formData.append('compid', compid)
      console.log('formData: ', formData)
      const res = await this.$http.uploadImages(formData)
      console.log('res: ', res)
      if (res.code === 100) {
        this.$toast.success(res.msg)
        this.qmurl += res.url + '|'
        console.log('this.qmurl: ', this.qmurl)
      }
    },
    onOversize(file) {
      console.log(file)
      this.$toast('文件大小不能超过 5M')
    },
    // 返回布尔值
    beforeRead(file) {
      console.log('file: ', file)
      // if (file.type !== 'image/jpeg') {
      //   this.$toast('请上传 jpg 格式图片')
      //   return false
      // }
      // return true
    },
    // 返回 Promise
    asyncBeforeRead(file) {
      return new Promise((resolve, reject) => {
        if (file.type !== 'image/jpeg') {
          this.$toast('请上传 jpg 格式图片')
          reject()
        } else {
          let img = new File(['foo'], 'bar.jpg', {
            type: 'image/jpeg',
          })
          resolve(img)
        }
      })
    },
  },
}
</script>

<style></style>
