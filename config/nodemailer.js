//requiring nodemailer 
const nodeMailer= require('nodemailer');

//need ejs render the template which sent in email
const ejs=require('ejs');

const path=require('path');

//requiring environment
const env=require('./environment');


// transport is a transport object created from the  nodemailer.createTransport method

//nodemailer.createTransport(type, options) where type indicates transport protocol used 
//and options define how it is used 

let transporter =nodeMailer.createTransport(env.smtp)






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

