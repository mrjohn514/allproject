
const mongoose=require('mongoose');

const postSchema= new mongoose.Schema({
content:{
    type:String,
    required:true
},
user:{                          //same as normal field in document  what it  is of  idtype and referd from User colleciton
   type:mongoose.Schema.Types.ObjectId,
   ref:'User'       // The ref option is what tells Mongoose which model to use during population,
                    // in our case it is User model.
                    // the id we store here must be documents _ids from the User model.

                    //basically ref telling which model does the id refers to 
},

//including the arrya of comments  in the post schema itself to frequently fetch them
comments:[
    {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Comment' 
    }

]

}
,
{
timestamps:true  
})

const Post=mongoose.model('Post',postSchema);

module.exports=Post;