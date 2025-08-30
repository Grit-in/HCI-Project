<template>
  <div class="character-guide">
    <!-- Main Content -->
    <div class="main-container">
      <!-- Filter Section -->
      <div class="filter-section">
        <div class="filter-card">
          <h2 class="filter-title">Filter Videos</h2>
          <div class="filter-content">
            <label class="filter-label">Select Character:</label>
            <div class="select-wrapper">
              <select 
                v-model="selectedCharacter" 
                @change="filterVideos"
                class="character-select"
              >
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
              </select>
              <div class="select-arrow">▼</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Videos Section -->
      <div class="videos-section">
        <div class="videos-header">
          <h2 class="videos-title">Character Guide Videos</h2>
          <div class="videos-count">
            <span>{{ filteredVideos.length }} videos</span>
          </div>
        </div>

        <!-- Videos Grid -->
        <div class="videos-grid" v-if="filteredVideos.length > 0">
          <div 
            v-for="video in filteredVideos" 
            :key="video.title"
            class="video-card"
          >
            <div class="video-thumbnail">
              <video controls class="video-player">
                <source :src="video.videoSrc" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
            <div class="video-info">
              <h3 class="video-title">{{ video.title }}</h3>
              <div class="video-tags">
                <span 
                  v-for="character in video.characters.filter(c => c !== 'universal')" 
                  :key="character"
                  class="tag character-tag"
                >
                  {{ character }}
                </span>
                <span 
                  v-for="keyword in video.keywords" 
                  :key="keyword"
                  class="tag keyword-tag"
                >
                  {{ keyword }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state">
          <div class="empty-icon">🎮</div>
          <h3 class="empty-title">No videos found</h3>
          <p class="empty-message">Try selecting a different character or check back later for new content.</p>
        </div>
      </div>
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