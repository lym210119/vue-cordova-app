<template>
  <div class="form">
    <van-nav-bar
      title="录单"
      left-text="返回"
      :border="false"
      left-arrow
      fixed
      placeholder
      safe-area-inset-top
      z-index="9999"
      @click-left="onClickLeft"
    />

    <!-- <record /> -->

    <van-form @submit="onSubmit">
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
        <van-collapse-item title="房产信息" name="4">
          <HouseInfo :rz="rz" />
        </van-collapse-item>
        <van-collapse-item title="保单信息" name="5">
          <BaoDan :rz="rz" />
        </van-collapse-item>
        <van-collapse-item title="车产信息" name="6">
          <CarInfo :rz="rz" />
        </van-collapse-item>
        <van-collapse-item title="公积金" name="7">
          <GongJiJin :rz="rz" />
        </van-collapse-item>
        <van-collapse-item title="社保信息" name="8">
          <SheBao :rz="rz" />
        </van-collapse-item>
        <van-collapse-item title="打卡工资" name="9">
          <Wage :rz="rz" />
        </van-collapse-item>
        <van-collapse-item title="微粒贷" name="10">
          <WeiLiDai :rz="rz" />
        </van-collapse-item>
        <van-collapse-item title="信用卡" name="11">
          <CreditCard :rz="rz" />
        </van-collapse-item>
        <van-collapse-item title="学历" name="12">
          <Education :rz="rz" />
        </van-collapse-item>
        <van-collapse-item title="装修贷" name="13">
          <ZhuangXiu :rz="rz" />
        </van-collapse-item>
        <van-collapse-item title="税贷" name="14">
          <TaxLoan :rz="rz" />
        </van-collapse-item>
        <van-collapse-item title="添加联系人" name="15">
          <Contact :rz="rz" />
        </van-collapse-item>
        <van-collapse-item title="上传资料" name="16">
          <Upload :rz="rz" />
        </van-collapse-item>
        <!-- <van-collapse-item title="" name="17">内容</van-collapse-item> -->
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
          >
            结束谈单
          </van-button>
        </div>
      </div>
    </van-form>

    <van-popup class="popup-rating" v-model="popupRatingShow">
      <Rating :score="score" />
    </van-popup>
  </div>
</template>

<script>
// import Record from './components/Record'
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

export default {
  name: 'Form',
  components: {
    // Record,
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
  },
  // watch: {
  //   // 监听数据的变化输出 newV 改变的值，oldV 改变之前的值
  //   cus(newV, oldV) {
  //     console.log('newV, oldV: ', newV.CNAME, oldV.CNAME)
  //   },
  //   rz(newV, oldV) {
  //     console.log('newV, oldV: ', newV.CNAME, oldV.CNAME)
  //   },
  // },
  data() {
    return {
      cus: {},
      rz: {},
      activeNames: Array.from({ length: 16 }, (x, i) => i + 1 + ''),
      isSubmit: false, // 是否提交了表单
      popupRatingShow: false,
      score: {},
    }
  },
  created() {
    this.cus = this.$route.query.cus
    this.rz = this.$route.query.rz
    console.log('this.rz: ', this.rz)
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

    // 查看评级
    handleViewRating() {
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
        hasCar: '请选择是否有车',
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
          }
        }
        if (formdata.hasCar === '1') {
          var anjie = Boolean(
            formdata.ajcpaizhao &&
              formdata.ajcyuegong &&
              formdata.ajchuankuan &&
              formdata.ajcjine,
          )
          var quankuan = Boolean(
            formdata.qkcpaizhao &&
              formdata.qkczongjia &&
              formdata.qkcnianxian &&
              formdata.qkcdengji,
          )
          console.log(anjie)
          console.log(quankuan)
          if (!anjie && !quankuan) {
            this.$toast.fail('请填写完整全款车或按揭车')
            return
          }
        }

        resolve()
      })
    },
    //提交表单
    onSubmit(e) {
      console.log('e: ', e)
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
        this.$http.submitInfo(e).then(res => {
          console.log('res: ', res)
          if (res.code === 1) {
            this.$toast.success('提交成功')
            this.score = res.score
            this.isSubmit = true
          }
        })
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
</style>
