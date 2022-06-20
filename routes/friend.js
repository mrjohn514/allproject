const express = require('express');

const router = express.Router();



const friendController = require('../controllers/friend_controller');

router.use(express.urlencoded({ extended: true }));



router.get('/createfriend/:id',friendController.createfriend);

router.get('/deletefriend/:id',friendController.deletefriend);

module.exports=router;