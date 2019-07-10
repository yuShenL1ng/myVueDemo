import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    count: 0
}

const getters = {
   /* getterCount(state) {
          return (state.count += 10)
    } */
}
const mutations = {
    mutationsAddCount(state) {
        return (state.count += 10)
    }
}
const actions = {
    actionsAddCount(context) {
        return context.commit('mutationsAddCount')
    }
}

export default new Vuex.Store({
    state,
	getters,
	mutations,
	actions
}) 