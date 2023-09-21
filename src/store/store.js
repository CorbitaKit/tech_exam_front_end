import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
Vue.use(Vuex)

const state = {
    user: [],
    token: '',
    stores: [],
    store: [],
}

export default new Vuex.Store({
    actions,
    state,
})