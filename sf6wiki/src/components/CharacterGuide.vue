<template>
  <div class="character-guide-page">
    <div class="mu-main">
      <aside class="filter-sidebar">
        <h3>Filter Videos</h3>
        <div class="left-container">
          <label for="characterSelect">Select Character:</label>
          <div class="custom-dropdown">
            <select id="characterSelect" v-model="selectedCharacter" @change="filterVideos">
              <option value="universal">Universal</option>
              <option value="terry">Terry</option>
              <option value="bison">M.Bison</option>
              <option value="akuma">Akuma</option>
              <option value="ed">Ed</option>
              <option value="aki">A.K.I</option>
              <option value="rashid">Rashid</option>
              <option value="cammy">Cammy</option>
              <option value="lily">Lily</option>
              <option value="zangief">Zangief</option>
              <option value="jp">JP</option>
              <option value="marisa">Marisa</option>
              <option value="manon">Manon</option>
              <option value="deejay">Dee Jay</option>
              <option value="honda">E.Honda</option>
              <option value="blanka">Blanka</option>
              <option value="juri">Juri</option>
              <option value="kimberly">Kimberly</option>
              <option value="guile">Guile</option>
              <option value="jamie">Jamie</option>
              <option value="dhalsim">Dhalsim</option>
              <option value="ryu">Ryu</option>
              <option value="chun_li">Chun-Li</option>
              <option value="luke">Luke</option>
            </select>
          </div>
        </div>
      </aside>
      <div class="videos">
        <h3>Video List</h3>
        <section class="video-section" id="videoListContainer">
          <div 
            v-for="video in filteredVideos" 
            :key="video.title"
            class="video-item"
            :data-characters="video.characters.join(',')"
          >
            <h2>{{ video.title }}</h2>
            <div class="video-container">
              <video controls>
                <source :src="video.videoSrc" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
            <p v-if="video.description">{{ video.description }}</p>
          </div>
          
          <!-- Empty state when no videos are found -->
          <div v-if="filteredVideos.length === 0" class="empty-state">
            <h4>No videos found</h4>
            <p>Try selecting a different character or check back later for new content.</p>
          </div>
        </section>
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
        Created by Grit[Danilo Istijanovic]. Passionate about gaming and learning.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterGuide',
  data() {
    return {
      selectedCharacter: 'universal',
      videoData: {
        videos: [
          {
            title: "Juri",
            characters: ["juri", "universal"],
            keywords: ["FSE"],
            videoSrc: "/videos/2024-12-19 17-52-42.mp4",
          },
          {
            title: "Juri SFE safejump",
            characters: ["juri", "universal"],
            keywords: ["FSE", "safejump"],
            videoSrc: "/videos/2024-12-19 17-56-52.mp4",
          },
          {
            title: "Juri SFE cornercarry",
            characters: ["juri", "universal"],
            keywords: ["FSE", "cornercarry"],
            videoSrc: "/videos/2024-12-19 17-58-17.mp4",
          },
          {
            title: "Ryu side swap",
            characters: ["ryu", "universal"],
            keywords: ["sideswap"],
            videoSrc: "/videos/ryu1.mov",
          },
          {
            title: "Saku combo",
            characters: ["ryu", "universal"],
            keywords: ["combo", "cashout"],
            videoSrc: "/videos/2024-02-08_05-19-12.mp4",
          },
          {
            title: "Jamie post lvl 3 safe jump by Corvo",
            characters: ["jamie", "universal"],
            keywords: ["safejump"],
            videoSrc: "/videos/Corrvoh_Safe_jump_PROOF.mp4",
          },
          {
            title: "A.K.I safe oki setup",
            characters: ["aki", "universal"],
            keywords: ["okizeme", "safesetup"],
            videoSrc: "/videos/9f317b2e-45b7-4503-96b1-3b97f11a4d49.mov",
          },
          {
            title: "Jamie lvl 1 and rashid lvl 1 interaction",
            characters: ["jamie", "universal"],
            keywords: ["interaction"],
            videoSrc: "/videos/0b9a3bb7-0e6e-4904-93b0-d532a4cf76b5(1).mov",
          },
        ],
      }
    }
  },
  computed: {
    filteredVideos() {
      if (this.selectedCharacter === 'universal') {
        return this.videoData.videos;
      } else {
        return this.videoData.videos.filter(video => 
          video.characters.includes(this.selectedCharacter)
        );
      }
    }
  },
  methods: {
    filterVideos() {
      // This method is called when the select changes
      // The filtering is handled by the computed property
    }
  }
}
</script>
