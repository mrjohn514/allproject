//step 1 import passport
const passport = require("passport")

//requiring strateguy using
const jwtStrategy=require('passport-jwt').Strategy;

//module help us to extract jwt from header
const Extractjwt=require('passport-jwt').ExtractJwt;


//since we are going to use user model for authenctication 
const User=require('../models/user'); 


//while defineing strategy i will have some options
//first how do i encrypt 

let opts={
 //now header is  list ofkeys header has key called 
 //authorisation that is also a list ofkey that can have key called bearer now that bearer will have
//jwt token   
    jwtFromRequest:Extractjwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'codeial'   
    
}



passport.use(new jwtStrategy(opts,function(jwtpayload,done){   //callback funtion which reads data from jwt payload     


//finding user by id and sending throuh callbakc funciton done 
//hre we are not mathcig user password or email like in local strategy 
//because here we are doing/mathcing jwt thing 
//once user jwt is generated this  is used after that with req to authenitcate the jwt 

//previoulsy we are mathcing email and passwrod and fetching user and set it in cookiew
//haere user is already present in jwt and we are fetching id from payload checking if user is
//there or not in db with every req


User.findById(jwtpayload._id,function(err,user){           

if(err){console.log("errir ifnding user");return}

if(user)
{ 
    return done(null,user);
}
else{
    return done(null,false);
}

})


}))


module.exports=passport;