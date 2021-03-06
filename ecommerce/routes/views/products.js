const express = require('express');
const router = express.Router();
const ProductsServices = require('../../services/products');
const { config } = require('../../config');

const cacheResponse = require('../../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../../utils/time');

const productServices = new ProductsServices();

router.get('/', async function (req, res, next) {
  cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
  const { tags } = req.query;
  
  try {
    // throw new Error('This is an error');
    const products = await productServices.getProducts({ tags });
    res.render('products', { products, dev: config.dev });
  } catch(err) {
    next(err);
  }
});

module.exports = router;
