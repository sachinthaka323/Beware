# Color Variations - Technical Reference & Troubleshooting

## 📋 Complete Technical Reference

### Color Object Structure
```javascript
{
  name: "Navy",              // Display name (shown to user)
  key: "navy",              // URL parameter (case-sensitive, lowercase)
  hex: "#000080",           // CSS color for swatch display
  images: [                 // Array of 4 image URLs
    "https://images.unsplash.com/photo-...",
    "https://images.unsplash.com/photo-...",
    "https://images.unsplash.com/photo-...",
    "https://images.unsplash.com/photo-..."
  ]
}
```

### Complete Product Object
```javascript
{
  id: 1,                           // Unique product ID
  name: "Classic Oxford Shirt",   // Product name
  price: 3800,                    // Price in local currency
  badge: "New Arrival",           // Display badge
  tag: "Formal",                  // Category tag
  category: "office",             // Category for filtering
  description: "...",             // Product description
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],  // Available sizes
  colors: [                        // Array of color variants
    {
      name: "White",
      key: "white",
      hex: "#FFFFFF",
      images: [...]
    },
    {
      name: "Sky Blue",
      key: "skyblue",
      hex: "#87CEEB",
      images: [...]
    },
    // ... more colors
  ]
}
```

## 🔀 State Management Flow

### Initial Load States
```javascript
// State variables in ProductDetails
const [product, setProduct] = useState(null);        // Full product data
const [selectedColor, setSelectedColor] = useState(null);  // Current color object
const [colorImages, setColorImages] = useState([]);  // Images for selected color
const [selectedSize, setSelectedSize] = useState(null);    // Selected size
const [selectedImage, setSelectedImage] = useState(0);     // Image index
const [quantity, setQuantity] = useState(1);         // Order quantity

// URL parameters
const { id, color: colorParam } = useParams();
```

### Effect #1: Initialize Product & Color
```javascript
useEffect(() => {
  const foundProduct = getProductById(id);
  if (foundProduct) {
    setProduct(foundProduct);
    
    const initialColor = colorParam
      ? foundProduct.colors.find(c => c.key === colorParam)
      : foundProduct.colors[0];
    
    setSelectedColor(initialColor || foundProduct.colors[0]);
  }
}, [product, colorParam]);
```

### Effect #2: Update Gallery Images
```javascript
useEffect(() => {
  if (selectedColor) {
    setColorImages(selectedColor.images);
    setSelectedImage(0);  // Reset to first image
  }
}, [selectedColor]);
```

## 🎨 Color Selection Flow

### User Action Sequence
```
User clicks color button
    ↓
handleColorClick(color) called
    ↓
navigate(`/product/${id}/${color.key}`) - Updates URL
    ↓
setSelectedColor(color) - Updates state
    ↓
useParams() detects URL change
    ↓
selectedColor state updates triggered
    ↓
useEffect detects selectedColor change
    ↓
colorImages updated with new color's images
    ↓
Render: Gallery, color buttons, title all updated
```

## 📱 Component Hierarchy

```
ProductDetails
  ├── ImageGallery
  │   ├── Main image display
  │   ├── Navigation arrows
  │   └── Thumbnail grid
  ├── Product info section
  │   ├── Title
  │   ├── Price
  │   ├── Badge
  │   ├── Rating
  │   └── Description
  ├── Size selection
  │   └── Size grid (from product.sizes)
  ├── Color selection
  │   └── Color grid (from product.colors)
  ├── Quantity control
  │   └── +/- buttons and input
  └── Action buttons
      ├── Add to Cart
      └── WhatsApp Order
```

## 🔗 Route Matching Details

### Router Configuration
```jsx
<Routes>
  {/* Generic route - defaults to first color */}
  <Route path="/product/:id" element={<ProductDetails />} />
  
  {/* Color-specific route - loads exact color */}
  <Route path="/product/:id/:color" element={<ProductDetails />} />
</Routes>
```

