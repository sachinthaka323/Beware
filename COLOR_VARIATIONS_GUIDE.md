# Color Variations Feature Guide

Complete implementation of color-based dynamic routing in your TutuMart fashion e-commerce system.

## 🎨 Overview

Users can now select color variations of products and navigate to unique URLs that display different images for each color. When a color is clicked, the app automatically:

1. **Navigates** to `/product/:id/:color` 
2. **Loads** color-specific images
3. **Highlights** the selected color
4. **Updates** the gallery with new images
5. **Includes** the color in WhatsApp message

## 📍 Routing Structure

### Routes Configuration
```javascript
// src/App.jsx
<Route path="/product/:id" element={<ProductDetails />} />
<Route path="/product/:id/:color" element={<ProductDetails />} />
```

### URL Examples
```
/product/1/white      → Classic Oxford Shirt - White variant
/product/1/skyblue    → Classic Oxford Shirt - Sky Blue variant
/product/1/navy       → Classic Oxford Shirt - Navy variant
/product/2/khaki      → Slim Fit Chinos - Khaki variant
/product/2/black      → Slim Fit Chinos - Black variant
```

## 📊 Data Structure

### Product Color Format
Each product now has colors with their own images and metadata:

```javascript
{
  id: 1,
  name: "Classic Oxford Shirt",
  price: 3800,
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: [
    {
      name: "White",           // Display name
      key: "white",            // URL parameter (lowercase, no spaces)
      hex: "#FFFFFF",          // Color swatch hex value
      images: [                // Array of image URLs for this color
        "https://images.unsplash.com/...",
        "https://images.unsplash.com/...",
        "https://images.unsplash.com/...",
        "https://images.unsplash.com/..."
      ]
    },
    {
      name: "Sky Blue",
      key: "skyblue",
      hex: "#87CEEB",
      images: [...]
    }
    // ... more colors
  ]
}
```

### Key Differences from Previous Structure
| Old | New |
|-----|-----|
| `mainImage` (string) | Removed (use colors[0].images[0]) |
| `images` (array) | Removed (now color-specific) |
| `colors` (simple array) | `colors` (array of color objects) |
| Color: `{ name, hex }` | Color: `{ name, key, hex, images }` |

## 🔄 Navigation Flow

### From Home Page to Product
```
Click Product Card
  ↓
Navigate to /product/{id}/{firstColorKey}
  ↓
ProductDetails loads with color parameter
  ↓
Display product with first color's images
```

### When User Clicks Color Button
```
User clicks color button
  ↓
handleColorClick(color) triggered
  ↓
navigate(`/product/${id}/${color.key}`)
  ↓
useParams() reads new color parameter
  ↓
colorImages updated
  ↓
Gallery displays new color's images
  ↓
Color button highlighted
```

## 💻 Code Implementation

### ProductDetails.jsx Key Changes

#### 1. Read URL Parameters
```javascript
const { id, color: colorParam } = useParams();
const product = getProductById(id);
```

#### 2. Initialize Color on Mount
```javascript
useEffect(() => {
  if (!product) return;

  // Use color from URL or default to first color
  const initialColor = colorParam
    ? product.colors.find(c => c.key === colorParam)
    : product.colors[0];

  setSelectedColor(initialColor || product.colors[0]);
}, [product, colorParam]);
```

#### 3. Update Images When Color Changes
```javascript
useEffect(() => {
  if (selectedColor) {
    setColorImages(selectedColor.images);
    setSelectedImage(0); // Reset to first image
  }
}, [selectedColor]);
```

#### 4. Handle Color Click with Navigation
```javascript
const handleColorClick = (color) => {
  setSelectedColor(color);
  setValidationError("");
  // Navigate to color-specific URL
  navigate(`/product/${id}/${color.key}`);
};
```

#### 5. Color Button with Navigation
```jsx
{product.colors.map(color => (
  <button
    key={color.key}
    className={`pd-color-btn ${selectedColor?.key === color.key ? "active" : ""}`}
    onClick={() => handleColorClick(color)}
    title={color.name}
  >
    <span
      className="pd-color-sample"
      style={{ backgroundColor: color.hex }}
    />
    <span className="pd-color-name">{color.name}</span>
  </button>
))}
```

### New Helper Functions in products.js

#### Get Product Color by Key
```javascript
export function getProductColor(productId, colorKey) {
  const product = getProductById(productId);
  if (!product) return null;
  return product.colors.find(c => c.key === colorKey) || null;
}
```

#### Get Images for Color
```javascript
export function getColorImages(productId, colorKey) {
  const color = getProductColor(productId, colorKey);
  return color ? color.images : [];
}
```

#### Get All Colors for Product
```javascript
export function getProductColors(productId) {
  const product = getProductById(productId);
  return product ? product.colors : [];
}
```

### ProductCard.jsx Updates

```javascript
// Changed from single image to product prop
function ProductCard({ product, id, name, price, badge, tag }) {
  // Get first color's first image for card display
  const image = product?.colors[0]?.images[0];
  
  // ... rest of component

  // Navigate with first color
  <Link to={`/product/${id}/${product.colors[0].key}`}>
    {/* ... */}
  </Link>
}
```

## 🎯 Feature Behavior

### Image Gallery Updates
- Gallery images change based on selected color
- Image counter still works
- Thumbnails display color-specific images
- Navigation arrows cycle through color's images

### Size Selection
- Works independently of color
- Same sizes available for all colors
- Size selection persists when color changes

### Quantity Control
- Works independently of color
- Total price calculated correctly
- Persists when color changes

