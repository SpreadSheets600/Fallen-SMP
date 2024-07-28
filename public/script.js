document.addEventListener("DOMContentLoaded", function () {
    // Firebase initialization
    const firebaseConfig = {
      apiKey: "AIzaSyCF6LLa_JIiVvYxmM1026wQouwhvHUbjGc",
      authDomain: "ga-pc-1e736.firebaseapp.com",
      projectId: "ga-pc-1e736",
      storageBucket: "ga-pc-1e736.appspot.com",
      messagingSenderId: "39302039192",
      appId: "1:39302039192:web:5359f44894840bb855b2ed",
    };
  
    // Initialize Firebase (make sure to import the necessary Firebase modules)
    // const app = initializeApp(firebaseConfig);
    // const analytics = getAnalytics(app);
    // const perf = getPerformance(app);
  
    // Smooth scrolling for navigation links
    const scrollLinks = document.querySelectorAll(".scroll");
    scrollLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          const offsetTop = target.offsetTop;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });
  
    // Mobile navbar functionality
    function mobile_navbar_link_hider() {
      var x = document.getElementById("mobile_navbar_links");
      if (x.style.display === "flex") {
        x.style.display = "none";
      } else {
        x.style.display = "flex";
      }
    }
  
    // IP copying functionality
    function copyText() {
      navigator.clipboard.writeText("play.fallensmp.xyz");
    }
  
    $(document).ready(function () {
      $(".main1_ipcopier").click(function () {
        var popup = $("<div>", { class: "main1_popup" }).append(
          $('<h3 class="copy_confirm">').text("Copied IP to clipboard")
        );
        $(this).after(popup);
        setTimeout(function () {
          popup.remove();
        }, 1000);
      });
    });
  
    // Features carousel
    const features = [
      {
        img: "assets/roleplay.png",
        title: "Custom Roleplay",
        description: "Fallen SMP Has It's Own Custom And Unique Roleplay System",
      },
      {
        img: "assets/items.jpg",
        title: "Custom Items",
        description: "Fallen SMP Features Amazing Custom And Unique Items And Mobs",
      },
      {
        img: "assets/drops.jpg",
        title: "Custom Enchants",
        description: "Fallen SMP Enhances The Experience With Custom Enchants",
      },
      {
        img: "assets/bg.png",
        title: "Guilds & Hierarchy",
        description: "Fallen SMP Has It's Own Guild System With Hierarchy",
      },
      {
        img: "assets/bg.png",
        title: "Dungeons & Economy",
        description: "Fallen SMP Has It's Unique System For Mob Dungeons And Economy",
      },
    ];
  
    let currentFeatureIndex = 0;
    const featureCarouselContainer = document.querySelector(".feature-carousel-container");
    const featurePrevButton = document.querySelector(".features-carousel .f-nav-button.prev");
    const featureNextButton = document.querySelector(".features-carousel .f-nav-button.next");
  
    function createFeatureCard(feature) {
      const card = document.createElement("div");
      card.className = "feature-card";
      card.innerHTML = `
        <img class="feature-img" src="${feature.img}" alt="${feature.title}">
        <h3 class="feature-title">${feature.title}</h3>
        <p class="feature-description">${feature.description}</p>
      `;
      return card;
    }
  
    function updateFeatureCards() {
      featureCarouselContainer.innerHTML = "";
      const prevIndex = (currentFeatureIndex - 1 + features.length) % features.length;
      const nextIndex = (currentFeatureIndex + 1) % features.length;
  
      const prevCard = createFeatureCard(features[prevIndex]);
      const activeCard = createFeatureCard(features[currentFeatureIndex]);
      const nextCard = createFeatureCard(features[nextIndex]);
  
      prevCard.classList.add("prev-card");
      activeCard.classList.add("active-card");
      nextCard.classList.add("next-card");
  
      featureCarouselContainer.appendChild(prevCard);
      featureCarouselContainer.appendChild(activeCard);
      featureCarouselContainer.appendChild(nextCard);
    }
  
    function moveFeatureCards(direction) {
      featureCarouselContainer.classList.add(`move-${direction}`);
  
      setTimeout(() => {
        if (direction === "left") {
          currentFeatureIndex = (currentFeatureIndex + 1) % features.length;
        } else {
          currentFeatureIndex = (currentFeatureIndex - 1 + features.length) % features.length;
        }
  
        updateFeatureCards();
        featureCarouselContainer.classList.remove("move-left", "move-right");
      }, 500);
    }
  
    featurePrevButton.addEventListener("click", () => moveFeatureCards("right"));
    featureNextButton.addEventListener("click", () => moveFeatureCards("left"));
  
    updateFeatureCards();
  
    // Team members carousel
    const teamMembers = [
      {
        img: "assets/fallen.jpg",
        rank: "OWNER",
        name: "FALLEN",
        description: "Owner, Contributor And Admin",
        rankClass: "owner",
      },
      {
        img: "assets/qupix.gif",
        rank: "CO OWNER",
        name: "QUPIX",
        description: "Co Owner, Superviser And Content Creator",
        rankClass: "owner",
      },
      {
        img: "assets/leaf.webp",
        rank: "ADMIN",
        name: "LEAF",
        description: "Admin, Developer And Contributor",
        rankClass: "admin",
      },
      {
        img: "assets/anos.gif",
        rank: "ADMIN",
        name: "ANOS",
        description: "Admin, Developer And Contributor",
        rankClass: "admin",
      },
      {
        img: "assets/superrr.webp",
        rank: "ADMIN",
        name: "Superrr",
        description: "Admin, Developer And Contributor",
        rankClass: "admin",
      },
      {
        img: "assets/soham.webp",
        rank: "ADMIN",
        name: "SOHAM",
        description: "Admin, Developer And Contributor",
        rankClass: "admin",
      },
    ];
  
    let currentMemberIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    const carouselContainer = document.querySelector(".carousel-container");
    const prevButton = document.querySelector(".team-carousel .nav-button.prev");
    const nextButton = document.querySelector(".team-carousel .nav-button.next");
  
    // Add touch event listeners
    carouselContainer.addEventListener("touchstart", handleTouchStart, false);
    carouselContainer.addEventListener("touchmove", handleTouchMove, false);
    carouselContainer.addEventListener("touchend", handleTouchEnd, false);
  
    function createCard(member) {
      const card = document.createElement("div");
      card.className = "team-member-card";
      card.innerHTML = `
        <img class="team-member-img" alt="${member.name}" src="${member.img}" />
        <div class="team-member-info">
          <span class="team-member-rank ${member.rankClass}">${member.rank}</span>
          <h3 class="team-member-name">${member.name}</h3>
        </div>
        <p class="team-member-description">${member.description}</p>
      `;
      return card;
    }
  
    function updateCards() {
      carouselContainer.innerHTML = "";
      const prevIndex = (currentMemberIndex - 1 + teamMembers.length) % teamMembers.length;
      const nextIndex = (currentMemberIndex + 1) % teamMembers.length;
  
      const prevCard = createCard(teamMembers[prevIndex]);
      const activeCard = createCard(teamMembers[currentMemberIndex]);
      const nextCard = createCard(teamMembers[nextIndex]);
  
      prevCard.classList.add("prev-card");
      activeCard.classList.add("active-card");
      nextCard.classList.add("next-card");
  
      carouselContainer.appendChild(prevCard);
      carouselContainer.appendChild(activeCard);
      carouselContainer.appendChild(nextCard);
    }
  
    function moveCards(direction) {
      carouselContainer.classList.add(`move-${direction}`);
  
      setTimeout(() => {
        if (direction === "left") {
          currentMemberIndex = (currentMemberIndex + 1) % teamMembers.length;
        } else {
          currentMemberIndex = (currentMemberIndex - 1 + teamMembers.length) % teamMembers.length;
        }
  
        updateCards();
        carouselContainer.classList.remove("move-left", "move-right");
      }, 500);
    }
  
    function handleTouchStart(event) {
      touchStartX = event.touches[0].clientX;
    }
  
    function handleTouchMove(event) {
      touchEndX = event.touches[0].clientX;
    }
  
    function handleTouchEnd() {
      if (touchStartX - touchEndX > 75) {
        // Swipe left
        moveCards("left");
      } else if (touchEndX - touchStartX > 75) {
        // Swipe right
        moveCards("right");
      }
      // Reset values
      touchStartX = 0;
      touchEndX = 0;
    }
  
    prevButton.addEventListener("click", () => moveCards("right"));
    nextButton.addEventListener("click", () => moveCards("left"));
  
    updateCards();
  
    // Form functionality
    const hidesomething = () => {
      document.querySelector(".hideafterNext").classList.toggle("hidden");
      document.querySelector(".showafternext").classList.toggle("hidden");
    };
  
    const closeform = () => {
      document.getElementById("wl-form").classList.toggle("hidden");
    };
  
    const submitform = () => {
      document.querySelector(".done").style.translate = "-300px";
      setTimeout(() => {
        document.querySelector(".done").style.translate = "0px";
      }, 3000);
      document.getElementById("wl-form").classList.toggle("hidden");
    };
  
    // Add event listeners for form functionality if the elements exist
    const hideAfterNextElement = document.querySelector(".hideafterNext");
    const showAfterNextElement = document.querySelector(".showafternext");
    const wlFormElement = document.getElementById("wl-form");
    const doneElement = document.querySelector(".done");
  
    if (hideAfterNextElement && showAfterNextElement) {
      document.querySelector(".nextButton").addEventListener("click", hidesomething);
    }
  
    if (wlFormElement) {
      document.querySelector(".closeform").addEventListener("click", closeform);
      document.querySelector(".sb-btn").addEventListener("click", submitform);
    }
  });