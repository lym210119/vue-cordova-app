<template>
  <div class="baodan">
    <div class="baodan-item" v-for="(item, i) in baodanArr" :key="i">
      <div class="my-section">
        <span>保单笔数 </span>
        <van-tag round type="primary">{{ i + 1 }}</van-tag>
      </div>
      <van-field
        readonly
        clickable
        :name="i === 0 ? 'bdgongsi' : 'bdgongsi' + i"
        :value="item.bdgongsi.value"
        label="保险公司"
        @click="selectInsuranceCompany(i)"
      >
        <template #input>
          <input
            type="text"
            placeholder="点击选择保险公司"
            :value="item.bdgongsi.name"
            class="van-field__control"
            readonly
          />
        </template>
      </van-field>
      <van-field :name="i === 0 ? 'bdjftype' : 'bdjftype' + i" label="缴费形式">
        <template #input>
          <van-radio-group v-model="item.bdjftype" direction="horizontal">
            <van-radio name="1">年缴</van-radio>
            <van-radio name="2">月缴</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="item.bdjine"
        :name="i === 0 ? 'bdjine' : 'bdjine' + i"
        type="number"
        label="年缴金额"
        placeholder="年缴金额（元）"
        maxlength="20"
      />
      <van-field :name="i === 0 ? 'bdci' : 'bdci' + i" label="次数">
        <template #input>
          <van-radio-group v-model="item.bdci" direction="horizontal">
            <van-radio name="1">2年3次以上</van-radio>
            <van-radio name="2">2年3次以下</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field :name="i === 0 ? 'bdtype' : 'bdtype' + i" label="保单类型">
        <template #input>
          <van-radio-group v-model="item.bdtype" direction="horizontal">
            <van-radio name="1">传统</van-radio>
            <van-radio name="2">万能</van-radio>
            <van-radio name="3">分红</van-radio>
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
        添加保单
      </van-button>
    </div>

    <van-field name="policeSwitch" label="断缴" :value="rz.policeSwitch">
      <template #input>
        <van-checkbox
          v-model="checked"
          shape="square"
          name="1"
          @change="onChangeCheckbox"
          >断缴复效或一年2次以下</van-checkbox
        >
      </template>
    </van-field>

    <van-popup v-model="showPickerInsuranceCompany" position="bottom">
      <van-picker
        value-key="name"
        show-toolbar
        :columns="columnsInsuranceCompany"
        @confirm="onConfirmInsuranceCompany"
        @cancel="showPickerInsuranceCompany = false"
      />
    </van-popup>
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
      baodanArr: [],
      showPickerInsuranceCompany: false,
      columnsInsuranceCompany: [
        { value: '1', name: '中国人寿' },
        { value: '2', name: '中国人保' },
        { value: '3', name: '中国平安' },
        { value: '4', name: '太平洋保险' },
        { value: '5', name: '新华保险' },
        { value: '6', name: '中国太平' },
        { value: '7', name: '泰康人寿' },
        { value: '8', name: '安邦保险' },
        { value: '9', name: '阳光保险' },
        { value: '10', name: '生命人寿' },
        { value: '11', name: '中华保险' },
        { value: '12', name: '天安保险' },
        { value: '13', name: '大地保险' },
        { value: '14', name: '中邮人寿' },
        { value: '15', name: '国华人寿' },
        { value: '16', name: '前海人寿' },
        { value: '17', name: '合众人寿' },
        { value: '18', name: '幸福人寿' },
        { value: '19', name: '英大人寿' },
        { value: '20', name: '华泰保险' },
        { value: '21', name: '永安保险' },
        { value: '22', name: '招商信诺人寿' },
        { value: '23', name: '大都会人寿' },
        { value: '24', name: '安盛天平' },
        { value: '25', name: '信诚人寿' },
      ],
      indexInsuranceCompany: '',

      checked: false,
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    onChangeCheckbox(checked) {
      console.log('checked: ', checked)
      this.rz.policeSwitch = '1'
    },
    dataFilter(name) {
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
      this.checked = this.rz.policeSwitch === '1'

      const a = []
      const bdgongsi = this.dataFilter('bdgongsi')
      const bdjftype = this.dataFilter('bdjftype')
      const bdjine = this.dataFilter('bdjine')
      const bdci = this.dataFilter('bdci')
      const bdtype = this.dataFilter('bdtype')

      bdgongsi.forEach((v, i) => {
        const o = this.columnsInsuranceCompany.filter(
          item => item.value === v['bdgongsi'],
        )[0]
        console.log(bdci[i]['bdci'])
        if (v['bdgongsi']) {
          a[i] = {
            bdgongsi: o,
            bdjftype: bdjftype[i]['bdjftype'],
            bdjine: bdjine[i]['bdjine'],
            bdci: bdci[i]['bdci'],
            bdtype: bdtype[i]['bdtype'],
          }
        }
      })
      this.baodanArr = a
    },
    selectInsuranceCompany(i) {
      this.indexInsuranceCompany = i
      this.showPickerInsuranceCompany = true
    },
    // 选择器确认 保险公司
    onConfirmInsuranceCompany(e) {
      // this.valueQueryTimes = e.name
      this.baodanArr[this.indexInsuranceCompany]['bdgongsi'] = e
      this.showPickerInsuranceCompany = false
    },
    add() {
      if (this.baodanArr.length >= 3) {
        this.$toast.fail('最多添加3笔保单')
        return
      }
      const o = {
        bdgongsi: {},
        bdjftype: '',
        bdjine: '',
        bdci: '',
        bdtype: '',
      }
      this.baodanArr.push(o)
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
