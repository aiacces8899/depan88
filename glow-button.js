(function () {
    "use strict";

    const STYLE_ID = "airbet88-main-menu-style";

    // Mencegah style terpasang lebih dari sekali
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;

    style.textContent = `
        @keyframes airbet88MenuBorderFlow {
            0% {
                background-position: 0 50%;
            }

            100% {
                background-position: 200% 50%;
            }
        }

        #main_menu_outer_container main a {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            min-width: 85px;
            padding: 6px 5px;

            color: inherit;
            font-size: 10px;
            font-weight: 700;
            text-decoration: none;

            background: unset !important;
            border: 2px solid transparent;
            border-radius: 14px;

            overflow: hidden;
            transition: transform 0.25s ease;
        }

        #main_menu_outer_container main a::before {
            content: "";
            position: absolute;
            inset: 0;

            padding: 2px;
            border-radius: 14px;

            background: linear-gradient(
                120deg,
                #4fffe6,
                #22cfc3,
                #0b7f7a,
                #4fffe6
            );

            background-size: 200% 100%;
            animation:
                airbet88MenuBorderFlow
                1s
                linear
                infinite;

            -webkit-mask:
                linear-gradient(#ffffff 0 0) content-box,
                linear-gradient(#ffffff 0 0);

            -webkit-mask-composite: xor;

            mask:
                linear-gradient(#ffffff 0 0) content-box,
                linear-gradient(#ffffff 0 0);

            mask-composite: exclude;
            pointer-events: none;
        }

        #main_menu_outer_container main a img,
        #main_menu_outer_container main a svg,
        #main_menu_outer_container main a i,
        #main_menu_outer_container main a span,
        #main_menu_outer_container main a p {
            position: relative;
            z-index: 1;

            filter: none !important;
            text-shadow: none !important;
        }

        #main_menu_outer_container main a:hover {
            transform: translateY(-1px) scale(1.02);
        }

        @media (prefers-reduced-motion: reduce) {
            #main_menu_outer_container main a {
                transition: none;
            }

            #main_menu_outer_container main a::before {
                animation: none;
            }
        }
    `;

    (document.head || document.documentElement).appendChild(style);
})();
