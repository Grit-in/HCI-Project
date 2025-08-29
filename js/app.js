// Navbar toggle
const menu = document.querySelector("#menu");
const menuLinks = document.querySelector(".navbar__menu");

menu.addEventListener("click", function () {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
});

// Popup logic
const signupBtn = document.getElementById("signupBtn");
const popup = document.getElementById("popup");
const popupOverlay = document.getElementById("popupOverlay");
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  popup.classList.add("active");
  popupOverlay.classList.add("active");
});

popupOverlay.addEventListener("click", () => {
  popup.classList.remove("active");
  popupOverlay.classList.remove("active");
});

loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginForm.classList.add("active");
  registerForm.classList.remove("active");
});

registerTab.addEventListener("click", () => {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  registerForm.classList.add("active");
  loginForm.classList.remove("active");
});

// Registration Form Validation reloads 
registerForm.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const email = document.querySelector('#registerForm input[type="email"]').value;
  const username = document.querySelector('#registerForm input[type="text"]').value;
  const password = document.querySelector('#registerForm input[type="password"]:nth-child(1)').value;
  const confirmPassword = document.querySelector('#registerForm input[type="password"]:nth-child(2)').value;
  
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const usernamePattern = /[a-zA-Z]/;
  if (username.length <= 3 || !usernamePattern.test(username)) {
    alert("Username must be longer than 3 characters and contain at least one letter.");
    return;
  }

  const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
  if (!specialCharPattern.test(password)) {
    alert("Password must contain at least one special character.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  alert("Registration successful!");
  
  registerForm.reset();
  
  popup.classList.remove("active");
  popupOverlay.classList.remove("active");
  location.reload();
});

// Navbar scroll effect puts orange effect below the navbar
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 0) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});

// Video data and filters fill put in a json file if my prof lets me use node js
const videoData = {
  videos: [
    {
      title: "Juri",
      characters: ["juri","universal"],
      keywords: ["FSE"],
      videoSrc: "../videos/2024-12-19 17-52-42.mp4",
    },
    {
      title: "Juri SFE safejump",
      characters: ["juri","universal"],
      keywords: ["FSE","safejump"],
      videoSrc: "../videos/2024-12-19 17-56-52.mp4",
    },
    {
      title: "Juri SFE cornercarry",
      characters: ["juri","universal"],
      keywords: ["FSE","cornercarry"],
      videoSrc: "../videos/2024-12-19 17-58-17.mp4",
    },
    {
      title: "Ryu side swap",
      characters: ["ryu","universal"],
      keywords: ["sideswap"],
      videoSrc: "../videos/ryu1.mov",
    },
    {
      title: "Saku combo",
      characters: ["ryu","universal"],
      keywords: ["combo","cashout"],
      videoSrc: "../videos/2024-02-08_05-19-12.mp4",
    },
    {
      title: "Jamie post lvl 3 safe jump by Corvo",
      characters: ["jamie","universal"],
      keywords: ["safejump"],
      videoSrc: "../videos/Corrvoh_Safe_jump_PROOF.mp4",
    },
    {
      title: "A.K.I safe oki setup",
      characters: ["aki","universal"],
      keywords: ["okizeme","safesetup"],
      videoSrc: "../videos/9f317b2e-45b7-4503-96b1-3b97f11a4d49.mov",
    },
    {
      title: "Jamie lvl 1 and rashid lvl 1 interaction",
      characters: ["jamie","universal"],
      keywords: ["interaction"],
      videoSrc: "../videos/0b9a3bb7-0e6e-4904-93b0-d532a4cf76b5(1).mov",
    },
  ],
};

function renderVideoList() {
  const videoContainer = document.getElementById("videoListContainer");
  videoContainer.innerHTML = "";
  videoData.videos.forEach((video) => {
    const videoItem = document.createElement("div");
    videoItem.className = "video-item";
    videoItem.setAttribute("data-characters", video.characters.join(","));

    const videoElement = document.createElement("video");
    videoElement.setAttribute("width", "100%");
    videoElement.setAttribute("controls", true);
    const source = document.createElement("source");
    source.setAttribute("src", video.videoSrc);
    source.setAttribute("type", "video/mp4");
    videoElement.appendChild(source);

    const title = document.createElement("h2");
    title.innerText = video.title;
    videoItem.appendChild(title);
    videoItem.appendChild(videoElement);

    if (video.description) {
      const description = document.createElement("p");
      description.innerText = video.description;
      videoItem.appendChild(description);
    }

    videoContainer.appendChild(videoItem);
  });
}

