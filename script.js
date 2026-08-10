/* CampusConnect JavaScript
   Beginner-friendly functions for navigation, theme, filters and forms.
*/

document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen);
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });
  }

  // Dark mode
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("campusconnect-theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  updateThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      const theme = document.body.classList.contains("dark") ? "dark" : "light";
      localStorage.setItem("campusconnect-theme", theme);

      updateThemeIcon();
    });
  }

  function updateThemeIcon() {
    if (!themeToggle) return;
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  }

  // Current year
  const currentYear = document.getElementById("currentYear");
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Generic search/filter for cards
  const searchInput = document.querySelector("[data-search]");
  const filterButtons = document.querySelectorAll("[data-filter]");
  const searchableItems = document.querySelectorAll("[data-item]");

  function filterItems() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const activeFilter = document.querySelector("[data-filter].active")?.dataset.filter || "all";

    searchableItems.forEach((item) => {
      const text = item.textContent.toLowerCase();
      const category = item.dataset.category || "all";

      const matchesSearch = text.includes(searchTerm);
      const matchesCategory = activeFilter === "all" || category === activeFilter;

      item.classList.toggle("hidden", !(matchesSearch && matchesCategory));
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterItems);
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      filterItems();
    });
  });

  // Contact form validation
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const subject = document.getElementById("subject")?.value.trim();
      const message = document.getElementById("message")?.value.trim();

      if (!name || !email || !subject || !message) {
        showFormMessage("Please fill in all fields.", "error");
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        showFormMessage("Please enter a valid email address.", "error");
        return;
      }

      showFormMessage(`Thanks, ${name}! Your message has been received.`, "success");
      contactForm.reset();
    });
  }

  function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
  }
});
