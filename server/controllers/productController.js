// server/controllers/productController.js

// ===============================================
// REALISTIC FASHION E-COMMERCE PRODUCTS (12 ITEMS)
// ===============================================

const sampleProducts = [

  // 1 — Leather Jacket
  {
    id: 1,
    name: "Leather Jacket",
    price: 11999,
    description: "Modern fit premium leather jacket.",
    gender: "womens",
    category: "coats",
    image: "/images/ceket1.jpg",
    hoverImage: "/images/ceket2.jpg",
    season: "fall",
    stock: 12,
    premium: true
  },

  // 2 — Leather Bag
  {
    id: 2,
    name: "Leather Bag",
    price: 8999,
    description: "Premium handmade leather shoulder bag.",
    gender: "womens",
    category: "bags",
    image: "/images/bag1.jpg",
    hoverImage: "/images/bag2.jpg",
    season: "fall",
    stock: 8,
    premium: true
  },

  // 3 — Oversized Hoodie
  {
    id: 3,
    name: "Oversized Hoodie",
    price: 2499,
    description: "Soft oversized hoodie with minimalist embroidery.",
    gender: "womens",
    category: "hoodies",
    image: "/images/hoodie1.jpg",
    hoverImage: "/images/hoodie2.jpg",
    season: "fall",
    stock: 20,
    premium: false
  },

  // 4 — Winter Coat
  {
    id: 4,
    name: "Winter Coat",
    price: 5499,
    description: "Warm and clean winter coat.",
    gender: "mens",
    category: "coats",
    image: "/images/mont1.jpg",
    hoverImage: "/images/mont1.jpg",
    season: "fall",
    stock: 15,
    premium: true
  },

  // 5 — Streetwear Printed Jeans
  {
    id: 5,
    name: "Streetwear Printed Jeans",
    price: 1799,
    description: "Loose-fit denim jeans with bold streetwear graphics.",
    gender: "mens",
    category: "jeans",
    image: "/images/jean1.jpg",
    hoverImage: "/images/jean1.jpg",
    season: "none",
    stock: 30,
    premium: false
  },

  // 6 — Everyday Coat
  {
    id: 6,
    name: "Everyday Coat",
    price: 1899,
    description: "Comfortable coat for everyday wear.",
    gender: "womens",
    category: "coats",
    image: "/images/cekett1.jpg",
    hoverImage: "/images/cekett1.jpg",
    season: "none",
    stock: 16,
    premium: false
  },

  // 7 — Classic Shirt
  {
    id: 7,
    name: "Classic Shirt",
    price: 1199,
    description: "Classic cotton shirt with a clean look.",
    gender: "womens",
    category: "tops",
    image: "/images/bluz1.jpg",
    hoverImage: "/images/bluz1.jpg",
    season: "none",
    stock: 22,
    premium: false
  },

  // 8 — Platform Sneakers
  {
    id: 8,
    name: "Platform Sneakers",
    price: 2999,
    description: "Everyday platform sneakers with modern style.",
    gender: "mens",
    category: "sneakers",
    image: "/images/sneaker1.jpg",
    hoverImage: "/images/sneaker1.jpg",
    season: "none",
    stock: 14,
    premium: false
  },

  // 9 — High Heels
  {
    id: 9,
    name: "High Heels",
    price: 1699,
    description: "Elegant high heels for special occasions.",
    gender: "womens",
    category: "heels",
    image: "/images/topuklu1.jpg",
    hoverImage: "/images/topuklu1.jpg",
    season: "fall",
    stock: 18,
    premium: false
  },

  // 10 — Basic Sweatshirt
  {
    id: 10,
    name: "Basic Sweatshirt",
    price: 1699,
    description: "Comfortable cotton sweatshirt designed for everyday wear.",
    gender: "mens",
    category: "sweatshirts",
    image: "/images/sweatshirt1.jpg",
    hoverImage: "/images/sweatshirt1.jpg",
    season: "fall",
    stock: 45,
    premium: false
  },

  // 11 — Oversized Graphic T-Shirt
  {
    id: 11,
    name: "Oversized Graphic T-Shirt",
    price: 999,
    description: "Oversized cotton t-shirt with bold streetwear graphic print.",
    gender: "mens",
    category: "tshirts",
    image: "/images/tshirt1.jpg",
    hoverImage: "/images/tshirt1.jpg",
    season: "none",
    stock: 35,
    premium: false
  },

  // 12 — Leather Wallet
  {
    id: 12,
    name: "Leather Wallet",
    price: 1499,
    description: "Compact leather wallet with multiple card slots.",
    gender: "womens",
    category: "wallets",
    image: "/images/cüzdan1.jpg",
    hoverImage: "/images/cüzdan1.jpg",
    season: "none",
    stock: 20,
    premium: true
  }

];

// ============================================================
// ROUTES
// ============================================================

exports.getProducts = (req, res) => {
  res.json(sampleProducts);
};

exports.getProductById = (req, res) => {
  const productId = parseInt(req.params.id);
  const product = sampleProducts.find(p => p.id === productId);

  if (product) res.json(product);
  else res.status(404).json({ message: "Product not found" });
};
