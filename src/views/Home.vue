<template>
  <div class="home">
    <van-nav-bar
      title="客户列表"
      :left-text="leftText"
      right-text="退出"
      @click-right="onClickRight"
      fixed
      placeholder
      safe-area-inset-top
      z-index="9999"
    />

    <van-sticky :offset-top="47">
      <van-search
        v-model="keyword"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <van-button size="small" type="info" @click="onSearch"
            >搜索</van-button
          >
        </template>
      </van-search>
    </van-sticky>
    <div class="list-con">
      <van-pull-refresh
        class="pull-refresh"
        v-model="isLoading"
        @refresh="onRefresh"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <cus-cell
            v-for="(item, index) in list"
            :key="index"
            :item="item"
            @click.native="toDetail(item)"
          />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import CusCell from '@/components/CusCell.vue'
export default {
  name: 'Home',
  components: {
    CusCell,
  },
  data() {
    return {
      leftText: '',
      keyword: '',
      isLoading: false,

      finished: false,
      loading: false,
      list: [],
      page: 0,
    }
  },
  created() {
    const userName = this.$store.state.userInfo.userName
    if (userName) {
      this.leftText = userName
    }
  },
  mounted() {
    // this.onLoad()
    document.addEventListener('backbutton', this.onClickRight, false)
  },
  beforeDestroy() {
    document.removeEventListener('backbutton', this.onClickRight, false)
  },

  methods: {
    toDetail(e) {
      console.log('e: ', e)
      this.$router.push({ path: '/detail', query: e })
    },
    formatterCusType(i) {
      const KHFL = [
        { name: '', bgColor: '' },
        { name: '潜在', bgColor: '#f16801' },
        { name: '意向', bgColor: '#ff0000' },
        { name: '需求', bgColor: '#d88ae0' },
        { name: '签单', bgColor: '#3479f7' },
        { name: '放款', bgColor: '#239a03' },
      ]
      return KHFL[i]
    },
    getCusList() {
      return new Promise((resolve, reject) => {
        let params = {
          userId: this.$store.state.userInfo.userId,
          compid: this.$store.state.userInfo.compid,
          page: this.page,
          myinput: this.keyword,
        }

        this.$http
          .getCusList(params)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    onLoad() {
      this.page++
      this.getCusList().then(res => {
        console.log('res: ', res)
        if (res.length) {
          let arr = res.map(v => {
            v.khfl = this.formatterCusType(v.khfl)
            return v
          })
          console.log('arr: ', arr)
          this.list = this.list.concat(arr)
          console.log('this.list: ', this.list)
          // 加载状态结束
          this.loading = false
        } else {
          this.finished = true
        }
      })
    },
    onRefresh() {
      this.page = 0
      // this.onLoad()
      this.getCusList().then(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      })
    },
    onSearch() {
      this.page = 0
      this.list = []
      this.onLoad()
    },
    onClickRight() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '确定要退出重新登录吗？',
        })
        .then(() => {
          // on confirm
          this.$store.dispatch('logout').then(() => {
            this.$router.push('/login')
          })
        })
        .catch(() => {
          // on cancel
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  /deep/ .van-sticky {
    border-bottom: 1px solid #ebedf0;
  }

  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .list-con {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;

    .pull-refresh {
      flex: 1;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
    }
  }
}
</style>
