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
  const LINK_RTP = "https://linknewshortener-ai88.com/bukti-jp";
  const LINK_BUKTI_JP = "https://linknewshortener-ai88.com/rtp-gacor";
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
        bottom: 80px;          /* kiri bawah, di atas bottom nav */
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
        width: 42px;
        height: 42px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        font-size: 12px;
        font-weight: 800;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        overflow: hidden;
        padding: 0;
        text-transform: uppercase;
      }
      .airbet88-circle:hover {
        transform: scale(1.12);
      }
      /* VIP */
      .airbet88-circle.vip {
        background: linear-gradient(135deg, #00f5d4, #00c4b4, #00a896);
        border: 2px solid #7FFFD4;
        box-shadow: 0 0 16px rgba(0, 245, 212, 0.65), 0 0 30px rgba(0, 245, 212, 0.35);
        color: #FFD700;
        text-shadow: 0 0 6px rgba(255, 215, 0, 0.7);
      }
      .airbet88-circle.vip:hover {
        box-shadow: 0 0 28px rgba(0, 245, 212, 0.95), 0 0 48px rgba(0, 245, 212, 0.5);
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
