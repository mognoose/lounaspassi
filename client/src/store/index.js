import { createStore } from "vuex" 
import axios from "axios" 

const state = {
   stamps: {}
}

const getters = {
   stamps: state => state.stamps
}

const actions = {
   async fetchStamps({commit}, data){
      const stamps = await axios.get(data.server+'/stamps?restaurant='+data.restaurant+'&user='+data.user.id)
      commit('setStamps', stamps.data)
   }
}

const mutations = {
   setStamps(state, stamps){
      state.stamps = stamps
   }
}

export default createStore({
   state,
   getters,
   actions,
   mutations
 })