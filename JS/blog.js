document.addEventListener("DOMContentLoaded", function () {
  initializeFilters();
  initializeSearch();
  initializeNewsletter();
  initializePagination();
  initializeSmoothScroll();
});

// ===============================
// FILTER FUNCTIONALITY
// ===============================
function initializeFilters() {
  const filterTags = document.querySelectorAll(".filter-tag");

  filterTags.forEach((tag) => {
    tag.addEventListener("click", handleFilterClick);
  });
}

function handleFilterClick() {
  document.querySelectorAll(".filter-tag").forEach((tag) => {
    tag.classList.remove("active");
  });

  this.classList.add("active");
}

// ===============================
// SEARCH FUNCTIONALITY
// ===============================
function initializeSearch() {
  const searchInput = document.querySelector(".search-input");

  if (searchInput) {
    searchInput.addEventListener("input", handleSearchInput);
  }
}

function handleSearchInput(e) {
  const searchTerm = e.target.value.toLowerCase();
  const blogCards = document.querySelectorAll(".blog-card");

  blogCards.forEach((card) => {
    const shouldShow = searchCard(card, searchTerm);
    card.style.display = shouldShow ? "block" : "none";
  });
}

function searchCard(card, searchTerm) {
  if (searchTerm === "") return true;

  const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
  const content = card.querySelector("p")?.textContent.toLowerCase() || "";

  return title.includes(searchTerm) || content.includes(searchTerm);
}

// ===============================
// NEWSLETTER FUNCTIONALITY
// ===============================
function initializeNewsletter() {
  const newsletterForm = document.querySelector(".newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", handleNewsletterSubmit);
  }
}

function handleNewsletterSubmit(e) {
  e.preventDefault();

  const emailInput = document.querySelector(".newsletter-input");
  const email = emailInput?.value.trim();

  if (email && isValidEmail(email)) {
    showSuccessMessage("Thank you for subscribing!");
    emailInput.value = "";
  } else {
    showErrorMessage("Please enter a valid email address.");
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showSuccessMessage(message) {
  alert(message); 
}

function showErrorMessage(message) {
  alert(message); 
}

// ===============================
// PAGINATION FUNCTIONALITY
// ===============================
function initializePagination() {
  const paginationButtons = document.querySelectorAll(".pagination button");

  paginationButtons.forEach((btn) => {
    btn.addEventListener("click", handlePaginationClick);
  });
}

function handlePaginationClick() {
  const buttonText = this.textContent;

  if (!buttonText.includes("Previous") && !buttonText.includes("Next")) {
    setActivePaginationButton(this);
  }
}

function setActivePaginationButton(activeButton) {
  document.querySelectorAll(".pagination button").forEach((btn) => {
    btn.classList.remove("active");
  });

  activeButton.classList.add("active");
}

// ===============================
// SMOOTH SCROLL FUNCTIONALITY
// ===============================
function initializeSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((anchor) => {
       if (anchor.getAttribute("href") === "#") {
         console.warn(
           "Anchor link with href='#' found. This may cause issues."
         );
       }
      else {
         anchor.addEventListener("click", handleSmoothScroll);
       }
     
  });
}

function handleSmoothScroll(e) {
  e.preventDefault();

  const targetId = this.getAttribute("href");
  const targetElement = document.querySelector(targetId);

  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}
