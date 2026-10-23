(function () {
    "use strict";

    const STYLE_ID = "airbet88-promo-hot-shine-style";

    if (document.getElementById(STYLE_ID)) return;

    const HOT_ICON =
        "https://dsuown9evwz4y.cloudfront.net/Images/icons/floating-icon/1.png?v=20250528";

    const selectors = [
        'a[href^="/desktop/bonus#"]',
        'a[href^="/mobile/bonus#"]',

        'a[href^="/desktop/cashback#"]',
        'a[href^="/mobile/cashback#"]',

        'a[href^="/desktop/commission#"]',
        'a[href^="/mobile/commission#"]'
    ];

    const TARGETS = selectors.join(",");

    const TARGETS_BEFORE = selectors
        .map(function (selector) {
            return selector + "::before";
        })
        .join(",");

    const TARGETS_AFTER = selectors
        .map(function (selector) {
            return selector + "::after";
        })
        .join(",");

    const style = document.createElement("style");

    style.id = STYLE_ID;
    style.setAttribute("data-airbet88-promo-hot", "1");

    style.textContent = `
        ${TARGETS} {
            position: relative !important;
            overflow: visible !important;
            isolation: isolate;
        }

        /*
         * EFEK KILAP AIRBET88
         */
        ${TARGETS_BEFORE} {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;

            background-image:
                linear-gradient(
                    105deg,
                    transparent 0%,
                    transparent 39%,
                    rgba(255, 255, 255, 0.05) 44%,
                    rgba(255, 255, 255, 0.22) 49%,
                    rgba(255, 248, 220, 0.38) 51%,
                    rgba(255, 255, 255, 0.16) 54%,
                    transparent 61%,
                    transparent 100%
                );

            background-size: 260% 100%;
            background-repeat: no-repeat;
            background-position: 140% 0;

            pointer-events: none;
            z-index: 2;

            animation:
                airbet88PromoShineInside
                4.2s
                ease-in-out
                infinite;

            overflow: hidden;
            clip-path: inset(0 round 999px);
        }

        @keyframes airbet88PromoShineInside {
            0% {
                background-position: 140% 0;
                opacity: 0;
            }

            8% {
                opacity: 1;
            }

            48% {
                opacity: 1;
            }

            58% {
                background-position: -140% 0;
                opacity: 0;
            }

            100% {
                background-position: -140% 0;
                opacity: 0;
            }
        }

        /*
         * ICON HOT AIRBET88
         */
        ${TARGETS_AFTER} {
            content: "";
            position: absolute;

            top: -16px;
            right: -14px;

            width: 28px;
            height: 28px;

            background:
                url("${HOT_ICON}")
                no-repeat
                center / contain;

            pointer-events: none;
            z-index: 10;

            animation:
                airbet88HotBlink
                1.6s
                ease-in-out
                infinite;

            transform-origin: center;

            will-change:
                opacity,
                filter,
                transform;
        }

        @keyframes airbet88HotBlink {
            0%,
            100% {
                opacity: 1;
                filter: brightness(1);
                transform: scale(1);
            }

            50% {
                opacity: 0.48;
                filter: brightness(1.35);
                transform: scale(0.96);
            }
        }

        .promotion-sidebar,
        .promotion-filter,
        .promotion-menu {
            overflow: visible !important;
        }

        .promotion-sidebar a,
        .promotion-filter a,
        .promotion-menu a {
            position: relative;
            z-index: 3;
        }

        @media (max-width: 768px) {
            ${TARGETS_AFTER} {
                width: 26px;
                height: 26px;
                top: -14px;
                right: -11px;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            ${TARGETS_BEFORE} {
                animation: none;
                background-image: none;
            }

            ${TARGETS_AFTER} {
                animation: none;
            }
        }
    `;

    (document.head || document.documentElement).appendChild(style);
})();
