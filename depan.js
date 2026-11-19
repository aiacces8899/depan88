
(function () {
  "use strict";

  /* ==========================================
     AIRBET88 INSTALL APPS - VERSION 12
     SILVER PREMIUM POPUP
     PWA + APK + BUKTI JP
     NO SECOND PROMOTION POPUP
  ========================================== */

  const CONFIG = {
    rootId: "airbet88-install-v12",
    styleId: "airbet88-install-v12-style",

    storageKey: "airbet88-install-v12-closed",
    cooldown: 60 * 60 * 1000,

    // LINK PWA TERBARU
    pwa: "https://linknewshortener-ai88.com/pwa",

    // LINK DOWNLOAD APK
    apk: "https://dk4jo88env94i.cloudfront.net/airbet88.apk",

    // LOGO UTAMA AIRBET88
    logo: "https://www.image2url.com/r2/default/images/1794970107198-cf9d9028-92cb-41bc-ad06-c3769fd0a861.png",

    // LOGO PWA
    logoPwa: "https://www.image2url.com/r2/default/images/1795075258609-60f3880b-cb0d-4108-8d44-7fceeb6362c6.png",

    // LOGO APK
    logoApk: "https://www.image2url.com/r2/default/images/1793081025495-e9d0f056-7179-4594-84ff-372fc034df81.png",

    // BANNER BUKTI JP
    bannerJP: "https://plcl.me/images/W7UAH.png",

    // LINK BUKTI JP
    buktiJP: "https://linknewshortener-ai88.com/bukti-jp"
  };

  /* ==========================================
     HOMEPAGE ONLY
  ========================================== */

  const path = location.pathname
    .replace(/\/+$/, "")
    .toLowerCase();

  if (path && !path.includes("home")) return;

  if (document.getElementById(CONFIG.rootId)) {
    return;
  }

  /* ==========================================
     COOLDOWN 1 JAM
  ========================================== */

  try {
    const last = Number(
      localStorage.getItem(CONFIG.storageKey) || 0
    );

    if (
      last > 0 &&
      Date.now() - last < CONFIG.cooldown
    ) {
      return;
    }
  } catch (e) {}

  /* ==========================================
     DETEKSI IPHONE
  ========================================== */

  const isIOS =
    /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (
      navigator.platform === "MacIntel" &&
      navigator.maxTouchPoints > 1
    );

  /* ==========================================
     CSS POPUP
  ========================================== */

  const CSS = `
    #${CONFIG.rootId},
    #${CONFIG.rootId} * {
      box-sizing: border-box;
    }

    #${CONFIG.rootId} {
      position: fixed;
      inset: 0;
      z-index: 2147483647;

      display: flex;
      align-items: center;
      justify-content: center;

      padding: 12px;

      background: rgba(0, 0, 0, .62);

      font-family:
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Arial,
        sans-serif;

      animation: abFade .25s ease;
    }

    #${CONFIG.rootId} button,
    #${CONFIG.rootId} a {
      font-family: inherit;
      -webkit-tap-highlight-color: transparent;
    }

    #${CONFIG.rootId} button {
      cursor: pointer;
    }

    /* MAIN MODAL */

    #${CONFIG.rootId} .ab-modal {
      position: relative;

      width: 100%;
      max-width: 445px;

      max-height: calc(100vh - 24px);
      max-height: calc(100dvh - 24px);

      overflow-y: auto;
      overscroll-behavior: contain;

      padding: 20px 18px 18px;

      border-radius: 17px;
      border: 1px solid #ffffffa8;

      background: #eeeeee;

      color: #111;

      box-shadow:
        0 20px 60px rgba(0, 0, 0, .4);

      animation: abPop .35s ease;

      scrollbar-width: thin;
    }

    /* CLOSE BUTTON */

    #${CONFIG.rootId} .ab-close {
      position: absolute;

      top: 13px;
      right: 13px;

      width: 32px;
      height: 32px;

      display: grid;
      place-items: center;

      border: none;
      background: transparent;

      color: #a6a6a6;

      font-size: 25px;
      font-weight: 800;

      z-index: 3;
    }

    #${CONFIG.rootId} .ab-close:hover {
      color: #555;
    }

    /* HEADER */

    #${CONFIG.rootId} .ab-header {
      display: flex;
      flex-direction: column;
      align-items: center;

      gap: 9px;

      margin-bottom: 17px;
    }

    #${CONFIG.rootId} .ab-logo {
      display: block;

      max-width: 195px;
      max-height: 70px;

      width: auto;
      height: auto;

      object-fit: contain;
    }

    #${CONFIG.rootId} .ab-title {
      margin: 0;

      color: #111;

      font-size: 20px;
      font-weight: 800;

      text-align: center;
    }

    /* TRUST ICONS */

    #${CONFIG.rootId} .ab-trust {
      display: flex;
      align-items: center;
      justify-content: center;

      gap: 9px;
      flex-wrap: wrap;

      margin-top: 5px;
    }

    #${CONFIG.rootId} .ab-trust-item {
      display: flex;
      align-items: center;

      gap: 5px;

      padding: 6px 9px;

      border: 1px solid #d0d0d0;
      border-radius: 20px;

      background: #e4e4e4;

      color: #5d9299;

      font-size: 11px;
      font-weight: 700;
    }

    #${CONFIG.rootId} .ab-trust-item svg {
      width: 15px;
      height: 15px;

      fill: none;
      stroke: currentColor;
      stroke-width: 2;

      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* APPLICATION CARDS */

    #${CONFIG.rootId} .ab-option {
      position: relative;

      display: flex;
      align-items: center;

      width: 100%;
      min-height: 137px;

      gap: 18px;
      padding: 17px;

      margin-bottom: 14px;

      border: 1px solid #b9b9b9;
      border-radius: 15px;

      background: #d8d8d8;

      color: #111;

      text-align: left;
      overflow: hidden;

      transition:
        transform .2s ease,
        box-shadow .2s ease,
        border-color .2s ease;
    }

    #${CONFIG.rootId} .ab-option:hover {
      transform: translateY(-2px);

      border-color: #78a7ad;

      box-shadow:
        0 9px 20px rgba(0, 0, 0, .12);
    }

    #${CONFIG.rootId} .ab-option:active {
      transform: scale(.98);
    }

    /* APP ICON */

    #${CONFIG.rootId} .ab-icon {
      flex: 0 0 100px;

      width: 100px;
      height: 100px;

      display: flex;
      align-items: center;
      justify-content: center;

      border: 1px solid #bdbdbd;
      border-radius: 16px;

      background: #e5e5e5;

      overflow: hidden;
    }

    #${CONFIG.rootId} .ab-icon img {
      display: block;

      width: 80px;
      height: 80px;

      object-fit: contain;
    }

    /* APP TEXT */

    #${CONFIG.rootId} .ab-info {
      flex: 1;
      min-width: 0;
    }

    #${CONFIG.rootId} .ab-name {
      display: block;

      margin-bottom: 8px;

      color: #5b9ba2;

      font-size: 17px;
      font-weight: 700;
    }

    #${CONFIG.rootId} .ab-description {
      display: block;

      color: #222;

      font-size: 13px;
      font-weight: 500;
      line-height: 1.65;
    }

    /* RECOMMENDED RIBBON */

    #${CONFIG.rootId} .ab-ribbon {
      position: absolute;

      top: 13px;
      right: -36px;

      transform: rotate(40deg);

      padding: 5px 38px;

      background: #ff6900;
      color: #fff;

      font-size: 10px;
      font-weight: 800;

      box-shadow:
        0 3px 8px rgba(0, 0, 0, .15);
    }

    /* BUKTI JP */

    #${CONFIG.rootId} .ab-jp {
      display: block;

      width: 100%;

      margin-top: 5px;

      border-radius: 12px;
      overflow: hidden;

      border: 1px solid #c5c5c5;

      background: #dedede;

      transition: transform .2s ease;
    }

    #${CONFIG.rootId} .ab-jp:hover {
      transform: translateY(-2px);
    }

    #${CONFIG.rootId} .ab-jp img {
      display: block;

      width: 100%;
      height: auto;

      object-fit: contain;
    }

    /* FOOTER */

    #${CONFIG.rootId} .ab-footer {
      margin-top: 13px;

      text-align: center;

      color: #888;

      font-size: 10px;
    }

    /* ANIMATIONS */

    @keyframes abFade {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes abPop {
      from {
        opacity: 0;
        transform: translateY(20px) scale(.95);
      }

      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    /* MOBILE RESPONSIVE */

    @media (max-width: 390px) {
      #${CONFIG.rootId} .ab-modal {
        padding: 17px 12px 14px;
      }

      #${CONFIG.rootId} .ab-option {
        min-height: 115px;
        gap: 12px;
        padding: 12px;
      }

      #${CONFIG.rootId} .ab-icon {
        flex-basis: 76px;
        width: 76px;
        height: 76px;
      }

      #${CONFIG.rootId} .ab-icon img {
        width: 65px;
        height: 65px;
      }

      #${CONFIG.rootId} .ab-name {
        font-size: 15px;
      }

      #${CONFIG.rootId} .ab-description {
        font-size: 11px;
      }

      #${CONFIG.rootId} .ab-trust {
        gap: 5px;
      }

      #${CONFIG.rootId} .ab-trust-item {
        font-size: 10px;
        padding: 5px 7px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      #${CONFIG.rootId},
      #${CONFIG.rootId} * {
        animation: none !important;
        transition: none !important;
      }
    }
  `;

  /* ==========================================
     CREATE POPUP
  ========================================== */

  function createPopup() {
    if (document.getElementById(CONFIG.rootId)) {
      return;
    }

    const style = document.createElement("style");

    style.id = CONFIG.styleId;
    style.textContent = CSS;

    document.head.appendChild(style);

    const root = document.createElement("div");
    root.id = CONFIG.rootId;

    root.innerHTML = `
      <section
        class="ab-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Unduh aplikasi AIRBET88"
      >

        <button
          class="ab-close"
          id="abClose"
          type="button"
          aria-label="Tutup popup"
        >×</button>

        <!-- HEADER -->

        <div class="ab-header">

          <img
            class="ab-logo"
            id="abLogo"
            alt="AIRBET88"
          >

          <h2 class="ab-title">
            UNDUH APPS
          </h2>

          <!-- 3 IMPORTANT ICONS -->

          <div class="ab-trust">

            <span class="ab-trust-item">
              <svg viewBox="0 0 24 24">
                <path d="M12 2 20 6v6c0 5-3 8-8 10-5-2-8-5-8-10V6z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
              Aman
            </span>

            <span class="ab-trust-item">
              <svg viewBox="0 0 24 24">
                <path d="m13 2-9 12h7l-1 8 10-12h-7z"/>
              </svg>
              Cepat
            </span>

            <span class="ab-trust-item">
              <svg viewBox="0 0 24 24">
                <path d="M4 13v-2a8 8 0 0 1 16 0v2"/>
                <rect x="2" y="12" width="4" height="7" rx="2"/>
                <rect x="18" y="12" width="4" height="7" rx="2"/>
                <path d="M20 19c0 2-3 3-6 3"/>
              </svg>
              Support 24 Jam
            </span>

          </div>
        </div>

        <!-- LITE VERSION -->

        <button
          class="ab-option"
          id="abPwa"
          type="button"
        >

          <span class="ab-icon">
            <img
              id="abPwaLogo"
              alt="Logo PWA AIRBET88"
            >
          </span>

          <span class="ab-info">

            <span class="ab-name">
              Lite Version
            </span>

            <span class="ab-description">
              Akses praktis dan nyaman melalui
              aplikasi AIRBET88.
            </span>

          </span>

          <span class="ab-ribbon">
            Rekomendasi
          </span>

        </button>

        <!-- FULL VERSION -->

        <button
          class="ab-option"
          id="abApk"
          type="button"
        >

          <span class="ab-icon">
            <img
              id="abApkLogo"
              alt="Logo APK AIRBET88"
            >
          </span>

          <span class="ab-info">

            <span class="ab-name">
              Full Version
            </span>

            <span class="ab-description">
              Akses praktis dan nyaman melalui
              aplikasi AIRBET88.
            </span>

          </span>

        </button>

        <!-- BUKTI JP BANNER -->

        <a
          class="ab-jp"
          id="abBuktiJP"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Lihat Bukti JP"
        >
          <img
            id="abBannerJP"
            alt="Bukti JP AIRBET88"
          >
        </a>

        <!-- FOOTER -->

        <div class="ab-footer">
          © 2026 AIRBET88. All rights reserved.
        </div>

      </section>
    `;

    document.body.appendChild(root);

    /* ========================================
       SET IMAGE SOURCES
    ======================================== */

    root.querySelector("#abLogo").src =
      CONFIG.logo;

    root.querySelector("#abPwaLogo").src =
      CONFIG.logoPwa;

    root.querySelector("#abApkLogo").src =
      CONFIG.logoApk;

    root.querySelector("#abBannerJP").src =
      CONFIG.bannerJP;

    root.querySelector("#abBuktiJP").href =
      CONFIG.buktiJP;

    /* ========================================
       CLOSE POPUP
    ======================================== */

    function closePopup() {
      try {
        localStorage.setItem(
          CONFIG.storageKey,
          String(Date.now())
        );
      } catch (e) {}

      root.remove();
      style.remove();
    }

    root.querySelector("#abClose").onclick =
      closePopup;

    /* ========================================
       PWA BUTTON
    ======================================== */

    root.querySelector("#abPwa").onclick = () => {
      window.location.assign(CONFIG.pwa);
    };

    /* ========================================
       APK BUTTON
    ======================================== */

    root.querySelector("#abApk").onclick = () => {

      // iPhone / iPad menggunakan PWA.
      if (isIOS) {
        window.location.assign(CONFIG.pwa);
        return;
      }

      // Android membuka file APK.
      const link = document.createElement("a");

      link.href = CONFIG.apk;
      link.download = "airbet88.apk";
      link.rel = "noopener noreferrer";

      document.body.appendChild(link);
      link.click();
      link.remove();
    };

  }

  /* ==========================================
     INITIALIZATION
  ========================================== */

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      createPopup,
      { once: true }
    );
  } else {
    createPopup();
  }

})();
