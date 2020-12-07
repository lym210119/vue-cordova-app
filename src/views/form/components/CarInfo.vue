<template>
  <div class="car-info">
    <van-field name="hasCar" label="是否有车" required>
      <template #input>
        <van-radio-group v-model="rz.hasCar" direction="horizontal">
          <van-radio name="1">是</van-radio>
          <van-radio name="2">否</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <div class="my-section">
      <span>全款车 </span>
    </div>
    <van-field
      v-model="rz.qkcpaizhao"
      name="qkcpaizhao"
      type="text"
      label="车辆牌照"
      placeholder="车辆牌照"
      maxlength="20"
    />
    <van-field
      v-model="rz.qkczongjia"
      name="qkczongjia"
      type="number"
      label="购买总价"
      placeholder="购买总价(万元)"
      maxlength="20"
    />
    <van-field
      v-model="rz.qkcnianxian"
      name="qkcnianxian"
      type="digit"
      label="已开年限"
      placeholder="已开年限"
      maxlength="2"
    />
    <van-field
      v-model="rz.mileage"
      name="mileage"
      type="number"
      label="已开公里数"
      placeholder="已开公里数(km)"
      maxlength="10"
    />
    <van-field name="isAccidentCar" label="是否有事故">
      <template #input>
        <van-radio-group v-model="rz.isAccidentCar" direction="horizontal">
          <van-radio name="1">是</van-radio>
          <van-radio name="2">否</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field name="isInspectionNormal" label="是否年检正常">
      <template #input>
        <van-radio-group v-model="rz.isInspectionNormal" direction="horizontal">
          <van-radio name="1">是</van-radio>
          <van-radio name="2">否</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field
      readonly
      clickable
      autofocus
      name="qkcdengji"
      :value="rz.qkcdengji"
      label="登记证时间"
      placeholder="点击选择登记证时间"
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
    <div class="my-section">
      <span>按揭车 </span>
    </div>
    <van-field
      v-model="rz.ajcpaizhao"
      name="ajcpaizhao"
      type="text"
      label="车辆牌照"
      placeholder="车辆牌照"
      maxlength="20"
    />
    <van-field
      v-model="rz.ajcyuegong"
      name="ajcyuegong"
      type="number"
      label="月供金额"
      placeholder="月供金额(元)"
      maxlength="20"
    />
    <van-field
      v-model="rz.ajchuankuan"
      name="ajchuankuan"
      type="digit"
      label="还款期数"
      placeholder="还款期数"
      maxlength="20"
    />
    <van-field
      v-model="rz.ajcjine"
      name="ajcjine"
      type="number"
      label="车贷总金额"
      placeholder="车贷总金额(万元)"
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
      this.rz.qkcdengji = `${year} - ${month} - ${day}`
      this.showPickerDate = false
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
