import { createApp } from 'vue'
import App from './App.vue'
import vuex from "vuex"
import store from "./store"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

createApp(App).use(store).use(vuex).mount('#app')
