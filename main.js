/* ════════════════════════════════════════════
   BIRTHDAY SURPRISE — main.js (CONSOLIDATED)
════════════════════════════════════════════ */

/* ── VH FIX ── */
function setVH() {
  document.documentElement.style.setProperty(
    "--vh",
    window.innerHeight * 0.01 + "px",
  );
}
setVH();
window.addEventListener("resize", setVH);

/* ══════════════════════════════════════════
   BGM — MP3 AUDIO SYSTEM
══════════════════════════════════════════ */
let bgm = new Audio("mp3/music.mp3");
bgm.loop = true;
bgm.volume = 0.5;

let bgmOn = false;
let bgmSuspended = false;
let bgmAutoStarted = false;

function startBGM() {
  bgm.play().catch(() => {});
  bgmOn = true;
  bgmSuspended = false;
  const btn = document.getElementById("bgm-btn");
  if (btn) {
    btn.textContent = "🎶";
    btn.classList.add("on");
  }
}

function stopBGM() {
  bgm.pause();
  bgmOn = false;
  const btn = document.getElementById("bgm-btn");
  if (btn) {
    btn.textContent = "🎵";
    btn.classList.remove("on");
  }
}

function toggleBGM() {
  if (bgmOn) stopBGM();
  else startBGM();
}

function pauseBGMForSong() {
  if (bgmOn) {
    bgmSuspended = true;
    bgm.pause();
    const note = document.getElementById("bgm-paused-note");
    if (note) note.style.display = "block";
  }
}

function resumeBGMAfterSong() {
  const note = document.getElementById("bgm-paused-note");
  if (note) note.style.display = "none";
  if (bgmSuspended) {
    bgmSuspended = false;
    startBGM();
  }
}

function autoStartBGM() {
  if (bgmAutoStarted) return;
  bgmAutoStarted = true;
  startBGM();
}
document.addEventListener("click", autoStartBGM, { once: true });
document.addEventListener("touchstart", autoStartBGM, { once: true });

/* ══════════════════════════════════════════
   PAGE 7 — MEMORY VIDEO PLAYER
══════════════════════════════════════════ */
function mountVideo() {
  const wrap = document.getElementById("yt-wrap");
  if (!wrap) return;
  if (wrap.querySelector("video")) return;

  wrap.innerHTML = "";
  const video = document.createElement("video");
  video.src = "mp4/video.mp4";
  video.autoplay = true;
  video.loop = true;
  video.playsInline = true;
  video.controls = true;
  video.style.width = "100%";
  video.style.height = "auto";
  video.style.display = "block";
  wrap.appendChild(video);
}

function destroyVideo() {
  const wrap = document.getElementById("yt-wrap");
  if (wrap) wrap.innerHTML = "";
}

/* ══════════════════════════════════════════
   FLOATING IMAGES GENERATOR
══════════════════════════════════════════ */
const floatingImagesList = [
  "img/img.jpeg",
  "img/img1.jpeg",
  "img/img2.jpeg",
  "img/img3.jpeg",
];

function initContinuousFloatingImages() {
  const container = document.getElementById("floating-image-layer");
  if (!container) return;

  const totalFloatingElements = 6;

  for (let i = 0; i < totalFloatingElements; i++) {
    const imgNode = document.createElement("img");

    imgNode.src = floatingImagesList[i % floatingImagesList.length];
    imgNode.className = "floating-circle-img";

    const leftPosition = i * (100 / totalFloatingElements) + Math.random() * 8;
    imgNode.style.left = `${leftPosition}%`;

    const randomDelay = Math.random() * -20;
    imgNode.style.animationDelay = `${randomDelay}s`;

    const randomDuration = 16 + Math.random() * 8;
    imgNode.style.animationDuration = `${randomDuration}s`;

    const swayDistance = Math.random() * 60 - 30;
    imgNode.style.setProperty("--sway-x", `${swayDistance}px`);

    container.appendChild(imgNode);
  }
}

/* ══════════════════════════════════════════
   NAVIGATION SYSTEM
══════════════════════════════════════════ */
const PAGES = [
  "page-0",
  "page-1",
  "page-2",
  "page-3",
  "page-4",
  "page-5",
  "page-6",
  "page-7",
  "page-8",
  "page-9",
];
let cur = 0;
let viewedGifts = new Set();

function clickGift(pageIndex) {
  viewedGifts.add(pageIndex);

  const element = document.getElementById("gift-btn-" + pageIndex);
  if (element) {
    element.style.border = "1px dashed var(--rose)";
    element.classList.add("unlocked");
  }
  goTo(pageIndex);
}

