/* ==========================================================================
   WEDDING INVITATION — CONFIG
   Edit the values below to update every placeholder across the whole site.
   ========================================================================== */

const WEDDING = {
  brideName:    "Gayathri",
  groomName:    "Anurag Sai",
  weddingDate:  "23rd August 2026",
  weddingDay:   "Sunday",
  weddingTime:  "11:38 AM",
  venueName:    "Bhaskara Gardens",
  venueAddress: "Bhaskara Gardens A/C, Shadnagar, Telangana",
  mapsLink:     "https://www.google.co.uk/maps/place/Bhaskara+Gardens+A%2FC/@17.0597087,78.1839162,18.13z/data=!4m6!3m5!1s0x3bcbceb8c964dc39:0x9555f49ba8b8b897!8m2!3d17.0597287!4d78.1850459!16s%2Fg%2F11b7gsnhky",
  phone1:       "+91 90636 56157",
  phone2:       "+91 98667 01897",
  whatsapp:     "+91 90636 56157",
  whatsappLink: "https://wa.me/919063656157",
  email:        "" // add an email address here if you'd like it shown on the RSVP card
};

/* ==========================================================================
   DATA BINDING — fills every [data-bind] / [data-bind-*] element from WEDDING
   ========================================================================== */

function applyBindings() {
  document.querySelectorAll("[data-bind]").forEach((el) => {
    const key = el.getAttribute("data-bind");
    if (WEDDING[key]) el.textContent = WEDDING[key];
  });

  document.querySelectorAll("[data-bind-href]").forEach((el) => {
    const key = el.getAttribute("data-bind-href");
    if (WEDDING[key]) el.setAttribute("href", WEDDING[key]);
  });

  document.querySelectorAll("[data-bind-tel]").forEach((el) => {
    const key = el.getAttribute("data-bind-tel");
    if (WEDDING[key]) el.setAttribute("href", "tel:" + WEDDING[key].replace(/[^\d+]/g, ""));
  });

  document.querySelectorAll("[data-bind-wa]").forEach((el) => {
    if (WEDDING.whatsappLink) el.setAttribute("href", WEDDING.whatsappLink);
  });

  document.querySelectorAll("[data-bind-mail]").forEach((el) => {
    const wrap = el.closest(".rsvp-item");
    if (!WEDDING.email) { if (wrap) wrap.style.display = "none"; return; }
    el.textContent = WEDDING.email;
    el.setAttribute("href", "mailto:" + WEDDING.email);
  });
}

/* ==========================================================================
   AMBIENT PETALS
   ========================================================================== */

function spawnPetal() {
  const field = document.getElementById("petal-field");
  if (!field) return;
  const petal = document.createElement("div");
  const isSpark = Math.random() < 0.18;
  petal.className = isSpark ? "petal spark" : "petal";
  const left = Math.random() * 100;
  const duration = 9 + Math.random() * 8;
  const drift = (Math.random() - 0.5) * 160;
  const size = isSpark ? 4 + Math.random() * 3 : 8 + Math.random() * 10;
  const hueFlip = Math.random() > 0.5;

  petal.style.left = left + "vw";
  petal.style.width = size + "px";
  petal.style.height = isSpark ? size + "px" : size * 0.7 + "px";
  petal.style.animationDuration = duration + "s";
  petal.style.setProperty("--drift", drift + "px");
  if (!isSpark && hueFlip) {
    petal.style.background = "linear-gradient(135deg, var(--gold-light), var(--maroon-light))";
  }

  field.appendChild(petal);
  setTimeout(() => petal.remove(), duration * 1000 + 500);
}

function startPetals() {
  spawnPetal();
  setInterval(spawnPetal, 1400);
}

/* ==========================================================================
   SCROLL REVEAL
   ========================================================================== */

function initReveal() {
  const targets = document.querySelectorAll(".reveal, .reveal-fade, .reveal-scale");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
  );
  targets.forEach((t) => observer.observe(t));
}

/* ==========================================================================
   PARALLAX ON TEMPLE SILHOUETTES
   ========================================================================== */

function initParallax() {
  const layers = document.querySelectorAll(".bg-gopuram");
  let ticking = false;

  function update() {
    const scrollY = window.scrollY;
    layers.forEach((layer) => {
      const rect = layer.getBoundingClientRect();
      const speed = 0.08;
      const offset = (rect.top - window.innerHeight / 2) * speed;
      layer.style.transform = `translate(-50%, ${offset}px)`;
    });
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  });
  update();
}

/* ==========================================================================
   MUSIC — autoplay attempt, graceful "Tap to Begin" fallback, toggle control
   ========================================================================== */

