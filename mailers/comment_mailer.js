const nodeMailer=require('../config/nodemailer');


//now i need to create funciton which will send the mail 

            //--instad of exporting likethis ..
// newcomment =function(){};
// module.exports=newcomment;


exports.newComment= (comment)=>{                  //comment recieve from comment controller when comment created 
                                                 //we  call this function from there

console.log("inside new commentmailer",comment);

/////////decalring that we are using mailer template 
//as iam sending relative path and data to renderTemplate function so data =commment 

//as we previulsy define the rest path while definding renderTemplate function so rest path we gave 
//path.join(__dirname,'../views/mailers',relativePath) ----->resolve to  ../views/mailers/comments/newcomment.ejs

let htmlString= nodeMailer.renderTemplate({comment:comment},'/comments/newcomment.ejs') 


console.log(htmlString);


//calling preddefinde fucntion sendMail using object we created in config file transprte
nodeMailer.transporter.sendMail({

from:'mrjohn7861@gmail.com',                                // The e-mail address of the sender.
to:comment.user.email,                                      //email address of reciver here( to user who have commenteed)
subject:'newcomment published',                             //subject of email

//instead of this direct html we sent the template 
html:htmlString

},
// //info caries int info about req that has been sent mail sent succes ,fail
(err,info)=>{
if(err){console.log("errro in sending mail",err);return;}

console.log("message send",info);
return;

})

}



//----------------------------------------------------------------------------
//info look like this 
// message send {
//     accepted: [ 'mrjohn7861@gmail.com' ],
//     rejected: [],
//     envelopeTime: 1022,
//     messageTime: 816,
//     messageSize: 321,
//     response: '250 2.0.0 OK  1655028317 o6-20020a056a001bc600b0051c66160a3asm2923872pfw.181 - gsmtp',
//     envelope: { from: 'mrjohn7861@gmail.com', to: [ 'mrjohn7861@gmail.com' ] },
//     messageId: '<0ae8fa3a-6504-8878-cb09-05307265f5c8@gmail.com>'
//   }






//so now whenever a new comment is made i just need to call this  mailer 
//so i wil call this from contrller where a new comment is made in comment controller 