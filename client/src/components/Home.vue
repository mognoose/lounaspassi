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
      <hr>
      <button class="btn btn-secondary me-1" @click="addStamp()">add stamp</button>
      <button class="btn btn-secondary me-1" @click="clearStamps()">clear</button>

      <div class="corner-btn" @click="goHome()"><BootstrapIcon size="3x" icon="x" /></div>
      <div class="full-menu pt-4" v-if="menuOpen">
        <div class="corner-btn" v-html="icons.x" @click="toggleMenu()" />
        <ul class="nav flex-column mt-4">
          <li class="nav-item" v-for="r in restaurants" :key="r.id">
            <a class="nav-link" href.prevent="'?restaurant='+r.id" @click="onSelectRestaurant(r.id)">{{r.name}}</a>
          </li>
        </ul>
      </div>
    </section>
      <!-- <pre>{{stamps}}</pre> -->
  </div>
</template>

<script>
import axios from 'axios'
import QRCode from 'qrcode'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'App',
  components: {
    BootstrapIcon,
  },
  computed: {
    ...mapGetters(['restaurants', 'stamps']),
    restaurantId(){
      return this.$route.params.restaurantId
    }
  },
  data() {
    return {
      server: 'http://192.168.1.135:3000',
      user: {
        id: 666,
        name: "stna"
      },
      searchString: "",
      restaurant: {},
      menuOpen: false,
      icons:{
        stamp: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd" /></svg>',
        dots: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>',
        x: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>',
        search: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>'
      },
      favourites: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    ...mapActions(['addToCount', 'fetchStamps', 'fetchRestaurants']),

    onAddFavourites(r){
      this.favourites.push(r);
    },
    onRemoveFavourites(r){
      this.favourites = this.favourites.filter(f => f !== r)
    },
    
    async getData(){
      if(this.restaurantId){
        this.generateQR()
        await this.getRestaurant()
        await this.fetchStamps({server: this.server, restaurant: this.restaurantId, user: this.user})
      }
    },
    async getRestaurants(){
      const res = await axios.get(this.server+'/restaurants?q='+this.searchString,)
      this.restaurants = res.data
    },
    async getRestaurant(){
      if(this.restaurantId){
        const res = await axios.get(this.server+'/restaurant/?restaurant='+this.restaurantId,)
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
    generateQR(){
      const canvas = document.getElementById('canvas')
      const url = 'http://192.168.1.135:8080/readqr/addstamp/'+this.user.id
      if(canvas){
        QRCode.toCanvas(canvas, url, error => {
          if (error) console.error(error)
          console.log('QR code generated successfully');
        })
      }
    },
    async addStamp(){
      let data = "restaurant="+this.restaurantId+"&user="+this.user.id
      const res = await axios.get(this.server+'/stamp?'+data)
      console.log(res.data)
      await this.fetchStamps({server: this.server, restaurant: this.restaurantId, user: this.user})
    },
    async clearStamps(){
      let data = "restaurant="+this.restaurantId+"&user="+this.user.id
      const res = await axios.post(this.server+'/clear', data)
      console.log(res.data)
      await this.fetchStamps({server: this.server, restaurant: this.restaurantId, user: this.user})
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
