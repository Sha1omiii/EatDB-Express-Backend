const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
   name: {
    type:String,
    required: true,
   },
   ingredients: [String],
   isVegan: Boolean,
   rating: {
     type: Number, 
     min: 0,
     max: 5
   },
   price: {
     type: String,
     required: true
   },
 }); 

module.exports = foodSchema