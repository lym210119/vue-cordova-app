<template>
  <div class="tax-loan">
    <van-field
      v-model="rz.nashui"
      name="nashui"
      type="number"
      label="最近2年纳税总额"
      placeholder="最近2年纳税总额(元)"
      maxlength="20"
    />
    <van-field
      v-model="rz.kaipiao"
      name="kaipiao"
      type="number"
      label="开票总额"
      placeholder="开票总额(元)"
      maxlength="20"
    />
    <van-field name="nashuiduanjiao" label="有无断缴" autofocus>
      <template #input>
        <van-radio-group v-model="rz.nashuiduanjiao" direction="horizontal">
          <van-radio name="1">是</van-radio>
          <van-radio name="2">否</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field name="nashuipingji" label="纳税评级" autofocus>
      <template #input>
        <van-radio-group v-model="rz.nashuipingji" direction="horizontal">
          <van-radio name="1">A</van-radio>
          <van-radio name="2">B</van-radio>
          <van-radio name="3">C</van-radio>
          <van-radio name="4">D</van-radio>
          <van-radio name="5">M</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field name="changeFaren" label="最近1年有无法人变更" autofocus>
      <template #input>
        <van-radio-group v-model="rz.changeFaren" direction="horizontal">
          <van-radio name="1">有</van-radio>
          <van-radio name="2">无</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field name="changeGuquan" label="最近1年有无股权变更" autofocus>
      <template #input>
        <van-radio-group v-model="rz.changeGuquan" direction="horizontal">
          <van-radio name="1">有</van-radio>
          <van-radio name="2">无</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field
      v-model="rz.farenzhangu"
      name="farenzhangu"
      type="number"
      label="法人占股比例"
      placeholder="法人占股比例(%)"
      maxlength="20"
    />
    <van-field name="zhizhaoyouguansi" label="营业执照名下是否有官司" autofocus>
      <template #input>
        <van-radio-group v-model="rz.zhizhaoyouguansi" direction="horizontal">
          <van-radio name="1">是</van-radio>
          <van-radio name="2">否</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field name="jingyingdizhishiyizhi" label="经营地址是否一致" autofocus>
      <template #input>
        <van-radio-group
          v-model="rz.jingyingdizhishiyizhi"
          direction="horizontal"
        >
          <van-radio name="1">是</van-radio>
          <van-radio name="2">否</van-radio>
        </van-radio-group>
      </template>
    </van-field>

    <van-field
      v-model="rz.farenfuzhai"
      name="farenfuzhai"
      type="number"
      label="法人负债"
      placeholder="法人负债(万元)"
      maxlength="20"
    />
    <van-field
      v-model="rz.qiyefuzhai"
      name="qiyefuzhai"
      type="number"
      label="企业负债"
      placeholder="企业负债(万元)"
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
  mounted() {
    this.rz.nashuiduanjiao = this.rz.nashuiduanjiao + ''
    this.rz.nashuipingji = this.rz.nashuipingji + ''
    this.rz.changeFaren = this.rz.changeFaren + ''
    this.rz.changeGuquan = this.rz.changeGuquan + ''
    this.rz.zhizhaoyouguansi = this.rz.zhizhaoyouguansi + ''
    this.rz.jingyingdizhishiyizhi = this.rz.jingyingdizhishiyizhi + ''
  },
}
</script>

<style></style>
