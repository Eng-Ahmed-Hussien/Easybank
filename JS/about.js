// Slider Module
const Slider = (() => {
  let currentSlideIndex = 0;
  let slides = [];
  let dots = [];
  let autoSlideInterval;
  let sliderContainer;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");
  }

  function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
  }

  function changeSlide(direction) {
    currentSlideIndex =
      (currentSlideIndex + direction + slides.length) % slides.length;
    showSlide(currentSlideIndex);
    resetAutoSlide();
  }

  function goToSlide(index) {
    currentSlideIndex = index;
    showSlide(currentSlideIndex);
    resetAutoSlide();
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  function handleMouseEnter() {
    clearInterval(autoSlideInterval);
  }

  function init() {
    slides = document.querySelectorAll(".slide");
    dots = document.querySelectorAll(".dot");
    sliderContainer = document.querySelector(".slider-container");

    if (slides.length > 0 && dots.length > 0 && sliderContainer) {
      startAutoSlide();

      sliderContainer.addEventListener("mouseenter", handleMouseEnter);
      sliderContainer.addEventListener("mouseleave", startAutoSlide);
      }
      document.addEventListener("click", (e) => {
        if (e.target.closest(".prev")) Slider.changeSlide(-1);
        if (e.target.closest(".next")) Slider.changeSlide(1);

        const dot = e.target.closest(".dot");
        if (dot) {
          const index = [...dots].indexOf(dot);
          Slider.goToSlide(index);
        }
      });
  }

  // Public API
  return {
    init,
    nextSlide,
    changeSlide,
    goToSlide,
  };
})();

// Stats Animation Module
const StatsAnimation = (() => {
  let observer;
  let statsSection;
  const animationTimers = new Map();

  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  };

  function animateNumber(element) {
    const target = parseFloat(element.dataset.target);
    const suffix = element.dataset.suffix || "";
    const duration = 2000;
    const startTime = performance.now();

    if (animationTimers.has(element)) {
      cancelAnimationFrame(animationTimers.get(element));
    }

    const frame = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = progress * target;

      let displayValue;
      if (target >= 1e6) displayValue = `${(current / 1e6).toFixed(1)}M`;
      else if (target >= 1e3) displayValue = `${Math.round(current / 1e3)}K`;
      else if (target % 1 !== 0) displayValue = current.toFixed(1);
      else displayValue = Math.floor(current);

      element.textContent = displayValue + suffix;

      if (progress < 1) {
        animationTimers.set(element, requestAnimationFrame(frame));
      } else {
        animationTimers.delete(element);
      }
    };

    animationTimers.set(element, requestAnimationFrame(frame));
  }

  function resetStatItem(item) {
    const numElement = item.querySelector("h3");
    item.classList.remove("animate");

    if (animationTimers.has(numElement)) {
      cancelAnimationFrame(animationTimers.get(numElement));
      animationTimers.delete(numElement);
    }

    numElement.textContent = "0";
  }

  function handleIntersection(entries) {
    entries.forEach((entry) => {
      const statItems = entry.target.querySelectorAll(".stat-item");

      if (entry.isIntersecting) {
        statItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("animate");
            animateNumber(item.querySelector("h3"));
          }, index * 150);
        });
      } else {
        statItems.forEach(resetStatItem);
      }
    });
  }

  function init() {
    statsSection = document.querySelector(".stats");
    if (!statsSection) return;

    observer = new IntersectionObserver(handleIntersection, observerOptions);
    observer.observe(statsSection);
  }

  return { init };
})();

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  Slider.init();
  StatsAnimation.init();
});
