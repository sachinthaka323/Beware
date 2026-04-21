import { useState, useEffect } from "react";
import { PRODUCTS } from "../data/products";

const BADGE_STYLES = {
  "Featured":     { bg: "#0a0a0a", text: "#fff" },
  "Trending":     { bg: "#c84b0f", text: "#fff" },
  "New Arrival":  { bg: "#1a3a2a", text: "#d4f0e0" },
  "New":          { bg: "#1a3a2a", text: "#d4f0e0" },
  "Oversize Fit": { bg: "#3d2b1a", text: "#f5dfc9" },
  "Limited":      { bg: "#2d0a5e", text: "#e8d5ff" },
};
const getBadge = (b) => BADGE_STYLES[b] || { bg: "#0a0a0a", text: "#fff" };

const products = PRODUCTS;

/* ─── CSS ────────────────────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }

:root {
  --l-bg:        #f9f7f4;
  --l-surface:   #ffffff;
  --l-card-bg:   #ffffff;
  --l-border:    #e8e3db;
  --l-ink:       #1a1814;
  --l-ink-soft:  #4a4640;
  --l-muted:     #9a9389;
  --l-accent:    #b8935a;
  --l-accent-lt: #f5ede0;
  --l-sand:      #d4c4a8;

  --cream:        #f7f3ec;
  --cream-dim:    #e8e3d9;
  --sand:         #c9b99a;
  --ink:          #0e0d0b;
  --ink-soft:     #1c1b17;
  --ink-mid:      #2e2c26;
  --accent:       #c8a96e;
  --accent-dim:   #9a7d4a;
  --muted:        #6b6659;
  --surface:      #17160f;
  --surface-raised: #1f1e17;
  --border:       rgba(255,255,255,0.07);
  --border-warm:  rgba(200,169,110,0.2);
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--l-bg); }
::-webkit-scrollbar-thumb { background: var(--l-sand); border-radius: 2px; }

/* ════ LIGHT NAVBAR ════ */
.l-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  height: 66px;
  background: rgba(249,247,244,0.94);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--l-border);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 48px;
}
.l-nav-logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem; font-weight: 500; letter-spacing: 0.24em;
  color: var(--l-ink); text-transform: uppercase; cursor: pointer;
}
.l-nav-logo em { font-style: normal; color: var(--l-accent); }
.l-nav-links {
  display: flex; gap: 32px;
  position: absolute; left: 50%; transform: translateX(-50%);
}
.l-nav-link {
  background: none; border: none; cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--l-ink-soft); transition: color 0.2s; padding: 0;
}
.l-nav-link:hover { color: var(--l-ink); }
.l-nav-icons { display: flex; align-items: center; gap: 4px; }
.l-nav-btn {
  background: none; border: none; cursor: pointer;
  color: var(--l-ink-soft); padding: 8px;
  display: flex; align-items: center; border-radius: 8px;
  transition: color 0.2s, background 0.2s; position: relative;
}
.l-nav-btn:hover { color: var(--l-ink); background: rgba(0,0,0,0.04); }
.l-cart-badge {
  position: absolute; top: 4px; right: 4px;
  width: 14px; height: 14px; border-radius: 50%;
  background: var(--l-accent); color: #fff;
  font-size: 0.48rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}

/* ════ LIGHT COLLECTION PAGE ════ */
.pg-collection {
  min-height: 100vh; padding-top: 66px;
  background: var(--l-bg);
  font-family: 'DM Sans', sans-serif;
}

