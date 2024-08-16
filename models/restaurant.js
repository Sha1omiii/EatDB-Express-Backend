const mongoose = require("mongoose");
const foodSchema = require('./food');

const restaurantSchema = new mongoose.Schema({
   name: {
    type:String,
    required: true,
   },
   category: String,
   rating: Number,
   review:String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  foodList:[foodSchema]
});


module.exports = mongoose.model('Restaurant', restaurantSchema);
