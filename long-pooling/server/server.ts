import express from 'express';
import cors from 'cors';
import events from 'node:events';

const emitter = new events.EventEmitter();
const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, () => console.log('Server started'));

app.post('/add', ((req, res) => {
  emitter.emit('updateChat', req.body);
  res.status(200);
}));

app.get('/get', (req, res) => {
  emitter.once('updateChat', message => res.json(message));
});
