<template>
  <div class="status-bar">
    <van-nav-bar
      :title="title"
      :left-text="leftText"
      :right-text="rightText"
      @click-right="onClickRight"
      fixed
      placeholder
      safe-area-inset-top
      z-index="9999"
      :style="`padding-top: ${paddingTop}px`"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      paddingTop: 20,
    }
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    leftText: {
      type: String,
      default: '',
    },
    rightText: {
      type: String,
      default: '',
    },
  },
}
</script>

<style></style>
