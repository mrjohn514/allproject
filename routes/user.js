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
router.get('/userprofile/:id',passport.checkAuthentication,userController.profile);

router.post('/updateprofile/:id',passport.checkAuthentication,userController.updateuser);


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




//first route which we hit signin using google button redirects to google
//google will automatically recoganise when req came fromthis url 

//authencate(which strategy using ,scope)
//scope is the info which we are looking to fetch

//here we want to fetch profile  and email is not the part of profile so if i want email we need permsion

//we can put this route to anything(/vishal/google) as when we click req is made to this route then automatcaly reaches 
//that user google accounts page
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))



//second route which google will hit and pass the data onto this 
//it is the callback url we mention in credentials  in google 
//after authenticate redirect to homepage using createsesion controller


// When a request to this route is processed, the strategy will authenticate the fact
//  that the user signed in with Google and obtain that user's profile information.
//   If authentication succeeds, passport.authenticate() middleware calls the next function in the stack.
//    In this example, the function is redirecting the authenticated user to the home page.

//if it authentication fails then redirect to singin page

router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/user/signin'}),userController.createsession);







module.exports=router;