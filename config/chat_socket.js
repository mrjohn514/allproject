

module.exports.chatSockets= function(socketServer)   //receving the chatserver made form index.js file
{

//io again established this io handling the connections
//requiring soket.io module and also passing our made soketserver to this module    
var io = require('socket.io')(socketServer, {
  cors: {
    origin: '*',
  }
});

//io has allthe sockets and this event is called connection over here and connect over client side
//but both the events are same

//so when object of class chatEngine made there is line this.socket=io.connect('http://localhost:5000')
//which says go and connect basically io.connect fires an event called connection

//.on is similar like eventlistenrs which detect events send by client
io.sockets.on('connection',function(socket){

    //socket is an object with lot of properties of user which is sending req
    console.log("new connection recived",socket.id)



//another event whenever client disconnects an automatic disconnect event is fired

socket.on('disconnect',function(){

console.log("socket disconnected !")

})


//detecting the sent event from client side here 
//.on is similar like eventlistenrs which detect events send by client

socket.on('join_room',function(data){

console.log("joining request recived",data);

//further on when joiniing req has been recieved i just want that socket to be joined to that room

//but this will do is if chatroom with this name exisst usre will conected(enter in it ) if not exists it create it
socket.join(data.chatroom);

//now when i join chatroom all other users which are in that chatroom should recive notificatoin that this user
//has joined  chatroom  (including myself)
//for this we have to emit an event inside chatroom

io.in(data.chatroom).emit('user_joined',data);


//detect the sent message from client side (send_message event) and broadcasting to everyone in chatroom

socket.on('send_message',function(data){

//broadcating to every one in chat room
 io.in(data.chatroom).emit('receive_message',data); 

})


})    





})






}