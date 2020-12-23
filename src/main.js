import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import './styles/index.scss'

import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import {
  Toast,
  Button,
  Form,
  Field,
  ActionSheet,
  NavBar,
  Dialog,
  Search,
  Sticky,
  PullRefresh,
  List,
  Tabs,
  Tab,
  Collapse,
  CollapseItem,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  Popup,
  Picker,
  DatetimePicker,
  Step,
  Steps,
  Tag,
  Uploader,
  Icon,
  Progress,
} from 'vant'

import * as Api from './api'

Vue.use(Toast)
Vue.use(Button)
Vue.use(Form)
Vue.use(Field)
Vue.use(ActionSheet)
Vue.use(NavBar)
Vue.use(Dialog)
Vue.use(Search)
Vue.use(Sticky)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Tabs)
Vue.use(Tab)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Popup)
Vue.use(Picker)
Vue.use(DatetimePicker)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Tag)
Vue.use(Uploader)
Vue.use(Icon)
Vue.use(Progress)
Vue.config.productionTip = false
FastClick.attach(document.body)
Toast.setDefaultOptions({ forbidClick: true })
// if (
//   Object.prototype.hasOwnProperty.call(window, 'cordova') &&
//   typeof cordova === 'object'
// ) {

document.addEventListener('deviceready', async function() {
  console.log('deviceready: ')
  Vue.prototype.$cordova = window.cordova
  Vue.prototype.$device = window.device
  Vue.prototype.$Media = window.Media
  Vue.prototype.$File = window.File
  Vue.prototype.$FileTransfer = window.FileTransfer
  Vue.prototype.$FileUploadOptions = window.FileUploadOptions
  Vue.prototype.$StatusBar = window.StatusBar
  Vue.prototype.$http = Api

  if (window.StatusBar.height) {
    await window.StatusBar.height(function(height) {
      console.log('height: ', height)
      Vue.prototype.$StatusBarHeight = height
    })
  } else {
    Vue.prototype.$StatusBarHeight = 0
  }

  var permissions = window.cordova.plugins.permissions
  var list = [
    permissions.INTERNET,
    permissions.RECORD_AUDIO,
    permissions.WRITE_EXTERNAL_STORAGE,
  ]
  list.forEach(v => {
    permissions.checkPermission(v, function(status) {
      if (status.hasPermission) {
        console.log(`Yes :D  - ${v}`)
      } else {
        console.warn(`No :( - ${v}`)
        permissions.requestPermission(
          v,
          function success(status) {
            console.log('status: ', status)
            if (!status.hasPermission)
              console.warn(`${v} permission is not turned on`)
          },
          function error() {
            console.warn(`${v} permission is not turned on`)
          },
        )
      }
    })
  })

  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')

  window.navigator.splashscreen.hide()
})
// } else {
//   new Vue({
//     router,
//     store,
//     render: h => h(App),
//   }).$mount('#app')
// }
