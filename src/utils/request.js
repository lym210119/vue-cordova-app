import axios from 'axios'
// import qs from 'qs'
import { Toast } from 'vant'
import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // transformRequest: data => qs.stringify(data),
  timeout: 5000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    console.log('store.getters: ', store.getters)
    config.baseURL = store.getters.baseURL
    console.log('config: ', config)
    // do something before request is sent
    Toast.loading({
      forbidClick: true,
      duration: 0, // 持续展示 toast
    })
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  },
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // 手动清除 Toast
    Toast.clear()

    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 1) {
    // Toast.fail(res.msg || 'Error')
    // Message({
    //   message: res.message || 'Error',
    //   type: 'error',
    //   duration: 5 * 1000
    // })

    // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //   // to re-login
    //   Dialog.confirm({
    //     title: '确认登出',
    //     message: '您已注销，可以取消以保留在该页面上，或者再次登录',
    //   }).then(() => {
    //     // on confirm
    //     store.dispatch('user/resetToken').then(() => {
    //       location.reload()
    //     })
    //   })
    //   // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //   //   confirmButtonText: 'Re-Login',
    //   //   cancelButtonText: 'Cancel',
    //   //   type: 'warning'
    //   // }).then(() => {
    //   //   store.dispatch('user/resetToken').then(() => {
    //   //     location.reload()
    //   //   })
    //   // })
    // }
    // return Promise.reject(new Error(res.msg || 'Error'))
    // } else {
    return res
    // }
  },
  error => {
    console.log('err' + error) // for debug
    Toast.fail(error.message)
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000,
    // })
    return Promise.reject(error)
  },
)

export default service
