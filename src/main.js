import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import checkLogin from './utils/check-login'
/**
 * 这个第三方包引入就ok 他会自动根据页面的宽度设置基准字体
 */
import 'amfe-flexible'
import Vant, {
  Lazyload
} from 'vant'
import 'vant/lib/index.css'
import relativeTime from './filters/relative-time'
import AppTabbar from './components/app-tabbar'
Vue.component('app-tabbar', AppTabbar)
// 注册图片懒加载指令
Vue.use(Lazyload)

Vue.use(Vant)
// 注册一个全局过滤器
Vue.filter('relativeTime', relativeTime)

// import {
//   NavBar,
//   Field
//  } from 'vant'

// Vue
// .use(NavBar)
// .use(Field)
Vue.prototype.$sleep = time => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve()
    }, time)
  })
}

// 将检查登录状态挂载到 Vue 原型对象上，这样的话任何组件就都可以使用了
Vue.prototype.$checkLogin = checkLogin

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