function filterVideos(selectedCharacter) {
  const videos = document.querySelectorAll(".video-item");


  if (selectedCharacter === "universal") {
    videos.forEach((video) => {
      video.style.display = "block";
    });
  } else {
    videos.forEach((video) => {
      const videoCharacters = video.getAttribute("data-characters").split(",");
      if (videoCharacters.includes(selectedCharacter) || selectedCharacter === "universal") {
        video.style.display = "block";
      } else {
        video.style.display = "none";
      }
    });
  }
}

const characterSelect = document.getElementById("characterSelect");
characterSelect.addEventListener("change", () => {
  const selectedCharacter = characterSelect.value;
  filterVideos(selectedCharacter);
});

// Character data for frame data page
const characterData = {
  terry: {
    name: "Terry Bogard",
    image: "../img/icons/Terry.jpg",
    description: "<strong>Terry Bogard</strong> is a <em>versatile character</em> with <u>excellent neutral game</u> and strong pressure options. His <strong>Power Wave</strong> and <strong>Burn Knuckle</strong> provide solid zoning tools.",
    strengths: [
      "Excellent neutral game",
      "Strong pressure options", 
      "Good zoning tools",
      "Solid anti-air options"
    ],
    weaknesses: [
      "Limited defensive options",
      "Vulnerable to cross-ups",
      "Requires meter for optimal damage",
      "Can be predictable"
    ]
  },
  ryu: {
    name: "Ryu",
    image: "../img/icons/Ryu.png",
    description: "<strong>Ryu</strong> is the <em>classic shoto character</em> with <u>balanced gameplay</u>. His <strong>Hadoken</strong> and <strong>Shoryuken</strong> are fundamental tools.",
    strengths: [
      "Balanced gameplay",
      "Strong fundamentals",
      "Good fireball game",
      "Reliable anti-air"
    ],
    weaknesses: [
      "Limited mix-up options",
      "Predictable patterns",
      "Requires precise execution",
      "Can be out-zoned"
    ]
  },
  ken: {
    name: "Ken Masters",
    image: "../img/icons/Ken.png",
    description: "<strong>Ken</strong> is an <em>aggressive rushdown character</em> with <u>high damage potential</u>. His <strong>Dragon Punch</strong> and <strong>Hadoken</strong> create pressure.",
    strengths: [
      "High damage output",
      "Strong rushdown",
      "Good pressure game",
      "Excellent corner carry"
    ],
    weaknesses: [
      "Limited defensive options",
      "Vulnerable to zoning",
      "Requires meter management",
      "Can be predictable"
    ]
  }
};

// Character switching function
function changeCharacter() {
  const selector = document.getElementById('characterSelector');
  const character = characterData[selector.value];
  
  if (character) {
    // Update character image
    const image = document.getElementById('characterImage');
    if (image) {
      image.src = character.image;
      image.alt = character.name;
      
      // Add animation effect
      image.style.transform = 'scale(0.8)';
      setTimeout(() => {
        image.style.transform = 'scale(1)';
      }, 200);
    }
    
    // Update character name
    const nameElement = document.getElementById('characterName');
    if (nameElement) {
      nameElement.textContent = character.name;
      nameElement.style.color = '#f1644b';
      setTimeout(() => {
        nameElement.style.color = '#fff';
      }, 1000);
    }
    
    // Update character description
    const descriptionElement = document.querySelector('.character-description');
    if (descriptionElement) {
      descriptionElement.innerHTML = character.description;
    }
    
    // Update strengths and weaknesses
    updateCharacterInfo(character);
  }
}

