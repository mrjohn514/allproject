//controler which wil return json data when api req is made through browser

const Post=require('../../../models/post');

const Comment =require('../../../models/comment');

module.exports.index= async function(req,res){

    let posts = await Post.find({})       //finding posts in db and sending ti as json
    .sort('-createdAt')
    .populate("user")          
    .populate({                       
    path:'comments',               
    populate:{
        path:'user'             
    }
    });




    return res.json(200,{                          //json(succes,{data})

    message:"list of posts",
    post:posts

    })
}



//use this to delte post using api token generated 
module.exports.deletepost= async function(req,res)
{
try{

  let post= await  Post.findById(req.params.id);  //await 1   receve responce in let and add await to query


  //we will get user in req after passport.authenticate execurted in delte route 
  console.log("enterdhere ",req.user);
  console.log("psot user",post);
  if(post.user==req.user.id){                 
  
    post.remove();
    
    
    await Comment.deleteMany({post:req.params.id});  //await 2
  
    return res.json(200,{
        message:"post and ocmment delted"
    })
           
    
    }
    
    //if user not match 
    else
    {
        return res.json(401,{
            message:"not authorise to delte post"
        })
    }
    
}catch(err){
  console.log("error",err);
  return res.json(500,{
      message:"internal servel erro in delte "
  });
}

}