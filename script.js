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
const heroBloom = document.querySelector(".hero-bloom");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (heroBloom && !reduceMotion) {
  window.addEventListener(
    "scroll",
    () => {
      const y = Math.min(window.scrollY, 420);
      heroBloom.style.transform = `translate3d(0, ${y * 0.06}px, 0) scale(1)`;
    },
    { passive: true }
  );
}

if (header) {
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      header.style.boxShadow =
        y > 8 ? "0 10px 28px rgba(63, 106, 87, 0.08)" : "none";
    },
    { passive: true }
  );
}
