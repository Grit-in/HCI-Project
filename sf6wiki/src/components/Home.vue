<template>
  <div>
    <div class="main">
      <div class="main__container">
        <div class="main__content">
          <h1>Website for learning Street Fighter 6 tech</h1>
        </div>
        <div class="main__img--container">
          <img src="/img/sf6logo.jpg" alt="" id="main-img" />
        </div>
      </div>
    </div>

    <div class="services">
      <h1>Get your desired rank</h1>
      <div class="main-img---container">
        <img src="/videos/rankup.gif" alt="Rank up animation" id="main-img2" />
      </div>
      <div class="services__container">
        <div class="services__card">
          <h2>Practice and learn characters</h2>
          <p>Are you Ready?</p>
        </div>
        <div class="services__card">
          <h2>Share epic moments with the fighting game community</h2>
          <p>Take the leap</p>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Footer from './Footer.vue'

export default {
  name: 'Home',
  components: {
    Footer
  },
  methods: {
    showSignup() {
      this.$emit('show-signup')
    }
  }
}
</script>
