<template>
  <div class="detail">
    <van-nav-bar
      title="客户详情"
      left-text="返回"
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
    <cus-cell :item="item" />
    <!-- <router-link to="/about">about</router-link> -->
    <div class="info">
      <van-tabs type="card" color="#3794df">
        <van-tab title="基本信息">
          <div class="tab-con">
            <div class="tab-item">
              <label class="item-label">姓名</label>：
              <span>{{ item.CNAME }}</span>
            </div>
            <div class="tab-item">
              <label class="item-label">编号</label>：
              <span>{{ item.KEYID }}</span>
            </div>
            <div class="tab-item">
              <label class="item-label">电话</label>：
              <span>{{ tels }}</span>
            </div>
            <div class="tab-item">
              <label class="item-label">性别</label>：
              <span>{{ infoCus.sexid }}</span>
            </div>
            <div class="tab-item">
              <label class="item-label">年龄</label>：
              <span>{{ infoCus.AGE || '' }}</span>
            </div>
            <div class="tab-item">
              <label class="item-label">身份证号</label>：
              <span>{{ infoCus.IDCARD || '' }}</span>
            </div>
            <!-- <div class="tab-item">
              <label class="item-label">职业</label>：
              <span>{{ infoCus.JOB || '' }}</span>
            </div> -->
            <div class="tab-item">
              <label class="item-label">所在城市</label>：
              <span>{{ infoCus.cityid || '' }}</span>
            </div>
            <!-- <div class="tab-item">
              <label class="item-label">联系地址</label>：
              <span>{{ infoCus.ADDRESS || '' }}</span>
            </div> -->
          </div>
        </van-tab>
        <van-tab title="服务信息">
          <div class="tab-con">
            <div class="tab-item">
              <label class="item-label">服务经理</label>：
              <span>{{ infoCus.UVAL || '' }}</span>
            </div>
            <div class="tab-item">
              <label class="item-label">渠道来源</label>：
              <span>{{ infoCus.SVAL || '' }}</span>
            </div>
            <div class="tab-item">
              <label class="item-label">期望金额</label>：
              <span>{{ infoCus.WISHVAL || '' }}</span>
            </div>
            <!-- <div class="tab-item">
              <label class="item-label">用款时长</label>：
              <span>{{ infoCus.DKD ? infoCus.DKD + infoCus.DKDT : '' }}</span>
            </div>
            <div class="tab-item">
              <label class="item-label">贷款类型</label>：
              <span>{{ infoCus.DKID || '' }}</span>
            </div>
            <div class="tab-item">
              <label class="item-label">建议产品</label>：
              <span>{{ infoCus.jycp || '' }}</span>
            </div> -->
            <div class="tab-item">
              <label class="item-label">上门状态</label>：
              <span>{{ infoCus.yxcd }}</span>
            </div>
            <div class="tab-item">
              <label class="item-label">客户情况</label>：
              <span>{{ infoCus.ASSETS }}</span>
            </div>
          </div>
        </van-tab>
        <van-tab title="跟进信息">
          <div class="tab-con">
            <van-steps direction="vertical" :active="0">
              <van-step v-for="fk in infoFk" :key="fk.KEYID">
                <div class="follow-title">【{{ fk.UVAL }}】 {{ fk.FDATE }}</div>
                <div class="follow-con">【{{ fk.FTVAL }}】{{ fk.FCON }}</div>
              </van-step>
            </van-steps>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <div class="start-talk" @click="toForm()">开始谈单</div>
  </div>
</template>

<script>
import CusCell from '@/components/CusCell.vue'
export default {
  name: 'Detail',
  components: {
    CusCell,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      navBarHeight: 46,
      tels: '',
      infoCus: '',
      infoFk: '',
      infoRz: '',
    }
  },
  created() {
    this.getCusDetail()
  },
  mounted() {},
  methods: {
    toForm() {
      let data = {
        rz: this.infoRz,
        cus: this.infoCus,
      }
      this.$router.push({
        path: '/form',
        query: data,
      })
    },
    getCusDetail() {
      let params = {
        id: this.item.KEYID,
        compid: this.$store.state.userInfo.compid,
      }
      this.$http.getCusDetail(params).then(res => {
        if (res.code === 1) {
          this.infoCus = res.cus
          this.infoFk = res.fk
          this.infoRz = res.rz
          this.tels = res.tels.join('|')
        }
      })
    },
    onClickLeft() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="scss" scoped>
.info {
  padding: 10px 0;
  background-color: #ffffff;

  .tab-con {
    padding: 10px 20px;

    .tab-item {
      font-size: 14px;
      line-height: 30px;

      .item-label {
        display: inline-block;
        width: 60px;
        text-align: justify;
        text-align-last: justify;
      }
    }

    .follow-con {
      // white-space: pre;
      word-wrap: break-word;
      word-break: break-word;
    }
  }
}
.start-talk {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  line-height: 46px;
  background-color: #3794df;
  text-align: center;
  color: #fff;
  z-index: 2;
}
</style>
