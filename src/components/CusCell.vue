<template>
  <div class="cell-item">
    <div class="item-left" :style="`background-color: ${item.bgColor}`">
      {{ item.name }}
    </div>
    <div class="item-right">
      <div class="title">
        <span>{{ item.CNAME }} ({{ item.KEYID }})</span>
        <span>{{ item.UVAL || '暂无' }}</span>
      </div>
      <div class="desc">
        {{ item.ASSETS || '暂无' }}
      </div>
      <div class="time">预约时间：{{ item.yydate || '暂无' }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      khfl: {},
    }
  },
  props: {
    item: {
      type: Object,
      reuqired: true,
    },
  },
  created() {},
}
</script>

<style lang="scss" scoped>
.cell-item {
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 10px;
  background-color: #ffffff;

  &::before {
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    transform: scaleY(0.5);
    background-color: #ebedf0;
  }
  .item-left {
    width: 60px;
    height: 60px;
    line-height: 60px;
    margin-right: 15px;
    text-align: center;
    border-radius: 50%;
    color: #ffffff;
  }

  .item-right {
    flex: 1;

    .title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-weight: 700;
    }

    .desc {
      margin: 10px 0;
      font-size: 12px;
    }

    .time {
      font-size: 10px;
      text-align: right;
    }
  }
}
</style>
