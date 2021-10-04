<template>
  <div class="container">
    <div class="bg-overlay" />
      <BootstrapIcon size="5x" icon="upc-scan" />
      <h1>{{stamps.length}}/10</h1>

        <div class="d-flex full-width-btn justify-content-between" @click="addStamp()">
          <div class="restBtnName">{{'Add Stamp'}}</div>
          <div class="restBtnFav"><BootstrapIcon size="2x" icon="emoji-smile-fill" /></div>
        </div>
        <hr>
        <div class="d-flex full-width-btn justify-content-between" @click="clearStamps()">
          <div class="restBtnName">Clear Card</div>
          <div class="restBtnFav"><BootstrapIcon size="2x" icon="emoji-smile" /></div>
        </div>

      <pre>{{stamps}}</pre>
  </div>
</template>

<script>
import axios from 'axios'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import {mapGetters, mapActions} from 'vuex'
import io from 'socket.io-client'

export default {
  name: 'App',
  components: {
    BootstrapIcon,
  },
  computed: {
    ...mapGetters(['restaurants', 'stamps']),
    userId(){
      return this.$route.params.user
    }
  },
  data() {
    return {
      server: 'http://192.168.1.135:3000',
      socket: io('http://192.168.1.135:3000'),
      user: {
        id: 666,
        name: "stna"
      },
      searchString: "",
      restaurantId: 2,
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
    this.socket.on('PING',() => {
      console.log("GOT PINGED");
    })
  },
  methods: {
    ...mapActions(['addToCount', 'fetchStamps', 'fetchRestaurants']),
    
    async getData(){
      let userId = await this.$route.params.user
      await this.fetchStamps({restaurantId: this.restaurantId, userId})
    },
    goHome(){
      this.$router.push('/')
    },

    async addStamp(){
      let data = {"restaurantId": this.restaurantId, "userId":this.userId}
      const res = await axios.post(this.server+'/api/stamps/', data)
      console.log(res.data)
      this.getData()
      this.socket.emit('STAMPED')
    },
    async clearStamps(){
      // let data = "restaurantId="+this.restaurantId+"&userId="+this.userId
      let data = {"restaurantId": this.restaurantId, "userId":this.userId}
      const res = await axios.delete(this.server+'/api/stamps/clear', { data })
      console.log(res.data)
      this.getData()
      this.socket.emit('STAMPED')
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
