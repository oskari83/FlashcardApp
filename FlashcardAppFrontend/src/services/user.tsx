import axios from 'axios';
import { UpdateData } from '../types';

const baseUrl = 'api/users';

let token2: string | number | boolean;

const setToken = (newToken: string) => {
	token2 = `bearer ${newToken}`;
}

const getCollections = async (id:string) => {
	const config = {
		headers: { Authorization: token2 }
	}
	const response = await axios.get(`${baseUrl}/${id}/collections`, config);
    return response.data;
}

const getData = async (id:string, colId: string) => {
	const config = {
		headers: { Authorization: token2 }
	}
	const ob = {
		colId: colId
	}
	const response = await axios.put(`${baseUrl}/${id}/data`, ob, config);
    return response.data;
}

const updateOwnData = async (id:string, newData: UpdateData) => {
	const config = {
		headers: { Authorization: token2 }
	}

	const response = await axios.put(`${baseUrl}/${id}/updateown`, newData, config);
    return response.data;
}

const updateSavedData = async (id:string, newData: UpdateData) => {
	const config = {
		headers: { Authorization: token2 }
	}

	const response = await axios.put(`${baseUrl}/${id}/updatesaved`, newData, config);
    return response.data;
}

export default { 
  getCollections,
  getData,
  updateOwnData,
  updateSavedData,
  setToken
}