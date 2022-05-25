const e = require('express');
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


module.exports.deletecomment=function(req,res){

//finding if comment existed in database by passing the comment id received in string params to query

Comment.findById(req.params.id,function(err,comment){
if(err){console.log("erro finding cmtn");return}

//if comment found then is user authorise to delete comment or not 
//checking  founded comment user id(comment.user) == signed in user id (req.user.id)

if(comment.user== req.user.id){

let postid=comment.post;  //storing in var so to remove the comment id in post.comment array 
comment.remove();

//updaing Post.commments by removing the commentid of comment that we have delted 
//inbuilt mongoose fucntion $pull: {this is the id i need to pullout from comments}
Post.findByIdAndUpdate(postid,{ $pull:{comments:req.params.id }},function(err,post){
return res.redirect('/');
})
}


else
{
    return res.redirect('/');
}


});





}






