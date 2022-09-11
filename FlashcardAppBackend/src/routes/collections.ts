import express from 'express';
import collectionService from '../services/collectionService';
import toNewCollectionEntry from '../utils';
import { MongooseCollectionEntry } from '../types';
const CollectionM = require('../models/collection');

const router = express.Router();

router.get('/', (_req, res) => {
  CollectionM.find({})
    .then((cols: any) => {
      res.json(cols);
    });
  /*
  const entrs = collectionService.getEntries();
  res.json(entrs);
  */
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
        const newCollectionEntry = new CollectionM({
            ...newColEntry
        });
        newCollectionEntry.save()
        .then((savedCol:MongooseCollectionEntry) => {
          res.json(savedCol);
        })
        /*
        const addedEntry = collectionService.addCollection(newColEntry);
        res.json(addedEntry);
        */
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