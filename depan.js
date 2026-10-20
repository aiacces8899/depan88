
"use strict";

(function () {
  const IMG = [
    "https://plcl.me/images/zazKN.jpg",
    "https://plcl.me/images/bRRpQ.jpg",
    "https://plcl.me/images/LfWm4.png"
  ];

  const DELAY_KEY = "popup_delay_1h";
  const SLIDER_INTERVAL = 7000;
  const STYLE_ID = "airbet88-popup-style";
  const POPUP_ID = "airbet88-popup";
  const OVERLAY_ID = "airbet88-popup-overlay";

  // Hanya tampil di homepage
  const path = location.pathname.replace(/\/+$/, "").toLowerCase();

  if (path !== "" && path !== "/" && !path.includes("home")) {
    return;
  }

  // Jeda popup 1 jam setelah ditutup
  try {
    const lastClosed = Number(localStorage.getItem(DELAY_KEY) || 0);

    if (Date.now() - lastClosed < 3600000) {
      return;
    }
  } catch (e) {}

  function init() {
    if (document.getElementById(POPUP_ID)) return;

    // CSS otomatis dimasukkan melalui JavaScript
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement("style");
      style.id = STYLE_ID;

      style.textContent = `
        #${OVERLAY_ID},
        #${POPUP_ID},
        #${POPUP_ID} * {
          box-sizing: border-box;
        }

        #${OVERLAY_ID} {
          position: fixed;
          inset: 0;
          z-index: 2147483646;
          background: rgba(0,9,12,.85);
        }

        #${POPUP_ID} {
          position: fixed;
          inset: 0;
          z-index: 2147483647;
          display: grid;
          place-items: center;
          padding: 12px;
          overflow-y: auto;
          font-family: Arial, sans-serif;
          color: #f6fffd;
        }

        #${POPUP_ID} .popup-box {
          position: relative;
          width: min(100%,430px);
          max-height: calc(100dvh - 24px);
          overflow-y: auto;
          padding: 13px;
          border: 1px solid rgba(232,201,134,.55);
          border-radius: 22px;
          background: linear-gradient(
            160deg,
            #154544,
            #092c2e 48%,
            #041617
          );
          box-shadow: 0 18px 55px #000a;
          scrollbar-width: thin;
          animation: popupAppear .3s ease;
        }

        @keyframes popupAppear {
          from {
            opacity: 0;
            transform: translateY(12px) scale(.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        #${POPUP_ID} .brand {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 7px 35px 14px 5px;
          text-align: center;
        }

        #${POPUP_ID} .brand-icon {
          display: grid;
          place-items: center;
          flex: none;
          width: 40px;
          height: 40px;
          border: 1px solid #e8c986;
          border-radius: 12px;
          background: #102f30;
          color: #e8c986;
          font-size: 25px;
        }

        #${POPUP_ID} .brand-name {
          font-size: 23px;
          font-weight: 900;
          letter-spacing: 1px;
          line-height: 1.1;
        }

        #${POPUP_ID} .brand-name span {
          color: #e8c986;
        }

        #${POPUP_ID} .brand-sub {
          margin-top: 5px;
          color: #b7dcd6;
          font-size: 10px;
          letter-spacing: 1px;
        }

        #${POPUP_ID} .close {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 5;
          width: 32px;
          height: 32px;
          padding: 0;
          border: 1px solid #e8c986;
          border-radius: 50%;
          background: #133b3b;
          color: white;
          font-size: 22px;
          cursor: pointer;
        }

        #${POPUP_ID} .slider {
          position: relative;
          width: 100%;
          aspect-ratio: 1080 / 1350;
          overflow: hidden;
          border: 1px solid #e8c98670;
          border-radius: 14px;
          background: #031314;
        }

        #${POPUP_ID} .slide-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        #${POPUP_ID} .nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 34px;
          height: 40px;
          padding: 0;
          border: 1px solid #ffffff60;
          border-radius: 10px;
          background: #092d2ddd;
          color: white;
          font-size: 26px;
          cursor: pointer;
        }

        #${POPUP_ID} .prev {
          left: 8px;
        }

        #${POPUP_ID} .next {
          right: 8px;
        }

        #${POPUP_ID} .dots {
          display: flex;
          justify-content: center;
          gap: 7px;
          margin: 11px 0;
        }

        #${POPUP_ID} .dot {
          width: 8px;
          height: 8px;
          padding: 0;
          border: 0;
          border-radius: 10px;
          background: #647d79;
          cursor: pointer;
        }

        #${POPUP_ID} .dot.active {
          width: 23px;
          background: #e8c986;
        }

        #${POPUP_ID} .promo-title {
          margin: 2px 0 12px;
          text-align: center;
          color: #e8c986;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        #${POPUP_ID} .actions {
          padding: 12px;
          border: 1px solid #ffffff20;
          border-radius: 14px;
          background: #ffffff08;
        }

        #${POPUP_ID} .actions-heading {
          margin: 0 0 10px;
          text-align: center;
          color: #c8e7e2;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
        }

        #${POPUP_ID} .btn-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 9px;
        }

        #${POPUP_ID} .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          min-height: 43px;
          padding: 9px 6px;
          border: 1px solid #e8c9868c;
          border-radius: 10px;
          background: linear-gradient(
            135deg,
            #1c7771,
            #0b4544
          );
          color: white;
          text-decoration: none;
          text-align: center;
          font-size: 11px;
          font-weight: 800;
          transition: filter .2s;
        }

        #${POPUP_ID} .btn:hover {
          filter: brightness(1.15);
        }

        #${POPUP_ID} .btn .icon {
          font-size: 17px;
          color: #e8c986;
        }

        #${POPUP_ID} .dismiss {
          display: block;
          width: 100%;
          margin-top: 9px;
          padding: 10px;
          border: 1px solid #ffffff25;
          border-radius: 10px;
          background: #061f20;
          color: #bdd8d3;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        @media (max-height: 650px) {
          #${POPUP_ID} .popup-box {
            padding: 8px;
          }

          #${POPUP_ID} .brand {
            padding-bottom: 7px;
          }

          #${POPUP_ID} .actions {
            padding: 7px;
          }

          #${POPUP_ID} .dots {
            margin: 6px 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          #${POPUP_ID} .popup-box {
            animation: none;
          }
        }
      `;

      document.head.appendChild(style);
    }

    // Overlay
    const overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;

    // Popup
    const popup = document.createElement("div");
    popup.id = POPUP_ID;

    popup.innerHTML = `
      <section class="popup-box"
        role="dialog"
        aria-modal="true"
        aria-label="Promo AIRBET88">

        <button class="close" type="button"
          aria-label="Tutup popup">×</button>

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
          >

          <button class="nav prev" type="button"
            aria-label="Gambar sebelumnya">‹</button>

          <button class="nav next" type="button"
            aria-label="Gambar berikutnya">›</button>
        </div>

        <div class="dots"></div>

        <div class="promo-title">
          AIRBET88.COM · SENSASIONAL
        </div>

        <div class="actions">
          <p class="actions-heading">
            PILIH LAYANAN KAMU
          </p>

          <div class="btn-row">
            <a class="btn"
              href="https://linknewshortener-ai88.com/airbet88vip"
              target="_blank"
              rel="noopener noreferrer">
              <span class="icon">♛</span>
              MEMBERSHIP VIP
            </a>

            <a class="btn"
              href="https://linknewshortener-ai88.com/telegramrotator"
              target="_blank"
              rel="noopener noreferrer">
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

    // Slider
    const img = popup.querySelector(".slide-image");
    const dots = popup.querySelector(".dots");

    let currentIndex = 0;
    let sliderTimer = null;

    IMG.forEach((_, i) => {
      const dot = document.createElement("button");

      dot.type = "button";
      dot.className = "dot";
      dot.setAttribute("aria-label", `Slide ${i + 1}`);

      dot.addEventListener("click", () => {
        showSlide(i);
        restartSlider();
      });

      dots.appendChild(dot);
    });

    function showSlide(i) {
      currentIndex = (i + IMG.length) % IMG.length;

      img.src = IMG[currentIndex];
      img.alt = `Promo AIRBET88 slide ${currentIndex + 1}`;

      [...dots.children].forEach((dot, j) => {
        const active = j === currentIndex;

        dot.classList.toggle("active", active);
        dot.setAttribute("aria-current", String(active));
      });
    }

    function restartSlider() {
      clearInterval(sliderTimer);

      if (IMG.length > 1) {
        sliderTimer = setInterval(() => {
          showSlide(currentIndex + 1);
        }, SLIDER_INTERVAL);
      }
    }

    function closePopup() {
      clearInterval(sliderTimer);

      popup.remove();
      overlay.remove();

      try {
        localStorage.setItem(
          DELAY_KEY,
          String(Date.now())
        );
      } catch (e) {}
    }

    // Navigasi
    popup.querySelector(".prev").addEventListener("click", () => {
      showSlide(currentIndex - 1);
      restartSlider();
    });

    popup.querySelector(".next").addEventListener("click", () => {
      showSlide(currentIndex + 1);
      restartSlider();
    });

    // Tutup popup
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

  // Jalankan setelah DOM siap
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
