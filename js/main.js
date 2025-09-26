// --- Utility: Element Exists ---
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// --- Mobile Navigation Toggle ---
(() => {
  const toggle = $("#navToggle");
  const nav = $("#mainNav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("open");
    });
  }
})();

// --- Scroll Reveal Animation ---
(() => {
  const reveals = $$(".reveal");

  const revealOnScroll = () => {
    const trigger = window.innerHeight * 0.85;
    reveals.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < trigger) el.classList.add("visible");
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);
})();

// --- CTA Button Interaction ---
(() => {
  const cta = $(".cta-button");
  if (cta) {
    cta.addEventListener("click", () => {
      alert("Thanks for your interest. Our admissions team will contact you soon.");
    });
  }
})();

// --- Contact Form Validation ---
(() => {
  const form = $("#contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = $("#name")?.value.trim();
    const email = $("#email")?.value.trim();
    const message = $("#message")?.value.trim();

    if (!name || !email || !message) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    const emailPattern = /^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    alert("Thank you for contacting Greenwood High. We’ll get back to you shortly.");
    form.reset();
  });
})();

// --- Event Filter (Optional Feature) ---
(() => {
  const filter = $("#event-filter");
  const cards = $$(".event-card");

  if (filter && cards.length) {
    filter.addEventListener("change", (e) => {
      const category = e.target.value;
      cards.forEach(card => {
        card.style.display = (category === "all" || card.dataset.category === category)
          ? "block"
          : "none";
      });
    });
  }
})();
