const Post=require('../models/post');

const Comment=require('../models/comment');


const Like=require('../models/likes');


// module.exports.createpost=function(req,res){
//     console.log("entering createpost")
//     console.log(req.body);
// Post.create({
// content:req.body.content,
// user:req.user._id                  //now the user field in document of post collection will populated with current signedin user's id           


// },function(err,post){

// if(err){console.log("error createing user in createpost");return}

// return res.redirect('/');

// })

// }


//////////////////////////above to async////////


module.exports.createpost= async function(req,res){       //first add sync

  try{

  console.log("entering createpost")                     //in console printed this
  console.log(req.body);                              //entering createpost
                                                      //{ content: 'deet' }
let post=await Post.create({                              //let the responce and add await
content:req.body.content,
user:req.user._id                  

});


////return json to manipulate dom in js file
if(req.xhr)                        //finding req is an ajax req (type of ajax req is xhr)
{
  post = await post.populate('user', 'name');

return res.status(200).json({             //we return json with status //here status is sucseesful as post is created 

data:{
post:post,                               //right post is the post created in db and recived in let post after query
},
message: "postcreated"                      //whenever we send json we also add message

})
}



req.flash('success','new postcreated ')
return res.redirect('/');

  }catch(err){
  console.log("error",err);
  return;

  }


}




// module.exports.deletepost=function(req,res)
// {
// //first check if post is there in db or not so we find in db through postid we received from string params 
// Post.findById(req.params.id,function(err,post){

// //if post is there 
// //next check if iam allowed to delete the post found can any random pereson can delte my post no so 
// //user who made the post is only authorise to delte
// //initilaly post.user is only id unntill i populate it 

// if(post.user==req.user.id){     //ideally i have to write req.user._id but whenever iam comparing ids of two objects
//                                   //i need to convert them into string so mongoose give me automatic varient of that (.id)
//                                 //.id means converting object id into string type automatically                                      
//                                 //basically user.id gets the string of user._id and user._id  is of type objectid 


// post.remove();

// //now i also have to delete comments associaed with post
// Comment.deleteMany({post:req.params.id},function(err){      //post field of Comment collection == req.params.id
// if(err){console.log("erro in comnt deleting ");return}

// return res.redirect('/');

// })

// }

// //if user not match 
// else
// {
//     return res.redirect('/');
// }

// })


// }


///////////////conversion of above codde to async



module.exports.deletepost= async function(req,res)
{
try{

  let post= await  Post.findById(req.params.id);  //await 1   receve responce in let and add await to query

  if(post.user==req.user.id){                   //then this exeuted
  

       //delelting the associated likes for post and all of its comments likes too 
    await Like.deleteMany({likeable: post, onModel: 'Post'});  
    await Like.deleteMany({id:{$in: post.comments}});


    post.remove();  
   let comment= await Comment.deleteMany({post:req.params.id});  //await 2
  


   if(req.xhr)
   {
    return res.status(200).json({

  data:{
    post_id:req.params.id
  },
  message:"post delted"

    })
   }



   req.flash('success','post deleted ')
   return res.redirect('/');                   //then this exexuted
    
    }
    
    //if user not match 
    else
    {
        return res.redirect('/');
    }
    






}catch(err){

  console.log("error",err);
  return;
}


}