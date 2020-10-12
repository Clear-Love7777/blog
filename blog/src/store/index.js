import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inputvalue:''
  },
  mutations: {
    setValue(state,val) {
      state.inputvalue = val
    },
  },
  actions: {
  },
  modules: {
  }
})