### WhatsApp Message
Example message with color included:

```
Hello TUTU MART 👋

✨ *Order Request* ✨

📦 *Product:* Classic Oxford Shirt
💰 *Price:* LKR 3,800
📏 *Size:* M
🎨 *Color:* Navy Blue
🔢 *Quantity:* 2
💵 *Total:* LKR 7,600

Please confirm availability. Thank you!
```

## 🔑 Color Key Requirements

### Valid Color Keys
- All lowercase
- No spaces (use `skyblue` not `sky blue`)
- No special characters
- Examples: `white`, `navy`, `lightgray`, `classicblue`, `darkundigo`

### Color Key Usage
```javascript
// URL parameter
/product/1/white

// Color object
{ name: "White", key: "white", hex: "#FFFFFF", images: [...] }

// Navigation
navigate(`/product/${id}/${color.key}`)

// Lookup
product.colors.find(c => c.key === "white")
```

## 📝 Adding New Products with Colors

### Example: New Product
```javascript
{
  id: 7,
  name: "Premium Wool Jacket",
  price: 12000,
  badge: "Premium",
  tag: "Formal",
  category: "office",
  description: "...",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: [
    {
      name: "Charcoal",
      key: "charcoal",      // ← Must be unique within product
      hex: "#36454F",
      images: [
        "https://...",
        "https://...",
        "https://...",
        "https://..."
      ]
    },
    {
      name: "Navy",
      key: "navy",
      hex: "#000080",
      images: [...]
    }
  ]
}
```

## 🔗 Deep Linking Examples

Users can bookmark or share color-specific URLs:

```
Share White variant:
https://tutumhart.com/product/1/white

Share Navy variant:
https://tutummart.com/product/1/navy

Share directly to color:
Customer receives link → App opens with exact color selected
```

## 🎨 URL Parameter Values

### Available Color Keys (Current Products)
```
Product 1:  white, skyblue, navy, lightgray
Product 2:  khaki, black, navy, gray
Product 3:  classicblue, lightwash, black, darkindigo
Product 4:  navy, charcoal, burgundy, cream
Product 5:  white, black, navy, red, gray
Product 6:  navy, charcoal, black, olive
```

## 🧪 Testing Color Variations

### Test Checklist
- [ ] Click product card → navigates to /product/:id/:color
- [ ] See first color selected by default
- [ ] Images display for selected color
- [ ] Click another color → URL changes to new color
- [ ] Images update to new color's images
- [ ] Color button shows as active
- [ ] Size selection still works
- [ ] Quantity still works
- [ ] Total price calculates correctly
- [ ] WhatsApp message includes color name
- [ ] Image counter works for color's images
- [ ] Thumbnail navigation works with color's images

### Manual Test Flow
```
1. Home page → Click "Classic Oxford Shirt" card
2. Should navigate to /product/1/white
3. Gallery shows white shirt images
4. "White" button is highlighted
5. Click "Navy" button
6. URL changes to /product/1/navy
7. Gallery updates to navy images
8. "Navy" button is now highlighted
9. Select size M, quantity 1
10. Click WhatsApp button
11. Message should say "Color: Navy"
```

## 🐛 Common Issues & Solutions

### Issue: Image not loading
**Solution:** Verify color key in URL matches product's color key exactly (case-sensitive)

### Issue: Wrong images showing
**Solution:** Check that color object has correct `images` array with valid URLs

### Issue: Navigation not working
**Solution:** Ensure `/product/:id/:color` route is defined in App.jsx AFTER `/product/:id` route

### Issue: Color not highlighting
**Solution:** Verify color comparison uses `selectedColor?.key === color.key` (not by name)

### Issue: Images not updating on color click
**Solution:** Check useEffect dependency includes `[selectedColor]`

## 📚 API Functions

```javascript
// Get a product
getProductById(id)  → Returns product object

// Get color details
getProductColor(productId, colorKey)  → Returns color object

// Get image URLs for color
getColorImages(productId, colorKey)  → Returns images array

// Get all colors for product
getProductColors(productId)  → Returns colors array

// Get all products in category
getProductsByCategory(category)  → Returns products array
```

## 🔐 URL Safety

All color keys are URL-safe:
- No spaces (uses camelCase)
- No special characters
- Case-sensitive but lowercase

Example safe URLs:
```
✅ /product/1/skyblue
✅ /product/2/classicblue
✅ /product/3/darkindigo
❌ /product/1/Sky Blue        (spaces)
❌ /product/2/Light-Gray      (hyphens)
```

## 🚀 Future Enhancements

Potential improvements:
1. **Color Swatches in Shopping Cart** - Show color in cart items
2. **Price Variations** - Different prices per color
3. **Stock by Color** - Show stock for each color variant
4. **Color Recommendations** - "People also buy this in..."
5. **Color Compare** - View side-by-side color comparison
6. **Try On** - AR try-on for each color
7. **Color Popularity** - Show most popular colors

## 📞 Support

### For Issues with Color Variations
1. Check that color key is lowercase with no spaces
2. Verify product.colors is array of objects with `key` and `images`
3. Ensure route has both `/product/:id` and `/product/:id/:color`
4. Check browser console for errors (F12)

### Debug Steps
```javascript
// In browser console
// 1. Check product data
getProductById(1).colors

// 2. Check color lookup
getProductColor(1, 'white')

// 3. Check images
getColorImages(1, 'white')
```

---

**Last Updated:** March 3, 2026  
**Feature Status:** ✅ Active & Tested  
**Works With:** React Router v7.13.0, React v19.2.0
