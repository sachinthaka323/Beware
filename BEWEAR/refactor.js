const fs = require('fs');

const path = 'src/data/products.js';
let content = fs.readFileSync(path, 'utf8');

// The file looks like:
// /** ... */
// // IMPORT LOCAL IMAGES
// ... variables ...
// export const PRODUCTS = [ ... ]
// // UTILITY ...

// Let's extract the array block manually and parse it using eval (since there are variables inside that will throw ReferenceError)
// Wait, eval will throw reference errors. 
// We will use regex to replace images: [...] with dynamic strings based on product ID and color key!

// Replace images: [vars] with template strings
let modified = content;

modified = modified.replace(/images:\s*\[[^\]]+\]/g, (match, offset, string) => {
    // We can't easily know product ID and color key just from this line.
    return match;
});

// Since regex is tricky to capture the context (product ID and color key), let's just do it directly manipulating AST, or just replacing the entire PRODUCTS block again with the clean direct strings since there are only 6 products now!
