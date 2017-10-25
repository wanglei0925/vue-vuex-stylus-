/**
 * Created by C on 2017/10/19.
 */
import * as types from './mutations-types'
const mutations = {
  [types.SET_DETAIL](state, flag) {
    state.flagdetail = flag
  },
  [types.SET_SELLER](state, list) {
    state.seller = list
  },
  [types.SET_FOODDE](state, list) {
    state.foodDetail = list
  }
}
export default mutations
