const Post = require('../models/post');

const User= require('../models/user');

// module.exports.home=function(req,res){

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


// Post.find({})
// .populate("user")           //user field in post
// .populate({                         //syntax to populat from multiple models like i need to get comment and user of that comment 
// path:'comments',                //comments array in post
 // populate:{
 //     path:'user'               //user field in comment 
 // }

 // })

 //       .exec(function(err,posts){            

 //     User.find({},function(err,users){               //finding all the user in User collection
  
 //       return res.render('home_page',{
 //         title:'home',
 //         posts:posts,
 //         all_users:users                          //passing users found from User colleciton to views
 //         });

 //     })     

 // })

 // }
//}  home bracket



 ///////////////////changing above to asyn code///////////////


 module.exports.home= async function(req,res){                                


  try {
  
  //and this post part is now awating and any success responce will be stored in let post 
  
  let posts = await Post.find({})                                              //await 1  first this get executed
  .sort('-createdAt')
  .populate("user")          
  .populate({                       
  path:'comments',               
  populate:{
      path:'user'             
  }
  });
  //now once this post part get exexutedthen this user part get exexuted  
  
  
  // similar any success responce will be stored in let user 
  let users= await User.find({});                                                  //await 2  then thiss get executed
  
  //now once this user get executed then this redner part will executed
  
  
  // and the stored post and user responce will sent to the server 
    return res.render('home_page',{                                              //then this get executed
           title:'home', 
          posts:posts,
          all_users:users                          
          });
  
  
  }catch(err){
  console.log("error",err);
  return;
  }
  
  
  
  }