.l-hero {
  padding: 80px 48px 64px;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  border-bottom: 1px solid var(--l-border);
  background: var(--l-surface);
  position: relative; overflow: hidden;
}
.l-hero::after {
  content: '';
  position: absolute; bottom: 0; left: 10%; right: 10%; height: 1px;
  background: linear-gradient(90deg, transparent, var(--l-accent), transparent);
  opacity: 0.35;
}
.l-hero-tag {
  font-size: 0.58rem; letter-spacing: 0.38em; text-transform: uppercase;
  color: var(--l-accent); font-weight: 500;
  padding: 5px 14px; border: 1px solid rgba(184,147,90,0.3);
  border-radius: 20px; background: var(--l-accent-lt);
}
.l-hero-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.2rem, 4.5vw, 3.6rem); font-weight: 400;
  color: var(--l-ink); text-align: center; line-height: 1.12;
}
.l-hero-title em { font-style: italic; color: var(--l-accent); }
.l-hero-sub {
  font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--l-muted); margin-top: 2px;
}
.l-hero-stats {
  display: flex; gap: 40px; margin-top: 20px;
  padding-top: 20px; border-top: 1px solid var(--l-border);
}
.l-stat { text-align: center; }
.l-stat-num {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem; font-weight: 400; color: var(--l-ink); display: block;
}
.l-stat-label {
  font-size: 0.6rem; letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--l-muted); margin-top: 2px;
}

/* FILTER BAR */
.l-filter-bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 48px; height: 52px;
  background: var(--l-surface);
  border-bottom: 1px solid var(--l-border);
  position: sticky; top: 66px; z-index: 50;
}
.l-filter-tabs { display: flex; gap: 2px; }
.l-filter-tab {
  background: none; border: none;
  font-family: 'DM Sans', sans-serif; font-size: 0.7rem;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--l-muted); padding: 6px 16px; border-radius: 20px;
  cursor: pointer; transition: all 0.2s;
}
.l-filter-tab:hover { color: var(--l-ink); background: rgba(0,0,0,0.03); }
.l-filter-tab.active {
  color: var(--l-accent); background: var(--l-accent-lt); font-weight: 500;
}
.l-count { font-size: 0.66rem; color: var(--l-muted); letter-spacing: 0.06em; }

/* GRID */
.l-grid-wrap { padding: 40px 48px 80px; background: var(--l-bg); }
.l-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 20px; max-width: 1220px; margin: 0 auto;
}

/* CARD */
.l-card {
  cursor: pointer; background: var(--l-card-bg);
  border-radius: 12px; overflow: hidden;
  border: 1px solid var(--l-border);
  transition: box-shadow 0.3s var(--ease-out), transform 0.3s var(--ease-out);
  animation: lCardIn 0.5s var(--ease-out) both;
}
.l-card:nth-child(1) { animation-delay: 0ms; }
.l-card:nth-child(2) { animation-delay: 55ms; }
.l-card:nth-child(3) { animation-delay: 110ms; }
.l-card:nth-child(4) { animation-delay: 165ms; }
.l-card:nth-child(n+5) { animation-delay: 220ms; }
@keyframes lCardIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: none; }
}
.l-card:hover { box-shadow: 0 12px 36px rgba(0,0,0,0.10); transform: translateY(-3px); }

.l-card-media { position: relative; overflow: hidden; background: #f0ece4; }
.l-card-media img {
  width: 100%; aspect-ratio: 2/3; object-fit: cover; display: block;
  transition: transform 0.65s var(--ease-out);
}
.l-card:hover .l-card-media img { transform: scale(1.06); }

.l-card-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(26,24,20,0.28) 0%, transparent 55%);
  opacity: 0; transition: opacity 0.35s;
}
.l-card:hover .l-card-overlay { opacity: 1; }

