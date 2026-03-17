# Color Variations - Quick Reference

## 🎯 At a Glance

**What it does:** Users pick a color → app shows that color's images → URL changes to reflect it

**Routes:**
- `/product/:id` → first color by default
- `/product/:id/:color` → specific color

## 📊 Data Structure

```javascript
Product {
  id, name, price, sizes, colors: [
    { name, key, hex, images: [...4 URLs...] },
    ...
  ]
}
```

## 🔑 Color Keys

| Product | Keys |
|---------|------|
| 1 - Oxford Shirt | white, skyblue, navy, lightgray |
| 2 - Chinos | khaki, black, navy, gray |
| 3 - Denim Jacket | classicblue, lightwash, black, darkindigo |
| 4 - Cotton Blazer | navy, charcoal, burgundy, cream |
| 5 - T-Shirt | white, black, navy, red, gray |
| 6 - Dress Pants | navy, charcoal, black, olive |

## 💻 Implementation

### ProductDetails.jsx
```javascript
const { id, color: colorParam } = useParams();

// Initialize from URL
useEffect(() => {
  const initialColor = colorParam 
    ? product.colors.find(c => c.key === colorParam)
    : product.colors[0];
  setSelectedColor(initialColor);
}, [product, colorParam]);

// Update gallery
useEffect(() => {
  if (selectedColor) setColorImages(selectedColor.images);
}, [selectedColor]);

// Navigate on click
const handleColorClick = (color) => {
  navigate(`/product/${id}/${color.key}`);
  setSelectedColor(color);
};
```

### Helper Functions
```javascript
getProductColor(productId, colorKey)  // Get color object
getColorImages(productId, colorKey)   // Get images array
getProductColors(productId)           // Get all colors
```

## 🎨 Color Button
```jsx
{product.colors.map(color => (
  <button
    onClick={() => handleColorClick(color)}
    className={selectedColor?.key === color.key ? "active" : ""}
  >
    <span style={{ backgroundColor: color.hex }} />
    {color.name}
  </button>
))}
```

## 🔗 URLs
```
/product/1/white     ✅
/product/2/khaki     ✅
/product/3/navy      ✅
/product/1/Sky%20Blue ❌ (use skyblue)
```

## 📝 Adding Colors
```javascript
{
  name: "Light Gray",
  key: "lightgray",      // lowercase, no spaces
  hex: "#D3D3D3",
  images: ["url1", "url2", "url3", "url4"]
}
```

## 🧪 Test
1. Click product → /product/1/white ✓
2. Click color → /product/1/navy ✓
3. Images update ✓
4. Button highlights ✓
5. WhatsApp includes color ✓

## 🐛 Debug
```javascript
getProductById(1).colors           // See color structure
getProductColor(1, 'white')        // Check color lookup
getColorImages(1, 'white')         // Check images
```

## ⚡ Key Points
- **URL parameters:** Both ID and color required
- **Color keys:** All lowercase, no spaces
- **Images:** 4 per color in `images` array
- **Navigation:** Updates both URL and state
- **Gallery:** Updates automatically with color
- **WhatsApp:** Includes color name in message

---

For detailed info, see [COLOR_VARIATIONS_GUIDE.md](COLOR_VARIATIONS_GUIDE.md)
