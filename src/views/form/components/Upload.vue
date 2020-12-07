<template>
  <div class="upload">
    <van-field name="uploader" label="上传资料">
      <template #input>
        <van-uploader
          v-model="uploader"
          :before-read="beforeRead"
          :after-read="afterRead"
          :max-count="10"
          multiple
          :max-size="500 * 1024"
          @oversize="onOversize"
        />
      </template>
    </van-field>
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
      uploader: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }],
    }
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    },
    onOversize(file) {
      console.log(file)
      this.$toast('文件大小不能超过 500kb')
    },
    // 返回布尔值
    beforeRead(file) {
      if (file.type !== 'image/jpeg') {
        this.$toast('请上传 jpg 格式图片')
        return false
      }
      return true
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
