//we need our model/collection so that we can create user into it so requring our collection/model
const User=require('../models/user')

const fs=require('fs');

const path=require('path');

// module.exports.profile=function(req,res)
// {
//     console.log(req.session);
//     console.log(req.user);

//         return res.render('user_profile',{
//             title:'profile',
//     })
// }

module.exports.profile=function(req,res)
{
    console.log(req.session);
    console.log(req.user);
 /// this is only works for links we created inside friends and not when u click mrjohn aside of signout at top becaues route changed 
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:'profile',
            //now here i cant name the key user as user named key already in locals
           profile_user:user 

        })

    })
}


// module.exports.updateuser= function(req,res){
// //checking if user is authorise to make update requesting 
// //basically signed user == sending update req user 
// if(req.user.id==req.params.id)
// {
//     // req.body is same as it= {name:req.body.name,email:req.body.email}  so instead of writing this req.body
// User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
// if(err){console.log("errrrrrr");return}
// return res.redirect('/');

// })       
// }

// else{
//     return res.status(401).send('unauthorise');       //http statuus codes 
// }

//}

// ------------------------------------------asycn converted below------------------


module.exports.updateuser= async function(req,res){

if(req.user.id==req.params.id)
 {
 
    try{
   let user= await User.findById(req.params.id);
   //once teh user have been found i need to update the user  
  //but here now when i want to acces the body params i am unable to acces these directly because my form
  //is a multipart form  so my bodyparrser is unable to parse the data recived from form now the 
  //function uploadedavatar will going to help us 

  //here multer will autmatically take req and process it bas
  User.uploadedAvatar(req,res,function(err){     

  if(err){console.log("multer err",err);}


// when we reach this line file will be already setted up by multer 
// console.log(req.file);         //req contain the file from the form after processed by multer 
//   {
//     fieldname: 'avatar',
//     originalname: 'istockphoto-476085198-170667a.jpg',
//     encoding: '7bit',
//     mimetype: 'image/jpeg',
//     destination: 'D:\\COD2\\sd2\\main\\uploads\\users\\avatars',
//     filename: 'avatar-1654636121105-612506960',
//     path: 'D:\\COD2\\sd2\\main\\uploads\\users\\avatars\\avatar-1654636121105-612506960',
//     size: 18076
//   }



//also i can read my data from body params as req is proccesed by multer

  user.name=req.body.name;
  user.email=req.body.email;

 if(req.file)         //why this check because not every time user is uploading file with other detials like name etc
{

  
//handling edge case every time updating image is saving so if there previusly exist a image 
//remove that and 
//now to delete file we need file system module
//and also we need path of file so path module 
//so import both here   
if(user.avatar)                    //if there is already value in avatar field of user 
{

//her our upload folder must have one image already exists in order to work otherwise 

fs.unlinkSync(path.join(__dirname,'..',user.avatar))   // ->>resolved to usercontroller two step up we reach parallel to uploads heriachy then user.avatar =uploads/users/avatar/image

}    


//this is saving the path of uploaded file in the avtar filed fo document user 
user.avatar = User.avatarPath + '/' + req.file.filename;
}

user.save();

return res.redirect('back');

  })


    }catch(err){
        req.flash('error',err);
    return res.redirect('back');  

    }
 

 }

else{
    req.flash('error','unauthorise');
    return res.status(401).send('unauthorise');       //http statuus codes 
}

}








module.exports.signup=function(req,res){

    //checking if user is authenitcaed/signedin then redirect to profile
if(req.isAuthenticated()){
return res.redirect('/user/userprofile');
}
return res.render('user_signup',{
    title:"codeial signup",
    layout:  false
})
}


module.exports.signin=function(req,res)
{

     //checking if user is authenitcaed/signedin then redirect to profile
    if(req.isAuthenticated()){
    return res.redirect('/user/userprofile');
    }
    return res.render("user_signin",{
        title:"codeial | signin",
        layout:  false
    })
}



module.exports.deletesession=function(req,res)
{
req.logout();         //this is definde in passport which will delete the req.sesseion.passport.user and hence singed out
req.flash('success','loged out succesfully'); 
return res.redirect('/');

}








module.exports.createuser=function(req,res)
{
    //if password and confirm password of form does not match redirect back
    if(req.body.password!=req.body.confirmpassword)
    {
    res.redirect('back');    
    }
  
//finding the db with email enterd in form if we  find the same mail in db then we will redirect back
//if not we will create a user with that info in db

 User.findOne({email:req.body.email},function(err,user){
  
    if(err){console.log("error in findin users"); return}

    if(!user){

        //created user with info enterd through signup page
        User.create(req.body,function(err,user){
            if(err){console.log("error in creating users"); return}

            return res.redirect('/user/signin');
        });
    }

   //if email mathced in db we will redirect back 
    else
    {
    res.redirect('back');
    }

 });




}

//sign in and create sesion for user

//when passport use fxn localstrategy to authenticate the user the control comes over here  
module.exports.createsession=function(req,res)
{
    console.log("createseiion",req.body);
    // The method req.flash(type, message) sets the value of new flash mesage provided by modeule we insatlled
  req.flash('success','loged in succesfully');       //we know req is an object and we are seting flash fucntion inside req object 

    return res.redirect('/');
}