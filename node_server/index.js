// Node server for socket io connections
const io = require("socket.io")(8000, {
        cors: {
            origin: '*',
        }
  });

// User object
const users = {};

// checking for connections
io.on('connection', socket=>{
    // new user join event fires and emits another event which let others to know this.
    socket.on('new-user-joined', name=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    // event fires if someone send message and emits another event which let others to know the sent message
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
    });

    // event fires when someone gets disconnected from chat which emits another event which let others to know this information
    socket.on('disconnect', message =>{
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    });
})