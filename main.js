function setVH() {
  document.documentElement.style.setProperty(
    "--vh",
    window.innerHeight * 0.01 + "px",
  );
}
setVH();
window.addEventListener("resize", setVH);

emailjs.init("fOKIPhBJveSbfrzCZ");

const EMAIL_CONFIG = {
  SERVICE_ID: "service_94av9sb",
  TEMPLATES: {
    VOUCHER_ENGINE: "template_trj4znn",
    BOX_ENGINE: "template_6onz6ji",
  },
};

const bgm = new Audio("mp3/music.mp3");
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
document.addEventListener("DOMContentLoaded", () => {
  const words = document.querySelectorAll("#love-forever span");

  words.forEach((word, index) => {
    word.style.transitionDelay = `${index * 0.15}s`;
  });

  setTimeout(() => {
    words.forEach((word) => word.classList.add("active-glow"));
  }, 100);
});

function autoStartBGM() {
  if (bgmAutoStarted) return;
  bgmAutoStarted = true;
  startBGM();
}
document.addEventListener("click", autoStartBGM, { once: true });
document.addEventListener("touchstart", autoStartBGM, { once: true });

function mountVideo() {
  const wrap = document.getElementById("yt-wrap");
  if (!wrap || wrap.querySelector("video")) return;

  wrap.innerHTML = "";
  const video = document.createElement("video");
  video.src = "mp4/video.mp4";
  video.autoplay = true;
  video.loop = false;
  video.playsInline = true;
  video.controls = true;
  video.style.width = "100%";
  video.style.height = "auto";
  video.style.display = "block";
  wrap.appendChild(video);

  const lyricsTimeline = [
    { id: 1, start: 73.0, end: 74.21 },
    { id: 2, start: 74.21, end: 75.21 },
    { id: 3, start: 75.21, end: 76.17 },
    { id: 4, start: 76.17, end: 77.01 },
    { id: 5, start: 77.01, end: 77.29 },
    { id: 7, start: 77.29, end: 78.13 },
    { id: 8, start: 78.13, end: 79.25 },
    { id: 9, start: 79.25, end: 81.25 },
    { id: 10, start: 81.25, end: 83.18 },
    { id: 11, start: 83.18, end: 84.28 },
    { id: 12, start: 84.28, end: 85.16 },
    { id: 13, start: 85.16, end: 86.02 },
    { id: 14, start: 86.02, end: 86.28 },
    { id: 15, start: 86.28, end: 87.17 },
    { id: 16, start: 87.17, end: 88.22 },
    { id: 17, start: 88.22, end: 90.15 },
    { id: 18, start: 90.15, end: 95.0 },
  ];

  video.addEventListener("timeupdate", () => {
    const currentTime = video.currentTime;
    lyricsTimeline.forEach((item) => {
      const wordElement = document.querySelector(`[data-word="${item.id}"]`);
      if (!wordElement) return;
      if (currentTime >= item.start && currentTime <= item.end) {
        wordElement.classList.add("active-glow");
      } else {
        wordElement.classList.remove("active-glow");
      }
    });
  });
}

const floatingImagesList = [
  "img/floting/img1.webp",
  "img/floting/img2.webp",
  "img/floting/img3.webp",
  "img/floting/img4.webp",
  "img/floting/img5.webp",
  "img/floting/img6.webp",
  "img/floting/img7.webp",
  "img/floting/img8.webp",
  "img/floting/img9.webp",
  "img/floting/img10.webp",
  "img/floting/img11.webp",
  "img/floting/img12.webp",
];

