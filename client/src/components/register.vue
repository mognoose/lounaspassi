<template>
  <div class="container">
    <div class="bg-overlay" />
    <h1>Register</h1>
      <input type="text" placeholder="username" class="form-control mb-2" v-model="user.name">
      <input type="text" placeholder="password" class="form-control mb-2" v-model="user.password">
      <input type="email" placeholder="email (optional)" class="form-control mb-2" v-model="user.email">

      <button class="btn btn-primary" @click="register()">
        Register <BootstrapIcon icon="pencil-square" />
      </button>
      <hr>


      <div class="corner-btn" @click="goHome()"><BootstrapIcon size="3x" icon="x" /></div>
  </div>
</template>

<script>
import axios from 'axios'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'

export default {
  name: 'App',
  components: {
    BootstrapIcon,
  },
  data() {
    return {
      server: 'http://192.168.1.135:3000',
      user: {},
    }
  },
  methods: {

    async register(){
      let data = "name="+this.user.name+"&password="+this.user.password+"&email="+this.user.email+"&"
      const res = await axios.post(this.server+'/register', data)
      console.log(res.data)
    },
    goHome(){
      this.$router.push('/')
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
