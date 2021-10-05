<template>
  <div class="container">
    <div class="bg-overlay" />
    <section v-if="!restaurantId">
      <div class="input-group">
          <input type="text" class="form-control" v-model="searchString">
          <button class="btn btn-primary" @click="fetchRestaurants(searchString)">
            <BootstrapIcon icon="search" />
          </button>
      </div>
        <ul class="nav flex-column mt-4">
          <li class="nav-item" v-for="r in favourites" :key="r.id">
            <div class="d-flex full-width-btn justify-content-between">
              <div class="restBtnName" @click="onSelectRestaurant(r.id)">{{r.name}}</div>
              <div class="restBtnFav" @click="onRemoveFavourites(r)"><BootstrapIcon size="2x" icon="heart-fill" /></div>
            </div>
          </li>
        </ul>
        <hr>
        <ul class="nav flex-column mt-4">
          <li class="nav-item" v-for="r in restaurants" :key="r.id">
            <div class="d-flex full-width-btn justify-content-between">
              <div class="restBtnName" @click="onSelectRestaurant(r.id)">{{r.name}}</div>
              <div class="restBtnFav" @click="onAddFavourites(r)"><BootstrapIcon size="2x" icon="heart" /></div>
            </div>
          </li>
        </ul>
      <div class="corner-btn" @click="onLogout()"><BootstrapIcon size="3x" icon="x" /></div>

    </section>
    <section v-else>
      <h1>{{restaurant.name}}</h1>
      <div class="d-flex flex-wrap justify-content-center stamp-grid">
          <div
            class="stamp-place d-flex align-items-center justify-content-center text-primary"
            v-for="n, i in 10"
            :key="i"
            >
              <BootstrapIcon icon="emoji-smile-fill" size="3x" v-if="stamps && stamps[i]" />
            </div>

      </div>
      <hr>
      <canvas id="canvas"></canvas>
      <div class="corner-btn" @click="goHome()"><BootstrapIcon size="3x" icon="x" /></div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import QRCode from 'qrcode'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import {mapGetters, mapActions} from 'vuex'
import io from 'socket.io-client'

export default {
  name: 'App',
  components: {
    BootstrapIcon,
  },
  computed: {
    ...mapGetters(['restaurants', 'stamps', 'user']),
    restaurantId(){
      return this.$route.params.restaurantId
    }
  },
  data() {
    return {
      server: process.env.VUE_APP_API,
      socket: io(process.env.VUE_APP_API),
      searchString: "",
      restaurant: {},
      menuOpen: false,
      favourites: []
    }
  },
  mounted() {
    if(!this.user.name) this.$router.replace('/login')

    this.getData()
    this.socket.on('PING',() => {
      console.log("GOT PINGED");
      this.getData()
    })
  },
  methods: {
    ...mapActions(['addToCount', 'fetchStamps', 'fetchRestaurants', 'logout']),

    onAddFavourites(r){
      this.favourites.push(r);
    },
    onRemoveFavourites(r){
      this.favourites = this.favourites.filter(f => f !== r)
    },
    
    async getData(){
      if(this.restaurantId){
        console.log("USER",this.user);
        this.generateQR()
        await this.getRestaurant()
        await this.fetchStamps({restaurantId: this.restaurantId, userId: this.user.id})

      }
    },
    async getRestaurants(){
      const res = await axios.get(this.server+'/restaurants?q='+this.searchString,)
      this.restaurants = res.data
    },
    async getRestaurant(){
      if(this.restaurantId){
        const res = await axios.get(this.server+'/api/restaurants/'+this.restaurantId,)
        this.restaurant = res.data
      }
    },
    async onSelectRestaurant(id){
      await this.$router.push('/restaurant/'+id)
      this.getData()
    },
    goHome(){
      this.$router.push('/')
    },
    onLogout(){
      this.logout()
      this.$router.push('/login')
    },
    generateQR(){
      const canvas = document.getElementById('canvas')
      const url = 'http://192.168.1.134:8080/readqr/addstamp/'+this.user.id
      if(canvas){
        QRCode.toCanvas(canvas, url, error => {
          if (error) console.error(error)
          console.log('QR code generated successfully');
        })
      }
    },
  },
}
</script>

<style>
body{
  background-image: url('../assets/img/wooden.jpg');
}
.bg-overlay{
  position: absolute;
  z-index: -1;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(0deg, rgba(255,255,255,0) 60%, rgba(255,255,255,.7) 100%);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.stamp-grid{
  background-color: hsla(0, 0%, 100%, .6);
  border: 1px solid hsla(0, 0%, 40%, 0.9);
}
.stamp-place{
  border: 1px solid hsla(0, 0%, 40%, 0.9);
  width: 20%;
  height: 6em;
}
.corner-btn{
  position: absolute;
  top: .5em;
  right: 1em;
  width: 3em;
}
.full-menu{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: hsla(0, 0%, 0%, 0.9);
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  color: white;
}
a.nav-link{
  display: inline-block;
  color: #FFFFFF;
  background-color: hsla(0, 0%, 0%, 0.3);
  margin: .5rem;
  font-size: 2em;
}
.full-width-btn{
  display: inline-block;
  color: #FFFFFF;
  background-color: hsla(0, 0%, 0%, 0.5);
  margin: .2rem;
  padding: .5em;
}
.restBtnName{
  max-width: 15rem;
  overflow: hidden;
  font-size: 1.6em;
}
.restBtnFav{
  padding-top: .4rem;
  width: 2rem;
}
</style>
