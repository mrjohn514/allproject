//requiring passport library
const passport=require('passport');

//requiring the strategy property from passport local libraray
//This module lets you authenticate using a username and password in your Node.js applications.
// By plugging into Passport, local authentication can be easily and
// unobtrusively integrated into any application
const LocalStrategy=require('passport-local').Strategy;


const User=require('../models/user')


////////////////////////authentication using passport/////////////////

//we need to tell passport to  use the local strategy we created
passport.use(new LocalStrategy({
usernameField:'email'                //how do i detect which is the user //so usernamefield is email //this is syntax
                               //usernamefeild for user in schema is email //the fiel  which is uniqe which identify  user maped against usernamefield


//whenever localstrategy is called then emial and password is passed on and done fxn is passed on 
//with done fxn                               
},function(email,password,done){ 
    //find a user and establish the identity    

User.findOne({email:email},function(err,user){       //findone({this email from User/collection, this is passed email in function line 23})
if(err){console.log("error in finding user"); 
return done(err);             
//done(error,authentication done or not) //as js fxn can receive less arguments also so writen like this
//done is callbak fxn reporting to passport
}                               

if(!user||user.password!=password){
    console.log("invalid username password")
    return done(null,false);          //done(erro=null,authenticated=false)
}

return done(null,user);
//this is callback funtion u can name it anything/ 
  //upper we are sending false because user is not  finding and when there is  user then we send the needed value

})
}

));

//serializing the user to decide which key is to be kept in cookies
//this function basically tells which field to put  in cookies and not all fields as we are doing in crete sesstion res.cookies('user_id',user.id);
passport.serializeUser(function(user,done){
done(null,user.id)               
  
})


//deserialising the user from the key in cookie 
//similar to  what we have done in ;profile controler we take cookie data used that to find which uesr is signed in

passport.deserializeUser(function(id,done)
{
User.findById(id,function(err,user){
    if(err){console.log("error finding ueer");
   return done(err);
}
return done(null,user);

})

});


///////////////////////similar thing we doing in profile controler


///check if user is authenticated to view that page //basically user is signed in or not
passport.checkAuthentication =function(req,res,next)
{
 
 //how do i find req localhost:8000/user/userprofile is authenticated or not so passport aded a method in req isAuthenticated   

 //if user is signed in/authenticated let him view the page/pass him to that page
 if(req.isAuthenticated()){
     return next();    //if user is signed in then pass on the req to function (controller action)    
 }

//if user is not authenticated/signed in 
return res.redirect('/user/signin');

}


passport.setAuthenticatedUser =function(req,res,next)
{
 //req.user contain the cureent signed user form session cookie and we are sending this to locals to use in views
 //similar we are doing in profile controler vuser:user   
    if(req.isAuthenticated())   //isAuthenticated is basically checking does req.session.passport.user is null or not
    {
    res.locals.user=req.user  //whenever a  user is signed in that user info is available in req.user 
   }

    return next();
}


//my way to restrict render signin and signup again 
// passport.checkAuthentication2 =function(req,res,next)
// {
//  if(req.isAuthenticated())
//  {
//     return res.redirect('/user/userprofile');
//  } 

//  return next();
// }




module.exports=passport;





///ho ye rha h hmne passoprt libraray ka instance const passport me le liya h or hmne is library ke fxns 
//jo ki const passport ke dwara alter kr rhe hn or fir hm is instance ko export kr rhe hn 
//jb ye khin require hoga to passport libraray ke ander hmare sereilzer and deserializer 
//hamre defined honge  