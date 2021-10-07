<template>
  <div class="container">
    <div class="bg-overlay" />
      <BootstrapIcon size="5x" icon="upc-scan" />
      <div class="info">
        <h1>{{stamps.length}}/10</h1>
      </div>
      <hr>

      <div class="mt-4 d-flex full-width-btn justify-content-between" @click="addStamp()">
        <div class="restBtnName">{{'Add Stamp'}}</div>
        <div class="restBtnFav"><BootstrapIcon size="2x" icon="emoji-smile-fill" /></div>
      </div>
      <div class="mt-4 d-flex full-width-btn justify-content-between" @click="clearStamps()">
        <div class="restBtnName">Clear Card</div>
        <div class="restBtnFav"><BootstrapIcon size="2x" icon="emoji-smile" /></div>
      </div>

      <hr>

      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThree">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Info
            </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <table class="table" v-if="stamps && stamps.length > 0">
                <thead>
                  <th>Id</th>
                  <th>Date</th>
                </thead>
                <tbody>
                  <tr v-for="stamp in stamps" :key="stamp.id">
                    <td>{{stamp.id}}</td>
                    <td>{{formatDate(stamp.createdAt)}}</td>
                  </tr>
                </tbody>
              </table>
              <pre>{{user}}</pre>
            </div>
          </div>
        </div>
      </div>

      <div class="corner-btn" @click="goHome()"><BootstrapIcon size="3x" icon="x" /></div>

  </div>
</template>

<script>
import axios from 'axios'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import {mapGetters, mapActions} from 'vuex'
import io from 'socket.io-client'
import { DateTime } from "luxon";

export default {
  name: 'App',
  components: {
    BootstrapIcon,
  },
  computed: {
    ...mapGetters(['restaurants', 'stamps', 'user']),
    userId(){
      return this.$route.params.user
    }
  },
  data() {
    return {
      server: process.env.VUE_APP_API,
      socket: io(process.env.VUE_APP_API),
    }
  },
  mounted() {
    this.checkLogin().then(loggedIn => {
      if(loggedIn) console.log("LOGGED IN:", loggedIn)
      else this.$router.push("/login")
    })
    this.getData()
    this.socket.on('PING',() => {
      console.log("GOT PINGED");
    })
  },
  methods: {
    ...mapActions(['addToCount', 'fetchStamps', 'fetchRestaurants', 'checkLogin']),
    
    async getData(){
      await this.fetchStamps({restaurantId: this.user.restaurantId, userId: this.userId})
    },
    goHome(){
      this.$router.push('/')
    },

    async addStamp(){
      const url = this.server+'/api/stamps'
      const data = {"restaurantId": this.user.restaurantId, "userId":this.userId}
      const headers = {'x-access-token': localStorage.getItem("token")}
      const res = await axios.post(url, data, {headers})

      // const res = await axios.post(this.server+'/api/stamps/', data)
      console.log(res.data)
      this.getData()
      this.socket.emit('STAMPED')
    },
    async clearStamps(){
      // let data = "restaurantId="+this.restaurantId+"&userId="+this.userId
      let data = {"restaurantId": this.user.restaurantId, "userId":this.userId}
      const headers = {'x-access-token': localStorage.getItem("token")}
      const res = await axios.delete(this.server+'/api/stamps/clear', { data, headers })
      console.log(res.data)
      this.getData()
      this.socket.emit('STAMPED')
    },
    formatDate(date){
      return DateTime.fromISO(date).toFormat('cccc d.M.yyyy H:mm')
      // console.log(formatted);
      // return date
    }

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
  background-color: hsla(0, 0%, 0%, 0.6);
  margin: .5rem;
  font-size: 2em;
}
.full-width-btn{
  display: inline-block;
  color: #FFFFFF;
  background-color: hsla(0, 0%, 0%, 0.6);
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

.info{
  border: 1px solid black;
  display: block;
  color: #FFFFFF;
  background-color: hsla(0, 0%, 0%, 0.4);
  margin: .2rem;
  padding: .5em;
}
h1{
  padding:0px;
  margin: 0px !important;
}



pre{
  /* color: rgba(255,255,255,.6) */
  color: hsla(0, 0%, 50%, 1)
}
</style>