function initContinuousFloatingImages() {
  const container = document.getElementById("floating-image-layer");
  if (!container) return;

  const maxElementsOnScreen = 6;
  container.innerHTML = "";
  let nextImageIndex = maxElementsOnScreen;
  function setImageSource(node, imageSrc) {
    if (imageSrc.includes(".") || imageSrc.startsWith("data:")) {
      node.style.backgroundImage = `url('${imageSrc}')`;
      node.style.backgroundSize = "cover";
      node.style.backgroundPosition = "center 20%";
      node.textContent = "";
    } else {
      node.style.backgroundImage = "none";
      node.style.display = "flex";
      node.style.justifyContent = "center";
      node.style.alignItems = "center";
      node.style.fontSize = "2rem";
      node.textContent = imageSrc;
    }
  }

  for (let i = 0; i < maxElementsOnScreen; i++) {
    const imgNode = document.createElement("div");
    imgNode.className = "floating-circle-img";
    setImageSource(imgNode, floatingImagesList[i]);
    const randomTop = Math.floor(Math.random() * 50) + 20;
    imgNode.style.top = `${randomTop}%`;

    const leftPosition = i * (100 / maxElementsOnScreen) + Math.random() * 8;
    imgNode.style.left = `${Math.min(leftPosition, 90)}%`;
    imgNode.style.animationDelay = `${Math.random() * -20}s`;
    imgNode.style.animationDuration = `${16 + Math.random() * 8}s`;
    imgNode.style.setProperty("--sway-x", `${Math.random() * 60 - 30}px`);
    imgNode.addEventListener("animationiteration", () => {
      const nextImg = floatingImagesList[nextImageIndex];
      setImageSource(imgNode, nextImg);
      nextImageIndex = (nextImageIndex + 1) % floatingImagesList.length;
    });

    container.appendChild(imgNode);
  }
}

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
  "page-10",
  "page-11",
];
let cur = 0;
const viewedGifts = new Set();

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
  const mandatoryGifts = [4, 5, 6, 7, 8, 9, 10, 11];
  const allDone = mandatoryGifts.every((g) => viewedGifts.has(g));
  if (allDone) {
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
  if (!ov) return;
  ov.style.opacity = 1;

  if (cur === 9) {
    clearInterval(lifeInterval);
    lifeInterval = null;
  }
  if (cur === 7) {
    const wrap = document.getElementById("yt-wrap");
    if (wrap) wrap.innerHTML = "";
    resumeBGMAfterSong();
  }

  setTimeout(() => {
    PAGES.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.remove("active", "visible");
        el.scrollTop = 0;
      }
    });

    cur = idx;
    const t = document.getElementById(PAGES[idx]);
    if (t) {
      t.classList.add("active");
      requestAnimationFrame(() =>
        requestAnimationFrame(() => t.classList.add("visible")),
      );
    }

    updateProg();
    ov.style.opacity = 0;

    if (idx === 2) initGame();
    if (idx === 3) checkAllGiftsCompleted();
    if (idx === 7) {
      pauseBGMForSong();
      setTimeout(mountVideo, 350);
    }
    if (idx === 6) restoreVoucherState();
    if (idx === 9) startDirectLifeCounter();
  }, 310);
}

function updateProg() {
  const progBar = document.getElementById("prog");
  if (progBar) {
    progBar.style.width = Math.round((cur / (PAGES.length - 1)) * 100) + "%";
  }
}

let lifeInterval = null;

