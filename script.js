/* =========================================================
   AKSHAT PORTFOLIO — UPDATED SCRIPT.JS
   ---------------------------------------------------------
   Modern Tools:
   - Premium light trails
   - Soft mouse-follow glow
   - Floating particles
   - Subtle grid
   - NO cursor circle
   - NO card scaling
   - NO card dimension changes
   - Animation stays strictly inside the card
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";


  /* =========================================================
     ELEMENTS
  ========================================================= */

  const body = document.body;

  const header =
    document.querySelector(".site-header");

  const scrollProgress =
    document.getElementById("scrollProgress");

  const mobileMenuButton =
    document.getElementById("mobileMenuButton");

  const mobileNav =
    document.getElementById("mobileNav");

  const menuIcon =
    document.getElementById("menuIcon");

  const themeToggle =
    document.getElementById("themeToggle");

  const sections =
    document.querySelectorAll("section[id]");

  const scrollButtons =
    document.querySelectorAll("[data-scroll]");

  const revealElements =
    document.querySelectorAll(".reveal");

  const projectCards =
    document.querySelectorAll(".project-card");

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  /* =========================================================
     SMOOTH SCROLL
  ========================================================= */

  scrollButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const targetId =
        button.getAttribute("data-scroll");

      const target =
        document.getElementById(targetId);

      if (!target) return;

      const headerHeight =
        header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({

        top: targetPosition,

        behavior:
          prefersReducedMotion
            ? "auto"
            : "smooth"

      });

      closeMobileMenu();

    });

  });


  /* =========================================================
     MOBILE MENU
  ========================================================= */

  function openMobileMenu() {

    if (!mobileNav || !mobileMenuButton) {
      return;
    }

    mobileNav.classList.add("is-open");

    mobileMenuButton.setAttribute(
      "aria-expanded",
      "true"
    );

    if (menuIcon) {
      menuIcon.textContent = "×";
    }

    body.classList.add("menu-open");

  }


  function closeMobileMenu() {

    if (!mobileNav || !mobileMenuButton) {
      return;
    }

    mobileNav.classList.remove("is-open");

    mobileMenuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    if (menuIcon) {
      menuIcon.textContent = "☰";
    }

    body.classList.remove("menu-open");

  }


  function toggleMobileMenu() {

    if (!mobileNav) return;

    if (
      mobileNav.classList.contains("is-open")
    ) {

      closeMobileMenu();

    } else {

      openMobileMenu();

    }

  }


  if (mobileMenuButton) {

    mobileMenuButton.addEventListener(
      "click",
      toggleMobileMenu
    );

  }


  document.addEventListener(
    "click",
    (event) => {

      if (
        !mobileNav ||
        !mobileMenuButton
      ) {
        return;
      }

      const clickedInsideMenu =
        mobileNav.contains(event.target);

      const clickedMenuButton =
        mobileMenuButton.contains(event.target);

      if (
        !clickedInsideMenu &&
        !clickedMenuButton
      ) {

        closeMobileMenu();

      }

    }
  );


  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        closeMobileMenu();

      }

    }
  );


  window.addEventListener(
    "resize",
    () => {

      if (window.innerWidth > 900) {

        closeMobileMenu();

      }

    },
    {
      passive: true
    }
  );


  /* =========================================================
     THEME TOGGLE
  ========================================================= */

  if (themeToggle) {

    const savedTheme =
      localStorage.getItem("akshat-theme");

    if (savedTheme === "light") {

      body.classList.add("light-theme");

      themeToggle.setAttribute(
        "aria-pressed",
        "true"
      );

    }


    themeToggle.addEventListener(
      "click",
      () => {

        const isLight =
          body.classList.toggle(
            "light-theme"
          );

        themeToggle.setAttribute(
          "aria-pressed",
          String(isLight)
        );

        localStorage.setItem(
          "akshat-theme",
          isLight
            ? "light"
            : "dark"
        );

      }
    );

  }


  /* =========================================================
     SCROLL PROGRESS
  ========================================================= */

  function updateScrollProgress() {

    if (!scrollProgress) return;

    const scrollTop =
      window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    if (documentHeight <= 0) {

      scrollProgress.style.width = "0%";

      return;

    }

    const progress =
      (scrollTop / documentHeight) * 100;

    scrollProgress.style.width =
      `${Math.min(progress, 100)}%`;

  }


  /* =========================================================
     HEADER SCROLL STATE
  ========================================================= */

  function updateHeader() {

    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 40
    );

  }


  /* =========================================================
     ACTIVE NAVIGATION
  ========================================================= */

  const navButtons =
    document.querySelectorAll(
      ".desktop-nav [data-scroll], .mobile-nav [data-scroll]"
    );


  function updateActiveNavigation() {

    const scrollPosition =
      window.scrollY +
      window.innerHeight * 0.35;

    let currentSection = "home";


    sections.forEach((section) => {

      const sectionTop =
        section.offsetTop;

      if (
        scrollPosition >= sectionTop
      ) {

        currentSection =
          section.getAttribute("id");

      }

    });


    navButtons.forEach((button) => {

      const target =
        button.getAttribute("data-scroll");

      button.classList.toggle(
        "active",
        target === currentSection
      );

    });

  }


  /* =========================================================
     REVEAL ON SCROLL
  ========================================================= */

  if (
    "IntersectionObserver" in window &&
    !prefersReducedMotion
  ) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (
              !entry.isIntersecting
            ) {
              return;
            }

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -50px 0px"
        }
      );


    revealElements.forEach((element) => {

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach((element) => {

      element.classList.add(
        "is-visible"
      );

    });

  }


  /* =========================================================
     PROJECT CARD IMAGE EFFECT
  ========================================================= */

  projectCards.forEach((card) => {

    const image =
      card.querySelector(
        ".project-image"
      );

    if (
      !image ||
      prefersReducedMotion
    ) {
      return;
    }


    card.addEventListener(
      "mouseenter",
      () => {

        image.style.transform =
          "scale(1.04)";

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        image.style.transform =
          "scale(1)";

      }
    );

  });


  /* =========================================================
     PROJECT LINK FEEDBACK
  ========================================================= */

  const projectLinks =
    document.querySelectorAll(
      ".project-link"
    );


  projectLinks.forEach((link) => {

    link.addEventListener(
      "click",
      () => {

        const card =
          link.closest(
            ".project-card"
          );

        if (!card) return;

        card.classList.add(
          "project-selected"
        );


        window.setTimeout(
          () => {

            card.classList.remove(
              "project-selected"
            );

          },
          700
        );

      }
    );

  });


  /* =========================================================
     HERO PARALLAX
  ========================================================= */

  const heroVisual =
    document.querySelector(
      ".hero-visual"
    );

  const ambientGlows =
    document.querySelectorAll(
      ".ambient-glow"
    );


  function updateParallax() {

    if (
      prefersReducedMotion ||
      window.innerWidth < 768
    ) {
      return;
    }


    const scrollY =
      window.scrollY;


    if (heroVisual) {

      const heroOffset =
        Math.min(
          scrollY * 0.08,
          35
        );

      heroVisual.style.transform =
        `translateY(${heroOffset}px)`;

    }


    ambientGlows.forEach(
      (glow, index) => {

        const speed =
          index % 2 === 0
            ? 0.025
            : 0.04;

        glow.style.transform =
          `translate3d(
            0,
            ${scrollY * speed}px,
            0
          )`;

      }
    );

  }


  /* =========================================================
     HERO MOUSE MOVEMENT
  ========================================================= */

  if (
    heroVisual &&
    !prefersReducedMotion
  ) {

    heroVisual.addEventListener(
      "mousemove",
      (event) => {

        if (
          window.innerWidth < 768
        ) {
          return;
        }


        const rect =
          heroVisual.getBoundingClientRect();


        const x =
          (event.clientX -
            rect.left) /
            rect.width -
          0.5;


        const y =
          (event.clientY -
            rect.top) /
            rect.height -
          0.5;


        heroVisual.style.setProperty(
          "--mouse-x",
          `${x * 12}px`
        );


        heroVisual.style.setProperty(
          "--mouse-y",
          `${y * 12}px`
        );

      }
    );


    heroVisual.addEventListener(
      "mouseleave",
      () => {

        heroVisual.style.setProperty(
          "--mouse-x",
          "0px"
        );

        heroVisual.style.setProperty(
          "--mouse-y",
          "0px"
        );

      }
    );

  }


  /* =========================================================
     PROJECT IMAGE SLIDER
  ========================================================= */

 /* =========================================================
     PROJECT IMAGE SLIDER (SYNCED / EK SAATH CHANGE)
  ========================================================= */

  const sliders =
    document.querySelectorAll(
      "[data-slider]"
    );

  if (sliders.length > 0) {
    const slidesList = [];
    const dotsList = [];
    let maxSlides = 0;

    sliders.forEach((slider) => {
      const slides = slider.querySelectorAll(".project-slide");
      const dots = slider.querySelectorAll(".slider-dot");
      
      slidesList.push(slides);
      dotsList.push(dots);

      if (slides.length > maxSlides) {
        maxSlides = slides.length;
      }

      // Manual Next Button
      const nextButton = slider.querySelector(".slider-next");
      if (nextButton) {
        nextButton.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          changeAllSliders(globalIndex + 1);
          restartGlobalAutoplay();
        });
      }

      // Manual Prev Button
      const prevButton = slider.querySelector(".slider-prev");
      if (prevButton) {
        prevButton.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          changeAllSliders(globalIndex - 1);
          restartGlobalAutoplay();
        });
      }

      // Manual Dot Click
      dots.forEach((dot, index) => {
        dot.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          changeAllSliders(index);
          restartGlobalAutoplay();
        });
      });
    });

    let globalIndex = 0;
    let globalAutoplayTimer = null;
    const interval = 4500; // Har 4.5 seconds mein ek saath change honge

    function changeAllSliders(targetIndex) {
      if (targetIndex >= maxSlides) {
        globalIndex = 0;
      } else if (targetIndex < 0) {
        globalIndex = maxSlides - 1;
      } else {
        globalIndex = targetIndex;
      }

      sliders.forEach((slider, sliderIdx) => {
        const slides = slidesList[sliderIdx];
        const dots = dotsList[sliderIdx];

        if (!slides.length) return;

        // Agar kisi slider mein kam slides hain toh usko module index par set karein
        const actualIndex = globalIndex % slides.length;

        slides.forEach((slide, i) => {
          slide.classList.toggle("active", i === actualIndex);
        });

        dots.forEach((dot, i) => {
          const active = i === actualIndex;
          dot.classList.toggle("active", active);
          dot.setAttribute("aria-current", active ? "true" : "false");
        });
      });
    }

    function startGlobalAutoplay() {
      if (prefersReducedMotion) return;
      stopGlobalAutoplay();
      
      globalAutoplayTimer = window.setInterval(() => {
        if (document.hidden) return;
        changeAllSliders(globalIndex + 1);
      }, interval);
    }

    function stopGlobalAutoplay() {
      if (globalAutoplayTimer) {
        window.clearInterval(globalAutoplayTimer);
        globalAutoplayTimer = null;
      }
    }

    function restartGlobalAutoplay() {
      stopGlobalAutoplay();
      startGlobalAutoplay();
    }

    // Hover karne par autoplay rokne ke liye
    sliders.forEach((slider) => {
      slider.addEventListener("mouseenter", stopGlobalAutoplay);
      slider.addEventListener("mouseleave", startGlobalAutoplay);
    });

    // Pehli slide load karein aur autoplay start karein
    changeAllSliders(0);
    startGlobalAutoplay();
  }
  /* =========================================================
     SLIDER VISIBILITY
  ========================================================= */

  document.addEventListener(
    "visibilitychange",
    () => {

      document
        .querySelectorAll(
          "[data-slider]"
        )
        .forEach((slider) => {

          if (
            document.hidden
          ) {

            slider.dispatchEvent(
              new Event("mouseenter")
            );

          } else {

            slider.dispatchEvent(
              new Event("mouseleave")
            );

          }

        });

    }
  );


  /* =========================================================
     =========================================================
     MODERN TOOLS — PREMIUM INTERNAL ANIMATION
     =========================================================

     Visual system:

     1. Subtle grid
     2. Soft ambient glow
     3. Flowing light trails
     4. Tiny particles
     5. Mouse-responsive movement

     Removed completely:

     - Cursor circle
     - Cursor dot
     - Orbit circle
     - Card scale
     - Card transform
     - Card dimension changes

     Everything is clipped inside the card.
     ========================================================= */

  const skillCards =
    document.querySelectorAll(
      ".skills-interactive"
    );


  skillCards.forEach((card) => {

    if (prefersReducedMotion) {
      return;
    }


    /* -------------------------------------------------------
       CARD INTERNAL SETUP

       We do NOT modify:
       width
       height
       margin
       padding
       scale
       transform
       ------------------------------------------------------- */

    const computedStyle =
      window.getComputedStyle(card);


    if (
      computedStyle.position ===
      "static"
    ) {

      card.style.position =
        "relative";

    }


    /*
       Keep animation clipped.
    */

    card.style.overflow =
      "hidden";


    /*
       Preserve vertical scrolling
       on touch devices.
    */

    card.style.touchAction =
      "pan-y";


    /* -------------------------------------------------------
       CANVAS
    ------------------------------------------------------- */

    let canvas =
      card.querySelector(
        ".skills-canvas"
      );


    if (!canvas) {

      canvas =
        document.createElement(
          "canvas"
        );

      canvas.className =
        "skills-canvas";

      canvas.setAttribute(
        "aria-hidden",
        "true"
      );

      card.prepend(canvas);

    }


    /*
       Canvas occupies exactly
       the existing card area.
    */

    Object.assign(
      canvas.style,
      {
        position: "absolute",
        inset: "0",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: "0",
        display: "block"
      }
    );


    /* -------------------------------------------------------
       CONTENT ABOVE CANVAS
    ------------------------------------------------------- */

    const content =
      card.querySelector(
        ".skills-panel-content"
      );


    if (content) {

      content.style.position =
        "relative";

      content.style.zIndex =
        "3";

    }


    /*
       Existing glow layers should
       stay behind the content.
    */

    card
      .querySelectorAll(
        ".skills-glow, .skills-glow-secondary, .skills-particles"
      )
      .forEach((layer) => {

        layer.style.pointerEvents =
          "none";

      });


    /* -------------------------------------------------------
       CANVAS CONTEXT
    ------------------------------------------------------- */

    const ctx =
      canvas.getContext(
        "2d"
      );


    if (!ctx) return;


    /* -------------------------------------------------------
       STATE
    ------------------------------------------------------- */

    let width = 1;

    let height = 1;

    let dpr = 1;

    let mouseX = 0;

    let mouseY = 0;

    let targetX = 0;

    let targetY = 0;

    let isInside = false;

    let animationFrame = null;

    let resizeObserver = null;

    let lastPointerTime = 0;

    let lastFrameTime = 0;

    let trailSpawnTimer = 0;


    /* -------------------------------------------------------
       PARTICLES
    ------------------------------------------------------- */

    const particles = [];

    const MAX_PARTICLES = 75;


    /* -------------------------------------------------------
       LIGHT TRAILS
    ------------------------------------------------------- */

    const trails = [];

    const MAX_TRAILS = 4;


    /* -------------------------------------------------------
       RESIZE CANVAS
    ------------------------------------------------------- */

    function resizeCanvas() {

      const rect =
        card.getBoundingClientRect();


      if (
        rect.width <= 0 ||
        rect.height <= 0
      ) {
        return;
      }


      width =
        Math.max(
          1,
          rect.width
        );


      height =
        Math.max(
          1,
          rect.height
        );


      dpr =
        Math.min(
          window.devicePixelRatio || 1,
          2
        );


      canvas.width =
        Math.round(
          width * dpr
        );


      canvas.height =
        Math.round(
          height * dpr
        );


      canvas.style.width =
        "100%";


      canvas.style.height =
        "100%";


      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

    }


    resizeCanvas();


    /* -------------------------------------------------------
       RESIZE OBSERVER
    ------------------------------------------------------- */

    if (
      "ResizeObserver" in window
    ) {

      resizeObserver =
        new ResizeObserver(
          resizeCanvas
        );

      resizeObserver.observe(
        card
      );

    } else {

      window.addEventListener(
        "resize",
        resizeCanvas,
        {
          passive: true
        }
      );

    }


    /* -------------------------------------------------------
       POINTER UPDATE
    ------------------------------------------------------- */

    function updatePointer(
      clientX,
      clientY
    ) {

      const rect =
        card.getBoundingClientRect();


      targetX =
        clientX -
        rect.left;


      targetY =
        clientY -
        rect.top;


      targetX =
        Math.max(
          0,
          Math.min(
            width,
            targetX
          )
        );


      targetY =
        Math.max(
          0,
          Math.min(
            height,
            targetY
          )
        );


      isInside = true;


      /*
         Avoid excessive particle
         generation.
      */

      const now =
        performance.now();


      if (
        now -
        lastPointerTime <
        28
      ) {

        return;

      }


      lastPointerTime =
        now;


      /*
         Small particles emitted
         around the pointer.
      */

      for (
        let i = 0;
        i < 2;
        i++
      ) {

        if (
          particles.length >=
          MAX_PARTICLES
        ) {
          break;
        }


        const angle =
          Math.random() *
          Math.PI *
          2;


        const speed =
          Math.random() *
            0.55 +
          0.15;


        particles.push({

          x: targetX,

          y: targetY,

          vx:
            Math.cos(angle) *
            speed,

          vy:
            Math.sin(angle) *
            speed,

          size:
            Math.random() *
              1.4 +
            0.45,

          life: 1,

          decay:
            Math.random() *
              0.018 +
            0.012,

          hue:
            Math.random() >
            0.5
              ? 190
              : 265

        });

      }

    }


    /* -------------------------------------------------------
       POINTER MOVE
    ------------------------------------------------------- */

    card.addEventListener(
      "pointermove",
      (event) => {

        updatePointer(
          event.clientX,
          event.clientY
        );

      },
      {
        passive: true
      }
    );


    /* -------------------------------------------------------
       POINTER ENTER
    ------------------------------------------------------- */

    card.addEventListener(
      "pointerenter",
      (event) => {

        updatePointer(
          event.clientX,
          event.clientY
        );

      },
      {
        passive: true
      }
    );


    /* -------------------------------------------------------
       POINTER LEAVE
    ------------------------------------------------------- */

    card.addEventListener(
      "pointerleave",
      () => {

        isInside = false;

      },
      {
        passive: true
      }
    );


    /* -------------------------------------------------------
       TOUCH SUPPORT
    ------------------------------------------------------- */

    card.addEventListener(
      "touchmove",
      (event) => {

        const touch =
          event.touches[0];

        if (!touch) return;

        updatePointer(
          touch.clientX,
          touch.clientY
        );

      },
      {
        passive: true
      }
    );


    /* =======================================================
       GRID
    ======================================================= */

    function drawGrid() {

      const gridSize = 46;

      const opacity = 0.035;


      ctx.save();

      ctx.lineWidth = 1;

      ctx.strokeStyle =
        `rgba(
          130,
          190,
          255,
          ${opacity}
        )`;


      for (
        let x = 0;
        x <= width;
        x += gridSize
      ) {

        ctx.beginPath();

        ctx.moveTo(
          x,
          0
        );

        ctx.lineTo(
          x,
          height
        );

        ctx.stroke();

      }


      for (
        let y = 0;
        y <= height;
        y += gridSize
      ) {

        ctx.beginPath();

        ctx.moveTo(
          0,
          y
        );

        ctx.lineTo(
          width,
          y
        );

        ctx.stroke();

      }


      ctx.restore();

    }


    /* =======================================================
       AMBIENT MOUSE GLOW
    ======================================================= */

    function drawMainGlow() {

      if (!isInside) return;


      const radius =
        Math.min(
          240,
          Math.max(
            170,
            width * 0.38
          )
        );


      const gradient =
        ctx.createRadialGradient(
          mouseX,
          mouseY,
          0,
          mouseX,
          mouseY,
          radius
        );


      gradient.addColorStop(
        0,
        "rgba(50, 210, 255, 0.13)"
      );


      gradient.addColorStop(
        0.28,
        "rgba(80, 130, 255, 0.075)"
      );


      gradient.addColorStop(
        0.55,
        "rgba(150, 70, 255, 0.04)"
      );


      gradient.addColorStop(
        1,
        "rgba(0, 0, 0, 0)"
      );


      ctx.save();

      ctx.fillStyle =
        gradient;


      ctx.fillRect(
        0,
        0,
        width,
        height
      );


      ctx.restore();

    }


    /* =======================================================
       CREATE LIGHT TRAIL
    ======================================================= */

    function createTrail() {

      if (!isInside) return;

      if (
        trails.length >=
        MAX_TRAILS
      ) {

        trails.shift();

      }


      trails.push({

        x: mouseX,

        y: mouseY,

        previousX: mouseX,

        previousY: mouseY,

        life: 1,

        width:
          Math.random() *
            1.8 +
          1.2,

        hue:
          Math.random() >
          0.5
            ? 190
            : 265

      });

    }


    /* =======================================================
       DRAW LIGHT TRAILS
    ======================================================= */

    function drawTrails() {

      for (
        let i =
          trails.length - 1;
        i >= 0;
        i--
      ) {

        const trail =
          trails[i];


        trail.previousX +=
          (trail.x -
            trail.previousX) *
          0.15;


        trail.previousY +=
          (trail.y -
            trail.previousY) *
          0.15;


        trail.x +=
          (mouseX -
            trail.x) *
          0.08;


        trail.y +=
          (mouseY -
            trail.y) *
          0.08;


        trail.life -=
          0.012;


        if (
          trail.life <= 0
        ) {

          trails.splice(
            i,
            1
          );

          continue;

        }


        /*
           Gradient-like stroke.
        */

        const gradient =
          ctx.createLinearGradient(
            trail.previousX,
            trail.previousY,
            trail.x,
            trail.y
          );


        gradient.addColorStop(
          0,
          `hsla(
            ${trail.hue},
            100%,
            70%,
            0
          )`
        );


        gradient.addColorStop(
          0.5,
          `hsla(
            ${trail.hue},
            100%,
            70%,
            ${trail.life * 0.24}
          )`
        );


        gradient.addColorStop(
          1,
          `hsla(
            ${trail.hue},
            100%,
            80%,
            ${trail.life * 0.65}
          )`
        );


        ctx.save();

        ctx.beginPath();

        ctx.moveTo(
          trail.previousX,
          trail.previousY
        );

        ctx.lineTo(
          trail.x,
          trail.y
        );

        ctx.strokeStyle =
          gradient;

        ctx.lineWidth =
          trail.width;

        ctx.lineCap =
          "round";

        ctx.shadowBlur = 12;

        ctx.shadowColor =
          `hsla(
            ${trail.hue},
            100%,
            65%,
            0.3
          )`;

        ctx.stroke();

        ctx.restore();

      }

    }


    /* =======================================================
       DRAW PARTICLES
    ======================================================= */

    function drawParticles() {

      for (
        let i =
          particles.length - 1;
        i >= 0;
        i--
      ) {

        const particle =
          particles[i];


        particle.x +=
          particle.vx;


        particle.y +=
          particle.vy;


        particle.vx *=
          0.985;


        particle.vy *=
          0.985;


        particle.life -=
          particle.decay;


        particle.size *=
          0.994;


        if (
          particle.life <= 0 ||
          particle.size <= 0.2
        ) {

          particles.splice(
            i,
            1
          );

          continue;

        }


        if (
          particle.x < 0 ||
          particle.x > width ||
          particle.y < 0 ||
          particle.y > height
        ) {

          particles.splice(
            i,
            1
          );

          continue;

        }


        ctx.save();

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI * 2
        );


        ctx.fillStyle =
          `hsla(
            ${particle.hue},
            100%,
            75%,
            ${particle.life * 0.72}
          )`;


        ctx.shadowBlur = 8;

        ctx.shadowColor =
          `hsla(
            ${particle.hue},
            100%,
            70%,
            0.35
          )`;


        ctx.fill();

        ctx.restore();

      }

    }


    /* =======================================================
       SUBTLE FLOATING DUST
    ======================================================= */

    const dustParticles = [];

    const DUST_COUNT = 22;


    function createDust() {

      dustParticles.length = 0;


      for (
        let i = 0;
        i < DUST_COUNT;
        i++
      ) {

        dustParticles.push({

          x:
            Math.random() *
            width,

          y:
            Math.random() *
            height,

          size:
            Math.random() *
              1.2 +
            0.3,

          speed:
            Math.random() *
              0.12 +
            0.03,

          phase:
            Math.random() *
            Math.PI *
            2,

          opacity:
            Math.random() *
              0.25 +
            0.08

        });

      }

    }


    createDust();


    function drawDust(time) {

      for (
        let i = 0;
        i < dustParticles.length;
        i++
      ) {

        const dust =
          dustParticles[i];


        const floatX =
          Math.sin(
            time * 0.0004 +
            dust.phase
          ) *
          10;


        const floatY =
          Math.cos(
            time * 0.0003 +
            dust.phase
          ) *
          8;


        const x =
          dust.x +
          floatX;


        const y =
          dust.y +
          floatY -
          time *
            dust.speed *
            0.001;


        const wrappedY =
          ((y % height) +
            height) %
          height;


        ctx.beginPath();

        ctx.arc(
          x,
          wrappedY,
          dust.size,
          0,
          Math.PI * 2
        );


        ctx.fillStyle =
          `rgba(
            190,
            220,
            255,
            ${dust.opacity}
          )`;


        ctx.fill();

      }

    }


    /* =======================================================
       EDGE LIGHT
    ======================================================= */

    function drawEdgeLight(time) {

      const pulse =
        Math.sin(
          time * 0.0012
        ) *
        0.5 +
        0.5;


      const edgeGradient =
        ctx.createLinearGradient(
          0,
          0,
          width,
          height
        );


      edgeGradient.addColorStop(
        0,
        `rgba(
          70,
          210,
          255,
          ${0.025 + pulse * 0.025}
        )`
      );


      edgeGradient.addColorStop(
        0.5,
        "rgba(0,0,0,0)"
      );


      edgeGradient.addColorStop(
        1,
        `rgba(
          150,
          80,
          255,
          ${0.025 + pulse * 0.02}
        )`
      );


      ctx.save();

      ctx.strokeStyle =
        edgeGradient;

      ctx.lineWidth = 1;

      ctx.strokeRect(
        0.5,
        0.5,
        width - 1,
        height - 1
      );

      ctx.restore();

    }


    /* =======================================================
       ANIMATION LOOP
    ======================================================= */

    function animate(time) {

      /*
         Frame delta prevents
         animation from becoming too
         fast on high-refresh displays.
      */

      const delta =
        Math.min(
          32,
          time -
            lastFrameTime
        );


      lastFrameTime =
        time;


      /*
         Smooth pointer.
      */

      mouseX +=
        (targetX -
          mouseX) *
        0.085;


      mouseY +=
        (targetY -
          mouseY) *
        0.085;


      /*
         Clear ONLY the canvas.
      */

      ctx.clearRect(
        0,
        0,
        width,
        height
      );


      /* Background */

      drawGrid();

      drawDust(time);

      drawMainGlow();


      /* Pointer trails */

      if (isInside) {

        trailSpawnTimer +=
          delta;


        if (
          trailSpawnTimer >
          90
        ) {

          createTrail();

          trailSpawnTimer = 0;

        }

      }


      drawTrails();

      drawParticles();

      drawEdgeLight(time);


      animationFrame =
        requestAnimationFrame(
          animate
        );

    }


    /* =======================================================
       START ANIMATION
    ======================================================= */

    animationFrame =
      requestAnimationFrame(
        animate
      );


    /* =======================================================
       INTERSECTION OBSERVER
    ======================================================= */

    if (
      "IntersectionObserver" in window
    ) {

      const visibilityObserver =
        new IntersectionObserver(
          (entries) => {

            entries.forEach(
              (entry) => {

                if (
                  !entry.isIntersecting
                ) {

                  particles.length =
                    0;

                  trails.length =
                    0;

                }

              }
            );

          },
          {
            threshold: 0
          }
        );


      visibilityObserver.observe(
        card
      );

    }


    /* =======================================================
       REBUILD DUST ON RESIZE
    ======================================================= */

    if (
      resizeObserver
    ) {

      const originalResize =
        resizeCanvas;

      /*
         ResizeObserver already
         handles the card dimensions.
         Dust is refreshed with a
         lightweight delayed call.
      */

      resizeObserver =
        new ResizeObserver(
          () => {

            originalResize();

            createDust();

          }
        );


      resizeObserver.observe(
        card
      );

    }


  });


  /* =========================================================
     SCROLL HANDLER
  ========================================================= */

  let ticking = false;


  function handleScroll() {

    if (ticking) return;


    window.requestAnimationFrame(
      () => {

        updateScrollProgress();

        updateHeader();

        updateActiveNavigation();

        updateParallax();

        ticking = false;

      }
    );


    ticking = true;

  }


  window.addEventListener(
    "scroll",
    handleScroll,
    {
      passive: true
    }
  );


  /* =========================================================
     INITIAL STATE
  ========================================================= */

  updateScrollProgress();

  updateHeader();

  updateActiveNavigation();


  /* =========================================================
     HERO LOAD
  ========================================================= */

  window.addEventListener(
    "load",
    () => {

      body.classList.add(
        "page-loaded"
      );

    }
  );


  /* =========================================================
     IMAGE LOADING
  ========================================================= */

  const images =
    document.querySelectorAll(
      "img"
    );


  images.forEach((image) => {

    if (image.complete) {

      image.classList.add(
        "image-loaded"
      );

      return;

    }


    image.addEventListener(
      "load",
      () => {

        image.classList.add(
          "image-loaded"
        );

      }
    );


    image.addEventListener(
      "error",
      () => {

        image.classList.add(
          "image-error"
        );

      }
    );

  });


  /* =========================================================
     EMAIL FEEDBACK
  ========================================================= */

  const emailLinks =
    document.querySelectorAll(
      'a[href^="mailto:"]'
    );


  emailLinks.forEach((link) => {

    link.addEventListener(
      "click",
      () => {

        link.classList.add(
          "email-clicked"
        );


        window.setTimeout(
          () => {

            link.classList.remove(
              "email-clicked"
            );

          },
          500
        );

      }
    );

  });


  /* =========================================================
     CURRENT YEAR
  ========================================================= */

  const yearElements =
    document.querySelectorAll(
      "[data-current-year]"
    );


  yearElements.forEach(
    (element) => {

      element.textContent =
        new Date().getFullYear();

    }
  );


  /* =========================================================
     CONSOLE
  ========================================================= */

  console.log(
    "%c AKSHAT ",
    "background:#111;color:#fff;padding:8px 14px;font-size:16px;font-weight:bold;border-radius:6px;"
  );


  console.log(
    "%cFrontend Developer · Creative Technologist",
    "color:#777;font-size:12px;"
  );

});
/* =========================================================
   MOBILE MENU — DAY/LIGHT MODE + AUTO CLOSE
   ========================================================= */

