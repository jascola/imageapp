import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  flag: false,
  message:''
};

const mutations = {
  login(state) {
    state.flag =true;
  },
  logout(state) {
    state.flag = false;
  },
  setMessage(state,msg) {
    state.message = msg;
  }
};

export default new Vuex.Store({
  state,
  mutations
})
