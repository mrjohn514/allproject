{
console.log("enterd");

                            //method to submit the createpost form data using ajax//


let createPost= function(){
let newPostForm= $('#new-post-form');

 //.submit is a eventlistner like in js(click pressed) here we receieved this event
 //of submiting form in callback funcion in e argument 
newPostForm.submit(function(e){    

e.preventDefault();                      //restrincitng  the form default submission behaviour


//creating manual submision of form using ajax 

$.ajax({
type:'post',
url: '/post/createpost',                 //form action 
data: newPostForm.serialize(),           //convert the form data into jason ie key value pairs {content: 'fdfndv'}


success: function(data){          //succes is fucntion where we recieve data of create post form in json format
console.log(data) ;             //{ content: 'hey ajax' }

},
error:function(error){            //error is function wehre we recieve error any

console.log(error.responseText);
}

})
})

}


createPost();



}