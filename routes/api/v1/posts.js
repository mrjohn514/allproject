const express = require('express');

const router = express.Router();

const passport=require('passport');

const postapicntroller= require('../../../controllers/api/v1/post_api')  //requiring postapi controler 


router.get('/',postapicntroller.index);    //mapping postapicontroler to route


//we will tell what strategy is to use and dont want session cookie to be generated 
router.delete('/:id',passport.authenticate('jwt',{session:false}),postapicntroller.deletepost);

module.exports=router;