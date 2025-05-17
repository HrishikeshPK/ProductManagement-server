const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");

const {
  addToWishlist,
  removeFromWishlist,
  getWishlist
} = require("../controllers/wishlistController");

router.post("/add", auth, addToWishlist);
router.post("/remove", auth, removeFromWishlist);
router.get("/", auth, getWishlist);

module.exports = router;