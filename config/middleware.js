

module.exports.setFlash=function(req,res,next){
//here we will find out the flash message  from the req and set it up in locals of res and so we can acces these
//locals in views/template 

res.locals.flash ={

    // The method req.flash(type) gets the value of all flash messages matching of the same type   req.flash(type, message) put in controller
'success':req.flash('success'),  
 'error':req.flash('error')

}

next();

}