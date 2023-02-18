const ws = require('ws');

const server = new ws.Server({port: 9000}, () => console.log(`Server started on 5000`))

server.on('connection', function connection(ws) {
  ws.on('message', (message) => {
    server.clients.forEach((client) => {
      const data = JSON.parse(message);
      client.send(JSON.stringify(data));
    });
  });

  ws.on('close', () => console.log('Client has disconnected!'));
})
