
    class PostComments{
        // constructor is used to initialize the instance of the class whenever a new instance is created
        constructor(postId){
            this.postId = postId;
            this.newCommentForm = $(`#post-${postId}-comments-form`);
            this.createComment(postId);       //funciton createdcomment called using instace
    
        }
    
    
        createComment(postId){
            console.log("enterd in createcomment funciton");
            let pSelf = this;
            console.log("pself",pSelf);
            // pself 
            // PostComments {postId: '629ab4ab227297bc1d436089', newCommentForm: S.fn.init(1) }
            // newCommentForm: S.fn.init [form#post-629ab4ab227297bc1d436089-comments-form]
            // postId: "629ab4ab227297bc1d436089"





            this.newCommentForm.submit(function(e){
                e.preventDefault();
                let self = this;
    
                $.ajax({
                    type: 'post',
                    url: '/comment/createcomment',
                    // data: $(this.newCommentForm).serialize(),  //porblem is we are inside .submit callback fxn at line 16 and heres this represents form itself
                       data:$(self).serialize(), 

                    success: function(data){
                         
                        console.log("self",self);
                        // self
                        // <form action="/comment/createcomment" id="post-629ab4ab227297bc1d436089-comments-form" method="post">…</form>




                        
                        let newComment = pSelf.newCommentDom(data.data.comment);   //fucntion newcommentDom called usning instance
                        $(`#post-comments-${postId}`).prepend(newComment);
                    
                    

                        new Noty({
                            theme: 'relax',
                            text: "Comment published!",
                            type: 'success',
                            layout: 'topRight',
                            timeout: 1500
                            
                        }).show();
                    
                        

                    }, error: function(error){
                        console.log(error.responseText);
                    }
                });
    
    
            });
        }
    
    
        newCommentDom(comment){
            // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
            return $(`  
        
            
                <p><a href="/comment/deletecomment/${comment.id}">x</a></p>  
        
               <p>${comment.content}</p>

               <p class="cmtuser">cmnt by:${comment.user.name}</p>`);
        }





}













