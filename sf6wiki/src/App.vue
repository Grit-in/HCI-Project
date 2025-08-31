<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div id="app" :class="{ 'light-mode': isLightMode }">
    <Navbar @show-signup="showSignup" />
    
    <button 
      @click="toggleLightMode" 
      class="theme-toggle"
      :class="{ 'light': isLightMode }"
      :title="isLightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'"
    >
      <i class="fas fa-sun" v-if="!isLightMode"></i>
      <i class="fas fa-moon" v-else></i>
    </button>
    
    <router-view></router-view>
    
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
          <form 
            class="popup-form" 
            :class="{ active: activeTab === 'login' }" 
            @submit.prevent="handleLogin"
            ref="loginFormRef"
            novalidate
          >
            <div class="input-group">
              <input 
                type="email" 
                placeholder="Email" 
                v-model="loginForm.email" 
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                minlength="5"
                maxlength="50"
                @input="validateLoginEmail"
                @invalid="handleInvalid"
                :class="{ 'error': loginErrors.email }"
              >
              <span class="error-message" v-if="loginErrors.email">{{ loginErrors.email }}</span>
            </div>
            
            <div class="input-group">
              <input 
                type="password" 
                placeholder="Password" 
                v-model="loginForm.password" 
                required
                minlength="8"
                maxlength="50"
                @input="validateLoginPassword"
                @invalid="handleInvalid"
                :class="{ 'error': loginErrors.password }"
              >
              <span class="error-message" v-if="loginErrors.password">{{ loginErrors.password }}</span>
            </div>
            
            <button type="submit" :disabled="!isLoginFormValid">Login</button>
          </form>
          
          <form 
            class="popup-form" 
            :class="{ active: activeTab === 'signup' }" 
            @submit.prevent="handleSignup"
            ref="signupFormRef"
            novalidate
          >
            <div class="input-group">
              <input 
                type="text" 
                placeholder="Username" 
                v-model="signupForm.username" 
                required
                pattern="^[a-zA-Z0-9_]{3,20}$"
                minlength="3"
                maxlength="20"
                @input="validateSignupUsername"
                @invalid="handleInvalid"
                :class="{ 'error': signupErrors.username }"
              >
              <span class="error-message" v-if="signupErrors.username">{{ signupErrors.username }}</span>
            </div>
            
            <div class="input-group">
              <input 
                type="email" 
                placeholder="Email" 
                v-model="signupForm.email" 
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                minlength="5"
                maxlength="50"
                @input="validateSignupEmail"
                @invalid="handleInvalid"
                :class="{ 'error': signupErrors.email }"
              >
              <span class="error-message" v-if="signupErrors.email">{{ signupErrors.email }}</span>
            </div>
            
            <div class="input-group">
              <input 
                type="password" 
                placeholder="Password" 
                v-model="signupForm.password" 
                required
                minlength="8"
                maxlength="50"
                @input="validateSignupPassword"
                @invalid="handleInvalid"
                :class="{ 'error': signupErrors.password }"
              >
              <span class="error-message" v-if="signupErrors.password">{{ signupErrors.password }}</span>
              <div class="password-strength" v-if="signupForm.password">
                <div class="strength-bar">
                  <div class="strength-fill" :style="{ width: passwordStrength.percentage + '%', backgroundColor: passwordStrength.color }"></div>
                </div>
                <span class="strength-text">{{ passwordStrength.text }}</span>
              </div>
            </div>
            
            <div class="input-group">
              <input 
                type="password" 
                placeholder="Confirm Password" 
                v-model="signupForm.confirmPassword" 
                required
                @input="validateConfirmPassword"
                @invalid="handleInvalid"
                :class="{ 'error': signupErrors.confirmPassword }"
              >
              <span class="error-message" v-if="signupErrors.confirmPassword">{{ signupErrors.confirmPassword }}</span>
            </div>
            
            <button type="submit" :disabled="!isSignupFormValid">Sign Up</button>
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
      isLightMode: false,
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      loginErrors: {
        email: '',
        password: ''
      },
      signupErrors: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      passwordStrength: {
        percentage: 0,
        text: '',
        color: '#ff4444'
      }
    }
  },
  computed: {
    isLoginFormValid() {
      return this.loginForm.email && 
             this.loginForm.password && 
             !this.loginErrors.email && 
             !this.loginErrors.password;
    },
    isSignupFormValid() {
      return this.signupForm.username && 
             this.signupForm.email && 
             this.signupForm.password && 
             this.signupForm.confirmPassword &&
             !this.signupErrors.username && 
             !this.signupErrors.email && 
             !this.signupErrors.password && 
             !this.signupErrors.confirmPassword;
    }
  },
  mounted() {
    this.loadThemePreference();
    

    this.initializeDynamicClasses();
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
    

    toggleLightMode() {
      this.isLightMode = !this.isLightMode;
      

      const appElement = document.getElementById('app');
      const bodyElement = document.body;
      
      if (this.isLightMode) {

        appElement.classList.add('light-mode');
        bodyElement.classList.add('light-mode');
        

        appElement.classList.add('theme-transition');
        

        this.addLightModeClasses();
        

        localStorage.setItem('theme', 'light');
      } else {

        appElement.classList.remove('light-mode');
        bodyElement.classList.remove('light-mode');
        

        this.removeLightModeClasses();
        

        localStorage.setItem('theme', 'dark');
      }

      this.addAnimationClass(appElement);
    },
    
    addLightModeClasses() {

      const elements = document.querySelectorAll('.navbar, .popup, .popup-form input, .popup-form button');
      
      elements.forEach(element => {

        element.classList.add('light-mode-element', 'theme-changed');
        

        if (element.tagName === 'INPUT') {
          element.classList.add('light-input');
        } else if (element.tagName === 'BUTTON') {
          element.classList.add('light-button');
        }
      });
      

      this.addClassesToComponents();
    },
    
    removeLightModeClasses() {

      const elements = document.querySelectorAll('.light-mode-element, .theme-changed, .light-input, .light-button');
      
      elements.forEach(element => {

        element.classList.remove('light-mode-element', 'theme-changed', 'light-input', 'light-button');
      });
      

      this.removeClassesFromComponents();
    },
    
    addClassesToComponents() {

      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.classList.add('light-navbar');
      }
      
      const popup = document.querySelector('.popup');
      if (popup) {
        popup.classList.add('light-popup');
      }
      

      const inputs = document.querySelectorAll('.popup-form input');
      inputs.forEach(input => {
        input.classList.add('light-input-field');
      });
      
      const buttons = document.querySelectorAll('.popup-form button');
      buttons.forEach(button => {
        button.classList.add('light-button-style');
      });
    },
    
    removeClassesFromComponents() {

      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.classList.remove('light-navbar');
      }
      
      const popup = document.querySelector('.popup');
      if (popup) {
        popup.classList.remove('light-popup');
      }

      const inputs = document.querySelectorAll('.popup-form input');
      inputs.forEach(input => {
        input.classList.remove('light-input-field');
      });
      
      const buttons = document.querySelectorAll('.popup-form button');
      buttons.forEach(button => {
        button.classList.remove('light-button-style');
      });
    },
    
    addAnimationClass(element) {

      element.classList.add('theme-animation');
      

      setTimeout(() => {
        element.classList.remove('theme-animation');
      }, 500);
    },
    
    initializeDynamicClasses() {

      const appElement = document.getElementById('app');
      appElement.classList.add('app-initialized');

      if (this.isLightMode) {
        this.addLightModeClasses();
      }
    },
    
    loadThemePreference() {

      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        this.isLightMode = true;
        this.toggleLightMode();
      }
    },
    

    toggleElementClass(element, className, condition) {

      if (condition) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    },
    
    setElementClasses(element, classes) {

      element.className = classes.join(' ');
    },
    
    addMultipleClasses(element, classes) {

      classes.forEach(className => {
        element.classList.add(className);
      });
    },
    
    removeMultipleClasses(element, classes) {

      classes.forEach(className => {
        element.classList.remove(className);
      });
    },
    
    hasClass(element, className) {

      return element.classList.contains(className);
    },
    
    handleInvalid(event) {
      event.preventDefault();
      const input = event.target;
      this.showCustomValidationMessage(input);
    },
    
    showCustomValidationMessage(input) {
      const validity = input.validity;
      let message = '';
      
      if (validity.valueMissing) {
        message = 'This field is required.';
      } else if (validity.typeMismatch && input.type === 'email') {
        message = 'Please enter a valid email address.';
      } else if (validity.patternMismatch) {
        if (input.placeholder === 'Username') {
          message = 'Username must be 3-20 characters, letters, numbers, and underscores only.';
        } else if (input.placeholder === 'Email') {
          message = 'Please enter a valid email address.';
        }
      } else if (validity.tooShort) {
        message = `Minimum length is ${input.minLength} characters.`;
      } else if (validity.tooLong) {
        message = `Maximum length is ${input.maxLength} characters.`;
      }
      

      input.setCustomValidity(message);
    },
    
   
    validatePasswordStrength(password) {
      let score = 0;
      let feedback = [];
      

      if (password.length >= 8) score += 20;
      if (password.length >= 12) score += 10;
      

      if (/[a-z]/.test(password)) score += 15;
      if (/[A-Z]/.test(password)) score += 15;
      if (/\d/.test(password)) score += 15;
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 15;
      

      if (/(?=.*[a-z])(?=.*[A-Z])/.test(password)) score += 10;
      if (/(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) score += 10;
      
      let strengthText, color;
      if (score >= 80) {
        strengthText = 'Very Strong';
        color = '#00ff00';
      } else if (score >= 60) {
        strengthText = 'Strong';
        color = '#00cc00';
      } else if (score >= 40) {
        strengthText = 'Medium';
        color = '#ffaa00';
      } else if (score >= 20) {
        strengthText = 'Weak';
        color = '#ff6600';
      } else {
        strengthText = 'Very Weak';
        color = '#ff0000';
      }
      
      this.passwordStrength = {
        percentage: score,
        text: strengthText,
        color: color
      };
      
      return score >= 40; 
    },
    

    validateUsernameAvailability(username) {

      const reservedUsernames = [
        'admin', 'root', 'system', 'user', 'test', 'guest', 'anonymous',
        'moderator', 'support', 'help', 'info', 'contact', 'webmaster'
      ];
      
      const isReserved = reservedUsernames.includes(username.toLowerCase());
      const hasConsecutiveChars = /(.)\1{2,}/.test(username);
      const hasValidStart = /^[a-zA-Z]/.test(username);
      
      if (isReserved) {
        return { valid: false, message: 'This username is reserved and cannot be used.' };
      }
      
      if (hasConsecutiveChars) {
        return { valid: false, message: 'Username cannot have more than 2 consecutive identical characters.' };
      }
      
      if (!hasValidStart) {
        return { valid: false, message: 'Username must start with a letter.' };
      }
      
      return { valid: true, message: '' };
    },
    
  
    validateLoginEmail() {
      this.loginErrors.email = '';
      const email = this.loginForm.email;
      
      if (!email) return;
      
    
      const emailInput = this.$refs.loginFormRef?.querySelector('input[type="email"]');
      if (emailInput && !emailInput.checkValidity()) {
        this.showCustomValidationMessage(emailInput);
        this.loginErrors.email = emailInput.validationMessage;
      }
    },
    
    validateLoginPassword() {
      this.loginErrors.password = '';
      const password = this.loginForm.password;
      
      if (!password) return;
      

      const passwordInput = this.$refs.loginFormRef?.querySelector('input[type="password"]');
      if (passwordInput && !passwordInput.checkValidity()) {
        this.showCustomValidationMessage(passwordInput);
        this.loginErrors.password = passwordInput.validationMessage;
      }
    },
    
    validateSignupUsername() {
      this.signupErrors.username = '';
      const username = this.signupForm.username;
      
      if (!username) return;
      

      const usernameInput = this.$refs.signupFormRef?.querySelector('input[type="text"]');
      if (usernameInput && !usernameInput.checkValidity()) {
        this.showCustomValidationMessage(usernameInput);
        this.signupErrors.username = usernameInput.validationMessage;
      }
      
      const availabilityCheck = this.validateUsernameAvailability(username);
      if (!availabilityCheck.valid) {
        this.signupErrors.username = availabilityCheck.message;
      }
    },
    
    validateSignupEmail() {
      this.signupErrors.email = '';
      const email = this.signupForm.email;
      
      if (!email) return;
      
      const emailInput = this.$refs.signupFormRef?.querySelector('input[type="email"]');
      if (emailInput && !emailInput.checkValidity()) {
        this.showCustomValidationMessage(emailInput);
        this.signupErrors.email = emailInput.validationMessage;
      }
    },
    
    validateSignupPassword() {
      this.signupErrors.password = '';
      const password = this.signupForm.password;
      
      if (!password) return;
      
      const passwordInput = this.$refs.signupFormRef?.querySelector('input[type="password"]');
      if (passwordInput && !passwordInput.checkValidity()) {
        this.showCustomValidationMessage(passwordInput);
        this.signupErrors.password = passwordInput.validationMessage;
      }
      
      const isStrongEnough = this.validatePasswordStrength(password);
      if (!isStrongEnough) {
        this.signupErrors.password = 'Password is too weak. Please choose a stronger password.';
      }
    },
    
    validateConfirmPassword() {
      this.signupErrors.confirmPassword = '';
      const password = this.signupForm.password;
      const confirmPassword = this.signupForm.confirmPassword;
      
      if (!confirmPassword) return;
      
      if (password !== confirmPassword) {
        this.signupErrors.confirmPassword = 'Passwords do not match.';
      }
    },
    

    handleLogin() {

      this.loginErrors = { email: '', password: '' };
      
      this.validateLoginEmail();
      this.validateLoginPassword();
      

      if (!this.isLoginFormValid) {
        console.log('Login form has validation errors');
        return;
      }

      console.log('Login successful:', this.loginForm);
      alert('Login successful! Welcome back!');
      this.closePopup();
    },
    
    handleSignup() {

      this.signupErrors = { username: '', email: '', password: '', confirmPassword: '' };
      

      this.validateSignupUsername();
      this.validateSignupEmail();
      this.validateSignupPassword();
      this.validateConfirmPassword();
      

      if (!this.isSignupFormValid) {
        console.log('Signup form has validation errors');
        return;
      }
      

      console.log('Signup successful:', this.signupForm);
      alert('Account created successfully! Welcome to SFHub!');
      this.closePopup();
    },
    
    resetForms() {
      this.loginForm = { email: '', password: '' };
      this.signupForm = { username: '', email: '', password: '', confirmPassword: '' };
      this.loginErrors = { email: '', password: '' };
      this.signupErrors = { username: '', email: '', password: '', confirmPassword: '' };
      this.passwordStrength = { percentage: 0, text: '', color: '#ff4444' };
    }
  }
}
</script>

