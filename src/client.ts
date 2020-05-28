// let socket = new WebSocket("ws://localhost:8080");

// socket.onopen = function(e) {
//     alert("Connected");
//     socket.send("Hello!");
// };

// socket.onmessage = function(event) {
//     alert('Message received: ' + event.data);
// };

// document.getElementById('send').addEventListener('click', () => {
//     if (socket.readyState !== 3)
//     {
//         socket.send('new message');
//     }
// })

export class Client {
    socket: WebSocket;
    buttonSend: HTMLElement;

    constructor(uri: string) {
        this.socket = new WebSocket(uri);
        this.buttonSend = document.getElementById('send');
        this.buttonSend.addEventListener('click', () => {
            this.onClickSendMessage();
        })

        this.socket.onopen = this.onOpenAlert(event);

        this.socket.onmessage = this.onMessageReceived(event);
    }

    onOpenAlert(event): any {
        alert("Connected");
        this.socket.send("Client has connected the server.");
    }

    onMessageReceived(event): any {
        alert('Message received: ' + event.data);
    }

    onClickSendMessage(elementToSend?: any): any {
        if (this.socket.readyState !== 3)
        {
            this.socket.send('new message');
        }
    }

}

