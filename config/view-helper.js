const env=require('./environment');

const fs=require('fs');

const path=require('path');


//an arrow funtin which will take my app becase iam sending a functin to the locals of my app
//basically we will require this funcion in index.js and pass app to this fucntion from there

module.exports=(app)=>{

//iam defining a global funtion which will be there in app  and passing the initial filepath 
//basically i will call this funtion in views and pass the filepath from there 
app.locals.assetPath= function(filePath){
   
    console.log("the filePath is ",filePath);

    //now we will see weather the environment is dev or production acc to that fetch current file and return file
    if(env.name=='development')
    {
        //we will return the same filepath which we have send from views 
        //we will send   assetPath(css/home.css)
        return '/'+  filePath;
    }



//  The JSON.parse() method parses a JSON string, constructing object keyvalue pairs 
//   fs.readFileSync (reading the file using fs module) ,
//path.join() from where you are reading path is given by path module

//since we have parse this json and we have recived key value pairs so will find the value associated with 
//filepath key   

//bascillay it return  we return [css/home.css] form json recive of revfile  {"css/home.css": "css/home-eaa7bc9716.css",  } 
//basically returning css/home-eaa7bc9716.css this thing for production


//also we have to take care of onething when we are passing file path from viws example home.ejs
//<link rel="stylesheet" href="<%=locals.assetPath('css/home.css')%>"></link>
//here we have removed / and pass css/home.css instead of /css/home.css
//because in revfilie this /is not before css to find value of key we do that so after getting path 
//we have to add that '/' so

return '/'+  JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filePath];


}



}




// ----------------------------------------------running in production environment---------------------


//what happening is from home.ejs i call this assetPath funcion and pass the 
//css link in funcion <link rel="stylesheet" href="<%=locals.assetPath('css/home.css')%>">

//this assetPath called where filePath=css/home.css
//then we check the environment is devlopment or production as we are running production 
//return '/'+  JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filePath];  is called

//and return path as /css/home-1549398570.css  and
// also (frontslash means / ---> ./public/assets) due to app.use(express.static(env.asset_path));


//so finally at  <link rel="stylesheet" href="./public/assets/css/home-1549398570.css"> and hence file get renders

//-----------------------------------------------------------------------------------------------------------






//------------------------------------------running in develooment env-------------------------------------

//similar everything our assetpath will get  <link rel="stylesheet" href="<%=locals.assetPath('css/home.css')%>">
//and filepath =css/home.css

//if called inside the assetpath fucntion the and return   css/home.css to home.ejs






//-------------------------------------------------------------------------------------------------