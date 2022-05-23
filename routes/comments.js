const express = require('express');

const router = express.Router();

//importing passport 
const passport=require('passport');


const commentController = require('../controllers/comment_controller');

router.use(express.urlencoded({ extended: true }));

router.post('/createcomment',passport.checkAuthentication,commentController.createcomment);



module.exports=router;