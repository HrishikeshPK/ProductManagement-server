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

exports.getAllProducts = async (req, res) => {
  console.log("Inside getallproducts api")
  try {
    const searchQuery = req.query.search || "";
    const subCategory = req.query.subCategory || "";

    let filter = {
      name: { $regex: searchQuery, $options: "i" }
    };

    if (subCategory) {
      filter.subCategory = subCategory;
    }

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching products", error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { name, subCategoryId, variants } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    if (name && name !== product.name) {
      const existing = await Product.findOne({ name: name.trim() }); // Check for duplicate name (if name is changing)
      if (existing)
        return res
          .status(400)
          .json({ msg: "Product with this name already exists" });
      product.name = name.trim();
    }

    if (subCategoryId) product.subCategory = subCategoryId;

    if (variants && (!Array.isArray(variants) || variants.length === 0)) {
      return res.status(400).json({ msg: "At least one variant is required." }); //  validate variants on update
    }

    if (variants) product.variants = variants;

    await product.save();
    res.json({ msg: "Product updated", product });
  } catch (err) {
    res.status(500).json({ msg: "Error updating product", error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    res.json({ msg: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting product", error: err.message });
  }
};
