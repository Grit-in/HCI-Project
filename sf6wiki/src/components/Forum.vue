<template>
  <div class="forum-page">
    <div class="forum-container">
      <h1>Community Forum</h1>
      <p class="forum-description">
        <strong>Welcome to the SFHub community!</strong> Share your <em>strategies</em>, ask questions, and discuss <u>Street Fighter 6</u> with fellow players.
      </p>
      
      <div class="forum-controls">
        <button @click="showNewPostModal" class="new-post-btn">Create New Post</button>
        <select v-model="selectedCategory" @change="filterPosts" class="category-filter">
          <option value="all">All Categories</option>
          <option value="general">General Discussion</option>
          <option value="strategy">Strategy & Tips</option>
          <option value="character">Character Discussion</option>
          <option value="tournament">Tournament Talk</option>
        </select>
      </div>

      <div class="forum-posts" id="forumPosts">
        <div 
          v-for="post in filteredPosts" 
          :key="post.id"
          class="forum-post"
          :data-category="post.category"
        >
          <h2 class="post-title">{{ post.title }}</h2>
          <p class="post-description" v-html="post.description"></p>
          <div class="post-meta">
            <p class="post-author">Posted by: <em>{{ post.author }}</em></p>
            <p class="post-date">Date: <u>{{ post.date }}</u></p>
            <p class="post-category">Category: {{ getCategoryName(post.category) }}</p>
          </div>
          <div class="post-stats">
            <span class="views">👁️ {{ post.views }} views</span>
            <span class="replies">💬 {{ post.replies }} replies</span>
          </div>
          <a href="#" @click.prevent="viewPost(post)" class="read-more">Read More</a>
        </div>
      </div>
      
      <!-- New Post Modal -->
      <div id="newPostModal" class="modal" :class="{ active: showModal }">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <h2>Create New Post</h2>
          <form @submit.prevent="createPost" id="newPostForm">
            <input 
              v-model="newPost.title" 
              type="text" 
              id="postTitle" 
              placeholder="Post Title" 
              required
            >
            <select v-model="newPost.category" id="postCategory" required>
              <option value="">Select Category</option>
              <option value="general">General Discussion</option>
              <option value="strategy">Strategy & Tips</option>
              <option value="character">Character Discussion</option>
              <option value="tournament">Tournament Talk</option>
            </select>
            <textarea 
              v-model="newPost.content" 
              id="postContent" 
              placeholder="Write your post content here..." 
              required
            ></textarea>
            <button type="submit">Create Post</button>
          </form>
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
  name: 'Forum',
  components: {
    Footer
  },
  data() {
    return {
      selectedCategory: 'all',
      showModal: false,
      newPost: {
        title: '',
        category: '',
        content: ''
      },
      posts: [
        {
          id: 1,
          title: "How does this combo structure work?",
          description: "Can someone help me understand why does this work? I'm trying to learn <strong>Terry's</strong> optimal combos but the timing seems impossible.",
          author: "User123",
          date: "2024-01-15",
          category: "strategy",
          views: 45,
          replies: 8
        },
        {
          id: 2,
          title: "How does neutral play actually work?",
          description: "Can someone explain to me how to be better at <strong>whiff punishing</strong> and <em>anti-airs</em>? I keep getting destroyed in neutral.",
          author: "Izzy",
          date: "2024-01-14",
          category: "character",
          views: 67,
          replies: 12
        },
        {
          id: 3,
          title: "Best controller for Street Fighter 6?",
          description: "I'm looking to upgrade my controller setup. What do you recommend for <strong>competitive play</strong>?",
          author: "FGC_Player",
          date: "2024-01-13",
          category: "general",
          views: 89,
          replies: 15
        },
        {
          id: 4,
          title: "Upcoming tournament strategies",
          description: "What are your thoughts on the <em>current meta</em> for tournament play? Which characters are <strong>top tier</strong> right now?",
          author: "TourneyPlayer",
          date: "2024-01-12",
          category: "tournament",
          views: 123,
          replies: 23
        }
      ]
    }
  },
  computed: {
    filteredPosts() {
      if (this.selectedCategory === 'all') {
        return this.posts;
      }
      return this.posts.filter(post => post.category === this.selectedCategory);
    }
  },
  methods: {
    showNewPostModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.resetNewPost();
    },
    resetNewPost() {
      this.newPost = {
        title: '',
        category: '',
        content: ''
      };
    },
    createPost() {
      const newPost = {
        id: this.posts.length + 1,
        title: this.newPost.title,
        description: this.newPost.content,
        author: "CurrentUser",
        date: new Date().toISOString().split('T')[0],
        category: this.newPost.category,
        views: 0,
        replies: 0
      };
      
      this.posts.unshift(newPost);
      this.closeModal();
    },
    filterPosts() {
      // Filtering is handled by computed property
      console.log('Filtering posts by category:', this.selectedCategory);
    },
    viewPost(post) {
      // This would navigate to a detailed post view
      console.log('Viewing post:', post.title);
      // For now, just show an alert
      alert(`Viewing post: ${post.title}`);
    },
    getCategoryName(category) {
      const categories = {
        'general': 'General Discussion',
        'strategy': 'Strategy & Tips',
        'character': 'Character Discussion',
        'tournament': 'Tournament Talk'
      };
      return categories[category] || category;
    }
  }
}
</script>
