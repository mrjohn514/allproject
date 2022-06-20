const Friend=require('../models/friend');

const User= require('../models/user');

module.exports.createfriend= async function(req,res)
{
try {
    
    //putting delte to get find freind is delted by clicking btn or creting in js file but not used
    //in js i hadnt created ajac so i ussed it to send noty 
    var deleted=false; 

console.log(req.user.id);
console.log(req.params.id);


//checking if the freind already exist with  in friend collection with this touser and fromuser
// let existingfriend= await Friend.findOne({
// to_user:req.params.id,
// from_user:req.user.id
// })

let from_id = req.user._id;
let to_id = req.params.id;

let existingfriend= await Friend.findOne({ $or: [{ from_user: from_id, to_user: to_id }, { from_user: to_id, to_user: from_id }] })



//also getting touesr document and fromuser document to push/pull into array friends the created freind
let fromuser= await User.findById(req.user._id);
let touser=await User.findById(req.params.id);



//if we found there is already friend tehn we remove the this freind form freind model and arrays of friends
//fo touser and from user document 
if(existingfriend)
{

    //remvoeing from touser aray friend
    touser.friends.pull(existingfriend._id);
    touser.save();
    
    //remvoing from fromuer array friends
    fromuser.friends.pull(existingfriend._id);
    fromuser.save();  
    
    existingfriend.remove();
    
    deleted=true;
}


//if not already exits createg teh friend  in collection
else
{
    let newfriend= await Friend.create({

        from_user:req.user._id,
        to_user:req.params.id
    
    });
    

    //;\pusing to both touser arrya and from user array of friend to know wheather he has send the req 
    //to freind or get a req form freind  
    //when we use this and a user add freind b then now if we see a user home screen has b in friend list
    //and if we go to b user home screen we will see a in friend list this is acheived through this 
    
    touser.friends.push(newfriend);
    touser.save();
    fromuser.friends.push(newfriend);
    fromuser.save();


}

if(!deleted)
req.flash('success','friend added ');
else
req.flash('success','friend remvoed')

return res.redirect('/');


} catch (err) {
    if(err){console.log("internal server ereor",err);}

    return res.json(500,{
        message:"internal server error"
    })
    
}
    

}

//added dont know why when we clikc delte btn in frind wall of user home screen
module.exports.deletefriend= async function(req,res)
{
try {

  console.log("we are in deletecontrller")


    console.log(req.user.id);
    console.log(req.params.id);


let dfriend= await Friend.findById(req.params.id);

await User.findByIdAndUpdate(dfriend.to_user,{ $pull:{friends:req.params.id }})
await User.findByIdAndUpdate(dfriend.from_user,{ $pull:{friends:req.params.id }})


    dfriend.remove();  

req.flash('success','friend removed')
return res.redirect('/');


} catch (err) {
    if(err){console.log(err);}

      return res.json(500,{
        message:"internal server error"
    })
}


}