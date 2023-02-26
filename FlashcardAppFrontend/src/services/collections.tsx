import axios from 'axios';
import { NewCollectionData, UpdateCollectionData } from '../types';
import { getAuthenticationConfig } from '../Utils/token';

const baseUrl = 'api/collections';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const search = async (searchString:string) => {
	const bod = {
		search: searchString
	};
    const response = await axios.post(`${baseUrl}/search`, bod);
    return response.data;
}

const getSingle = (id:string) => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

const create = async (newObject: NewCollectionData) => {
	const config = getAuthenticationConfig();
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
}

const update = async (id:string, newObject: UpdateCollectionData) => {
	const config = getAuthenticationConfig();
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
    return response.data;
}

const deleteCollection = (id:string) => {
	const config = getAuthenticationConfig();
    const request = axios.delete(`${baseUrl}/${id}`,config);
    return request.then(response => response.data);
}

const saveCollection = async (id:string) => {
	const config = getAuthenticationConfig();
	const emp = {};
	const response = await axios.put(`${baseUrl}/${id}/save`, emp, config);
	return response.data;
}

const unSaveCollection = async (id:string) => {
	const config = getAuthenticationConfig();
	const emp = {};
	const response = await axios.put(`${baseUrl}/${id}/unsave`, emp, config);
	return response.data;
}

export default { 
  getAll,
  getSingle,
  search,
  create,
  update,
  deleteCollection,
  saveCollection,
  unSaveCollection,
}