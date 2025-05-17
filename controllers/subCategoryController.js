const SubCategory = require("../models/SubCategory");
const Category = require("../models/Category");

exports.createSubCategory = async (req, res) => {
  console.log("Inside create subCategoires");
  const { name, categoryId } = req.body;

  try {
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ msg: "Category not found" });

    const existing = await SubCategory.findOne({ name, category: categoryId }); // Check if subcategory already exists for the same category
    if (existing) {
      return res
        .status(400)
        .json({ msg: "Sub-category already exists under this category" });
    }

    const subCategory = new SubCategory({ name, category: categoryId }); //new subCategory created
    await subCategory.save();

    res.status(201).json({ msg: "Sub-category created", subCategory });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error creating sub-category", error: err.message });
  }
};

exports.getSubCategories = async (req, res) => {
  console.log("Inside get subCategoires");
  try {
    const subCategories = await SubCategory.find().populate("category", "name");
    res.json(subCategories);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error fetching sub-categories", error: err.message });
  }
};
