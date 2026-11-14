/**
 * Chennakeshava Nilaya (SRK Nivas) — Main Script
 * Handles navigation behavior, mobile menu, scroll observation, and video embed.
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. YouTube Video Configuration Array
  // Add additional YouTube video objects here in the future if needed.
  // -------------------------------------------------------------------------
  const propertyVideos = [
    {
      id: "D2yC-GHGojs",
      title: "Property Walkthrough – Chennakesava Nilaya",
      subtitle: "Video Tour of Residential Spaces in Bellandur, Bengaluru",
      description: "A walkthrough of Chennakesava Nilaya (SRK Nivas) showcasing the building exterior, amenities and furnished residential units."
    }
  ];

  // -------------------------------------------------------------------------
  // 2. DOM Elements
  // -------------------------------------------------------------------------
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const videoWrapper = document.getElementById("videoPlayerContainer");
  const videoTitle = document.getElementById("videoTitle");
  const videoSubtitle = document.getElementById("videoSubtitle");

  // -------------------------------------------------------------------------
  // 3. Navbar Scroll Elevation
  // -------------------------------------------------------------------------
  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 24) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // Initial check

  // -------------------------------------------------------------------------
  // 4. Mobile Menu Toggle
  // -------------------------------------------------------------------------
  function toggleMobileMenu(forceClose = false) {
    if (!navMenu || !navToggle) return;

    const isOpen = navMenu.classList.contains("open");
    const shouldOpen = forceClose ? false : !isOpen;

    if (shouldOpen) {
      navMenu.classList.add("open");
      navToggle.setAttribute("aria-expanded", "true");
      navToggle.setAttribute("aria-label", "Close navigation menu");
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation menu");
      document.body.style.overflow = "";
    }
  }

  if (navToggle) {
    navToggle.addEventListener("click", () => toggleMobileMenu());
  }

  // Close mobile menu when clicking any nav link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      toggleMobileMenu(true);
    });
  });

  // Close mobile menu on Escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu && navMenu.classList.contains("open")) {
      toggleMobileMenu(true);
    }
  });

  // -------------------------------------------------------------------------
  // 5. Active Link Highlight via IntersectionObserver
  // -------------------------------------------------------------------------
  const observedSections = document.querySelectorAll("section[id]");

  if ("IntersectionObserver" in window && observedSections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              if (link.getAttribute("href") === `#${id}`) {
                link.classList.add("active");
              } else {
                link.classList.remove("active");
              }
            });
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px"
      }
    );

    observedSections.forEach((sec) => sectionObserver.observe(sec));
  }

  // -------------------------------------------------------------------------
  // 6. YouTube Video Gallery Renderer
  // -------------------------------------------------------------------------
  function initVideoGallery() {
    if (!videoWrapper || propertyVideos.length === 0) return;

    const primaryVideo = propertyVideos[0];

    // Privacy-enhanced YouTube embed URL
    const embedUrl = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(primaryVideo.id)}?rel=0&modestbranding=1`;

    videoWrapper.innerHTML = `
      <iframe 
        src="${embedUrl}" 
        title="${primaryVideo.title}" 
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen>
      </iframe>
    `;

    if (videoTitle) videoTitle.textContent = primaryVideo.title;
    if (videoSubtitle) videoSubtitle.textContent = primaryVideo.subtitle;
  }

  // Run on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initVideoGallery);
  } else {
    initVideoGallery();
  }

})();
