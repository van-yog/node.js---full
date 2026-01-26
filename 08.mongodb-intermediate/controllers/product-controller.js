const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

const getProductStats = async (req, res) => {
  try {

    const stats = await Product.aggregate([
      // stage 1: match the products that are in stock and have a price greater than 200
      {
        $match: {
          inStock: true,
          price: { $gte: 100 }
        }
      },
      {
        $group: {
          _id: '$category',
          averagePrice: { $avg: '$price' },
          count: { $sum: 1 }
        }
      }
    ])

    res.status(200).json({ stats })

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}



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
  insertSampleProducts,
  getProducts,
  getProductStats
}