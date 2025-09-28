// --- Utility: Selectors ---
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

// --- Scroll Reveal with Variations (bottom, left, right) ---
(() => {
	const reveals = $$(".reveal");

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
	if (!form) return;

	const confirmation = document.createElement("div");
	confirmation.className = "form-confirmation";
	confirmation.textContent = "✅ Thank you for contacting Greenwood High! We’ll get back to you shortly.";
	form.parentElement.appendChild(confirmation);

	form.addEventListener("submit", (e) => {
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
		confirmation.scrollIntoView({
			behavior: "smooth"
		});
		setTimeout(() => confirmation.classList.remove("visible"), 5000);
	});
})();

// --- Animated Counters (Intersection Observer) ---
(() => {
	const counters = $$(".counter");
	if (!counters.length) return;

	const speed = 50;
	const animateCounters = () => {
		counters.forEach((counter) => {
			const target = +counter.getAttribute("data-target");
			let count = 0;
			const update = () => {
				const increment = Math.ceil(target / speed);
				count += increment;
				if (count < target) {
					counter.textContent = count;
					setTimeout(update, 30);
				} else {
					counter.textContent = target;
				}
			};
			update();
		});
	};

	const observer = new IntersectionObserver(
		(entries) => {
			if (entries[0].isIntersecting) {
				animateCounters();
				observer.disconnect();
			}
		}, {
			threshold: 0.5
		}
	);

	const statsSection = document.querySelector(".about-stats, .impact");
	if (statsSection) observer.observe(statsSection);
})();

// --- Event Filter ---
(() => {
	const filter = $("#event-filter");
	const cards = $$(".event-card");
	if (!filter) return;

	filter.addEventListener("change", () => {
		const category = filter.value;
		cards.forEach((card) => {
			const match = category === "all" || card.dataset.category === category;
			card.style.display = match ? "block" : "none";
		});
	});
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
	const cards = $$(".card");
	cards.forEach((card) => {
		card.addEventListener("mousemove", (e) => {
			const {
				offsetWidth: w,
				offsetHeight: h
			} = card;
			const {
				offsetX: x,
				offsetY: y
			} = e;
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
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	});
})();

// --- Parallax Effect for Hero Background ---
(() => {
	const hero = $(".hero");
	if (!hero) return;

	window.addEventListener("scroll", () => {
		const offset = window.scrollY * 0.4;
		hero.style.backgroundPositionY = `${offset}px`;
	});
})();

// --- Timeline Highlight on Hover ---
(() => {
	const items = $$(".timeline-item");
	items.forEach((item) => {
		item.addEventListener("mouseenter", () => item.classList.add("active"));
		item.addEventListener("mouseleave", () => item.classList.remove("active"));
	});
})();

// --- Leadership Card Glow on Hover ---
(() => {
	const leaders = $$(".leader-card");
	leaders.forEach((leader) => {
		leader.addEventListener("mouseenter", () => {
			leader.style.boxShadow = "0 8px 20px rgba(46,125,50,0.4)";
		});
		leader.addEventListener("mouseleave", () => {
			leader.style.boxShadow = "0 4px 10px rgba(0,0,0,0.08)";
		});
	});
})();

// --- Video Lightbox Modal with Fade ---
(() => {
	const videoCards = document.querySelectorAll(".video-card iframe");
	if (!videoCards.length) return;

	// Create modal container
	const modal = document.createElement("div");
	modal.id = "videoModal";
	modal.style.display = "none";

	const iframeWrapper = document.createElement("div");
	iframeWrapper.style.position = "relative";
	iframeWrapper.style.width = "80%";
	iframeWrapper.style.maxWidth = "900px";
	iframeWrapper.style.aspectRatio = "16/9";
	iframeWrapper.style.background = "#000";

	const closeBtn = document.createElement("span");
	closeBtn.textContent = "✖";
	closeBtn.style.position = "absolute";
	closeBtn.style.top = "-40px";
	closeBtn.style.right = "0";
	closeBtn.style.color = "#fff";
	closeBtn.style.fontSize = "2rem";
	closeBtn.style.cursor = "pointer";

	const modalIframe = document.createElement("iframe");
	modalIframe.style.width = "100%";
	modalIframe.style.height = "100%";
	modalIframe.style.border = "none";
	modalIframe.setAttribute("allowfullscreen", "");

	iframeWrapper.appendChild(closeBtn);
	iframeWrapper.appendChild(modalIframe);
	modal.appendChild(iframeWrapper);
	document.body.appendChild(modal);

	// Open modal
	videoCards.forEach((video) => {
		video.addEventListener("click", (e) => {
			e.preventDefault();
			const src = video.getAttribute("src");
			modalIframe.src = src + "?autoplay=1";
			modal.style.display = "flex";
			setTimeout(() => modal.classList.add("show"), 10);
		});
	});

	// Close modal
	const closeModal = () => {
		modal.classList.remove("show");
		setTimeout(() => {
			modal.style.display = "none";
			modalIframe.src = "";
		}, 400);
	};

	closeBtn.addEventListener("click", closeModal);
	modal.addEventListener("click", (e) => {
		if (e.target === modal) closeModal();
	});
})();