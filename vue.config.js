const TerserPlugin = require('terser-webpack-plugin')
// const argv = require('yargs').describe('debug', 'debug 环境').argv

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
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV === 'production') {
  //     // 为生产环境修改配置...
  //     config.plugins.push(
  //       // 添加代码压缩工具，及设置生产环境自动删除console

  //       new TerserPlugin({
  //         terserOptions: {
  //           ecma: undefined,
  //           warnings: false,
  //           parse: {},
  //           compress: {
  //             drop_console: true,
  //             drop_debugger: false,
  //             pure_funcs: ['console.log'], // 移除console
  //           },
  //         },
  //       }),
  //     )
  //   } else {
  //     // 为开发环境修改配置...
  //     // config.plugins.push(new VConsolePlugin({ enable: !!argv.debug }))
  //   }
  // },
  pluginOptions: {
    cordovaPath: 'src-cordova',
  },
}
