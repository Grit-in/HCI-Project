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

      <div class="forum-posts" id="forumPosts" ref="forumPostsContainer">
        <div 
          v-for="post in filteredPosts" 
          :key="post.id"
          class="forum-post"
          :data-category="post.category"
          :data-post-id="post.id"
        >
          <div class="post-header">
            <h2 class="post-title">{{ post.title }}</h2>
            <button 
              @click="deletePost(post.id)" 
              class="delete-btn"
              :title="`Delete post: ${post.title}`"
            >
              🗑️
            </button>
          </div>
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
          <div class="post-actions">
            <a href="#" @click.prevent="viewPost(post)" class="read-more">Read More</a>
            <button @click="editPost(post)" class="edit-button">Edit</button>
          </div>
        </div>
      </div>
      
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
      ],
      nextId: 5
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
  mounted() {
    this.addDOMEventListeners();
    
  },
  beforeUnmount() {
    this.removeDOMEventListeners();
  },
  methods: {
    addDOMEventListeners() {
      const forumContainer = document.querySelector('.forum-container');
      if (forumContainer) {
        forumContainer.addEventListener('click', this.handleContainerClick);
      }
    },
    
    removeDOMEventListeners() {
      const forumContainer = document.querySelector('.forum-container');
      if (forumContainer) {
        forumContainer.removeEventListener('click', this.handleContainerClick);
      }
    },
    
    handleContainerClick(event) {
      if (event.target.classList.contains('dynamic-element')) {
        console.log('Clicked on dynamically created element:', event.target.textContent);
      }
    },
  
    
    createPostWithDOM() {
      const newPost = {
        id: this.nextId++,
        title: this.newPost.title,
        description: this.newPost.content,
        author: "CurrentUser",
        date: new Date().toISOString().split('T')[0],
        category: this.newPost.category,
        views: 0,
        replies: 0
      };
      
      this.posts.unshift(newPost);

      const forumPosts = this.$refs.forumPostsContainer;
      if (forumPosts) {
        const postElement = document.createElement('div');
        postElement.className = 'forum-post dynamic-post';
        postElement.setAttribute('data-category', newPost.category);
        postElement.setAttribute('data-post-id', newPost.id);
        
        postElement.innerHTML = `
          <div class="post-header">
            <h2 class="post-title">${newPost.title}</h2>
            <button class="delete-btn" title="Delete post: ${newPost.title}">🗑️</button>
          </div>
          <p class="post-description">${newPost.description}</p>
          <div class="post-meta">
            <p class="post-author">Posted by: <em>${newPost.author}</em></p>
            <p class="post-date">Date: <u>${newPost.date}</u></p>
            <p class="post-category">Category: ${this.getCategoryName(newPost.category)}</p>
          </div>
          <div class="post-stats">
            <span class="views">👁️ ${newPost.views} views</span>
            <span class="replies">💬 ${newPost.replies} replies</span>
          </div>
          <div class="post-actions">
            <a href="#" class="read-more">Read More</a>
            <button class="edit-btn">Edit</button>
          </div>
        `;
        
        const deleteBtn = postElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => this.deletePostFromDOM(newPost.id));
        
        forumPosts.insertBefore(postElement, forumPosts.firstChild);
        
        postElement.style.opacity = '0';
        postElement.style.transform = 'translateY(-20px)';
        setTimeout(() => {
          postElement.style.transition = 'all 0.3s ease';
          postElement.style.opacity = '1';
          postElement.style.transform = 'translateY(0)';
        }, 10);
      }
      
      this.closeModal();
    },
    
    deletePostFromDOM(postId) {

      const index = this.posts.findIndex(post => post.id === postId);
      if (index > -1) {
        this.posts.splice(index, 1);
      }
      
      const postElement = document.querySelector(`[data-post-id="${postId}"]`);
      if (postElement) {
      
        postElement.style.transition = 'all 0.3s ease';
        postElement.style.opacity = '0';
        postElement.style.transform = 'translateX(-100px)';
        
        setTimeout(() => {
          postElement.remove();
        }, 300);
      }
    },

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

      this.createPostWithDOM();
    },
    
    deletePost(postId) {
      this.deletePostFromDOM(postId);
    },
    
    filterPosts() {

      console.log('Filtering posts by category:', this.selectedCategory);
    },
    
    viewPost(post) {

      console.log('Viewing post:', post.title);

      alert(`Viewing post: ${post.title}`);
    },
    
    editPost(post) {

      this.newPost = {
        title: post.title,
        category: post.category,
        content: post.description
      };
      this.showModal = true;
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
