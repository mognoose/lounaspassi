import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import ReadQr from '../components/ReadQr.vue'
import Login from '../components/login.vue'
import Register from '../components/register.vue'
import addRestaurant from '../components/addRestaurant.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/restaurant/create', name: 'AddRestaurant', component: addRestaurant },
  { path: '/restaurant/edit/:id', name: 'AddRestaurant', component: addRestaurant },
  { path: '/restaurant/:restaurantId', name: 'Restaurant', component: Home },
  { path: '/readqr/addStamp/:user', name: 'ReadQr', component: ReadQr },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