.l-c-badge {
  position: absolute; top: 12px; left: 12px;
  font-size: 0.49rem; font-weight: 700; letter-spacing: 0.15em;
  text-transform: uppercase; padding: 4px 9px; border-radius: 3px; z-index: 2;
}
.l-c-wish {
  position: absolute; top: 10px; right: 10px;
  width: 32px; height: 32px; border-radius: 50%;
  background: rgba(255,255,255,0.9); backdrop-filter: blur(6px);
  border: 1px solid rgba(0,0,0,0.08); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: #bbb; transition: all 0.2s; z-index: 2;
}
.l-c-wish:hover { background: #fff; color: var(--l-ink); transform: scale(1.1); }
.l-c-wish.on { color: #e05577; border-color: rgba(224,85,119,0.3); background: #fff; }

.l-quick-view {
  position: absolute; bottom: 14px; left: 50%;
  transform: translateX(-50%) translateY(8px);
  background: rgba(255,255,255,0.95); backdrop-filter: blur(10px);
  border: 1px solid rgba(0,0,0,0.1); color: var(--l-ink);
  font-family: 'DM Sans', sans-serif; font-size: 0.63rem;
  letter-spacing: 0.15em; text-transform: uppercase;
  padding: 8px 18px; border-radius: 3px; cursor: pointer;
  white-space: nowrap; opacity: 0;
  transition: all 0.3s var(--ease-out); z-index: 3;
}
.l-card:hover .l-quick-view { opacity: 1; transform: translateX(-50%) translateY(0); }

.l-card-info { padding: 14px 16px 18px; }
.l-c-cat {
  font-size: 0.56rem; letter-spacing: 0.16em; color: var(--l-accent);
  text-transform: uppercase; margin-bottom: 4px; font-weight: 500;
}
.l-c-name { font-size: 0.87rem; color: var(--l-ink); line-height: 1.35; margin-bottom: 6px; }
.l-c-price { font-size: 0.8rem; color: var(--l-ink-soft); }
.l-c-currency { font-size: 0.62rem; color: var(--l-muted); margin-right: 2px; }

/* ════ DARK DETAIL PAGE — unchanged ════ */
.pg-detail {
  position: fixed; inset: 0; overflow-y: auto;
  background: var(--ink); z-index: 200;
  font-family: 'DM Sans', sans-serif; color: var(--cream);
}
.pg-detail.enter { animation: detailIn 0.5s var(--ease-out) both; }
.pg-detail.exit  { animation: detailOut 0.3s ease-in both; }
@keyframes detailIn  { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: none; } }
@keyframes detailOut { from { opacity: 1; } to { opacity: 0; } }

.detail-nav {
  position: sticky; top: 0; z-index: 10; height: 64px;
  background: rgba(14,13,11,0.92); backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 40px;
}
.d-back {
  background: none; border: none; cursor: pointer;
  color: var(--sand); padding: 8px; display: flex; align-items: center;
  gap: 8px; font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase;
  transition: color 0.2s; font-family: 'DM Sans', sans-serif;
}
.d-back:hover { color: var(--cream); }
.d-nav-logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem; letter-spacing: 0.22em; color: var(--cream); text-transform: uppercase;
}
.d-nav-logo em { font-style: normal; color: var(--accent); }

.d-inner { max-width: 1120px; margin: 0 auto; padding: 48px 40px 80px; }
.d-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; align-items: start; }

.g-main { position: relative; border-radius: 4px; overflow: hidden; background: var(--surface-raised); }
.g-main img { width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block; }
.g-arrows { position: absolute; inset: 0; display: flex; align-items: center; justify-content: space-between; padding: 0 14px; pointer-events: none; }
.g-arrow {
  pointer-events: all; width: 38px; height: 38px; border-radius: 50%;
  background: rgba(14,13,11,0.7); backdrop-filter: blur(8px);
  border: 1px solid var(--border); color: var(--cream);
  font-size: 1.05rem; cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, transform 0.2s;
}
.g-arrow:hover { background: rgba(14,13,11,0.92); transform: scale(1.08); }
.g-count {
  position: absolute; bottom: 14px; right: 14px;
  font-size: 0.62rem; color: var(--sand); letter-spacing: 0.1em;
  background: rgba(14,13,11,0.65); backdrop-filter: blur(6px);
  border: 1px solid var(--border); padding: 4px 12px; border-radius: 24px;
}
.thumbs { display: grid; grid-template-columns: repeat(4,1fr); gap: 6px; margin-top: 8px; }
.thumb { border-radius: 3px; overflow: hidden; cursor: pointer; border: 1.5px solid transparent; transition: border-color 0.2s, opacity 0.2s; opacity: 0.55; }
.thumb:hover { opacity: 0.85; }
.thumb.on { border-color: var(--accent); opacity: 1; }
.thumb img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; }

