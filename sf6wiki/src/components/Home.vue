<template>
  <div>
    <div class="main">
      <div class="main__container">
        <div class="main__content">
          <h1>Website for learning Street Fighter 6 tech</h1>
          <button class="main__btn" @click="showSignup">
            <a href="#">Get Started</a>
          </button>
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

    <div class="icon-table-container">
      <table class="icon-table">
        <tbody>
          <tr>
            <td>
              <a href="https://youtube.com" target="_blank">
                <i class="fab fa-youtube"></i>
              </a>
            </td>
            <td>
              <a href="https://x.com" target="_blank">
                <i class="fab fa-twitter"></i>
              </a>
            </td>
            <td>
              <a href="https://linkedin.com" target="_blank">
                <i class="fab fa-linkedin"></i>
              </a>
            </td>
            <td>
              <a href="https://instagram.com" target="_blank">
                <i class="fab fa-instagram"></i>
              </a>
            </td>
            <td>
              <a href="https://twitch.com" target="_blank">
                <i class="fab fa-twitch"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="info-paragraph">
        Created by Grit[Danilo Istijanovic]. Passionate about gaming and
        learning.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    showSignup() {
      // This will be handled by the parent App component
      this.$emit('show-signup')
    }
  }
}
</script>
