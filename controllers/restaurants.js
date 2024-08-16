const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Restaurant = require('../models/restaurant');
const router = express.Router();
const foodRouter = require('./foods.js');

router.use('/:restaurantId/foods', foodRouter);

router.get('/preview', async (req, res) => {
  try {
    const previewRestaurants = await Restaurant.find().limit(6) // geting just the first 6 restaurants from db
    res.json(previewRestaurants);
  } catch (e) {
    res.status(500).json({ message: 'Error fetching restaurants' });
  }
})

router.use(verifyToken);

// Create a new restaurant
router.post('/', async (req, res) => {
  try {
    console.log('Request body:', req.body);
    req.body.author = req.user._id;
    const restaurant = await Restaurant.create(req.body);
    console.log('Created restaurant:', restaurant);
    res.status(201).json(restaurant);
  } catch (error) {
    console.error('Error creating restaurant:', error);
    res.status(500).json({ message: error.message });
  }
});


// Get all restaurants

router.get('/', async (req, res) => {
  try {
    // we will only use the author._id in the front end
    const restaurants = await Restaurant.find({}).populate('author').sort({ createdAt: 'desc' });
    console.log('Query results:', restaurants);
    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json(error);
  }
});

// Get a single restaurant by ID
router.get('/:restaurantId', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId).populate('author');
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update a restaurant
router.put('/:restaurantId', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    console.log(restaurant)
    if (!restaurant.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.restaurantId,
      req.body,
      { new: true }
    );
    updatedRestaurant._doc.author = req.user;
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});

// Delete a restaurant
router.delete('/:restaurantId', async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.restaurantId);
    console.log(deletedRestaurant)
      res.status(200).json({ message: 'Restaurant deleted successfully', deletedRestaurant });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});


module.exports = router;