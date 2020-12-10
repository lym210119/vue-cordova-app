<template>
  <div class="basic">
    <van-field
      v-model="cus.CNAME"
      name="cname"
      type="text"
      label="客户姓名"
      placeholder="客户姓名"
      required
      maxlength="6"
      autofocus
    />
    <van-field name="sexid" label="客户性别" required autofocus>
      <template #input>
        <van-radio-group v-model="gender" direction="horizontal">
          <van-radio name="1">先生</van-radio>
          <van-radio name="2">女士</van-radio>
        </van-radio-group>
      </template>
    </van-field>

    <van-field
      v-model="rz.card"
      name="card"
      type="text"
      label="身份证号"
      placeholder="身份证号"
      required
      autofocus
      maxlength="18"
    />

    <van-field
      v-model="rz.age"
      name="age"
      type="digit"
      label="年龄"
      placeholder="年龄"
      required
      autofocus
      maxlength="2"
    />

    <van-field
      readonly
      clickable
      required
      autofocus
      name="jkedu"
      :value="rz.jkedu"
      label="借款额度"
      placeholder="点击选择借款额度"
      @click="showPickerLoanAmount = true"
    >
      <template #input>
        <input
          type="text"
          readonly
          placeholder="点击选择借款额度"
          :value="valueLoanAmount || rz.jkedu"
          class="van-field__control"
        />
      </template>
    </van-field>
    <van-popup v-model="showPickerLoanAmount" position="bottom">
      <van-picker
        value-key="name"
        show-toolbar
        :columns="columnsLoanAmount"
        @confirm="onConfirmLoanAmount"
        @cancel="showPickerLoanAmount = false"
      />
    </van-popup>

    <van-field name="intoType" label="进件类型" required autofocus>
      <template #input>
        <van-radio-group v-model="rz.intoType" direction="horizontal">
          <van-radio name="1">抵押</van-radio>
          <van-radio name="2">信贷</van-radio>
        </van-radio-group>
      </template>
    </van-field>

    <van-field
      required
      readonly
      clickable
      autofocus
      name="expectDate"
      :value="rz.expectDate"
      label="期望到账时间"
      placeholder="点击选择期望到账时间"
      @click="showPickerDate = true"
    />
    <van-popup v-model="showPickerDate" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="showPickerDate = false"
        @confirm="onConfirmDate"
      />
    </van-popup>

    <van-field name="hyzk" label="婚姻状况" required autofocus>
      <template #input>
        <van-radio-group v-model="rz.hyzk" direction="horizontal">
          <van-radio name="1">已婚</van-radio>
          <van-radio name="2">未婚</van-radio>
          <van-radio name="3">离异</van-radio>
          <van-radio name="4">丧偶</van-radio>
        </van-radio-group>
      </template>
    </van-field>

    <van-field
      v-model="rz.hkd"
      name="hkd"
      type="text"
      label="户口地"
      placeholder="户口地"
      required
      autofocus
      maxlength="20"
    />

    <van-field name="isdaikuan" label="配偶可否知晓贷款" required autofocus>
      <template #input>
        <van-radio-group v-model="rz.isdaikuan" direction="horizontal">
          <van-radio name="1">是</van-radio>
          <van-radio name="2">否</van-radio>
        </van-radio-group>
      </template>
    </van-field>

    <van-field name="iszhixi" label="直系亲属可否知晓贷款" required autofocus>
      <template #input>
        <van-radio-group v-model="rz.iszhixi" direction="horizontal">
          <van-radio name="1">是</van-radio>
          <van-radio name="2">否</van-radio>
        </van-radio-group>
      </template>
    </van-field>
  </div>
</template>

<script>
export default {
  props: {
    cus: {
      type: Object,
      required: true,
    },
    rz: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      gender: '',
      columnsLoanAmount: [
        { value: '99', name: '暂不确定' },
        { value: '1', name: '2万元以下' },
        { value: '2', name: '2~5万元' },
        { value: '3', name: '5~10万元' },
        { value: '4', name: '10~30万元' },
        { value: '5', name: '30~50万元' },
        { value: '6', name: '50~100万元' },
        { value: '7', name: '100~300万元' },
        { value: '8', name: '300~500万元' },
        { value: '9', name: '500~1000万元' },
        { value: '10', name: '1000万元以上' },
      ],
      valueLoanAmount: '',
      showPickerLoanAmount: false,

      showPickerDate: false,
      minDate: new Date(),
      maxDate: new Date(
        new Date().getFullYear() + 5,
        new Date().getMonth(),
        new Date().getDate(),
      ),
      currentDate: new Date(),
    }
  },
  created() {
    console.log('this.cus: ', this.cus)
    if (this.cus.sexid) {
      this.gender = this.cus.sexid === '先生' ? '1' : '2'
    }
  },
  mounted() {
    if (this.rz.jkedu) {
      const index = this.columnsLoanAmount.findIndex(
        v => v.value === this.rz.jkedu,
      )
      console.log('index: ', index)
      if (index !== -1) {
        this.valueLoanAmount = this.columnsLoanAmount[index].name
      }
    }
    console.log('this.rz.expectDate: ', this.rz.expectDate)

    this.currentDate = this.rz.expectDate || this.currentDate
  },
  methods: {
    // 日期选择器确认 期望到账时间
    onConfirmDate(date) {
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let day = date.getDate()
      day = day < 10 ? '0' + day : day
      this.rz.expectDate = `${year}-${month}-${day}`
      this.showPickerDate = false
    },
    // 选择器确认 借款额度
    onConfirmLoanAmount(e) {
      this.valueLoanAmount = e.name
      this.rz.jkedu = e.value
      this.showPickerLoanAmount = false
    },
  },
}
</script>

<style></style>
