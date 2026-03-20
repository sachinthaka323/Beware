import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Syncopate:wght@400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ─── Section wrapper ─── */
  .products-section {
    width: 100%;
    padding: clamp(40px, 8vw, 80px) clamp(16px, 4vw, 24px);
    background: #faf8f5;
    min-height: 100vh;
  }

  .products-heading {
    text-align: center;
    margin-bottom: clamp(32px, 6vw, 56px);
    padding: 0 8px;
  }

  .products-heading h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(28px, 7vw, 56px);
    font-weight: 300;
    color: #0a0a0a;
    letter-spacing: -0.01em;
    line-height: 1.1;
  }

  .products-heading h2 em {
    font-style: italic;
    color: #b89a6a;
  }

  .products-heading p {
    font-family: 'Syncopate', sans-serif;
    font-size: clamp(7px, 1.8vw, 9px);
    letter-spacing: 0.25em;
    color: #bbb;
    text-transform: uppercase;
    margin-top: 10px;
  }

  /* ─── Grid ─── */
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 285px), 1fr));
    gap: clamp(16px, 3vw, 32px);
    max-width: 1200px;
    margin: 0 auto;
    justify-items: center;
  }

  /* On small phones: 1 column full width */
  @media (max-width: 480px) {
    .products-grid {
      grid-template-columns: 1fr;
    }
  }

  /* On mid-size tablets: 2 columns */
  @media (min-width: 481px) and (max-width: 768px) {
    .products-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
  }

  /* ─── Card wrapper ─── */
  .card-wrapper {
    width: 100%;
    max-width: 340px;
    perspective: 1200px;
    opacity: 0;
    transform: translateY(24px);
    animation: cardEntrance 0.65s ease forwards;
  }

  /* Disable max-width on single-column mobile */
  @media (max-width: 480px) {
    .card-wrapper { max-width: 100%; }
  }

  .card-wrapper:nth-child(1) { animation-delay: 0.08s; }
  .card-wrapper:nth-child(2) { animation-delay: 0.18s; }
  .card-wrapper:nth-child(3) { animation-delay: 0.28s; }
  .card-wrapper:nth-child(4) { animation-delay: 0.38s; }
  .card-wrapper:nth-child(5) { animation-delay: 0.48s; }
  .card-wrapper:nth-child(6) { animation-delay: 0.58s; }

  @keyframes cardEntrance {
    to { opacity: 1; transform: translateY(0); }
  }

  /* ─── Card ─── */
  .card {
    background: #fff;
    border-radius: clamp(14px, 3vw, 20px);
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(0,0,0,0.07);
    transition: transform 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.5s ease;
    transform-style: preserve-3d;
    position: relative;
    width: 100%;
    /* Disable 3D hover on touch to prevent stuck states */
  }

  @media (hover: hover) and (pointer: fine) {
    .card:hover {
      transform: translateY(-10px) rotateX(2deg);
      box-shadow: 0 28px 60px rgba(0,0,0,0.13);
    }
  }

  /* ─── Image ─── */
  .card-image-wrap {
    position: relative;
    width: 100%;
    height: clamp(220px, 45vw, 360px);
    overflow: hidden;
    background: #f5f0ea;
  }

  /* On 2-col tablet, shorter images */
  @media (min-width: 481px) and (max-width: 768px) {
    .card-image-wrap { height: clamp(180px, 35vw, 260px); }
  }

  .card-image-wrap img {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: top;
    transition: transform 0.7s cubic-bezier(0.23,1,0.32,1);
    display: block;
  }

  @media (hover: hover) and (pointer: fine) {
    .card:hover .card-image-wrap img { transform: scale(1.08); }
  }

  /* Clickable image wrapper */
  .card-image-clickable {
    cursor: pointer;
  }

  /* Badge */
  .card-badge {
    position: absolute;
    top: 12px; left: 12px;
    background: #0a0a0a;
    color: #f0d9b0;
    font-family: 'Syncopate', sans-serif;
    font-size: clamp(7px, 1.5vw, 8px);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 5px 10px;
    border-radius: 20px;
    z-index: 2;
    white-space: nowrap;
  }

  /* Overlay — only on hover-capable devices */
  .card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(10,10,10,0.5) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  @media (hover: hover) and (pointer: fine) {
    .card:hover .card-overlay { opacity: 1; }
  }

  /* Quick view — desktop only */
  .card-quick {
    position: absolute;
    bottom: 16px; left: 50%;
    transform: translateX(-50%) translateY(10px);
    background: rgba(255,255,255,0.95);
    color: #0a0a0a;
    font-family: 'Syncopate', sans-serif;
    font-size: 8px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 8px 20px;
    border-radius: 20px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
    z-index: 3;
  }

  @media (hover: hover) and (pointer: fine) {
    .card:hover .card-quick {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  /* ─── Favourite button on image ─── */
  .fav-img-btn {
    position: absolute;
    top: 12px; right: 12px;
    width: clamp(36px, 8vw, 42px);
    height: clamp(36px, 8vw, 42px);
    border-radius: 50%;
    border: 1.5px solid rgba(255,255,255,0.4);
    background: rgba(255,255,255,0.18);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 4;
    transition: all 0.3s ease;
    /* Larger tap target on touch */
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .fav-img-btn svg {
    width: clamp(14px, 3.5vw, 16px);
    height: clamp(14px, 3.5vw, 16px);
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }

  .fav-img-btn:hover {
    border-color: rgba(231,76,60,0.6);
    background: rgba(231,76,60,0.15);
  }

  .fav-img-btn:hover svg { transform: scale(1.25); }

  .fav-img-btn.fav-on {
    border-color: #e74c3c;
    background: rgba(231,76,60,0.18);
    animation: heartPop 0.4s cubic-bezier(0.34,1.56,0.64,1);
  }

  @keyframes heartPop {
    0% { transform: scale(1); }
    40% { transform: scale(1.4); }
    100% { transform: scale(1); }
  }

  /* ─── Card body ─── */
  .card-body {
    padding: clamp(16px, 4vw, 22px) clamp(16px, 4vw, 22px) clamp(18px, 4.5vw, 26px);
  }

  .card-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(18px, 4.5vw, 22px);
    font-weight: 400;
    color: #0a0a0a;
    letter-spacing: 0.01em;
    line-height: 1.2;
  }

  .card-price-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 5px;
  }

  .card-price-currency {
    font-family: 'Syncopate', sans-serif;
    font-size: clamp(8px, 1.8vw, 9px);
    letter-spacing: 0.1em;
    color: #999;
    align-self: flex-end;
    margin-bottom: 2px;
  }

  .card-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(16px, 4vw, 18px);
    font-weight: 300;
    color: #555;
    font-style: italic;
  }

  .card-divider {
    width: 100%; height: 1px;
    background: #f0ece6;
    margin: clamp(12px, 3vw, 16px) 0;
  }

  .card-label {
    font-family: 'Syncopate', sans-serif;
    font-size: clamp(7px, 1.5vw, 8px);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #aaa;
    margin-bottom: 8px;
  }

  /* ─── Size buttons ─── */
  .size-grid {
    display: flex;
    gap: clamp(6px, 1.5vw, 8px);
    flex-wrap: wrap;
  }

  .size-btn {
    width: clamp(34px, 8.5vw, 38px);
    height: clamp(34px, 8.5vw, 38px);
    border-radius: 50%;
    border: 1.5px solid #e0dbd3;
    background: transparent;
    font-family: 'Syncopate', sans-serif;
    font-size: clamp(8px, 1.8vw, 9px);
    font-weight: 700;
    color: #666;
    cursor: pointer;
    transition: all 0.25s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .size-btn:hover { border-color: #0a0a0a; color: #0a0a0a; }
  .size-btn.active { background: #0a0a0a; border-color: #0a0a0a; color: #f0d9b0; }

  /* ─── Quantity ─── */
  .qty-row {
    display: flex;
    align-items: center;
    background: #f7f4f0;
    border-radius: 50px;
    padding: 4px;
    width: fit-content;
  }

  .qty-btn {
    width: clamp(32px, 8vw, 36px);
    height: clamp(32px, 8vw, 36px);
    border-radius: 50%;
    border: none;
    background: transparent;
    font-size: clamp(18px, 4.5vw, 20px);
    color: #0a0a0a;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease;
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    line-height: 1;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    user-select: none;
    -webkit-user-select: none;
  }

  .qty-btn:hover { background: #e8e3dc; }
  .qty-btn:active { background: #0a0a0a; color: white; }

  .qty-num {
    font-family: 'Syncopate', sans-serif;
    font-size: clamp(11px, 2.5vw, 12px);
    font-weight: 700;
    color: #0a0a0a;
    min-width: clamp(28px, 7vw, 32px);
    text-align: center;
  }

  /* ─── Bottom CTA row ─── */
  .card-bottom {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: clamp(16px, 4vw, 20px);
  }

  /* WhatsApp btn */
  .wa-btn {
    flex: 1;
    min-height: clamp(44px, 11vw, 48px); /* accessible tap target */
    padding: 0 10px;
    background: #0a0a0a;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-family: 'Syncopate', sans-serif;
    font-size: clamp(7px, 1.6vw, 8px);
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    position: relative;
    overflow: hidden;
    transition: color 0.3s ease;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .wa-btn::before {
    content: '';
    position: absolute; inset: 0;
    background: #25D366;
    transform: translateX(-101%);
    transition: transform 0.4s cubic-bezier(0.76,0,0.24,1);
    border-radius: 50px;
  }

  @media (hover: hover) and (pointer: fine) {
    .wa-btn:hover::before { transform: translateX(0); }
  }

  /* On touch: show green on active */
  @media (hover: none) {
    .wa-btn:active::before { transform: translateX(0); }
  }

  .wa-btn span {
    position: relative; z-index: 1;
    display: flex; align-items: center;
    justify-content: center; gap: 7px;
  }

  .wa-btn svg {
    width: clamp(12px, 3vw, 14px);
    height: clamp(12px, 3vw, 14px);
    fill: currentColor;
    flex-shrink: 0;
  }

  @keyframes pulse-ring {
    0% { transform: scale(0.8); opacity: 0.8; }
    80%, 100% { transform: scale(2); opacity: 0; }
  }

  .wa-btn.pulse::after {
    content: '';
    position: absolute; inset: 0;
    border-radius: 50px;
    border: 2px solid #25D366;
    animation: pulse-ring 0.6s ease forwards;
  }

  /* Fav bottom btn */
  .fav-bottom-btn {
    width: clamp(44px, 11vw, 48px);
    height: clamp(44px, 11vw, 48px);
    border-radius: 50%;
    border: 1.5px solid #e0dbd3;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    flex-shrink: 0;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .fav-bottom-btn svg {
    width: clamp(16px, 4vw, 18px);
    height: clamp(16px, 4vw, 18px);
    transition: transform 0.3s ease;
  }

  .fav-bottom-btn:hover {
    border-color: #e74c3c;
    background: #fff5f5;
  }

  .fav-bottom-btn:hover svg { transform: scale(1.2); }
  .fav-bottom-btn.fav-on { border-color: #e74c3c; background: #fff5f5; }

  /* ─── Toast ─── */
  .tm-toast {
    position: fixed;
    bottom: clamp(20px, 5vw, 30px);
    left: 50%;
    transform: translateX(-50%) translateY(90px);
    background: #0a0a0a;
    color: white;
    padding: 12px clamp(18px, 5vw, 28px);
    border-radius: 50px;
    font-family: 'Syncopate', sans-serif;
    font-size: clamp(7.5px, 1.8vw, 8.5px);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    z-index: 99999;
    transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
    white-space: nowrap;
    pointer-events: none;
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: calc(100vw - 32px);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tm-toast.show { transform: translateX(-50%) translateY(0); }

  .tm-toast-heart { color: #e74c3c; font-size: 13px; line-height: 1; }

  /* ─── Safe area for notched phones ─── */
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    .tm-toast {
      bottom: calc(clamp(20px, 5vw, 30px) + env(safe-area-inset-bottom));
    }
  }

  /* ─── Remove perspective hover jitter on mobile ─── */
  @media (max-width: 768px) {
    .card { transform: none !important; }
  }
`;

/* ─── localStorage helpers ─── */
const FAV_KEY = "tutu_favs";

function getFavs() {
  try { return JSON.parse(localStorage.getItem(FAV_KEY) || "[]"); }
  catch { return []; }
}

function saveFavs(favs) {
  localStorage.setItem(FAV_KEY, JSON.stringify(favs));
  window.dispatchEvent(new Event("tutu_favs_updated"));
}

function isFaved(name) { return getFavs().some(f => f.name === name); }

function toggleFav(item) {
  const favs = getFavs();
  const idx = favs.findIndex(f => f.name === item.name);
  if (idx > -1) { saveFavs(favs.filter(f => f.name !== item.name)); return false; }
  saveFavs([...favs, item]); return true;
}

/* ─── Toast ─── */
let _toastTimer;
function showToast(msg, heart = false) {
  const el = document.getElementById("tm-toast");
  if (!el) return;
  el.querySelector(".tm-toast-msg").textContent = msg;
  el.querySelector(".tm-toast-heart").style.display = heart ? "inline" : "none";
  el.classList.add("show");
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
}

/* ─── Heart SVG ─── */
const HeartIcon = ({ faved, stroke }) => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      stroke={faved ? "#e74c3c" : stroke}
      strokeWidth="1.5"
      fill={faved ? "#e74c3c" : "none"}
    />
  </svg>
);

/* ─── WhatsApp SVG ─── */
const WAIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ═══ PRODUCT CARD ═══ */
function ProductCard({ product, id, name, price, badge = "New Arrival", tag = "" }) {
  const sizes = ["XS", "S", "M", "L", "XL"];
  const image = product?.colors[0]?.images[0];
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [faved, setFaved] = useState(() => isFaved(name));
  const [pulsing, setPulsing] = useState(false);

  useEffect(() => {
    const sync = () => setFaved(isFaved(name));
    window.addEventListener("tutu_favs_updated", sync);
    return () => window.removeEventListener("tutu_favs_updated", sync);
  }, [name]);

  const handleFav = useCallback(() => {
    const item = { name, price, image, tag, badge };
    const added = toggleFav(item);
    setFaved(added);
    showToast(added ? `${name} added to favourites` : `${name} removed`, added);
  }, [name, price, image, tag, badge]);

  const handleWhatsApp = () => {
    const msg = `Hello BEWEAR 👋\n\nI'm interested in:\n\n🛍 Product: ${name}\n💰 Price: LKR ${price}\n📏 Size: ${size}\n🔢 Quantity: ${quantity}\n\nPlease confirm availability. Thank you!`;
    window.open(`https://wa.me/94703722496?text=${encodeURIComponent(msg)}`, "_blank");
    setPulsing(true);
    setTimeout(() => setPulsing(false), 700);
    showToast("Opening WhatsApp...");
  };

  const decQty = () => quantity > 1 && setQuantity(q => q - 1);
  const incQty = () => setQuantity(q => q + 1);

  return (
    <div className="card-wrapper">
      <div className="card">

        {/* Image */}
        <Link to={`/product/${id}/${product.colors[0].key}`} style={{ textDecoration: "none", color: "inherit" }}>
          <div className="card-image-wrap card-image-clickable">
            <span className="card-badge">{badge}</span>

            <button
              className={`fav-img-btn${faved ? " fav-on" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleFav();
              }}
              aria-label={faved ? "Remove from favourites" : "Add to favourites"}
            >
              <HeartIcon faved={faved} stroke="rgba(255,255,255,0.9)" />
            </button>

            <img src={image} alt={name} loading="lazy" />
            <div className="card-overlay" />
            <div className="card-quick">Quick View</div>
          </div>
        </Link>

        {/* Body */}
        <div className="card-body">
          <div className="card-name">{name}</div>
          <div className="card-price-row">
            <span className="card-price-currency">LKR</span>
            <span className="card-price">{Number(price).toLocaleString()}</span>
          </div>

          <div className="card-divider" />

          <div className="card-label">Select Size</div>
          <div className="size-grid">
            {sizes.map(s => (
              <button
                key={s}
                className={`size-btn${size === s ? " active" : ""}`}
                onClick={() => setSize(s)}
                aria-pressed={size === s}
              >{s}</button>
            ))}
          </div>

          <div className="card-divider" />

          <div className="card-label">Quantity</div>
          <div className="qty-row">
            <button className="qty-btn" onClick={decQty} aria-label="Decrease quantity">−</button>
            <span className="qty-num" aria-live="polite">{quantity}</span>
            <button className="qty-btn" onClick={incQty} aria-label="Increase quantity">+</button>
          </div>

          <div className="card-bottom">
            <button
              className={`wa-btn${pulsing ? " pulse" : ""}`}
              onClick={handleWhatsApp}
              aria-label={`Order ${name} via WhatsApp`}
            >
              <span><WAIcon />Order via WhatsApp</span>
            </button>

            <button
              className={`fav-bottom-btn${faved ? " fav-on" : ""}`}
              onClick={handleFav}
              aria-label={faved ? "Remove from favourites" : "Save to favourites"}
            >
              <HeartIcon faved={faved} stroke="#bbb" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ MAIN EXPORT ═══ */
export default function FeaturedCollection() {
  return (
    <>
      <style>{styles}</style>

      <div id="tm-toast" className="tm-toast" role="status" aria-live="polite">
        <span className="tm-toast-heart">♥</span>
        <span className="tm-toast-msg" />
      </div>

      <section className="products-section">
        <div className="products-heading">
          <h2>Men's <em>Collection</em></h2>
          <p>Premium styles crafted for the modern gentleman</p>
        </div>
        <div className="products-grid">
          {PRODUCTS.map(p => (
            <ProductCard key={p.id} product={p} id={p.id} name={p.name} price={p.price} badge={p.badge} tag={p.tag} />
          ))}
        </div>
      </section>
    </>
  );
}

export { ProductCard };