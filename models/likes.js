const mongoose=require('mongoose');

const likeSchema = new mongoose.Schema({

//what like belongs to it belong to user we need to keep record which user has made like so 
//need user

user:{                          
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'       
 },

 //now i need to store two things 
 //i) the type on which like  has been placed (post or comment)
 //ii)and object id on which like has been place (id of post or id of coment)


 //this define the object  id of liked object   (id of post or comment)
 likeable:{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
    //we need to tell it is dynamic reference
    //refpath we are goind to place a path to someother field and that field is goind to
    // decide on which type of object like is made

     // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
    // will look at the `onModel` property to find the right model.
    refPath:'onModel'       
},


//this field defines type of the liked object since this  is dynamci refernce 

onModel:{
    type:String,
    require:true,
    //this enum is adding validation/restricting that onModel property can have only either post or comment as its value
    //if i remove it can have any value
    enum:['Post','Comment']         
}


},{
timestamps:true

});


const Like = mongoose.model('Like',likeSchema);

module.exports=Like;