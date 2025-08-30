<template>
  <div class="matchup-guide-page">
    <div class="mu-main">
      <aside class="filter-sidebar">
        <h3>Filter Videos</h3>
        <div class="left-container">
          <label for="characterSelect">Select Character:</label>
          <div class="custom-dropdown">
            <select 
              id="characterSelect" 
              v-model="selectedCharacter"
              @change="filterVideos"
            >
              <option value="" disabled>Select a character</option>
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
              <option value="mai">Mai</option>
            </select>
          </div>
        </div>
      </aside>
      
      <div class="videos-section">
        <div class="videos-header">
          <h3 class="videos-title">MatchUp Video List</h3>
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
              <iframe 
                :src="getYouTubeEmbedUrl(video.videoSrc)"
                class="video-player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div class="video-info">
              <h3 class="video-title">{{ video.title }}</h3>
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
  name: 'MatchUpGuide',
  components: {
    Footer
  },
  data() {
    return {
      selectedCharacter: '',
      videoData: {
        videos: [
          {
            title: "HAITANI (#1 Ranked Chun-Li) vs KEI.B (Mai)",
            characters: ["chun_li", "mai"],
            keywords: ["matchup", "top-ranked", "chun-li"],
            videoSrc: "https://www.youtube.com/watch?v=cdVE7PIyzKw",
          },
          {
            title: "RYUKICHI (Mai) vs NARUO (#3 Ranked Jamie)",
            characters: ["mai", "jamie"],
            keywords: ["matchup", "top-ranked", "jamie"],
            videoSrc: "https://www.youtube.com/watch?v=dWlcBDMKBg8",
          },
          {
            title: "BROSKI (A.K.I.) vs PHENOM (Cammy)",
            characters: ["aki", "cammy"],
            keywords: ["matchup", "aki", "cammy"],
            videoSrc: "https://www.youtube.com/watch?v=Sk6ehNJRwI8",
          },
          {
            title: "HAITANI (#1 Ranked Chun-Li) vs BETTY (Juri)",
            characters: ["chun_li", "juri"],
            keywords: ["matchup", "top-ranked", "chun-li", "juri"],
            videoSrc: "https://www.youtube.com/watch?v=mwcwVUzpIKo",
          },
          {
            title: "AKUTAGAWA (#1 Ranked Manon) vs KAZUNOKO (#1 Ranked Jamie)",
            characters: ["manon", "jamie"],
            keywords: ["matchup", "top-ranked", "manon", "jamie"],
            videoSrc: "https://www.youtube.com/watch?v=5Wfoi3y0lHw",
          },
          {
            title: "LESHAR (Terry) vs XIAOHAI (M.Bison)",
            characters: ["terry", "bison"],
            keywords: ["matchup", "terry", "bison"],
            videoSrc: "https://www.youtube.com/watch?v=mHFWxCpbeUM",
          }
        ]
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
    },
    getYouTubeEmbedUrl(url) {
      // Convert YouTube watch URL to embed URL
      const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId[1]}`;
      }
      return url;
    }
  }
}
</script>
