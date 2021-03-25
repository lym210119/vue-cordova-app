<template>
  
</template>

<script>

export default {
  data() {
    return {
      showXY: false,
      isSign: true,
      companyName: '申贷网',
      signatureData: '',
    }
  },
  methods: {
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature()
      if (isEmpty) {
        this.$toast('未签字')
        return false
      }
      // const config = {
      //   onUploadProgress: progressEvent => {
      //     const complete =
      //       (((progressEvent.loaded / progressEvent.total) * 100) | 0) + '%'
      //     this.$toast.loading({
      //       duration: 0, // 持续展示 toast
      //       forbidClick: true, // 禁用背景点击
      //       loadingType: 'spinner',
      //       message: '上传资料' + complete,
      //     })
      //   },
      // }
      // let formData = new FormData()
      this.signatureData = data
      console.log('this.signatureData: ', this.signatureData);
      
      this.showXY = true
      html2canvas(this.$refs.html2canvas, {
        allowTaint: true,
        useCORS: true,
        logging: false,
        // taintTest: false,
        windowWidth: document.body.scrollWidth,
        windowHeight: document.body.scrollHeight,
        x: 0,
        y: 0,
      }).then(canvas => {
        // document.body.appendChild(canvas)
        const dataUrl = canvas.toDataURL('image/png')
        console.log(dataUrl)
        console.log('dataUrl: ', dataUrl);
      })
      // this.blobArr = this.imageList.map(item => this.dataURLtoBlob(item))
      // console.log(123)
      // console.log(this.blobArr)
      // this.blobArr.push(this.dataURLtoBlob(data))

      // this.blobArr.forEach(file => {
      //   console.log(file)
      //   formData.append('image[]', file, 'sign.png')
      // })
      // console.log(formData.getAll('image[]'))

      // // 请求上传图片接口 返回图片地址
      // this.$http
      //   .post('/erp/api/upload', formData, config)
      //   .then(res1 => {
      //     if (res1.status === 200) {
      //       console.log(res1.data)
      //       let result1 = res1.data
      //       if (result1.code !== 'F9527') {
      //         // 生成签名和协议合成图
      //         html2canvas(this.$refs.html2canvas, {
      //           allowTaint: true,
      //           useCORS: true,
      //           logging: false,
      //           // taintTest: false,
      //           windowWidth: document.body.scrollWidth,
      //           windowHeight: document.body.scrollHeight,
      //           x: 0,
      //           y: 0,
      //         }).then(canvas => {
      //           // document.body.appendChild(canvas)
      //           const dataUrl = canvas.toDataURL('image/png')
      //           console.log(dataUrl)
      //           const form = new FormData()

      //           // form.append('flag', '1')
      //           form.append('image[]', this.dataURLtoBlob(dataUrl), 'sign.png')

      //           // 再次上传签名协议合成图
      //           this.$http.post('/erp/api/upload', form, config).then(res2 => {
      //             let result2 = res2.data
      //             this.$toast.clear()
      //             if (res2.status === 200) {
      //               if (result2.code !== 'F9527') {
      //                 this.xydemo = false
      //                 this.$toast.success('提交成功')
      //                 this.rz.qmurl = res1.data + res2.data
      //                 this.submitFormData()
      //               } else {
      //                 this.$toast(result2.msg)
      //               }
      //             } else {
      //               this.$toast('请求失败，错误码：' + res1.status)
      //             }
      //           })
      //         })
      //       } else {
      //         this.$toast(result1.msg)
      //       }
      //     } else {
      //       this.$toast('请求失败，错误码：' + res1.status)
      //     }
      //   })
      //   .catch(err1 => {
      //     this.$toast(err1)
      //   })
    },
    showServiceAgreement() {
      this.showXY = true
    },

    // 清空画板
    clear() {
      this.$refs.signaturePad.clearSignature()
    },
  },
}
</script>

<style lang="scss" scoped>


</style>
