document.addEventListener("DOMContentLoaded", () => {
  const scrollLinks = document.querySelectorAll(".scroll");
  scrollLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
      }
    });
  });

  window.mobile_navbar_link_hider = () => {
    const x = document.getElementById("mobile_navbar_links");
    x.style.display = x.style.display === "flex" ? "none" : "flex";
  };

  window.copyText = () => {
    navigator.clipboard.writeText("play.fallensmp.xyz");
  };

  $(document).ready(() => {
    $(".main1_ipcopier").click(function () {
      const popup = $(
        '<div class="main1_popup"><h3 class="copy_confirm">Copied IP to clipboard</h3></div>'
      );
      $(this).after(popup);
      setTimeout(() => popup.remove(), 1000);
    });
  });

  const features = [
    {
      img: "assets/roleplay.png",
      title: "Custom Roleplay",
      description: "Fallen SMP Has Its Own Custom And Unique Roleplay System",
    },
    {
      img: "assets/items.jpg",
      title: "Custom Items",
      description:
        "Fallen SMP Features Amazing Custom And Unique Items And Mobs",
    },
    {
      img: "assets/drops.jpg",
      title: "Custom Enchants",
      description: "Fallen SMP Enhances The Experience With Custom Enchants",
    },
    {
      img: "assets/bg.png",
      title: "Guilds & Hierarchy",
      description: "Fallen SMP Has Its Own Guild System With Hierarchy",
    },
    {
      img: "assets/bg.png",
      title: "Dungeons & Economy",
      description:
        "Fallen SMP Has Its Unique System For Mob Dungeons And Economy",
    },
  ];

  let currentFeatureIndex = 0;
  const featureCarouselContainer = document.querySelector(
    ".feature-carousel-container"
  );
  const featurePrevButton = document.querySelector(
    ".features-carousel .f-nav-button.prev"
  );
  const featureNextButton = document.querySelector(
    ".features-carousel .f-nav-button.next"
  );

  const createFeatureCard = (feature) => `
    <div class="feature-card">
      <img class="feature-img" src="${feature.img}" alt="${feature.title}">
      <h3 class="feature-title">${feature.title}</h3>
      <p class="feature-description">${feature.description}</p>
    </div>
  `;

  const updateFeatureCards = () => {
    featureCarouselContainer.innerHTML = "";
    const prevIndex =
      (currentFeatureIndex - 1 + features.length) % features.length;
    const nextIndex = (currentFeatureIndex + 1) % features.length;

    featureCarouselContainer.innerHTML =
      createFeatureCard(features[prevIndex]) +
      createFeatureCard(features[currentFeatureIndex]) +
      createFeatureCard(features[nextIndex]);

    featureCarouselContainer
      .querySelector(".feature-card:nth-child(1)")
      .classList.add("prev-card");
    featureCarouselContainer
      .querySelector(".feature-card:nth-child(2)")
      .classList.add("active-card");
    featureCarouselContainer
      .querySelector(".feature-card:nth-child(3)")
      .classList.add("next-card");
  };

  const moveFeatureCards = (direction) => {
    featureCarouselContainer.classList.add(`move-${direction}`);

    setTimeout(() => {
      currentFeatureIndex =
        direction === "left"
          ? (currentFeatureIndex + 1) % features.length
          : (currentFeatureIndex - 1 + features.length) % features.length;

      updateFeatureCards();
      featureCarouselContainer.classList.remove("move-left", "move-right");
    }, 500);
  };

  featurePrevButton.addEventListener("click", () => moveFeatureCards("right"));
  featureNextButton.addEventListener("click", () => moveFeatureCards("left"));

  updateFeatureCards();

  const teamMembers = [
    {
      img: "assets/fallen.gif",
      rank: "OWNER",
      name: "FALLEN",
      description: "Owner, Contributor And Admin",
      rankClass: "owner",
    },
    {
      img: "assets/qupix.gif",
      rank: "CO OWNER",
      name: "QUPIX",
      description: "Co Owner, Supervisor And Content Creator",
      rankClass: "owner",
    },
    {
      img: "assets/leaf.gif",
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
      img: "assets/parzival.gif",
      rank: "ADMIN",
      name: "P4RZ1V4L",
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
  const carouselContainer = document.querySelector(".carousel-container");
  const prevButton = document.querySelector(".team-carousel .nav-button.prev");
  const nextButton = document.querySelector(".team-carousel .nav-button.next");

  const createCard = (member) => `
    <div class="team-member-card">
      <img class="team-member-img" alt="${member.name}" src="${member.img}" />
      <div class="team-member-info">
        <span class="team-member-rank ${member.rankClass}">${member.rank}</span>
        <h3 class="team-member-name">${member.name}</h3>
      </div>
      <p class="team-member-description">${member.description}</p>
    </div>
  `;

  const updateCards = () => {
    carouselContainer.innerHTML = "";
    const prevIndex =
      (currentMemberIndex - 1 + teamMembers.length) % teamMembers.length;
    const nextIndex = (currentMemberIndex + 1) % teamMembers.length;

    carouselContainer.innerHTML =
      createCard(teamMembers[prevIndex]) +
      createCard(teamMembers[currentMemberIndex]) +
      createCard(teamMembers[nextIndex]);

    carouselContainer
      .querySelector(".team-member-card:nth-child(1)")
      .classList.add("prev-card");
    carouselContainer
      .querySelector(".team-member-card:nth-child(2)")
      .classList.add("active-card");
    carouselContainer
      .querySelector(".team-member-card:nth-child(3)")
      .classList.add("next-card");
  };

  const moveCards = (direction) => {
    carouselContainer.classList.add(`move-${direction}`);

    setTimeout(() => {
      currentMemberIndex =
        direction === "left"
          ? (currentMemberIndex + 1) % teamMembers.length
          : (currentMemberIndex - 1 + teamMembers.length) % teamMembers.length;

      updateCards();
      carouselContainer.classList.remove("move-left", "move-right");
    }, 500);
  };

  const handleTouch = (event) => event.touches[0].clientX;

  let touchStartX = 0;
  carouselContainer.addEventListener(
    "touchstart",
    (e) => (touchStartX = handleTouch(e)),
    false
  );
  carouselContainer.addEventListener("touchend", (e) => {
    const touchEndX = handleTouch(e);
    if (touchStartX - touchEndX > 75) moveCards("left");
    else if (touchEndX - touchStartX > 75) moveCards("right");
  });

  prevButton.addEventListener("click", () => moveCards("right"));
  nextButton.addEventListener("click", () => moveCards("left"));

  updateCards();

  const rulesButton = document.querySelector(".nextButton");
  if (rulesButton) {
    rulesButton.addEventListener("click", () => {
      const wlForm = document.getElementById("wl-form");
      if (wlForm) wlForm.classList.remove("hidden");
    });
  }

  const closeButton = document.querySelector(".closeform");
  if (closeButton)
    closeButton.addEventListener("click", () =>
      document.getElementById("wl-form").classList.add("hidden")
    );

  window.addEventListener("click", (event) => {
    const wlForm = document.getElementById("wl-form");
    if (event.target === wlForm) wlForm.classList.add("hidden");
  });

  window.submitform = () => {
    document.querySelector(".done").style.translate = "-300px";
    setTimeout(
      () => (document.querySelector(".done").style.translate = "0px"),
      3000
    );
    document.getElementById("wl-form").classList.add("hidden");
  };
});
