
"use strict";

(function () {
  // ==========================================
  // KONFIGURASI
  // ==========================================

  const IMG = [
    "https://plcl.me/images/zazKN.jpg"
  ];

  const CONFIG = {
    interval: 7000,
    delay: 3600000,
    storageKey: "popup_delay_1h",
    popupId: "airbet88-popup",
    overlayId: "airbet88-popup-overlay",
    styleId: "airbet88-popup-style"
  };

  // Hanya tampil di homepage
  const path = location.pathname
    .replace(/\/+$/, "")
    .toLowerCase();

  if (path !== "" && path !== "/" && !path.includes("home")) {
    return;
  }

  // Cek jeda popup 1 jam
  try {
    const lastClosed = Number(
      localStorage.getItem(CONFIG.storageKey) || 0
    );

    if (lastClosed && Date.now() - lastClosed < CONFIG.delay) {
      return;
    }
  } catch (e) {}

  // ==========================================
  // CSS POPUP
  // ==========================================

  const CSS = `
    #${CONFIG.popupId},
    #${CONFIG.popupId} *,
    #${CONFIG.overlayId} {
      box-sizing: border-box;
    }

    #${CONFIG.overlayId} {
      position: fixed;
      inset: 0;
      z-index: 2147483646;
      background: rgba(0, 10, 12, .82);
    }

    #${CONFIG.popupId} {
      position: fixed;
      inset: 0;
      z-index: 2147483647;
      display: flex;
      align-items: safe center;
      justify-content: center;
      padding: 12px;
      overflow-y: auto;
      font-family: Arial, sans-serif;
      color: #f6fffd;
    }

    #${CONFIG.popupId} .popup-box {
      position: relative;
      width: min(100%, 430px);
      max-height: calc(100dvh - 24px);
      overflow-y: auto;
      padding: 12px;
      border: 1px solid rgba(232, 201, 134, .6);
      border-radius: 22px;
      background: linear-gradient(
        160deg,
        #164745 0%,
        #092b2c 45%,
        #041819 100%
      );
      box-shadow: 0 18px 50px rgba(0,0,0,.6);
      scrollbar-width: thin;
      scrollbar-color: #4b7770 transparent;
      animation: ayoPopupIn .3s ease both;
    }

    @keyframes ayoPopupIn {
      from {
        opacity: 0;
        transform: translateY(10px) scale(.98);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    /* HEADER */

    #${CONFIG.popupId} .brand {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      min-height: 57px;
      margin-bottom: 12px;
      padding: 2px 35px 2px 4px;
    }

    #${CONFIG.popupId} .brand-icon {
      display: grid;
      place-items: center;
      flex: none;
      width: 39px;
      height: 39px;
      border: 1px solid #e8c986;
      border-radius: 12px;
      background: #103334;
      color: #e8c986;
      font-size: 24px;
    }

    #${CONFIG.popupId} .brand-name {
      font-size: clamp(19px, 5vw, 23px);
      font-weight: 900;
      letter-spacing: .6px;
      line-height: 1.15;
      white-space: nowrap;
    }

    #${CONFIG.popupId} .brand-name span {
      color: #e8c986;
    }

    #${CONFIG.popupId} .brand-sub {
      margin-top: 4px;
      color: #b7dcd6;
      font-size: 10px;
      letter-spacing: .6px;
    }

    /* CLOSE */

    #${CONFIG.popupId} .close {
      position: absolute;
      top: 12px;
      right: 12px;
      z-index: 5;
      display: grid;
      place-items: center;
      width: 32px;
      height: 32px;
      padding: 0;
      border: 1px solid #e8c986;
      border-radius: 50%;
      background: #103536;
      color: #fff;
      font-size: 22px;
      line-height: 1;
      cursor: pointer;
    }

    /* IMAGE SLIDER */

    #${CONFIG.popupId} .slider {
      position: relative;
      width: 100%;
      aspect-ratio: 1080 / 1350;
      overflow: hidden;
      border: 1px solid rgba(232,201,134,.45);
      border-radius: 13px;
      background: #041819;
    }

    #${CONFIG.popupId} .slide-image {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    /* NAVIGASI */

    #${CONFIG.popupId} .nav {
      position: absolute;
      top: 50%;
      z-index: 2;
      display: grid;
      place-items: center;
      width: 27px;
      height: 36px;
      padding: 0;
      transform: translateY(-50%);
      border: 1px solid rgba(255,255,255,.25);
      border-radius: 8px;
      background: rgba(0,25,27,.65);
      color: #fff;
      font-size: 22px;
      line-height: 1;
      cursor: pointer;
      transition: background .2s;
    }

    #${CONFIG.popupId} .nav:hover {
      background: rgba(11,80,76,.9);
    }

    #${CONFIG.popupId} .prev {
      left: 5px;
    }

    #${CONFIG.popupId} .next {
      right: 5px;
    }

    /* DOT SLIDER */

    #${CONFIG.popupId} .dots {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      min-height: 19px;
      margin: 9px 0 7px;
    }

    #${CONFIG.popupId} .dot {
      width: 7px;
      height: 7px;
      padding: 0;
      border: none;
      border-radius: 10px;
      background: #647d79;
      cursor: pointer;
      transition: width .2s, background .2s;
    }

    #${CONFIG.popupId} .dot.active {
      width: 22px;
      background: #e8c986;
    }

    /* TITLE */

    #${CONFIG.popupId} .promo-title {
      margin: 0 0 12px;
      color: #e8c986;
      text-align: center;
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 1.5px;
    }

    /* ACTIONS */

    #${CONFIG.popupId} .actions {
      padding: 12px;
      border: 1px solid rgba(255,255,255,.13);
      border-radius: 14px;
      background: rgba(255,255,255,.035);
    }

    #${CONFIG.popupId} .actions-heading {
      margin: 0 0 10px;
      color: #c8e7e2;
      text-align: center;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 1.3px;
    }

    #${CONFIG.popupId} .btn-row {
      display: grid;
      grid-template-columns: repeat(2, minmax(0,1fr));
      gap: 9px;
    }

    #${CONFIG.popupId} .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      min-width: 0;
      min-height: 43px;
      padding: 9px 5px;
      border: 1px solid rgba(232,201,134,.65);
      border-radius: 11px;
      background: linear-gradient(
        135deg,
        #1b7771,
        #0b4544
      );
      color: #fff;
      text-decoration: none;
      text-align: center;
      font-size: 11px;
      font-weight: 800;
      line-height: 1.3;
      transition: filter .2s;
    }

    #${CONFIG.popupId} .btn:hover {
      filter: brightness(1.15);
    }

    #${CONFIG.popupId} .btn .icon {
      flex: none;
      color: #e8c986;
      font-size: 16px;
    }

    /* BUTTON TUTUP */

    #${CONFIG.popupId} .dismiss {
      display: block;
      width: 100%;
      min-height: 39px;
      margin-top: 9px;
      padding: 9px;
      border: 1px solid rgba(255,255,255,.16);
      border-radius: 10px;
      background: #061f20;
      color: #bdd8d3;
      font-size: 11px;
      font-weight: 800;
      cursor: pointer;
    }

    #${CONFIG.popupId} .dismiss:hover {
      background: #103536;
    }

    /* MOBILE */

    @media (max-width: 390px) {
      #${CONFIG.popupId} {
        padding: 8px;
      }

      #${CONFIG.popupId} .popup-box {
        padding: 9px;
        border-radius: 17px;
      }

      #${CONFIG.popupId} .brand {
        gap: 8px;
        margin-bottom: 9px;
      }

      #${CONFIG.popupId} .brand-icon {
        width: 34px;
        height: 34px;
      }

      #${CONFIG.popupId} .brand-name {
        font-size: 19px;
      }

      #${CONFIG.popupId} .brand-sub {
        font-size: 9px;
      }

      #${CONFIG.popupId} .btn {
        font-size: 10px;
      }

      #${CONFIG.popupId} .actions {
        padding: 9px;
      }
    }

    @media (max-height: 650px) {
      #${CONFIG.popupId} .popup-box {
        padding: 8px;
      }

      #${CONFIG.popupId} .brand {
        min-height: 45px;
        margin-bottom: 7px;
      }

      #${CONFIG.popupId} .dots {
        margin: 5px 0;
      }

      #${CONFIG.popupId} .promo-title {
        margin-bottom: 7px;
      }

      #${CONFIG.popupId} .actions {
        padding: 8px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      #${CONFIG.popupId} *,
      #${CONFIG.popupId} {
        animation: none !important;
        transition: none !important;
      }
    }
  `;

  // ==========================================
  // INITIALIZE POPUP
  // ==========================================

  function init() {
    if (document.getElementById(CONFIG.popupId)) return;

    // Inject CSS satu kali
    if (!document.getElementById(CONFIG.styleId)) {
      const style = document.createElement("style");
      style.id = CONFIG.styleId;
      style.textContent = CSS;
      document.head.appendChild(style);
    }

    // Overlay
    const overlay = document.createElement("div");
    overlay.id = CONFIG.overlayId;

    // Popup
    const popup = document.createElement("div");
    popup.id = CONFIG.popupId;

    popup.innerHTML = `
      <section class="popup-box"
        role="dialog"
        aria-modal="true"
        aria-label="Promo AIRBET88">

        <button
          class="close"
          type="button"
          aria-label="Tutup popup"
        >×</button>

        <header class="brand">
          <div class="brand-icon">⌕</div>

          <div>
            <div class="brand-name">
              AYOCEK<span>.COM</span>
            </div>

            <div class="brand-sub">
              Alat pencarian brand favoritmu
            </div>
          </div>
        </header>

        <div class="slider">
          <img
            class="slide-image"
            src="${IMG[0]}"
            alt="Promo AIRBET88 slide 1"
            decoding="async"
            width="1080"
            height="1350"
          >

          <button
            class="nav prev"
            type="button"
            aria-label="Gambar sebelumnya"
          >‹</button>

          <button
            class="nav next"
            type="button"
            aria-label="Gambar berikutnya"
          >›</button>
        </div>

        <div class="dots"
          aria-label="Navigasi gambar promosi">
        </div>

        <div class="promo-title">
          AIRBET88.COM · SENSASIONAL
        </div>

        <div class="actions">
          <p class="actions-heading">
            PILIH LAYANAN KAMU
          </p>

          <div class="btn-row">
            <a
              class="btn"
              href="https://linknewshortener-ai88.com/airbet88vip"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="icon">♛</span>
              MEMBERSHIP VIP
            </a>

            <a
              class="btn"
              href="https://linknewshortener-ai88.com/telegramrotator"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="icon">✆</span>
              HUBUNGI ADMIN
            </a>
          </div>

          <button class="dismiss" type="button">
            TUTUP
          </button>
        </div>
      </section>
    `;

    document.body.append(overlay, popup);

    // ==========================================
    // SLIDER
    // ==========================================

    const image = popup.querySelector(".slide-image");
    const dots = popup.querySelector(".dots");

    let currentIndex = 0;
    let timer = null;
    let closed = false;

    // Membuat indikator slider
    IMG.forEach((_, index) => {
      const dot = document.createElement("button");

      dot.type = "button";
      dot.className = "dot";
      dot.setAttribute(
        "aria-label",
        `Tampilkan gambar ${index + 1}`
      );

      dot.addEventListener("click", () => {
        showSlide(index);
        restartSlider();
      });

      dots.appendChild(dot);
    });

    // Menampilkan gambar
    function showSlide(index) {
      currentIndex = (index + IMG.length) % IMG.length;

      if (image.src !== IMG[currentIndex]) {
        image.src = IMG[currentIndex];
      }

      image.alt = `Promo AIRBET88 slide ${currentIndex + 1}`;

      Array.from(dots.children).forEach((dot, index) => {
        const active = index === currentIndex;

        dot.classList.toggle("active", active);
        dot.setAttribute("aria-current", String(active));
      });
    }

    // Timer slider
    function restartSlider() {
      clearInterval(timer);

      if (IMG.length > 1 && !closed) {
        timer = setInterval(() => {
          showSlide(currentIndex + 1);
        }, CONFIG.interval);
      }
    }

    // ==========================================
    // CLOSE POPUP
    // ==========================================

    function closePopup() {
      if (closed) return;

      closed = true;
      clearInterval(timer);

      popup.remove();
      overlay.remove();

      try {
        localStorage.setItem(
          CONFIG.storageKey,
          String(Date.now())
        );
      } catch (e) {}
    }

    // ==========================================
    // EVENTS
    // ==========================================

    popup.querySelector(".prev").addEventListener(
      "click",
      () => {
        showSlide(currentIndex - 1);
        restartSlider();
      }
    );

    popup.querySelector(".next").addEventListener(
      "click",
      () => {
        showSlide(currentIndex + 1);
        restartSlider();
      }
    );

    popup.querySelector(".close").addEventListener(
      "click",
      closePopup
    );

    popup.querySelector(".dismiss").addEventListener(
      "click",
      closePopup
    );

    overlay.addEventListener("click", closePopup);

    // Mulai slider
    showSlide(0);
    restartSlider();
  }

  // ==========================================
  // DOCUMENT READY
  // ==========================================

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      init,
      { once: true }
    );
  } else {
    init();
  }
})();
