<template>
  <div class="upload">
    <van-field name="uploader" label="上传资料">
      <template #input>
        <van-uploader
          v-model="uploader"
          accept="image/*"
          :before-read="beforeRead"
          :after-read="afterRead"
          multiple
          :max-count="10"
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
      // 此时可以自行将文件上传至服务器
      if (Array.isArray(data)) {
        data.forEach(v => {
          this.uploadImages(v)
        })
      } else {
        this.uploadImages(data)
      }
    },
    onOversize() {
      this.$toast('文件大小不能超过 5M')
    },
    async uploadImages(data) {
      console.log('data: ', data)

      const compid = this.$store.state.userInfo.compid
      let formData = new FormData()
      formData.append('type', 'ipad')
      formData.append('file', data.file)
      formData.append('compid', compid)

      const res = await this.$http.uploadImages(formData)

      if (res.code === 100) {
        this.$toast.success(res.msg)
        this.qmurl += res.url + '|'
      }
    },
    // 返回布尔值
    beforeRead(file) {
      console.log('file: ', file)
      const MAX_UPLOAD_NUM = 10
      if (
        Array.isArray(file) &&
        file.length + this.uploader.length > MAX_UPLOAD_NUM
      ) {
        this.$toast.fail('最多只能上传10张！')
        return false
      }
      return true
    },
    // // 返回 Promise
    // asyncBeforeRead(file) {
    //   return new Promise((resolve, reject) => {
    //     if (file.type !== 'image/jpeg') {
    //       this.$toast('请上传 jpg 格式图片')
    //       reject()
    //     } else {
    //       let img = new File(['foo'], 'bar.jpg', {
    //         type: 'image/jpeg',
    //       })
    //       resolve(img)
    //     }
    //   })
    // },
  },
}
</script>

<style></style>
