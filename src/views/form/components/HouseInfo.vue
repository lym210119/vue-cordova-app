<template>
  <div class="house-info">
    <van-field
      v-show="false"
      v-model="fieldValue"
      is-link
      readonly
      label="地区"
      placeholder="请选择所在地区"
      @click="show = true"
    />
    <van-field v-model="rz.fwsheng" name="fwsheng" v-show="false" />
    <van-field v-model="rz.fwshengval" name="fwshengval" v-show="false" />
    <van-field v-model="rz.fwshi" name="fwshi" v-show="false" />
    <van-field v-model="rz.fwshival" name="fwshival" v-show="false" />
    <van-popup v-model="show" round position="bottom">
      <van-cascader
        v-model="cascaderValue"
        title="请选择所在地区"
        :options="options"
        :field-names="fieldNames"
        active-color="#1ab394"
        @close="show = false"
        @finish="onFinish"
      />
    </van-popup>
    <van-field
      v-model="rz.fwaddress"
      name="fwaddress"
      type="text"
      label="房屋详细地址"
      placeholder="房屋详细地址"
      maxlength="20"
    />
    <van-field name="rzHouseLocation" label="房屋所在地">
      <template #input>
        <van-radio-group v-model="rz.rzHouseLocation" direction="horizontal">
          <van-radio name="1">本地</van-radio>
          <van-radio name="2">外地</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field name="rzDyHousePlace" label="位置">
      <template #input>
        <van-radio-group v-model="rz.rzDyHousePlace" direction="horizontal">
          <van-radio name="1">三环内</van-radio>
          <van-radio name="2">三环外</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field name="rzDyThat" label="房龄">
      <template #input>
        <van-radio-group v-model="rz.rzDyThat" direction="horizontal">
          <van-radio name="1">20年内</van-radio>
          <van-radio name="2">20～30年</van-radio>
          <van-radio name="3">30年以上</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field name="propertyStatus" label="产权情况" required>
      <template #input>
        <van-radio-group v-model="rz.propertyStatus" direction="horizontal">
          <van-radio name="1">正常</van-radio>
          <van-radio name="2">产权涉及查封</van-radio>
          <van-radio name="3">未成年人</van-radio>
          <van-radio name="4">70岁以上</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field name="rzDyHouseType" label="房型">
      <template #input>
        <van-radio-group v-model="rz.rzDyHouseType" direction="horizontal">
          <van-radio name="1">住宅</van-radio>
          <van-radio name="2">非住宅</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field name="rzBuyStatus" label="购买情况">
      <template #input>
        <van-radio-group v-model="rz.rzBuyStatus" direction="horizontal">
          <van-radio name="1">首套</van-radio>
          <van-radio name="2">二套</van-radio>
          <van-radio name="3">多套</van-radio>
        </van-radio-group>
      </template>
    </van-field>

    <van-field
      readonly
      clickable
      name="fwtype"
      :value="rz.fwtype"
      label="房屋类型"
      placeholder="点击选择房屋类型"
      @click="showPickerHouseType = true"
    >
      <template #input>
        <input
          type="text"
          readonly
          placeholder="点击选择房屋类型"
          :value="valueHouseType"
          class="van-field__control"
        />
      </template>
    </van-field>
    <van-popup v-model="showPickerHouseType" position="bottom">
      <van-picker
        value-key="name"
        show-toolbar
        :columns="columnsHouseType"
        @confirm="onConfirmHouseType"
        @cancel="showPickerHouseType = false"
      />
    </van-popup>

    <van-field name="ifCertificate" label="是否办证">
      <template #input>
        <van-radio-group v-model="rz.ifCertificate" direction="horizontal">
          <van-radio name="1">是</van-radio>
          <van-radio name="2">否</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field name="rzDyStructChange" label="更改结构">
      <template #input>
        <van-radio-group v-model="rz.rzDyStructChange" direction="horizontal">
          <van-radio name="1">有</van-radio>
          <van-radio name="2">无</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field
      v-model="rz.fwmianji"
      name="fwmianji"
      type="number"
      label="房产面积"
      placeholder="房产面积(㎡)"
      maxlength="20"
    />
    <van-field
      v-model="rz.communityName"
      name="communityName"
      type="text"
      label="小区名称"
      placeholder="小区名称"
      maxlength="20"
    />
    <van-field name="isSchoolArea" label="是否学区">
      <template #input>
        <van-radio-group v-model="rz.isSchoolArea" direction="horizontal">
          <van-radio name="1">是</van-radio>
          <van-radio name="2">否</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field
      v-model="rz.schoolAreaName"
      name="schoolAreaName"
      type="text"
      label="学区名称"
      placeholder="学区名称"
      maxlength="20"
    />
    <van-field
      v-model="rz.fwzongjia"
      name="fwzongjia"
      type="number"
      label="购买总价"
      placeholder="购买总价(万元)"
      maxlength="20"
    />

    <van-field name="mortgageStatus" label="抵押物状态">
      <template #input>
        <van-radio-group v-model="rz.mortgageStatus" direction="horizontal">
          <van-radio name="1">全款</van-radio>
          <van-radio name="2">抵押房</van-radio>
        </van-radio-group>
      </template>
    </van-field>

    <div class="quankuan">
      <van-field
        v-model="rz.fwpinggu"
        name="fwpinggu"
        type="number"
        label="评估单价"
        placeholder="评估单价(万元)"
        maxlength="20"
      />
      <van-field
        v-model="rz.shellPrice"
        name="shellPrice"
        type="number"
        label="贝壳价格"
        placeholder="贝壳价格(万元)"
        maxlength="20"
      />
      <van-field
        v-model="rz.otherAssessments"
        name="otherAssessments"
        type="number"
        label="其他评估"
        placeholder="其他评估(万元)"
        maxlength="20"
      />
      <van-field
        v-model="rz.passBridge"
        name="passBridge"
        type="number"
        label="过桥金额"
        placeholder="过桥金额(万元)"
        maxlength="20"
      />
      <van-field
        v-model="rz.redemon"
        name="redemon"
        type="number"
        label="赎楼金额"
        placeholder="赎楼金额(万元)"
        maxlength="20"
      />
      <van-field
        v-model="rz.redemonNode"
        name="redemonNode"
        type="text"
        label="赎楼节点"
        placeholder="赎楼节点"
        maxlength="20"
      />
    </div>

    <div class="diya">
      <van-field
        v-model="rz.originalLoanBank"
        name="originalLoanBank"
        type="text"
        label="原贷款行"
        placeholder="原贷款行"
        maxlength="20"
      />
      <van-field
        v-model="rz.loanAmount"
        name="loanAmount"
        type="text"
        label="贷款金额"
        placeholder="贷款金额"
        maxlength="20"
      />
      <van-field
        v-model="rz.yuegong"
        name="yuegong"
        type="number"
        label="月供金额"
        placeholder="月供金额(元)"
        maxlength="20"
      />
      <van-field
        v-model="rz.qishu"
        name="qishu"
        type="number"
        label="已还期数"
        placeholder="已还期数"
        maxlength="20"
      />
      <van-field
        v-model="rz.loanBalance"
        name="loanBalance"
        type="number"
        label="贷款余额"
        placeholder="贷款余额"
        maxlength="20"
      />
    </div>
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
      show: false,
      fieldValue: this.rz.fwshengval + '/' + this.rz.fwshival,
      cascaderValue: '',
      fieldNames: {
        text: 'VAL',
        value: 'KEYID',
        children: 'children',
      },
      options: [
        {
          text: '浙江省',
          value: '330000',
          children: [],
        },
      ],

      showPickerHouseType: false,
      columnsHouseType: [
        { value: '1', name: '别墅' },
        { value: '2', name: '住宅' },
        { value: '3', name: '商铺' },
        { value: '4', name: '商住两用' },
        { value: '5', name: '厂房' },
        { value: '6', name: '还建房' },
        { value: '7', name: '自建房' },
        { value: '8', name: '其他' },
      ],
      valueHouseType: '',
    }
  },
  mounted() {
    this.$http
      .getAllAreaInfo({ compId: this.$store.state.userInfo.compid })
      .then(res => {
        this.options = res.data
      })
    const index = this.columnsHouseType.findIndex(
      v => v.value === this.rz.fwtype,
    )
    this.valueHouseType = index > -1 ? this.columnsHouseType[index].name : ''

    this.rz.propertyStatus = this.rz.propertyStatus + ''
    this.rz.rzDyThat = this.rz.rzDyThat + ''
  },
  methods: {
    // 全部选项选择完毕后，会触发 finish 事件
    onFinish({ selectedOptions }) {
      this.show = false
      this.fieldValue = selectedOptions.map(option => option.VAL).join('/')
      console.log('selectedOptions: ', selectedOptions)
      this.rz.fwsheng = selectedOptions[0].KEYID
      this.rz.fwshengval = selectedOptions[0].VAL
      this.rz.fwshi = selectedOptions[1].KEYID
      this.rz.fwshival = selectedOptions[1].VAL
    },
    // 选择器确认 房屋类型
    onConfirmHouseType(e) {
      this.valueHouseType = e.name
      this.rz.fwtype = e.value
      this.showPickerHouseType = false
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
