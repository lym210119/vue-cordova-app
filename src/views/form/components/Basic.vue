<template>
  <div class="basic">
    <van-field
      v-model="cus.CNAME"
      name="cname"
      type="text"
      label="客户姓名"
      placeholder="客户姓名"
      required
      maxlength="6"
      autofocus
    />
    <van-field name="sexid" label="客户性别" required autofocus>
      <template #input>
        <van-radio-group v-model="gender" direction="horizontal">
          <van-radio name="1">先生</van-radio>
          <van-radio name="2">女士</van-radio>
        </van-radio-group>
      </template>
    </van-field>

    <van-field
      v-model="rz.card"
      name="card"
      type="text"
      label="身份证号"
      placeholder="身份证号"
      required
      autofocus
      maxlength="18"
      :rules="[{ pattern, message: '身份证号不正确' }]"
      @input="onInputIDCard"
    />

    <van-field
      class="input-readonly"
      v-model="rz.age"
      name="age"
      type="digit"
      label="年龄"
      placeholder="年龄"
      required
      autofocus
      maxlength="2"
      ref="age"
      disabled
    />

    <van-field name="hyzk" label="婚姻状况" required autofocus>
      <template #input>
        <van-radio-group v-model="rz.hyzk" direction="horizontal">
          <van-radio name="1">已婚</van-radio>
          <van-radio name="2">未婚</van-radio>
          <van-radio name="3">离异</van-radio>
          <van-radio name="4">丧偶</van-radio>
        </van-radio-group>
      </template>
    </van-field>

    <van-field
      v-show="rz.hyzk == 1"
      v-model="rz.spouseName"
      name="spouseName"
      type="text"
      label="配偶姓名"
      placeholder="配偶姓名"
      autofocus
      maxlength="20"
    />

    <van-field
      v-show="rz.hyzk == 1"
      v-model="rz.spouseAge"
      name="spouseAge"
      type="digit"
      label="配偶年龄"
      placeholder="配偶年龄"
      autofocus
      maxlength="2"
      ref="age"
    />

    <van-field
      v-model="rz.hkd"
      name="hkd"
      type="text"
      label="户口地"
      placeholder="户口地"
      required
      autofocus
      maxlength="20"
    />
    <van-field name="xlbenke" label="全日制本科及以上" autofocus>
      <template #input>
        <van-radio-group v-model="rz.xlbenke" direction="horizontal">
          <van-radio name="1">是</van-radio>
          <van-radio name="2">否</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field name="isdaikuan" label="配偶可否知晓贷款" required autofocus>
      <template #input>
        <van-radio-group v-model="rz.isdaikuan" direction="horizontal">
          <van-radio name="1">是</van-radio>
          <van-radio name="2">否</van-radio>
        </van-radio-group>
      </template>
    </van-field>

    <van-field name="iszhixi" label="直系亲属可否知晓贷款" required autofocus>
      <template #input>
        <van-radio-group v-model="rz.iszhixi" direction="horizontal">
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
    cus: {
      type: Object,
      required: true,
    },
    rz: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pattern: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,
      gender: '',
    }
  },
  created() {
    console.log('this.cus: ', this.cus)
    if (this.cus.sexid) {
      this.gender = this.cus.sexid === '先生' ? '1' : '2'
    }
  },
  mounted() {},
  methods: {
    // 身份证失去焦点时 自动计算出年龄出生
    onInputIDCard() {
      if (this.rz.card && this.rz.card.length === 18) {
        console.log(this.rz.card)
        const currentYear = new Date().getFullYear()
        const BornYear = this.rz.card.substring(6, 10)
        console.log('BornYear: ', BornYear)
        this.rz.age = currentYear - BornYear
      }
    },
  },
}
</script>

<style></style>
