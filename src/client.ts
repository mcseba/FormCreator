let socket = new WebSocket("ws://localhost:8080");

socket.onopen = function(e) {
    console.log("Connected");
};

document.getElementById('send').addEventListener('click', () => {
    if (socket.readyState !== 3)
    {
        socket.send('new message');
    }
})

