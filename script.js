const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const revealEls = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );

  revealEls.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index * 0.04, 0.24)}s`;
    observer.observe(el);
  });
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

const header = document.querySelector(".site-header");
const heroVisual = document.querySelector(".viz-plane");

if (heroVisual && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener(
    "scroll",
    () => {
      const y = Math.min(window.scrollY, 420);
      heroVisual.style.transform = `translateY(${y * 0.08}px)`;
    },
    { passive: true }
  );
}

if (header) {
  let lastY = 0;
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      header.style.boxShadow =
        y > 8 ? "0 8px 24px rgba(18, 32, 44, 0.06)" : "none";
      lastY = y;
    },
    { passive: true }
  );
}
