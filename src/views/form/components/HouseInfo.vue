<template>
  <div class="house-info">
    <van-field name="propertyStatus" label="产权情况">
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
    <van-field name="rzDyStructChange" label="更改结构">
      <template #input>
        <van-radio-group v-model="rz.rzDyStructChange" direction="horizontal">
          <van-radio name="1">有</van-radio>
          <van-radio name="2">无</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <div class="my-section">
      <span>全款房 </span>
    </div>
    <van-field
      v-model="rz.fwaddress"
      name="fwaddress"
      type="text"
      label="房屋详细地址"
      placeholder="房屋详细地址"
      maxlength="20"
    />
    <van-field
      v-model="rz.fwmianji"
      name="fwmianji"
      type="number"
      label="建筑面积"
      placeholder="建筑面积(㎡)"
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
    <van-field
      v-model="rz.fwpinggu"
      name="fwpinggu"
      type="number"
      label="评估单价"
      placeholder="评估单价(元/㎡)"
      maxlength="20"
    />
    <van-field name="ifCertificate" label="是否办证">
      <template #input>
        <van-radio-group v-model="rz.ifCertificate" direction="horizontal">
          <van-radio name="1">是</van-radio>
          <van-radio name="2">否</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field name="rzHouseLocation" label="房屋所在地">
      <template #input>
        <van-radio-group v-model="rz.rzHouseLocation" direction="horizontal">
          <van-radio name="1">本地</van-radio>
          <van-radio name="2">外地</van-radio>
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
    <div class="my-section">
      <span>按揭房 </span>
    </div>
    <van-field
      v-model="rz.anjietao"
      name="anjietao"
      type="number"
      label="数量"
      placeholder="数量"
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
    <van-field name="suozaidi" label="房屋所在地">
      <template #input>
        <van-radio-group v-model="rz.suozaidi" direction="horizontal">
          <van-radio name="1">本地</van-radio>
          <van-radio name="2">外地</van-radio>
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
  methods: {
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
