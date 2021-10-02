import { createStore } from "vuex" 
import axios from "axios" 
const server = 'http://192.168.1.135:3000'

const state = {
   stamps: {},
   restaurants: {}
}

const getters = {
   stamps: state => state.stamps,
   restaurants: state => state.restaurants
}

const actions = {
   async fetchStamps({commit}, data){
      const stamps = await axios.get(server+'/stamps?restaurant='+data.restaurant+'&user='+data.user.id)
      commit('setStamps', stamps.data)
   },
   async fetchRestaurants({commit}, data){
      const restaurants = await axios.get(server+'/restaurants?q='+data)
      commit('setRestaurants', restaurants.data)
   }
}

const mutations = {
   setStamps(state, stamps){
      state.stamps = stamps
   },
   setRestaurants(state, restaurants){
      state.restaurants = restaurants
   }
}

export default createStore({
   state,
   getters,
   actions,
   mutations
 })