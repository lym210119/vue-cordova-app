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
    baseURL: 'https://jyw.jinchensoft.com',
    baseURLStatus: '1',
  },
  getters: {
    userInfo: state => state.userInfo,
    hasLogin: state => state.hasLogin,
    baseURL: state => state.baseURL,
    baseURLStatus: state => state.baseURLStatus,
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
      localStorage.setItem('store', JSON.stringify(state))
    },
    SETBASEURL: (state, url) => {
      state.baseURL = url.baseURL
      state.baseURLStatus = url.baseURLStatus
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
    setBaseUrl({ commit }, url) {
      commit('SETBASEURL', url)
    },
  },
})

export default store
