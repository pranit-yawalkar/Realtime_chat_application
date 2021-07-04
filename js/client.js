// socket server
const socket = io('http://localhost:8000');

// getting elements from dom
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

// storing audio to a variable
let audio = new Audio('assets/sound.mp3');

// function which generates a message container
const append = (message, position) =>{
    const msgElement = document.createElement('div');
    msgElement.innerText = message;
    msgElement.classList.add('message');
    msgElement.classList.add(position);
    messageContainer.append(msgElement);
    if(position=='left'){
        audio.play();
        msgElement.style.backgroundColor = 'rgb(255, 255, 191)';
    }
}

// storing the name of user 
const username = prompt("Enter your name to join");

// emit event when new user gets joined
socket.emit('new-user-joined', username);

// event fire when someone joins the chat
socket.on('user-joined', data =>{
    append(`${data} has joined the chat`, 'right');
})

// event fire on receiving the message
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left');
})

// event fire when someone leaves the chat
socket.on('leave', name =>{
    append(`${name} has left the chat`, 'right');
})

// executes when someone submits the form or sends the message
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})
