require('dotenv').config();
import express from 'express';
import collectionRouter from './routes/collections';
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(express.static('build'));
app.use(cors());

const PORT = process.env.PORT || 3004;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/collections', collectionRouter);

const unknownEndpoint = (_req: any, response: any) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});