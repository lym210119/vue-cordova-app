<template>
  <div class="zhuang-xiu">
    <van-field name="zxdzhuangxiu" label="是否真实装修" autofocus>
      <template #input>
        <van-radio-group v-model="rz.zxdzhuangxiu" direction="horizontal">
          <van-radio name="1">是</van-radio>
          <van-radio name="2">否</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field
      v-model="rz.zxdyinhang"
      name="zxdyinhang"
      type="text"
      label="资方名称"
      placeholder="资方名称"
      maxlength="20"
    />
    <van-field
      v-model="rz.zxdqishu"
      name="zxdqishu"
      type="number"
      label="贷款期数"
      placeholder="贷款期数"
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
}
</script>

<style></style>
