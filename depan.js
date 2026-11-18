
(function () {
  "use strict";

  const CONFIG = {
    cooldown: 60 * 60 * 1000,
    storageKey: "airbet88_popup_v6_closed",
    interval: 7000,
    rootId: "airbet88-glass-root",
    styleId: "airbet88-glass-style",

    pwa: "https://linkairbet88pro20.xyz/download-lite-apps",
    apk: "https://dk4jo88env94i.cloudfront.net/airbet88.apk",
    ayocek: "https://linknewshortener-ai88.com/searchingairbet88",
    vip: "https://linknewshortener-ai88.com/airbet88vip",
    admin: "https://linknewshortener-ai88.com/telegramrotator",
    quick: "https://linknewshortener-ai88.com/quickacces",

    logo: "https://www.image2url.com/r2/default/images/1794970107198-cf9d9028-92cb-41bc-ad06-c3769fd0a861.png",

    images: [
      "https://www.image2url.com/r2/default/images/1794560917702-dddf833f-cc05-4f28-8137-c1c842be8144.jpg",
      "https://www.image2url.com/r2/default/images/1792805579769-2ba37971-e783-48bd-be45-3db313b1bc2f.jpg",
      "https://www.image2url.com/r2/default/images/1792805627613-bd32c429-7207-49eb-b198-914de4b62796.jpg",
      "https://www.image2url.com/r2/default/images/1794560761779-13612146-c773-4f19-b6db-94867c98a535.jpg"
    ]
  };

  // Sama seperti script awal: homepage saja.
  const path = location.pathname.replace(/\/+$/, "").toLowerCase();
  if (path && !path.includes("home")) return;

  if (document.getElementById(CONFIG.rootId)) return;

  try {
    const last = Number(localStorage.getItem(CONFIG.storageKey) || 0);
    if (last && Date.now() - last < CONFIG.cooldown) return;
  } catch (_) {}

  const CSS = `
    #${CONFIG.rootId}, #${CONFIG.rootId} * {
      box-sizing: border-box;
    }

    #${CONFIG.rootId} {
      --mint: #8cebdc;
      --gold: #ead3a0;
      --white: #f6fffd;
      --muted: #b9cecb;
      position: fixed;
      inset: 0;
      z-index: 2147483647;
      display: grid;
      place-items: center;
      padding: 12px;
      background: rgba(0, 15, 18, .79);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      font-family: -apple-system, BlinkMacSystemFont,
        "Segoe UI", Arial, sans-serif;
      color: var(--white);
      animation: abFade .3s ease;
    }

    #${CONFIG.rootId} [hidden] {
      display: none !important;
    }

    #${CONFIG.rootId} button,
    #${CONFIG.rootId} a {
      -webkit-tap-highlight-color: transparent;
      font-family: inherit;
    }

    #${CONFIG.rootId} button {
      cursor: pointer;
    }

    #${CONFIG.rootId} button:focus-visible,
    #${CONFIG.rootId} a:focus-visible {
      outline: 2px solid var(--gold);
      outline-offset: 3px;
    }

    #${CONFIG.rootId} .ab-modal {
      position: relative;
      width: min(100%, 440px);
      max-height: calc(100vh - 24px);
      max-height: calc(100dvh - 24px);
      overflow-y: auto;
      overscroll-behavior: contain;
      padding: 22px 18px;
      border: 1px solid rgba(255,255,255,.52);
      border-radius: 27px;
      background:
        linear-gradient(145deg,
          rgba(41, 89, 89, .95),
          rgba(9, 34, 39, .97) 70%);
      box-shadow:
        inset 0 1px rgba(255,255,255,.35),
        0 30px 90px rgba(0,0,0,.55);
      animation: abEnter .45s cubic-bezier(.2,1,.3,1);
      scrollbar-width: thin;
      scrollbar-color: #668b88 transparent;
    }

    #${CONFIG.rootId} .ab-close {
      position: absolute;
      top: 15px;
      right: 15px;
      width: 35px;
      height: 35px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,.4);
      background: rgba(255,255,255,.15);
      color: white;
      font-size: 23px;
      line-height: 1;
      z-index: 3;
    }

    #${CONFIG.rootId} .ab-eyebrow {
      color: var(--gold);
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 2px;
      text-align: center;
    }

    #${CONFIG.rootId} .ab-title {
      margin: 9px 38px 7px;
      text-align: center;
      font-size: 23px;
      font-weight: 850;
      line-height: 1.2;
    }

    #${CONFIG.rootId} .ab-desc {
      margin: 0 auto 20px;
      text-align: center;
      color: var(--muted);
      font-size: 12px;
      line-height: 1.7;
      max-width: 310px;
    }

    #${CONFIG.rootId} .ab-install {
      background:
        linear-gradient(150deg,
          rgba(250,253,253,.98),
          rgba(226,233,235,.98));
      color: #172b30;
      border-radius: 22px;
      padding: 25px 17px 17px;
    }

    #${CONFIG.rootId} .ab-install .ab-title {
      color: #172b30;
      font-size: 18px;
      margin-bottom: 17px;
    }

    #${CONFIG.rootId} .ab-install .ab-close {
      background: #e4edf2;
      border-color: #bdd4e1;
      color: #708d9c;
    }

    #${CONFIG.rootId} .ab-choice {
      position: relative;
      display: flex;
      align-items: center;
      gap: 15px;
      width: 100%;
      min-height: 122px;
      padding: 16px 13px;
      margin-bottom: 13px;
      border: 1px solid #bec8cb;
      border-radius: 17px;
      background: linear-gradient(135deg,#e5e8e9,#d1d6d8);
      text-align: left;
      color: #182a2e;
      overflow: hidden;
      transition: transform .2s, box-shadow .2s;
    }

    #${CONFIG.rootId} .ab-choice:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 25px rgba(0,0,0,.14);
    }

    #${CONFIG.rootId} .ab-choice:active,
    #${CONFIG.rootId} .ab-button:active {
      transform: scale(.98);
    }

    #${CONFIG.rootId} .ab-choice-icon {
      flex: 0 0 85px;
      height: 91px;
      border: 1px solid #bac6c9;
      border-radius: 16px;
      display: grid;
      place-items: center;
      align-content: center;
      gap: 4px;
      background: linear-gradient(140deg,#f1f3f3,#dce3e4);
      color: #609c9e;
      font-size: 32px;
    }

    #${CONFIG.rootId} .ab-choice-icon small {
      font-size: 17px;
      font-weight: 900;
    }

    #${CONFIG.rootId} .ab-choice-copy {
      min-width: 0;
    }

    #${CONFIG.rootId} .ab-choice-copy strong {
      display: block;
      color: #538f94;
      font-size: 15px;
      margin-bottom: 7px;
    }

    #${CONFIG.rootId} .ab-choice-copy span {
      display: block;
      font-size: 12px;
      line-height: 1.55;
    }

    #${CONFIG.rootId} .ab-ribbon {
      position: absolute;
      right: -35px;
      top: 12px;
      transform: rotate(39deg);
      background: #ff6900;
      color: white;
      padding: 5px 36px;
      font-size: 10px;
      font-weight: 800;
    }

    #${CONFIG.rootId} .ab-textbutton {
      display: block;
      margin: 10px auto;
      padding: 8px;
      background: transparent;
      border: none;
      color: #397c82;
      text-decoration: underline;
      font-size: 12px;
    }

    #${CONFIG.rootId} .ab-button {
      width: 100%;
      min-height: 47px;
      padding: 12px 15px;
      border: 1px solid rgba(255,255,255,.4);
      border-radius: 15px;
      background: linear-gradient(120deg,#b5f8e8,#64c9be);
      color: #082e32;
      font-size: 13px;
      font-weight: 850;
      transition: transform .2s, filter .2s;
    }

    #${CONFIG.rootId} .ab-button:hover {
      filter: brightness(1.07);
    }

    #${CONFIG.rootId} .ab-skip {
      background: #e2f1ef;
      border-color: #bdd9d5;
      color: #376e70;
      margin-top: 10px;
    }

    #${CONFIG.rootId} .ab-guide {
      position: absolute;
      inset: 0;
      z-index: 5;
      padding: 70px 21px 22px;
      overflow-y: auto;
      border-radius: 22px;
      background: linear-gradient(150deg,#184349,#081f27);
      color: white;
      animation: abEnter .3s ease;
    }

    #${CONFIG.rootId} .ab-back {
      position: absolute;
      left: 18px;
      top: 17px;
      padding: 9px 13px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,.3);
      background: rgba(255,255,255,.13);
      color: white;
      font-size: 13px;
    }

    #${CONFIG.rootId} .ab-guide h3 {
      margin: 8px 0 16px;
      color: var(--gold);
      font-size: 23px;
      line-height: 1.25;
    }

    #${CONFIG.rootId} .ab-guide p,
    #${CONFIG.rootId} .ab-guide li {
      font-size: 13px;
      line-height: 1.8;
      color: #dcebe8;
    }

    #${CONFIG.rootId} .ab-guide ol {
      padding-left: 22px;
    }

    #${CONFIG.rootId} .ab-guide li {
      margin-bottom: 7px;
    }

    #${CONFIG.rootId} .ab-guide-card {
      border: 1px solid rgba(255,255,255,.18);
      background: rgba(255,255,255,.08);
      border-radius: 15px;
      padding: 13px;
      margin-bottom: 12px;
    }

    #${CONFIG.rootId} .ab-guide-card strong {
      color: #b8f8e9;
    }

    #${CONFIG.rootId} .ab-guide-card p {
      margin: 7px 0 0;
    }

    #${CONFIG.rootId} .ab-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 65px;
      margin: 0 43px 15px;
      text-align: center;
    }

    #${CONFIG.rootId} .ab-logo img {
      max-width: 100%;
      max-height: 64px;
      object-fit: contain;
    }

    #${CONFIG.rootId} .ab-logo-fallback {
      color: var(--gold);
      font-weight: 900;
      font-size: 23px;
    }

    #${CONFIG.rootId} .ab-slider {
      position: relative;
      width: 100%;
      aspect-ratio: 1080 / 1350;
      border-radius: 18px;
      overflow: hidden;
      background: #092b31;
      border: 1px solid rgba(255,255,255,.35);
    }

    #${CONFIG.rootId} .ab-slide {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }

    #${CONFIG.rootId} .ab-fallback {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      padding: 20px;
      text-align: center;
      background: linear-gradient(145deg,#155b59,#061e29);
      color: white;
    }

    #${CONFIG.rootId} .ab-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 35px;
      height: 46px;
      border: 1px solid rgba(255,255,255,.4);
      border-radius: 12px;
      background: rgba(0,25,30,.7);
      color: white;
      font-size: 27px;
    }

    #${CONFIG.rootId} .ab-prev { left: 8px; }
    #${CONFIG.rootId} .ab-next { right: 8px; }

    #${CONFIG.rootId} .ab-dots {
      display: flex;
      justify-content: center;
      gap: 7px;
      margin: 13px 0;
    }

    #${CONFIG.rootId} .ab-dot {
      width: 8px;
      height: 8px;
      padding: 0;
      border: none;
      border-radius: 20px;
      background: #789794;
    }

    #${CONFIG.rootId} .ab-dot.active {
      width: 25px;
      background: var(--gold);
    }

    #${CONFIG.rootId} .ab-actions {
      display: grid;
      grid-template-columns: repeat(2,minmax(0,1fr));
      gap: 10px;
      margin-bottom: 12px;
    }

    #${CONFIG.rootId} .ab-actions a {
      display: grid;
      place-items: center;
      min-height: 52px;
      padding: 10px 6px;
      border: 1px solid rgba(255,255,255,.42);
      border-radius: 15px;
      background: rgba(255,255,255,.12);
      color: white;
      font-size: 11px;
      font-weight: 800;
      text-align: center;
      text-decoration: none;
      transition: background .2s, transform .2s;
    }

    #${CONFIG.rootId} .ab-actions a:hover {
      background: rgba(255,255,255,.24);
      transform: translateY(-2px);
    }

    #${CONFIG.rootId} .ab-dismiss {
      background: rgba(255,255,255,.12);
      color: white;
      border-color: rgba(255,255,255,.45);
      font-size: 15px;
    }

    #${CONFIG.rootId} .ab-footer {
      margin-top: 16px;
      text-align: center;
      color: #c3d5d2;
      font-size: 11px;
    }

    @keyframes abFade {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes abEnter {
      from {
        opacity: 0;
        transform: translateY(30px) scale(.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @media (max-width: 390px) {
      #${CONFIG.rootId} .ab-modal {
        padding: 17px 12px;
        border-radius: 21px;
      }

      #${CONFIG.rootId} .ab-choice {
        gap: 10px;
        padding: 12px 10px;
      }

      #${CONFIG.rootId} .ab-choice-icon {
        flex-basis: 69px;
        height: 77px;
      }

      #${CONFIG.rootId} .ab-choice-copy span {
        font-size: 11px;
      }

      #${CONFIG.rootId} .ab-actions a {
        font-size: 10px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      #${CONFIG.rootId},
      #${CONFIG.rootId} * {
        animation-duration: .01ms !important;
        transition-duration: .01ms !important;
      }
    }
  `;

  let root;
  let install;
  let promo;
  let guide;
  let currentIndex = 0;
  let slideTimer = null;
  let loadToken = 0;
  let previousFocus = null;
  let currentStage = "install";

  const isIOS =
    /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" &&
      navigator.maxTouchPoints > 1);

  const $ = id => root.querySelector("#" + id);

  function create() {
    if (document.getElementById(CONFIG.rootId)) return;

    previousFocus = document.activeElement;

    const style = document.createElement("style");
    style.id = CONFIG.styleId;
    style.textContent = CSS;
    document.head.appendChild(style);

    root = document.createElement("div");
    root.id = CONFIG.rootId;

    root.innerHTML = `
      <section class="ab-modal ab-install" id="abInstall"
        role="dialog" aria-modal="true"
        aria-label="Unduh aplikasi AIRBET88">

        <button class="ab-close" id="abCloseInstall"
          aria-label="Tutup pilihan aplikasi">×</button>

        <h2 class="ab-title">UNDUH APPS</h2>

        <button class="ab-choice" id="abPwa">
          <span class="ab-choice-icon">
            ⇩
            <small>PWA</small>
          </span>
          <span class="ab-choice-copy">
            <strong>Lite Version</strong>
            <span>
              Akses instan, ringan, dan dapat
              ditambahkan ke layar utama HP.
            </span>
          </span>
          <span class="ab-ribbon">Rekomendasi</span>
        </button>

        <button class="ab-choice" id="abApk">
          <span class="ab-choice-icon">
            ♟
            <small>APK</small>
          </span>
          <span class="ab-choice-copy">
            <strong>Full Version</strong>
            <span>
              Download aplikasi Android.
              Pengguna iPhone akan diarahkan ke PWA.
            </span>
          </span>
        </button>

        <button class="ab-textbutton" id="abCompare">
          ⓘ Apa perbedaan PWA dan APK?
        </button>

        <button class="ab-button ab-skip" id="abSkip">
          Lewati dan Lihat Promosi →
        </button>

        <div class="ab-guide" id="abGuide" hidden>
          <button class="ab-back" id="abBack">
            ← Kembali
          </button>

          <div class="ab-eyebrow">AIRBET88 • PANDUAN</div>
          <div id="abGuideContent"></div>

          <button class="ab-button" id="abGuideCTA">
            Mengerti
          </button>
        </div>
      </section>

      <section class="ab-modal" id="abPromo"
        role="dialog" aria-modal="true"
        aria-label="Promosi AIRBET88" hidden>

        <button class="ab-close" id="abClosePromo"
          aria-label="Tutup promosi">×</button>

        <div class="ab-logo">
          <img id="abLogo" alt="Logo AIRBET88">
          <span class="ab-logo-fallback"
            id="abLogoFallback" hidden>AIRBET88</span>
        </div>

        <div class="ab-slider" id="abSlider">
          <img class="ab-slide" id="abSlide"
            alt="Gambar promosi AIRBET88" hidden>

          <div class="ab-fallback" id="abFallback">
            <div>
              <strong>AIRBET88</strong>
              <p>Memuat gambar promosi...</p>
            </div>
          </div>

          <button class="ab-arrow ab-prev" id="abPrev"
            aria-label="Gambar sebelumnya">‹</button>
          <button class="ab-arrow ab-next" id="abNext"
            aria-label="Gambar berikutnya">›</button>
        </div>

        <div class="ab-dots" id="abDots"></div>

        <div class="ab-actions">
          <a id="abAyocek" target="_blank"
            rel="noopener noreferrer">⌕ AYOCEK.COM</a>
          <a id="abVip" target="_blank"
            rel="noopener noreferrer">♛ MEMBERSHIP VIP</a>
          <a id="abAdmin" target="_blank"
            rel="noopener noreferrer">✉ HUBUNGI ADMIN</a>
          <a id="abQuick" target="_blank"
            rel="noopener noreferrer">↗ QUICK ACCESS</a>
        </div>

        <button class="ab-button ab-dismiss" id="abFinish">
          TUTUP PROMO
        </button>

        <div class="ab-footer">
          © 2026 AIRBET88. All rights reserved.
        </div>
      </section>
    `;

    document.body.appendChild(root);

    install = $("abInstall");
    promo = $("abPromo");
    guide = $("abGuide");

    $("abLogo").src = CONFIG.logo;
    $("abLogo").onerror = () => {
      $("abLogo").hidden = true;
      $("abLogoFallback").hidden = false;
    };

    $("abAyocek").href = CONFIG.ayocek;
    $("abVip").href = CONFIG.vip;
    $("abAdmin").href = CONFIG.admin;
    $("abQuick").href = CONFIG.quick;

    $("abCloseInstall").onclick = showPromo;
    $("abSkip").onclick = showPromo;
    $("abClosePromo").onclick = closeAll;
    $("abFinish").onclick = closeAll;

    $("abPwa").onclick = () => {
      window.location.assign(CONFIG.pwa);
    };

    $("abApk").onclick = downloadAPK;
    $("abCompare").onclick = showComparison;
    $("abBack").onclick = hideGuide;

    $("abPrev").onclick = () => changeSlide(-1);
    $("abNext").onclick = () => changeSlide(1);

    CONFIG.images.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "ab-dot";
      dot.type = "button";
      dot.setAttribute("aria-label", "Gambar " + (index + 1));
      dot.onclick = () => {
        currentIndex = index;
        renderSlide();
        restartSlider();
      };
      $("abDots").appendChild(dot);
    });

    let touchStart = 0;

    $("abSlider").addEventListener("touchstart", event => {
      touchStart = event.changedTouches[0].screenX;
    }, { passive: true });

    $("abSlider").addEventListener("touchend", event => {
      const diff = event.changedTouches[0].screenX - touchStart;
      if (Math.abs(diff) > 45) {
        changeSlide(diff < 0 ? 1 : -1);
      }
    }, { passive: true });

    document.addEventListener("keydown", onKeydown);
    document.addEventListener("visibilitychange", onVisibility);

    $("abCloseInstall").focus({ preventScroll: true });
  }

  function downloadAPK() {
    if (isIOS) {
      // iPhone langsung menuju halaman PWA.
      window.location.assign(CONFIG.pwa);
      return;
    }

    // Android: browser membuka file APK.
    const link = document.createElement("a");
    link.href = CONFIG.apk;
    link.download = "airbet88.apk";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function showComparison() {
    showGuide(`
      <h3>PWA vs APK</h3>

      <div class="ab-guide-card">
        <strong>Lite Version (PWA)</strong>
        <p>
          Versi website yang bisa ditambahkan ke
          layar utama. Biasanya lebih ringan,
          tidak perlu mengunduh APK, dan
          pembaruannya mengikuti website.
        </p>
      </div>

      <div class="ab-guide-card">
        <strong>Full Version (APK)</strong>
        <p>
          File instalasi khusus Android.
          Memerlukan unduhan dan persetujuan
          pemasangan. Fitur dan ukuran bergantung
          pada aplikasi yang disediakan.
        </p>
      </div>

      <div class="ab-guide-card">
        <strong>Pengguna iPhone</strong>
        <p>
          Gunakan Lite Version (PWA).
          Buka halaman di Safari, kemudian
          pilih Bagikan → Tambahkan ke Layar Utama
          → Tambah.
        </p>
      </div>
    `, "Mengerti", hideGuide);
  }

  function showGuide(content, buttonText, handler) {
    $("abGuideContent").innerHTML = content;
    $("abGuideCTA").textContent = buttonText;
    $("abGuideCTA").onclick = handler;
    guide.hidden = false;
    $("abBack").focus();
  }

  function hideGuide() {
    guide.hidden = true;
    $("abCompare").focus();
  }

  function showPromo() {
    guide.hidden = true;
    install.hidden = true;
    promo.hidden = false;
    currentStage = "promo";

    currentIndex = 0;
    renderSlide();
    restartSlider();

    $("abClosePromo").focus({ preventScroll: true });
  }

  function renderSlide() {
    const token = ++loadToken;
    const image = $("abSlide");
    const fallback = $("abFallback");

    image.hidden = true;
    fallback.hidden = false;
    fallback.querySelector("p").textContent =
      "Memuat gambar promosi...";

    const loader = new Image();

    loader.onload = () => {
      if (token !== loadToken || !root.isConnected) return;

      image.src = loader.src;
      image.alt = "Promo AIRBET88 " + (currentIndex + 1);
      image.hidden = false;
      fallback.hidden = true;
    };

    loader.onerror = () => {
      if (token !== loadToken || !root.isConnected) return;

      fallback.querySelector("p").textContent =
        "Gambar belum tersedia. Silakan coba lagi nanti.";
    };

    loader.src = CONFIG.images[currentIndex];

    Array.from($("abDots").children).forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
      dot.setAttribute("aria-current", String(i === currentIndex));
    });
  }

  function changeSlide(direction) {
    currentIndex =
      (currentIndex + direction + CONFIG.images.length) %
      CONFIG.images.length;

    renderSlide();
    restartSlider();
  }

  function restartSlider() {
    clearInterval(slideTimer);

    if (currentStage !== "promo" || document.hidden) return;

    slideTimer = setInterval(() => {
      currentIndex = (currentIndex + 1) % CONFIG.images.length;
      renderSlide();
    }, CONFIG.interval);
  }

  function onVisibility() {
    restartSlider();
  }

  function onKeydown(event) {
    if (!root || !root.isConnected) return;

    if (event.key === "Escape") {
      if (!guide.hidden) {
        hideGuide();
      } else if (currentStage === "install") {
        showPromo();
      } else {
        closeAll();
      }
      return;
    }

    if (currentStage === "promo") {
      if (event.key === "ArrowRight") changeSlide(1);
      if (event.key === "ArrowLeft") changeSlide(-1);
    }

    if (event.key !== "Tab") return;

    const scope = !guide.hidden
      ? guide
      : currentStage === "install" ? install : promo;

    const elements = Array.from(
      scope.querySelectorAll("button:not([disabled]), a[href]")
    ).filter(el => el.getClientRects().length > 0);

    if (!elements.length) return;

    const first = elements[0];
    const last = elements[elements.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function closeAll() {
    clearInterval(slideTimer);
    ++loadToken;

    document.removeEventListener("keydown", onKeydown);
    document.removeEventListener("visibilitychange", onVisibility);

    try {
      localStorage.setItem(
        CONFIG.storageKey,
        String(Date.now())
      );
    } catch (_) {}

    root.remove();
    document.getElementById(CONFIG.styleId)?.remove();

    if (previousFocus && previousFocus.isConnected) {
      previousFocus.focus();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", create, {
      once: true
    });
  } else {
    create();
  }
})();
