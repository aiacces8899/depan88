"use strict";

(function () {
  const IMG = [
    "https://www.image2url.com/r2/default/images/1788895681545-d7772558-a997-41a2-a4d8-e0f872a6d8d7.png",
  ];

  const DELAY_KEY = "popup_delay_1h";
  const SLIDER_INTERVAL = 7000;
  const STYLE_ID = "airbet88-popup-style";
  const POPUP_ID = "airbet88-popup";
  const OVERLAY_ID = "airbet88-popup-overlay";

  let popupCreated = false;
  let currentIndex = 0;
  let sliderTimer = null;
  let changingSlide = false;

  /* ==============================
     CEK HALAMAN
  ============================== */

  function isAllowedPage() {
    const path = location.pathname
      .replace(/\/+$/, "")
      .toLowerCase();

    return (
      path === "" ||
      path === "/" ||
      path.includes("home")
    );
  }

  function canShowPopup() {
    if (!isAllowedPage()) return false;

    const lastClosed = Number(
      localStorage.getItem(DELAY_KEY) || 0
    );

    return !(
      lastClosed &&
      Date.now() - lastClosed < 3600000
    );
  }

  /* ==============================
     PRELOAD SEMUA GAMBAR
  ============================== */

  function preloadImages() {
    return Promise.all(
      IMG.map(function (url) {
        return new Promise(function (resolve) {
          const preload = new Image();

          preload.decoding = "async";

          preload.onload = function () {
            if (typeof preload.decode === "function") {
              preload
                .decode()
                .catch(function () {})
                .finally(resolve);
            } else {
              resolve();
            }
          };

          preload.onerror = resolve;
          preload.src = url;

          if (
            preload.complete &&
            preload.naturalWidth > 0
          ) {
            if (typeof preload.decode === "function") {
              preload
                .decode()
                .catch(function () {})
                .finally(resolve);
            } else {
              resolve();
            }
          }
        });
      })
    );
  }

  /* ==============================
     CSS
  ============================== */

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    const style =
      document.createElement("style");

    style.id = STYLE_ID;

    style.textContent = `

      @keyframes airbet88FadeIn {
        from {
          opacity: 0;
        }

        to {
          opacity: 1;
        }
      }

      @keyframes airbet88FadeOut {
        from {
          opacity: 1;
        }

        to {
          opacity: 0;
        }
      }

      @keyframes airbet88SlideIn {
        from {
          transform: translateY(25px);
          opacity: 0;
        }

        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @keyframes airbet88PopupSpinOut {
        0% {
          transform:
            scale(1)
            rotate(0deg);

          opacity: 1;
        }

        55% {
          transform:
            scale(1.08)
            rotate(360deg);

          opacity: .95;
        }

        100% {
          transform:
            scale(0)
            rotate(720deg);

          opacity: 0;
        }
      }

      @keyframes airbet88Shine {
        0% {
          left: -40%;
        }

        100% {
          left: 125%;
        }
      }

      /* ==============================
         OVERLAY
      ============================== */

      #${OVERLAY_ID} {
        position: fixed;

        inset: 0;

        z-index: 2147483646;

        background:
          linear-gradient(
            180deg,
            rgba(0, 0, 0, .35),
            rgba(0, 0, 0, .82)
          );

        backdrop-filter:
          blur(8px);

        -webkit-backdrop-filter:
          blur(8px);

        animation:
          airbet88FadeIn
          .35s
          ease
          forwards;
      }

      #${OVERLAY_ID}.fade-out {
        animation:
          airbet88FadeOut
          .35s
          ease
          forwards;
      }

      /* ==============================
         POPUP WRAPPER
      ============================== */

      #${POPUP_ID} {
        position: fixed;

        inset: 0;

        z-index: 2147483647;

        display: flex;

        align-items: center;

        justify-content: center;

        flex-direction: column;

        gap: 10px;

        padding: 12px;

        box-sizing: border-box;

        background: transparent;

        overflow-y: auto;
      }

      #${POPUP_ID}.spin-out {
        animation:
          airbet88PopupSpinOut
          .82s
          cubic-bezier(
            .55,
            .05,
            .25,
            1
          )
          forwards;

        transform-origin:
          center center;

        pointer-events: none;
      }

      /* ==============================
         BOX SLIDER
      ============================== */

      #airbet88-popup-box {
        position: relative;

        animation:
          airbet88SlideIn
          .45s
          ease
          forwards;

        filter:
          none !important;

        box-shadow:
          none !important;

        background:
          transparent !important;

        border:
          none !important;
      }

      /* ==============================
         TOMBOL CLOSE
      ============================== */

      #airbet88-close {
        position: absolute;

        top: -12px;

        right: -12px;

        width: 32px;

        height: 32px;

        border-radius: 50%;

        background:
          linear-gradient(
            180deg,
            #67a2a6,
            #24484a 60%,
            #111
          );

        color: #fff;

        font-weight: 900;

        display: flex;

        align-items: center;

        justify-content: center;

        cursor: pointer;

        z-index: 9999;

        border:
          1px solid #8bc7c9;

        box-shadow:
          0 0 16px
          rgba(
            103,
            162,
            166,
            .7
          );

        transition:
          transform .2s ease,
          filter .2s ease;
      }

      #airbet88-close:hover {
        transform:
          scale(1.08);

        filter:
          brightness(1.2);
      }

      #airbet88-close:active {
        transform:
          scale(.92);
      }

      /* ==============================
         IMAGE STAGE
      ============================== */

      #airbet88-image-stage {
        position: relative;

        display: grid;

        place-items: center;

        max-width: 92vw;

        max-height: 58vh;

        overflow: hidden;

        background:
          transparent !important;
      }

      #airbet88-popup-img,
      #airbet88-popup-img-next {
        grid-area:
          1 / 1;

        display: block;

        max-width: 92vw;

        max-height: 58vh;

        width: auto;

        height: auto;

        object-fit: contain;

        border-radius: 0;

        box-shadow:
          none !important;

        filter:
          none !important;

        background:
          transparent !important;

        border:
          none !important;

        will-change:
          transform,
          opacity;
      }

      #airbet88-popup-img {
        position: relative;

        z-index: 1;

        opacity: 1;

        transform:
          translateX(0);
      }

      #airbet88-popup-img-next {
        position: relative;

        z-index: 2;

        opacity: 0;

        transform:
          translateX(100%);

        pointer-events: none;
      }

      /* ==============================
         SLIDE TRANSITION
      ============================== */

      #airbet88-popup-img-next.slide-rtl {
        opacity: 1;

        transform:
          translateX(0);

        transition:
          transform
          .7s
          cubic-bezier(
            .22,
            .8,
            .28,
            1
          ),
          opacity
          .3s
          ease;
      }

      #airbet88-popup-img.slide-old-left {
        opacity: .28;

        transform:
          translateX(-18%);

        transition:
          transform
          .7s
          cubic-bezier(
            .22,
            .8,
            .28,
            1
          ),
          opacity
          .55s
          ease;
      }

      /* ==============================
         NAVIGATION SLIDER
      ============================== */

      .airbet88-nav {
        position: absolute;

        top: 50%;

        transform:
          translateY(-50%);

        width: 30px;

        height: 30px;

        border-radius: 50%;

        border:
          1px solid #8bc7c9;

        background:
          linear-gradient(
            180deg,
            #4f8f92,
            #173638
          );

        color: #fff;

        font-size: 24px;

        font-weight: 900;

        cursor: pointer;

        z-index: 9998;

        line-height: 22px;

        display: flex;

        align-items: center;

        justify-content: center;

        padding: 0;

        box-shadow:
          0 0 14px
          rgba(
            103,
            162,
            166,
            .55
          );

        transition:
          transform .2s ease,
          filter .2s ease;
      }

      .airbet88-nav:hover {
        filter:
          brightness(1.2);
      }

      .airbet88-nav:active {
        transform:
          translateY(-50%)
          scale(.9);
      }

      #airbet88-prev {
        left: 8px;
      }

      #airbet88-next {
        right: 8px;
      }

      /* ==============================
         DOT SLIDER
      ============================== */

      #airbet88-dots {
        position: absolute;

        left: 50%;

        bottom: 10px;

        transform:
          translateX(-50%);

        display: flex;

        align-items: center;

        justify-content: center;

        gap: 7px;

        z-index: 9998;

        padding:
          5px 8px;

        border-radius:
          20px;

        background:
          rgba(
            0,
            0,
            0,
            .25
          );
      }

      .airbet88-dot {
        width: 8px;

        height: 8px;

        min-width: 8px;

        border-radius: 50%;

        border: none;

        background:
          rgba(
            255,
            255,
            255,
            .5
          );

        padding: 0;

        cursor: pointer;

        transition:
          transform .2s ease,
          background .2s ease;
      }

      .airbet88-dot.active {
        background:
          #67a2a6;

        transform:
          scale(1.3);

        box-shadow:
          0 0 10px
          #67a2a6;
      }

      /* ==============================
         TITLE
      ============================== */

      #airbet88-title {
        font-weight: 900;

        font-size: 16px;

        color:
          #b9e3e4;

        letter-spacing:
          2px;

        text-align: center;

        text-shadow:
          0 0 10px
          rgba(
            103,
            162,
            166,
            .9
          ),
          0 0 25px
          rgba(
            103,
            162,
            166,
            .55
          );
      }

      /* ==============================
         GIF ROW
      ============================== */

      .airbet88-gif-row {
        display: flex;

        gap: 10px;

        justify-content: center;

        align-items: center;
      }

      .airbet88-gif-box {
        position: relative;

        width: 90px;
      }

      .airbet88-gif-box img {
        display: block;

        width: 100%;

        border-radius: 12px;

        pointer-events: none;

        box-shadow:
          0 0 10px
          rgba(
            103,
            162,
            166,
            .35
          );
      }

      /* ==============================
         BUTTON ROW
      ============================== */

      .airbet88-btn-row {
        width: 310px;

        display: flex;

        flex-wrap: wrap;

        gap: 8px;

        align-items: center;

        justify-content: center;

        margin-top: 2px;
      }

      .airbet88-btn,
      .airbet88-ok {
        position: relative;

        overflow: hidden;

        cursor: pointer;

        text-align: center;

        font-weight: 900;

        color:
          #fff !important;

        transition:
          transform .18s ease,
          filter .18s ease;
      }

      /* ==============================
         BUTTON UTAMA
      ============================== */

      .airbet88-btn {
        width: 148px;

        padding:
          12px 0;

        border-radius:
          15px;

        font-size:
          12px;

        white-space:
          nowrap;

        text-decoration:
          none;

        letter-spacing:
          .5px;

        background:
          linear-gradient(
            180deg,
            #67a2a6 0%,
            #3f6b6e 30%,
            #24484a 70%,
            #111 100%
          );

        border:
          1px solid
          #8bc7c9;

        box-shadow:
          0 0 12px
          rgba(
            63,
            107,
            110,
            .7
          ),

          0 0 28px
          rgba(
            63,
            107,
            110,
            .38
          ),

          0 9px 22px
          rgba(
            0,
            0,
            0,
            .55
          ),

          inset 0 1px 0
          rgba(
            255,
            255,
            255,
            .2
          );
      }

      /* ==============================
         BUTTON OK
      ============================== */

      .airbet88-ok {
        width: 120px;

        padding:
          11px 0;

        border-radius:
          14px;

        font-size:
          14px;

        background:
          linear-gradient(
            180deg,
            #67a2a6 0%,
            #3f6b6e 38%,
            #24484a 75%,
            #111 100%
          );

        border:
          1px solid
          #b9e3e4;

        box-shadow:
          0 0 12px
          rgba(
            103,
            162,
            166,
            .8
          ),

          0 0 25px
          rgba(
            103,
            162,
            166,
            .45
          ),

          0 8px 20px
          rgba(
            0,
            0,
            0,
            .5
          ),

          inset 0 1px 0
          rgba(
            255,
            255,
            255,
            .2
          );
      }

      .airbet88-btn:hover,
      .airbet88-ok:hover {
        transform:
          scale(1.045);

        filter:
          brightness(1.18);
      }

      .airbet88-btn:active,
      .airbet88-ok:active {
        transform:
          scale(.96);
      }

      /* ==============================
         SHINE BUTTON
      ============================== */

      .airbet88-btn::before,
      .airbet88-ok::before {
        content: "";

        position: absolute;

        top: 0;

        left: -40%;

        width: 25%;

        height: 100%;

        background:
          linear-gradient(
            120deg,

            rgba(
              255,
              255,
              255,
              0
            ),

            rgba(
              185,
              227,
              228,
              .95
            ),

            rgba(
              255,
              255,
              255,
              0
            )
          );

        transform:
          skewX(-25deg);

        animation:
          airbet88Shine
          2s
          infinite;

        pointer-events: none;
      }

      /* ==============================
         MOBILE
      ============================== */

      @media (
        max-width: 768px
      ) {

        #${POPUP_ID} {
          gap: 8px;

          padding:
            10px;
        }

        #airbet88-image-stage,
        #airbet88-popup-img,
        #airbet88-popup-img-next {
          max-width:
            94vw;

          max-height:
            55vh;
        }

        #airbet88-title {
          font-size:
            14px;

          letter-spacing:
            1.4px;
        }

        .airbet88-gif-box {
          width:
            78px;
        }

        .airbet88-btn-row {
          width:
            310px;

          max-width:
            94vw;

          gap:
            8px;
        }

        .airbet88-btn {
          width:
            148px;

          max-width:
            calc(
              47vw - 8px
            );

          font-size:
            12px;

          padding:
            11px 0;
        }

        .airbet88-ok {
          width:
            115px;

          font-size:
            13px;

          padding:
            10px 0;
        }
      }

      /* ==============================
         MOBILE KECIL
      ============================== */

      @media (
        max-width: 390px
      ) {

        .airbet88-gif-row {
          gap: 7px;
        }

        .airbet88-gif-box {
          width:
            72px;
        }

        .airbet88-btn-row {
          width:
            290px;

          max-width:
            94vw;
        }

        .airbet88-btn {
          width:
            139px;

          max-width:
            calc(
              47vw - 8px
            );

          font-size:
            11px;
        }

        #airbet88-title {
          font-size:
            13px;
        }

        #airbet88-close {
          right:
            -5px;

          top:
            -10px;
        }
      }

    `;

    document.head.appendChild(
      style
    );
  }

  /* ==============================
     BUAT POPUP
  ============================== */

  async function createPopup() {
    if (
      popupCreated ||
      !canShowPopup() ||
      !document.body
    ) {
      return;
    }

    popupCreated = true;

    injectStyle();

    await preloadImages();

    /* ==============================
       OVERLAY
    ============================== */

    const overlay =
      document.createElement(
        "div"
      );

    overlay.id =
      OVERLAY_ID;

    /* ==============================
       POPUP
    ============================== */

    const popup =
      document.createElement(
        "div"
      );

    popup.id =
      POPUP_ID;

    popup.innerHTML = `

      <div id="airbet88-popup-box">

        <div
          id="airbet88-close"
          title="Tutup"
          role="button"
          aria-label="Tutup popup"
        >
          ✕
        </div>

        <button
          type="button"
          class="airbet88-nav"
          id="airbet88-prev"
          aria-label="Gambar sebelumnya"
        >
          ‹
        </button>

        <div id="airbet88-image-stage">

          <img
            id="airbet88-popup-img"
            src="${IMG[0]}"
            alt="AIRBET88.com SENSASIONAL Slide 1"
          >

          <img
            id="airbet88-popup-img-next"
            src=""
            alt=""
            aria-hidden="true"
          >

        </div>

        <button
          type="button"
          class="airbet88-nav"
          id="airbet88-next"
          aria-label="Gambar berikutnya"
        >
          ›
        </button>

        <div
          id="airbet88-dots"
        ></div>

      </div>

      <!-- ==========================
           TITLE
      =========================== -->

      <div id="airbet88-title">
        AIRBET88.com SENSASIONAL
      </div>

      <!-- ==========================
           GIF
      =========================== -->

      <div class="airbet88-gif-row">

        <div class="airbet88-gif-box">

          <img
            src="https://media.tenor.com/ky4lyYmnHlsAAAAM/starlight-princess-slot-inces.gif"
            alt="Starlight Princess"
          >

        </div>

        <div class="airbet88-gif-box">

          <img
            src="https://www.image2url.com/r2/default/files/1788196760940-99c297a4-6cae-456d-add1-b529fab5c6ed.webp"
            alt="AIRBET88.com SENSASIONAL"
          >

        </div>

        <div class="airbet88-gif-box">

          <img
            src="https://imgcdn.it.com/knb2zump50st9c6kzrne/VIP_AI88/lucky_neko.webp"
            alt="Lucky Neko"
          >

        </div>

      </div>

      <!-- ==========================
           BUTTON
      =========================== -->

      <div class="airbet88-btn-row">

        <a
          class="airbet88-btn"
          href="https://linknewshortener-ai88.com/telegramrotator"
          target="_blank"
          rel="noopener noreferrer"
        >
          HUBUNGI ADMIN
        </a>

        <a
          class="airbet88-btn"
          href="https://linknewshortener-ai88.com/airbet88vip"
          target="_blank"
          rel="noopener noreferrer"
        >
          MEMBERSHIP VIP
        </a>

        <button
          type="button"
          class="airbet88-ok"
          id="airbet88-ok"
        >
          OK
        </button>

      </div>

    `;

    document.body.appendChild(
      overlay
    );

    document.body.appendChild(
      popup
    );

    /* ==============================
       ELEMENT
    ============================== */

    const sliderImage =
      document.getElementById(
        "airbet88-popup-img"
      );

    const nextSliderImage =
      document.getElementById(
        "airbet88-popup-img-next"
      );

    const dotsContainer =
      document.getElementById(
        "airbet88-dots"
      );

    /* ==============================
       DOT SLIDER
    ============================== */

    function renderDots() {
      dotsContainer.innerHTML =
        "";

      IMG.forEach(
        function (
          _,
          imageIndex
        ) {

          const dot =
            document.createElement(
              "button"
            );

          dot.type =
            "button";

          dot.className =
            "airbet88-dot" +
            (
              imageIndex ===
              currentIndex
                ? " active"
                : ""
            );

          dot.setAttribute(
            "aria-label",
            "Tampilkan gambar " +
              (
                imageIndex +
                1
              )
          );

          dot.addEventListener(
            "click",
            function () {

              changeSlide(
                imageIndex
              );

              resetSliderTimer();

            }
          );

          dotsContainer.appendChild(
            dot
          );
        }
      );
    }

    /* ==============================
       CHANGE SLIDE
    ============================== */

    function changeSlide(
      newIndex
    ) {

      if (
        changingSlide ||
        newIndex < 0 ||
        newIndex >= IMG.length ||
        newIndex === currentIndex
      ) {
        return;
      }

      changingSlide =
        true;

      nextSliderImage
        .classList
        .remove(
          "slide-rtl"
        );

      sliderImage
        .classList
        .remove(
          "slide-old-left"
        );

      /* ==============================
         SET GAMBAR BERIKUTNYA
      ============================== */

      nextSliderImage.src =
        IMG[newIndex];

      nextSliderImage.alt =
        "AIRBET88.com SENSASIONAL Slide " +
        (
          newIndex +
          1
        );

      nextSliderImage.style.transition =
        "none";

      nextSliderImage.style.opacity =
        "0";

      nextSliderImage.style.transform =
        "translateX(100%)";

      /* paksa reflow */

      void nextSliderImage.offsetWidth;

      nextSliderImage.style.transition =
        "";

      nextSliderImage.style.opacity =
        "";

      nextSliderImage.style.transform =
        "";

      /* ==============================
         MULAI ANIMASI
      ============================== */

      sliderImage.classList.add(
        "slide-old-left"
      );

      nextSliderImage.classList.add(
        "slide-rtl"
      );

      let finished =
        false;

      /* ==============================
         FINISH
      ============================== */

      function finishSlide() {
        if (finished) {
          return;
        }

        finished =
          true;

        nextSliderImage
          .removeEventListener(
            "transitionend",
            handleTransitionEnd
          );

        currentIndex =
          newIndex;

        sliderImage.src =
          IMG[currentIndex];

        sliderImage.alt =
          "AIRBET88.com SENSASIONAL Slide " +
          (
            currentIndex +
            1
          );

        sliderImage
          .classList
          .remove(
            "slide-old-left"
          );

        sliderImage.style.transition =
          "none";

        sliderImage.style.opacity =
          "1";

        sliderImage.style.transform =
          "translateX(0)";

        requestAnimationFrame(
          function () {

            requestAnimationFrame(
              function () {

                nextSliderImage.style.transition =
                  "none";

                nextSliderImage
                  .classList
                  .remove(
                    "slide-rtl"
                  );

                nextSliderImage.style.opacity =
                  "0";

                nextSliderImage.style.transform =
                  "translateX(100%)";

                nextSliderImage.src =
                  "";

                nextSliderImage.alt =
                  "";

                requestAnimationFrame(
                  function () {

                    sliderImage.style.transition =
                      "";

                    sliderImage.style.opacity =
                      "";

                    sliderImage.style.transform =
                      "";

                    nextSliderImage.style.transition =
                      "";

                    nextSliderImage.style.opacity =
                      "";

                    nextSliderImage.style.transform =
                      "";

                    changingSlide =
                      false;

                  }
                );
              }
            );
          }
        );

        renderDots();
      }

      /* ==============================
         TRANSITION END
      ============================== */

      function handleTransitionEnd(
        event
      ) {

        if (
          event.target ===
            nextSliderImage &&
          event.propertyName ===
            "transform"
        ) {
          finishSlide();
        }

      }

      nextSliderImage
        .addEventListener(
          "transitionend",
          handleTransitionEnd
        );

      /* FALLBACK */

      window.setTimeout(
        finishSlide,
        900
      );
    }

    /* ==============================
       NEXT
    ============================== */

    function nextSlide() {
      const nextIndex =
        (
          currentIndex +
          1
        ) %
        IMG.length;

      changeSlide(
        nextIndex
      );
    }

    /* ==============================
       PREVIOUS
    ============================== */

    function previousSlide() {
      const previousIndex =
        (
          currentIndex -
          1 +
          IMG.length
        ) %
        IMG.length;

      changeSlide(
        previousIndex
      );
    }

    /* ==============================
       TIMER
    ============================== */

    function startSliderTimer() {
      clearInterval(
        sliderTimer
      );

      sliderTimer =
        setInterval(
          function () {

            nextSlide();

          },
          SLIDER_INTERVAL
        );
    }

    function resetSliderTimer() {
      startSliderTimer();
    }

    /* ==============================
       CLOSE POPUP
    ============================== */

    function closePopup() {
      clearInterval(
        sliderTimer
      );

      popup
        .classList
        .add(
          "spin-out"
        );

      overlay
        .classList
        .add(
          "fade-out"
        );

      /* SIMPAN DELAY 1 JAM */

      localStorage.setItem(
        DELAY_KEY,
        String(
          Date.now()
        )
      );

      setTimeout(
        function () {

          popup.remove();

          overlay.remove();

          popupCreated =
            false;

        },
        860
      );
    }

    /* ==============================
       EVENT NEXT
    ============================== */

    document
      .getElementById(
        "airbet88-next"
      )
      .addEventListener(
        "click",
        function () {

          nextSlide();

          resetSliderTimer();

        }
      );

    /* ==============================
       EVENT PREVIOUS
    ============================== */

    document
      .getElementById(
        "airbet88-prev"
      )
      .addEventListener(
        "click",
        function () {

          previousSlide();

          resetSliderTimer();

        }
      );

    /* ==============================
       EVENT CLOSE
    ============================== */

    document
      .getElementById(
        "airbet88-close"
      )
      .addEventListener(
        "click",
        closePopup
      );

    /* ==============================
       EVENT OK
    ============================== */

    document
      .getElementById(
        "airbet88-ok"
      )
      .addEventListener(
        "click",
        closePopup
      );

    /* ==============================
       INIT SLIDER
    ============================== */

    renderDots();

    startSliderTimer();
  }

  /* ==============================
     INIT
  ============================== */

  function init() {
    let retry =
      0;

    const checkBody =
      setInterval(
        function () {

          createPopup();

          retry++;

          if (
            popupCreated ||
            retry >= 40
          ) {

            clearInterval(
              checkBody
            );

          }

        },
        500
      );
  }

  /* ==============================
     DOCUMENT READY
  ============================== */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init,
      {
        once: true
      }
    );

  } else {

    init();

  }

})();