.d-info { padding-top: 8px; }
.d-breadcrumb { font-size: 0.58rem; letter-spacing: 0.12em; color: var(--muted); text-transform: uppercase; margin-bottom: 20px; display: flex; align-items: center; gap: 6px; }
.d-breadcrumb .hi { color: var(--accent); }
.d-category { font-size: 0.6rem; letter-spacing: 0.22em; color: var(--accent); text-transform: uppercase; font-weight: 500; margin-bottom: 10px; }
.d-title { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 400; color: var(--cream); line-height: 1.15; margin-bottom: 14px; }
.d-badge-pill { display: inline-flex; align-items: center; font-size: 0.56rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; padding: 5px 12px; border-radius: 2px; margin-bottom: 20px; }
.d-price-row { display: flex; align-items: baseline; gap: 8px; margin-bottom: 28px; }
.d-price { font-size: 1.5rem; font-weight: 500; color: var(--cream); }
.d-currency { font-size: 0.85rem; color: var(--muted); }
.d-sep { height: 1px; background: var(--border); margin: 24px 0; }

.opt-label { font-size: 0.6rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-bottom: 12px; display: flex; gap: 6px; }
.opt-label strong { color: var(--cream); font-weight: 500; }
.clr-swatches { display: flex; gap: 8px; margin-bottom: 24px; }
.clr-sw { width: 44px; height: 44px; border-radius: 4px; overflow: hidden; cursor: pointer; border: 2px solid transparent; transition: border-color 0.2s, transform 0.2s; opacity: 0.7; }
.clr-sw:hover { opacity: 0.9; transform: scale(1.05); }
.clr-sw.on { border-color: var(--accent); opacity: 1; }
.clr-sw img { width: 100%; height: 100%; object-fit: cover; }

.sz-row { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 26px; }
.sz-btn { padding: 9px 20px; border: 1px solid var(--border); border-radius: 2px; font-size: 0.75rem; font-weight: 500; background: transparent; color: var(--muted); cursor: pointer; font-family: 'DM Sans', sans-serif; letter-spacing: 0.05em; transition: all 0.2s; }
.sz-btn:hover { border-color: rgba(255,255,255,0.2); color: var(--cream); }
.sz-btn.on { background: var(--accent); color: var(--ink); border-color: var(--accent); font-weight: 600; }

.qty-row { display: flex; align-items: center; border: 1px solid var(--border); border-radius: 2px; width: fit-content; overflow: hidden; }
.q-btn { width: 42px; height: 42px; background: var(--surface-raised); border: none; color: var(--cream); font-size: 1.1rem; cursor: pointer; transition: background 0.2s; font-family: 'DM Sans', sans-serif; display: flex; align-items: center; justify-content: center; }
.q-btn:hover { background: var(--ink-mid); }
.q-val { width: 52px; height: 42px; text-align: center; background: var(--surface); border: none; border-left: 1px solid var(--border); border-right: 1px solid var(--border); color: var(--cream); font-size: 0.88rem; font-family: 'DM Sans', sans-serif; outline: none; }

