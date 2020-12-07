<template>
  <div class="wage">
    <van-field
      readonly
      clickable
      autofocus
      name="dktime"
      :value="rz.dktime"
      label="打卡时间"
      placeholder="点击选择打卡时间"
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
    <van-field
      v-model="rz.dkjine"
      name="dkjine"
      type="number"
      label="打卡金额"
      placeholder="打卡金额(元/月)"
      maxlength="20"
    />
    <van-field
      v-model="rz.dkxianjin"
      name="dkxianjin"
      type="number"
      label="现金流"
      placeholder="现金流(元/月)"
      maxlength="20"
    />
    <van-field name="dkguding" label="是否固定打卡" autofocus>
      <template #input>
        <van-radio-group v-model="rz.dkguding" direction="horizontal">
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
    rz: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showPickerDate: false,
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
    }
  },
  methods: {
    // 日期选择器确认 期望到账时间
    onConfirmDate(date) {
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let day = date.getDate()
      day = day < 10 ? '0' + day : day
      this.rz.dktime = `${year} - ${month} - ${day}`
      this.showPickerDate = false
    },
  },
}
</script>

<style></style>