const mobileMenuButton =
  document.getElementById("mobileMenuButton");

const mobileNav =
  document.getElementById("mobileNav");

const body =
  document.body;


if (mobileMenuButton && mobileNav) {

  const menuLines =
    mobileMenuButton.querySelectorAll(".menu-lines i");


  /* ---------------------------------------------------------
     OPEN MENU
  --------------------------------------------------------- */

  function openMobileMenu() {

    mobileMenuButton.classList.add("active");

    mobileNav.classList.add("active");

    mobileMenuButton.setAttribute(
      "aria-expanded",
      "true"
    );

    mobileNav.setAttribute(
      "aria-hidden",
      "false"
    );

    body.classList.add("menu-open");

  }


  /* ---------------------------------------------------------
     CLOSE MENU
  --------------------------------------------------------- */

  function closeMobileMenu() {

    mobileMenuButton.classList.remove("active");

    mobileNav.classList.remove("active");

    mobileMenuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    mobileNav.setAttribute(
      "aria-hidden",
      "true"
    );

    body.classList.remove("menu-open");

  }


  /* ---------------------------------------------------------
     TOGGLE
  --------------------------------------------------------- */

  mobileMenuButton.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      const isOpen =
        mobileNav.classList.contains("active");


      if (isOpen) {

        closeMobileMenu();

      } else {

        openMobileMenu();

      }

    }
  );


  /* ---------------------------------------------------------
     CLOSE AFTER SELECTING ANY OPTION
  --------------------------------------------------------- */

  mobileNav
    .querySelectorAll("[data-scroll]")
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          closeMobileMenu();

        }
      );

    });


  /* ---------------------------------------------------------
     CLOSE WHEN CLICKING OUTSIDE
  --------------------------------------------------------- */

  document.addEventListener(
    "click",
    (event) => {

      if (
        mobileNav.classList.contains("active") &&
        !mobileNav.contains(event.target) &&
        !mobileMenuButton.contains(event.target)
      ) {

        closeMobileMenu();

      }

    }
  );


  /* ---------------------------------------------------------
     ESCAPE KEY
  --------------------------------------------------------- */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        mobileNav.classList.contains("active")
      ) {

        closeMobileMenu();

      }

    }
  );


  /* ---------------------------------------------------------
     DESKTOP PAR JATE HI CLOSE
  --------------------------------------------------------- */

  window.addEventListener(
    "resize",
    () => {

      if (window.innerWidth > 900) {

        closeMobileMenu();

      }

    }
  );


  /* ---------------------------------------------------------
     HAMBURGER → CROSS ANIMATION
  --------------------------------------------------------- */

  function updateMenuIcon() {

    const isOpen =
      mobileMenuButton.classList.contains("active");


    if (!menuLines.length) {
      return;
    }


    if (isOpen) {

      menuLines[0].style.transform =
        "translateY(6px) rotate(45deg)";

      menuLines[1].style.opacity =
        "0";

      menuLines[2].style.transform =
        "translateY(-6px) rotate(-45deg)";

    } else {

      menuLines.forEach((line) => {

        line.style.transform =
          "none";

        line.style.opacity =
          "1";

      });

    }

  }


  const menuObserver =
    new MutationObserver(
      updateMenuIcon
    );


  menuObserver.observe(
    mobileMenuButton,
    {
      attributes: true,
      attributeFilter: ["class"]
    }
  );


  updateMenuIcon();

}
/* =========================================================
   PROJECT DETAILS POPUP MODAL
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const modalTriggers = document.querySelectorAll(".open-modal-btn");
  const modals = document.querySelectorAll(".project-modal");

  modalTriggers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-modal");
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add("active");
        targetModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // Background scrolling lock
      }
    });
  });

  modals.forEach((modal) => {
    const closeBtn = modal.querySelector(".modal-close");
    const backdrop = modal.querySelector(".modal-backdrop");
    const closeLinks = modal.querySelectorAll(".modal-close-link");

    function closeModal() {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (backdrop) backdrop.addEventListener("click", closeModal);
    
    closeLinks.forEach((link) => {
      link.addEventListener("click", closeModal);
    });

    // Escape key press to close modal
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    });
  });
});

/* ==========================================
   PREMIUM FREELANCE CONTACT FORM
========================================== */