// Update character info sections
function updateCharacterInfo(character) {
  const strengthsList = document.querySelector('.info-section:first-child ul');
  const weaknessesList = document.querySelector('.info-section:last-child ol');
  
  if (strengthsList) {
    strengthsList.innerHTML = '';
    character.strengths.forEach(strength => {
      const li = document.createElement('li');
      li.textContent = strength;
      li.style.opacity = '0';
      strengthsList.appendChild(li);
      
      // Animate list items
      setTimeout(() => {
        li.style.transition = 'opacity 0.5s ease';
        li.style.opacity = '1';
      }, 100);
    });
  }
  
  if (weaknessesList) {
    weaknessesList.innerHTML = '';
    character.weaknesses.forEach((weakness, index) => {
      const li = document.createElement('li');
      li.textContent = weakness;
      li.style.opacity = '0';
      weaknessesList.appendChild(li);
      
      // Animate list items with delay
      setTimeout(() => {
        li.style.transition = 'opacity 0.5s ease';
        li.style.opacity = '1';
      }, 200 + (index * 100));
    });
  }
}

// Enhanced form validation with additional events
document.addEventListener("DOMContentLoaded", function () {
  renderVideoList();
  
  // Add mouseover event for character images
  const characterImage = document.getElementById('characterImage');
  if (characterImage) {
    characterImage.addEventListener('mouseover', function() {
      this.style.transform = 'scale(1.1) rotate(2deg)';
      this.style.boxShadow = '0 0 30px rgba(241, 100, 75, 0.8)';
    });
    
    characterImage.addEventListener('mouseout', function() {
      this.style.transform = 'scale(1) rotate(0deg)';
      this.style.boxShadow = '0 0 20px rgba(241, 100, 75, 0.5)';
    });
  }
  
  // Add keydown event for character selector
  const characterSelector = document.getElementById('characterSelector');
  if (characterSelector) {
    characterSelector.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        changeCharacter();
      }
    });
  }
  
  // Add double-click event for table rows
  const tableRows = document.querySelectorAll('.moves-table tbody tr');
  tableRows.forEach(row => {
    row.addEventListener('dblclick', function() {
      this.style.backgroundColor = 'rgba(241, 100, 75, 0.3)';
      setTimeout(() => {
        this.style.backgroundColor = '';
      }, 1000);
    });
  });
  
  // Add context menu event for table
  const movesTable = document.getElementById('movesTable');
  if (movesTable) {
    movesTable.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      alert('Right-click detected! This table shows frame data for character moves.');
    });
  }
  
  // Enhanced form validation with additional custom validations
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('input', function(e) {
      const input = e.target;
      
      // Real-time validation feedback
      if (input.type === 'email') {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (emailPattern.test(input.value)) {
          input.style.borderColor = '#4CAF50';
        } else {
          input.style.borderColor = '#f44336';
        }
      }
      
      if (input.type === 'password') {
        const password = input.value;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        if (password.length >= 8 && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar) {
          input.style.borderColor = '#4CAF50';
        } else {
          input.style.borderColor = '#f44336';
        }
      }
    });
  }
});

// CSS Animation function
function animateElement(element, animation) {
  element.style.animation = animation;
  element.addEventListener('animationend', function() {
    element.style.animation = '';
  });
}

// Add animation to page load
window.addEventListener('load', function() {
  const mainContent = document.querySelector('.mu-main');
  if (mainContent) {
    animateElement(mainContent, 'fadeIn 1s ease-in');
  }
});

