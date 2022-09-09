import collectionEntries from '../../data/collections';
//import collectionold from '../../data/collectionsold.json';

import { NewCollectionEntry, CollectionEntry } from '../types';

const getEntries = (): Array<CollectionEntry> => {
  return collectionEntries;
};

const addCollection = ( entry: NewCollectionEntry): CollectionEntry => {
    const newCollectionEntry = {
        id: Math.max(...collectionEntries.map(d => d.id)) + 1,
        ...entry
    }
    collectionEntries.push(newCollectionEntry);
    return newCollectionEntry;
};

const findById = (id: number): CollectionEntry | undefined => {
    const entry = collectionEntries.find(d => d.id === id);
    return entry;
};

export default {
  getEntries,
  addCollection,
  findById
};