"use strict";

(function () {
  const IMG = [
    "https://www.image2url.com/r2/default/images/1792742533701-c95f63ab-b16a-4021-bc10-505b681a8e8b.jpg",
    "https://www.image2url.com/r2/default/images/1792805579769-2ba37971-e783-48bd-be45-3db313b1bc2f.jpg",
    "https://www.image2url.com/r2/default/images/1792805627613-bd32c429-7207-49eb-b198-914de4b62796.jpg",
    "https://www.image2url.com/r2/default/images/1792805691974-ea119217-9ec5-4eff-a4fa-0acb694faa4c.jpg"
  ];

  const CONFIG = {
    interval: 7000,
    delay: 3600000,
    storageKey: "popup_delay_1h",
    popupId: "airbet88-popup",
    overlayId: "airbet88-popup-overlay",
    styleId: "airbet88-popup-style",
    ayocekUrl: "https://linknewshortener-ai88.com/searchingairbet88",
    vipUrl: "https://linknewshortener-ai88.com/airbet88vip",
    adminUrl: "https://linknewshortener-ai88.com/telegramrotator"
  };

  // Tampil di homepage atau alamat yang mengandung "home".
  const path = location.pathname.replace(/\/+$/, "").toLowerCase();

  if (path !== "" && !path.includes("home")) return;

  function isOnCooldown() {
    try {
      const lastClosed = Number(
        localStorage.getItem(CONFIG.storageKey) || 0
      );

      return (
        lastClosed > 0 &&
        Date.now() - lastClosed < CONFIG.delay
      );
    } catch (error) {
      return false;
    }
  }

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
      align-items: center;
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
      max-height: calc(100vh - 24px);
      max-height: calc(100dvh - 24px);
      overflow-y: auto;
      padding: 12px;
      border: 1px solid rgba(232, 201, 134, .6);
      border-radius: 22px;
      background: linear-gradient(
        160deg,
        #164745,
        #092b2c 45%,
        #041819
      );
      box-shadow: 0 18px 50px rgba(0, 0, 0, .6);
      scrollbar-width: thin;
      scrollbar-color: #4b7770 transparent;
    }

    #${CONFIG.popupId} .brand {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      min-height: 57px;
      margin-bottom: 12px;
      padding: 2px 35px 2px 4px;
    }

    #${CONFIG.popupId} .brand-link {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
      color: inherit;
      text-decoration: none;
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

    #${CONFIG.popupId} .slider {
      position: relative;
      width: 100%;
      aspect-ratio: 1080 / 1350;
      overflow: hidden;
      border: 1px solid rgba(232, 201, 134, .45);
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

    #${CONFIG.popupId} .slide-image[hidden],
    #${CONFIG.popupId} .load-status[hidden] {
      display: none;
    }

    #${CONFIG.popupId} .load-status {
      position: absolute;
      inset: 45% 35px auto;
      text-align: center;
      font-size: 13px;
      color: #b7dcd6;
    }

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
      border: 1px solid rgba(255, 255, 255, .25);
      border-radius: 8px;
      background: rgba(0, 25, 27, .65);
      color: #fff;
      font-size: 22px;
      line-height: 1;
      cursor: pointer;
    }

    #${CONFIG.popupId} .prev {
      left: 5px;
    }

    #${CONFIG.popupId} .next {
      right: 5px;
    }

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
    }

    #${CONFIG.popupId} .dot.active {
      width: 22px;
      background: #e8c986;
    }

    #${CONFIG.popupId} .promo-title {
      margin: 0 0 12px;
      color: #e8c986;
      text-align: center;
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 1.5px;
    }

    #${CONFIG.popupId} .actions {
      padding: 12px;
      border: 1px solid rgba(255, 255, 255, .13);
      border-radius: 14px;
      background: rgba(255, 255, 255, .035);
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
      grid-template-columns: repeat(2, minmax(0, 1fr));
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
      border: 1px solid rgba(232, 201, 134, .65);
      border-radius: 11px;
      background: linear-gradient(135deg, #1b7771, #0b4544);
      color: #fff;
      text-decoration: none;
      text-align: center;
      font-size: 11px;
      font-weight: 800;
      line-height: 1.3;
    }

    #${CONFIG.popupId} .btn .icon {
      flex: none;
      color: #e8c986;
      font-size: 16px;
    }

    #${CONFIG.popupId} .dismiss {
      display: block;
      width: 100%;
      min-height: 39px;
      margin-top: 9px;
      padding: 9px;
      border: 1px solid rgba(255, 255, 255, .16);
      border-radius: 10px;
      background: #061f20;
      color: #bdd8d3;
      font-size: 11px;
      font-weight: 800;
      cursor: pointer;
    }

    #${CONFIG.popupId} a:focus-visible,
    #${CONFIG.popupId} button:focus-visible {
      outline: 2px solid #e8c986;
      outline-offset: 3px;
    }

    @media (max-width: 390px) {
      #${CONFIG.popupId} {
        padding: 8px;
      }

      #${CONFIG.popupId} .popup-box {
        padding: 9px;
        border-radius: 17px;
      }

      #${CONFIG.popupId} .brand {
        margin-bottom: 9px;
      }

      #${CONFIG.popupId} .brand-link {
        gap: 8px;
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
  `;

  function init() {
    if (document.getElementById(CONFIG.popupId)) return;
    if (isOnCooldown()) return;

    if (!document.getElementById(CONFIG.styleId)) {
      const style = document.createElement("style");
      style.id = CONFIG.styleId;
      style.textContent = CSS;
      document.head.appendChild(style);
    }

    const previousFocus = document.activeElement;

    const overlay = document.createElement("div");
    overlay.id = CONFIG.overlayId;
    overlay.setAttribute("aria-hidden", "true");

    const popup = document.createElement("div");
    popup.id = CONFIG.popupId;

    popup.innerHTML = `
      <section
        class="popup-box"
        role="dialog"
        aria-modal="true"
        aria-label="Promo AIRBET88"
      >
        <button
          class="close"
          type="button"
          aria-label="Tutup popup"
        >×</button>

        <header class="brand">
          <a
            class="brand-link"
            href="${CONFIG.ayocekUrl}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buka AYOCEK.COM di tab baru"
          >
            <span class="brand-icon" aria-hidden="true">⌕</span>

            <div>
              <div class="brand-name">
                AYOCEK<span>.COM</span>
              </div>
              <div class="brand-sub">
                Alat pencarian brand favoritmu
              </div>
            </div>
          </a>
        </header>

        <div class="slider">
          <span class="load-status" role="status">
            Memuat gambar…
          </span>

          <img
            class="slide-image"
            hidden
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

        <div
          class="dots"
          role="group"
          aria-label="Navigasi gambar promosi"
        ></div>

        <div class="promo-title">
          AIRBET88.COM · SENSASIONAL
        </div>

        <div class="actions">
          <p class="actions-heading">PILIH LAYANAN KAMU</p>

          <div class="btn-row">
            <a
              class="btn"
              href="${CONFIG.vipUrl}"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="icon" aria-hidden="true">♛</span>
              MEMBERSHIP VIP
            </a>

            <a
              class="btn"
              href="${CONFIG.adminUrl}"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="icon" aria-hidden="true">✆</span>
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

    let image = popup.querySelector(".slide-image");

    const dots = popup.querySelector(".dots");
    const closeButton = popup.querySelector(".close");
    const status = popup.querySelector(".load-status");

    let currentIndex = -1;
    let timer = null;
    let loadTimer = null;
    let pending = null;
    let closed = false;

    const failed = new Set();

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

    function cancelLoad() {
      clearTimeout(loadTimer);

      if (!pending) return;

      pending.onload = null;
      pending.onerror = null;
      pending.removeAttribute("src");
      pending = null;
    }

    // Gambar dimuat satu per satu, bukan sekaligus.
    function showSlide(index) {
      if (closed || pending) return;

      currentIndex = (index + IMG.length) % IMG.length;

      if (failed.has(currentIndex)) return;

      const targetIndex = currentIndex;
      const next = new Image(1080, 1350);

      pending = next;

      next.className = "slide-image";
      next.decoding = "async";
      next.alt = `Promo AIRBET88 slide ${targetIndex + 1}`;

      next.onload = () => {
        if (closed || pending !== next) return;

        clearTimeout(loadTimer);

        next.onload = null;
        next.onerror = null;
        pending = null;

        image.replaceWith(next);
        image = next;

        status.hidden = true;

        Array.from(dots.children).forEach((dot, i) => {
          const active = i === targetIndex;

          dot.classList.toggle("active", active);
          dot.setAttribute("aria-current", String(active));
        });

        restartSlider();
      };

      next.onerror = () => {
        if (closed || pending !== next) return;

        failed.add(targetIndex);
        cancelLoad();

        if (failed.size === IMG.length) {
          clearTimeout(timer);

          if (image.hidden) {
            status.textContent =
              "Gambar belum tersedia. Silakan coba lagi nanti.";
          }
        } else {
          restartSlider();
        }
      };

      loadTimer = setTimeout(() => {
        if (next.onerror) next.onerror();
      }, 15000);

      next.src = IMG[targetIndex];
    }

    function restartSlider() {
      clearTimeout(timer);

      if (
        !closed &&
        !document.hidden &&
        failed.size < IMG.length
      ) {
        timer = setTimeout(() => {
          showSlide(currentIndex + 1);
          restartSlider();
        }, CONFIG.interval);
      }
    }

    function closePopup() {
      if (closed) return;

      closed = true;

      clearTimeout(timer);
      cancelLoad();

      document.removeEventListener(
        "visibilitychange",
        restartSlider
      );

      document.removeEventListener("keydown", handleKeydown);

      popup.remove();
      overlay.remove();

      try {
        localStorage.setItem(
          CONFIG.storageKey,
          String(Date.now())
        );
      } catch (error) {
        // Popup tetap bisa ditutup jika storage diblokir.
      }

      if (previousFocus && previousFocus.isConnected) {
        previousFocus.focus();
      }
    }

    function handleKeydown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closePopup();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(
        popup.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex="0"]'
        )
      ).filter((element) => element.getClientRects().length > 0);

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !popup.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || !popup.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    }

    popup.querySelector(".prev").addEventListener("click", () => {
      showSlide(currentIndex - 1);
      restartSlider();
    });

    popup.querySelector(".next").addEventListener("click", () => {
      showSlide(currentIndex + 1);
      restartSlider();
    });

    closeButton.addEventListener("click", closePopup);

    popup.querySelector(".dismiss").addEventListener(
      "click",
      closePopup
    );

    popup.addEventListener("click", (event) => {
      if (event.target === popup) closePopup();
    });

    document.addEventListener("keydown", handleKeydown);

    document.addEventListener(
      "visibilitychange",
      restartSlider
    );

    showSlide(0);
    restartSlider();

    closeButton.focus({ preventScroll: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {
      once: true
    });
  } else {
    init();
  }
})();
