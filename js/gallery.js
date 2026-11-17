/**
 * Chennakeshava Nilaya — Gallery & Lightbox Controller
 * Handles image rendering, category filtering, and modal lightbox navigation.
 */

(function () {
  'use strict';

  // Gallery items data structure.
  // Real photos are configured for available 1 BHK areas, with clean placeholders
  // ready for exterior elevation and 1 RK units.
  const galleryItems = [
    {
      id: 1,
      title: "1 BHK Living Room with Sofa",
      category: "living",
      categoryLabel: "Living Spaces",
      src: "images/1bhk/1bhk-hall-sofa.jpg",
      alt: "Furnished 1 BHK living room with sofa at Chennakesava Nilaya",
      aspectClass: "wide"
    },
    {
      id: 2,
      title: "SRK Nivas — Main Entrance Gate",
      category: "exterior",
      categoryLabel: "Building Exterior",
      src: "images/gallery/gallery-exterior-2.jpg",
      alt: "SRK Nivas main entrance gate with gold signboard, security gate and rental banner in Bellandur",
      aspectClass: "wide"
    },
    {
      id: 3,
      title: "1 BHK Master Bedroom",
      category: "bedrooms",
      categoryLabel: "Bedrooms",
      src: "images/1bhk/1bhk-bedroom.jpg",
      alt: "Spacious master bedroom with bed and natural light",
      aspectClass: "standard"
    },
    {
      id: 4,
      title: "Kitchen & Storage Counter",
      category: "kitchen",
      categoryLabel: "Kitchen",
      src: "images/1bhk/1bhk-kitchen.jpg",
      alt: "Functional residential kitchen counter area with ventilation",
      aspectClass: "standard"
    },
    {
      id: 5,
      title: "Lift Lobby — Stainless Steel Elevator Doors",
      category: "common",
      categoryLabel: "Common Areas",
      src: "images/gallery/gallery-exterior-1.jpg",
      alt: "Modern stainless steel passenger lift doors with polished granite wall finish at Chennakesava Nilaya",
      aspectClass: "standard"
    },
    {
      id: 5.1,
      title: "Ground Floor Lobby & Power Backup System",
      category: "common",
      categoryLabel: "Common Areas",
      src: "images/gallery/gallery-exterior-3.jpg",
      alt: "Ground floor lobby area showing Kirloskar power generator, electrical panels, security watchman and staircase",
      aspectClass: "wide"
    },
    {
      id: 5.2,
      title: "Covered Parking & Ground Floor Common Area",
      category: "common",
      categoryLabel: "Common Areas",
      src: "images/gallery/gallery-exterior-4.jpg",
      alt: "Ground floor covered parking with marble flooring, CCTV monitor, lift access and staircase at SRK Nivas",
      aspectClass: "wide"
    },
    {
      id: 6,
      title: "Tiled Bathroom & Geyser",
      category: "bathrooms",
      categoryLabel: "Bathrooms",
      src: "images/1bhk/1bhk-bathroom.jpg",
      alt: "Clean residential bathroom with 24/7 hot water supply",
      aspectClass: "tall"
    },
    {
      id: 7,
      title: "Open Hall & Room Layout",
      category: "living",
      categoryLabel: "Living Spaces",
      src: "images/1bhk/1bhk-hall-kitchen-view.jpg",
      alt: "Wide view of living hall including bedroom and kitchen connectivity",
      aspectClass: "standard"
    },
    {
      id: 8,
      title: "Common Corridor & Lift Access",
      category: "common",
      categoryLabel: "Common Areas",
      src: "images/1bhk/1bhk-common-lift.jpg",
      alt: "Well-maintained corridor and passenger elevator access",
      aspectClass: "standard"
    },
    {
      id: 9,
      title: "Private Unit Balcony",
      category: "living",
      categoryLabel: "Living Spaces",
      src: "images/1bhk/1bhk-balcony.jpg",
      alt: "Ventilated private balcony attached to the residential unit",
      aspectClass: "standard"
    },
    {
      id: 10,
      title: "1 RK Furnished Room Layout",
      category: "bedrooms",
      categoryLabel: "Bedrooms",
      src: "images/1rk/1rk-main.jpg",
      alt: "1 RK room layout with beds and furnishing at Chennakesava Nilaya",
      aspectClass: "standard"
    },
    {
      id: 11,
      title: "1 RK Living & Sleeping Space",
      category: "living",
      categoryLabel: "Living Spaces",
      src: "images/1rk/1rk-room.jpg",
      alt: "1 RK interior view showing room arrangement and ventilation",
      aspectClass: "standard"
    }
  ];

  // DOM Elements
  const galleryGrid = document.getElementById("galleryGrid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxCategory = document.getElementById("lightboxCategory");
  const lightboxCounter = document.getElementById("lightboxCounter");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  let currentFilteredList = [...galleryItems];
  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  // Render gallery cards into the DOM
  function renderGallery(items) {
    if (!galleryGrid) return;

    galleryGrid.innerHTML = "";

    items.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = `gallery-item ${item.aspectClass}`;
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `View photo: ${item.title}`);
      card.dataset.index = index;

      card.innerHTML = `
        <img src="${item.src}" alt="${item.alt}" loading="lazy" />
        <div class="gallery-item-overlay">
          <span class="gallery-item-category">${item.categoryLabel}</span>
          <h3 class="gallery-item-title">${item.title}</h3>
        </div>
        <div class="gallery-item-expand" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
        </div>
      `;

      // Event listener for opening lightbox
      card.addEventListener("click", () => {
        openLightbox(index);
      });

      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox(index);
        }
      });

      galleryGrid.appendChild(card);
    });
  }

  // Filter gallery items by category
  function applyFilter(category) {
    filterButtons.forEach((btn) => {
      if (btn.dataset.filter === category) {
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      }
    });

    if (category === "all") {
      currentFilteredList = [...galleryItems];
    } else {
      currentFilteredList = galleryItems.filter((item) => item.category === category);
    }

    renderGallery(currentFilteredList);
  }

  // Setup filter button listeners
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.filter;
      applyFilter(cat);
    });
  });

  // Open Lightbox
  function openLightbox(index) {
    if (!currentFilteredList[index]) return;
    currentIndex = index;
    updateLightboxContent();

    lightboxModal.classList.add("active");
    lightboxModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Prevent background scroll
    lightboxClose.focus();
  }

  // Close Lightbox
  function closeLightbox() {
    lightboxModal.classList.remove("active");
    lightboxModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Update image and captions in lightbox
  function updateLightboxContent() {
    const item = currentFilteredList[currentIndex];
    if (!item) return;

    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightboxTitle.textContent = item.title;
    lightboxCategory.textContent = item.categoryLabel;
    lightboxCounter.textContent = `${currentIndex + 1} of ${currentFilteredList.length}`;
  }

  // Next image
  function showNextImage() {
    currentIndex = (currentIndex + 1) % currentFilteredList.length;
    updateLightboxContent();
  }

  // Previous image
  function showPrevImage() {
    currentIndex = (currentIndex - 1 + currentFilteredList.length) % currentFilteredList.length;
    updateLightboxContent();
  }

  // Touch Swipe gestures for mobile users
  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
  }

  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
  }

  function handleSwipeGesture() {
    const delta = touchEndX - touchStartX;
    if (Math.abs(delta) > 40) {
      if (delta < 0) {
        showNextImage();
      } else {
        showPrevImage();
      }
    }
  }

  // Lightbox navigation button event listeners
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener("click", showNextImage);
  if (lightboxPrev) lightboxPrev.addEventListener("click", showPrevImage);

  // Click outside image container to close
  if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });

    lightboxModal.addEventListener("touchstart", handleTouchStart, { passive: true });
    lightboxModal.addEventListener("touchend", handleTouchEnd, { passive: true });
  }

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (!lightboxModal.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowRight") {
      showNextImage();
    } else if (e.key === "ArrowLeft") {
      showPrevImage();
    }
  });

  // Initial gallery render
  renderGallery(currentFilteredList);

})();
