import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../data/products";
import ImageGallery from "../components/ImageGallery";
import "./ProductDetails.css";

/* ─────────────────────────────────────────────
   Size Guide Modal — styles injected inline
───────────────────────────────────────────── */
const sizeGuideStyles = `
  .sg-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.55);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    animation: sg-fade-in 0.2s ease;
  }
  @keyframes sg-fade-in { from { opacity:0 } to { opacity:1 } }

  .sg-modal {
    background: #fff;
    border-radius: 4px;
    max-width: 900px;
    width: 100%;
    max-height: 92vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 20px 60px rgba(0,0,0,0.25);
    animation: sg-slide-up 0.25s ease;
  }
  @keyframes sg-slide-up {
    from { transform: translateY(24px); opacity:0 }
    to   { transform: translateY(0);    opacity:1 }
  }

  .sg-close-btn {
    position: absolute;
    top: 14px; right: 16px;
    background: none; border: none;
    font-size: 28px; line-height: 1;
    color: #444; cursor: pointer;
    z-index: 10; padding: 0 4px;
    transition: color 0.15s;
  }
  .sg-close-btn:hover { color: #000; }

  .sg-inner {
    display: flex;
  }

  .sg-model-section {
    width: 220px; min-width: 180px;
    flex-shrink: 0;
    background: #fdf6f8;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 32px 12px 24px;
    border-right: 1px solid #f0e8ea;
  }

  .sg-model-img-wrap {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .sg-model-img {
    width: 100%; max-width: 180px;
    object-fit: contain; display: block;
  }

  .sg-model-fallback {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sg-label {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin-top: 12px;
    width: 100%;
    text-align: left;
  }
  .sg-label-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #c8586a;
    flex-shrink: 0; margin-top: 4px;
  }
  .sg-label-title {
    display: block;
    font-size: 10px; font-weight: 800;
    letter-spacing: 0.08em; color: #222; line-height: 1.2;
  }
  .sg-label-desc {
    display: block;
    font-size: 9px; color: #888; line-height: 1.4; margin-top: 2px;
  }

  .sg-chart-section {
    flex: 1;
    padding: 32px 28px 28px;
    min-width: 0;
  }
  .sg-chart-img{
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  .sg-header { margin-bottom: 18px; }

  .sg-title {
    font-size: 17px; font-weight: 800;
    letter-spacing: 0.06em; color: #111;
    margin: 0 0 6px;
    display: inline-block;
    border: 2px solid #111;
    padding: 4px 12px;
  }

  .sg-subtitle {
    font-size: 12.5px; color: #555;
    margin: 10px 0 0; line-height: 1.5;
  }

  .sg-title-line {
    height: 1px; background: #ddd; margin-top: 14px;
  }

  .sg-table-wrap {
    overflow-x: auto;
    margin-bottom: 20px;
    border: 1px solid #e0d8da;
    border-radius: 2px;
  }

  .sg-table {
    width: 100%; border-collapse: collapse; font-size: 12px;
  }

  .sg-th {
    background: #fff; font-weight: 700;
    font-size: 11px; letter-spacing: 0.04em; color: #222;
    padding: 10px 8px; text-align: center;
    border-bottom: 2px solid #ddd;
    border-right: 1px solid #eee;
    white-space: nowrap;
  }
  .sg-th:last-child { border-right: none; }
  .sg-category-col { text-align: left; padding-left: 14px; min-width: 100px; }

  .sg-td {
    padding: 9px 8px; text-align: center;
    color: #333; font-size: 12px;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
  .sg-td:last-child { border-right: none; }

  .sg-row-label {
    text-align: left; padding-left: 14px;
    font-weight: 500; color: #222; white-space: nowrap;
  }

  .sg-row-shaded { background: #f9f3f5; }

  .sg-measurement-notes {
    border-top: 1px solid #eee;
    padding-top: 14px;
    font-size: 12px; color: #444; line-height: 1.7;
  }
  .sg-measurement-notes p { margin: 0 0 4px; }
  .sg-measurement-notes strong { color: #111; }

  @media (max-width: 640px) {
    .sg-inner { flex-direction: column; }
    .sg-model-section {
      width: 100%; min-width: unset;
      border-right: none; border-bottom: 1px solid #f0e8ea;
      padding: 20px 16px 12px;
    }
    .sg-chart-section { padding: 20px 16px; }
  }
`;

