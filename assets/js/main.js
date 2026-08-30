(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");

  function onScroll() {
    if (window.scrollY > 12) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (navToggle && header) {
    navToggle.addEventListener("click", function () {
      header.classList.toggle("open");
      var expanded = header.classList.contains("open");
      navToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    });

    document.querySelectorAll(".mobile-panel a").forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  document.querySelectorAll(".reveal-stagger").forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.style.setProperty("--i", i);
    });
  });

  var yearEl = document.getElementById("year");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
})();
