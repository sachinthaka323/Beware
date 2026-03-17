import { useState, useEffect } from "react";
import {PRODUCTS} from "../data/products";

const BADGE_COLORS = {
  "Featured":     "#1a1a1a",
  "Trending":     "#e85d04",
  "New Arrival":  "#2d6a4f",
  "New":          "#2d6a4f",
  "Oversize Fit": "#6b4226",
  "Limited":      "#7c3aed",
};
const badgeColor = (b) => BADGE_COLORS[b] || "#1a1a1a";

const products=PRODUCTS;

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Jost:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #f7f4ef; font-family: 'Jost', sans-serif; }
  .app { min-height: 100vh; background: #f7f4ef; position: relative; overflow-x: hidden; }

  /* ═══ MOBILE NAVBAR (collection page) ═══ */
  .mobile-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    height: 56px;
    background: rgba(247,244,239,0.96);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(0,0,0,0.07);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 18px;
  }
  .mobile-nav-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem; font-weight: 500; letter-spacing: 0.16em;
    color: #1a1a1a; text-transform: uppercase; cursor: pointer;
  }
  .mobile-nav-icons { display: flex; align-items: center; gap: 14px; }
  .mobile-nav-icon {
    background: none; border: none; cursor: pointer;
    color: #555; padding: 4px; display: flex; align-items: center;
    transition: color 0.2s; position: relative;
  }
  .mobile-nav-icon:hover { color: #1a1a1a; }
  .mobile-cart-count {
    position: absolute; top: -2px; right: -4px;
    width: 14px; height: 14px; border-radius: 50%;
    background: #1a1a1a; color: #fff;
    font-size: 0.45rem; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
  }

  /* ═══ COLLECTION PAGE ═══ */
  .pg-collection { animation: pgFadeUp 0.4s ease both; }
  @keyframes pgFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
  .collection { padding: 68px 40px 90px; }
  .col-header { text-align: center; margin-bottom: 52px; }
  .col-title { font-family: 'Cormorant Garamond', serif; font-size: 2.9rem; font-weight: 400; color: #1a1a1a; }
  .col-sub { font-size: 0.63rem; letter-spacing: 0.28em; color: #999; text-transform: uppercase; margin-top: 7px; }
  .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; max-width: 1120px; margin: 0 auto; }

  /* ═══ CARD ═══ */
  .card { cursor: pointer; }
  .card-media { position: relative; overflow: hidden; border-radius: 8px; background: #ece9e1; }
  .card-media img { width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block; transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94); }
  .card:hover .card-media img { transform: scale(1.06); }
  .c-badge { position: absolute; top: 10px; left: 10px; font-size: 0.52rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #fff; padding: 3px 9px; border-radius: 3px; }
  .c-wish { position: absolute; top: 8px; right: 10px; width: 30px; height: 30px; border-radius: 50%; background: rgba(255,255,255,0.9); border: none; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; cursor: pointer; transition: background 0.2s, transform 0.2s; }
  .c-wish:hover { background: #fff; transform: scale(1.15); }
  .c-wish.on { color: #e11d48; }
  .card-info { padding: 11px 2px 0; }
  .c-name { font-size: 0.88rem; color: #1a1a1a; }
  .c-price { font-size: 0.78rem; color: #666; margin-top: 4px; }
  .c-cat { font-size: 0.58rem; letter-spacing: 0.1em; color: #bbb; text-transform: uppercase; margin-top: 3px; }

  /* ═══ DETAIL PAGE ═══ */
  .pg-detail { position: fixed; inset: 0; overflow-y: auto; background: #f7f4ef; z-index: 200; }
  .pg-detail.enter { animation: slideIn 0.45s cubic-bezier(0.22,1,0.36,1) both; }
  .pg-detail.exit  { animation: slideOut 0.32s cubic-bezier(0.55,0,1,0.45) both; }
  @keyframes slideIn  { from { opacity:0; transform:translateX(100%); } to { opacity:1; transform:translateX(0); } }
  @keyframes slideOut { from { opacity:1; transform:translateX(0); } to { opacity:0; transform:translateX(100%); } }

  /* Detail navbar sticky inside the overlay */
  .detail-nav {
    position: sticky; top: 0; z-index: 10;
    height: 56px;
    background: rgba(247,244,239,0.96);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(0,0,0,0.07);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 18px;
  }
  .detail-nav-back { background: none; border: none; cursor: pointer; color: #1a1a1a; padding: 4px; display: flex; align-items: center; transition: opacity 0.2s; }
  .detail-nav-back:hover { opacity: 0.6; }
  .detail-nav-title { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 500; letter-spacing: 0.16em; color: #1a1a1a; text-transform: uppercase; }
  .detail-nav-icon { background: none; border: none; cursor: pointer; color: #555; padding: 4px; display: flex; align-items: center; }

  .d-inner { padding: 20px 40px 70px; max-width: 1040px; margin: 0 auto; }
  .d-layout { background: #fff; border-radius: 16px; padding: 38px; display: grid; grid-template-columns: 1fr 1fr; gap: 56px; box-shadow: 0 6px 30px rgba(0,0,0,0.08); }

  .g-main { border-radius: 12px; overflow: hidden; background: #f0ece3; position: relative; }
  .g-main img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; }
  .g-nav { position: absolute; inset: 0; display: flex; align-items: center; justify-content: space-between; padding: 0 12px; pointer-events: none; }
  .g-btn { pointer-events: all; width: 34px; height: 34px; border-radius: 50%; background: rgba(255,255,255,0.9); border: none; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.14); transition: background 0.15s, transform 0.15s; }
  .g-btn:hover { background: #fff; transform: scale(1.1); }
  .g-counter { position: absolute; bottom: 11px; right: 13px; font-size: 0.67rem; color: #888; background: rgba(255,255,255,0.85); padding: 2px 10px; border-radius: 10px; }
  .thumbs { display: grid; grid-template-columns: repeat(4,1fr); gap: 9px; margin-top: 11px; }
  .thumb { border-radius: 8px; overflow: hidden; cursor: pointer; border: 2.5px solid transparent; transition: border-color 0.2s, transform 0.15s; }
  .thumb:hover { transform: scale(1.05); }
  .thumb.on { border-color: #1a1a1a; }
  .thumb img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; }

  .breadcrumb { font-size: 0.59rem; color: #ccc; letter-spacing: 0.09em; text-transform: uppercase; margin-bottom: 16px; }
  .breadcrumb em { color: #aaa; font-style: normal; }
  .d-name { font-family: 'Cormorant Garamond', serif; font-size: 2.15rem; font-weight: 400; color: #1a1a1a; line-height: 1.2; margin-bottom: 13px; }
  .d-badge { display: inline-block; font-size: 0.57rem; font-weight: 700; letter-spacing: 0.16em; color: #fff; padding: 4px 12px; border-radius: 3px; text-transform: uppercase; margin-bottom: 14px; }
  .d-price { font-size: 1.1rem; color: #1a1a1a; font-weight: 500; margin-bottom: 24px; }
  hr.div { border: none; border-top: 1px solid #f0f0f0; margin: 16px 0; }
  .opt-hd { font-size: 0.65rem; letter-spacing: 0.11em; text-transform: uppercase; color: #aaa; margin-bottom: 10px; }
  .opt-hd b { color: #1a1a1a; }
  .row-sb { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
  .sz-guide { font-size: 0.64rem; color: #aaa; text-decoration: underline; cursor: pointer; }
  .clr-row { display: flex; gap: 9px; margin-bottom: 20px; }
  .clr-sw { width: 40px; height: 40px; border-radius: 8px; cursor: pointer; border: 2.5px solid transparent; transition: border-color 0.2s, transform 0.15s; overflow: hidden; }
  .clr-sw:hover { transform: scale(1.08); }
  .clr-sw.on { border-color: #1a1a1a; }
  .clr-sw img { width: 100%; height: 100%; object-fit: cover; }
  .sz-row { display: flex; gap: 9px; flex-wrap: wrap; margin-bottom: 24px; }
  .sz-btn { padding: 8px 22px; border: 1px solid #e0e0e0; border-radius: 22px; font-size: 0.77rem; background: #fff; cursor: pointer; font-family: 'Jost', sans-serif; transition: all 0.18s; }
  .sz-btn:hover { border-color: #999; }
  .sz-btn.on { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }
  .qty-hd { font-size: 0.65rem; letter-spacing: 0.11em; text-transform: uppercase; color: #aaa; margin-bottom: 10px; }
  .qty-row { display: flex; align-items: center; border: 1px solid #e0e0e0; border-radius: 6px; width: fit-content; margin-bottom: 24px; overflow: hidden; }
  .q-btn { width: 40px; height: 40px; background: #f8f8f8; border: none; font-size: 1.1rem; cursor: pointer; transition: background 0.15s; }
  .q-btn:hover { background: #efefef; }
  .q-val { width: 54px; text-align: center; font-size: 0.9rem; border: none; outline: none; font-family: 'Jost',sans-serif; }
  .wa-btn { width: 100%; padding: 15px; background: #22c55e; color: #fff; border: none; border-radius: 9px; font-size: 0.9rem; font-weight: 500; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 9px; font-family: 'Jost', sans-serif; transition: background 0.2s, transform 0.15s; margin-bottom: 16px; letter-spacing: 0.04em; }
  .wa-btn:hover { background: #16a34a; transform: translateY(-1px); }
  .perks { display: flex; flex-direction: column; gap: 8px; margin-bottom: 22px; }
  .perk { display: flex; align-items: center; gap: 10px; font-size: 0.74rem; color: #777; background: #fafafa; border-radius: 7px; padding: 10px 13px; }
  .acc-btn { width: 100%; display: flex; justify-content: space-between; align-items: center; background: none; border: none; border-top: 1px solid #f0f0f0; padding: 15px 0 0; font-size: 0.73rem; font-weight: 600; letter-spacing: 0.09em; text-transform: uppercase; color: #1a1a1a; cursor: pointer; font-family: 'Jost', sans-serif; }
  .acc-plus { font-size: 1.3rem; font-weight: 300; transition: transform 0.3s; display: inline-block; }
  .acc-plus.open { transform: rotate(45deg); }
  .acc-body { overflow: hidden; font-size: 0.8rem; color: #777; line-height: 1.8; transition: max-height 0.35s ease, opacity 0.3s ease, padding-top 0.3s ease; }

  @media (max-width: 860px) {
    .grid { grid-template-columns: repeat(2,1fr); }
    .d-layout { grid-template-columns: 1fr; gap: 28px; padding: 22px; }
    .d-inner { padding: 16px 16px 60px; }
    .collection { padding: 68px 16px 60px; }
  }
`;

function useWish() {
  const [on, set] = useState(false);
  return [on, () => set(v => !v)];
}

function MobileNav() {
  return (
    <nav className="mobile-nav">
      <span className="mobile-nav-logo">BEWEAR</span>
      <div className="mobile-nav-icons">
        <button className="mobile-nav-icon" aria-label="Wishlist">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <button className="mobile-nav-icon" aria-label="Cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span className="mobile-cart-count">0</span>
        </button>
        <button className="mobile-nav-icon" aria-label="Menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>
    </nav>
  );
}

function DetailNav({ onBack }) {
  return (
    <nav className="detail-nav">
      <button className="detail-nav-back" onClick={onBack} aria-label="Back">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
        </svg>
      </button>
      <span className="detail-nav-title">BEWEAR</span>
      <button className="detail-nav-icon" aria-label="Cart">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      </button>
    </nav>
  );
}

function Card({ p, onGo }) {
  const [on, toggle] = useWish();
  const coverImg = p.colors[0].images[0];
  return (
    <div className="card" onClick={() =>window.location.href=`/product/${p.id}/${p.colors[0]?.key || 'default'}`}>
      <div className="card-media">
        <img src={coverImg} alt={p.name} loading="lazy" />
        <span className="c-badge" style={{ background: badgeColor(p.badge) }}>{p.badge}</span>
        <button className={`c-wish${on ? " on" : ""}`} onClick={e => { e.stopPropagation(); toggle(); }}>
          {on ? "♥" : "♡"}
        </button>
      </div>
      <div className="card-info">
        <div className="c-name">{p.name}</div>
        <div className="c-price">LKR {p.price.toLocaleString()}</div>
        <div className="c-cat">{p.category}</div>
      </div>
    </div>
  );
}

function CollectionPage({ onGo }) {
  return (
    <div className="pg-collection">
      {/* <MobileNav /> */}
      <div className="collection" id="our-collection">
        <div className="col-header">
          <h1 className="col-title">Our Collection</h1>
          <p className="col-sub">Curated for modern style</p>
        </div>
        <div className="grid">
          {products.map(p => <Card key={p.id} p={p} onGo={onGo} />)}
        </div>
      </div>
    </div>
  );
}

function DetailPage({ p, onBack, phase }) {
  const [clrIdx, setClrIdx] = useState(0);
  const [idx, setIdx]       = useState(0);
  const [sz, setSz]         = useState(p.sizes[0]);
  const [qty, setQty]       = useState(1);
  const [acc, setAcc]       = useState(false);

  const activeColor = p.colors[clrIdx];
  const images = activeColor.images;

  const handleColorChange = (i) => { setClrIdx(i); setIdx(0); };
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const prev = () => setIdx(i => (i - 1 + images.length) % images.length);
  const next = () => setIdx(i => (i + 1) % images.length);

  return (
    <div className={`pg-detail ${phase}`}>
      <DetailNav onBack={onBack} />
      <div className="d-inner">
        <div className="d-layout">
          <div>
            <div className="g-main">
              <img src={images[idx]} alt={p.name} key={`${clrIdx}-${idx}`} />
              <div className="g-nav">
                <button className="g-btn" onClick={prev}>‹</button>
                <button className="g-btn" onClick={next}>›</button>
              </div>
              <div className="g-counter">{idx + 1} / {images.length}</div>
            </div>
            <div className="thumbs">
              {images.map((img, i) => (
                <div key={i} className={`thumb${i === idx ? " on" : ""}`} onClick={() => setIdx(i)}>
                  <img src={img} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="breadcrumb">
              HOME / COLLECTIONS / {p.category.toUpperCase()} / <em>{p.name.toUpperCase()}</em>
            </div>
            <div className="d-name">{p.name}</div>
            <span className="d-badge" style={{ background: badgeColor(p.badge) }}>{p.badge}</span>
            <div className="d-price" style={{ marginTop: 12 }}>LKR {p.price.toLocaleString()}</div>
            <hr className="div" />

            <div className="opt-hd">AVAILABLE COLOR : <b>{activeColor.name.toUpperCase()}</b></div>
            <div className="clr-row">
              {p.colors.map((c, i) => (
                <div key={i} className={`clr-sw${clrIdx === i ? " on" : ""}`} onClick={() => handleColorChange(i)} title={c.name}>
                  <img src={c.swatch} alt={c.name} />
                </div>
              ))}
            </div>

            <div className="row-sb">
              <div className="opt-hd" style={{ margin: 0 }}>AVAILABLE SIZE : <b>{sz}</b></div>
              <span className="sz-guide">Size Guide</span>
            </div>
            <div className="sz-row">
              {p.sizes.map(s => (
                <button key={s} className={`sz-btn${sz === s ? " on" : ""}`} onClick={() => setSz(s)}>{s}</button>
              ))}
            </div>

            <div className="qty-hd">QUANTITY</div>
            <div className="qty-row">
              <button className="q-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <input className="q-val" readOnly value={qty} />
              <button className="q-btn" onClick={() => setQty(q => q + 1)}>+</button>
            </div>

            <button className="wa-btn" onClick={() => {
              const phone = "94703722496";
              const message =
                `Hello! I'd like to order the following:\n\n` +
                `🛍️ *Product:* ${p.name}\n` +
                `🆔 *Product ID:* ${p.id}\n` +
                `🏷️ *Category:* ${p.category}\n` +
                `🎨 *Color:* ${activeColor.name}\n` +
                `📏 *Size:* ${sz}\n` +
                `🔢 *Quantity:* ${qty}\n` +
                `💰 *Price:* LKR ${(p.price * qty).toLocaleString()}\n` +
                `🔖 *Badge:* ${p.badge}\n\n` +
                `Please confirm availability. Thank you!`;
              window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.847L.057 23.057a.75.75 0 0 0 .921.921l5.21-1.47A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" opacity=".25"/>
              </svg>
              Order via WhatsApp
            </button>

            <div className="perks">
              <div className="perk">🚚 &nbsp;Free shipping on orders over Rs.20,000</div>
              <div className="perk">🔄 &nbsp;Free Exchange &amp; Returns</div>
            </div>

            <button className="acc-btn" onClick={() => setAcc(o => !o)}>
              PRODUCT DETAILS
              <span className={`acc-plus${acc ? " open" : ""}`}>+</span>
            </button>
            <div className="acc-body" style={{ maxHeight: acc ? 200 : 0, opacity: acc ? 1 : 0, paddingTop: acc ? 12 : 0 }}>
              {p.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView]     = useState("collection");
  const [productId, setPid] = useState(null);
  const [phase, setPhase]   = useState("enter");

  const product = products.find(p => p.id === productId);

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
      requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.getElementById("our-collection");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      });
    }, 320);
  };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {view === "collection" && <CollectionPage onGo={goDetail} />}
        {view === "detail" && product && <DetailPage p={product} onBack={goBack} phase={phase} />}
      </div>
    </>
  );
}