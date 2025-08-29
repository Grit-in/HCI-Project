import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import CharacterGuide from '../components/CharacterGuide.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/character-guide',
    name: 'CharacterGuide',
    component: CharacterGuide
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
