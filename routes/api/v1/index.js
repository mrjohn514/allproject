//this is route index for all v1 routes  

const express = require('express');

const router = express.Router();

router.use('/posts',require('./posts'));  //requirng routes from post file

router.use('/user',require('./user'));  //requirng routes from post file


module.exports=router;