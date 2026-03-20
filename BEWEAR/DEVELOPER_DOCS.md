# Developer Documentation - Product Details System

Complete technical documentation for developers extending or maintaining the system.

## 📂 File Organization

### Data Layer (`src/data/products.js`)
**Exports:**
- `PRODUCTS` - Main product array
- `getProductById(id)` - Fetch single product
- `getProductsByCategory(category)` - Filter by category
- `getAllSizes()` - Get unique sizes
- `getAllColors()` - Get unique colors

**Product Schema:**
```typescript
interface Product {
  id: number;                    // Unique identifier (1+)
  name: string;                  // Product name
  price: number;                 // Price in LKR
  badge: string;                 // Label/badge text
  tag: string;                   // Product tag/category
  category: "casual" | "office"; // Main category
  description: string;           // Long description
  mainImage: string;             // Primary image URL
  images: string[];              // Array of image URLs
  sizes: string[];               // Available sizes
  colors: Array<{                // Available colors
    name: string;
    hex: string;
  }>;
}
```

### Pages (`src/pages/ProductDetails.jsx`)
**Props:** None (uses URL params)

**State Management:**
```javascript
{
  selectedSize: string | null,
  selectedColor: { name, hex } | null,
  quantity: number,
  selectedImage: number,
  validationError: string,
  successMessage: string
}
```

**Key Functions:**
- `handleQuantityChange(value)` - Quantity input handler
- `handleIncQuantity()` - Increment quantity
- `handleDecQuantity()` - Decrement quantity
- `handleWhatsAppOrder()` - Send WhatsApp message with validation

**Validation Rules:**
```javascript
// Size required
if (!selectedSize) {
  setValidationError("Please select a size");
  return false;
}

// Color required
if (!selectedColor) {
  setValidationError("Please select a color");
  return false;
}

// Quantity > 0 (enforced by UI)
if (quantity < 1) {
  return false;
}
```

### Components (`src/components/`)

#### ImageGallery.jsx
**Props:**
```typescript
interface ImageGalleryProps {
  images: string[];           // Array of image URLs
  selectedIndex: number;      // Currently selected image
  onSelectImage: (index) => void; // Callback when image changes
  productName: string;        // For alt text
}
```

**State:**
```javascript
{
  currentIndex: number
}
```

**Handlers:**
- `handlePrev()` - Navigate to previous image
- `handleNext()` - Navigate to next image
- `handleThumbnailClick(index)` - Jump to specific image

**Features:**
- Circular navigation (wraps around)
- Keyboard support via arrow keys
- Image counter display
- Touch-friendly thumbnails

#### ProductCard.jsx (Updated)
**Props:**
```typescript
interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  price: number;
  badge?: string;
  tag?: string;
}
```

**Changes:**
- Added `id` prop
- Wrapped image section in `<Link to={`/product/${id}`}>`
- Updated PRODUCTS import
- Maintains all original functionality

## 🔄 Data Flow

```
URL: /product/1
    ↓
ProductDetails.jsx
    ↓
useParams() → { id: "1" }
    ↓
getProductById("1")
    ↓
Product Object
    ↓
Render with:
- ImageGallery (with images)
- Size Grid (from product.sizes)
- Color Grid (from product.colors)
- WhatsApp Button (with validation)
```

## 💾 State Updates

### Image Selection
```javascript
const [selectedImage, setSelectedImage] = useState(0);

// In ImageGallery callback
const handleSelectImage = (index) => {
  setSelectedImage(index);
};
```

### Size Selection
```javascript
const [selectedSize, setSelectedSize] = useState(null);

// Clear error when selecting
const handleSizeClick = (size) => {
  setSelectedSize(size);
  setValidationError("");
};
```

### Color Selection
```javascript
const [selectedColor, setSelectedColor] = useState(null);

// Color object: { name: "Blue", hex: "#0000FF" }
const handleColorClick = (color) => {
  setSelectedColor(color);
  setValidationError("");
};
```

### Quantity Management
```javascript
const [quantity, setQuantity] = useState(1);

// Increment
const handleInc = () => setQuantity(q => q + 1);

// Decrement (minimum 1)
const handleDec = () => {
  if (quantity > 1) setQuantity(q => q - 1);
};

// Direct input
const handleChange = (value) => {
  const num = parseInt(value);
  if (num > 0) setQuantity(num);
};
```

## 🌐 Routing Configuration

**In App.jsx:**
```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";

<Router>
  <Routes>
    <Route path="/product/:id" element={<ProductDetails />} />
  </Routes>
</Router>
```

**URL Format:** `/product/{id}`

**Example URLs:**
- `/product/1` → Classic Oxford Shirt
- `/product/2` → Slim Fit Chinos
- `/product/999` → Not found (shows error)