const freelanceForm = document.getElementById(
    "freelance-contact-form"
);

if (freelanceForm) {

    freelanceForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!freelanceForm.checkValidity()) {
            freelanceForm.reportValidity();
            return;
        }

        const formData = new FormData(freelanceForm);

        const name = formData.get("Full Name").trim();
        const phone = formData.get("Phone Number").trim();
        const email = formData.get("Email Address").trim();
        const service = formData.get("Interested In");
        const details = (
            formData.get("Project Details") || "Not provided"
        ).trim();

        /* Email Subject */
        const subject = `New Project Enquiry | ${service} | ${name}`;

        /* Professional Email Body */
        const body = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        NEW PROJECT ENQUIRY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hello Akshat,

You have received a new project enquiry
through your portfolio website.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLIENT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Full Name:
${name}

Email Address:
${email}

Phone Number:
${phone}


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Interested Service:
${service}

Project Requirements:
${details}


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEXT STEPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This client is interested in discussing
a potential project with you.

You can contact the client directly
using the email address or phone number
provided above.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PORTFOLIO ENQUIRY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sent through your personal portfolio.

Best regards,
${name}
        `.trim();

        /* Open Email Application */
        const mailtoLink =
            "mailto:akshaetshukla.dev@gmail.com" +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(body);

        window.location.href = mailtoLink;

    });

}

// Dynamic copyright year
const footerYear = document.getElementById("lc-footer-year");

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}


// Smooth back to top
const footerBackTop = document.getElementById("lc-footer-back-top");

if (footerBackTop) {
    footerBackTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}