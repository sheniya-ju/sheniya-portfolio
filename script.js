const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const progress = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}, { passive: true });

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const video = document.getElementById('heroVideo');
const placeholder = document.getElementById('videoPlaceholder');
const soundToggle = document.getElementById('soundToggle');
if (video) {
  video.addEventListener('loadeddata', () => { placeholder.style.display = 'none'; });
  video.addEventListener('error', () => { placeholder.style.display = 'flex'; });
}
soundToggle?.addEventListener('click', () => {
  if (!video || !video.querySelector('source') || !video.currentSrc) return;
  video.muted = !video.muted;
  soundToggle.textContent = video.muted ? '♪' : 'Ⅱ';
  soundToggle.setAttribute('aria-label', video.muted ? 'Turn sound on' : 'Mute video');
});


const copyEmail = document.getElementById('copyEmail');
const emailStatus = document.getElementById('emailStatus');
copyEmail?.addEventListener('click', async () => {
  const email = 'shenjamdev@gmail.com';
  try {
    await navigator.clipboard.writeText(email);
    if (emailStatus) emailStatus.textContent = 'Email address copied: ' + email;
  } catch {
    if (emailStatus) emailStatus.textContent = 'Email: ' + email + ' — select and copy this address.';
  }
});


/* Motion polish: back-to-top, pointer glow, and staggered reveal */
const scrollTopButton = document.getElementById('scrollTop');
const cursorGlow = document.querySelector('.cursor-glow');

const updateScrollTop = () => {
  if (scrollTopButton) scrollTopButton.classList.toggle('visible', window.scrollY > 480);
};
window.addEventListener('scroll', updateScrollTop, { passive: true });
updateScrollTop();
scrollTopButton?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

if (cursorGlow && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  window.addEventListener('pointermove', (event) => {
    cursorGlow.style.left = event.clientX + 'px';
    cursorGlow.style.top = event.clientY + 'px';
  }, { passive: true });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealItems.length) {
  const staggerObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = entry.target.parentElement ? [...entry.target.parentElement.querySelectorAll('.reveal')] : [];
        const index = Math.max(0, siblings.indexOf(entry.target));
        entry.target.style.transitionDelay = Math.min(index * 70, 350) + 'ms';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => staggerObserver.observe(item));
}
