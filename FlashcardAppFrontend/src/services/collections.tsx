import axios from 'axios';
import { CollectionData, NewCollectionData } from '../types';

const baseUrl = 'api/collections';

let token: string | number | boolean = false;

const setToken = (newToken: string) => {
	token = `bearer ${newToken}`;
}

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = async (newObject: NewCollectionData) => {
	const config = {
		headers: { Authorization: token }
	}
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
}

const update = (id:number, newObject:CollectionData) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
}

export default { 
  getAll,
  create,
  update,
  setToken
}