function startDirectLifeCounter() {
  if (lifeInterval) clearInterval(lifeInterval);

  function updateLife() {
    const birth = new Date("2001-07-02T00:00:00");
    const now = new Date();
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
        <div class="counter-row"><span class="counter-num">${Y}</span><span class="counter-label">✨ Wonderful Years</span></div>
        <div class="counter-row"><span class="counter-num">${M}</span><span class="counter-label">🌙 Enchanting Months</span></div>
        <div class="counter-row"><span class="counter-num">${D}</span><span class="counter-label">📅 Precious Days</span></div>
        <div class="counter-row"><span class="counter-num">${h}</span><span class="counter-label">⏱️ Tender Hours</span></div>
        <div class="counter-row"><span class="counter-num">${m}</span><span class="counter-label">💓 Heartfelt Minutes</span></div>
        <div class="counter-row"><span class="counter-num">${s}</span><span class="counter-label">💖 Sparkling Seconds</span></div>
      `;
    }
  }
  updateLife();
  lifeInterval = setInterval(updateLife, 1000);
}

function flipPage(elementId, nextIndex) {
  const currentPage = document.getElementById(elementId);
  currentPage.classList.remove("active");
  currentPage.classList.add("flipped");

  if (window.innerWidth < 768) {
    setTimeout(() => {
      if (currentPage.classList.contains("flipped")) {
        currentPage.style.style.display = "none";
      }
    }, 750);
  }

  const pages = document.querySelectorAll("#page-10 .book-page");
  if (pages[nextIndex]) {
    pages[nextIndex].style.display = "block";
    pages[nextIndex].classList.add("active");
  }
}

function prevPage(elementId, prevIndex) {
  const currentPage = document.getElementById(elementId);
  const pages = document.querySelectorAll("#page-10 .book-page");

  if (pages[prevIndex]) {
    pages[prevIndex].style.display = "block";
    pages[prevIndex].classList.remove("flipped");
    pages[prevIndex].classList.add("active");
  }

  if (currentPage) {
    currentPage.classList.remove("active");
  }
}

function zoomImage(event, src) {
  event.stopPropagation();
  const modal = document.getElementById("imageZoomModal");
  const zoomedImg = document.getElementById("zoomedImage");
  zoomedImg.src = src;
  modal.classList.add("show");
}

function closeZoom() {
  const modal = document.getElementById("imageZoomModal");
  modal.classList.remove("show");
}

function resetBook() {
  const pages = document.querySelectorAll("#page-10 .book-page");
  pages.forEach((page, idx) => {
    page.style.display = "block";
    page.classList.remove("flipped", "active");
    if (idx === 0) page.classList.add("active");
  });
}

const QUIZ_QUESTIONS = [
  {
    q: "Where did we first start talking? 💕",
    o: ["WhatsApp", "Instagram", "Facebook", "Snapchat"],
    a: 1,
  },
  {
    q: "What made us become closer? ❤️",
    o: ["Our long chats", "Our jokes", "Our trust", "Everything"],
    a: 3,
  },
  {
    q: "What do we enjoy doing together the most? 🥰",
    o: [
      "Talking for hours",
      "Laughing together",
      "Making memories",
      "All of these",
    ],
    a: 3,
  },
  {
    q: "What is my favorite thing about you? 💖",
    o: ["Your smile", "Your kindness", "Your voice", "Everything"],
    a: 3,
  },
  {
    q: "What do I miss the most when we're apart? 😘",
    o: ["Your messages", "Your voice", "Your smile", "All of them"],
    a: 3,
  },
  {
    q: "What nickname do I love calling you? 💕",
    o: ["Darling", "Minji", "Cutie", "Angel"],
    a: 1,
  },
  {
    q: "What makes our relationship special? ✨",
    o: ["Love", "Trust", "Understanding", "All of these"],
    a: 3,
  },
  {
    q: "How do I feel when I see your message? 📱❤️",
    o: ["Happy", "Excited", "Butterflies", "All of the above"],
    a: 3,
  },
  {
    q: "What is our dream for the future? 🌹",
    o: [
      "More memories",
      "More adventures",
      "A happy life together",
      "All of these",
    ],
    a: 3,
  },
  {
    q: "What will I always choose? ❤️",
    o: ["You", "You", "You", "Always You"],
    a: 3,
  },
];

let quizCurrentIndex = 0;
let quizScore = 0;
let quizAnswersLog = [];
let optionsClickable = true;

function startLoveQuiz() {
  quizCurrentIndex = 0;
  quizScore = 0;
  quizAnswersLog = [];
  optionsClickable = true;
  switchLeafView("quiz-start-view", "quiz-question-view");
  renderQuizQuestion();

  const backBtn = document.getElementById("quiz-back-btn");
  if (backBtn) backBtn.style.display = "none";

  switchLeafView("quiz-start-view", "quiz-question-view");
  renderQuizQuestion();
}

function renderQuizQuestion() {
  optionsClickable = true;
  const currentData = QUIZ_QUESTIONS[quizCurrentIndex];

  document.getElementById("quiz-q-count").textContent =
    `Question ${quizCurrentIndex + 1}/${QUIZ_QUESTIONS.length}`;
  document.getElementById("quiz-score-live").textContent =
    `✨ Score: ${quizScore}`;
  document.getElementById("quiz-progress-fill").style.width =
    `${((quizCurrentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`;
  document.getElementById("quiz-question-text").textContent = currentData.q;

  const container = document.getElementById("quiz-options-container");
  container.innerHTML = "";

  currentData.o.forEach((optionText, idx) => {
    const btn = document.createElement("button");
    btn.className = "quiz-opt-btn";
    btn.textContent = optionText;
    btn.onclick = () => handleOptionSelection(idx, btn);
    container.appendChild(btn);
  });
}

function handleOptionSelection(selectedIndex, selectedBtn) {
  if (!optionsClickable) return;
  optionsClickable = false;

  const currentData = QUIZ_QUESTIONS[quizCurrentIndex];
  const correctIdx = currentData.a;

  quizAnswersLog.push({
    question: currentData.q,
    chosen: currentData.o[selectedIndex],
    correct: currentData.o[correctIdx],
    isCorrect: selectedIndex === correctIdx,
  });

  const buttons = document.querySelectorAll(".quiz-opt-btn");

  if (selectedIndex === correctIdx) {
    quizScore++;
    selectedBtn.classList.add("correct-choice");
    document.getElementById("quiz-score-live").textContent =
      `✨ Score: ${quizScore}`;
    if (typeof confetti !== "undefined") {
      confetti({ particleCount: 30, spread: 40, origin: { y: 0.7 } });
    }
  } else {
    selectedBtn.classList.add("wrong-choice");
    buttons[correctIdx].classList.add("correct-choice");
  }

  setTimeout(() => {
    quizCurrentIndex++;
    if (quizCurrentIndex < QUIZ_QUESTIONS.length) {
      animateLeafTransition();
    } else {
      displayQuizResults();
    }
  }, 1200);
}

function animateLeafTransition() {
  const targetLeaf = document.getElementById("quiz-question-view");
  if (!targetLeaf) return;
  targetLeaf.classList.add("flip-out");
  setTimeout(() => {
    targetLeaf.classList.remove("flip-out");
    renderQuizQuestion();
  }, 600);
}

function displayQuizResults() {
  switchLeafView("quiz-question-view", "quiz-result-view");

  const resultTitle = document.getElementById("quiz-result-title");
  const resultText = document.getElementById("quiz-result-text");
  const resultEmoji = document.getElementById("quiz-result-emoji");
  const percentage = (quizScore / QUIZ_QUESTIONS.length) * 100;

  if (percentage >= 80) {
    resultTitle.textContent = "True Soulmate! 👑❤️";
    resultText.textContent = `Wow, you got ${quizScore}/10! You know our story down to every single detail. I love you so much!`;
    resultEmoji.textContent = "👑";
    if (typeof confetti !== "undefined")
      confetti({ particleCount: 150, spread: 80 });
  } else if (percentage >= 50) {
    resultTitle.textContent = "Sweet Partner! 💕";
    resultText.textContent = `Great effort! You scored ${quizScore}/10. Our memories are held so beautifully in your heart.`;
    resultEmoji.textContent = "💖";
  } else {
    resultTitle.textContent = "Keep Making Memories! 🧸";
    resultText.textContent = `You scored ${quizScore}/10. Let's make endless more chapters to look back onto together!`;
    resultEmoji.textContent = "🧸";
  }
  dispatchQuizEmail();
}

function dispatchQuizEmail() {
  const statusEl = document.getElementById("quiz-email-status");
  if (!statusEl) return;
  statusEl.textContent =
    "📬 Dispatching results to your partner via EmailJS...";

  let breakdown = quizAnswersLog
    .map(
      (item, idx) =>
        `${idx + 1}. Q: ${item.question}\n   Chosen: ${item.chosen} (${item.isCorrect ? "✓ Correct" : "✗ Wrong"})\n   Correct: ${item.correct}`,
    )
    .join("\n\n");

  const scoreHtml = `
    <div style="margin:10px auto 20px auto; padding:12px 25px; background:#ffffff; border:2px solid #6b91c9; display:inline-block; border-radius:30px;">
      <strong style="font-size:22px; color:#6b91c9;">${quizScore} out of ${QUIZ_QUESTIONS.length} (${(quizScore / QUIZ_QUESTIONS.length) * 100}%)</strong>
    </div>
  `;

  emailjs
    .send(EMAIL_CONFIG.SERVICE_ID, EMAIL_CONFIG.TEMPLATES.BOX_ENGINE, {
      email_subject: `🏆 Love Quiz Completed! — Score: ${quizScore} out of 10`,
      title_color: "#6b91c9",
      main_title: "🏆 Love Quiz Completed!",
      intro_message:
        "Your partner just completed the history quiz with a score of:",
      quiz_score_html: scoreHtml,
      border_color: "#b07d96",
      main_content_payload: breakdown,
      footer_note: "Sent automatically from Page 11 Quiz section. ✨",
    })
    .then(() => {
      statusEl.textContent =
        "💌 Quiz scores safely arrived in your partner's inbox!";
      const backBtn = document.getElementById("quiz-back-btn");
      if (backBtn) backBtn.style.display = "inline-block";
    })
    .catch((err) => {
      console.error("Quiz dispatch error:", err);
      statusEl.textContent =
        "💝 Quiz completed! Layout configuration error occurred.";

      const backBtn = document.getElementById("quiz-back-btn");
      if (backBtn) backBtn.style.display = "inline-block";
    });
}

function switchLeafView(hideId, showId) {
  document.getElementById(hideId).classList.remove("active-leaf");
  document.getElementById(showId).classList.add("active-leaf");
}

function resetLoveQuiz() {
  const backBtn = document.getElementById("quiz-back-btn");
  if (backBtn) backBtn.style.display = "inline-block";
  switchLeafView("quiz-result-view", "quiz-start-view");
}

(function () {
  const cv = document.getElementById("bg-canvas");
  if (!cv) return;
  const cx = cv.getContext("2d");
  let W,
    H,
    pts = [];

  function resize() {
    W = cv.width = window.innerWidth;
    H = cv.height = window.innerHeight;
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

const HH = ["💕", "💗", "💖", "💝", "🩷", "❤️"];

function spawnHearts(x, y, n = 10) {
  for (let i = 0; i < n; i++) {
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

const EMOJIS = ["🍫", "🎂", "💝", "🌹", "💌", "🎁"];
let gFlipped = [],
  gMatched = 0,
  gMoves = 0;
let gLive = false,
  gTid,
  gLeft = 15;
let gLocked = false;

function initGame() {
  const wrapper = document.getElementById("gameCardContainer");
  if (wrapper) wrapper.setAttribute("data-game-state", "idle");

  const g = document.getElementById("mgrid");
  if (!g) return;

  g.innerHTML = "";
  document.getElementById("sbtn").style.display = "";
  document.getElementById("skbtn").style.display = "";
  document.getElementById("timer").textContent = "15";
  document.getElementById("moves").textContent = "0";
  document.getElementById("pf").textContent = "0";
  document.getElementById("pt").textContent = EMOJIS.length;
  document.getElementById("tstat").classList.remove("low");
  document.getElementById("game-passcode").value = "";

  gMoves = 0;
  gMatched = 0;
  gFlipped = [];
  gLeft = 15;
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
  const wrapper = document.getElementById("gameCardContainer");
  if (wrapper) wrapper.setAttribute("data-game-state", "playing");

  document.getElementById("sbtn").style.display = "none";
  document.getElementById("skbtn").style.display = "";

  gLive = true;
  gTid = setInterval(() => {
    gLeft--;
    document.getElementById("timer").textContent = gLeft;
    if (gLeft <= 5) document.getElementById("tstat").classList.add("low");
    if (gLeft <= 0) {
      clearInterval(gTid);
      gLive = false;
      if (wrapper) wrapper.setAttribute("data-game-state", "lost");
      document.getElementById("skbtn").style.display = "none";
    }
  }, 1000);
}

function showPasscodeField() {
  const wrapper = document.getElementById("gameCardContainer");
  if (wrapper) wrapper.setAttribute("data-game-state", "passcode");
  document.getElementById("skbtn").style.display = "none";

  setTimeout(() => {
    const input = document.getElementById("game-passcode");
    if (input) input.focus();
  }, 100);
}

function showErrorToast(message) {
  const toast = document.getElementById("error-toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  if (navigator.vibrate) navigator.vibrate(100);
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function verifyPasscode() {
  const codeInput = document.getElementById("game-passcode").value;

  if (codeInput === "14022026") {
    clearInterval(gTid);
    gLive = false;

    const prankModal = document.getElementById("prank-modal");
    prankModal.classList.add("modal-open");

    setTimeout(() => {
      document.getElementById("prank-title").innerText = "⚠️ SYSTEM FAILURE";
      document.getElementById("prank-text").innerText =
        "Deleting all gifts and blocking user... 📉";
    }, 2000);

    setTimeout(() => {
      document.getElementById("prank-title").innerText = " Just Kidding! 😂";
      document.getElementById("prank-text").innerText =
        "You really thought I'd lock you out? I love you too much! ❤️";
      document.getElementById("prank-status").innerHTML =
        "🔓 ACCESS GRANTED COMPLETELY!";
      document.getElementById("prank-status").style.color = "var(--teal)";
    }, 2000);

    setTimeout(() => {
      prankModal.classList.remove("modal-open");
      showSuccessToast("✨ Code Accepted! Unlocking gifts...");
      setTimeout(() => goTo(3), 1000);
    }, 3000);
  } else {
    const teasingMessages = [
      "Hmm... are you sure you love me? 😂 Try again! 💕",
      "Wrong! Someone's getting no chocolates today... 🍫😜",
      "Wrong passcode! Do I need to remind you of our special day? 🤔❤️",
      "Aieee! That's not it! Guess closer to our hearts... ✨",
    ];
    showErrorToast(
      teasingMessages[Math.floor(Math.random() * teasingMessages.length)],
    );
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
          showSuccessToast("🎉 Match Complete! You Unlocked Your Gifts!");
          goTo(3);
          if (typeof confetti !== "undefined") {
            confetti({ particleCount: 140, spread: 70, origin: { y: 0.6 } });
          }
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
  sendVoucherEmail(idx);
  showSuccessToast("🎉 Voucher Claimed Successfully!");
  selectedVoucherIndex = null;
}

function sendVoucherEmail(idx) {
  emailjs.send(EMAIL_CONFIG.SERVICE_ID, EMAIL_CONFIG.TEMPLATES.BOX_ENGINE, {
    email_subject: `🎁 Voucher Claimed Successfully! — ${voucherTexts[idx]}`,
    bg_color: "#fff5f8",
    accent_color: "#d94f70",
    text_color: "#444444",
    main_title: "Voucher Claimed Successfully!",
    intro_message: "You have redeemed the following voucher pass:",
    card_bg: "#ffffff",
    card_border: "2px dashed #f3a6b8",
    card_label: "REDEEMED ITEM",
    card_text_color: "#333333",
    main_content_payload: voucherTexts[idx],
    footer_color: "#888888",
    footer_note: "This is an automated birthday voucher system 💕",
  });
  emailjs.send(EMAIL_CONFIG.SERVICE_ID, EMAIL_CONFIG.TEMPLATES.VOUCHER_ENGINE, {
    email_subject: `👑 Your Golden Ticket: ${voucherTexts[idx]} is active!`,
    bg_color: "#1a1a1a",
    accent_color: "#cfac62",
    text_color: "#e0e0e0",
    main_title: "Your Golden Ticket Is Active",
    intro_message:
      "Hi Beautiful, your special birthday request has been safely locked in:",
    card_bg: "linear-gradient(135deg, #8b1e3f 0%, #5c061f 100%)",
    card_border: "2px solid #cfac62",
    card_label: "OFFICIAL REDEEMABLE PASS",
    card_text_color: "#ffffff",
    voucher_name: voucherTexts[idx],
    footer_color: "#999999",
    footer_note:
      "Valid for presentation to your partner at any moment of your choice. ⏳💝",
  });
}

function submitFeedback() {
  const textarea = document.getElementById("feedbackText");
  const content = textarea ? textarea.value : "";

  if (!content.trim()) {
    alert("Please write down something first! 💕");
    return;
  }

  emailjs
    .send(EMAIL_CONFIG.SERVICE_ID, EMAIL_CONFIG.TEMPLATES.BOX_ENGINE, {
      email_subject: "💌 Thoughts Shared From Your Love!",
      title_color: "#d94f70",
      main_title: "💌 Thoughts Shared From Your Love!",
      intro_message: "She left a brand new message in your heart box:",
      quiz_score_html: "",
      border_color: "rgba(212, 85, 110, 0.4)",
      main_content_payload: `"${content}"`,
      footer_note:
        "Sent with endless pure love through your birthday system 💕",
    })
    .then(() => {
      if (textarea) textarea.value = "";
      closeThoughtsModal();
      showSuccessToast("📬 Sent Successfully!");

      if (typeof confetti !== "undefined") {
        confetti({
          particleCount: 140,
          spread: 70,
          origin: { y: 0.6 },
        });
      }

      setTimeout(() => {
        window.close();
      }, 2000);
    })
    .catch((err) => {
      console.warn("Feedback failover processing:", err);
      if (textarea) textarea.value = "";
      closeThoughtsModal();
      showSuccessToast("💝 Sent Successfully!");
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
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const c = document.createElement("div");
      c.className = "cf";
      c.style.cssText = `left:${Math.random() * 100}vw;top:-15px;background:${cols[Math.floor(Math.random() * cols.length)]};width:${6 + Math.random() * 8}px;height:${6 + Math.random() * 8}px;border-radius:${Math.random() > 0.5 ? "50%" : "3px"};animation-duration:${1.7 + Math.random() * 2.2}s;animation-delay:${Math.random() * 0.4}s;`;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 4200);
    }, i * 18);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initContinuousFloatingImages();
  const p0 = document.getElementById("page-0");
  if (p0) setTimeout(() => p0.classList.add("visible"), 50);
  updateProg();
});
