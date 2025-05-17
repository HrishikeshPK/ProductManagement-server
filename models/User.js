const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    // FOR ADMIN
    type: Boolean,
    default: false,
  },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("User", userSchema);
