let alllikes=$('.new-like-button');

let allPostlike= function(likeLink)       //geting the acnchor tag in post for delte
{
console.log("enterd in postLike");

$(likeLink).click(function(e){

e.preventDefault();                   

$.ajax({
type:'get',
url: $(likeLink).prop('href'),                

success:function(data){                          
  console.log("in succes dataa of like")
  console.log(data);      
let likecount=$('like-count');
  
if(data.data.deleted==true)
{
let n=parseInt(likecount.text());
if(n==0)
{
  let n=parseInt(likecount.text());
  n++;
  likecount.text(n);
}
else
{
  n--;
likecount.text(n);
}


}
else
{
  let n=parseInt(likecount.text());
  n++;
  likecount.text(n);
}



},
error:function(error){
console.log(error.responseText);


}



})


})



}







for(let i=0;i<alllikes.length;i++)
{
 allPostlike(alllikes[i]);   
}


