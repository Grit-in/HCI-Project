<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div id="app">
    <Navbar @show-signup="showSignup" />
    
    <router-view></router-view>
    
    <!-- Popup Overlay -->
    <div class="popup-overlay" :class="{ active: showPopup }" @click="closePopup">
      <div class="popup" :class="{ active: showPopup }" @click.stop>
        <button class="popup-close" @click="closePopup">
          <i class="fas fa-times"></i>
        </button>
        
        <div class="popup-header">
          <button 
            class="tab-btn" 
            :class="{ active: activeTab === 'login' }"
            @click="activeTab = 'login'"
          >
            Login
          </button>
          <button 
            class="tab-btn" 
            :class="{ active: activeTab === 'signup' }"
            @click="activeTab = 'signup'"
          >
            Sign Up
          </button>
        </div>
        
        <div class="popup-content">
          <!-- Login Form -->
          <form class="popup-form" :class="{ active: activeTab === 'login' }" @submit.prevent="handleLogin">
            <input type="email" placeholder="Email" v-model="loginForm.email" required>
            <input type="password" placeholder="Password" v-model="loginForm.password" required>
            <button type="submit">Login</button>
          </form>
          
          <!-- Sign Up Form -->
          <form class="popup-form" :class="{ active: activeTab === 'signup' }" @submit.prevent="handleSignup">
            <input type="text" placeholder="Username" v-model="signupForm.username" required>
            <input type="email" placeholder="Email" v-model="signupForm.email" required>
            <input type="password" placeholder="Password" v-model="signupForm.password" required>
            <input type="password" placeholder="Confirm Password" v-model="signupForm.confirmPassword" required>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data() {
    return {
      showPopup: false,
      activeTab: 'login',
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    showSignup() {
      this.showPopup = true
      this.activeTab = 'signup'
    },
    closePopup() {
      this.showPopup = false
      this.resetForms()
    },
    handleLogin() {
      // Handle login logic here
      console.log('Login:', this.loginForm)
      this.closePopup()
    },
    handleSignup() {
      // Handle signup logic here
      console.log('Signup:', this.signupForm)
      this.closePopup()
    },
    resetForms() {
      this.loginForm = { email: '', password: '' }
      this.signupForm = { username: '', email: '', password: '', confirmPassword: '' }
    }
  }
}
</script>

