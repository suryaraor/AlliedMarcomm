(function () {
  "use strict";

  // Year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Nav: solid on scroll + mobile toggle
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.add("is-scrolled");
  });
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      onScroll();
    }
  });

  // Portfolio gallery
  var gallery = document.getElementById("gallery");
  var filters = document.querySelector(".filters");
  var items = (window.PORTFOLIO || []).filter(function (i) { return i && i.src; });

  function placeholderTiles(n) {
    var hues = [210, 190, 170, 150, 200, 160];
    for (var i = 0; i < n; i++) {
      var d = document.createElement("div");
      d.className = "tile tile--placeholder";
      var h = hues[i % hues.length];
      d.style.background = "linear-gradient(135deg, hsl(" + h + ",90%,45%), hsl(" + (h - 50) + ",85%,48%))";
      d.innerHTML = "<span>Creative coming soon</span>";
      gallery.appendChild(d);
    }
  }

  function render(cat) {
    gallery.innerHTML = "";
    items.forEach(function (item) {
      if (cat && cat !== "All" && item.category !== cat) return;
      var b = document.createElement("button");
      b.className = "tile";
      b.type = "button";
      var img = document.createElement("img");
      img.src = item.src;
      img.alt = item.title || "Portfolio creative";
      img.loading = "lazy";
      var cap = document.createElement("span");
      cap.className = "tile__cap";
      cap.textContent = item.title || "";
      b.appendChild(img);
      b.appendChild(cap);
      b.addEventListener("click", function () { openLightbox(item); });
      gallery.appendChild(b);
    });
  }

  if (items.length === 0) {
    placeholderTiles(12);
  } else {
    var cats = ["All"];
    items.forEach(function (i) { if (i.category && cats.indexOf(i.category) === -1) cats.push(i.category); });
    if (cats.length > 2) {
      cats.forEach(function (c, idx) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = c;
        if (idx === 0) btn.classList.add("is-active");
        btn.addEventListener("click", function () {
          filters.querySelectorAll("button").forEach(function (x) { x.classList.remove("is-active"); });
          btn.classList.add("is-active");
          render(c);
        });
        filters.appendChild(btn);
      });
    }
    render("All");
  }

  // Lightbox
  var lb = document.getElementById("lightbox");
  var lbImg = lb.querySelector("img");
  var lbCap = lb.querySelector(".lightbox__caption");
  function openLightbox(item) {
    lbImg.src = item.src;
    lbImg.alt = item.title || "";
    lbCap.textContent = item.title || "";
    lb.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lb.hidden = true;
    lbImg.src = "";
    document.body.style.overflow = "";
  }
  lb.addEventListener("click", function (e) { if (e.target !== lbImg) closeLightbox(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hidden) closeLightbox(); });

  // Contact form: validates, then opens the visitor's mail app addressed to Allied Marcomm
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    ["name", "email", "message"].forEach(function (n) {
      var f = form.elements[n];
      var valid = f.value.trim() !== "" && (n !== "email" || /^\S+@\S+\.\S+$/.test(f.value.trim()));
      f.classList.toggle("is-invalid", !valid);
      if (!valid) ok = false;
    });
    if (!ok) { note.textContent = "Please fill in your name, a valid email and your requirements."; return; }

    var d = form.elements;
    var subject = "Website enquiry" + (d.service.value ? " - " + d.service.value : "") + " - " + d.name.value.trim();
    var body =
      "Name: " + d.name.value.trim() + "\n" +
      "Email: " + d.email.value.trim() + "\n" +
      "Phone: " + d.phone.value.trim() + "\n" +
      "Service: " + (d.service.value || "-") + "\n\n" +
      d.message.value.trim();
    window.location.href = "mailto:sunil@alliedmarcomm.com?cc=alliedmarcomm@gmail.com&subject=" +
      encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    note.textContent = "Thanks! Your email app should open with your message ready to send.";
  });

  // Reveal on scroll
  var revealEls = document.querySelectorAll(".section__title, .section__lead, .story p, .story__tags, .card, .contact__grid > *");
  revealEls.forEach(function (el) { el.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
