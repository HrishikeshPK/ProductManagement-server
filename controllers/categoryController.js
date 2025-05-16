const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const exists = await Category.findOne({ name });
    if (exists) return res.status(400).json({ msg: "Category already exists" });

    const category = new Category({ name });
    await category.save();
    res.status(201).json({ msg: "Category created", category });
  } catch (err) {
    res.status(500).json({ msg: "Error creating category", error: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching categories", error: err.message });
  }
};
