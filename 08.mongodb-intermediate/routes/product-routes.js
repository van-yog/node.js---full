const express = require('express');
const router = express.Router();
const { insertSampleProducts } = require('../controllers/product-controller');

router.post('/insert-sample-products', insertSampleProducts);

module.exports = router;