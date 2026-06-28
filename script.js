const tiltStage = document.querySelector('[data-tilt]');
const shell = tiltStage?.querySelector('.ipad-shell');

if (tiltStage && shell && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  tiltStage.addEventListener('pointermove', (event) => {
    const rect = tiltStage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    shell.style.transform = `rotateX(${5 - y * 2.4}deg) rotateY(${x * 3.4}deg) translateY(-3px)`;
  });

  tiltStage.addEventListener('pointerleave', () => {
    shell.style.transform = '';
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