// Forum functionality
document.addEventListener('DOMContentLoaded', function() {
  // Forum modal functionality
  const newPostBtn = document.getElementById('newPostBtn');
  const newPostModal = document.getElementById('newPostModal');
  const closeBtn = document.querySelector('.close');
  const newPostForm = document.getElementById('newPostForm');
  const categoryFilter = document.getElementById('categoryFilter');
  const forumPosts = document.getElementById('forumPosts');

  // Open modal
  if (newPostBtn) {
    newPostBtn.addEventListener('click', function() {
      newPostModal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  }

  // Close modal
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      newPostModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }

  // Close modal when clicking outside
  if (newPostModal) {
    newPostModal.addEventListener('click', function(e) {
      if (e.target === newPostModal) {
        newPostModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Handle new post form submission
  if (newPostForm) {
    newPostForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const title = document.getElementById('postTitle').value;
      const category = document.getElementById('postCategory').value;
      const content = document.getElementById('postContent').value;
      
      // Create new post element
      const newPost = createNewPost(title, category, content);
      
      // Add to forum posts
      if (forumPosts) {
        forumPosts.insertBefore(newPost, forumPosts.firstChild);
        
        // Animate the new post
        newPost.style.opacity = '0';
        newPost.style.transform = 'translateY(-20px)';
        setTimeout(() => {
          newPost.style.transition = 'all 0.5s ease';
          newPost.style.opacity = '1';
          newPost.style.transform = 'translateY(0)';
        }, 100);
      }
      
      // Close modal and reset form
      newPostModal.style.display = 'none';
      document.body.style.overflow = 'auto';
      newPostForm.reset();
      
      // Show success message
      showNotification('Post created successfully!', 'success');
    });
  }

  // Category filtering
  if (categoryFilter) {
    categoryFilter.addEventListener('change', function() {
      const selectedCategory = this.value;
      const posts = document.querySelectorAll('.forum-post');
      
      posts.forEach(post => {
        const postCategory = post.getAttribute('data-category');
        
        if (selectedCategory === 'all' || postCategory === selectedCategory) {
          post.style.display = 'block';
          post.classList.remove('hidden');
        } else {
          post.classList.add('hidden');
          setTimeout(() => {
            post.style.display = 'none';
          }, 300);
        }
      });
    });
  }

  // Add click events to forum posts
  const posts = document.querySelectorAll('.forum-post');
  posts.forEach(post => {
    post.addEventListener('click', function(e) {
      if (!e.target.classList.contains('read-more')) {
        // Highlight the clicked post
        this.style.borderColor = '#f1644b';
        this.style.transform = 'scale(1.02)';
        
        setTimeout(() => {
          this.style.borderColor = '';
          this.style.transform = '';
        }, 500);
      }
    });
  });
});

// Create new forum post element
function createNewPost(title, category, content) {
  const post = document.createElement('div');
  post.className = 'forum-post';
  post.setAttribute('data-category', category);
  
  const currentDate = new Date().toISOString().split('T')[0];
  const categoryNames = {
    'general': 'General Discussion',
    'strategy': 'Strategy & Tips',
    'character': 'Character Discussion',
    'tournament': 'Tournament Talk'
  };
  
  post.innerHTML = `
    <h2 class="post-title">${title}</h2>
    <p class="post-description">${content}</p>
    <div class="post-meta">
      <p class="post-author">Posted by: <em>You</em></p>
      <p class="post-date">Date: <u>${currentDate}</u></p>
      <p class="post-category">Category: ${categoryNames[category]}</p>
    </div>
    <div class="post-stats">
      <span class="views">👁️ 1 view</span>
      <span class="replies">💬 0 replies</span>
    </div>
    <a href="../html/forumtest.html" class="read-more">Read More</a>
  `;
  
  return post;
}

// Show notification function
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 2rem;
    background: ${type === 'success' ? '#4CAF50' : '#f44336'};
    color: white;
    border-radius: 5px;
    z-index: 10000;
    animation: slideInFromRight 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Character details modal function
function showCharacterDetails() {
  const modal = document.createElement('div');
  modal.className = 'character-details-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
      <h2>Terry Bogard - Character Details</h2>
      <div class="character-details">
        <img src="../img/icons/Terry.jpg" alt="Terry" style="width: 150px; border-radius: 10px;">
        <div class="details-content">
          <h3>Character Overview</h3>
          <p><strong>Fighting Style:</strong> <em>Hakkesho</em></p>
          <p><strong>Origin:</strong> <u>South Town</u></p>
          <p><strong>Special Moves:</strong></p>
          <ul>
            <li>Power Wave</li>
            <li>Burn Knuckle</li>
            <li>Crack Shoot</li>
            <li>Rising Tackle</li>
          </ul>
          <p><strong>Super Moves:</strong></p>
          <ol>
            <li>Power Geyser</li>
            <li>Buster Wolf</li>
            <li>Triple Geyser</li>
          </ol>
        </div>
      </div>
    </div>
  `;
  
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.3s ease;
  `;
  
  document.body.appendChild(modal);
  
  // Add click outside to close
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.remove();
    }
  });
}
