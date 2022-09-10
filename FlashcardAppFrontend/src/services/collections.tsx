import axios from 'axios';
import { NewCollectionData } from '../types';

const baseUrl = 'api/collections';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = (newObject: NewCollectionData) => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
}

export default { 
  getAll,
  create,
}