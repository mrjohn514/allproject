const mongoose = require('mongoose');


//why are we importing multer here and not seting  in config folder because we are uploading 
//that file specific to user and we will have specific setting for eg: 
//user avatar will uploaded at different place 

//requiring multer 
const multer=require('multer');
const path=require('path');          //also neede as we will setting the path where file will be stored 

const AVATAR_PATH = path.join('/uploads/users/avatars') ;  //var storing the path of file //defining path 

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
    },
 
   avatar:{                 //field to store file path in db
   type:String,

   }


}, {
    timestamps: true
});


let storage = multer.diskStorage({

    //have two objects destination and filename 


 //here req, filefrom the req and callback funciotn 
    destination: function (req, file, cb) {

     //callback funciton have first arg null and other path where file need to be stored
      cb(null, path.join(__dirname, '..', AVATAR_PATH));   //   __dirnaame+..+uploads/users/avatars -->      
    },


    //used to define what would be name of file  stored at AVATAR_PATH

    //now image can have same names inorder to remove that situation we use datenow
    //datenow gives time  and it is everytime changing in miliconds also called epoc

    //file.fieldname+ '_' + datenow() --->resolved to  avatar_1273927328 ///here this time is also called epoc
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })




//creating static funtions and propoerties to access
//this static funtion is acceble by modelname.static fxn()  --->   User.uploadedAvatar();


//here uploadedAvatar is static function  hree  multer({storage : storage}) this basically attaches  let storage = multer.diskStorage({})
//the diskstorage on multer and mapped it to the storage property  

//i have defined multiple properties/methods  like .diskstorage and now i need to assign it to 
//multer  of this project   by( multer({storage:storage}))


//here single means or signifies only single file will be uploaded at time 

userSchema.statics.uploadedAvatar=  multer({storage:storage}).single('avatar')


//static property what i want  i need AVATAR_PATH to be available publicly for the user model 
//basically when iam using AVATAR_PATH in controler iam getting AVATAR_PATH not defined 
//because here iam exporting  User model and u know how exporting works  not whole file sepcific funtins
//propoerties can be exported 
//so  i have to make some static properties (avatarPath) and methods inside the userSchema.statics so that
//my model User whre iam requiring it can access these poperties and methods if u know export u will understand



userSchema.statics.avatarPath=AVATAR_PATH;



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