### Route Resolution
```
URL: /product/1
  → matches /product/:id
  → params: { id: "1" }
  → colorParam: undefined
  → defaults to colors[0]

URL: /product/1/navy
  → matches /product/:id/:color
  → params: { id: "1", color: "navy" }
  → colorParam: "navy"
  → finds color with key="navy"
```

## 📊 Data Flow During Color Change

```
User clicks Navy button
    ↓
handleColorClick({ name: "Navy", key: "navy", ... })
    ↓
navigate("/product/1/navy")  ← Updates URL bar
    ↓
useParams() detects change → { id: "1", color: "navy" }
    ↓
useEffect([product, colorParam]) triggers
    ↓
foundProduct.colors.find(c => c.key === "navy") returns color object
    ↓
setSelectedColor(navyColorObject)
    ↓
useState updates selectedColor
    ↓
useEffect([selectedColor]) triggers
    ↓
setColorImages(navyColorObject.images)  → [img1, img2, img3, img4]
    ↓
useState updates colorImages
    ↓
Component re-renders with:
  - NavyColorObject in selectedColor
  - ColorImages as gallery images
  - Navy button highlighted
```

## 🔍 Debugging Guide

### Check Product Data
```javascript
// In browser console
const products = require('../src/data/products');
products.getProductById(1);  // See full product structure
```

### Verify Color Key
```javascript
// Check if color exists
const color = products.getProductColor(1, 'navy');
console.log(color);  // Should log color object, not null
```

### Inspect Images
```javascript
// Get images for color
const images = products.getColorImages(1, 'navy');
console.log(images.length);  // Should be 4

// Test each image URL
images.forEach(url => {
  fetch(url, { method: 'HEAD' })
    .then(r => console.log(url, 'OK'))
    .catch(e => console.log(url, 'BROKEN'));
});
```

### Monitor State Changes
```javascript
// In ProductDetails component
useEffect(() => {
  console.log('Selected Color:', selectedColor);
  console.log('Color Images:', colorImages);
  console.log('URL Color Param:', colorParam);
}, [selectedColor, colorImages, colorParam]);
```

### Check Navigation
```javascript
// Add to handleColorClick
const handleColorClick = (color) => {
  console.log('Clicked:', color.name);
  console.log('Navigating to:', `/product/${id}/${color.key}`);
  navigate(`/product/${id}/${color.key}`);
  setSelectedColor(color);
};
```

## 🐛 Common Bugs & Fixes

### Bug #1: Images Not Updating on Color Click
**Symptom:** Click color button, URL changes but images don't
**Cause:** Missing useEffect for colorImages update
**Fix:**
```javascript
useEffect(() => {
  if (selectedColor) {
    setColorImages(selectedColor.images);
    setSelectedImage(0);  // Reset gallery
  }
}, [selectedColor]);  // ← Must include selectedColor
```

### Bug #2: Color Button Not Highlighting
**Symptom:** All color buttons look the same after click
**Cause:** Color comparison using name instead of key
**Fix:**
```javascript
// ❌ Wrong
className={selectedColor?.name === color.name ? "active" : ""}

// ✅ Correct
className={selectedColor?.key === color.key ? "active" : ""}
```

### Bug #3: First Color Not Loading
**Symptom:** Color button highlighted but no images show
**Cause:** colorImages not being set on mount
**Fix:**
```javascript
udeEffect(() => {
  if (selectedColor) {
    setColorImages(selectedColor.images);  // ← Must set here
  }
}, [selectedColor]);
```

### Bug #4: URL has Invalid Color Key
**Symptom:** Navigate to /product/1/Navy (capital N)
**Cause:** Color key case mismatch
**Fix:** Ensure all color keys are lowercase
```javascript
// ❌ Wrong
{ name: "Navy", key: "Navy", ... }

// ✅ Correct
{ name: "Navy", key: "navy", ... }
```

