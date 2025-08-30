import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import CharacterGuide from '../components/CharacterGuide.vue'
import FrameData from '../components/FrameData.vue'
import MatchUpGuide from '../components/MatchUpGuide.vue'
import Forum from '../components/Forum.vue'

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
  },
  {
    path: '/frame-data',
    name: 'FrameData',
    component: FrameData
  },
  {
    path: '/matchup-guide',
    name: 'MatchUpGuide',
    component: MatchUpGuide
  },
  {
    path: '/forum',
    name: 'Forum',
    component: Forum
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
