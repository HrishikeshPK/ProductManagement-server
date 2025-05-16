const express = require('express');
const router = express.Router();
const { createCategory, getCategories } = require('../controllers/categoryController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, createCategory);     
router.get('/', getCategories);         

module.exports = router;
