const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

// Create a new food
router.post('/', async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const restaurant = await Restaurant.findById(restaurantId);
    console.log(restaurant)
    if (!restaurant) {
      return res.status(404).json({ message: 'No restaurant found' })
    }
    restaurant.foodList.push(req.body);
    await restaurant.save();

    const newFood = restaurant.foodList[restaurant.foodList.length - 1];

    res.status(201).json(newFood);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});


// Get all foods
router.put('/:foodsId', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    const food = restaurant.foodList.id(req.params.foodsId);
    food.name = req.body.name;
    food.isVegan = req.body.isVegan;
    food.rating = req.body.rating;
    food.price = req.body.price;
    food.ingredients = req.body.ingredients; 
    await restaurant.save();
    res.status(200).json({ message: 'Ok' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Delete a food
router.delete('/:foodsId', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    const food = restaurant.foodList.id(req.params.foodsId);
    if (!food) {
      return res.status(404).json({message: 'Food not found in db'});
    }
    // restaurant.foodList.remove({ _id: req.params.foodsId });
    food.deleteOne();
    await restaurant.save();
    res.status(200).json({ message: 'Food deleted with okay status' });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;