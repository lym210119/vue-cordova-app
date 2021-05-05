<template>
  <div class="form">
    <van-nav-bar
      title="录单"
      left-text="返回"
      :border="false"
      left-arrow
      fixed
      safe-area-inset-top
      z-index="9999"
      @click-left="onClickLeft"
      :style="`padding-top: ${this.$StatusBarHeight}px`"
    />

    <div
      class="navbar-height"
      :style="`padding-top: ${this.$StatusBarHeight + navBarHeight}px`"
    ></div>

    <record ref="record" :cus="cus" :rz="rz" />

    <van-form class="form-con" @submit="onSubmit">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="基本信息" name="1">
          <Basic :cus="cus" :rz="rz" />
        </van-collapse-item>
        <van-collapse-item title="职业信息" name="2">
          <JobInfo :rz="rz" />
        </van-collapse-item>
        <van-collapse-item title="信用信息" name="3">
          <CreditInfo :rz="rz" />
        </van-collapse-item>
        <van-collapse-item title="贷款信息" name="18">
          <Loans :rz="rz" :cus="cus" />
        </van-collapse-item>

        <van-collapse-item
          title="房产信息"
          name="4"
          v-show="rz.intoType === '1' || rz.intoType === '2'"
        >
          <HouseInfo :rz="rz" />
        </van-collapse-item>
        <van-collapse-item
          title="保单信息"
          name="5"
          v-show="rz.intoType === '2'"
        >
          <BaoDan :rz="rz" />
        </van-collapse-item>
        <van-collapse-item
          title="车产信息"
          name="6"
          v-show="rz.intoType === '3' || rz.intoType === '2'"
        >
          <CarInfo :rz="rz" />
        </van-collapse-item>
        <van-collapse-item title="公积金" name="7" v-show="rz.intoType === '2'">
          <GongJiJin :rz="rz" />
        </van-collapse-item>
        <van-collapse-item
          title="社保信息"
          name="8"
          v-show="rz.intoType === '2'"
        >
          <SheBao :rz="rz" />
        </van-collapse-item>
        <van-collapse-item
          title="打卡工资"
          name="9"
          v-show="rz.intoType === '2'"
        >
          <Wage :rz="rz" />
        </van-collapse-item>
        <van-collapse-item
          title="微粒贷"
          name="10"
          v-show="rz.intoType === '2'"
        >
          <WeiLiDai :rz="rz" />
        </van-collapse-item>
        <van-collapse-item
          title="信用卡"
          name="11"
          v-show="rz.intoType === '2'"
        >
          <CreditCard :rz="rz" />
        </van-collapse-item>
        <van-collapse-item title="学历" name="12" v-show="rz.intoType === '2'">
          <Education :rz="rz" />
        </van-collapse-item>
        <van-collapse-item
          title="装修贷"
          name="13"
          v-show="rz.intoType === '2'"
        >
          <ZhuangXiu :rz="rz" />
        </van-collapse-item>
        <van-collapse-item
          title="税贷"
          name="14"
          v-show="rz.intoType === '4' || rz.intoType === '2'"
        >
          <TaxLoan :rz="rz" />
        </van-collapse-item>
        <van-collapse-item title="添加联系人" name="15">
          <Contact :rz="rz" />
        </van-collapse-item>
        <van-collapse-item title="上传资料" name="16">
          <Upload :rz="rz" />
        </van-collapse-item>
        <van-collapse-item title="客户签字" name="17">
          <div class="cus-sign" style="padding: 0 10px;">
            <div class="sign-title">
              <span>请在下方空白处写上您的姓名</span>
              <van-button
                plain
                round
                size="small"
                type="danger"
                native-type="button"
                @click="clear"
                >清空</van-button
              >
            </div>
            <VueSignaturePad
              id="signature"
              width="100%"
              height="500px"
              ref="signaturePad"
            />
            <div style="line-height: 40px;text-align:right;color:#ccc;">
              签字即表示同意
              <span class="xy-btn" @click.stop="showServiceAgreement"
                >《{{ this.companyName }}服务约定》</span
              >
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>

      <div style="margin: 16px;text-align: center;">
        <van-field v-model="cus.KEYID" name="cid" v-show="false" />
        <van-field
          v-model="$store.state.userInfo.userId"
          name="userId"
          v-show="false"
        />
        <van-field
          v-model="$store.state.userInfo.compid"
          name="compid"
          v-show="false"
        />

        <van-button
          round
          block
          type="info"
          native-type="submit"
          :loading="submitDisabled"
          :disabled="submitDisabled"
          v-if="!isSubmit"
        >
          提交
        </van-button>

        <div class="btn-group" v-else>
          <van-button
            round
            type="info"
            native-type="button"
            @click="handleViewRating"
          >
            查看评级
          </van-button>
          <van-button
            round
            native-type="button"
            color="linear-gradient(to right, #ff6034, #ee0a24)"
            @click="onEndTalk"
            :disabled="endTalkBtn"
          >
            结束谈单
          </van-button>
        </div>
      </div>
    </van-form>

    <van-popup class="popup-rating" v-model="popupRatingShow">
      <Rating :score="score" />
    </van-popup>

    <van-popup v-model="showXY" class="popup-xy" style="height: 80%;">
      <XieYi />
      <div class="signature">
        <span>客户签字：</span>
        <img :src="signatureData" alt="" width="200" height="100" />
      </div>
    </van-popup>

    <div
      ref="html2canvas"
      class="popup-xy"
      v-show="xydemo"
      style="position: absolute; left: 0; top: 0;z-index: -1;background-color:pink;"
    >
      <XieYi />
      <div class="signature">
        <span>客户签字：</span>
        <img :src="signatureData" alt="" width="200" height="100" />
      </div>
    </div>
    <!-- <van-action-sheet
      v-model="showActions"
      description="请选择是否签单"
      :actions="actions"
      @select="onSelectActions"
    />
    <van-dialog v-model="showDialog" title="" show-cancel-button>
      <img src="https://img.yzcdn.cn/vant/apple-3.jpg" />
    </van-dialog> -->
  </div>
