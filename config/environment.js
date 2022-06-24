//as we need to write into files
const fs=require('fs');

//requiring the rotate file system module
const rfs=require('rotating-file-stream');

//as we also need to tell paths so 
const path=require('path');



//variable which defines where logs will be stored
const logDirectory= path.join(__dirname,'../production_logs');


//now i have to find if the production logs already exists or need to be created
fs.existsSync(logDirectory)  || fs.mkdirSync(logDirectory);


//rfs(name of file,options)
const accesLogStream=rfs.createStream('access.log',{
interval:'1d',
path:logDirectory  
})



//devlopment object
const development={
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'blahsomething',
    db:'codeial_development',
    smtp:{
        service:'gamil',  
        host:'smtp.gmail.com',             
        port:587,                      
        secure:false,
        auth:{                          
        user:'abubarwal786@gmail.com',
        pass:'krhsmxawnvhwbiul' 
        }
        },
       google_clientID:"831968721597-pf1aq51goj4e78jgjkuebf754h8ga9vh.apps.googleusercontent.com",

        google_clientSecret:"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",

        google_callbackURL:"http://localhost:8000/user/auth/google/callback",

        jwt_secret_key:'codeial',


     //defineing the things in environment also
     morgan:{
        mode:'dev',
        options:{stream: accesLogStream}
     }



}


//producntion object
const production={
    name:'production',
    asset_path:process.env.CODEIAL_ASSET_PATH,                              //'./assets'
    session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,                 //'blahsomething'
    db:process.env.CODEIAL_DB,                                               // 'codeial_production'
    smtp:{
        service:'gamil',  
        host:'smtp.gmail.com',             
        port:587,                      
        secure:false,
        auth:{                          
        user:process.env.CODEIAL_GMAIL_USERNAME,                                                         //'abubarwal786@gmail.com',
        pass:process.env.CODEIAL_GMAIL_PASSWORD                                                          //'krhsmxawnvhwbiul' 
        }
        },
       google_clientID:process.env.CODEIAL_GOOGLE_CLIENTID,                  //"831968721597-pf1aq51goj4e78jgjkuebf754h8ga9vh.apps.googleusercontent.com",

        google_clientSecret:process.env.CODEIAL_GOOGLE_CLIENTSECRET,        // "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",

        google_callbackURL:process.env.CODEIAL_GOOGLE_CALLBACKURL,            //"http://codeial.com/user/auth/google/callback",

        jwt_secret_key:process.env.CODEIAL_JWT_KEY ,              //'codeial',

        morgan:{
            mode:'combined',
            options:{stream: accesLogStream}
         }
    


}


if(eval(process.env.CODEIAL_ENVIRONMENT)!=undefined){
console.log("not undefined");
console.log("jwt key is",process.env.CODEIAL_JWT_KEY);
}

//now only exporting development once production is completed we will export acc to need
// module.exports=eval(process.env.CODEIAL_ENVIRONMENT)== undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT)  ;
if(eval(process.env.CODEIAL_ENVIRONMENT)!=undefined)
{
  module.exports=production;  
}

else
{
    module.exports=development;
}