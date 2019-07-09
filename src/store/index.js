import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 容器的状态
  state: {
    count: 0
  },
  // 容器的 methods (修改容器state的数据)
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {

  }
})
