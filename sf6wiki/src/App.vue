<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <div id="app">
    <!--NavBar-->
    <nav class="navbar" :class="{ scrolled: isScrolled }">
      <div class="navbar__container">
        <a href="#" id="navbar__logo">
          <i class="fas fa-gamepad"></i>SFHub
        </a>
        <div class="navbar__toggle" id="menu" @click="toggleMenu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
        <ul class="navbar__menu" :class="{ active: isMenuActive }">
          <li class="navbar__item">
            <a href="#" class="navbar__links">MatchUp Guide</a>
          </li>
          <li class="navbar__item">
            <router-link to="/character-guide" class="navbar__links">Character Guide</router-link>
          </li>
          <li class="navbar__item">
            <a href="#" class="navbar__links">Forum</a>
          </li>
          <li class="navbar__item">
            <a href="#" class="navbar__links">Frame Data</a>
          </li>
          <li class="navbar__btn">
            <a href="#" class="btn" @click.prevent="showSignup">Sign Up</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="popup-overlay" :class="{ active: showPopup }" @click="hidePopup"></div>
    <div class="popup" :class="{ active: showPopup }">
      <div class="popup-header">
        <button class="tab-btn" :class="{ active: activeTab === 'login' }" @click="setActiveTab('login')">Login</button>
        <button class="tab-btn" :class="{ active: activeTab === 'register' }" @click="setActiveTab('register')">Register</button>
      </div>
      <div class="popup-content">
        <form class="popup-form" :class="{ active: activeTab === 'login' }" @submit.prevent="handleLogin">
          <input type="text" placeholder="Username" required v-model="loginForm.username" />
          <input type="password" placeholder="Password" required v-model="loginForm.password" />
          <button type="submit">Log In</button>
        </form>
        <form class="popup-form" :class="{ active: activeTab === 'register' }" @submit.prevent="handleRegister">
          <input type="text" placeholder="Username" required v-model="registerForm.username" />
          <input type="email" placeholder="Email" required v-model="registerForm.email" />
          <input type="password" placeholder="Password" required v-model="registerForm.password" />
          <input type="password" placeholder="Confirm Password" required v-model="registerForm.confirmPassword" />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isScrolled: false,
      isMenuActive: false,
      showPopup: false,
      activeTab: 'login',
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 0
    },
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive
    },
    showSignup() {
      this.showPopup = true
    },
    hidePopup() {
      this.showPopup = false
    },
    setActiveTab(tab) {
      this.activeTab = tab
    },
    handleLogin() {
      console.log('Login:', this.loginForm)
      this.hidePopup()
      alert('Login functionality would be implemented here')
    },
    handleRegister() {
      console.log('Register:', this.registerForm)
      this.hidePopup()
      alert('Register functionality would be implemented here')
    }
  }
}
</script>


