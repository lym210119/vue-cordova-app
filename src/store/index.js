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
  },
  getters: {
    userInfo: state => state.userInfo,
    hasLogin: state => state.hasLogin,
    baseURL: state => state.baseURL,
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
    SETBASEURL: (state, url) => {
      state.baseURL = url
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
