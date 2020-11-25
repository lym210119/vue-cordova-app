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
      :rules="[{ required: true, message: '请填写客户姓名' }]"
    />
    <van-field name="sexid" label="客户性别" required autofocus>
      <template #input>
        <van-radio-group v-model="gender" direction="horizontal">
          <van-radio name="">未知</van-radio>
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
      :rules="[{ required: true, message: '请填写身份证号' }]"
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
      :rules="[{ required: true, message: '请填写年龄' }]"
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
          placeholder="点击选择借款额度"
          :value="valueLoanAmount"
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
      @click="showCalendarExpectDate = true"
    />
    <van-calendar
      v-model="showCalendarExpectDate"
      @confirm="onConfirmExpectDate"
      :show-confirm="false"
    />

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
      :rules="[{ required: true, message: '请填写户口地' }]"
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

      showCalendarExpectDate: false,
    }
  },
  created() {
    console.log('this.cus: ', this.cus)
    if (this.cus.sexid) {
      this.gender = this.cus.sexid === '先生' ? '1' : '2'
    }
  },
  methods: {
    // 日历选择器确认 期望到账时间
    onConfirmExpectDate(date) {
      this.rz.expectDate = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}`
      this.showCalendarExpectDate = false
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
