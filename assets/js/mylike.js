///got the mistake iam doing basically iam accessing all the functions like click,attr,html
//so i fell in an infinite loop so when iam accessing elemnt in js file i have to add $ or js dom maniputlation



class ToggleLike{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(likeLink){
        this.createLike(likeLink);       //funciton createLink called using instace
    }


    createLike(likeLink){
        console.log("script loaded")
    console.log("enterd here in createlikelink")
      console.log(likeLink);

        $(likeLink).click(function(e){
            e.preventDefault();

        
$.ajax({
    type:'get',
    url: $(likeLink).prop('href'),                
    
    success:function(data){                          
      console.log("in succes dataa of like")
      console.log(data); 

      let likesCount = parseInt($(likeLink).attr('data-likes'));  //getting value of attribute set by me in a tag
      console.log(likesCount);
      if (data.data.deleted == true){            //tellin if like is clicked if already or not 
          likesCount -= 1;
          
      }else{                          
          likesCount += 1;
      }


      $(likeLink).attr('data-likes', likesCount);          //updating valu of attribut wit lates value
      $(likeLink).html(`${likesCount} Likes`);      //changing a tag html with lates updatge
    
    
    },
    error:function(error){
    console.log(error.responseText);

    }    
    })


        });
    }

}

