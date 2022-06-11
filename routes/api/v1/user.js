
const express = require('express');

const router = express.Router();

const userApicontroler=require('../../../controllers/api/v1/user_api');

router.use(express.urlencoded({ extended: true }));

router.post('/create-session',userApicontroler.createsession);  //mapping conrtoler to route



module.exports=router;