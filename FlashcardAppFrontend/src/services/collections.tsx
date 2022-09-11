import axios from 'axios';
import { CollectionData, NewCollectionData } from '../types';

const baseUrl = 'api/collections';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = (newObject: NewCollectionData) => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
}

const update = (id:number, newObject:CollectionData) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
}

export default { 
  getAll,
  create,
  update
}