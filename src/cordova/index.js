const pluginsList = ['cordova-plugin-device', 'cordova-plugin-camera']
exports.install = (Vue, options) => {
  Vue.cordova = Vue.cordova || {
    deviceready: false,
    plugins: [],
  }
  Vue.cordova.on = (eventName, cb) => {
    document.addEventListener(eventName, cb, false)
  }
  document.addEventListener(
    'deviceready',
    () => {
      Vue.cordova.deviceready = true
    },
    false,
  )
  pluginsList.forEach(pluginName => {
    let plugin = require('./plugins/' + pluginName)
    plugin.install(Vue, options, pluginLoaded => {
      if (pluginLoaded) {
        Vue.cordova.plugins.push(pluginName)
      }
      if (Vue.config.debug) {
        console.log(
          '[VueCordova]',
          pluginName,
          '→',
          pluginLoaded ? 'loaded' : 'not loaded',
        )
      }
    })
  })
}
