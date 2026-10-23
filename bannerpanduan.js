(function () {
    "use strict";

    const BANNER_IMAGE_URL =
        "https://www.image2url.com/r2/default/images/1787742101261-9f6b5573-158c-4330-9f22-0ad180fc3e66.jpg";

    const BANNER_LINK_URL =
        "https://linknewshortener-ai88.com/guide-betting-game  ";

    const STYLE_ID = "airbet88-promotion-banner-style";
    const BANNER_ID = "airbet88-promotion-banner";
    const TARGET_SELECTOR = ".promotion-list";

    function injectBannerStyle() {
        if (document.getElementById(STYLE_ID)) return;

        const style = document.createElement("style");
        style.id = STYLE_ID;

        style.textContent = `
            #${BANNER_ID} {
                position: relative;
                overflow: hidden;
                width: 100%;
                margin-bottom: 15px;
                border-radius: 0;
                box-shadow: none;
            }

            #${BANNER_ID} a {
                display: block;
                width: 100%;
            }

            #${BANNER_ID} .main-banner {
                display: block;
                width: 100%;
                height: auto;
                border-radius: 0;
            }

            #${BANNER_ID}::before {
                content: "";
                position: absolute;
                top: 0;
                left: -160%;
                width: 12%;
                height: 100%;
                background: linear-gradient(
                    120deg,
                    rgba(255, 255, 255, 0) 0%,
                    rgba(255, 255, 255, 0.35) 45%,
                    rgba(255, 255, 255, 0.60) 50%,
                    rgba(255, 255, 255, 0.35) 55%,
                    rgba(255, 255, 255, 0) 100%
                );
                transform: skewX(-20deg);
                animation: airbetBannerShine 2.2s linear infinite;
                pointer-events: none;
                z-index: 2;
            }

            #${BANNER_ID}::after {
                content: "";
                position: absolute;
                inset: 0;
                padding: 2px;
                background: linear-gradient(
                    120deg,
                    #4fffe6,
                    #22cfc3,
                    #0b7f7a,
                    #4fffe6
                );
                background-size: 200% 100%;
                animation: airbetBorderFlow 1.6s linear infinite;
                pointer-events: none;
                z-index: 3;
                opacity: 0.85;

                -webkit-mask:
                    linear-gradient(#fff 0 0) content-box,
                    linear-gradient(#fff 0 0);
                -webkit-mask-composite: xor;

                mask:
                    linear-gradient(#fff 0 0) content-box,
                    linear-gradient(#fff 0 0);
                mask-composite: exclude;
            }

            @keyframes airbetBannerShine {
                from {
                    left: -160%;
                }

                to {
                    left: 160%;
                }
            }

            @keyframes airbetBorderFlow {
                from {
                    background-position: 0 50%;
                }

                to {
                    background-position: 200% 50%;
                }
            }

            @media (prefers-reduced-motion: reduce) {
                #${BANNER_ID}::before,
                #${BANNER_ID}::after {
                    animation: none;
                }
            }
        `;

        (document.head || document.documentElement).appendChild(style);
    }

    function createBanner(target) {
        if (!target || document.getElementById(BANNER_ID)) return;

        const banner = document.createElement("div");
        banner.id = BANNER_ID;
        banner.className = "promotion-banner";

        const link = document.createElement("a");
        link.href = BANNER_LINK_URL;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        const image = document.createElement("img");
        image.src = BANNER_IMAGE_URL;
        image.className = "main-banner";
        image.alt = "Panduan AIRBET88";
        image.loading = "eager";
        image.decoding = "async";

        link.appendChild(image);
        banner.appendChild(link);
        target.insertBefore(banner, target.firstChild);
    }

    function insertBanner() {
        if (document.getElementById(BANNER_ID)) return true;

        const target = document.querySelector(TARGET_SELECTOR);

        if (!target) return false;

        createBanner(target);
        return true;
    }

    function initialize() {
        injectBannerStyle();

        if (insertBanner()) return;

        const observer = new MutationObserver(function () {
            if (insertBanner()) {
                observer.disconnect();
            }
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });

        // Hentikan pemantauan setelah 30 detik
        window.setTimeout(function () {
            observer.disconnect();
        }, 30000);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize, {
            once: true
        });
    } else {
        initialize();
    }
})();
