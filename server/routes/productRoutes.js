// server/routes/productRoutes.js
const express = require('express');
const router = express.Router();
// Controller'ı içe aktaracağız
const productController = require('../controllers/productController'); 

// Tüm ürünleri çekmek için GET isteği
// Tarayıcıdan: GET /api/products
router.get('/', productController.getProducts);

// Belirli bir ürünü ID ile çekmek için GET isteği
// Tarayıcıdan: GET /api/products/123
router.get('/:id', productController.getProductById);

module.exports = router;