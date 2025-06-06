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

document.addEventListener("DOMContentLoaded", function () {
  renderVideoList(); 
});
