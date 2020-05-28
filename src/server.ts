import * as http from 'http'
import * as websocket from 'ws'

// const server = http.createServer((req, res) => {
//     res.end("I'm connected");
// });

// const socket = new websocket.Server({server});
// socket.on('connection', function connection(ws) {
//     ws.on('message', function incoming(message) {
//       console.log('received: %s', message);
//     });
// });

// server.listen(8080);

export class Server {
  server: http.Server;
  socket: websocket.Server;

  constructor(portToListenOn: number) {

    const server = http.createServer((req, res) => {
      res.end("I'm connected");
    });

    this.server = server;
    console.log(this.server);

    const socket = new websocket.Server({server});

    this.socket = socket;

    this.socket.addListener('connection', function connection(ws) {
      ws.addEventListener('message', function incoming(message){
        this.onReceivedMessage(message);
      });
    });

    this.server.listen(portToListenOn);
  }

  onReceivedMessage(message: websocket.Data) {
    console.log(message);
  }
}