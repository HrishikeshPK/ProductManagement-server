const express = require('express');
const router = express.Router();
const { createProduct, getProducts } = require('../controllers/productController');
const auth = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/admin');

router.post('/', auth,adminOnly, createProduct); // only authorised users can access
router.get('/', getProducts);         // not authorised

module.exports = router;
