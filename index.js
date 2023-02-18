
class User {
  constructor(id, stream) {
    this.id = id;
    this.stream = stream;
  }
}

class UserDictionary {
  constructor() {
    this.users = [];
  }
}

const WebSocket = require('ws');
const { v4 } = require('uuid');
const wss = new WebSocket.Server({ port: 8080 })


wss.on('error', console.error);

wss.on('open', function open() {
  wss.send('something');
});

let awaitingUsers = new UserDictionary();

wss.on('connection', function connection(stream) {
  console.log("connected");
  stream.on('error', console.error);
  stream.on('message', function message(data, isBinary) {
    wss.clients.forEach((client) => {
      if (client !== stream && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  })
});
