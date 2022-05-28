module.exports = {
  // publicPath: '/',
  // assetsDir: 'static',
  // devServer: {
  //   proxy: {
  //       '/api':{
  //          target:'http://localhost:3000/',//设置你调用的接口域名和端口
  //           changeOrigin:true,//這裡true表示实现跨域
  //           pathRewrite:{
  //             '/api':''
  //           }
  //         },
          
  //     }
  // },
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
        'network': '@/network',
        'utils': '@/utils'
      }
    }
  },
  lintOnSave: false,
}