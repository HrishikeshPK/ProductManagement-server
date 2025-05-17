const express = require('express');
const router = express.Router();
const { createProduct, getProducts,updateProduct,deleteProduct,getAllProducts } = require('../controllers/productController');
const auth = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/admin');


router.post('/', auth,adminOnly, createProduct); // only authorised users can access
router.put("/:id", auth, adminOnly, updateProduct);// only authorised users can access
router.delete("/:id", auth, adminOnly, deleteProduct);// only authorised users can access
        // not authorised
router.get("/", getAllProducts);

module.exports = router;
