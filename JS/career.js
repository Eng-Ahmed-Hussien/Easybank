document.addEventListener("DOMContentLoaded", function () {
  initJobFiltering();
  initSmoothScrolling();
});

/* ====================================
   JOB FILTERING 
   ==================================== */

function initJobFiltering() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const jobCards = document.querySelectorAll(".job-card");

  if (filterBtns.length === 0 || jobCards.length === 0) {
    console.warn("Job filtering elements not found");
    return;
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () =>
      handleFilterClick(btn, filterBtns, jobCards)
    );
  });
}

function handleFilterClick(clickedBtn, allBtns, jobCards) {
  updateActiveButton(clickedBtn, allBtns);

  const filter = clickedBtn.textContent.toLowerCase();
  filterJobCards(jobCards, filter);
}

function updateActiveButton(activeBtn, allBtns) {
  allBtns.forEach((btn) => btn.classList.remove("active"));

  activeBtn.classList.add("active");
}

function filterJobCards(jobCards, filter) {
  jobCards.forEach((card) => {
    const departmentElement = card.querySelector(".job-meta span");

    if (!departmentElement) {
      console.warn("Department element not found in job card");
      return;
    }

    const department = departmentElement.textContent.toLowerCase();

    if (filter === "all" || department === filter) {
      showJobCard(card);
    } else {
      hideJobCard(card);
    }
  });
}

function showJobCard(card) {
  card.style.display = "grid";
  card.style.opacity = "1";
}

function hideJobCard(card) {
  card.style.display = "none";
  card.style.opacity = "0";
}

/* ====================================
   SMOOTH SCROLLING FUNCTIONALITY
   ==================================== */

function initSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  if (anchorLinks.length === 0) {
    console.warn("No anchor links found for smooth scrolling");
    return;
  }

  anchorLinks.forEach((anchor) => {
    anchor.addEventListener("click", (e) => handleAnchorClick(e, anchor));
  });
}

function handleAnchorClick(e, anchor) {
  e.preventDefault();

  const targetId = anchor.getAttribute("href");
  const targetElement = document.querySelector(targetId);

  if (targetElement) {
    scrollToTarget(targetElement);
  } else {
    console.warn(`Target element ${targetId} not found`);
  }
}
function scrollToTarget(target) {
  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

/* ====================================
   UTILITY FUNCTIONS
   ==================================== */

function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}
