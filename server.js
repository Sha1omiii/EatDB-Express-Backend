const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const signinJWTRouter = require('./controllers/signin-jwt');
const userRouter = require('./controllers/users')
const profilesRouter = require('./controllers/profiles');
const restaurantRouter = require('./controllers/restaurants');
const foodRouter = require('./controllers/foods');

app.use(express.json());
app.use(cors());

app.use('/signin-jwt', signinJWTRouter);
app.use('/users', userRouter)
app.use('/profiles', profilesRouter);
app.use('/restaurants', restaurantRouter);

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});


app.listen(3000, () => {
  console.log('The express app is ready!');
});
