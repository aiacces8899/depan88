"use strict";
(function () {
  const STYLE_ID = "airbet88-float-btn-style";
  const CONTAINER_ID = "airbet88-float-btn";

  // ========== GAMBAR & LINK ==========
  const VIP_IMG = "http://plcl.me/images/oTwFW.png";
  const BTN_88_IMG = "http://plcl.me/images/CyeqU.png";
  const RTP_IMG = "http://plcl.me/images/aYyJa.png";
  const BUKTI_JP_IMG = "http://plcl.me/images/W7UAH.png";
  const AYOCEK_IMG = "http://plcl.me/images/mgvak.png";
  const LINK_VIP = "https://linknewshortener-ai88.com/airbet88vip";
  const LINK_RTP = "https://linknewshortener-ai88.com/rtp-gacor";
  const LINK_BUKTI_JP = "https://linknewshortener-ai88.com/bukti-jp";
  const LINK_AYOCEK = "https://linknewshortener-ai88.com/searchingairbet88";

  /* ==============================
     CEK SUDAH ADA ATAU BELUM
  ============================== */
  if (document.getElementById(CONTAINER_ID)) return;

  /* ==============================
     INJECT CSS
  ============================== */
  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${CONTAINER_ID} {
        position: fixed;
        left: 12px;
        bottom: 80px;
        transform: none;
        display: flex;
        flex-direction: column;
        gap: 12px;
        align-items: flex-start;
        z-index: 2147483000;
        font-family: 'Segoe UI', Arial, sans-serif;
      }

      /* Button bulat */
      .airbet88-circle {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        font-size: 11px;
        font-weight: 800;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        overflow: hidden;
        padding: 0;
        line-height: 1;
      }
      .airbet88-circle:hover {
        transform: scale(1.1);
      }

      /* ===== VIP STYLE (mirip gambar) ===== */
      .airbet88-circle.vip {
        background: #0a0a0a;
        border: 2.5px solid #d4af37;
        box-shadow: 0 0 12px rgba(212, 175, 55, 0.55), 0 0 24px rgba(212, 175, 55, 0.25);
        color: #d4af37;
        text-align: center;
      }
      .airbet88-circle.vip .vip-crown {
        font-size: 13px;
        line-height: 1;
        margin-bottom: 1px;
      }
      .airbet88-circle.vip .vip-text {
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 0.5px;
        line-height: 1;
      }
      .airbet88-circle.vip .vip-sub {
        font-size: 6.5px;
        font-weight: 700;
        letter-spacing: 0.3px;
        margin-top: 1px;
        opacity: 0.9;
      }
      .airbet88-circle.vip:hover {
        box-shadow: 0 0 18px rgba(212, 175, 55, 0.85), 0 0 32px rgba(212, 175, 55, 0.4);
        border-color: #f0d060;
      }

      /* 88 pake gambar */
      .airbet88-circle.img-88 {
        background: none;
        border: 2px solid #7FFFD4;
        box-shadow: 0 0 15px rgba(0, 245, 212, 0.6), 0 0 28px rgba(0, 245, 212, 0.35);
      }
      .airbet88-circle.img-88 img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
      .airbet88-circle.img-88:hover {
        box-shadow: 0 0 28px rgba(0, 245, 212, 0.95), 0 0 45px rgba(0, 245, 212, 0.5);
      }

      /* Submenu */
      .airbet88-submenu {
        display: none;
        flex-direction: column;
        gap: 12px;
        margin-top: 4px;
        margin-left: 6px;
        animation: airbet88FadeIn 0.3s ease;
      }
      .airbet88-submenu.show {
        display: flex;
      }
      @keyframes airbet88FadeIn {
        from { opacity: 0; transform: translateY(-8px); }
        to { opacity: 1; transform: translateY(0); }
      }

      /* Gambar button */
      .airbet88-img-btn {
        display: inline-block;
        transition: all 0.3s ease;
        border: none;
        background: none;
        padding: 0;
        line-height: 0;
      }
      .airbet88-img-btn img {
        display: block;
        width: 150px;
        height: auto;
        border-radius: 12px;
      }
      .airbet88-img-btn:hover {
        transform: scale(1.06);
        filter: drop-shadow(0 0 14px rgba(0, 245, 212, 0.85));
      }
    `;
    document.head.appendChild(style);
  }

  /* ==============================
     BUAT BUTTON
  ============================== */
  function createButtons() {
    injectStyle();

    const container = document.createElement("div");
    container.id = CONTAINER_ID;
    container.innerHTML = `
      <!-- VIP (style baru) -->
      <button class="airbet88-circle vip" id="airbet88-vip-btn">
        <span class="vip-crown">♛</span>
        <span class="vip-text">VIP</span>
        <span class="vip-sub">EXCLUSIVE</span>
      </button>
      <div class="airbet88-submenu" id="airbet88-vip-menu">
        <a href="${LINK_VIP}" target="_blank" rel="noopener noreferrer" class="airbet88-img-btn">
          <img src="${VIP_IMG}" alt="VIP">
        </a>
      </div>

      <!-- 88 -->
      <button class="airbet88-circle img-88" id="airbet88-88-btn">
        <img src="${BTN_88_IMG}" alt="88">
      </button>
      <div class="airbet88-submenu" id="airbet88-88-menu">
        <a href="${LINK_RTP}" target="_blank" rel="noopener noreferrer" class="airbet88-img-btn">
          <img src="${RTP_IMG}" alt="RTP">
        </a>
        <a href="${LINK_BUKTI_JP}" target="_blank" rel="noopener noreferrer" class="airbet88-img-btn">
          <img src="${BUKTI_JP_IMG}" alt="BUKTI JP">
        </a>
        <a href="${LINK_AYOCEK}" target="_blank" rel="noopener noreferrer" class="airbet88-img-btn">
          <img src="${AYOCEK_IMG}" alt="ayocek.com">
        </a>
      </div>
    `;
    document.body.appendChild(container);

    // Event
    document.getElementById("airbet88-vip-btn").addEventListener("click", function () {
      toggleMenu("airbet88-vip-menu");
    });
    document.getElementById("airbet88-88-btn").addEventListener("click", function () {
      toggleMenu("airbet88-88-menu");
    });
  }

  function toggleMenu(id) {
    document.querySelectorAll(".airbet88-submenu").forEach(function (menu) {
      if (menu.id !== id) {
        menu.classList.remove("show");
      }
    });
    const menu = document.getElementById(id);
    menu.classList.toggle("show");
  }

  /* ==============================
     INIT
  ============================== */
  function init() {
    if (document.body) {
      createButtons();
    } else {
      let retry = 0;
      const timer = setInterval(function () {
        if (document.body || retry > 40) {
          clearInterval(timer);
          if (document.body) createButtons();
        }
        retry++;
      }, 300);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
