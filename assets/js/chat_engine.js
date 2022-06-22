//iam creating a class for creating functioality 

class chatEngine{

//take two things id of the chatbox basically our chatcontainer in homepage
// and email id of user (who is initiating connection)    
constructor(chatboxid,userEmail,userName){
this.chatBox=$(`#${chatboxid}`);
this.userEmail=userEmail

this.userName=userName;

//then we need to initiate a connection 
//iam running socket server on port 5000

//now io is a global variable available as soon we added cdn of socket.io
this.socket=io.connect('http://localhost:5000')



///calling the function only if there is user email
if(this.userEmail){
this.connectionHandler();
}

}


//creating connection handler (basically function)
//this conectionhandler will have the to and fro interaction between observer(server) and subscrier(user)
connectionHandler(){

let self =this ;    //iam taking object in this because this will change inside handler function


//ans event on socket which take place is connection
//when connect event occurs in socket calling a callback funtion
this.socket.on('connect',function(){

console.log("connection established using sockets..!")


//once we are connected  
//so this event is emited and it wil be recived at chat sockets
//self.socket.emit('event name can be anyting but it has to coresopnds at server side',data)
self.socket.emit('join_room',{
user_name:self.userName,
user_email:self.userEmail,          //data 
chatroom:'codeial'                   //chatroom name


})


//reciving the userjoined event from server side here
self.socket.on('user_joined',function(data){
    console.log("userjoined",data);




//    let newuser= $('<li>').append($('<span>',{
//         //html content inside spant  --->overall looks like  <li><span>data.message</span></li>    
//         'html':data.user_name   
        
//         }))

//         newuser.addClass(userenter);

//         $('#messages').append(newuser); 

})



});


//adding event listern to send button 
$('#send-message').click(function(){

    let msg=$('#chatmsg').val();

    if(msg!='')
    {
     //if messagenot empty emmiting an event   
    self.socket.emit('send_message',{
    user_name:self.userName,
   message:msg,
   user_email:self.userEmail,
   chatroom:'codeial'

    });    
    }



})

//detecting recive_message from server side 
self.socket.on('receive_message',function(data){
console.log('recived message',data.message);
console.log('recieved message',data.user_name);

//creating new dom 
let newMessage=$('<li>');

let messagetype='other-message';

//now if user1 sends message and recive_message fired with data now 
//if the recive_message emiting user ==user sending message
//basically user1 is reciving his own message as it is broadcasting at server side it is recvied by sent user also 
//so to avoid this we are using this messagetype
if(data.user_email ==self.userEmail)
{
    console.log("enreting")
messagetype='self-message';
}


let text= data.user_name +':'+ data.message;

// newMessage.append({
// //html content inside spant  --->overall looks like  <li><span>data.message</span></li>    
// 'html':text  

// })

// //appending html to li created 
newMessage.html(text);


//now adding class of othermessage or selfmessage  which is set in messagetype
newMessage.addClass(messagetype);


//finally appending this newmmesage created to ul
$('#messages').append(newMessage);



})







}


}







//understandin chatroom cycle 
//let a user1 and user2   
//user1 sends a req(emits) to join the chatroom named codial and user2 also sends a request(emits) to join the chatroom
//named codial 
//server detects this above emit  with on and then this server emits  (new user is joind) to user1 and user2 back
//then here user(client side) detects using on

