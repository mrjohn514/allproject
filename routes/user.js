const express = require('express');

const router = express.Router();

//importing passport 
const passport=require('passport');

const userController = require('../controllers/user_controller');

router.use(express.urlencoded({ extended: true }));



//using passport middleware to authenticate/ basically checking user is signed in or not using the fucntin created
//in pasportlocalstrategy checkauthencation

//before going to this route this checkautehnctication called if ok then next in function 
//called to controler of profile 
router.get('/userprofile',passport.checkAuthentication,userController.profile);


router.get('/signup',userController.signup)



router.get('/signin',userController.signin);


router.get('/signout',userController.deletesession);

// as when someone click submit btn iin form of signup page then  as method is post and action associated 
//with that form is /user/create_user 
//so we mapped this route and added the associated controler  with it
router.post('/create_user',userController.createuser);






//use passport as middleware to authenicate
//basically when  req come to this route first passport will authenticate and 
//if authencation is done then usercontroller.createsession called
//other wsie failureredirect to signin again

router.post('/create_session',passport.authenticate(
'local',                                               //local strategy
{failureRedirect:'/user/signin'}

),userController.createsession)

module.exports=router;