## 💬 WhatsApp Integration

### Message Construction
```javascript
const message = `Hello TUTU MART 👋

✨ *Order Request* ✨

📦 *Product:* ${product.name}
💰 *Price:* LKR ${Number(product.price).toLocaleString()}
📏 *Size:* ${selectedSize}
🎨 *Color:* ${selectedColor.name}
🔢 *Quantity:* ${quantity}
💵 *Total:* LKR ${Number(product.price * quantity).toLocaleString()}

Please confirm availability. Thank you!`;
```

### URL Formation
```javascript
const waUrl = `https://wa.me/{PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
window.open(waUrl, "_blank");
```

**Phone Number Formats:**
- Sri Lanka: `+94XXXXXXXXX` or `94XXXXXXXXX`
- India: `+91XXXXXXXXXX` or `91XXXXXXXXXX`
- USA: `+1XXXXXXXXXX` or `1XXXXXXXXXX`

**Note:** WhatsApp requires country code without + in the URL

## 🎨 CSS Classes Reference

### ProductDetails.jsx Classes
```css
.pd-container           /* Main wrapper */
.pd-back-btn           /* Back navigation button */
.pd-content            /* Grid container (gallery + details) */
.pd-gallery-section    /* Left column */
.pd-details-section    /* Right column */
.pd-badge              /* Product badge */
.pd-title              /* Product name */
.pd-price-row          /* Price display */
.pd-price              /* Price value */
.pd-description        /* Product description */
.pd-divider            /* Horizontal separator */
.pd-section            /* Section wrapper */
.pd-section-label      /* Section title */
.pd-required           /* Required indicator (*) */
.pd-size-grid          /* Size buttons grid */
.pd-size-btn           /* Individual size button */
.pd-size-btn.active    /* Active size button */
.pd-color-grid         /* Color buttons grid */
.pd-color-btn          /* Individual color button */
.pd-color-btn.active   /* Active color button */
.pd-color-sample       /* Color swatch */
.pd-color-name         /* Color label */
.pd-quantity-control   /* Quantity input wrapper */
.pd-qty-btn            /* +/- button */
.pd-qty-input          /* Quantity number input */
.pd-total              /* Total price section */
.pd-total-price        /* Total price value */
.pd-error-message      /* Error message */
.pd-success-message    /* Success message */
.pd-whatsapp-btn       /* WhatsApp action button */
.pd-info-box           /* Information box */
```

### ImageGallery.jsx Classes
```css
.ig-container          /* Main wrapper */
.ig-main-wrapper       /* Main image container */
.ig-main-image         /* Main image element */
.ig-nav-btn            /* Navigation arrow button */
.ig-nav-prev           /* Previous button */
.ig-nav-next           /* Next button */
.ig-counter            /* Image counter badge */
.ig-thumbnails         /* Thumbnails grid */
.ig-thumbnail          /* Individual thumbnail */
.ig-thumbnail.active   /* Active thumbnail */
.ig-no-image           /* No images state */
```

## 🎯 CSS Media Queries

### Breakpoints
```css
/* Desktop: 1024px and above */
/* Tablet: 641px - 1023px */
/* Mobile: 640px and below */
/* Small: 380px and below */
```

### Example Responsive Rule
```css
/* Desktop */
.pd-size-grid {
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
}

/* Mobile */
@media (max-width: 640px) {
  .pd-size-grid {
    grid-template-columns: repeat(auto-fit, minmax(45px, 1fr));
  }
}
```

## 🔧 Hook Usage

### useParams()
```javascript
import { useParams } from "react-router-dom";

const { id } = useParams();
// Returns: { id: "1" } or { id: "invalid" }
```

### useNavigate()
```javascript
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

// Navigate to previous page
navigate(-1);

// Navigate to specific route
navigate("/");

// Navigate with state
navigate("/", { state: { from: "product", id: 1 } });
```

### useState() Examples
```javascript
// String state
const [size, setSize] = useState("M");

// Number state
const [quantity, setQuantity] = useState(1);

// Object state
const [color, setColor] = useState({ name: "Blue", hex: "#0000FF" });

// Lazy initialization
const [data, setData] = useState(() => {
  return getProductById(id);
});

// Array state
const [images, setImages] = useState([]);
```

### useEffect() Examples
```javascript
// Initialize size
useEffect(() => {
  if (product?.sizes.length > 0) {
    setSelectedSize(product.sizes[0]);
  }
}, [product]);

