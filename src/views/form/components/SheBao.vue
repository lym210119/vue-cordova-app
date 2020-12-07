<template>
  <div class="she-bao">
    <van-field
      v-model="rz.sbnianxian"
      name="sbnianxian"
      type="number"
      label="缴存年限"
      placeholder="缴存年限"
      maxlength="20"
    />
    <van-field
      v-model="rz.sbjine"
      name="sbjine"
      type="number"
      label="共缴金额"
      placeholder="共缴金额(元)"
      maxlength="20"
    />
    <van-field
      v-model="rz.sbjishu"
      name="sbjishu"
      type="number"
      label="社保基数"
      placeholder="社保基数"
      maxlength="20"
    />
    <van-field name="sbduanjiao" label="是否断缴" autofocus>
      <template #input>
        <van-radio-group v-model="rz.sbduanjiao" direction="horizontal">
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
