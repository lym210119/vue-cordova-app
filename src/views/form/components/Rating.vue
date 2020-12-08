<template>
  <div class="rating">
    <div class="level" :style="'color:' + score.color">
      {{ score.cusLevel }}
    </div>
    <div class="item">
      <label>进件方式：</label>
      <span>{{ score.code === 'dyS' ? '抵押' : '信贷' }}</span>
    </div>
    <div class="item">
      <label>基础服务费率：</label>
      <span>{{ score.fee.fee1 + '%' }}</span>
    </div>
    <div class="item">
      <label>资质费：</label>
      <span>{{ score.fee.fee2 + '%' }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    score: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.level {
  font-size: 250px;
  font-weight: bold;
  text-align: center;
}
.item {
  padding: 10px 0;

  label {
    width: 50%;
    display: inline-block;
    text-align: right;
  }

  span {
    font-weight: bold;
  }
}
</style>
