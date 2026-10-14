/**
 * Academic Stats & Percentage Counter Animation
 * Eases numbers from 0 to target value upon entering viewport
 */

document.addEventListener('DOMContentLoaded', () => {
  const counterElements = document.querySelectorAll('[data-counter]');

  if (!counterElements.length) return;

  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-counter'));
    const duration = 1800; // milliseconds
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let currentFrame = 0;

    const easeOutQuad = (t) => t * (2 - t);

    const update = () => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const easedProgress = easeOutQuad(progress);
      const currentVal = Math.round(easedProgress * target);

      el.textContent = currentVal;

      if (currentFrame < totalFrames) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  counterElements.forEach((el) => observer.observe(el));
});
