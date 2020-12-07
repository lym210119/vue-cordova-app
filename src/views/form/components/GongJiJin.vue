<template>
  <div class="gongjijin">
    <van-field
      v-model="rz.gjjnianxian"
      name="gjjnianxian"
      type="number"
      label="缴存年限"
      placeholder="缴存年限"
      maxlength="20"
    />
    <van-field
      v-model="rz.gjjjine"
      name="gjjjine"
      type="number"
      label="共缴金额"
      placeholder="共缴金额(元)"
      maxlength="20"
    />
    <van-field
      v-model="rz.gjjjishu"
      name="gjjjishu"
      type="number"
      label="公积金基数"
      placeholder="公积金基数"
      maxlength="20"
    />
    <van-field name="gjjduanjiao" label="是否断缴" autofocus>
      <template #input>
        <van-radio-group v-model="rz.gjjduanjiao" direction="horizontal">
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
