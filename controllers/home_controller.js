const Post = require('../models/post');

const User= require('../models/user');

module.exports.home=function(req,res){

  //->without populating just sendinng all posts found in collection post as it is 

// Post.find({},function(err,posts){

//     if(err){console.log("erro");return};

//     return res.render('home_page',{
//         title:'home',
//         posts:posts         
//         });

// })


//--->2 sending all the post found after populating their user field 

//using populate method to populate user field with whole user objec from user collection
//finding all the posts and pouplating user field of each post

// Post.find({}).populate("user").exec(function(err,posts){            
//        //previously we are writting callback fxn along side with finding query
//      //what here as we are populating also we put callback in exec fxn

//         if(err){console.log("error in finding and populating ");return};

//     return res.render('home_page',{
//         title:'home',
//         posts:posts         
//         });
// })



//-->3 sending the all post found after populating user field with whole user object,
// comments array field(also populating user field inside comment object insserted in array ) with whole comment object comment:[{whole comment not only id}]
//and also comments:[  whole comment{ content:,    user:populate with whole user,  post:  },......  ] 


Post.find({})
.populate("user")           //user field in post
.populate({                         //syntax to populat from multiple models like i need to get comment and user of that comment 
path:'comments',                //comments array in post
populate:{
    path:'user'               //user field in comment 
}

})

      .exec(function(err,posts){            

    User.find({},function(err,users){               //finding all the user in User collection
 
      return res.render('home_page',{
        title:'home',
        posts:posts,
        all_users:users                          //passing users found from User colleciton to views
        });

    })     

})






}

