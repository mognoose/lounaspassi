import { createStore } from "vuex" 
import axios from "axios" 
const server = process.env.VUE_APP_API

const state = {
   stamps: {},
   restaurants: {},
   user: {}
}

const getters = {
   stamps: state => state.stamps,
   restaurants: state => state.restaurants,
   user: state => state.user
}

const actions = {
   async fetchStamps({commit}, data){
      const stamps = await axios.get(server+'/api/stamps?restaurantId='+data.restaurantId+'&userId='+data.userId)
      commit('setStamps', stamps.data)
   },
   async fetchRestaurants({commit}, data){
      const restaurants = await axios.get(server+'/api/restaurants?q='+data)
      commit('setRestaurants', restaurants.data)
   },
   // eslint-disable-next-line
   async register({}, data){
      const res = await axios.post(server+'/api/users', data)
      return res.data
   },
   async login({commit}, data){
      const res = await axios.get(server+'/api/users/login', { params: data })
      console.log("VUEX",res.data);
      commit('setUser', res.data)
      return res
   },
   async logout({commit}){
      commit('logout')
      return "logged out"
   }
}

const mutations = {
   setStamps(state, stamps){
      state.stamps = stamps
   },
   setRestaurants(state, restaurants){
      state.restaurants = restaurants
   },
   setUser(state, data){
      state.user = data
   },
   logout(state){
      state.user = {}
   }
}

export default createStore({
   state,
   getters,
   actions,
   mutations
 })