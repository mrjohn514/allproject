const User=require('../models/user')
const Like=require('../models/likes');
const Comment=require('../models/comment')
const Post=require('../models/post');



module.exports.tooglelike= async function(req,res){

console.log("reaches likecontroller")

try {
    
    //why iam taking this variable because when i send json data to ajax then there should be something which
    //tell me like is incremented or delted means (if already like then it shuold get deleted and decr count oflikes)
    //(if no liked already then like created and count of likes incremented ) 
  var deleted=false;             

  let likeable;

//now when req reach here first thing i have to find wheaterh likeable object type is post or comment
//our route looks like this   (like/togglelike?id=abbd&&type=Post)

//this likeable will tell us type it is post or comment for which like is made 
if(req.query.type=='Post') 
{
 likeable= await Post.findById(req.query.id);
}
else
{
 likeable=await Comment.findById(req.query.id);
}



//geting the existing like from Like Collection to check if already exists in collection or not
let existinglike=await Like.findOne({

likeable:req.query.id,                   //likable field haveing this id in like collction
onModel:req.query.type,                   //onModel field haveing this type in like collections
user:req.user._id                        //appended in req object through passport
})


//checking if existeinglike exists or not 

if(existinglike)
{
//if already like exists we have to delte the like from collection and so also from likeable(post/comment) like array field

//deleting from array of like of likeable
likeable.likes.pull(existinglike._id);
likeable.save();          //saving changes in document

//removing from like collection 
existinglike.remove();

//also updating delte to true as like is deleted and this true indicates that we have to decrement
deleted=true;

}

else
{
//same like delteing two things have to do if like not exists then create like in like collection and
//also adding to likavel aray of likes 

let newlike= await Like.create({
  
likeable:req.query.id,            //this likeable is field of like collection not above let likeable this let likabel is holdin either post or commeent
onModel:req.query.type,
user:req.user._id

})

//adding id of like created   to the likeable(post/comment) array of likes 
likeable.likes.push(newlike._id);
likeable.save();
}


//since everything done succesfully returning json data to ajax req made 


 console.log("enterd in xhr")

 if(req.xhr)                      
 {
 
 return res.status(200).json({            
 data:{
 deleted:deleted                              
 },
 message: "success"                      
 
 })
 }

return res.redirect('/');



} catch (err) {
    console.log("erron is ",err);
    return res.json(500,{
        message:"internal server error"
    })
}




}