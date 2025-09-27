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

// --- Scroll Reveal with Variations ---
(() => {
  const reveals = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    const trigger = window.innerHeight * 0.85;
    reveals.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < trigger) {
        el.classList.add("visible");
      }
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
  const form = document.getElementById("contact-form");
  const confirmation = document.createElement("div");
  confirmation.className = "form-confirmation";
  confirmation.textContent = "✅ Thank you for contacting Greenwood High! We’ll get back to you shortly.";
  form?.parentElement?.appendChild(confirmation);

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("#name")?.value.trim();
    const email = form.querySelector("#email")?.value.trim();
    const message = form.querySelector("#message")?.value.trim();

    if (!name || !email || !message) {
      alert("Please fill out all required fields.");
      return;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    form.reset();
    confirmation.classList.add("visible");
    confirmation.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      confirmation.classList.remove("visible");
    }, 5000); // fades out after 5 seconds
  });
})();

// --- Animated Counters (Intersection Observer) ---
(() => {
  const counters = document.querySelectorAll(".counter");
  const speed = 50;

  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = Math.ceil(target / speed);

        if (count < target) {
          counter.innerText = count + increment;
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  const revealStats = document.querySelector(".about-stats");
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      observer.disconnect();
    }
  }, { threshold: 0.5 });

  if (revealStats) observer.observe(revealStats);
})();

// --- Event Filter ---
(() => {
  const filter = document.getElementById("event-filter");
  const cards = document.querySelectorAll(".event-card");

  if (filter) {
    filter.addEventListener("change", () => {
      const category = filter.value;
      cards.forEach(card => {
        const match = category === "all" || card.dataset.category === category;
        card.style.display = match ? "block" : "none";
      });
    });
  }
})();
// --- Animated Counters (on page load) ---
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const speed = 50;

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = Math.ceil(target / speed);

      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
});

// --- Animated Counters (Intersection Observer for .about-stats) ---
(() => {
  const counters = document.querySelectorAll(".counter");
  const speed = 50;

  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = Math.ceil(target / speed);

        if (count < target) {
          counter.innerText = count + increment;
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  const revealStats = document.querySelector(".about-stats");
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      observer.disconnect();
    }
  }, { threshold: 0.5 });

  if (revealStats) observer.observe(revealStats);
})();

// --- Typing Effect for Hero Subtitle ---
(() => {
  const heroText = document.querySelector(".hero p");
  if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = "";
    let i = 0;

    const typeWriter = () => {
      if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };
    typeWriter();
  }
})();

// --- Card Tilt Effect ---
(() => {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const { offsetWidth: w, offsetHeight: h } = card;
      const { offsetX: x, offsetY: y } = e;
      const moveX = (x / w - 0.5) * 10; 
      const moveY = (y / h - 0.5) * -10;
      card.style.transform = `rotateX(${moveY}deg) rotateY(${moveX}deg) scale(1.02)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0) rotateY(0) scale(1)";
    });
  });
})();

// --- Scroll To Top Button ---
(() => {
  const btn = document.createElement("button");
  btn.id = "scrollTop";
  btn.innerHTML = "⬆";
  document.body.appendChild(btn);

  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 400 ? "block" : "none";
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

// --- Parallax Effect for Hero Background ---
(() => {
  const hero = document.querySelector(".hero");
  window.addEventListener("scroll", () => {
    if (hero) {
      const offset = window.scrollY * 0.4;
      hero.style.backgroundPositionY = `${offset}px`;
    }
  });
})();

