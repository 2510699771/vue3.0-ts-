import { createStore } from 'vuex'

export default createStore({
  state: {
    userinfo: null || JSON.parse(localStorage.getItem('user')!)
  },
  mutations: {
    setuserinfo(state, dara) {
      state.userinfo = data
    }
  },
  actions: {
  },
  modules: {
  }
})
