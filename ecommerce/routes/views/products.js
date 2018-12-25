const express = require('express');
const router = express.Router();
const ProductsServices = require('../../services/products');

const productServices = new ProductsServices();

router.get('/', async function (req, res, next) {
  const { tags } = req.query;
  
  try {
    // throw new Error('This is an error');
    const products = await productServices.getProducts({ tags });
    res.render('products', { products });
  } catch(err) {
    next(err);
  }
});

module.exports = router;
