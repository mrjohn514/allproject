const passport=require('passport');

//getting googleouath2 strategy  
const googlestrategy =require('passport-google-oauth').OAuth2Strategy;


const env=require('./environment');

//getting crypto library as we know if user is not present we will save user in db 
//but there password field will get empty and we know we have made this field required 
//in model so to fill this passwrod field with random passwrod we need library crypto

const crypto=require('crypto');

//also need user model
const User=require('../models/user');

//telliin passport to use a new strategy for googel login
//creating new googelstrategy object and passing options 
passport.use(new googlestrategy({

clientID:env.google_clientID,
clientSecret:env.google_clientSecret,

//this  is the url we set while settin credentials of our project in goole site
callbackURL:env.google_callbackURL
},
//callback function taking accestoken  generated by google and sent to us in header as we are doing in jwt
//also a refresh token if accestoken expires we use refresh token to get new acces token
//user info(data)proifle
//and final funtion whichis going to takin callback from this function
function(accessToken,refreshToken,profile,done){


   console.log("hey we reach here");


    //google gives us user info in profile and hrere email field is array fo emails usre have
User.findOne({email:profile.emails[0].value}).exec(function(err,user){

if(err){console.log("erronin google strategy",err); reutrn }

console.log("profile started");
console.log(profile);
console.log("profile endesd");

//if we find user in db we pass user to done
 if(user)
 return done(null,user);

 //if user not fonund in db of codeila we save user (singup user received)
else
{
User.create({

name:profile.displayName,
email:profile.emails[0].value,
password:crypto.randomBytes(20).toString('hex')     //generaing random password for user to fill passwrod field


},function(err,user){

if(err){console.log("erron in creating user",err);return}

return done(null,user);


})
}


})     

}



));


module.exports=passport;