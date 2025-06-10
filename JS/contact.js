// FAQ toggle
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const faqItem = question.parentElement;
    const answer = faqItem.querySelector(".faq-answer");

    // Close other FAQ items
    document.querySelectorAll(".faq-item").forEach((item) => {
      if (item !== faqItem) {
        item.querySelector(".faq-question").classList.remove("active");
        item.querySelector(".faq-answer").classList.remove("active");
      }
    });

    // Toggle current FAQ item
    question.classList.toggle("active");
    answer.classList.toggle("active");
  });
});

// Contact form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Show success message
  const successMessage = document.getElementById("successMessage");
  successMessage.classList.add("show");

  // Reset form
  this.reset();

  // Hide success message after 5 seconds
  setTimeout(() => {
    successMessage.classList.remove("show");
  }, 5000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Form validation styling
document.querySelectorAll("input, select, textarea").forEach((field) => {
  field.addEventListener("blur", function () {
    if (this.hasAttribute("required") && !this.value) {
      this.style.borderColor = "#e74c3c";
    } else {
      this.style.borderColor = "";
    }
  });
});
