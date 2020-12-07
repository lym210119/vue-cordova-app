<template>
  <div class="credit-card">
    <van-field
      v-model="rz.xykjine"
      name="xykjine"
      type="number"
      label="授信总额"
      placeholder="授信总额(元)"
      maxlength="20"
    />
    <van-field
      v-model="rz.xykshiyong"
      name="xykshiyong"
      type="number"
      label="已使用"
      placeholder="已使用(元)"
      maxlength="20"
    />
    <van-field
      v-model="rz.useRatio"
      name="useRatio"
      type="number"
      label="使用比例"
      placeholder="使用比例(%)"
      maxlength="20"
    />
    <van-field name="ifCashOut" label="是否套现过" autofocus>
      <template #input>
        <van-radio-group v-model="rz.ifCashOut" direction="horizontal">
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
}
</script>

<style></style>
