import { useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Syncopate:wght@400;700&display=swap');

  /* ═══ PRODUCT LIST PAGE ═══ */
  .products-list-container {
    width: 100%;
    background: #faf8f5;
    padding: clamp(40px, 8vw, 80px) clamp(16px, 4vw, 32px);
    min-height: 100vh;
  }

  .products-list-header {
    text-align: center;
    margin-bottom: clamp(40px, 8vw, 64px);
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .products-list-header h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(32px, 8vw, 64px);
    font-weight: 300;
    color: #0a0a0a;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin-bottom: 12px;
  }

  .products-list-header p {
    font-family: 'Syncopate', sans-serif;
    font-size: clamp(8px, 1.8vw, 10px);
    letter-spacing: 0.15em;
    color: #aaa;
    text-transform: uppercase;
  }

  /* ─── Grid Layout ─── */
  .products-grid-wrapper {
    max-width: 1400px;
    margin: 0 auto;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
    gap: clamp(40px, 6vw, 60px);
    width: 100%;
  }

  /* Responsive: 1 col on mobile, 2 on tablet, 3-4 on desktop */
  @media (max-width: 640px) {
    .products-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }

  @media (min-width: 641px) and (max-width: 1024px) {
    .products-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 28px;
    }
  }

  @media (min-width: 1025px) {
    .products-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
    }
  }

  @media (min-width: 1400px) {
    .products-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  /* ─── Single Product Card ─── */
  .product-card-item {
    display: flex;
    flex-direction: column;
    height: 100%;
    opacity: 0;
    animation: fadeInUp 0.6s ease forwards;
  }

  .product-card-item:nth-child(1) { animation-delay: 0.1s; }
  .product-card-item:nth-child(2) { animation-delay: 0.15s; }
  .product-card-item:nth-child(3) { animation-delay: 0.2s; }
  .product-card-item:nth-child(4) { animation-delay: 0.25s; }
  .product-card-item:nth-child(5) { animation-delay: 0.3s; }
  .product-card-item:nth-child(6) { animation-delay: 0.35s; }
  .product-card-item:nth-child(7) { animation-delay: 0.4s; }
  .product-card-item:nth-child(8) { animation-delay: 0.45s; }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* ─── Image Container ─── */
  .product-image-container {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    background: #f5f1ed;
    border-radius: 0;
    margin-bottom: clamp(16px, 3vw, 24px);
  }

  .product-image-link {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: inherit;
    position: relative;
    overflow: hidden;
  }

  .product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    display: block;
  }

  @media (hover: hover) and (pointer: fine) {
    .product-image-link:hover .product-image {
      transform: scale(1.08);
    }
  }

  /* Badge */
  .product-badge {
    position: absolute;
    top: 16px;
    left: 16px;
    background: #0a0a0a;
    color: #f0d9b0;
    font-family: 'Syncopate', sans-serif;
    font-size: clamp(7px, 1.5vw, 8px);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 20px;
    z-index: 2;
    white-space: nowrap;
  }

  /* Quick Add button - hover only on desktop */
  .product-quick-add {
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%) translateY(16px);
    background: rgba(255, 255, 255, 0.95);
    color: #0a0a0a;
    border: none;
    padding: 10px 24px;
    border-radius: 24px;
    font-family: 'Syncopate', sans-serif;
    font-size: clamp(8px, 1.6vw, 9px);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 700;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
    z-index: 3;
  }

  @media (hover: hover) and (pointer: fine) {
    .product-image-link:hover .product-quick-add {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
      pointer-events: auto;
    }
  }

  /* Favorite button */
  .product-favorite-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1.5px solid rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 4;
    -webkit-tap-highlight-color: transparent;
  }

  .product-favorite-btn svg {
    width: 16px;
    height: 16px;
    stroke: rgba(255, 255, 255, 0.8);
    fill: none;
    stroke-width: 1.5;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .product-favorite-btn:hover {
    border-color: rgba(184, 154, 106, 0.6);
    background: rgba(184, 154, 106, 0.15);
  }

  .product-favorite-btn:hover svg {
    transform: scale(1.2);
  }

  .product-favorite-btn.favorited {
    border-color: #b89a6a;
    background: rgba(184, 154, 106, 0.2);
  }

  .product-favorite-btn.favorited svg {
    stroke: #b89a6a;
    fill: #b89a6a;
  }

  /* ─── Product Info ─── */
  .product-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .product-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(18px, 4vw, 24px);
    font-weight: 400;
    color: #0a0a0a;
    letter-spacing: 0.01em;
    line-height: 1.3;
    margin-bottom: 8px;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .product-name-link {
    text-decoration: none;
    color: inherit;
  }

  .product-name-link:hover .product-name {
    color: #b89a6a;
  }

  .product-price-wrapper {
    display: flex;
    align-items: baseline;
    gap: 8px;
    flex-wrap: wrap;
  }

  .product-price-old {
    font-family: 'Syncopate', sans-serif;
    font-size: clamp(9px, 1.7vw, 10px);
    color: #787878;
    text-decoration: line-through;
    letter-spacing: 0.02em;
  }

  .product-price-new {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(18px, 4vw, 22px);
    font-weight: 700;
    color: #d9302f;
    letter-spacing: -0.01em;
  }

  .product-currency {
    display: none;
  }

  .product-tag {
    font-family: 'Syncopate', sans-serif;
    font-size: clamp(7px, 1.5vw, 8px);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #999;
    margin-top: 8px;
  }
`;

function ProductList({ category, title = "Our Collection", subtitle = "Curated for Modern Style" }) {
  const [favorited, setFavorited] = useState({});
  const shownProducts = category ? PRODUCTS.filter(product => product.category === category) : PRODUCTS;

  const toggleFavorite = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorited(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const HeartIcon = ({ filled }) => (
    <svg viewBox="0 0 24 24">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );

  return (
    <>
      <style>{styles}</style>
      <div className="products-list-container">
        <div className="products-list-header">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        <div className="products-grid-wrapper">
          <div className="products-grid">
            {shownProducts.length ? shownProducts.map(product => (
              <div key={product.id} className="product-card-item">
                <div className="product-image-container">
                  <Link
                    to={`/product/${product.id}/${product.colors[0]?.key || 'default'}`}
                    className="product-image-link"
                  >
                    <img
                      src={product.colors[0]?.swatch || product.colors[0]?.images?.[0] || ''}
                      alt={product.name}
                      className="product-image"
                      loading="lazy"
                    />
                    {product.badge && (
                      <span className="product-badge">{product.badge}</span>
                    )}
                    {typeof window !== 'undefined' && (
                      <button className="product-quick-add">View Details</button>
                    )}
                  </Link>

                  <button
                    className={`product-favorite-btn ${favorited[product.id] ? 'favorited' : ''}`}
                    onClick={(e) => toggleFavorite(e, product.id)}
                    aria-label="Add to favorites"
                  >
                    <HeartIcon filled={favorited[product.id]} />
                  </button>
                </div>

                <div className="product-info">
                  <Link to={`/product/${product.id}/${product.colors[0]?.key || 'default'}`} className="product-name-link">
                    <h3 className="product-name">{product.name}</h3>
                  </Link>

                  <div className="product-price-wrapper">
                    <span className="product-price-old">Rs {Number(product.originalPrice ?? Math.round(product.price * 1.27)).toLocaleString()}</span>
                    <span className="product-price-new">Rs {Number(product.price).toLocaleString()}</span>
                  </div>

                  {product.tag && (
                    <span className="product-tag">{product.tag}</span>
                  )}
                </div>
              </div>
            )) : <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '24px', color:'#555' }}>No products found in this category.</div>}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductList;
