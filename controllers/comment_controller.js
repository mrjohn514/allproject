const Comment=require('../models/comment');

const Post=require('../models/post');

module.exports.createcomment=function(req,res){
//now to create a comment over post we need to find weateher that post exists or not for example
//anyone can change the value of post id in inspect and we will get error 
//so we find the post with the received post id first then create comment on that post

Post.findById(req.body.post,function(err,post){

if(post){
    Comment.create({
    content:req.body.content,
    post:req.body.post,
    user:req.user._id
    },
    function(err,comment){
    if(err){console.log("erron in creatin commment");return};

    //first time we are gouing to use update operation on collection down below

    post.comments.push(comment) //this is line 18 comment we receive and automatically id will be pushed from this 
    post.save();               //whenever i do some changes/updation in db we have to call save, it tells db it is final version save it 

   return res.redirect('/');

    })

}



});


}






