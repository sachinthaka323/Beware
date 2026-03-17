import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .sbc-section {
    width: 100%;
    background: #fff;
    padding: 72px 40px 80px;
    font-family: 'Barlow', sans-serif;
  }

  /* ── HEADING ── */
  .sbc-heading {
    text-align: center;
    margin-bottom: 40px;
  }

  .sbc-heading h2 {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(28px, 4vw, 48px);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #111;
  }

  /* ── GRID ── */
  .sbc-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    max-width: 1400px;
    margin: 0 auto;
  }

  /* ── CARD ── */
  .sbc-card {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    display: block;
    text-decoration: none;
    aspect-ratio: 3 / 4;
    background: #e8e8e8;
  }

  .sbc-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
    transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    filter: brightness(0.88) saturate(0.95);
  }

  .sbc-card:hover img {
    transform: scale(1.06);
  }

  /* Bottom label overlay */
  .sbc-card-label {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 40px 18px 18px;
    background: linear-gradient(to top, rgba(0,0,0,0.62) 0%, transparent 100%);
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .sbc-card-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: clamp(16px, 1.8vw, 22px);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #ffffff;
  }

  /* Arrow — appears on hover */
  .sbc-card-arrow {
    width: 32px; height: 32px;
    border-radius: 50%;
    border: 1.5px solid rgba(255,255,255,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: translateX(-6px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    flex-shrink: 0;
  }

  .sbc-card-arrow svg {
    width: 13px; height: 13px;
    stroke: #fff;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .sbc-card:hover .sbc-card-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  /* Thin top accent line that grows on hover */
  .sbc-card::after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 0; height: 3px;
    background: #fff;
    transition: width 0.4s cubic-bezier(0.76, 0, 0.24, 1);
  }

  .sbc-card:hover::after { width: 100%; }

  /* Scroll-in animation */
  .sbc-card {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .sbc-card.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .sbc-card:nth-child(1) { transition-delay: 0s; }
  .sbc-card:nth-child(2) { transition-delay: 0.1s; }
  .sbc-card:nth-child(3) { transition-delay: 0.2s; }
  .sbc-card:nth-child(4) { transition-delay: 0.3s; }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .sbc-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .sbc-card { aspect-ratio: 4 / 5; }
    .sbc-section { padding: 56px 24px 64px; }
  }

  @media (max-width: 600px) {
    .sbc-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
    .sbc-section { padding: 44px 16px 52px; }
    .sbc-card { aspect-ratio: 3 / 4; }
  }

  @media (max-width: 400px) {
    .sbc-grid { grid-template-columns: 1fr; }
  }
`;

const CATEGORIES = [
  {
    name: "Men",
    to: "/men",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=687&auto=format&fit=crop",
    pos: "center top",
  },
  {
    name: "Women",
    to: "/women",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=687&auto=format&fit=crop",
    pos: "center top",
  },
  {
    name: "Socks",
    to: "/socks",
    img: "/shock.jpg",
    pos: "center top",
  },
  {
    name: "Accessories",
    to: "/accessories",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=687&auto=format&fit=crop",
    pos: "center center",
  },
];

export default function ShopByCategory() {
  const cardRefs = useRef([]);
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    const observers = cardRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((v) => [...new Set([...v, i])]);
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  return (
    <>
      <style>{style}</style>
      <section className="sbc-section" aria-label="Shop by category">
        <div className="sbc-heading">
          <h2>Shop By Category</h2>
        </div>

        <div className="sbc-grid">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.name}
              to={cat.to}
              className={`sbc-card${visible.includes(i) ? " visible" : ""}`}
              ref={(el) => (cardRefs.current[i] = el)}
              aria-label={`Shop ${cat.name}`}
            >
              <img
                src={cat.img}
                alt={cat.name}
                style={{ objectPosition: cat.pos }}
                loading="lazy"
                draggable="false"
              />
              <div className="sbc-card-label">
                <span className="sbc-card-name">{cat.name}</span>
                <span className="sbc-card-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}