// Cleanup
useEffect(() => {
  const handler = () => console.log("Resize!");
  window.addEventListener("resize", handler);
  
  return () => {
    window.removeEventListener("resize", handler);
  };
}, []);
```

## ⚠️ Error Handling

### Product Not Found
```jsx
if (!product) {
  return (
    <div className="pd-not-found">
      <h2>Product Not Found</h2>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}
```

### Validation Error
```jsx
const handleOrder = () => {
  if (!selectedSize) {
    setValidationError("Please select a size");
    return;
  }
  // Proceed with order
};

// Display error
{validationError && (
  <div className="pd-error-message">⚠️ {validationError}</div>
)}
```

### Success Feedback
```jsx
{successMessage && (
  <div className="pd-success-message">✓ {successMessage}</div>
)}
```

## 🚀 Performance Optimization

### Image Optimization
```html
<!-- Use loading="lazy" for images -->
<img src={image} alt={name} loading="lazy" />
```

### Memoization (if needed)
```javascript
import { useMemo, useCallback } from "react";

// Memoize expensive calculation
const totalPrice = useMemo(() => {
  return product.price * quantity;
}, [product.price, quantity]);

// Memoize callback
const handleWhatsApp = useCallback(() => {
  // ... implementation
}, [product, selectedSize, selectedColor, quantity]);
```

### Conditional Rendering
```javascript
{images.length > 1 && (
  <div className="ig-thumbnails">
    {/* Render only if multiple images */}
  </div>
)}
```

## 🔐 Security Considerations

### URL Parameter Validation
```javascript
const id = useParams().id;
const product = getProductById(id);

// Always check if product exists
if (!product) {
  // Handle not found
}
```

### XSS Prevention
```javascript
// ✅ Safe: React escapes output
<div>{product.name}</div>

// ❌ Unsafe: Don't use dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: product.description }} />

// ✅ Safe alternative: Sanitize first
import DOMPurify from "dompurify";
<div>{DOMPurify.sanitize(product.description)}</div>
```

### WhatsApp Link Safety
```javascript
// Always validate before opening
const phoneRegex = /^\d{1,15}$/;
if (!phoneRegex.test(phoneNumber)) {
  console.error("Invalid phone number");
  return;
}
```

## 📊 Testing Strategy

### Unit Tests
```javascript
// Test product retrieval
test("getProductById returns correct product", () => {
  const product = getProductById(1);
  expect(product.name).toBe("Classic Oxford Shirt");
});

// Test validation
test("validation fails without size", () => {
  // Render ProductDetails
  // Click WhatsApp without selecting size
  // Expect error message
});
```

### Integration Tests
```javascript
// Test navigation
test("clicking product cards navigates to details", () => {
  // Render ProductCard with id
  // Click image
  // Assert navigation to /product/1
});

// Test WhatsApp redirection
test("WhatsApp button opens correct URL", () => {
  // Render ProductDetails
  // Select size, color, quantity
  // Click WhatsApp
  // Assert window.open called with correct URL
});
```

## 🔄 Extending the System

### Add Filter Functionality
```javascript
// In ProductDetails.jsx or new FilterPage.jsx
const [filters, setFilters] = useState({
  category: "all",
  priceRange: [0, 15000]
});

const filteredProducts = PRODUCTS.filter(p => {
  if (filters.category !== "all" && p.category !== filters.category) {
    return false;
  }
  if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) {
    return false;
  }
  return true;
});
```

### Add to Cart Functionality
```javascript
// Store in localStorage or state
const [cart, setCart] = useState([]);

const addToCart = (product, size, color, quantity) => {
  const item = {
    productId: product.id,
    size,
    color,
    quantity,
    price: product.price * quantity
  };
  setCart([...cart, item]);
  localStorage.setItem("cart", JSON.stringify([...cart, item]));
};
```

### Add Reviews/Ratings
```javascript
{product.reviews && (
  <div className="pd-reviews">
    {product.reviews.map(review => (
      <div key={review.id} className="review">
        <h4>{review.author}</h4>
        <p>{review.text}</p>
        <span>⭐ {review.rating}/5</span>
      </div>
    ))}
  </div>
)}
```

## 🔗 API Integration (Future)

### Fetch Products from Backend
```javascript
// Replace PRODUCTS constant with API call
const [products, setProducts] = useState([]);

useEffect(() => {
  fetch("/api/products")
    .then(res => res.json())
    .then(data => setProducts(data));
}, []);
```

### Sync Order to Backend
```javascript
const handleWhatsAppOrder = async () => {
  // ... validation
  
  // Send order to backend
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      productId: product.id,
      size: selectedSize,
      color: selectedColor.name,
      quantity
    })
  });
  
  // Then open WhatsApp
  window.open(waUrl, "_blank");
};
```

---

**Last Updated:** March 3, 2026
**Version:** 1.0
**Maintained by:** Development Team
