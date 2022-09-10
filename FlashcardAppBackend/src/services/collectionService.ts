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

const deleteById = (id: number): CollectionEntry | undefined => {
  let deletedCollection;
  for(let i=0;i<collectionEntries.length;i++){
    if(collectionEntries[i].id===id){
      deletedCollection = collectionEntries[i];
      collectionEntries.splice(i,1);
      break;
    }
  }
  return deletedCollection;
};

export default {
  getEntries,
  addCollection,
  findById,
  deleteById
};