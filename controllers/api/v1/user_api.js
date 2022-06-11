
//need User 
const User=require('../../../models/user');

//rquiring jsonwebtonken library
const jwt=require('jsonwebtoken');



module.exports.createsession=async function(req,res)
{
//whenever a user email or password is recibed  we need to find user and genereate jwt corresponding to that user
try{
    console.log("hey",req.body);
    console.log(req.user);
    let user= await User.findOne({email:req.body.email});

  if(!user || user.password!=req.body.password)  //if no user and password dont match
  {
return res.json(422,{
    message:"invalid username or password"
})
  }

  return res.json(200,{
      message:"this is your genereated token",
      data:{

        //founded user wil converted to json then this sign fucntion will ecncrypt this user using 
        //key codeial 
          token: jwt.sign(user.toJSON(),'codeial',{expiresIn:'1000000'})         
      }
      
  })


}catch(err)
{
console.log("errorororo",err);
return res.json(500,{                   ///also return json like this  without using status keyword
message:"internal server error"

});
}



}