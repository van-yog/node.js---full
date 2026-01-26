const Product = require('../models/Product');

const insertSampleProducts = async (req, res) => {
  try {
    const products = [
      {
        name: 'Product 1',
        category: 'Category 1',
        price: 100,
        inStock: true,
        tags: ['tag1', 'tag2']
      },
      {
        name: 'Product 2',
        category: 'Category 2',
        price: 200,
        inStock: false,
        tags: ['tag3', 'tag4']
      },
      {
        name: 'Product 3',
        category: 'Category 3',
        price: 300,
        inStock: true,
        tags: ['tag5', 'tag6']
      },
      {
        name: 'Product 4',
        category: 'Category 4',
        price: 400,
        inStock: false,
        tags: ['tag7', 'tag8']
      }
    ];

    const result = await Product.insertMany(products);
    res.status(201).json({
      success: true,
      message: 'Products inserted successfully',
      data: result
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  insertSampleProducts
}