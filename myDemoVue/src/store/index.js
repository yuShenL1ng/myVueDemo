import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    count: 0,
	headerMenuBackgroundColor:localStorage.getItem('headerMenuBackgroundColor')?localStorage.getItem('headerMenuBackgroundColor'):'#545c64'
}

const getters = {
   /* getterCount(state) {
          return (state.count += 10)
    } */
}
const mutations = {
    mutationsAddCount(state) {
        return (state.count += 10)
    },
	systemInfoUpdate(state,BackgroundColor){
		return (state.headerMenuBackgroundColor = BackgroundColor)
	}
}
const actions = {
    actionsAddCount(context) {
        return context.commit('mutationsAddCount')
    },
	actionSystemInfoUpdate(context,BackgroundColor){
		return context.commit('systemInfoUpdate',BackgroundColor)
	}
}

export default new Vuex.Store({
    state,
	getters,
	mutations,
	actions
}) 