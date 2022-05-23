const express = require('express');

// Setup router
const router = express.Router();

// Setting path for controller function
const homeController = require('../controllers/home_controller');

console.log('router loaded');

// Setting controller function to a route
router.get('/', homeController.home);


router.use('/user',require('./user'));


router.use('/post',require('./post'));

// Exporting router
module.exports = router;