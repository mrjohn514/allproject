const express = require('express');

const router = express.Router();

//importing passport 
const passport=require('passport');


const likeController = require('../controllers/like_controller');

router.use(express.urlencoded({ extended: true }));



router.get('/toggle/',likeController.tooglelike);

module.exports=router;