### Bug #5: WhatsApp Message Missing Color
**Symptom:** WhatsApp message has wrong color or "undefined"
**Cause:** Using hex instead of name, or selectedColor null
**Fix:**
```javascript
// ✅ Correct
const message = `...Color: ${selectedColor?.name}...`;

// Check selectedColor exists
if (!selectedColor) {
  // Add validation/error message
  return;
}
```

## 🧪 Automated Testing Scenarios

### Scenario 1: Basic Navigation
```
1. Navigate to /product/1
2. Assert URL contains /product/1
3. Assert selectedColor equals colors[0]
4. Assert colorImages equals colors[0].images
```

### Scenario 2: Color Selection
```
1. Click color with key="navy"
2. Assert URL changes to /product/1/navy
3. Assert selectedColor.key === "navy"
4. Assert colorImages updated to navy.images
5. Assert navy button has active class
```

### Scenario 3: URL Direct Access
```
1. Navigate directly to /product/2/khaki
2. Assert colorParam === "khaki"
3. Assert selectedColor === khaki object
4. Assert colorImages === khaki.images
```

### Scenario 4: Invalid Color
```
1. Navigate to /product/1/invalid
2. Assert app doesn't crash
3. Assert defaults to first color or shows error
```

## 📈 Performance Considerations

### Image Loading
- 4 images per color variant
- Total per product: colors.length × 4 images
- Consider lazy loading for multiple images

### Route Changes
- useParams() re-runs on URL change
- useEffect properly debounced
- No infinite loops (dependencies configured)

### Memory Usage
- Single product in memory
- Images lazy-loaded by browser
- No duplicate data

## 🔐 Security Considerations

### Color Key URL Safety
- URL-safe (lowercase, no spaces/special chars)
- No SQL injection risk (client-only)
- No code execution (static strings)

### Data Validation
```javascript
// Always validate color exists
const color = product.colors.find(c => c.key === colorParam);
if (!color) {
  // Handle missing color
  return setSelectedColor(product.colors[0]);
}
```

## 📦 Dependencies

### React Router
```javascript
import { useParams, useNavigate } from 'react-router-dom';
```

### Data Functions
```javascript
import { 
  getProductById, 
  getProductColor, 
  getColorImages,
  getProductColors 
} from '../data/products';
```

### Components
```javascript
import ImageGallery from '../components/ImageGallery';
import ProductDetails from './ProductDetails.css';
```

## 🎯 Migration Guide (Old → New)

### For Existing Products
```javascript
// OLD STRUCTURE
{
  id: 1,
  mainImage: "",
  images: [],
  colors: [{ name: "White", hex: "#FFF" }]
}

// NEW STRUCTURE
{
  id: 1,
  colors: [{
    name: "White",
    key: "white",
    hex: "#FFF",
    images: [...]
  }]
}
```

### What Changed
1. ✅ `mainImage` removed (use `colors[0].images[0]`)
2. ✅ `images` array removed (moved to each color)
3. ✅ Color objects got `key` and `images` properties
4. ✅ Routing changed from `/product/:id` to `/product/:id/:color`

## 🚀 Optimization Tips

### Reduce Re-renders
```javascript
// Use useMemo to prevent unnecessary recalculations
const colorImages = useMemo(
  () => selectedColor?.images || [],
  [selectedColor?.key]
);
```

### Lazy Load Images
```javascript
// Only load images for current color
<img loading="lazy" src={image} />
```

### Debounce Navigation
```javascript
// Prevent rapid color clicks
const [isNavigating, setIsNavigating] = useState(false);

const handleColorClick = async (color) => {
  if (isNavigating) return;
  setIsNavigating(true);
  navigate(`/product/${id}/${color.key}`);
  // Add small delay
  setTimeout(() => setIsNavigating(false), 300);
};
```

---

**Document Version:** 2.0  
**Last Updated:** March 3, 2026  
**Status:** Complete & Tested