</template>

<script>
import Record from './components/Record'
import Basic from './components/Basic'
import JobInfo from './components/JobInfo'
import CreditInfo from './components/CreditInfo'
import HouseInfo from './components/HouseInfo'
import BaoDan from './components/BaoDan'
import CarInfo from './components/CarInfo'
import GongJiJin from './components/GongJiJin'
import SheBao from './components/SheBao'
import Wage from './components/Wage'
import WeiLiDai from './components/WeiLiDai'
import CreditCard from './components/CreditCard'
import Education from './components/Education'
import ZhuangXiu from './components/ZhuangXiu'
import TaxLoan from './components/TaxLoan'
import Contact from './components/Contact'
import Upload from './components/Upload'
import Rating from './components/Rating'
import XieYi from './components/XieYi'
import Loans from './components/Loans'

import html2canvas from 'html2canvas'
import { dataURLtoBlob } from '../../utils'

import { mapState } from 'vuex'
export default {
  name: 'Form',
  components: {
    Record,
    Basic,
    JobInfo,
    CreditInfo,
    HouseInfo,
    BaoDan,
    CarInfo,
    GongJiJin,
    SheBao,
    Wage,
    WeiLiDai,
    CreditCard,
    Education,
    ZhuangXiu,
    TaxLoan,
    Contact,
    Upload,
    Rating,
    XieYi,
    Loans,
  },
  watch: {
    // 监听数据的变化输出 newV 改变的值，oldV 改变之前的值
    cus(newV, oldV) {
      console.log('newV, oldV: ', newV.CNAME, oldV.CNAME)
    },
    rz(newV, oldV) {
      console.log('newV, oldV: ', newV.CNAME, oldV.CNAME)
    },
  },
  computed: {
    ...mapState({
      companyName: state => state.userInfo.compName,
    }),
  },
  data() {
    return {
      navBarHeight: 46,
      cus: {},
      rz: {},
      activeNames: Array.from({ length: 18 }, (x, i) => i + 1 + ''),
      isSubmit: false, // 是否提交了表单
      popupRatingShow: false,
      score: {},

      showXY: false,

      signatureData: '',
      xydemo: false,
      endTalkBtn: false,
      submitDisabled: false,
      // showActions: false,
      // actions: [{ name: '已签单' }, { name: '未签单' }],
    }
  },
  created() {
    this.cus = this.$route.query.cus
    this.rz = this.$route.query.rz
    console.log('this.rz111: ', this.rz)
    if (!this.rz.qmurl) {
      this.rz.qmurl = ''
    }
  },
  mounted() {
    // this.onLoad()
    document.addEventListener('backbutton', this.onClickLeft, false)
  },
  beforeDestroy() {
    document.removeEventListener('backbutton', this.onClickLeft, false)
  },
  methods: {
    // // 校验函数返回 true 表示校验通过，false 表示不通过基本
    // validator(val) {
    //   return /1\d{10}/.test(val)
    // },
    // 异步校验函数返回 Promise
    // asyncValidator(val) {
    //   return new Promise(resolve => {
    //     this.$toast.loading('验证中...')

    //     setTimeout(() => {
    //       this.$toast.clear()
    //       resolve(/\d{6}/.test(val))
    //     }, 1000)
    //   })
    // },
    // onSelectActions(item, index) {
    //   if (index === 0) {
    //     this.$refs.record.stop()
    //   } else if (index === 1) {

    //   }
    // },
    onEndTalk() {
      this.endTalkBtn = true
      console.log('this.endTalkBtn: ', this.endTalkBtn)
      // this.showActions = true
      this.$refs.record.stop(false)
    },
    // 查看评级
    handleViewRating() {
      console.log('this.score: ', this.score)
      if (!this.score.cusLevel) {
        this.$toast.fail(this.score.msg)
        return
      }
      this.popupRatingShow = true
    },
    // 验证表单
    validator(formdata) {
      console.log('formdata: ', formdata)
      const errTips = {
        cname: '请输入客户姓名',
        sexid: '请选择客户性别',
        card: '请输入客户身份证号',
        age: '请输入客户年龄',
        jkedu: '请选择借款额度',
        intoType: '请选择进件类型',
        expectDate: '请选择期望到账时间',
        hyzk: '请选择婚姻状况',
        hkd: '请输入户口地',
        isdaikuan: '请选择配偶可否知晓贷款',
        iszhixi: '请选择直系亲属可否知晓贷款',
        zhiye: '请选择职业身份',
        gongsi: '请输入公司名称',
        xugua: '请选择需挂靠单位',
        xiahu: '请选择单位能否下户',
        zuoji: '请选择单位座机',
        // propertyStatus: "请选择产权情况",
        // hasCar: '请选择是否有车',
      }

      return new Promise(resolve => {
        for (let key in errTips) {
          console.log(key)
          if (
            Object.prototype.hasOwnProperty.call(formdata, key) &&
            !formdata[key]
          ) {
            this.$toast.fail(errTips[key])
            return
          } else {
            if (
              key === 'card' &&
              !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
                formdata.card,
              )
            ) {
              // this.isFocus[key] = true
              this.$toast.fail('请填写正确的身份证号')
              return
            }
          }
        }

        // 抵押有限制
        if (formdata.intoType === '1') {
          if (!formdata.propertyStatus) {
            this.$toast.fail('请选择产权情况')
            return
          } else if (formdata.propertyStatus !== '1') {
            this.$toast.fail('产权情况不正常或没有资格')
            return
          }
        }
        // if (formdata.hasCar === '1') {
        //   var anjie = Boolean(
        //     formdata.ajcpaizhao &&
        //       formdata.ajcyuegong &&
        //       formdata.ajchuankuan &&
        //       formdata.ajcjine,
        //   )
        //   var quankuan = Boolean(
        //     formdata.qkcpaizhao &&
        //       formdata.qkczongjia &&
        //       formdata.qkcnianxian &&
        //       formdata.qkcdengji,
        //   )
        //   console.log(anjie)
        //   console.log(quankuan)
        //   if (!anjie && !quankuan) {
        //     this.$toast.fail('请填写完整全款车或按揭车')
        //     return
        //   }
        // }
        const arr = Object.keys(formdata)
          .filter(v => v.includes('contact'))
          .filter(v => v.includes('TEL'))
        console.log('arr: ', arr)
        const reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/

        for (let i = 0; i < arr.length; i++) {
          let okey = arr[i]
          if (formdata[okey] && !reg.test(formdata[okey])) {
            this.$toast('联系人手机号格式错误，请重新输入')
            return
          }
        }
        const { isEmpty } = this.$refs.signaturePad.saveSignature()
        console.log('isEmpty: ', isEmpty)
        if (isEmpty) {
          this.$toast('未签字')
          return
        }
        resolve()
      })
    },
    showServiceAgreement() {
      this.showXY = true
    },
    // 清空画板
    clear() {
      this.$refs.signaturePad.clearSignature()
    },

    //提交表单
    onSubmit(e) {
      this.submitDisabled = true
      e.smallLoanNum = 0
      Object.keys(e).map(v => {
        if (v.includes('ifOrganization') && e[v] === '2') {
          console.log(v)
          e.smallLoanNum++
        }
      })
      console.log('小袋个数')
      console.log(e.smallLoanNum)

      e.policeSwitch = +e.policeSwitch + ''

      this.validator(e).then(() => {
        Object.keys(e).map(v => {
          if (e[v] === 'undefined') {
            console.log('v', v)
            e[v] = ''
          }
        })
        console.log('e-onSubmit: ', e)

        this.uploadSignature(e)
      })
    },
    // 上传签名
    uploadSignature(e) {
      this.xydemo = true
      const { data } = this.$refs.signaturePad.saveSignature()
      this.signatureData = data
      const compid = this.$store.state.userInfo.compid
      const formData = new FormData()
      formData.append('type', 'ipad')
      formData.append('file', dataURLtoBlob(data), 'signature.png')
      formData.append('compid', compid)
      this.$http.uploadImages(formData).then(res1 => {
        console.log('res1: ', res1)
        if (res1.code == 100) {
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
            const form = new FormData()
            form.append('type', 'ipad')
            form.append('file', dataURLtoBlob(dataUrl), 'signature+xy.png')
            form.append('compid', compid)
            // 再次上传签名协议合成图
            this.$http.uploadImages(form).then(res2 => {
              console.log('res2: ', res2)
              if (res2.code == 100) {
                this.xydemo = false
                this.$toast.success('提交成功')
                console.log('e: ', e)
                e.qmurl += res1.url + '|' + res2.url

                this.submitFormData(e)
              }
            })
          })
        }
      })
    },
    // 请求提交
    submitFormData(e) {
      this.$http.submitInfo(e).then(res => {
        console.log('res: ', res)
        if (res.code == 1) {
          this.$toast.success('提交成功')

          this.score = res.score
          this.isSubmit = true
          this.submitDisabled = false
        }
      })
    },

    onClickLeft() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '您已进入谈单模式，确定要返回吗？',
        })
        .then(() => {
          // on confirm
          this.$refs.record.stop(true)
          this.$router.go(-1)
        })
        .catch(() => {
          // on cancel
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.form {
  /deep/ .van-collapse-item__title {
    background-color: #f7f8fa;

    .van-cell__title {
      font-weight: bold;
      color: #333333;
    }
  }
  /deep/ .van-collapse-item__content {
    padding: 0;
    overflow: hidden;
  }
  /deep/ .van-collapse-item__title--expanded::after {
    border-bottom: 1px solid #c8c9cc;
  }
  /deep/ .van-collapse-item--border::after {
    border-top: 1px solid #c8c9cc;
  }
  /deep/ .van-cell::after {
    border-top: 1px solid #c8c9cc;
  }
  /deep/ .van-radio--horizontal {
    margin-bottom: 12px;
  }

  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background: #ffffff;

  .form-con {
    flex: 1;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .btn-group {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .popup-rating {
    width: 90%;
    padding: 10px;
    border-radius: 10px;
  }
}
.popup-xy {
  width: 85%;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 4px;
  background: pink;
  color: #333;
  h3 {
    text-align: center;
  }
  p {
    text-indent: 2em;
  }
}
.signature {
  text-align: right;
  span,
  img {
    vertical-align: middle;
  }
}
.cus-sign /deep/ .van-checkbox__label {
  color: #ccc;
}
.sign-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}
#signature {
  border: 2px dashed #d3d3d3;
  box-sizing: border-box;
}
</style>