.btn-wa { width: 100%; padding: 16px; background: #1a8a4a; color: #fff; border: none; border-radius: 2px; font-size: 0.8rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; font-family: 'DM Sans', sans-serif; transition: background 0.2s, transform 0.15s; margin-bottom: 10px; }
.btn-wa:hover { background: #137a3d; transform: translateY(-1px); }

.btn-wish-full { width: 100%; padding: 14px; background: transparent; color: var(--sand); border: 1px solid var(--border); border-radius: 2px; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; font-family: 'DM Sans', sans-serif; transition: all 0.2s; margin-bottom: 24px; }
.btn-wish-full:hover { border-color: var(--border-warm); color: var(--accent); }
.btn-wish-full.on { border-color: rgba(232,93,122,0.4); color: #e85d7a; }

.perks { display: flex; flex-direction: column; gap: 6px; margin-bottom: 24px; }
.perk { display: flex; align-items: center; gap: 10px; font-size: 0.73rem; color: var(--muted); padding: 10px 14px; border: 1px solid var(--border); border-radius: 2px; background: var(--surface); }
.perk-icon { font-size: 14px; flex-shrink: 0; }

.acc-wrap { border-top: 1px solid var(--border); }
.acc-btn { width: 100%; background: none; border: none; border-bottom: 1px solid var(--border); padding: 16px 0; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-family: 'DM Sans', sans-serif; font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--sand); transition: color 0.2s; }
.acc-btn:hover { color: var(--cream); }
.acc-icon { font-size: 1.2rem; font-weight: 300; color: var(--muted); transition: transform 0.3s var(--ease-out), color 0.2s; line-height: 1; }
.acc-icon.open { transform: rotate(45deg); color: var(--accent); }
.acc-body { overflow: hidden; font-size: 0.8rem; color: var(--muted); line-height: 1.85; transition: max-height 0.4s var(--ease-out), opacity 0.3s, padding 0.3s; }
.sz-guide-link { font-size: 0.63rem; color: var(--accent); text-decoration: underline; text-underline-offset: 3px; cursor: pointer; letter-spacing: 0.05em; }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) { .l-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px) {
  .l-nav { padding: 0 20px; }
  .l-nav-links { display: none; }
  .l-hero { padding: 48px 20px 40px; }
  .l-filter-bar { padding: 0 20px; }
  .l-grid-wrap { padding: 24px 16px 60px; }
  .l-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .d-inner { padding: 24px 20px 60px; }
  .d-grid { grid-template-columns: 1fr; gap: 32px; }
  .detail-nav { padding: 0 20px; }
}
`;

/* ─── ICONS ──────────────────────────────────────────────────────── */
const IconHeart = ({ filled, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const IconBag = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);
const IconSearch = ({ size = 19 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconArrowLeft = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
  </svg>
);
const IconWA = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.847L.057 23.057a.75.75 0 0 0 .921.921l5.21-1.47A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" opacity=".3"/>
  </svg>
);

/* ─── HOOK ───────────────────────────────────────────────────────── */
function useWish() {
  const [on, set] = useState(false);
  return [on, (e) => { e?.stopPropagation(); set(v => !v); }];
}

/* ─── LIGHT NAVBAR ───────────────────────────────────────────────── */
function LightNav() {
  return (
    <nav className="l-nav">
      <span className="l-nav-logo">Be<em>wear</em></span>
      <div className="l-nav-links">
        {["New In", "Collections", "Sale", "About"].map(l => (
          <button key={l} className="l-nav-link">{l}</button>
        ))}
      </div>
      <div className="l-nav-icons">
        <button className="l-nav-btn" aria-label="Search"><IconSearch /></button>
        <button className="l-nav-btn" aria-label="Wishlist"><IconHeart /></button>
        <button className="l-nav-btn" aria-label="Cart">
          <IconBag />
          <span className="l-cart-badge">0</span>
        </button>
      </div>
    </nav>
  );
}

/* ─── LIGHT CARD ─────────────────────────────────────────────────── */
function LightCard({ p, onGo }) {
  const [wished, toggleWish] = useWish();
  const badge = getBadge(p.badge);
  return (
    <div className="l-card" onClick={() => onGo(p.id)}>
      <div className="l-card-media">
        <img src={p.colors[0].images[0]} alt={p.name} loading="lazy" />
        <div className="l-card-overlay" />
        <span className="l-c-badge" style={{ background: badge.bg, color: badge.text }}>{p.badge}</span>
        <button className={`l-c-wish${wished ? " on" : ""}`} onClick={toggleWish} aria-label="Wishlist">
          <IconHeart filled={wished} size={14} />
        </button>
        <button className="l-quick-view" onClick={(e) => { e.stopPropagation(); onGo(p.id); }}>
          View Product
        </button>
      </div>
      <div className="l-card-info">
        <div className="l-c-cat">{p.category}</div>
        <div className="l-c-name">{p.name}</div>
        <div className="l-c-price">
          <span className="l-c-currency">LKR </span>
          {p.price.toLocaleString()}
        </div>
      </div>
    </div>
  );
}

/* ─── COLLECTION PAGE ────────────────────────────────────────────── */
const FILTERS = ["All", "Tops", "Bottoms", "Dresses", "Outerwear", "Accessories"];

function CollectionPage({ onGo }) {
  const [active, setActive] = useState("All");
  const filtered = active === "All"
    ? products
    : products.filter(p => p.category?.toLowerCase().includes(active.toLowerCase()));

  return (
    <div className="pg-collection">
      <div className="l-hero">
        <span className="l-hero-tag">New Season · SS 2025</span>
        <h1 className="l-hero-title">The <em>Edit</em></h1>
        <p className="l-hero-sub">Curated for the modern wardrobe</p>
        <div className="l-hero-stats">
          <div className="l-stat">
            <span className="l-stat-num">{products.length}+</span>
            <span className="l-stat-label">Pieces</span>
          </div>
          <div className="l-stat">
            <span className="l-stat-num">4</span>
            <span className="l-stat-label">Collections</span>
          </div>
          <div className="l-stat">
            <span className="l-stat-num">Free</span>
            <span className="l-stat-label">Returns</span>
          </div>
        </div>
      </div>

      <div className="l-filter-bar">
        <div className="l-filter-tabs">
          {FILTERS.map(f => (
            <button key={f} className={`l-filter-tab${active === f ? " active" : ""}`} onClick={() => setActive(f)}>{f}</button>
          ))}
        </div>
        <span className="l-count">{filtered.length} pieces</span>
      </div>

      <div className="l-grid-wrap">
        <div className="l-grid">
          {filtered.map(p => <LightCard key={p.id} p={p} onGo={onGo} />)}
        </div>
      </div>
    </div>
  );
}

/* ─── DETAIL PAGE — dark, unchanged ─────────────────────────────── */
function DetailPage({ p, onBack, phase }) {
  const [clrIdx, setClrIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const [size, setSize]     = useState(p.sizes[0]);
  const [qty, setQty]       = useState(1);
  const [accOpen, setAcc]   = useState(false);
  const [wished, toggleWish] = useWish();

  const color  = p.colors[clrIdx];
  const images = color.images;
  const badge  = getBadge(p.badge);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  const switchColor = (i) => { setClrIdx(i); setImgIdx(0); };

  const handleOrder = () => {
    const phone = "94703722496";
    const msg =
      `Hello! I'd like to place an order:\n\n` +
      `🛍 *${p.name}*\n` +
      `🎨 Color: ${color.name}\n` +
      `📏 Size: ${size}\n` +
      `🔢 Qty: ${qty}\n` +
      `💰 Total: LKR ${(p.price * qty).toLocaleString()}\n\n` +
      `Please confirm availability. Thank you!`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className={`pg-detail ${phase}`}>
      <nav className="detail-nav">
        <button className="d-back" onClick={onBack}><IconArrowLeft /> Back</button>
        <span className="d-nav-logo">Be<em>wear</em></span>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--sand)", padding: "8px", display: "flex" }}>
          <IconBag size={20} />
        </button>
      </nav>

      <div className="d-inner">
        <div className="d-grid">
          {/* GALLERY */}
          <div>
            <div className="g-main">
              <img src={images[imgIdx]} alt={p.name} key={`${clrIdx}-${imgIdx}`} />
              <div className="g-arrows">
                <button className="g-arrow" onClick={() => setImgIdx(i => (i - 1 + images.length) % images.length)}>‹</button>
                <button className="g-arrow" onClick={() => setImgIdx(i => (i + 1) % images.length)}>›</button>
              </div>
              <span className="g-count">{imgIdx + 1} / {images.length}</span>
            </div>
            <div className="thumbs">
              {images.map((img, i) => (
                <div key={i} className={`thumb${i === imgIdx ? " on" : ""}`} onClick={() => setImgIdx(i)}>
                  <img src={img} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* INFO */}
          <div className="d-info">
            <div className="d-breadcrumb">
              <span>Collections</span>
              <span style={{ opacity: 0.3 }}>›</span>
              <span>{p.category}</span>
              <span style={{ opacity: 0.3 }}>›</span>
              <span className="hi">{p.name}</span>
            </div>
            <div className="d-category">{p.category}</div>
            <h1 className="d-title">{p.name}</h1>
            <div className="d-badge-pill" style={{ background: badge.bg, color: badge.text }}>{p.badge}</div>
            <div className="d-price-row">
              <span className="d-currency">LKR</span>
              <span className="d-price">{p.price.toLocaleString()}</span>
            </div>
            <div className="d-sep" />

            <div className="opt-label">Color — <strong>{color.name}</strong></div>
            <div className="clr-swatches">
              {p.colors.map((c, i) => (
                <div key={i} className={`clr-sw${clrIdx === i ? " on" : ""}`} onClick={() => switchColor(i)} title={c.name}>
                  <img src={c.swatch} alt={c.name} />
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <div className="opt-label" style={{ margin: 0 }}>Size — <strong>{size}</strong></div>
              <span className="sz-guide-link">Size Guide</span>
            </div>
            <div className="sz-row">
              {p.sizes.map(s => (
                <button key={s} className={`sz-btn${size === s ? " on" : ""}`} onClick={() => setSize(s)}>{s}</button>
              ))}
            </div>

            <div className="opt-label" style={{ marginBottom: "10px" }}>Quantity</div>
            <div className="qty-row" style={{ marginBottom: "24px" }}>
              <button className="q-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <input className="q-val" readOnly value={qty} />
              <button className="q-btn" onClick={() => setQty(q => q + 1)}>+</button>
            </div>

            <button className="btn-wa" onClick={handleOrder}><IconWA /> Order via WhatsApp</button>
            <button className={`btn-wish-full${wished ? " on" : ""}`} onClick={toggleWish}>
              <IconHeart filled={wished} size={15} />
              {wished ? "Saved to Wishlist" : "Add to Wishlist"}
            </button>

            <div className="perks">
              <div className="perk"><span className="perk-icon">🚚</span> Free shipping on orders over LKR 20,000</div>
              <div className="perk"><span className="perk-icon">🔄</span> Free exchange &amp; returns within 7 days</div>
              <div className="perk"><span className="perk-icon">✦</span> Authenticity guaranteed</div>
            </div>

            <div className="acc-wrap">
              <button className="acc-btn" onClick={() => setAcc(o => !o)}>
                Product Details
                <span className={`acc-icon${accOpen ? " open" : ""}`}>+</span>
              </button>
              <div className="acc-body" style={{ maxHeight: accOpen ? "220px" : 0, opacity: accOpen ? 1 : 0, paddingTop: accOpen ? "14px" : 0, paddingBottom: accOpen ? "16px" : 0 }}>
                {p.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── ROOT ───────────────────────────────────────────────────────── */
export default function App() {
  const [view, setView]   = useState("collection");
  const [pid, setPid]     = useState(null);
  const [phase, setPhase] = useState("enter");

  const product = products.find(p => p.id === pid);

  useEffect(() => {
    const onPop = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#product-")) {
        const id = parseInt(hash.replace("#product-", ""), 10);
        setPid(id); setPhase("enter"); setView("detail");
      } else {
        setView("collection"); setPid(null);
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const goDetail = (id) => {
    window.history.pushState({}, "", `#product-${id}`);
    setPid(id); setPhase("enter"); setView("detail");
  };

  const goBack = () => {
    setPhase("exit");
    setTimeout(() => {
      window.history.pushState({}, "", window.location.pathname);
      setView("collection"); setPid(null); setPhase("enter");
    }, 300);
  };

  return (
    <>
      <style>{css}</style>
      {view === "collection" && <><LightNav /><CollectionPage onGo={goDetail} /></>}
      {view === "detail" && product && <DetailPage p={product} onBack={goBack} phase={phase} />}
    </>
  );
}
