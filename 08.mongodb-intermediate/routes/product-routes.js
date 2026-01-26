const express = require('express');
const router = express.Router();
const { insertSampleProducts, getProducts, getProductStats } = require('../controllers/product-controller');

router.post('/insert-sample-products', insertSampleProducts);
router.get('/get-products', getProducts);
router.get('/get-product-stats', getProductStats);

module.exports = router;