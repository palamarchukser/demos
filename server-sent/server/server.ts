import express from 'express';
import cors from 'cors';
import events from 'node:events';

const emitter = new events.EventEmitter();
const app = express();

app.use(cors({
  origin: '*',
}));

app.use(express.json());
app.listen(5000, () => console.log('Server started'));

app.get('/connect', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  res.write('event: message\n');
  emitter.on('updateChat', message => res.write(`data: ${JSON.stringify(message)} \n\n`));
});

app.post('/add', ((req, res) => {
  emitter.emit('updateChat', req.body);
  res.status(200);
  res.end();
}));

app.post('/ip', (req, res) => {
  res.send(req.socket.remoteAddress);
  res.status(200);
  res.end();
});