function checkAllGiftsCompleted() {
  if (
    viewedGifts.has(4) &&
    viewedGifts.has(5) &&
    viewedGifts.has(6) &&
    viewedGifts.has(7) &&
    viewedGifts.has(8) &&
    viewedGifts.has(9)
  ) {
    const thoughtsModal = document.getElementById("final-thoughts-modal");
    if (thoughtsModal && !thoughtsModal.classList.contains("modal-open")) {
      setTimeout(() => {
        thoughtsModal.classList.add("modal-open");
      }, 600);
    }
  }
}

function closeThoughtsModal() {
  const thoughtsModal = document.getElementById("final-thoughts-modal");
  if (thoughtsModal) thoughtsModal.classList.remove("modal-open");
}

function goTo(idx) {
  const ov = document.getElementById("overlay");
  ov.style.opacity = 1;

  if (cur === 9) {
    clearInterval(lifeInterval);
    lifeInterval = null;
  }

  if (cur === 7) {
    destroyVideo();
    resumeBGMAfterSong();
  }

  setTimeout(() => {
    PAGES.forEach((id) => {
      const el = document.getElementById(id);
      el.classList.remove("active", "visible");
      el.scrollTop = 0;
    });
    cur = idx;
    const t = document.getElementById(PAGES[idx]);
    t.classList.add("active");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => t.classList.add("visible")),
    );
    updateProg();
    ov.style.opacity = 0;

    if (idx === 2) initGame();
    if (idx === 3) checkAllGiftsCompleted();

    if (idx === 7) {
      pauseBGMForSong();
      setTimeout(mountVideo, 350);
    }

    if (idx === 6) restoreVoucherState();

    // Directly transitions to calculation counter layout
    if (idx === 9) {
      startDirectLifeCounter();
    }
  }, 310);
}

function updateProg() {
  document.getElementById("prog").style.width =
    Math.round((cur / 9) * 100) + "%";
}

/* ══════════════════════════════════════════
   PAGE 9 — TIME YOU'VE BLOOMED (DIRECT)
══════════════════════════════════════════ */
let lifeInterval = null;

function startDirectLifeCounter() {
  if (lifeInterval) clearInterval(lifeInterval);

  function updateLife() {
    const birth = new Date("2001-07-02T00:00:00"),
      now = new Date();
    let Y = now.getFullYear() - birth.getFullYear();
    let M = now.getMonth() - birth.getMonth();
    let D = now.getDate() - birth.getDate();
    let h = now.getHours() - birth.getHours();
    let m = now.getMinutes() - birth.getMinutes();
    let s = now.getSeconds() - birth.getSeconds();

    if (s < 0) {
      s += 60;
      m--;
    }
    if (m < 0) {
      m += 60;
      h--;
    }
    if (h < 0) {
      h += 24;
      D--;
    }
    if (D < 0) {
      D += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      M--;
    }
    if (M < 0) {
      M += 12;
      Y--;
    }

    const counterEl = document.getElementById("lifeCounter");
    if (counterEl) {
      counterEl.innerHTML = `
        <div class="counter-row">
          <span class="counter-label">✨ Wonderful Years</span>
          <span class="counter-num">${Y}</span>
        </div>
        <div class="counter-row">
          <span class="counter-label">🌙 Enchanting Months</span>
          <span class="counter-num">${M}</span>
        </div>
        <div class="counter-row">
          <span class="counter-label">📅 Precious Days</span>
          <span class="counter-num">${D}</span>
        </div>
        <div class="counter-row">
          <span class="counter-label">⏱️ Tender Hours</span>
          <span class="counter-num">${h}</span>
        </div>
        <div class="counter-row">
          <span class="counter-label">💓 Heartfelt Minutes</span>
          <span class="counter-num">${m}</span>
        </div>
        <div class="counter-row">
          <span class="counter-label">💖 Sparkling Seconds</span>
          <span class="counter-num">${s}</span>
        </div>
      `;
    }
  }

  updateLife();
  lifeInterval = setInterval(updateLife, 1000);
}