function initMusic() {
  const audio = document.getElementById("bg-music");
  const toggle = document.getElementById("music-toggle");
  const loader = document.getElementById("loader");
  const tapBtn = document.getElementById("tap-begin");

  function setPlayingState(isPlaying) {
    toggle.classList.toggle("playing", isPlaying);
    toggle.setAttribute("aria-pressed", String(isPlaying));
  }

  function tryAutoplay() {
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setPlayingState(true);
          dismissLoader();
        })
        .catch(() => {
          // Autoplay blocked — keep the loader's "Tap to Begin" button visible.
          setPlayingState(false);
        });
    }
  }

  function dismissLoader() {
    loader.classList.add("hidden");
  }

  tapBtn.addEventListener("click", () => {
    audio.play().then(() => setPlayingState(true)).catch(() => {});
    dismissLoader();
  });

  toggle.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().then(() => setPlayingState(true)).catch(() => {});
    } else {
      audio.pause();
      setPlayingState(false);
    }
  });

  // If the music file is missing/unreadable, don't block the experience.
  audio.addEventListener("error", () => {
    dismissLoader();
  }, { once: true });

  tryAutoplay();

  // Safety net: reveal the invitation after a short delay even if nothing fires.
  setTimeout(dismissLoader, 2500);
}

/* ==========================================================================
   SCRATCH-TO-REVEAL SAVE THE DATE
   ========================================================================== */

function initScratchCard() {
  const card = document.getElementById("scratch-card");
  const canvas = document.getElementById("scratch-canvas");
  const hint = document.getElementById("scratch-hint");
  if (!card || !canvas) return;

  const ctx = canvas.getContext("2d");
  let scratching = false;
  let lastPoint = null;
  let revealed = false;
  const REVEAL_THRESHOLD = 0.45; // fraction of the card that must be cleared

  function paintFoil() {
    const w = canvas.width, h = canvas.height;
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#9C7A2E");
    grad.addColorStop(0.35, "#E9D394");
    grad.addColorStop(0.5, "#C9A24B");
    grad.addColorStop(0.65, "#E9D394");
    grad.addColorStop(1, "#8E6B22");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // fine diagonal texture so it reads as foil, not a flat gold rectangle
    ctx.strokeStyle = "rgba(74,10,21,0.12)";
    ctx.lineWidth = 1;
    for (let x = -h; x < w; x += 8) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + h, h);
      ctx.stroke();
    }
  }

  function sizeCanvas() {
    const rect = card.getBoundingClientRect();
    canvas.width = Math.round(rect.width);
    canvas.height = Math.round(rect.height);
    paintFoil();
  }

  function pointFromEvent(e) {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function scratchAt(x, y) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
  }

  function scratchLine(a, b) {
    const dist = Math.hypot(b.x - a.x, b.y - a.y);
    const steps = Math.max(1, Math.floor(dist / 6));
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      scratchAt(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
    }
  }

  function getScratchedPercent() {
    const sampleW = 32, sampleH = 20;
    const small = document.createElement("canvas");
    small.width = sampleW;
    small.height = sampleH;
    const sctx = small.getContext("2d");
    sctx.drawImage(canvas, 0, 0, sampleW, sampleH);
    const data = sctx.getImageData(0, 0, sampleW, sampleH).data;
    let cleared = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 30) cleared++;
    }
    return cleared / (sampleW * sampleH);
  }

  function revealFully() {
    if (revealed) return;
    revealed = true;
    canvas.classList.add("revealed");
    card.classList.add("fully-revealed");
    // a little celebratory flourish of petals when the date is revealed
    for (let i = 0; i < 10; i++) setTimeout(spawnPetal, i * 60);
  }

  function handleStart(e) {
    if (revealed) return;
    scratching = true;
    lastPoint = pointFromEvent(e);
    scratchAt(lastPoint.x, lastPoint.y);
  }

  function handleMove(e) {
    if (!scratching || revealed) return;
    const p = pointFromEvent(e);
    scratchLine(lastPoint, p);
    lastPoint = p;
  }

  function handleEnd() {
    if (!scratching) return;
    scratching = false;
    if (getScratchedPercent() >= REVEAL_THRESHOLD) revealFully();
  }

  canvas.addEventListener("pointerdown", (e) => { canvas.setPointerCapture(e.pointerId); handleStart(e); });
  canvas.addEventListener("pointermove", handleMove);
  canvas.addEventListener("pointerup", handleEnd);
  canvas.addEventListener("pointercancel", handleEnd);
  canvas.addEventListener("pointerleave", handleEnd);

  if (hint) {
    // gentle nudge: fade the hint text so it doesn't compete once scratching starts
    canvas.addEventListener("pointerdown", () => { hint.style.opacity = "0.25"; }, { once: true });
  }

  sizeCanvas();
  window.addEventListener("resize", () => { if (!revealed) sizeCanvas(); });
}

/* ==========================================================================
   OPEN INVITATION — smooth scroll to first content section
   ========================================================================== */

function initOpenInvitation() {
  const btn = document.getElementById("open-invitation");
  const target = document.getElementById("couple");
  if (!btn || !target) return;
  btn.addEventListener("click", () => {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

/* ==========================================================================
   INIT
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  applyBindings();
  startPetals();
  initReveal();
  initParallax();
  initMusic();
  initOpenInvitation();
  initScratchCard();
});
