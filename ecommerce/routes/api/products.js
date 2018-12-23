const express = require('express');
const router = express.Router();
const ProductsServices = require('../../services/products');

const productService = new ProductsServices();

router.get('/', async function (req, res, next) {
  const { tags } = req.query;
  console.log('req', req.query);

  try {
    const products = await productService.getProducts({ tags });

    res.status(200).json({
      data: products,
      message: 'products listed'
    });
  } catch(err) {
    next(err);
  }
});

router.get('/:productId', async function (req, res, next) {
  const { productId } = req.params;

  try {
    const product = await productService.getProducts({ productId });

    res.status(200).json({
      data: product,
      message: 'product retrieved'
    });
  } catch (err) {
    next(err)
  }
});

router.post('/', async function (req, res, next) {
  const { body: product } = req;
  
  try {
    const productCreated = await productService.getProducts({ product });
  
    res.status(201).json({
      data: productCreated,
      message: 'products listed'
    });
  } catch(err) {
    next(err);
  }
});

router.put('/:productId', async function (req, res, next) {
  const { productId } = req.params;
  const { body: product } = req;
  
  try {
    const productUpdated = await productService.getProducts({ productId, product });
  
    res.status(200).json({
      data: productUpdated,
      message: 'products updated'
    });
  } catch(err) {
    next(err);
  }
});

router.delete('/:productId', async function (req, res, next) {
  const { productId } = req.params;
  
  try {
    const productDeleted = await productService.deleteProduct({ productId })
    res.status(200).json({
      data: productDeleted,
      message: 'product deleted'
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;