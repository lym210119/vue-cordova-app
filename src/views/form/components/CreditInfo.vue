<template>
  <div class="creditInfo">
    <div class="loan-item" v-for="(item, i) in loanArr" :key="i">
      <div class="my-section">
        <span>贷款笔数 </span>
        <van-tag round type="primary">{{ i + 1 }}</van-tag>
      </div>
      <van-field
        v-model="item.dkyinhang"
        :name="i === 0 ? 'dkyinhang' : 'dkyinhang' + i"
        type="text"
        label="资方名称"
        placeholder="资方名称"
        maxlength="20"
      />
      <van-field :name="i === 0 ? 'ifpiguo' : 'ifpiguo' + i" label="是否批过">
        <template #input>
          <van-radio-group v-model="item.ifpiguo" direction="horizontal">
            <van-radio name="1">是</van-radio>
            <van-radio name="2">否</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="item.phjine"
        :name="i === 0 ? 'phjine' : 'phjine' + i"
        type="number"
        label="批核金额"
        placeholder="批核金额（元）"
        maxlength="20"
      />
      <van-field
        v-model="item.ygjine"
        :name="i === 0 ? 'ygjine' : 'ygjine' + i"
        type="number"
        label="月供金额"
        placeholder="月供金额（元）"
        maxlength="20"
      />
      <van-field
        :name="i === 0 ? 'ifOrganization' : 'ifOrganization' + i"
        label="放款机构"
      >
        <template #input>
          <van-radio-group v-model="item.ifOrganization" direction="horizontal">
            <van-radio name="1">银行</van-radio>
            <van-radio name="2">非银行</van-radio>
          </van-radio-group>
        </template>
      </van-field>
    </div>
    <div style="margin: 16px; text-align: center;">
      <van-button
        round
        type="primary"
        size="normal"
        native-type="button"
        @click="add"
      >
        添加贷款笔数
      </van-button>
    </div>

    <van-field name="iftgdhzl" label="能否提供贷后资料">
      <template #input>
        <van-radio-group v-model="rz.iftgdhzl" direction="horizontal">
          <van-radio name="1">能</van-radio>
          <van-radio name="2">不能</van-radio>
        </van-radio-group>
      </template>
    </van-field>

    <van-field
      readonly
      clickable
      name="cxnum"
      :value="rz.cxnum"
      label="征信查询次数"
      placeholder="点击选择征信查询次数"
      @click="showPickerQueryTimes = true"
    >
      <template #input>
        <input
          type="text"
          readonly
          placeholder="点击选择征信查询次数"
          :value="valueQueryTimes"
          class="van-field__control"
        />
      </template>
    </van-field>
    <van-popup v-model="showPickerQueryTimes" position="bottom">
      <van-picker
        value-key="name"
        show-toolbar
        :columns="cxnumArray"
        @confirm="onConfirmQueryTimes"
        @cancel="showPickerQueryTimes = false"
      />
    </van-popup>
    <van-field
      v-model="rz.wdnum"
      name="wdnum"
      type="digit"
      label="近3个月网贷笔数"
      placeholder="近3个月网贷笔数"
      maxlength="2"
    />
    <van-field name="ifyuqi" label="是否有当前逾期">
      <template #input>
        <van-radio-group v-model="rz.ifyuqi" direction="horizontal">
          <van-radio name="1">是</van-radio>
          <van-radio name="2">否</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field
      v-model="rz.yqjine"
      name="yqjine"
      type="number"
      label="当前逾期金额"
      placeholder="当前逾期金额（元）"
      maxlength="20"
    />
    <van-field name="overdue" label="逾期情况">
      <template #input>
        <van-radio-group v-model="rz.overdue" direction="horizontal">
          <van-radio name="1">无逾期</van-radio>
          <van-radio name="2">2年内3次以下</van-radio>
          <van-radio name="3">2年内6次以下</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field
      v-model="rz.sumDebtAmount"
      name="sumDebtAmount"
      type="number"
      label="总负债金额"
      placeholder="总负债金额（元）"
      maxlength="20"
    />
    <van-field
      v-model="rz.totalzichan"
      name="totalzichan"
      type="number"
      label="总资产金额"
      placeholder="总资产金额（元）"
      maxlength="20"
    />
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
      loanArr: [
        {
          dkyinhang: '',
          ifOrganization: '',
          ifpiguo: '',
          phjine: '',
          ygjine: '',
        },
      ],
      cxnumArray: [
        { value: 1, name: '2个月小于3次以下' },
        { value: 2, name: '2个月小于5次以下' },
        { value: 3, name: '6个月小于10次以下' },
        { value: 4, name: '个查一年小于6次以下' },
        { value: 5, name: '其他' },
      ],

      showPickerQueryTimes: false,
      valueQueryTimes: '',
    }
  },
  computed: {},
  mounted() {
    this.initData()
  },
  methods: {
    dataFilter(name) {
      console.log('this.rz: ', this.rz)
      const arr = Object.keys(this.rz)
        .filter(v => {
          return v.indexOf(name) > -1
        })
        .map(v => {
          return { [name]: this.rz[v] }
        })
      return arr
    },
    initData() {
      const index = this.cxnumArray.findIndex(v => v.value === this.rz.cxnum)
      if (index !== -1) {
        this.valueQueryTimes = this.cxnumArray[index].name
      }

      console.log('this.rz.overdue: ', this.rz.overdue)
      this.rz.overdue = this.rz.overdue + ''
      console.log('this.rz.overdue: ', this.rz.overdue)

      const a = []
      const dkyinhang = this.dataFilter('dkyinhang')
      const ifpiguo = this.dataFilter('ifpiguo')
      const phjine = this.dataFilter('phjine')
      const ygjine = this.dataFilter('ygjine')
      const ifOrganization = this.dataFilter('ifOrganization')
      console.log('ifOrganization: ', ifOrganization)

      dkyinhang.forEach((v, i) => {
        if (v['dkyinhang']) {
          console.log('ifOrganization', ifOrganization[i]['ifOrganization'])
          a[i] = {
            dkyinhang: v['dkyinhang'],
            ifpiguo: ifpiguo[i]['ifpiguo'],
            phjine: phjine[i]['phjine'],
            ygjine: ygjine[i]['ygjine'],
            ifOrganization: ifOrganization[i]['ifOrganization'],
          }
        }
      })


      this.loanArr = a.length ? a : this.loanArr
      console.log('this.loanArr: ', this.loanArr)

      // 征信查询次数赋值
      const i = this.cxnumArray.findIndex(item => item.value === this.rz.cxnum)
      this.cxnumIndex = i > -1 ? i : null
      // 贷款笔数
      // 根据名称是否填写来判断贷款笔数
      let arr = [
        'dkyinhang',
        'dkyinhang1',
        'dkyinhang2',
        'dkyinhang3',
        'dkyinhang4',
      ].filter(item => this.rz[item])

      this.loansNum = arr.length !== 0 ? arr.length : 1
    },
    add() {
      console.log('this.loanArr: ', this.loanArr)
      if (this.loanArr.length >= 5) {
        this.$toast.fail('最多添加5笔贷款')
        return
      }
      const o = {
        dkyinhang: '',
        ifOrganization: '',
        ifpiguo: '',
        phjine: '',
        ygjine: '',
      }
      this.loanArr.push(o)
    },
    // 选择器确认 征信查询次数
    onConfirmQueryTimes(e) {
      this.valueQueryTimes = e.name
      this.rz.cxnum = e.value
      this.showPickerQueryTimes = false
    },
  },
}
</script>

<style lang="scss" scoped>
.my-section {
  margin: 0;
  padding: 16px;
  color: #1989fa;
  font-weight: normal;
  font-size: 14px;
  font-weight: bold;
  line-height: 16px;
  background-color: #f6f6f6;
}
</style>
