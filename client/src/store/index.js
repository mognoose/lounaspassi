import { createStore } from "vuex" 
import axios from "axios" 
import VueJwtDecode from 'vue-jwt-decode'

const server = process.env.VUE_APP_API

const state = {
  stamps: {},
  restaurants: {},
  favorites: {},
  user: {}
}

const getters = {
  stamps: state => state.stamps,
  restaurants: state => state.restaurants,
  favorites: state => state.favorites,
  user: state => state.user
}

const actions = {
  async fetchStamps({commit}, params){
    const url = server+'/api/stamps'
    const headers = {'x-access-token': localStorage.getItem("token")}
    const stamps = await axios.get(url, {params, headers})
    commit('setStamps', stamps.data)
  },
  async fetchRestaurants({commit}, data){
    const restaurants = await axios.get(server+'/api/restaurants?', { params: {q: data}})
    commit('setRestaurants', restaurants.data)
  },
  async fetchFavorites({commit}, data){
    const url = server+'/api/favorite'
    const headers = {'x-access-token': localStorage.getItem("token")}
    const params = {userId: data.userId}
    const favorites = await axios.get(url, {params, headers})
    commit('setFavorites', favorites.data)
  },

  // eslint-disable-next-line
  async register({}, data){
    const res = await axios.post(server+'/api/users', data)
    return res.data
  },
  async login({commit}, data){
  const res = await axios.get(server+'/api/users/login', { params: data })
  localStorage.setItem("user", JSON.stringify(res.data));

  commit('setUser', res.data)
  return res
  },
  async checkLogin({commit}){
    let token = localStorage.getItem("token");
    try {
      //decode token here and attach to the user object
      const now = (Math.floor(Date.now() / 1000))
      const res = await VueJwtDecode.decode(token);
      if(res.exp < now) {
        this.$router.push("/login")
        commit('logout')
      }
      const user = JSON.parse(localStorage.getItem("user"))
      commit('setUser', user)
      return true
    } catch (error) {
      // return error in production env
      commit('logout')
      return false
    }
  },
  async logout({commit}){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    commit('logout')
    return "session terminated"
  }
}

const mutations = {
   setStamps(state, stamps){
      state.stamps = stamps
   },
   setRestaurants(state, restaurants){
      state.restaurants = restaurants
   },
   setFavorites(state, favorites){
      state.favorites = favorites
   },
   setUser(state, data){
      state.user = data
   },
   logout(state){
     console.log("USERDATA DELETED")
      state.user = {}
   }
}

export default createStore({
   state,
   getters,
   actions,
   mutations
 })