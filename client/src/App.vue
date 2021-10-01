<template>
  <div class="container">
    <div class="bg-overlay" />
    <h1>{{restaurant.name}}</h1>
    <div class="d-flex flex-wrap justify-content-center stamp-grid">
        <div
          class="stamp-place d-flex align-items-center justify-content-center text-primary"
          v-for="n, i in 10"
          :key="i"
          v-html="stamps && stamps[i] ? icons.stamp : ''"
          />
    </div>
    
    <hr>
    <canvas id="canvas"></canvas>
    <hr>
    <button class="btn btn-secondary me-1" @click="addStamp()">add stamp</button>
    <button class="btn btn-secondary me-1" @click="clearStamps()">clear</button>

    <div class="corner-btn" v-html="icons.dots" @click="toggleMenu()" />
    <div class="full-menu pt-4" v-if="menuOpen">
      <div class="corner-btn" v-html="icons.x" @click="toggleMenu()" />
      <ul class="nav flex-column mt-4">
        <li class="nav-item" v-for="r in restaurants" :key="r.id">
          <a class="nav-link" :href="'?restaurant='+r.id">{{r.name}}</a>
        </li>
      </ul>
    </div>
      <!-- <pre>{{stamps}}</pre> -->
  </div>
</template>

<script>
import axios from 'axios'
import QRCode from 'qrcode'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'App',
computed: {
  ...mapGetters({count: 'count', stamps: 'stamps'}),
  restaurantId(){
    let uri = window.location.href.split('?')[1]
    let data = uri.split("=")
    let restaurant = "invalid url"
    if(data[0]==="restaurant") restaurant = data[1]

    return restaurant
  }
},
  data() {
    return {
      server: 'http://192.168.1.134:3000',
      user: {
        id: 666,
        name: "stna"
      },
      // stamps: {},
      restaurants: {},
      restaurant: {},
      menuOpen: false,
      icons:{
        stamp: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd" /></svg>',
        dots: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>',
        x: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>'
      }
    }
  },
  mounted() {
    this.getStamps()
    this.getRestaurants()
    this.getRestaurant()
    this.generateQR()
  },
  methods: {
    ...mapActions(['addToCount', 'fetchStamps']),
    async getStamps(){
      this.fetchStamps({server: this.server, restaurant: this.restaurantId, user: this.user})
    },
    async getRestaurants(){
      const res = await axios.get(this.server+'/restaurants',)
      this.restaurants = res.data
    },
    async getRestaurant(){
      const res = await axios.get(this.server+'/restaurant/?restaurant='+this.restaurantId,)
      this.restaurant = res.data
    },
    async addStamp(){
      let data = "restaurant="+this.restaurantId+"&user="+this.user.id
      const res = await axios.get(this.server+'/stamp?'+data)
      console.log(res.data)
      this.getStamps()
    },
    async clearStamps(){
      let data = "restaurant="+this.restaurantId+"&user="+this.user.id
      const res = await axios.post(this.server+'/clear', data)
      console.log(res.data)
      this.getStamps()
    },
    toggleMenu(){
      this.menuOpen = !this.menuOpen
    },
    generateQR(){
      const canvas = document.getElementById('canvas')
      const url = this.server+'/stamp?restaurant='+this.restaurantId+'&user='+this.user.id

      QRCode.toCanvas(canvas, url, error => {
        if (error) console.error(error)
        console.log('QR code generated successfully');
      })
    },
  },
}
</script>

<style>
body{
  background-image: url('./assets/img/wooden.jpg');
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
  color: #FFFFFF;
  background-color: hsla(0, 0%, 0%, 0.2);
  margin: 1rem;
  font-size: 2em;
}
</style>
