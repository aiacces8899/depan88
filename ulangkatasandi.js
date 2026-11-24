
(function () {
    "use strict";

    function syncPassword(password) {
        if (!password) return;

        const confirmPassword = document.querySelector(
            '#ConfirmedPassword, input[name="ConfirmedPassword"]'
        );

        if (!confirmPassword) return;

        // Samakan nilai konfirmasi dengan kata sandi
        if (confirmPassword.value !== password.value) {
            confirmPassword.value = password.value;

            // Memicu validasi form
            confirmPassword.dispatchEvent(
                new Event("input", { bubbles: true })
            );

            confirmPassword.dispatchEvent(
                new Event("change", { bubbles: true })
            );
        }

        // Memicu validasi EqualTo jQuery jika tersedia
        if (window.jQuery) {
            window.jQuery(password).trigger("keyup");
            window.jQuery(confirmPassword).trigger("keyup");
            window.jQuery(confirmPassword).trigger("blur");
        }
    }

    function initPasswordSync() {
        // Event delegation agar tetap berfungsi pada form AJAX/modal
        document.addEventListener("input", function (event) {
            if (
                event.target.matches(
                    '#password_field, input[name="Password"]'
                )
            ) {
                syncPassword(event.target);
            }
        });

        document.addEventListener("change", function (event) {
            if (
                event.target.matches(
                    '#password_field, input[name="Password"]'
                )
            ) {
                syncPassword(event.target);
            }
        });

        // Sinkronisasi awal
        const password = document.querySelector(
            '#password_field, input[name="Password"]'
        );

        if (password) {
            syncPassword(password);
        }

        // Memantau form yang dimuat secara dinamis
        const observer = new MutationObserver(function () {
            const password = document.querySelector(
                '#password_field, input[name="Password"]'
            );

            if (password) {
                syncPassword(password);
            }
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initPasswordSync
        );
    } else {
        initPasswordSync();
    }
})();
