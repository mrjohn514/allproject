const Post=require('../models/post')

module.exports.createpost=function(req,res){
    console.log("entering createpost")
    console.log(req.body);
Post.create({
content:req.body.content,
user:req.user._id                  //now the user field in document of post collection will populated with current signedin user's id           


},function(err,post){

if(err){console.log("error createing user in createpost");return}

return res.redirect('/');

})



}