/* ─────────────────────────────────────────────
   SizeGuideModal component (inline)
───────────────────────────────────────────── */
function SizeGuideModal({ onClose, img }) {
  useEffect(() => {
    // Inject styles once
    if (!document.getElementById("sg-styles")) {
      const style = document.createElement("style");
      style.id = "sg-styles";
      style.textContent = sizeGuideStyles;
      document.head.appendChild(style);
    }
    // Close on Escape
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    // Lock scroll
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);


  return (
    <div className="sg-overlay" onClick={onClose}>
      <div className="sg-modal" onClick={(e) => e.stopPropagation()}>
        <button className="sg-close-btn" onClick={onClose} aria-label="Close size guide">×</button>

        <div className="sg-inner">
          <img src={img} alt="Size Guide" className="sg-chart-img" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   WhatsApp icon
───────────────────────────────────────────── */
const WAIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ─────────────────────────────────────────────
   ProductDetails — main component
───────────────────────────────────────────── */
function ProductDetails() {
  const { id, color: colorParam } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);

  const initialColor = product
    ? product.colors.find(c => c.key === colorParam) || product.colors[0]
    : null;
  const initialSize = product ? product.sizes[0] : "";

  const [selectedColor, setSelectedColor]   = useState(initialColor);
  const [selectedSize, setSelectedSize]     = useState(initialSize);
  const [quantity, setQuantity]             = useState(1);
  const [selectedImage, setSelectedImage]   = useState(0);
  const [validationError, setValidationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSizeGuide, setShowSizeGuide]   = useState(false);
  const [showFullDesc, setShowFullDesc]         = useState(false);

  const colorImages = selectedColor?.images || [];

  if (!product) {
    return (
      <div className="pd-container">
        <div className="pd-not-found">
          <h2>Product Not Found</h2>
          <p>Sorry, we couldn't find the product you're looking for.</p>
          <button onClick={() => navigate("/")} className="pd-back-btn">Back to Home</button>
        </div>
      </div>
    );
  }

  const handleColorClick = (color) => {
    setSelectedColor(color);
    setValidationError("");
    navigate(`/product/${id}/${color.key}`);
  };

  const handleQuantityChange = (value) => {
    const num = parseInt(value);
    if (num > 0) setQuantity(num);
  };

  const handleIncQuantity = () => setQuantity(q => q + 1);
  const handleDecQuantity = () => { if (quantity > 1) setQuantity(q => q - 1); };

  const openSizeGuide = (e) => {
    e.preventDefault();
    setShowSizeGuide(true);
  };

  const handleMessengerChat = () => window.open("https://m.me/BEWEAR", "_blank");

  const handleWhatsAppOrder = () => {
    setValidationError("");
    if (!selectedSize)  { setValidationError("Please select a size");  return; }
    if (!selectedColor) { setValidationError("Please select a color"); return; }

    const message =
      `Hello BEWEAR 👋\n\n✨ *Order Request* ✨\n\n` +
      `📦 *Product:* ${product.name}\n` +
      `💰 *Price:* LKR ${Number(product.price).toLocaleString()}\n` +
      `📏 *Size:* ${selectedSize}\n` +
      `🎨 *Color:* ${selectedColor.name}\n` +
      `🔢 *Quantity:* ${quantity}\n` +
      `💵 *Total:* LKR ${Number(product.price * quantity).toLocaleString()}\n\n` +
      `Please confirm availability. Thank you!`;

    const waUrl = `https://wa.me/94703722496?text=${encodeURIComponent(message)}`;
    setSuccessMessage("Redirecting to WhatsApp...");
    setTimeout(() => { window.open(waUrl, "_blank"); setSuccessMessage(""); }, 300);
  };

  return (
    <div className="pd-container">
      <button onClick={() => navigate(-1)} className="pd-back-btn">← Back</button>

      <div className="pd-content">
        {/* Image Gallery */}
        <div className="pd-gallery-section">
          <ImageGallery
            images={colorImages}
            selectedIndex={selectedImage}
            onSelectImage={setSelectedImage}
            productName={`${product.name} - ${selectedColor?.name}`}
          />
        </div>

        {/* Product Details */}
        <div className="pd-details-section">
          <div className="pd-breadcrumbs-text">
            Home / Collections / {product.category} / {product.name}
          </div>

          <h1 className="pd-title" style={{ marginTop: "8px" }}>{product.name}</h1>

          {product.badge && <div className="pd-badge">{product.badge}</div>}

          <div className="pd-price-area" style={{ marginTop: "12px", marginBottom: "8px" }}>
            <span className="pd-new-price">LKR {Number(product.price).toLocaleString()}</span>
          </div>

          <div className="pd-divider" style={{ margin: "24px 0" }} />

          {/* Color Selection */}
          <div className="pd-section">
            <label className="pd-section-label" style={{ marginBottom: "8px", fontWeight: "600", color: "#555" }}>
              AVAILABLE COLOR : {selectedColor?.name?.toUpperCase() || ""}
            </label>
            <div className="pd-color-grid">
              {product.colors.map(color => (
                <button
                  key={color.key}
                  className={`pd-color-btn ${selectedColor?.key === color.key ? "active" : ""}`}
                  onClick={() => handleColorClick(color)}
                  title={color.name}
                  aria-pressed={selectedColor?.key === color.key}
                >
                  <img src={color.swatch || color.images?.[0] || ''} alt={color.name} className="pd-color-sample" />
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="pd-section" style={{ marginTop: "8px" }}>
            <div className="pd-size-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <label className="pd-section-label" style={{ fontWeight: "600", color: "#555" }}>
                AVAILABLE SIZE : {selectedSize || ""}
              </label>
              <button
                onClick={openSizeGuide}
                className="pd-size-guide-link"
                style={{ fontSize: "11px", fontWeight: "700", textDecoration: "underline", color: "#000", border: "none", background: "transparent", cursor: "pointer", padding: 0 }}
              >
                Size Guide
              </button>
            </div>
            <div className="pd-size-grid">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`pd-size-btn ${selectedSize === size ? "active" : ""}`}
                  onClick={() => { setSelectedSize(size); setValidationError(""); }}
                  aria-pressed={selectedSize === size}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="pd-section" style={{ marginTop: "16px" }}>
            <label className="pd-section-label" style={{ fontWeight: "600", color: "#555", marginBottom: "8px", display: "block" }}>
              QUANTITY
            </label>
            <div className="pd-quantity-control">
              <button className="pd-qty-btn" onClick={handleDecQuantity} aria-label="Decrease quantity">–</button>
              <input
                type="number"
                className="pd-qty-input"
                value={quantity}
                min="1"
                onChange={e => handleQuantityChange(e.target.value)}
              />
              <button className="pd-qty-btn" onClick={handleIncQuantity} aria-label="Increase quantity">+</button>
            </div>
            {quantity > 1 && (
              <div className="pd-total-price" style={{ marginTop: "8px", fontWeight: "600" }}>
                Total: LKR {Number(product.price * quantity).toLocaleString()}
              </div>
            )}
          </div>

          {validationError && (
            <div className="pd-error-message" style={{ marginTop: "16px" }}>⚠️ {validationError}</div>
          )}

          <button onClick={handleWhatsAppOrder} className="pd-whatsapp-btn" style={{ marginTop: "16px" }} aria-label="Order via WhatsApp">
            <WAIcon />
            <span>Order via WhatsApp</span>
          </button>

          <button onClick={handleMessengerChat} className="pd-messenger-btn" aria-label="Chat on Messenger">
            <span style={{ fontSize: "16px" }}>💬</span>
            <span>Chat on Messenger</span>
          </button>

          {successMessage && (
            <div className="pd-success-message" style={{ marginTop: "12px" }}>{successMessage}</div>
          )}

          <div className="pd-shipping-container">
            <div className="pd-shipping-row">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
              <span>Free shipping on orders over Rs.20,000</span>
            </div>
            <div className="pd-shipping-row" style={{ borderTop: "1px solid #eee" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              <span>Free Exchange & Returns</span>
            </div>
          </div>

          <div className="pd-accordion-item">
            <span>Product Details</span>
            <span onClick={() => showFullDesc? setShowFullDesc(false): setShowFullDesc(true)}>+</span>
          </div>
            {showFullDesc && (<div  dangerouslySetInnerHTML={{ __html: product.details }} />)}
        </div>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <SizeGuideModal img={product.sizeGuide} onClose={() => setShowSizeGuide(false)} />
      )}
    </div>
  );
}

export default ProductDetails;
