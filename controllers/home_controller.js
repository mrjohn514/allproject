const Post = require('../models/post');

module.exports.home=function(req,res){

// Post.find({},function(err,posts){

//     if(err){console.log("erro");return};

//     return res.render('home_page',{
//         title:'home',
//         posts:posts         
//         });

// })

//using populate method to populate user field with whole user objec from user collection

//findin all the posts and pouplating user field of each post

Post.find({}).populate("user").exec(function(err,posts){            
       //previously we are writting callback fxn along side with finding query
     //what here as we are populating also we put callback in exec fxn

        if(err){console.log("error in finding and populating ");return};

    return res.render('home_page',{
        title:'home',
        posts:posts         
        });
})




}

