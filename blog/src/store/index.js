import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inputvalue:''
  },
  mutations: {
    setMdname(state, val) {
      state.mdname = val
    },
    setValue(state,val) {
      state.inputvalue = val
    },
  },
  actions: {
  },
  modules: {
  }
})
