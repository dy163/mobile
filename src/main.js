import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
/**
 * 这个第三方包引入就ok 他会自动根据页面的宽度设置基准字体
 */
import 'amfe-flexible'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

// import {
//   NavBar,
//   Field
//  } from 'vant'

// Vue
// .use(NavBar)
// .use(Field)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
