import { createStore } from "vuex" 
import axios from "axios" 
const server = process.env.VUE_APP_API

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
      const stamps = await axios.get(server+'/api/stamps?restaurantId='+data.restaurantId+'&userId='+data.userId)
      commit('setStamps', stamps.data)
   },
   async fetchRestaurants({commit}, data){
      const restaurants = await axios.get(server+'/api/restaurants?q='+data)
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