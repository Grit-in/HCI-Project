<template>
  <div class="mu-main">
    <!-- Left Column -->
    <div class="left-column">
      <!-- Character Selector -->
      <div class="character-selector">
        <h3>Select Character</h3>
        <select v-model="selectedCharacter" @change="changeCharacter">
          <option v-for="char in characters" :key="char.value" :value="char.value">
            {{ char.name }}
          </option>
        </select>
      </div>

      <!-- Character Info -->
      <div class="character-container">
        <img 
          :src="`/img/icons/${currentCharacter.image}`" 
          :alt="currentCharacter.name" 
          class="character-img clickable-image" 
          @click="showCharacterDetails"
        >
        <h1>{{ currentCharacter.name }}</h1>
        <p class="character-description" v-html="currentCharacter.description"></p>
        <div class="character-links">
          <a :href="currentCharacter.guidePdf" target="_blank" class="doc-link">
            <i class="fas fa-file-pdf"></i> {{ currentCharacter.name }} Guide PDF
          </a>
          <a :href="currentCharacter.frameDataPdf" target="_blank" class="doc-link">
            <i class="fas fa-table"></i> Frame Data Sheet
          </a>
        </div>
      </div>
    </div>

    <!-- Right Column -->
    <div class="right-column">
      <!-- Frame Data Table -->
      <div class="moves-table-container">
        <h2>Frame Data Table</h2>
        <table class="moves-table">
          <thead>
            <tr>
              <th rowspan="2">Move</th>
              <th colspan="3">Frame Data</th>
              <th rowspan="2">Cancel</th>
              <th rowspan="2">Damage</th>
              <th rowspan="2">Guard</th>
              <th colspan="2">Frame Advantage</th>
            </tr>
            <tr>
              <th>Startup</th>
              <th>Active</th>
              <th>Recovery</th>
              <th>On Hit</th>
              <th>On Block</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="move in currentCharacter.moves" :key="move.name">
              <td><strong>{{ move.name }}</strong></td>
              <td>{{ move.startup }}</td>
              <td>{{ move.active }}</td>
              <td>{{ move.recovery }}</td>
              <td>{{ move.cancel }}</td>
              <td>{{ move.damage }}</td>
              <td>{{ move.guard }}</td>
              <td :class="getFrameClass(move.onHit)">{{ move.onHit }}</td>
              <td :class="getFrameClass(move.onBlock)">{{ move.onBlock }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Character Overview -->
      <div class="character-info">
        <h2>Character Overview</h2>
        <div class="info-grid">
          <div class="info-section">
            <h3>Strengths</h3>
            <ul>
              <li v-for="strength in currentCharacter.strengths" :key="strength">{{ strength }}</li>
            </ul>
          </div>
          <div class="info-section">
            <h3>Weaknesses</h3>
            <ol>
              <li v-for="weakness in currentCharacter.weaknesses" :key="weakness">{{ weakness }}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <Footer />
</template>

<script>
import Footer from './Footer.vue'

export default {
  name: 'FrameData',
  components: {
    Footer
  },
  data() {
    return {
      selectedCharacter: 'terry',
      characters: [
        { value: 'terry', name: 'Terry Bogard' },
        { value: 'ryu', name: 'Ryu' },
        { value: 'ken', name: 'Ken' },
        { value: 'chun_li', name: 'Chun-Li' },
        { value: 'luke', name: 'Luke' },
        { value: 'jamie', name: 'Jamie' },
        { value: 'juri', name: 'Juri' },
        { value: 'kimberly', name: 'Kimberly' },
        { value: 'guile', name: 'Guile' },
        { value: 'dhalsim', name: 'Dhalsim' },
        { value: 'zangief', name: 'Zangief' },
        { value: 'jp', name: 'JP' },
        { value: 'marisa', name: 'Marisa' },
        { value: 'manon', name: 'Manon' },
        { value: 'deejay', name: 'Dee Jay' },
        { value: 'honda', name: 'E.Honda' },
        { value: 'blanka', name: 'Blanka' },
        { value: 'lily', name: 'Lily' },
        { value: 'cammy', name: 'Cammy' },
        { value: 'rashid', name: 'Rashid' },
        { value: 'aki', name: 'A.K.I' },
        { value: 'ed', name: 'Ed' },
        { value: 'akuma', name: 'Akuma' },
        { value: 'bison', name: 'M.Bison' }
      ],
      characterData: {
        terry: {
          name: 'Terry Bogard',
          image: 'Terry.jpg',
          description: '<strong>Terry Bogard</strong> is a <em>versatile character</em> with <u>excellent neutral game</u> and strong pressure options. His <strong>Power Wave</strong> and <strong>Burn Knuckle</strong> provide solid zoning tools.',
          guidePdf: '/docs/terry-guide.pdf',
          frameDataPdf: '/docs/terry-frame-data.pdf',
          strengths: [
            'Excellent neutral game',
            'Strong pressure options',
            'Good zoning tools',
            'Solid anti-air options'
          ],
          weaknesses: [
            'Limited defensive options',
            'Vulnerable to cross-ups',
            'Requires meter for optimal damage',
            'Can be predictable'
          ],
          moves: [
            { name: '5LP', startup: '4f', active: '3f', recovery: '7f', cancel: 'Chn Sp SA', damage: '300', guard: 'LH', onHit: '+4', onBlock: '-1' },
            { name: '5MP', startup: '7f', active: '3f', recovery: '16f', cancel: 'SA Sp TC', damage: '700', guard: 'LH', onHit: '+1', onBlock: '-3' },
            { name: '5HP', startup: '9f', active: '1/3f', recovery: '18/16f', cancel: 'Sp SA', damage: '400x2', guard: 'LH,LH', onHit: '+2', onBlock: '+1' },
            { name: '5LK', startup: '5f', active: '2f', recovery: '12f', cancel: 'Sp SA', damage: '300', guard: 'LH', onHit: '+2', onBlock: '-2' },
            { name: '5MK', startup: '9f', active: '18f', recovery: '7f', cancel: '-/-', damage: '700', guard: 'LH', onHit: '+5', onBlock: '-2' },
            { name: '5HK', startup: '12f', active: '4f', recovery: '21f', cancel: '-/-', damage: '300', guard: 'LH', onHit: '+1', onBlock: '-4' },
            { name: '2LP', startup: '4f', active: '3f', recovery: '8f', cancel: 'Chn Sp SA', damage: '300', guard: 'LH', onHit: '+4', onBlock: '-1' },
            { name: '2MP', startup: '6f', active: '4f', recovery: '13/14f', cancel: 'Sp SA', damage: '600', guard: 'LH', onHit: '+5', onBlock: '-1' },
            { name: '2HP', startup: '8f', active: '6/4f', recovery: '22/20f', cancel: 'Sp SA', damage: '800', guard: 'LH', onHit: '+1', onBlock: '-4' },
            { name: '2LK', startup: '5f', active: '2f', recovery: '11f', cancel: 'Chn', damage: '300', guard: 'LH', onHit: '+3', onBlock: '-3' },
            { name: '2MK', startup: '8f', active: '3f', recovery: '19f', cancel: 'Chn Sp TC', damage: '300', guard: 'LH', onHit: '-2', onBlock: '-6' },
            { name: '2HK', startup: '11f', active: '3f', recovery: '23f', cancel: '-/-', damage: '900', guard: 'L', onHit: 'KD +32', onBlock: '-11' }
          ]
        },
        ryu: {
          name: 'Ryu',
          image: 'Ryu.jpg',
          description: '<strong>Ryu</strong> is a <em>balanced character</em> with <u>solid fundamentals</u> and reliable tools. His <strong>Hadoken</strong> and <strong>Shoryuken</strong> are iconic moves.',
          guidePdf: '/docs/ryu-guide.pdf',
          frameDataPdf: '/docs/ryu-frame-data.pdf',
          strengths: [
            'Balanced gameplay',
            'Reliable tools',
            'Good fundamentals',
            'Strong fireball game'
          ],
          weaknesses: [
            'Limited mix-up options',
            'Predictable patterns',
            'Requires good execution',
            'Can be outzoned'
          ],
          moves: [
            { name: '5LP', startup: '4f', active: '3f', recovery: '7f', cancel: 'Chn Sp SA', damage: '300', guard: 'LH', onHit: '+4', onBlock: '-1' },
            { name: '5MP', startup: '7f', active: '3f', recovery: '16f', cancel: 'SA Sp TC', damage: '700', guard: 'LH', onHit: '+1', onBlock: '-3' },
            { name: '5HP', startup: '9f', active: '1/3f', recovery: '18/16f', cancel: 'Sp SA', damage: '400x2', guard: 'LH,LH', onHit: '+2', onBlock: '+1' }
          ]
        }
        // Add other characters here...
      }
    }
  },
  computed: {
    currentCharacter() {
      return this.characterData[this.selectedCharacter] || this.characterData.terry
    }
  },
  methods: {
    changeCharacter() {
      // Logic for character change
      console.log('Character changed to:', this.selectedCharacter)
    },
    showCharacterDetails() {
      // Logic for showing character details
      console.log('Showing details for:', this.currentCharacter.name)
    },
    getFrameClass(value) {
      if (value.startsWith('+') || value.includes('KD')) {
        return 'positive'
      } else if (value.startsWith('-')) {
        return 'negative'
      }
      return ''
    }
  }
}
</script>
