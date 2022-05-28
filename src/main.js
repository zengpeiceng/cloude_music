import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 重置样式
import 'assets/css/normalize.css'
import 'assets/css/reset.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import 'default-passive-events'

Vue.use(ElementUI)
Vue.config.productionTip = false

// 过滤器日期： yyyy-mm-dd
Vue.filter('dateFormat', (dataStr) => {
  let time = new Date(dataStr);
  function timeAdd0(str) {
    if(str < 10) {
      str = '0' + str;
    }
    return str;
  }
  let y = time.getFullYear();
  let m = time.getMonth() + 1;
  let d = time.getDate();

  return y + '-' + timeAdd0(m) + '-' + timeAdd0(d)
})
// 过滤器时间: 00:00
Vue.filter('timeFormat', (time) => {
  let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  minutes = minutes <= 9 ? '0' + minutes : minutes;
  let seconds = Math.floor((time % (1000 * 60)) / 1000);
  seconds = seconds <= 9 ? '0' + seconds : seconds;
  return minutes + ":" + seconds;
})
// 过滤数据：超过10000 显示x万
Vue.filter('dataFormat', (data) => {
  if(data > 10000) {
    return Math.floor(data / 10000) + '万'
  }else {
    return data
  }
})
let vueMain = new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

export default vueMain
