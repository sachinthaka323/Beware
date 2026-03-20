# Quick Start Guide - Product Details System

## 🚀 Getting Started

### View Product Details
1. Click any product card → Navigates to `/product/{id}`
2. View product images with thumbnail navigation
3. Select size, color, and quantity
4. Click "Order via WhatsApp" to complete order

## 📝 Code Quick Reference

### Import and Use Product Data

```jsx
import { getProductById, PRODUCTS } from "../data/products";

// Get single product
const product = getProductById(1);

// Get all products
const allProducts = PRODUCTS;

// Get product by category
import { getProductsByCategory } from "../data/products";
const casualProducts = getProductsByCategory("casual");
```

### Product Structure
```javascript
{
  id: number,
  name: string,
  price: number,
  badge: string,
  tag: string,
  category: string,
  description: string,
  mainImage: string (URL),
  images: string[] (URLs),
  sizes: string[],
  colors: { name: string, hex: string }[]
}
```

### Link to Product Details
```jsx
import { Link } from "react-router-dom";

<Link to={`/product/${productId}`}>View Product</Link>
```

### WhatsApp Integration
```javascript
// In ProductDetails.jsx, WhatsApp URL is built like:
const message = `Product: ${product.name}\nSize: ${selectedSize}\nColor: ${selectedColor.name}`;
const waUrl = `https://wa.me/94764293407?text=${encodeURIComponent(message)}`;
window.open(waUrl, "_blank");
```

## 🎯 Component Usage

### ProductDetails Page
```jsx
import ProductDetails from "./pages/ProductDetails";

// Already configured in App.jsx
<Route path="/product/:id" element={<ProductDetails />} />
```

### ImageGallery Component
```jsx
import ImageGallery from "../components/ImageGallery";

<ImageGallery 
  images={product.images}
  selectedIndex={0}
  onSelectImage={setSelectedImage}
  productName={product.name}
/>
```

## 🔧 Customization Examples

### Change WhatsApp Number
**File:** `src/pages/ProductDetails.jsx`

Find line ~63:
```javascript
// Change FROM this:
const waUrl = `https://wa.me/94764293407?text=${encodeURIComponent(message)}`;

// TO this (your number):
const waUrl = `https://wa.me/YOUR_COUNTRY_CODE_AND_NUMBER?text=${encodeURIComponent(message)}`;
```

Example numbers:
- Sri Lanka: `94764293407`
- India: `919999999999`
- USA: `1234567890`

### Add Custom Product
**File:** `src/data/products.js`

```javascript
{
  id: 7,  // Must be unique
  name: "Product Name",
  price: 4500,
  badge: "Hot Deal",
  tag: "Category",
  category: "casual",  // or "office"
  description: "Beautiful description...",
  mainImage: "https://example.com/main.jpg",
  images: [
    "https://example.com/img1.jpg",
    "https://example.com/img2.jpg"
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: [
    { name: "Blue", hex: "#0000FF" },
    { name: "Red", hex: "#FF0000" }
  ]
}
```

### Change Product Card Link
**File:** `src/components/ProductCard.jsx` (Line ~613)

```jsx
// Current: Links to /product/id
<Link to={`/product/${id}`}>
```

### Customize WhatsApp Message
**File:** `src/pages/ProductDetails.jsx` (Line ~50)

```javascript
// Current format:
const message = `Hello TUTU MART 👋\n\n✨ *Order Request* ✨\n\n📦 *Product:* ${product.name}\n...`;

// Customize as needed:
const message = `Your custom message here with ${variables}`;
```

## 🎨 Styling Customization

### Change Primary Colors
**File:** Any CSS file, search and replace:
- `#0a0a0a` → Change black color
- `#b89a6a` → Change gold accent
- `#faf8f5` → Change off-white background
- `#25D366` → Change WhatsApp green

### Modify Component Width
**File:** `src/pages/ProductDetails.css`

```css
.pd-container {
  max-width: 1400px;  /* Change this value */
  /* ... */
}
```

### Adjust Grid Layout
**File:** `src/pages/ProductDetails.css`

```css
/* Change columns from 1fr 1fr to 1fr 2fr for different ratios */
.pd-content {
  grid-template-columns: 1fr 1fr;
}
```

## 📞 API Reference

### `getProductById(id)`
```javascript
const product = getProductById(1);
// Returns: Product object or undefined
```

### `getProductsByCategory(category)`
```javascript
const products = getProductsByCategory("casual");
// Returns: Array of product objects
```

### `getAllSizes()`
```javascript
const sizes = getAllSizes();
// Returns: ["XS", "S", "M", "L", "XL", "XXL", "28", "30", ...]
```

### `getAllColors()`
```javascript
const colors = getAllColors();
// Returns: [{ name: "Red", hex: "#FF0000" }, ...]
```

## 🔗 File Structure for Reference

```
src/
├── data/
│   └── products.js          ← Product database
├── pages/
│   ├── ProductDetails.jsx   ← Main product page
│   └── ProductDetails.css   ← Product page styles
├── components/
│   ├── ImageGallery.jsx     ← Image gallery logic
│   ├── ImageGallery.css     ← Gallery styles
│   └── ProductCard.jsx      ← Updated with links
└── App.jsx                  ← Updated with route
```

## ⚡ Performance Tips

1. **Lazy Load Images**
   - Already implemented via `loading="lazy"`
   - Add to any `<img>` tag for instant effect

2. **Optimize Images**
   - Use WebP format when possible
   - Compress images before uploading
   - Use appropriate URLs with width parameter

3. **Cache Products**
   - Data is pre-loaded in memory
   - No API calls needed
   - Add localStorage for favorites

## 🐛 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Product doesn't show | Check ID exists in products.js |
| WhatsApp doesn't open | Verify phone number format |
| Images don't load | Check image URLs are public |
| Styling looks wrong | Clear browser cache (Ctrl+Shift+Delete) |
| Links don't work | Verify React Router is set up in App.jsx |

## 📱 Test on Different Devices

```bash
# Desktop (1024px+)
- 2-column layout

# Tablet (641px - 1023px)
- 1-column responsive layout

# Mobile (380px - 640px)
- Single column, compact layout

# Test with browser DevTools:
- F12 → Toggle device toolbar → Select device
```

## 🎯 Next Steps

1. **Test the system:**
   - Click a product card
   - Select size and color
   - Try WhatsApp button

2. **Customize for your needs:**
   - Update WhatsApp number
   - Add your products
   - Modify colors/fonts

3. **Extend functionality:**
   - Add shopping cart
   - Implement favorites system
   - Add product reviews
   - Connect to backend API

## 📚 Resources

- [React Router Docs](https://reactrouter.com)
- [React Hooks Guide](https://react.dev/reference/react/hooks)
- [MDN CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [WebMD Accessibility](https://www.w3.org/WAI/ARIA/apg)

---

**Need help?** Check PRODUCT_DETAILS_README.md for detailed documentation!
