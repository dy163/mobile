import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 容器的状态
  state: {
    user: JSON.parse(window.localStorage.getItem('user'))
  },
  // 容器的 methods (修改容器state的数据)
  mutations: {
    setUser (state, user) {
      state.user = user
      // 持久化本地信息
      window.localStorage.setItem('user', JSON.stringify(state.user))
    }
  },
  actions: {

  }
})
