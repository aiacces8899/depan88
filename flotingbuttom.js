(function () {
  "use strict";

  function createQuickAccess() {
    const ID = "airbet88-quick-access";
    if (document.getElementById(ID)) return;

    const button = document.createElement("a");
    button.id = ID;
    button.href = "https://linknewshortener-ai88.com/quickacces";
    button.target = "_blank";
    button.rel = "noopener noreferrer";
    button.setAttribute("aria-label", "Buka Quick Access di tab baru");

    Object.assign(button.style, {
      position: "fixed",
      right: "12px",
      bottom: "80px",
      display: "block",
      width: "48px",
      height: "48px",
      padding: "0",
      margin: "0",
      border: "none",
      background: "transparent",
      lineHeight: "0",
      zIndex: "2147483000"
    });

    const image = document.createElement("img");
    image.src =
      "https://www.image2url.com/r2/default/gifs/1793158998627-b94df388-c7c0-4b02-b3e3-4ad85744530c.gif";
    image.alt = "";
    image.draggable = false;

    Object.assign(image.style, {
      display: "block",
      width: "100%",
      height: "100%",
      maxWidth: "none",
      objectFit: "contain"
    });

    button.appendChild(image);
    document.body.appendChild(button);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createQuickAccess, {
      once: true
    });
  } else {
    createQuickAccess();
  }
})();
