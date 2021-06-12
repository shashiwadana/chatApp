const express = require ('express');
const socketio = require ('socket.io');
const http= require ('http');
const router = require('./router');
const { Socket } = require('dgram');
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const {addUser, removeUser, getUser, getUsersInRoom} =require( './users.js');

io.on('connection', (socket) => {
    
    socket.on('join',({name,room},callback) => {
       const {error, user} = addUser({id : socket.id,name,room});
       
       if(error) return callback(error);

       socket.emit('message',{user:'admin', text:`$(user.name), welcome to the room $(user.room)`});
       socket.broadcast.to(user.room).emit('message',{user: 'admin', text:'$(user.name), has joined!'})
       socket.join(user.room);
       callback();
    });

    

    socket.on('disconnect',() => {
        console.log('User had left!!!')
    });

});

app.use(router); 
server.listen(PORT,() => console.log(`server is runnig on port ${PORT} `)); 
