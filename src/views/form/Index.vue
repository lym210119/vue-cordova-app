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
      @click-left="onClickLeft"
    />

    <!-- <record /> -->

    <van-form @submit="onSubmit">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="基本信息" name="1">
          <!-- <basic :cus="cus" :rz="rz" /> -->
        </van-collapse-item>
        <van-collapse-item title="职业信息" name="2">
          <!-- <job-info :rz="rz" /> -->
        </van-collapse-item>
        <van-collapse-item title="信用信息" name="3">
          <!-- <credit-info :rz="rz"></credit-info> -->
        </van-collapse-item>
        <van-collapse-item title="房产信息" name="4">
          <house-info :rz="rz"></house-info>
        </van-collapse-item>
        <van-collapse-item title="保单信息" name="5">内容</van-collapse-item>
        <van-collapse-item title="车产信息" name="6">内容</van-collapse-item>
        <van-collapse-item title="公积金" name="7">内容</van-collapse-item>
        <van-collapse-item title="社保信息" name="8">内容</van-collapse-item>
        <van-collapse-item title="打卡工资" name="9">内容</van-collapse-item>
        <van-collapse-item title="微粒贷" name="10">内容</van-collapse-item>
        <van-collapse-item title="信用卡" name="11">内容</van-collapse-item>
        <van-collapse-item title="学历" name="12">内容</van-collapse-item>
        <van-collapse-item title="装修贷" name="13">内容</van-collapse-item>
        <van-collapse-item title="税贷" name="14">内容</van-collapse-item>
        <van-collapse-item title="添加联系人" name="15">内容</van-collapse-item>
        <van-collapse-item title="上传资料" name="16">内容</van-collapse-item>
        <!-- <van-collapse-item title="" name="17">内容</van-collapse-item> -->
      </van-collapse>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// import Record from './components/Record'
// import Basic from './components/Basic'
// import JobInfo from './components/JobInfo'
// import CreditInfo from './components/CreditInfo'
import HouseInfo from './components/HouseInfo'
export default {
  name: 'Form',
  components: {
    // Record,
    // Basic,
    // JobInfo,
    // CreditInfo,
    HouseInfo,
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
      activeNames: ['1', '2', '3', '4'],
    }
  },
  created() {
    this.cus = this.$route.query.cus
    this.rz = this.$route.query.rz
    console.log('this.rz: ', this.rz)
  },
  methods: {
    // 校验函数返回 true 表示校验通过，false 表示不通过基本
    validator(val) {
      return /1\d{10}/.test(val)
    },
    // 异步校验函数返回 Promise
    asyncValidator(val) {
      return new Promise(resolve => {
        this.$toast.loading('验证中...')

        setTimeout(() => {
          this.$toast.clear()
          resolve(/\d{6}/.test(val))
        }, 1000)
      })
    },
    onFailed(errorInfo) {
      console.log('errorInfo: ', errorInfo)
    },

    onSubmit(e) {
      console.log('e: ', e)
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
}
</style>
