<template>
  <div class="character-guide-page">
    <div class="mu-main">
      <aside class="filter-sidebar">
        <div class="filter-header">
          <h3>Filter Videos</h3>
          <p class="filter-subtitle">Select a character to find tech videos</p>
        </div>
        <div class="filter-content">
          <div class="filter-group">
            <label for="characterSelect">Character:</label>
            <div class="custom-dropdown">
              <select 
                id="characterSelect" 
                v-model="selectedCharacter"
                @change="filterVideos"
              >
                <option value="" disabled>Choose a character</option>
                <option value="universal">All Characters</option>
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
                <option value="mai">Mai</option>
              </select>
            </div>
          </div>
        </div>
      </aside>
      
      <main class="videos-main">
        <div class="videos-header">
          <div class="header-content">
            <h2 class="videos-title">Character Tech Videos</h2>
            <p class="videos-subtitle">Advanced techniques and character-specific tech</p>
          </div>
          <div class="videos-stats">
            <div class="stat-item">
              <span class="stat-number">{{ filteredVideos.length }}</span>
              <span class="stat-label"> Videos</span>
            </div>
          </div>
        </div>
        
        <!-- Videos Grid -->
        <div class="videos-container" v-if="filteredVideos.length > 0">
          <div class="videos-grid">
            <article 
              v-for="video in filteredVideos" 
              :key="video.title"
              class="video-card"
            >
              <div class="video-media">
                <div class="video-thumbnail">
                  <video controls class="video-player">
                    <source :src="video.videoSrc" type="video/mp4">
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div class="video-overlay">
                  <div class="play-button">
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                      <path d="M8 5v14l11-7z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div class="video-content">
                <h3 class="video-title">{{ video.title }}</h3>
                <div class="video-meta">
                  <div class="video-tags">
                    <span 
                      v-for="character in video.characters.filter(c => c !== 'universal')" 
                      :key="character"
                      class="tag character-tag"
                    >
                      {{ character.toUpperCase() }}
                    </span>
                    <span 
                      v-for="keyword in video.keywords" 
                      :key="keyword"
                      class="tag keyword-tag"
                    >
                      {{ keyword.toUpperCase() }}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state">
          <div class="empty-content">
            <div class="empty-icon">🎮</div>
            <h3 class="empty-title">No videos found</h3>
            <p class="empty-message">Try selecting a different character or check back later for new content.</p>
            <button @click="selectedCharacter = 'universal'" class="empty-action">
              View All Videos
            </button>
          </div>
        </div>
      </main>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Footer from './Footer.vue'

export default {
  name: 'CharacterGuide',
  components: {
    Footer
  },
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
      if (!this.selectedCharacter || this.selectedCharacter === '') {
        return this.videoData.videos;
      } else if (this.selectedCharacter === 'universal') {
        return this.videoData.videos; // Show all videos when universal is selected
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
      console.log('Filtering videos for:', this.selectedCharacter);
    }
  }
}
</script>