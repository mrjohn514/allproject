//requiring nodemailer 
const nodeMailer= require('nodemailer');

//need ejs render the template which sent in email
const ejs=require('ejs');

const path=require('path');



// transport is a transport object created from the  nodemailer.createTransport method

//nodemailer.createTransport(type, options) where type indicates transport protocol used 
//and options define how it is used 

let transporter =nodeMailer.createTransport({

//seting up smtp options on how it is used 

service:'gamil',  //) option to auto-configure host, port and secure connection settings
host:'smtp.gmail.com',                 //hostname of the SMTP server
port:587,                       //port of the SMTP server

//secureConnection - use SSL (default is false , not needed with service ). If
//you're using port 587 then keep secureConnection false, since the connection is
//started in insecure plain text mode and only later upgraded with STARTTLS

secure:false,

//you have to establish the identity with which you are sendin emails 
//if u dont do this anyone could use gmail to send mail from anyone to anyone (to stop spamming / to charge if sending more mails/day) 
auth:{                             //auth - authentication object as {user:"...", pass:"..."} 
user:'abubarwal786@gmail.com',
pass:'krhsmxawnvhwbiul' 

}


})






///////////step 2 let render template  so we want to define we will be using ejs and template rendring engine

//data to put in ejs file like to put username in email body 
//,relativepath from where mail is being sent  
let renderTemplate =(data,relativePath)=>{          
            
//creating var which conatina all the html which is sent in email     
let mailHtml;

//we are goin to use ejs to render that template and send it just like  it renders the views 

ejs.renderFile(

//path of place from where to render template  
//relateivePath is the path from where this function is called  renderTemplate() funciton
//side by side creating mailer folder in views 
path.join(__dirname,'../views/mailers',relativePath),

//this is data we pass to ejs file like we pass post in homecontroller to home.ejs and able to write <%post.user%>
data,

//callback funtion
function(err,template){
     if(err){console.log("erro in rendring",err);return}

     mailHtml=template; 
}


)

return mailHtml;

}



module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}

