const ws = require('ws');

const server = new ws.Server({port: 5000}, () => console.log(`Server started on 5000`))

let users = [];

this.server = server;
this.server.on('connection', function connection(ws) {
  ws.on('message', (message) => {
    server.clients.forEach((client) => {
      client._socket.setKeepAlive(true);

      const data = JSON.parse(message);
      client.username = data.username;

      switch (data.event) {
        case 'message':
          client.send(JSON.stringify(data));
          break;
        case 'connection':
          users.push({username: data.username, id: data.id})
          Object.assign(data, {users: users});

          client.send(JSON.stringify(data));
          break;
      }
    });
  });

  ws.on('close', () => {
    console.log('Client has disconnected!')
  });

  ws.on('disconnect', () => console.log('Client has disconnected!'));
})

setInterval(()=>{
  console.log(`Setting the interval ${server.clients.length}`);
  users = [];
  server.clients.forEach((client) => {
    users.push(client.username)
    client.send(JSON.stringify({length: users}));

    if (ws.isAlive === false){
      //Logger.log("verbose", `The web socket died`);
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping(()=>{});
  });
}, 5000);
