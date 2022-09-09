import express from 'express';
import collectionRouter from './routes/collections';
const app = express();
app.use(express.json());

const PORT = 3004;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/collections', collectionRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});