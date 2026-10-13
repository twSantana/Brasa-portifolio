tailwind.config = {
  theme: {
    extend: {
      colors: {
        ink: "#11110f",
        paper: "#f2efe9",
        ember: "#ff5a1f",
        muted: "#a6a39d"
      },
      fontFamily: {
        display: ["Oswald", "sans-serif"],
        sans: ["DM Sans", "sans-serif"]
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const WHATSAPP_NUMBER = "554195807668";

  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    const message = link.dataset.message || "Olá! Vim pelo site da BRASA.";
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  });

  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");

  function setMenuOpen(open) {
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    mobileMenu.classList.toggle("hidden", !open);
    menuIcon.classList.toggle("fa-bars", !open);
    menuIcon.classList.toggle("fa-xmark", open);
    document.body.classList.toggle("menu-open", open);
  }

  menuToggle.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) setMenuOpen(false);
  });

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
});
