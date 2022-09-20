import axios from 'axios';
import { NewCollectionData, UpdateCollectionData } from '../types';

const baseUrl = 'api/collections';

let token: string | number | boolean = false;

const setToken = (newToken: string) => {
	token = `bearer ${newToken}`;
}

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const getSingle = (id:string) => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

const create = async (newObject: NewCollectionData) => {
	const config = {
		headers: { Authorization: token }
	}
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
}


const update = async (id:string, newObject: UpdateCollectionData) => {
	const config = {
		headers: { Authorization: token }
	}
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
    return response.data;
}

const saveCollection = async (id:string) => {
	const config = {
		headers: { Authorization: token }
	}
	const emp = {};
	const response = await axios.put(`${baseUrl}/${id}/save`, emp, config);
	return response.data;
}

const unSaveCollection = async (id:string) => {
	const config = {
		headers: { Authorization: token }
	}
	const emp = {};
	const response = await axios.put(`${baseUrl}/${id}/unsave`, emp, config);
	return response.data;
}

export default { 
  getAll,
  getSingle,
  create,
  update,
  saveCollection,
  unSaveCollection,
  setToken
}