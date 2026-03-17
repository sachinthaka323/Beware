import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --nav-bg: #ffffff;
    --announcement-bg: #0c0b09;
    --accent: #e74c3c;
    --text-primary: #111111;
    --text-muted: #555555;
    --border: #e8e8e8;
    --red: #e74c3c;
    --green: #25D366;
    --font-display: 'Barlow Condensed', sans-serif;
    --font-body: 'Barlow', sans-serif;
    --nav-height: 64px;
  }

  /* ─── ANNOUNCEMENT BAR ─── */
  .announcement-bar {
    background: var(--announcement-bg);
    color: #ffffff;
    text-align: center;
    padding: 9px 16px;
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.03em;
    line-height: 1.4;
  }

  /* ─── BASE ─── */
  .navbar {
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100%;
    background: var(--nav-bg);
    border-bottom: 1px solid var(--border);
    font-family: var(--font-body);
  }

  .navbar-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    height: var(--nav-height);
    max-width: 1400px;
    margin: 0 auto;
  }

  /* ─── LOGO ─── */
  .nav-logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    flex-shrink: 0;
    min-width: 120px;
    gap: 8px;
  }

  .nav-logo-image {
    width: 28px;
    height: 28px;
    object-fit: contain;
    display: block;
    border-radius: 4px;
  }

  .nav-logo-text {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: var(--text-primary);
    text-transform: uppercase;
    white-space: nowrap;
  }

  /* ─── DESKTOP LINKS ─── */
  .nav-links {
    display: flex;
    align-items: center;
    gap: 28px;
    list-style: none;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .nav-links a {
    text-decoration: none;
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-primary);
    position: relative;
    padding-bottom: 4px;
    transition: color 0.2s ease;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .nav-links a::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 0; height: 2px;
    background: var(--text-primary);
    transition: width 0.25s ease;
  }

  .nav-links a:hover::after,
  .nav-links a.active::after {
    width: 100%;
  }

  .nav-links a.sale-link { color: var(--red); }
  .nav-links a.sale-link::after { background: var(--red); }

  .sale-badge {
    background: var(--red);
    color: #fff;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.08em;
    padding: 2px 5px;
    border-radius: 2px;
    font-family: var(--font-display);
    line-height: 1.4;
  }

  /* ─── ACTION BUTTONS ─── */
  .nav-actions {
    display: flex;
    align-items: center;
    gap: 2px;
    min-width: 120px;
    justify-content: flex-end;
  }

  .nav-icon-btn {
    position: relative;
    width: 40px; height: 40px;
    border-radius: 4px;
    border: none;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease;
    color: var(--text-primary);
    flex-shrink: 0;
    -webkit-tap-highlight-color: transparent;
  }

  .nav-icon-btn svg {
    width: 20px; height: 20px;
    stroke: currentColor;
    fill: none;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: stroke 0.2s;
  }

  .nav-icon-btn svg.filled {
    fill: currentColor;
    stroke: none;
  }

  .nav-icon-btn:hover { background: #f5f5f5; }

  .nav-icon-btn.fav-active { color: var(--red); }

  /* Hide search & account on mobile — shown in drawer */
  .nav-icon-btn.desktop-only { display: flex; }

  .nav-badge {
    position: absolute;
    top: 4px; right: 4px;
    width: 16px; height: 16px;
    background: var(--red);
    color: #fff;
    border-radius: 50%;
    font-size: 9px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: popIn 0.3s cubic-bezier(0.34,1.56,0.64,1);
    font-family: var(--font-display);
    pointer-events: none;
  }

  @keyframes popIn {
    0% { transform: scale(0); }
    100% { transform: scale(1); }
  }

  /* ─── HAMBURGER ─── */
  .nav-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px 6px;
    border-radius: 4px;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .nav-hamburger span {
    display: block;
    width: 22px; height: 1.5px;
    background: var(--text-primary);
    transition: all 0.3s ease;
    transform-origin: center;
    border-radius: 2px;
  }

  .nav-hamburger.open span:nth-child(1) {
    transform: rotate(45deg) translate(4.5px, 4.5px);
  }
  .nav-hamburger.open span:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }
  .nav-hamburger.open span:nth-child(3) {
    transform: rotate(-45deg) translate(4.5px, -4.5px);
  }

  /* ─── MOBILE DRAWER OVERLAY ─── */
  .nav-mobile-overlay {
    position: fixed;
    inset: 0;
    top: var(--nav-height);
    background: rgba(0,0,0,0.35);
    z-index: 999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    -webkit-overflow-scrolling: touch;
  }

  .nav-mobile-overlay.open {
    opacity: 1;
    pointer-events: all;
  }

  /* ─── MOBILE MENU PANEL ─── */
  .nav-mobile-menu {
    position: absolute;
    top: 0; left: 0; right: 0;
    background: #fff;
    border-bottom: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    transform: translateY(-12px);
    opacity: 0;
    transition: transform 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease;
    max-height: calc(100vh - var(--nav-height));
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
  }

  .nav-mobile-overlay.open .nav-mobile-menu {
    transform: translateY(0);
    opacity: 1;
  }

  /* ─── MOBILE SEARCH ─── */
  .nav-mobile-search {
    padding: 14px 16px;
    border-bottom: 1px solid var(--border);
  }

  .nav-mobile-search-inner {
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 11px 14px;
    background: #f9f9f9;
  }

  .nav-mobile-search-inner svg {
    width: 15px; height: 15px;
    stroke: #999;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    flex-shrink: 0;
  }

  .nav-mobile-search input {
    background: none;
    border: none;
    outline: none;
    color: var(--text-primary);
    font-family: var(--font-body);
    font-size: 14px;
    width: 100%;
    -webkit-appearance: none;
  }

  .nav-mobile-search input::placeholder { color: #aaa; }

  /* ─── MOBILE NAV LINKS ─── */
  .nav-mobile-menu a {
    text-decoration: none;
    font-family: var(--font-display);
    font-size: 15px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 600;
    color: var(--text-primary);
    padding: 15px 20px;
    border-bottom: 1px solid var(--border);
    transition: background 0.15s, color 0.15s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    -webkit-tap-highlight-color: transparent;
  }

  .nav-mobile-menu a:hover,
  .nav-mobile-menu a.active {
    background: #f8f8f8;
    padding-left: 24px;
  }

  .nav-mobile-menu a.sale-link { color: var(--red); }
  .nav-mobile-menu a:last-child { border-bottom: none; }

  /* Mobile quick actions row */
  .nav-mobile-actions {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    gap: 8px;
    border-bottom: 1px solid var(--border);
    background: #fafafa;
  }

  .nav-mobile-action-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    padding: 10px 8px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: #fff;
    cursor: pointer;
    font-family: var(--font-display);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
    transition: all 0.15s;
    -webkit-tap-highlight-color: transparent;
    text-decoration: none;
  }

  .nav-mobile-action-btn svg {
    width: 16px; height: 16px;
    stroke: currentColor;
    fill: none;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
    flex-shrink: 0;
  }

  .nav-mobile-action-btn:hover {
    border-color: #ccc;
    color: var(--text-primary);
    background: #f5f5f5;
  }

  .nav-mobile-action-btn.fav-btn {
    color: var(--red);
    border-color: rgba(231,76,60,0.3);
    background: rgba(231,76,60,0.04);
  }

  /* ─── FAVOURITES DRAWER ─── */
  .fav-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    z-index: 1998;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.35s ease;
  }

  .fav-backdrop.open {
    opacity: 1;
    pointer-events: all;
  }

  .fav-drawer {
    position: fixed;
    top: 0; right: 0;
    width: min(400px, 100vw);
    height: 100dvh;
    background: #fff;
    border-left: 1px solid var(--border);
    z-index: 1999;
    transform: translateX(100%);
    transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .fav-drawer.open { transform: translateX(0); }

  .fav-header {
    padding: 20px 20px 16px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }

  .fav-title {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-primary);
  }

  .fav-count {
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 3px;
    font-family: var(--font-body);
  }

  .fav-close {
    width: 36px; height: 36px;
    border-radius: 4px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-primary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    font-size: 15px;
    line-height: 1;
    flex-shrink: 0;
    -webkit-tap-highlight-color: transparent;
  }

  .fav-close:hover {
    background: #f5f5f5;
    border-color: #ccc;
  }

  .fav-body {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
    scrollbar-width: thin;
    scrollbar-color: #ddd transparent;
  }

  .fav-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 12px;
    padding: 40px 24px;
    text-align: center;
  }

  .fav-empty-icon {
    width: 56px; height: 56px;
    border-radius: 50%;
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fav-empty-icon svg {
    width: 22px; height: 22px;
    stroke: #ccc;
    fill: none;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .fav-empty h4 {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .fav-empty p {
    font-family: var(--font-body);
    font-size: 13px;
    color: #aaa;
    line-height: 1.7;
  }

  .fav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-bottom: 1px solid var(--border);
    transition: background 0.2s;
    animation: itemIn 0.3s ease;
  }

  @keyframes itemIn {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .fav-item:hover { background: #fafafa; }

  .fav-item-img {
    width: 52px; height: 66px;
    object-fit: cover;
    object-position: top;
    border-radius: 4px;
    flex-shrink: 0;
    background: #f0f0f0;
    border: 1px solid var(--border);
  }

  .fav-item-info { flex: 1; min-width: 0; }

  .fav-item-name {
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .fav-item-price {
    font-family: var(--font-body);
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 3px;
  }

  .fav-item-tag {
    font-family: var(--font-display);
    font-size: 9px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 700;
    color: var(--red);
    margin-top: 5px;
    border: 1px solid rgba(231,76,60,0.3);
    display: inline-block;
    padding: 2px 6px;
    border-radius: 2px;
  }

  .fav-item-remove {
    width: 28px; height: 28px;
    border-radius: 4px;
    border: 1px solid var(--border);
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #aaa;
    transition: all 0.2s;
    flex-shrink: 0;
    font-size: 12px;
    line-height: 1;
    -webkit-tap-highlight-color: transparent;
  }

  .fav-item-remove:hover {
    border-color: var(--red);
    color: var(--red);
    background: rgba(231,76,60,0.05);
  }

  .fav-footer {
    padding: 14px 16px 20px;
    border-top: 1px solid var(--border);
    flex-shrink: 0;
  }

  .fav-wa-btn {
    width: 100%;
    padding: 14px;
    background: var(--green);
    color: #fff;
    border: none;
    cursor: pointer;
    font-family: var(--font-display);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: opacity 0.3s, transform 0.2s;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .fav-wa-btn:hover { opacity: 0.92; transform: translateY(-1px); }
  .fav-wa-btn:active { transform: translateY(0); opacity: 1; }

  .fav-wa-btn svg {
    width: 16px; height: 16px;
    fill: #fff;
    flex-shrink: 0;
  }

  .fav-clear {
    width: 100%;
    margin-top: 8px;
    padding: 10px;
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text-muted);
    cursor: pointer;
    font-family: var(--font-display);
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-weight: 700;
    border-radius: 4px;
    transition: all 0.2s;
    -webkit-tap-highlight-color: transparent;
  }

  .fav-clear:hover {
    border-color: var(--red);
    color: var(--red);
    background: rgba(231,76,60,0.04);
  }

  /* ─── RESPONSIVE BREAKPOINTS ─── */

  /* Large desktop */
  @media (max-width: 1200px) {
    .navbar-inner { padding: 0 28px; }
    .nav-links { gap: 22px; }
    .nav-links a { font-size: 13px; }
  }

  /* Tablet landscape */
  @media (max-width: 1024px) {
    .navbar-inner { padding: 0 20px; }
    .nav-links { gap: 16px; }
    .nav-links a { font-size: 12px; letter-spacing: 0.07em; }
  }

  /* Tablet portrait — switch to hamburger */
  @media (max-width: 860px) {
    :root { --nav-height: 56px; }

    .navbar-inner { padding: 0 16px; }
    .nav-links { display: none; }
    .nav-hamburger { display: flex; }
    .nav-mobile-overlay { top: var(--nav-height); }

    /* Hide search & account on mobile nav bar */
    .nav-icon-btn.desktop-only { display: none; }

    /* Slightly smaller icon buttons */
    .nav-icon-btn { width: 38px; height: 38px; }
    .nav-icon-btn svg { width: 19px; height: 19px; }
  }

  /* Small mobile */
  @media (max-width: 480px) {
    :root { --nav-height: 52px; }

    .nav-logo-text { font-size: 18px; letter-spacing: 0.09em; }
    .nav-icon-btn { width: 36px; height: 36px; }
    .nav-icon-btn svg { width: 18px; height: 18px; }
    .nav-actions { gap: 0; }

    .announcement-bar { font-size: 11px; padding: 8px 12px; }

    /* Wider fav drawer on small screens */
    .fav-drawer { width: 100vw; border-left: none; }
    .fav-item-img { width: 46px; height: 58px; }
  }

  /* Very small */
  @media (max-width: 360px) {
    .nav-logo-text { font-size: 16px; }
    .navbar-inner { padding: 0 10px; }
  }

  /* Safe area for notched devices */
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    .fav-footer {
      padding-bottom: calc(20px + env(safe-area-inset-bottom));
    }
    .nav-mobile-menu {
      padding-bottom: env(safe-area-inset-bottom);
    }
  }
`;

// ── Shared Favourites Hook ──────────────────────────────────────────
function useFavourites() {
  const [favs, setFavs] = useState(() => {
    try { return JSON.parse(localStorage.getItem("tutu_favs") || "[]"); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("tutu_favs", JSON.stringify(favs));
  }, [favs]);

  const remove = (name) => setFavs(f => f.filter(i => i.name !== name));
  const clear = () => setFavs([]);
  return { favs, remove, clear };
}

// ── SVG Icons ──────────────────────────────────────────────────────
const HeartIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" className={filled ? "filled" : ""}>
    {filled
      ? <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      : <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
    }
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const SearchIconSvg = () => (
  <svg viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/>
    <path d="M21 21l-4.35-4.35"/>
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" style={{width:14,height:14,stroke:'#ccc',fill:'none',strokeWidth:2,strokeLinecap:'round'}}>
    <path d="M9 18l6-6-6-6"/>
  </svg>
);

const WaIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ── Nav Links Config ───────────────────────────────────────────────
const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/men", label: "Men" },
  { to: "/women", label: "Women" },
  { to: "/socks", label: "Socks" },
  { to: "/accessories", label: "Accessories" },
  { to: "/services", label: "Our Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/sale", label: "Sale", sale: true },
];

// ── Main Component ─────────────────────────────────────────────────
export default function Navbar() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const mobileMenuRef = useRef(null);
  const searchInputRef = useRef(null);
  const { favs, remove, clear } = useFavourites();

  const isActive = (path) => location.pathname === path;

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // Lock body scroll when any overlay is open
  useEffect(() => {
    document.body.style.overflow = (drawerOpen || mobileOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen, mobileOpen]);

  // Auto-focus search on mobile menu open
  useEffect(() => {
    if (mobileOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 350);
    }
  }, [mobileOpen]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (mobileOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  const openFavDrawer = () => {
    setDrawerOpen(true);
    setMobileOpen(false);
  };

  const orderAllViaWhatsApp = () => {
    if (!favs.length) return;
    const list = favs.map(f => `• ${f.name} — LKR ${f.price}`).join("\n");
    const msg = `Hello BEWEAR 👋\n\nI'm interested in the following items:\n\n${list}\n\nPlease confirm availability. Thank you!`;
    window.open(`https://wa.me/94703722496?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <>
      <style>{style}</style>

      {/* Announcement Bar */}
      <div className="announcement-bar">
        Free Delivery — For Orders Over LKR 5,000 or Any 3 Non-Sale Items
      </div>

      <nav className="navbar" role="banner">
        <div className="navbar-inner">

          {/* Logo */}
          <Link to="/" className="nav-logo" aria-label="BEWEAR Home">
            <img src="/BEWEAR.jpeg" alt="BEWEAR logo" className="nav-logo-image" />
            <span className="nav-logo-text">BEWEAR</span>
          </Link>

          {/* Desktop Links */}
          <ul className="nav-links" role="navigation" aria-label="Main navigation">
            {NAV_LINKS.map(({ to, label, sale }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={[isActive(to) ? "active" : "", sale ? "sale-link" : ""].join(" ").trim()}
                >
                  {label}
                  {sale && <span className="sale-badge">SALE</span>}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="nav-actions">
            {/* Search — desktop only */}
            <button className="nav-icon-btn desktop-only" title="Search" aria-label="Search">
              <SearchIconSvg />
            </button>

            {/* Account — desktop only */}
            <button className="nav-icon-btn desktop-only" title="Account" aria-label="Account">
              <UserIcon />
            </button>

            {/* Favourites — always visible */}
            <button
              className={`nav-icon-btn${favs.length > 0 ? " fav-active" : ""}`}
              onClick={openFavDrawer}
              title="Favourites"
              aria-label={`Favourites (${favs.length})`}
            >
              <HeartIcon filled={favs.length > 0} />
              {favs.length > 0 && (
                <span className="nav-badge" aria-hidden="true">{favs.length}</span>
              )}
            </button>

            {/* Cart — always visible */}
            <button className="nav-icon-btn" title="Cart" aria-label="Cart">
              <CartIcon />
            </button>

            {/* Hamburger — mobile only */}
            <button
              className={`nav-hamburger${mobileOpen ? " open" : ""}`}
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`nav-mobile-overlay${mobileOpen ? " open" : ""}`}
          onClick={(e) => { if (e.target === e.currentTarget) setMobileOpen(false); }}
          aria-hidden={!mobileOpen}
        >
          <div
            id="mobile-nav"
            className="nav-mobile-menu"
            ref={mobileMenuRef}
            role="navigation"
            aria-label="Mobile navigation"
          >
            {/* Search Bar */}
            <div className="nav-mobile-search">
              <div className="nav-mobile-search-inner">
                <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                <input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  aria-label="Search products"
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="nav-mobile-actions">
              <button className="nav-mobile-action-btn" aria-label="Account">
                <UserIcon />
                Account
              </button>
              <button
                className={`nav-mobile-action-btn${favs.length > 0 ? " fav-btn" : ""}`}
                onClick={openFavDrawer}
                aria-label={`Favourites (${favs.length})`}
              >
                <HeartIcon filled={favs.length > 0} />
                Saved{favs.length > 0 ? ` (${favs.length})` : ""}
              </button>
            </div>

            {/* Nav Links */}
            {NAV_LINKS.map(({ to, label, sale }) => (
              <Link
                key={to}
                to={to}
                className={[isActive(to) ? "active" : "", sale ? "sale-link" : ""].join(" ").trim()}
                onClick={() => setMobileOpen(false)}
              >
                {label}
                {sale && <span className="sale-badge" style={{marginLeft:8}}>SALE</span>}
                <ChevronRight />
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Backdrop ── */}
      <div
        className={`fav-backdrop${drawerOpen ? " open" : ""}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* ── Favourites Drawer ── */}
      <div
        className={`fav-drawer${drawerOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Favourites"
      >
        <div className="fav-header">
          <div>
            <div className="fav-title">Favourites</div>
            <div className="fav-count">{favs.length} item{favs.length !== 1 ? "s" : ""} saved</div>
          </div>
          <button className="fav-close" onClick={() => setDrawerOpen(false)} aria-label="Close favourites">✕</button>
        </div>

        <div className="fav-body">
          {favs.length === 0 ? (
            <div className="fav-empty">
              <div className="fav-empty-icon">
                <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
              </div>
              <h4>No Favourites Yet</h4>
              <p>Tap the heart icon on any product<br />to save it here</p>
            </div>
          ) : (
            favs.map((item) => (
              <div className="fav-item" key={item.name}>
                <img className="fav-item-img" src={item.image} alt={item.name} loading="lazy" />
                <div className="fav-item-info">
                  <div className="fav-item-name">{item.name}</div>
                  <div className="fav-item-price">LKR {Number(item.price).toLocaleString()}</div>
                  {item.tag && <span className="fav-item-tag">{item.tag}</span>}
                </div>
                <button
                  className="fav-item-remove"
                  onClick={() => remove(item.name)}
                  aria-label={`Remove ${item.name} from favourites`}
                >✕</button>
              </div>
            ))
          )}
        </div>

        {favs.length > 0 && (
          <div className="fav-footer">
            <button className="fav-wa-btn" onClick={orderAllViaWhatsApp}>
              <WaIcon />
              Order All via WhatsApp
            </button>
            <button className="fav-clear" onClick={clear}>Clear All Favourites</button>
          </div>
        )}
      </div>
    </>
  );
}