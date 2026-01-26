const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: String,
  price: Number,
  inStock: Boolean,
  tags: [String]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;