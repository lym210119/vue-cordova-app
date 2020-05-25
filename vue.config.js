const VConsolePlugin = require('vconsole-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const argv = require('yargs').describe('debug', 'debug 环境').argv

module.exports = {
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
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.plugins.push(
        // 添加代码压缩工具，及设置生产环境自动删除console
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              // warnings: false,
              drop_debugger: true,
              drop_console: true
            }
          },
          sourceMap: false,
          parallel: true
        })
      )
    } else {
      // 为开发环境修改配置...
      config.plugins.push(new VConsolePlugin({ enable: !!argv.debug }))
    }
  },
  pluginOptions: {
    cordovaPath: 'src-cordova',
  },
}
