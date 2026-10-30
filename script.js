/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle?.addEventListener("click", () => {
  if (!nav) return;

  const isOpen = nav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
  });
});


/* =========================================
   SCROLL PROGRESS
========================================= */

const progress = document.getElementById("progress");

function updateProgress() {
  if (!progress) return;

  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  const percentage =
    maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;

  progress.style.width = `${percentage}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();


/* =========================================
   REVEAL ANIMATIONS
========================================= */

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;
        const parent = element.parentElement;

        const siblings = parent
          ? [...parent.querySelectorAll(".reveal")]
          : [];

        const index = Math.max(0, siblings.indexOf(element));

        element.style.transitionDelay =
          `${Math.min(index * 70, 350)}ms`;

        element.classList.add("is-visible");
        observer.unobserve(element);
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((element) => revealObserver.observe(element));
} else {
  revealItems.forEach((element) => {
    element.classList.add("is-visible");
  });
}


/* =========================================
   HERO VIDEO
========================================= */

const video = document.getElementById("heroVideo");
const soundToggle = document.getElementById("soundToggle");

function updateSoundButton() {
  if (!video || !soundToggle) return;

  const muted = video.muted || video.volume === 0;

  soundToggle.textContent = muted ? "♪" : "♫";

  soundToggle.setAttribute(
    "aria-label",
    muted ? "Turn sound on" : "Mute video"
  );

  soundToggle.title = muted ? "Turn sound on" : "Mute video";
}

if (video) {
  // Start muted for browser compatibility.
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;

  // Play only when at least 50% of the video is visible.
  if ("IntersectionObserver" in window) {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((error) => {
              console.warn("Video playback was blocked:", error);
            });
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.5
      }
    );

    videoObserver.observe(video);
  } else {
    video.pause();
  }

  video.addEventListener("volumechange", updateSoundButton);

  // Sound toggle button.
  soundToggle?.addEventListener("click", async () => {
    try {
      if (video.paused) {
        await video.play();
      }

      video.muted = !video.muted;

      if (!video.muted) {
        video.volume = 1;
      }

      updateSoundButton();
    } catch (error) {
      console.error("Video playback failed:", error);
    }
  });

  updateSoundButton();
}


/* =========================================
   COPY EMAIL
========================================= */

const copyEmail = document.getElementById("copyEmail");
const emailStatus = document.getElementById("emailStatus");

copyEmail?.addEventListener("click", async () => {
  const email = "shenjamdev@gmail.com";

  try {
    await navigator.clipboard.writeText(email);

    if (emailStatus) {
      emailStatus.textContent = `Email address copied: ${email}`;
    }
  } catch {
    if (emailStatus) {
      emailStatus.textContent =
        `Email: ${email} — select and copy this address.`;
    }
  }
});


/* =========================================
   SCROLL TO TOP
========================================= */

const scrollTopButton = document.getElementById("scrollTop");

function updateScrollTop() {
  scrollTopButton?.classList.toggle(
    "visible",
    window.scrollY > 480
  );
}

window.addEventListener("scroll", updateScrollTop, { passive: true });
updateScrollTop();

scrollTopButton?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


/* =========================================
   DESKTOP CURSOR GLOW
========================================= */

const cursorGlow = document.querySelector(".cursor-glow");

if (
  cursorGlow &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches
) {
  window.addEventListener(
    "pointermove",
    (event) => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    },
    { passive: true }
  );
}