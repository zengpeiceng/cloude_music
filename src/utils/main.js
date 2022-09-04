import axios from 'axios'

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    // baseURL: 'http://localhost:3000',
    baseURL:'https://netease-cloud-music-api-mu-liard.vercel.app/',
    timeout: 5000,
  })

  //允许跨域携带cookie信息
  instance.defaults.withCredentials = true
  // 2.axios的拦截器
  instance.interceptors.request.use(function (config) {
    if(localStorage.getItem("music-vuex-along").root) {
      const cookie=JSON.parse(localStorage.getItem("music-vuex-along")).root.UserModule.userState.cookie;
      if(cookie) {
        config.cookie = cookie 
      }
    }
    return config
  }, err => {
    console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}
