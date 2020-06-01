import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import { Toast, Button } from 'vant'

Vue.use(Toast)
Vue.use(Button)
Vue.config.productionTip = false

if (
  Object.prototype.hasOwnProperty.call(window, 'cordova') &&
  typeof cordova === 'object'
) {
  document.addEventListener('deviceready', function() {
    Vue.prototype.$cordova = window.cordova
    Vue.prototype.$device = window.device
    Vue.prototype.$Media = window.Media
    Vue.prototype.$File = window.File
    Vue.prototype.$FileTransfer = window.FileTransfer
    Vue.prototype.$FileUploadOptions = window.FileUploadOptions

    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  })
} else {
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')
}
