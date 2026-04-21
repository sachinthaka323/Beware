/**
 * Product Database with Local Images
 * 
 * Image Structure:
 * src/assets/products/
 *   ├── product-1/
 *   │   ├── shirt-white.jpg
 *   │   ├── shirt-skyblue.jpg
 *   │   ├── shirt-navy.jpg
 *   │   └── shirt-gray.jpg
 *   ├── product-2/
 *   │   └── chinos-*.jpg
 *   └── ...
 */

// ═══ PRODUCTS ARRAY ═══
export const PRODUCTS = [
  {
    id: 1,
    sizeGuide:"/sizeguide.png",
    name: "Acid Burst Bleach Tie-Dye Tank Top",
    price: 1500,
    originalPrice: 2590,
    badge: "Featured",
    category: "men",
    details:`<div class="product-description">
  <h2>Bewear Bleach Tie-Dye Tank Top</h2>

  <p>
    Elevate your streetwear rotation with this <strong>Bewear Bleach Tie-Dye Tank Top</strong>. 
    Each piece features a unique, high-contrast <em>"acid wash"</em> effect where organic 
    cream-colored bursts stand out against a deep black base.
  </p>

  <p>
    Inspired by <strong>90s grunge aesthetics</strong> and blended with modern urban fashion, 
    this tank top offers a bold and stylish look perfect for casual wear, festivals, 
    or everyday street style.
  </p>

  <ul>
    <li><strong>Brand:</strong> Bewear</li>
    <li><strong>Style:</strong> Bleach Tie-Dye / Acid Wash</li>
    <li><strong>Color:</strong> Black with Cream Bleach Pattern</li>
    <li><strong>Available Size:</strong> L</li>
    <li><strong>Fit:</strong> Comfortable and breathable tank style</li>
  </ul>
</div>`,
    sizes: [ "L"],
    colors: [
      {
        name: "Default",
        key: "default",
        hex: "#1a1a1a",
        swatch: "/assets/products/men/img.png",
        images: [
          "/assets/products/men/img.png"
          
        ]
      }
    ]
  },
  {
    id: 2,
    sizeGuide:"/sizeguide.png",
    name: "vertical striped shirt",
    price: 3300,
    originalPrice: 4100,
    badge: "Featured",
    category: "men",
    details:`<div class="product-description">
    <h2>Bewear vertical striped shirt</h2>
  <p>
    High-quality cotton-blend textured knit for a soft, breathable, and structured feel. 
    Classic vertical double-stripe pattern that elongates the silhouette. 
    Casual camp collar for an open, airy neckline. 
    Regular/Relaxed fit with a straight hem, designed to be worn untucked.
  </p>

  <h4>Colours</h4>
  <ul>
    <li>Navy Blue</li>
    <li>Black</li>
  </ul>

 
</div>`,
    sizes: [  "M", "L" ],
    colors: [
      {
        name: "Navy Blue and Black",
        key: "Navy Blue and Black",
        hex: "#1a1a1a",
        swatch: "/assets/products/men/vertical_striped_shirt.png",
        images: [
          "/assets/products/men/vertical striped shirt/img1.png",
          "/assets/products/men/vertical striped shirt/img2.png",
          "/assets/products/men/vertical striped shirt/img3.png",
          "/assets/products/men/vertical striped shirt/img4.png"
          
        ]
      }
    ]
  },
   {
    id:3,
    sizeGuide:"/sizeguide.png",
    name: "Acid wash T shirt",
    price: 2200,
    originalPrice: 2900,
    badge: "Featured",
    category: "men",
    details:`<div class="product-description">
    <h2>Bewear Acid wash T shirt</h2>
    <h4>Material</h4>
  <p>60% Cotton, 40% Polyester</p>

  <p>
    Elevate your everyday wardrobe with this heavyweight cotton t-shirt, 
    featuring a unique mineral wash finish. The specialized acid-wash 
    treatment creates a one-of-a-kind textured appearance with subtle 
    tonal variations, ensuring no two pieces are exactly alike. 
    Designed with a classic crew neck.
  </p>
 
</div>`,
    sizes: [  "M", "L" ],
    colors: [
      {
        name: "Brown and Black",
        key: "Brown and Black",
        hex: "#1a1a1a",
        swatch: "/assets/products/men/Acid wash T shirt/img.png",
        images: [
          "/assets/products/men/Acid wash T shirt/img1.png",
          
        ]
      }
    ]
  },

  {
    id: 6,

    sizeGuide:"/sizeguide.png",
    name: "The Meadow Bloom Top",
    price: 2450,
    originalPrice: 3200,
    badge: "Trending",
    category: "women",
    details:`<div class="product-description">
  <h2>Meadow Bloom Top</h2>

  <p>
    Embrace effortless romance with our <strong>Meadow Bloom Top</strong>. This charming piece 
    blends vintage-inspired <em>"cottagecore"</em> aesthetics with a modern, flirty silhouette.
  </p>

  <p>
    Crafted from a lightweight and breathable fabric with a subtle textured finish, this top 
    offers both comfort and style. It’s the perfect choice for sun-drenched afternoons, casual 
    outings, and dreamy garden dates.
  </p>

  <ul>
    <li><strong>Style:</strong> Cottagecore Inspired</li>
    <li><strong>Fabric:</strong> Lightweight & Breathable</li>
    <li><strong>Fit:</strong> Comfortable and Flowy</li>
    <li><strong>Occasion:</strong> Casual Wear / Outdoor Events</li>
    <li><strong>Available Size:</strong> Free Size</li>
  </ul>
</div>`,
    sizes: ["Free size"],
    colors: [
      {
        name: "Abstract Grid",
        key: "abstractgrid",
        hex: "#A8B8C8",
        swatch: "/assets/products/women/meadow_bloom_top/meadow_bloom_top.png",
        images: [
          "/assets/products/women/meadow_bloom_top/img1.png",
          "/assets/products/women/meadow_bloom_top/img2.png",
          "/assets/products/women/meadow_bloom_top/img3.png",
          "/assets/products/women/meadow_bloom_top/img4.png",
          "/assets/products/women/meadow_bloom_top/img5.png"
        ]
      }
    ]
  },
  {
    id: 7,
    sizeGuide:"/sizeguide.png",
    name: "Floral Watercolor Tunic",
    price: 3000,
    originalPrice: 3900,
    badge: "Trending",
    category: "women",
    details:`<div class="product-description">
  <h2>Floral Watercolor Tunic</h2>

  <p>
    Elevate your everyday wardrobe with this <strong>ethereal Floral Watercolor Tunic</strong>. 
    Crafted from a lightweight and breathable fabric, this top blends traditional silhouettes 
    with a modern, artistic aesthetic.
  </p>

  <p>
    The delicate floral print paired with a soft ivory base creates a graceful and elegant look, 
    making it an ideal choice for warm-weather styling and sophisticated casual outings.
  </p>

  <ul>
    <li><strong>Style:</strong> Artistic Floral Tunic</li>
    <li><strong>Fabric:</strong> Lightweight & Breathable</li>
    <li><strong>Fit:</strong> Plus Size – Free Size</li>
    <li><strong>Color:</strong> Soft Ivory with Watercolor Floral Print</li>
    <li><strong>Occasion:</strong> Casual / Smart Casual / Day Outings</li>
  </ul>

  <h3>Size Details (In Inches)</h3>
  <p><em>Please note that these are finished garment measurements.</em></p>

  <table border="1" cellpadding="8" cellspacing="0">
    <tr>
      <th>Measurement</th>
      <th>Size (One Size)</th>
    </tr>
    <tr>
      <td>Bust</td>
      <td>49</td>
    </tr>
    <tr>
      <td>Waist</td>
      <td>49</td>
    </tr>
    <tr>
      <td>Length</td>
      <td>29</td>
    </tr>
    <tr>
      <td>Sleeve Length</td>
      <td>16.5</td>
    </tr>
    <tr>
      <td>Shoulder</td>
      <td>17</td>
    </tr>
  </table>
</div>`,
    sizes: ["Free size"],
    colors: [
      {
        name: "Abstract Grid",
        key: "abstractgrid",
        hex: "#A8B8C8",
        swatch: "/assets/products/women/floral_watercolor_tunic/img1.png",
        images: [
          "/assets/products/women/floral_watercolor_tunic/img1.png"
        ]
      }
    ]
  },
  {
    id: 8,
    sizeGuide:"/sizeguide.png",
    name: "Botanical Print Blouse with Crochet Lace Sleeves",
    price: 2700,
    badge: "Trending",
    category: "women",
    details:`<div class="product-description">
  <h2>Botanical Floral Blouse</h2>

  <p>
    Elevate your everyday wardrobe with this <strong>feminine and airy blouse</strong>. 
    Designed with a delicate botanical illustration of wildflowers and ferns in soft 
    blues, pinks, and earthy tones, this piece brings a fresh, nature-inspired aesthetic 
    perfect for warm-weather styling.
  </p>

  <p>
    The lightweight fabric ensures comfort throughout the day, while the elegant print 
    adds a touch of sophistication to both casual and semi-formal outfits.
  </p>

  <ul>
    <li><strong>Style:</strong> Botanical Floral Blouse</li>
    <li><strong>Fabric:</strong> Lightweight & Breathable</li>
    <li><strong>Fit:</strong> Plus Size – Free Size</li>
    <li><strong>Design:</strong> Wildflowers & Ferns Print</li>
    <li><strong>Occasion:</strong> Casual / Smart Casual / Day Wear</li>
  </ul>

  <h3>Size Details (In Inches)</h3>
  <p><em>Please note that these are finished garment measurements.</em></p>

  <table border="1" cellpadding="8" cellspacing="0">
    <tr>
      <th>Measurement</th>
      <th>One Size</th>
    </tr>
    <tr>
      <td>Bust</td>
      <td>47</td>
    </tr>
    <tr>
      <td>Waist</td>
      <td>45</td>
    </tr>
    <tr>
      <td>Length</td>
      <td>29</td>
    </tr>
    <tr>
      <td>Sleeve Length</td>
      <td>14.5</td>
    </tr>
    <tr>
      <td>Shoulder</td>
      <td>18</td>
    </tr>
  </table>
</div>`,
  sizes: ["Plus Size-free  one  size"],
    colors: [
      {
        name: "Abstract Grid",
        key: "abstractgrid",
        hex: "#A8B8C8",
        swatch: "/assets/products/women/botanical_print-blouse_with_crochet_lace_sleeves/image1.png",
        images: [
         "/assets/products/women/botanical_print-blouse_with_crochet_lace_sleeves/image1.png"
          
          
          
    ]
      }
    ]
  },
  {
    id: 9,
    sizeGuide:"/sizeguide.png",
    name: "Bohemian Botanical Print Summer Blouse ",
    price: 2700,
    badge: "Trending",
    category: "women",
    details:`<div class="product-description">
  <h2>Botanical Lace Sleeve Blouse</h2>

  <p>
    Elevate your everyday wardrobe with this <strong>charming botanical print blouse</strong>. 
    Combining a fresh, nature-inspired pattern with feminine detailing, this top features 
    unique flounce sleeves adorned with intricate, scalloped lace.
  </p>

  <p>
    Its lightweight fabric and relaxed silhouette provide all-day comfort, making it an 
    ideal choice for transitional weather, office wear, or a casual weekend brunch.
  </p>

  <p><strong>Price:</strong> LKR 2700</p>

  <ul>
    <li><strong>Style:</strong> Botanical Print Blouse</li>
    <li><strong>Design:</strong> Flounce Sleeves with Scalloped Lace</li>
    <li><strong>Fabric:</strong> Lightweight & Breathable</li>
    <li><strong>Fit:</strong> Plus Size – Free Size</li>
    <li><strong>Occasion:</strong> Office Wear / Casual / Brunch</li>
  </ul>

  <h3>Size Details (In Inches)</h3>
  <p><em>Please note that these are finished garment measurements.</em></p>

  <table border="1" cellpadding="8" cellspacing="0">
    <tr>
      <th>Measurement</th>
      <th>One Size</th>
    </tr>
    <tr>
      <td>Bust</td>
      <td>47</td>
    </tr>
    <tr>
      <td>Waist</td>
      <td>46</td>
    </tr>
    <tr>
      <td>Length</td>
      <td>29</td>
    </tr>
    <tr>
      <td>Sleeve Length</td>
      <td>14.5</td>
    </tr>
    <tr>
      <td>Shoulder</td>
      <td>18</td>
    </tr>
  </table>
</div>`,
  sizes: ["Plus Size-free  one  size"],
    colors: [
      {
        name: "Abstract Grid",
        key: "abstractgrid",
        hex: "#A8B8C8",
        swatch: "/assets/products/women/bohemian_botanical_print_summer_blouse/image1.png",
        images: [
         "/assets/products/women/bohemian_botanical_print_summer_blouse/image1.png"
          
          
          
    ]
      }
    ]
  },
  {
    id: 11,
    name: "Forest Green",
    price: 690,
    badge: "New",
    category: "socks",
    details:`<div class="product-description">
  <h2>Premium Combed Cotton Crew Socks</h2>

  <p>
    Experience everyday comfort with our <strong>Premium Crew Socks</strong>, crafted from 
    <strong>100% combed cotton</strong> for superior softness and breathability. Designed 
    with modern stripe details and a comfortable ribbed cuff, these socks ensure durability 
    and all-day wearability.
  </p>

  <p>
    Perfect for daily use, these socks combine functionality with a clean, elegant style 
    that complements both casual and semi-formal outfits.
  </p>

  <h3>Available Colours</h3>
  <ul>
    <li>Forest Green</li>
    <li>Dark Grey Melange</li>
    <li>Navy Blue</li>
  </ul>

  <h3>Material</h3>
  <p>100% Combed Cotton</p>

  <h3>Features</h3>
  <ul>
    <li>100% combed cotton</li>
    <li>Soft and comfortable to wear</li>
    <li>Breathable fabric allows skin to breathe</li>
    <li>Reinforced heel and toe for durability</li>
    <li>Tieless style with an elegant design</li>
  </ul>
</div>`,
    sizes: [],
    colors: [
      {
        name: "Forest Green",
        key: "forest-green",
        hex: "#0B6623",
        swatch: "/assets/shocks/Forest green .png",
        images: [
          "/assets/shocks/Forest green .png"
        ]
      }
    ]
  },
  {
    id: 12,
    name: "Navy Blue",
    price: 720,
    badge: "Popular",
    tag: "socks",
    category: "socks",
    details:`<div class="product-description">
  <h2>Premium Combed Cotton Crew Socks</h2>

  <p>
    Experience everyday comfort with our <strong>Premium Crew Socks</strong>, crafted from 
    <strong>100% combed cotton</strong> for superior softness and breathability. Designed 
    with modern stripe details and a comfortable ribbed cuff, these socks ensure durability 
    and all-day wearability.
  </p>

  <p>
    Perfect for daily use, these socks combine functionality with a clean, elegant style 
    that complements both casual and semi-formal outfits.
  </p>

  <h3>Available Colours</h3>
  <ul>
    <li>Forest Green</li>
    <li>Dark Grey Melange</li>
    <li>Navy Blue</li>
  </ul>

  <h3>Material</h3>
  <p>100% Combed Cotton</p>

  <h3>Features</h3>
  <ul>
    <li>100% combed cotton</li>
    <li>Soft and comfortable to wear</li>
    <li>Breathable fabric allows skin to breathe</li>
    <li>Reinforced heel and toe for durability</li>
    <li>Tieless style with an elegant design</li>
  </ul>
</div>`,
    sizes: [],
    
    colors: [
      {
        name: "Navy Blue",
        key: "navy-blue",
        hex: "#1A1F71",
        swatch: "/assets/shocks/Navy Blue.png",
        images: [
          "/assets/shocks/Navy Blue.png"
        ]
      }
    ]
  },
  {
    id: 15,
    name: "Dark Grey Mélange",
    price: 740,
    badge: "Classic",
    tag: "socks",
    category: "socks",
    details:`<div class="product-description">
  <h2>Premium Combed Cotton Crew Socks</h2>

  <p>
    Experience everyday comfort with our <strong>Premium Crew Socks</strong>, crafted from 
    <strong>100% combed cotton</strong> for superior softness and breathability. Designed 
    with modern stripe details and a comfortable ribbed cuff, these socks ensure durability 
    and all-day wearability.
  </p>

  <p>
    Perfect for daily use, these socks combine functionality with a clean, elegant style 
    that complements both casual and semi-formal outfits.
  </p>

  <h3>Available Colours</h3>
  <ul>
    <li>Forest Green</li>
    <li>Dark Grey Melange</li>
    <li>Navy Blue</li>
  </ul>

  <h3>Material</h3>
  <p>100% Combed Cotton</p>

  <h3>Features</h3>
  <ul>
    <li>100% combed cotton</li>
    <li>Soft and comfortable to wear</li>
    <li>Breathable fabric allows skin to breathe</li>
    <li>Reinforced heel and toe for durability</li>
    <li>Tieless style with an elegant design</li>
  </ul>
</div>`,
    sizes: [],
    colors: [
      {
        name: "Dark Grey Mélange",
        key: "dark-grey-melange",
        hex: "#4F4F4F",
        swatch: "/assets/shocks/Dark grey mélange.png",
        images: [
          "/assets/shocks/Dark grey mélange.png"
        ]
      }
    ]
  },
  
];
      

