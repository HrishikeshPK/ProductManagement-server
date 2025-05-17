const Product = require("../models/Product");
const SubCategory = require("../models/SubCategory");

exports.createProduct = async (req, res) => {
  console.log("Inside create product api");
  const { name, subCategoryId, variants } = req.body;

  try {
    const subCat = await SubCategory.findById(subCategoryId);
    if (!subCat) return res.status(404).json({ msg: "SubCategory not found" }); //checking for subcategory

    const existingProduct = await Product.findOne({ name: name.trim() });
    if (existingProduct) {
      return res
        .status(400)
        .json({ msg: "Product with this name already exists." }); // checking for products with same name
    }

    if (!variants || !Array.isArray(variants) || variants.length === 0) {
      return res
        .status(400)
        .json({ msg: "At least one product variant is required." }); // atleeast one variant is required to create aproduct
    }

    const product = new Product({ name, subCategory: subCategoryId, variants }); // new product created under the given sub category
    await product.save();

    res.status(201).json({ msg: "Product created", product });
  } catch (err) {
    res.status(500).json({ msg: "Error creating product", error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  console.log("Inside get products api");
  try {
    const products = await Product.find().populate("subCategory", "name"); // shows peroduct under the corresponding subcategory
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error fetching products", error: err.message });
  }
};
