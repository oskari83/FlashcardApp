import axios from 'axios';
import { CollectionData } from '../Types';

const baseUrl = 'http://localhost:3011/collections';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = (newObject: CollectionData) => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
}

export default { 
  getAll,
  create,
}