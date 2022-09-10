import axios from 'axios';
import { CollectionData } from '../types';

const baseUrl = 'http://localhost:3011/browseresults';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const update = (id:number, newObject:CollectionData) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
}

export default { 
  getAll,
  update,
}