const WebSocket = require('ws');
const ws = new WebSocket.Server({port: 8080})

ws.on('error', console.error);

ws.on('open', function open() {
  ws.send('something');
});

ws.on('connection', (stream) => {
    stream.on('message', function message(data) {
        console.log('received: %s', data);
      });00
  });