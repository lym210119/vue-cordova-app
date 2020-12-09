const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            'nav-bar-background-color': '#1ab394',
            'nav-bar-text-color': '#ffffff',
            'nav-bar-title-text-color': '#ffffff',
            'nav-bar-icon-color': '#ffffff',
            // 'border-color': '#eee',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            // hack: `true; @import "./src/styles/theme.less";`,
          },
        },
      },
    },
  },
  publicPath: '',
  // outputDir: '../erp/tandan',
  filenameHashing: false,
  productionSourceMap: false,
  devServer: {
    https: false,
    // proxy: {
    //   '/erp': {
    //     // 将www.example.com映射为/apis
    //     target: 'http://192.168.10.208:8008', // 接口域名
    //     secure: false, // 如果是https接口，需要配置这个参数
    //     changeOrigin: true // 是否跨域
    //   }
    // }
  },
  // chainWebpack: config => {
  //   config.resolve.alias.set('@assets', resolve('src/assets/'))
  // },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = [
        'console.log',
      ]
    } else {
      // 为开发环境修改配置...
      // config.plugins.push(new VConsolePlugin({ enable: !!argv.debug }))
    }
  },
  pluginOptions: {
    cordovaPath: 'src-cordova',
  },
}
