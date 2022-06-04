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


// here data recive in json form from controller is like 
// {data:{data:{post:{    }   }           }}

let newPost = newPostDom(data.data.post);

$('#post-container').prepend(newPost);



 // call the create comment class
 let obj=new PostComments(data.data.post._id);

  console.log("object is",obj);

 //calling deltepost passing the anchor tag  to  delte post function 
 //in jquery we have to pass it like this 
 //this delete-post-button class inside the object newPost 


 new Noty({
  theme:'relax',                //type of noty theme 
  text: "post created",         //mesage text
   type: 'success',                        //color scheme 
   layout: 'topRight',                      //position of flash message 
   timeout: '1500'                           //time till we want to show flash  1500 milisec
   

   

}).show();


 
 deletePost($(' .delete-post-button',newPost));    


},
error:function(error){            //error is function wehre we recieve error any

console.log(error.responseText);
}

})
})

}



                  ////////////////////// method to create post in dom

let newPostDom= function(post)
{


 //backtick is feature where i can interpolae strings exampole var x=10 console,log(`ar$(x)`) ar10   
return $(`
<div class="card" id="post-${post._id}">        
    <div class="postcontent">
  
        <p><a class="delete-post-button" href="/post/deletepost/${post._id}">x</a></p>

        <p>${post.content}</p>
        <p class="uname">postBy:${post.user.name}</p>   
    </div>
      <div class="commentform">


        <form action="/comment/createcomment" id="post-${ post._id }-comments-form" method="post">
            <input type="text" placeholder="write ur cmt" name="content">
            <input type="hidden" name="post" value="${post._id}" >                         
            <input type="submit" value="comment" >
         </form>


       <div class="post-comments-list">
       <ul id="post-comments-${post._id}">


       </ul>
       </div>


      </div>

    </div>




`)                                                    


}




/////////////////////method to delete post using ajax///////


let deletePost= function(deleteLink)       //geting the acnchor tag in post for delte
{
console.log("enterd");

$(deleteLink).click(function(e){

e.preventDefault();                    //preventing defatult behaviur of anchro tag

$.ajax({
type:'get',
url: $(deleteLink).prop('href'),                //geting the href of anchro tag using prop fnction

success:function(data){                            //here data will have post_id sent from controller

  console.log(data);
 $(`#post-${data.data.post_id}`).remove();          //selecting the post div card using id selector in dom and removing the post  
 
 new Noty({
  theme:'relax',                //type of noty theme 
  text: "post deleted",         //mesage text
   type: 'success',                        //color scheme 
   layout: 'topRight',                      //position of flash message 
   timeout: '1500'                           //time till we want to show flash  1500 milisec
   

   

}).show();          


},
error:function(error){
console.log(error.responseText);


}



})


})



}








createPost();



}



