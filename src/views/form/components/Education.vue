<template>
  <div class="education">
    <van-field name="xlbenke" label="全日制本科及以上" autofocus>
      <template #input>
        <van-radio-group v-model="rz.xlbenke" direction="horizontal">
          <van-radio name="1">是</van-radio>
          <van-radio name="2">否</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field
      v-model="rz.xlzhima"
      name="xlzhima"
      type="number"
      label="芝麻信用分"
      placeholder="芝麻信用分"
      maxlength="20"
    />
    <van-field
      v-model="rz.xltongguo"
      name="xltongguo"
      type="number"
      label="大数据通过率"
      placeholder="大数据通过率(%)"
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
