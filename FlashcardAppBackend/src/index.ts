// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import express from 'express';
import collectionRouter from './routes/collections';
const app = express();
app.use(express.static('build'));
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3004;

app.get('/ping', (_req, res) => {
	console.log('someone pinged here');
	res.send('pong');
});

app.use('/api/collections', collectionRouter);

const unknownEndpoint = (_req: any, response: any) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error: any, _request:any, response: any, next:any) => {
	console.error(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	}

	next(error);
};

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});