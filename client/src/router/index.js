import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import ReadQr from '../components/ReadQr.vue'
import About from '../components/HelloWorld.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/restaurant/:restaurantId', name: 'Restaurant', component: Home },
  { path: '/readqr/addStamp/:user', name: 'ReadQr', component: ReadQr },
  { path: '/about', name: 'About', component: About }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
