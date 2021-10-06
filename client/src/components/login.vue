<template>
  <div class="container">
    <div class="bg-overlay" />
    <section v-if="!loggedIn">

    <h1>Login</h1>
      <input type="text" placeholder="username" class="form-control mb-2" v-model="user.name">
      <input type="password" placeholder="password" class="form-control mb-2" v-model="user.password">
      <button class="btn btn-primary" @click="onLogin()">
        Login <BootstrapIcon icon="pencil-square" />
      </button><hr>
      <router-link to="/register"><button class="shadow btn btn-secondary btn-sm">Register</button></router-link>
    </section>
    <section v-else>
      <h1>Logged in successfully</h1>
      <button class="btn btn-primary" @click="goHome()">
        Continue <BootstrapIcon icon="check" />
      </button>
      <pre>{{user}}</pre>

    </section>


      <!-- <div class="corner-btn" @click="goHome()"><BootstrapIcon size="3x" icon="x" /></div> -->
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
// import VueJwtDecode from 'vue-jwt-decode'

export default {
  name: 'App',
  components: {
    BootstrapIcon,
  },
  data() {
    return {
      loggedIn: false,
      errors: {},
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted() {
    if(this.user.name) this.loggedIn = true
  },
  methods: {
    ...mapActions(['login']),

    async onLogin(){
      this.errors = {}
      try {
        const res = await this.login(this.user)
        const token = res.data.token
        localStorage.setItem("token", token);
        if(res.status === 200) this.loggedIn = true
        this.$router.push('/')
      }
      catch (err) {
        console.error(err)
        this.errors = err
      }

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
