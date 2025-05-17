const mongoose = require('mongoose');



const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,                      
    ref: 'SubCategory',                    // product linked to sub category
    required: true
  },
  variants: [              // variants array for multiple variants
    {
      ram: String,
      price: Number,
      qty: Number
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