/* ══════════════════════════════════════════
   CANVAS DECORATION BACKGROUND GRAPHICS
══════════════════════════════════════════ */
(function () {
  const cv = document.getElementById("bg-canvas");
  if (!cv) return;
  const cx = cv.getContext("2d");
  let W,
    H,
    pts = [];

  function resize() {
    W = cv.width = innerWidth;
    H = cv.height = innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const COLS = [
    "rgba(212,85,110,",
    "rgba(107,145,201,",
    "rgba(176,125,150,",
    "rgba(201,168,76,",
    "rgba(168,191,224,",
  ];

  function mk() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: 1.5 + Math.random() * 3.5,
      vx: (Math.random() - 0.5) * 0.32,
      vy: (Math.random() - 0.5) * 0.32,
      c: COLS[Math.floor(Math.random() * COLS.length)],
      a: 0.04 + Math.random() * 0.14,
      ph: Math.random() * Math.PI * 2,
    };
  }
  for (let i = 0; i < 75; i++) pts.push(mk());

  let t = 0;
  function draw() {
    cx.clearRect(0, 0, W, H);
    t += 0.003;
    [
      [W * 0.1, H * 0.2, W * 0.26, H * 0.22, "rgba(168,191,224,0.13)"],
      [W * 0.88, H * 0.14, W * 0.22, H * 0.2, "rgba(212,85,110,0.07)"],
      [W * 0.5, H * 0.8, W * 0.24, H * 0.18, "rgba(168,191,224,0.09)"],
      [W * 0.18, H * 0.68, W * 0.2, H * 0.16, "rgba(201,168,76,0.055)"],
      [W * 0.75, H * 0.6, W * 0.18, H * 0.15, "rgba(176,125,150,0.07)"],
    ].forEach(([x, y, rx, ry, c], i) => {
      const ox = Math.sin(t + i * 1.1) * W * 0.02;
      const oy = Math.cos(t * 0.8 + i * 0.9) * H * 0.018;
      const mr = Math.max(rx, ry);
      const g2 = cx.createRadialGradient(x + ox, y + oy, 0, x + ox, y + oy, mr);
      g2.addColorStop(0, c);
      g2.addColorStop(1, "transparent");
      cx.save();
      cx.translate(x + ox, y + oy);
      cx.scale(rx / mr, ry / mr);
      cx.fillStyle = g2;
      cx.beginPath();
      cx.arc(0, 0, mr, 0, Math.PI * 2);
      cx.fill();
      cx.restore();
    });
    pts.forEach((p) => {
      p.ph += 0.015;
      cx.beginPath();
      cx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      cx.fillStyle = p.c + p.a * (0.55 + 0.45 * Math.sin(p.ph)) + ")";
      cx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -8) p.x = W + 8;
      if (p.x > W + 8) p.x = -8;
      if (p.y < -8) p.y = H + 8;
      if (p.y > H + 8) p.y = -8;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ══════════════════════════════════════════
   CLICK INTERACTION EFFECT PANELS
══════════════════════════════════════════ */
const HH = ["💕", "💗", "💖", "💝", "🩷", "❤️"];

function spawnHearts(x, y, n = 10) {
  for (let i = 0; i < n; i++)
    setTimeout(() => {
      const d = document.createElement("div");
      d.className = "hp";
      d.textContent = HH[Math.floor(Math.random() * HH.length)];
      d.style.left = x + Math.random() * 60 - 30 + "px";
      d.style.top = y + Math.random() * 28 - 14 + "px";
      d.style.fontSize = 12 + Math.random() * 13 + "px";
      d.style.animationDuration = 1 + Math.random() * 0.8 + "s";
      document.body.appendChild(d);
      setTimeout(() => d.remove(), 2000);
    }, i * 48);
}

document.addEventListener("click", function (e) {
  if (Math.random() > 0.54 || e.target.closest("#page-9")) return;
  const d = document.createElement("div");
  d.className = "hp";
  d.textContent = HH[Math.floor(Math.random() * 3)];
  d.style.left = e.clientX + "px";
  d.style.top = e.clientY + "px";
  d.style.fontSize = "12px";
  d.style.animationDuration = "1.4s";
  document.body.appendChild(d);
  setTimeout(() => d.remove(), 1700);
});

function handleYes(btn) {
  autoStartBGM();
  const r = btn.getBoundingClientRect();
  spawnHearts(r.left + r.width / 2, r.top + r.height / 2, 14);
  setTimeout(() => goTo(2), 400);
}

/* ══════════════════════════════════════════
   PAGE 2 — GAME ENGINE COMPONENT
══════════════════════════════════════════ */
const EMOJIS = ["", "🎂", "💝", "🌹", "💌", "🎁"];
let gFlipped = [],
  gMatched = 0,
  gMoves = 0;
let gLive = false,
  gTid,
  gLeft = 30;
let gLocked = false;

function initGame() {
  const g = document.getElementById("mgrid");
  if (!g) return;
  g.innerHTML = "";
  g.style.display = "";
  document.getElementById("passcode-container").style.display = "none";
  document.getElementById("gwin").classList.remove("show");
  document.getElementById("glose").classList.remove("show");
  document.getElementById("sbtn").style.display = "";
  document.getElementById("rbtn").style.display = "none";
  document.getElementById("skbtn").style.display = "none";
  document.getElementById("timer").textContent = "30";
  document.getElementById("moves").textContent = "0";
  document.getElementById("pf").textContent = "0";
  document.getElementById("pt").textContent = EMOJIS.length;
  document.getElementById("tstat").classList.remove("low");
  document.getElementById("game-passcode").value = "";
  gMoves = 0;
  gMatched = 0;
  gFlipped = [];
  gLeft = 30;
  gLive = false;
  gLocked = false;
  clearInterval(gTid);

  [...EMOJIS, ...EMOJIS]
    .sort(() => Math.random() - 0.5)
    .forEach((e) => {
      const c = document.createElement("button");
      c.className = "mc";
      c.dataset.e = e;
      c.innerHTML = `<div class="mc-b">🎀</div><div class="mc-f">${e}</div>`;
      c.addEventListener("click", () => gFlip(c));
      g.appendChild(c);
    });
}

function startGame() {
  initGame();
  document.getElementById("sbtn").style.display = "none";
  document.getElementById("rbtn").style.display = "";
  document.getElementById("skbtn").style.display = "";
  gLive = true;
  gTid = setInterval(() => {
    gLeft--;
    document.getElementById("timer").textContent = gLeft;
    if (gLeft <= 8) document.getElementById("tstat").classList.add("low");
    if (gLeft <= 0) {
      clearInterval(gTid);
      gLive = false;
      document.getElementById("glose").classList.add("show");
    }
  }, 1000);
}

function showPasscodeField() {
  document.getElementById("mgrid").style.display = "none";
  document.getElementById("passcode-container").style.display = "block";
}

function showErrorToast(message) {
  const toast = document.getElementById("error-toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  if (navigator.vibrate) {
    navigator.vibrate(100);
  }

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function verifyPasscode() {
  const codeInput = document.getElementById("game-passcode").value;
  if (codeInput === "14022026") {
    clearInterval(gTid);
    gLive = false;
    showSuccessToast("✨ Code Accepted! Unlocking gifts...");
    setTimeout(() => {
      goTo(3);
    }, 1000);
  } else {
    const teasingMessages = [
      "Hmm... are you sure you love me? 😂 Try again! 💕",
      "Wrong! Someone's getting no chocolates today... 🍫😜",
      "Wrong passcode! Do I need to remind you of our special day? 🤔❤️",
      "Aieee! That's not it! Guess closer to our hearts... ✨",
    ];
    const randomMessage =
      teasingMessages[Math.floor(Math.random() * teasingMessages.length)];
    showErrorToast(randomMessage);
  }
}

function gFlip(c) {
  if (!gLive || gLocked) return;
  if (c.classList.contains("flipped") || c.classList.contains("matched"))
    return;

  c.classList.add("flipped");
  gFlipped.push(c);

  if (gFlipped.length === 2) {
    gMoves++;
    document.getElementById("moves").textContent = gMoves;

    if (gFlipped[0].dataset.e === gFlipped[1].dataset.e) {
      gFlipped.forEach((x) => x.classList.add("matched"));
      gMatched++;
      document.getElementById("pf").textContent = gMatched;
      gFlipped = [];

      if (gMatched === EMOJIS.length) {
        clearInterval(gTid);
        gLive = false;
        setTimeout(() => {
          document.getElementById("gwin").classList.add("show");
          confettiBurst();
        }, 500);
      }
    } else {
      gLocked = true;
      const tmp = [...gFlipped];
      gFlipped = [];
      setTimeout(() => {
        tmp.forEach((x) => x.classList.remove("flipped"));
        gLocked = false;
      }, 860);
    }
  }
}

/* ══════════════════════════════════════════
   EMAILJS / VOUCHER COMPONENT SYSTEM
══════════════════════════════════════════ */
emailjs.init("fOKIPhBJveSbfrzCZ");

const voucherTexts = [
  "Free Birthday Shopping — redeem anytime! 🛍️",
  "Movie Night With You — your pick, my treat! 🎬",
  "Your Most Loved Dessert — I'll take you there! 🍰",
];
const voucherIcons = ["🛍️", "🎬", "🍰"];

let selectedVoucherIndex = null;
let redeemedVoucher = null;

function restoreVoucherState() {
  redeemedVoucher = localStorage.getItem("redeemedVoucher");
  document.querySelectorAll(".voucher-card").forEach((el) => {
    el.style.pointerEvents = redeemedVoucher !== null ? "none" : "";
    el.style.opacity = redeemedVoucher !== null ? "0.5" : "";
  });
  if (redeemedVoucher !== null) {
    const tag = document.getElementById("v" + redeemedVoucher);
    if (tag) tag.classList.add("redeemed");
  }
}

function redeemVoucher(card, idx) {
  if (redeemedVoucher !== null) {
    alert("You already redeemed ONE voucher 🎉");
    return;
  }
  selectedVoucherIndex = idx;
  document.getElementById("vpopup-icon").textContent = voucherIcons[idx];
  document.getElementById("vpopup-text").textContent = voucherTexts[idx];
  document.getElementById("voucher-popup").style.display = "block";
  confettiBurst(true);
}

function showSuccessToast(message) {
  const toast = document.getElementById("success-toast");
  if (toast) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
  }
}

function claimVoucher() {
  if (selectedVoucherIndex === null) return;
  const idx = selectedVoucherIndex;

  localStorage.setItem("redeemedVoucher", idx);
  redeemedVoucher = String(idx);

  document.querySelectorAll(".voucher-card").forEach((el) => {
    el.style.pointerEvents = "none";
    el.style.opacity = "0.5";
  });
  const tag = document.getElementById("v" + idx);
  if (tag) tag.classList.add("redeemed");

  document.getElementById("voucher-popup").style.display = "none";
  sendEmail(idx);
  showSuccessToast("🎉 Voucher Claimed Successfully!");
  selectedVoucherIndex = null;
}

function sendEmail(idx) {
  emailjs
    .send("service_94av9sb", "template_trj4znn", {
      voucher_name: voucherTexts[idx],
    })
    .then(() => console.log("Email sent ✔"))
    .catch((err) => console.warn("Email error:", err));
}

function submitFeedback() {
  const textarea = document.getElementById("feedbackText");
  const content = textarea ? textarea.value : "";

  if (!content.trim()) {
    alert("Please write down something first! 💕");
    return;
  }

  emailjs
    .send("service_94av9sb", "template_trj4znn", {
      voucher_name: `Feedback/Thoughts: "${content.length > 100 ? content.slice(0, 100) + "..." : content}"`,
    })
    .then(() => {
      if (textarea) textarea.value = "";
      closeThoughtsModal();
      showSuccessToast("📬 Sent Successfully!");
      if (typeof confetti !== "undefined") {
        confetti({ particleCount: 140, spread: 70, origin: { y: 0.6 } });
      }
    })
    .catch((err) => {
      console.warn("Feedback Email error:", err);
      if (textarea) textarea.value = "";
      closeThoughtsModal();
      showSuccessToast("💝 Sent Successfully!");
      if (typeof confetti !== "undefined") {
        confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
      }
    });
}

function confettiBurst(mini = false) {
  const cols = [
    "#d4556e",
    "#6b91c9",
    "#f7c5d0",
    "#b07d96",
    "#c9a84c",
    "#ff6b9d",
    "#a8bfe0",
  ];
  const count = mini ? 40 : 90;
  for (let i = 0; i < count; i++)
    setTimeout(() => {
      const c = document.createElement("div");
      c.className = "cf";
      c.style.cssText = `left:${Math.random() * 100}vw;top:-15px;background:${cols[Math.floor(Math.random() * cols.length)]};width:${6 + Math.random() * 8}px;height:${6 + Math.random() * 8}px;border-radius:${Math.random() > 0.5 ? "50%" : "3px"};animation-duration:${1.7 + Math.random() * 2.2}s;animation-delay:${Math.random() * 0.4}s;`;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 4200);
    }, i * 18);
}

/* ── DOM CONTENT LOADED INITIALIZATION ── */
document.addEventListener("DOMContentLoaded", () => {
  initContinuousFloatingImages();

  const p0 = document.getElementById("page-0");
  if (p0) setTimeout(() => p0.classList.add("visible"), 50);

  updateProg();
});
