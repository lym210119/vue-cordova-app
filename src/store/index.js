import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {
      userName: '',
      userId: '',
      compid: '',
    },
    hasLogin: false,
    baseUrl: 'https://jyw.jinchensoft.com',
    baseUrlStatus: '1',
  },
  getters: {
    userInfo: state => state.userInfo,
    hasLogin: state => state.hasLogin,
    baseUrl: state => state.baseUrl,
    baseUrlStatus: state => state.baseUrlStatus,
  },
  mutations: {
    LOGIN: (state, provider) => {
      state.hasLogin = true
      // state.userInfo.token = provider.token
      state.userInfo.userName = provider.username
      state.userInfo.userId = provider.userid
      state.userInfo.compid = provider.compid
      localStorage.setItem('store', JSON.stringify(state))
    },
    LOGOUT: state => {
      state.hasLogin = false
      state.userInfo = {}
      localStorage.removeItem('store')
    },
    SETbaseUrl: (state, url) => {
      state.baseUrl = url.baseUrl
      state.baseUrlStatus = url.baseUrlStatus
      localStorage.setItem('store', JSON.stringify(state))
    },
  },
  actions: {
    login({ commit }, userInfo) {
      commit('LOGIN', userInfo)
    },
    logout({ commit }) {
      commit('LOGOUT')
    },
    setbaseUrl({ commit }, url) {
      commit('SETbaseUrl', url)
    },
  },
})

export default store
