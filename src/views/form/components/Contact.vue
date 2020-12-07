<template>
  <div class="contact">
    <div class="contact-item" v-for="(item, i) in contactsNum" :key="i">
      <div class="my-section">
        <span>联系人 </span>
        <van-tag round type="primary">{{ i + 1 }}</van-tag>
      </div>
      <van-field
        v-model="item.contact"
        :name="'contact' + (i + 1) + '[name]'"
        type="text"
        label="联系人姓名"
        placeholder="联系人姓名"
        maxlength="20"
      />
      <van-field
        v-model="item.contact"
        :name="'contact' + (i + 1) + '[TEL]'"
        type="digit"
        label="联系人电话"
        placeholder="联系人电话"
        maxlength="20"
      />
    </div>
    <div style="margin: 16px; text-align: center;">
      <van-button
        round
        type="primary"
        size="normal"
        native-type="button"
        @click="add"
      >
        添加联系人
      </van-button>
    </div>
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
  data() {
    return {
      contactsNum: 1,
    }
  },
  methods: {
    add() {
      if (this.contactsNum >= 5) {
        this.$toast.fail('最多添加5个联系人')
        return
      }
      this.contactsNum++
    },
  },
}
</script>

<style lang="scss" scoped>
.my-section {
  margin: 0;
  padding: 16px;
  color: #1989fa;
  font-weight: normal;
  font-size: 14px;
  font-weight: bold;
  line-height: 16px;
  background-color: #f6f6f6;
}
</style>
