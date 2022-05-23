const express = require('express');

const router = express.Router();

//importing passport 
const passport=require('passport');


const postController = require('../controllers/post_controller');

router.use(express.urlencoded({ extended: true }));

router.post('/createpost',passport.checkAuthentication,postController.createpost);

module.exports=router;