// ═══ UTILITY FUNCTIONS ═══

/**
 * Get product by ID
 * @param {number} id - Product ID
 * @returns {object} Product object or null
 */
export function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id)) || null;
}

/**
 * Get products by category
 * @param {string} category - Category name
 * @returns {array} Array of products in category
 */
export function getProductsByCategory(category) {
  return PRODUCTS.filter(p => p.category === category);
}

/**
 * Get all available sizes
 * @returns {array} Array of all unique sizes
 */
export function getAllSizes() {
  const sizes = new Set();
  PRODUCTS.forEach(p => p.sizes.forEach(s => sizes.add(s)));
  return Array.from(sizes);
}

/**
 * Get all available colors
 * @returns {array} Array of all unique colors
 */
export function getAllColors() {
  const colors = new Set();
  PRODUCTS.forEach(p =>
    p.colors.forEach(c => colors.add(c.name))
  );
  return Array.from(colors);
}

/**
 * Get color object by key
 * @param {number} productId - Product ID
 * @param {string} colorKey - Color key (lowercase)
 * @returns {object} Color object or null
 **/
export function getProductColor(productId, colorKey) {
  const product = getProductById(productId);
  if (!product) return null;
  return product.colors.find(c => c.key === colorKey) || null;
}

/**
 * Get images for specific color
 * @param {number} productId - Product ID
 * @param {string} colorKey - Color key (lowercase)
 * @returns {array} Array of image URLs
 */
export function getColorImages(productId, colorKey) {
  const color = getProductColor(productId, colorKey);
  return color ? color.images : [];
}

/**
 * Get all colors for product
 * @param {number} productId - Product ID
 * @returns {array} Array of color objects
 */
export function getProductColors(productId) {
  const product = getProductById(productId);
  return product ? product.colors : [];
}
