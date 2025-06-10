// Mobile menu toggle
document
  .querySelector(".mobile-menu-btn")
  .addEventListener("click", function () {
    document.querySelector(".nav-links").classList.toggle("active");
  });

// Close menu when clicking outside
document.addEventListener("click", function (e) {
  const menu = document.querySelector(".nav-links");
  const menuBtn = document.querySelector(".mobile-menu-btn");

  if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
    menu.classList.remove("active");
  }
});
// Cursor follow effect
let cursor = document.createElement("div");
cursor.style.cssText = `
            position: fixed;
            width: 30px;
            height: 30px;
            background-image: radial-gradient(circle, rgba(49, 211, 92, 0.8), rgba(43, 183, 218, 0.4))!important;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        `;
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX - 10 + "px";
  cursor.style.top = e.clientY - 10 + "px";
});
