"use strict";

(function () {
  const STYLE_ID = "airbet88-float-btn-style";
  const CONTAINER_ID = "airbet88-float-btn";

  // ========== GIF TOMBOL UTAMA ==========
  const VIP_BTN_IMG =
    "https://www.image2url.com/r2/default/gifs/1792492627419-af1dc9ac-2831-422c-9771-15fd5f729f92.gif";

  const BTN_88_IMG =
    "https://www.image2url.com/r2/default/gifs/1792492662123-130e226a-7644-45a3-be41-33ba35aafbb8.gif";

  // ========== GAMBAR SUBMENU ==========
  const VIP_IMG = "http://plcl.me/images/oTwFW.png";
  const RTP_IMG = "http://plcl.me/images/aYyJa.png";
  const BUKTI_JP_IMG = "http://plcl.me/images/W7UAH.png";
  const AYOCEK_IMG = "http://plcl.me/images/mgvak.png";

  // ========== LINK ==========
  const LINK_VIP = "https://linknewshortener-ai88.com/airbet88vip";
  const LINK_RTP = "https://linknewshortener-ai88.com/rtp-gacor";
  const LINK_BUKTI_JP = "https://linknewshortener-ai88.com/bukti-jp";
  const LINK_AYOCEK =
    "https://linknewshortener-ai88.com/searchingairbet88";

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;

    style.textContent = `
      #${CONTAINER_ID} {
        position: fixed;
        left: 12px;
        bottom: 80px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        z-index: 2147483000;
        font-family: "Segoe UI", Arial, sans-serif;
      }

      #${CONTAINER_ID},
      #${CONTAINER_ID} * {
        box-sizing: border-box;
      }

      /* Tombol utama menggunakan GIF */
      #${CONTAINER_ID} .airbet88-circle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        min-width: 48px;
        flex-shrink: 0;
        margin: 0;
        padding: 0;
        border: none;
        border-radius: 0;
        background: transparent;
        box-shadow: none;
        cursor: pointer;
        line-height: 0;
        appearance: none;
        transition: transform 0.3s ease;
        -webkit-tap-highlight-color: transparent;
      }

      #${CONTAINER_ID} .airbet88-circle img {
        display: block;
        width: 100%;
        height: 100%;
        max-width: none;
        object-fit: contain;
        pointer-events: none;
      }

      #${CONTAINER_ID} .airbet88-circle:hover {
        transform: scale(1.1);
      }

      #${CONTAINER_ID} .airbet88-circle:focus-visible,
      #${CONTAINER_ID} .airbet88-img-btn:focus-visible {
        outline: 2px solid #d4af37;
        outline-offset: 4px;
      }

      /* Submenu */
      #${CONTAINER_ID} .airbet88-submenu {
        display: none;
        flex-direction: column;
        gap: 12px;
        margin-top: 4px;
        margin-left: 6px;
      }

      #${CONTAINER_ID} .airbet88-submenu.show {
        display: flex;
        animation: airbet88FadeIn 0.3s ease;
      }

      @keyframes airbet88FadeIn {
        from {
          opacity: 0;
          transform: translateY(-8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Gambar submenu */
      #${CONTAINER_ID} .airbet88-img-btn {
        display: inline-block;
        padding: 0;
        border: none;
        background: none;
        line-height: 0;
        transition: transform 0.3s ease, filter 0.3s ease;
      }

      #${CONTAINER_ID} .airbet88-img-btn img {
        display: block;
        width: 150px;
        height: auto;
        border-radius: 12px;
      }

      #${CONTAINER_ID} .airbet88-img-btn:hover {
        transform: scale(1.06);
        filter: drop-shadow(0 0 14px rgba(0, 245, 212, 0.85));
      }
    `;

    document.head.appendChild(style);
  }

  function createButtons() {
    if (document.getElementById(CONTAINER_ID)) return;

    injectStyle();

    const container = document.createElement("div");
    container.id = CONTAINER_ID;

    container.innerHTML = `
      <!-- TOMBOL VIP -->
      <button
        type="button"
        class="airbet88-circle"
        id="airbet88-vip-btn"
        aria-label="Buka menu VIP"
        aria-controls="airbet88-vip-menu"
        aria-expanded="false"
      >
        <img src="${VIP_BTN_IMG}" alt="" draggable="false">
      </button>

      <div class="airbet88-submenu" id="airbet88-vip-menu">
        <a
          href="${LINK_VIP}"
          target="_blank"
          rel="noopener noreferrer"
          class="airbet88-img-btn"
        >
          <img src="${VIP_IMG}" alt="VIP">
        </a>
      </div>

      <!-- TOMBOL 88 -->
      <button
        type="button"
        class="airbet88-circle"
        id="airbet88-88-btn"
        aria-label="Buka menu Airbet88"
        aria-controls="airbet88-88-menu"
        aria-expanded="false"
      >
        <img src="${BTN_88_IMG}" alt="" draggable="false">
      </button>

      <div class="airbet88-submenu" id="airbet88-88-menu">
        <a
          href="${LINK_RTP}"
          target="_blank"
          rel="noopener noreferrer"
          class="airbet88-img-btn"
        >
          <img src="${RTP_IMG}" alt="RTP">
        </a>

        <a
          href="${LINK_BUKTI_JP}"
          target="_blank"
          rel="noopener noreferrer"
          class="airbet88-img-btn"
        >
          <img src="${BUKTI_JP_IMG}" alt="BUKTI JP">
        </a>

        <a
          href="${LINK_AYOCEK}"
          target="_blank"
          rel="noopener noreferrer"
          class="airbet88-img-btn"
        >
          <img src="${AYOCEK_IMG}" alt="ayocek.com">
        </a>
      </div>
    `;

    document.body.appendChild(container);

    function toggleMenu(menuId) {
      const selectedMenu = container.querySelector("#" + menuId);
      const shouldOpen = !selectedMenu.classList.contains("show");

      container.querySelectorAll(".airbet88-submenu").forEach(function (menu) {
        menu.classList.toggle("show", menu === selectedMenu && shouldOpen);
      });

      container.querySelectorAll("button[aria-controls]").forEach(function (button) {
        const isOpen =
          button.getAttribute("aria-controls") === menuId && shouldOpen;

        button.setAttribute("aria-expanded", String(isOpen));
      });
    }

    container.querySelector("#airbet88-vip-btn").addEventListener("click", function () {
      toggleMenu("airbet88-vip-menu");
    });

    container.querySelector("#airbet88-88-btn").addEventListener("click", function () {
      toggleMenu("airbet88-88-menu");
    });
  }

  // ========== INIT ==========
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createButtons, { once: true });
  } else {
    createButtons();
  }
})();
