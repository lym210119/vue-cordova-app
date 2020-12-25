<template>
  <div class="setting">
    <van-nav-bar
      title="设置"
      left-text="返回"
      left-arrow
      fixed
      safe-area-inset-top
      z-index="9999"
      @click-left="onClickLeft"
      :style="`padding-top: ${this.$StatusBarHeight}px`"
    />
    <div
      class="navbar-height"
      :style="`padding-top: ${this.$StatusBarHeight + navBarHeight}px`"
    ></div>
    <van-form @submit="onSubmit">
      <van-field name="baseURLStatus" label="锦衣卫系统">
        <template #input>
          <van-radio-group
            v-model="baseURLStatus"
            direction="horizontal"
            @change="onChangeRadio"
          >
            <van-radio name="1">SAAS</van-radio>
            <van-radio name="2">本地</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-show="baseURLStatus === '2'"
        v-model="baseURL"
        name="baseURL"
        label="锦衣卫地址"
        placeholder="锦衣卫地址"
        :rules="[{ pattern, message: '地址格式错误' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          保存
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'Setting',
  data() {
    return {
      navBarHeight: 46,
      pattern: /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/,
      baseURL: this.$store.getters.baseURL,
      baseURLStatus: this.$store.getters.baseURLStatus,
    }
  },
  methods: {
    onChangeRadio(e) {
      console.log('e: ', e)
      if (e === '1') {
        this.baseURL = 'https://jyw.jinchensoft.com'
      } else {
        this.baseURL = ''
      }
    },
    onSubmit(e) {
      console.log('e: ', e)
      // 调用 Vuex
      this.$store.dispatch('setBaseUrl', e).then(() => {
        this.$toast.success({
          message: '设置成功！',
          forbidClick: true,
        })
      })
    },
    onClickLeft() {
      this.$router.go(-1)
    },
  },
}
</script>

<style></style>
