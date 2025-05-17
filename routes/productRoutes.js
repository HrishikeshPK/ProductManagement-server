const express = require('express');
const router = express.Router();
const { createProduct, getProducts,updateProduct,deleteProduct } = require('../controllers/productController');
const auth = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/admin');


router.post('/', auth,adminOnly, createProduct); // only authorised users can access
router.put("/:id", auth, adminOnly, updateProduct);// only authorised users can access
router.delete("/:id", auth, adminOnly, deleteProduct);// only authorised users can access
router.get('/', getProducts);         // not authorised

module.exports = router;
