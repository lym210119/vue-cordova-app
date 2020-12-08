<template>
  <div class="weilidai">
    <van-field name="wldtiqu" label="是否提取" autofocus>
      <template #input>
        <van-radio-group v-model="rz.wldtiqu" direction="horizontal">
          <van-radio name="1">是</van-radio>
          <van-radio name="2">否</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field
      v-model="rz.wldjine"
      name="wldjine"
      type="number"
      label="微粒贷金额"
      placeholder="微粒贷金额(元)"
      maxlength="20"
    />
    <van-field
      readonly
      clickable
      autofocus
      name="wldtime"
      :value="rz.wldtime"
      label="提取时间"
      placeholder="点击选择提取时间"
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
    <van-field name="wldzhengxin" label="是否上征信" autofocus>
      <template #input>
        <van-radio-group v-model="rz.wldzhengxin" direction="horizontal">
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
      minDate: new Date(
        new Date().getFullYear() - 10,
        new Date().getMonth(),
        new Date().getDate(),
      ),
      maxDate: new Date(),
      currentDate: new Date(),
    }
  },
  mounted() {
    this.currentDate = this.rz.wldtime || this.currentDate
  },
  methods: {
    // 日期选择器确认 期望到账时间
    onConfirmDate(date) {
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let day = date.getDate()
      day = day < 10 ? '0' + day : day
      this.rz.wldtime = `${year}-${month}-${day}`
      this.showPickerDate = false
    },
  },
}
</script>

<style></style>
