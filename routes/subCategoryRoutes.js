const express = require('express');
const router = express.Router();
const { createSubCategory, getSubCategories } = require('../controllers/subCategoryController');
const auth = require('../middlewares/authMiddleware')

router.post('/', auth, createSubCategory); 
router.get('/', getSubCategories);         

module.exports = router;
