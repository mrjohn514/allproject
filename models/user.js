const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


const User = mongoose.model('User', userSchema);

module.exports = User;


// const mongoose=require('mongoose');

// //creating schema for user sign in page

// const userschema=new mongoose.Schema({
// email:{
//     type:String,
//     required:true,
//     unique:true
// },
// password:{
//     type:String,
//     required:true,
// },

// name:{
//     type:String,
//     required:true
// }

// //to keep check when user is created and when was user last updated
// //then db must have field createdat and updatedat but these fields area managed by  mongoose done below timestamps

// },{
//     timestamps:true
// })


// const User= mongoose.model('user',userschema);   //mistake

// module.exports=User;