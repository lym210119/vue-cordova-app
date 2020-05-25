exports.install = function(Vue, options, cb) {
  document.addEventListener(
    'deviceready',
    () => {
      if (
        typeof window.device === 'undefined' ||
        typeof window.device.cordova === 'undefined'
      ) {
        return cb(false)
      }

      // default values
      Vue.cordova.device = {
        cordova: null,
        model: null,
        platform: null,
        uuid: null,
        version: null,
        manufacturer: null,
        isVirtual: null,
        serial: null,
      }

      Object.keys(Vue.cordova.device).forEach(key => {
        if (typeof window.device[key] !== 'undefined') {
          Vue.cordova.device[key] = window.device[key]
        }
      })
      console.log('inde')
      return cb(true)
    },
    false,
  )
}
