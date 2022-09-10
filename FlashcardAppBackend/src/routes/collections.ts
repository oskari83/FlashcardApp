import express from 'express';
import collectionService from '../services/collectionService';
import toNewCollectionEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(collectionService.getEntries());
});

router.get('/:id', (req, res) => {
    const collect = collectionService.findById(Number(req.params.id));
  
    if (collect) {
      res.send(collect);
    } else {
      res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    try {
        const newColEntry = toNewCollectionEntry(req.body);
        const addedEntry = collectionService.addCollection(newColEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.delete('/:id', (req, res) => {
    const deleted = collectionService.deleteById(Number(req.params.id));
    console.log(deleted);
    res.status(204).end();
});

export default router;