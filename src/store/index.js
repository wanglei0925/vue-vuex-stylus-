/**
 * Created by C on 2017/10/19.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
Vue.use(Vuex)
export default new Vuex.Store({
  mutations,
  actions,
  getters,
  state
})
