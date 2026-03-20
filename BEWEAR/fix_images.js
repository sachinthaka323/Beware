const fs = require('fs');

const path = 'src/data/products.js';
let content = fs.readFileSync(path, 'utf8');

// For each product, we want to replace the image array and swatch with the actual images the user dumped!
// Using Regex matching on id: 1 ... images: [...] to be safe.
const newImages = {
    1: {
        swatch: "/src/assets/products/product-1/image.png",
        images: [
            "/src/assets/products/product-1/image.png",
            "/src/assets/products/product-1/image1.jpg",
            "/src/assets/products/product-1/image2.jpg",
            "/src/assets/products/product-1/image3.jpg"
        ]
    },
    2: {
        swatch: "/src/assets/products/product-2/13.jpg",
        images: [
            "/src/assets/products/product-2/13.jpg",
            "/src/assets/products/product-2/14.jpg",
            "/src/assets/products/product-2/15.jpg",
            "/src/assets/products/product-2/16.jpg"
        ]
    },
    3: {
        swatch: "/src/assets/products/product-3/1.jpg",
        images: [
            "/src/assets/products/product-3/1.jpg",
            "/src/assets/products/product-3/2.jpg",
            "/src/assets/products/product-3/3.jpg",
            "/src/assets/products/product-3/4.jpg"
        ]
    },
    4: {
        swatch: "/src/assets/products/product-4/8.jpg",
        images: [
            "/src/assets/products/product-4/8.jpg",
            "/src/assets/products/product-4/9.jpg",
            "/src/assets/products/product-4/10.jpg",
            "/src/assets/products/product-4/8.jpg"
        ]
    },
    5: {
        swatch: "/src/assets/products/5.jpg",
        images: [
            "/src/assets/products/5.jpg",
            "/src/assets/products/6.jpg",
            "/src/assets/products/7.jpg",
            "/src/assets/products/5.jpg"
        ]
    },
    6: {
        swatch: "/src/assets/products/11.jpg",
        images: [
            "/src/assets/products/11.jpg",
            "/src/assets/products/12.jpg",
            "/src/assets/products/716b0491-301a-4cc4-91d9-fdb4ca5f4583.jpg",
            "/src/assets/products/1286200d-554a-4dea-b630-a3cc923d74fd.jpg"
        ]
    }
};

let lines = content.split('\n');
let currentId = null;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('id: ')) {
        let match = lines[i].match(/id:\s*(\d+)/);
        if (match) currentId = parseInt(match[1]);
    }
    if (currentId && newImages[currentId]) {
        if (lines[i].includes('swatch:')) {
            lines[i] = lines[i].replace(/swatch:\s*".*"/, `swatch: "${newImages[currentId].swatch}"`);
        }
        if (lines[i].includes('images: [')) {
            // Replace the array lines
            lines[i] = `        images: [` + newImages[currentId].images.map(img => `"${img}"`).join(', ') + `]`;
            // Delete the next 4/5 lines since the old array spanned multiple lines
            let j = 1;
            while (i + j < lines.length && !lines[i + j].includes('}')) {
                j++;
            }
            lines.splice(i + 1, j - 1);
            // currentId is still active, but we can clear it if we assume 1 color per product or just leave it for all colors
        }
    }
}

fs.writeFileSync(path, lines.join('\n'));
console.log('Successfully mapped specific user images to products!');
