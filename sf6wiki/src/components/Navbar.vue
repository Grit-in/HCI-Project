<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar__container">
      <router-link to="/" class="navbar__logo" id="navbar__logo">
        SF6 Wiki
      </router-link>
      <div class="navbar__toggle" id="mobile-menu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
      <ul class="navbar__menu">
        <li class="navbar__item">
          <router-link to="/character-guide" class="navbar__links">Character Guide</router-link>
        </li>
        <li class="navbar__item">
          <router-link to="/frame-data" class="navbar__links">Frame Data</router-link>
        </li>
        <li class="navbar__item">
          <router-link to="/matchup-guide" class="navbar__links">MatchUp Guide</router-link>
        </li>
        <li class="navbar__item">
          <router-link to="/forum" class="navbar__links">Forum</router-link>
        </li>
        <li class="navbar__btn">
          <a href="#" class="btn" @click.prevent="$emit('show-signup')">Sign Up</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isScrolled: false
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
      this.isScrolled = window.scrollY > 50
    }
  }
}
</script>
