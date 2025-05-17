const User = require("../models/User");
const Product = require("../models/Product");

exports.addToWishlist = async (req, res) => {
  console.log("Inside addToWishlist api");
  try {
    const user = req.user; //from auth
    const { productId } = req.body;

    if (!productId)
      return res.status(400).json({ msg: "Product ID is required" }); //checking pId

    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ msg: "Product already in wishlist" }); //checking pId exists in wishlist
    }

    user.wishlist.push(productId); //adding new product id to the wishlist array in the user model
    await user.save();

    res.status(200).json({ msg: "Added to wishlist" });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error adding to wishlist", error: err.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  console.log("Inside removeFromWishlist api");
  try {
    const user = req.user;
    const { productId } = req.body;

    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId); //keeping the ones other than the current pId
    await user.save();

    res.status(200).json({ msg: "Removed from wishlist" });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error removing from wishlist", error: err.message });
  }
};

exports.getWishlist = async (req, res) => {
  console.log("Inside getWishlist api");
  try {
    const user = await User.findById(req.user._id).populate("wishlist");

    if (!user.wishlist || user.wishlist.length === 0) {
      return res.status(200).json({ msg: "No items in wishlist" });
    }
    res.status(200).json(user.wishlist);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error fetching wishlist", error: err.message });
  }
};
