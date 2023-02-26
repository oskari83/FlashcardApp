import axios from 'axios';
import { UpdateData } from '../types';
import { getAuthenticationConfig } from '../Utils/token';

const baseUrl = 'api/users';

const getCollections = async (id:string) => {
	const config = getAuthenticationConfig();

	const response = await axios.get(`${baseUrl}/${id}/collections`, config);
    return response.data;
}

const getData = async (id:string, colId: string) => {
	const config = getAuthenticationConfig();
	const ob = {
		colId: colId
	}
	const response = await axios.put(`${baseUrl}/${id}/data`, ob, config);
    return response.data;
}

const updateOwnData = async (id:string, newData: UpdateData) => {
	const config = getAuthenticationConfig();

	const response = await axios.put(`${baseUrl}/${id}/updateown`, newData, config);
    return response.data;
}

const updateSavedData = async (id:string, newData: UpdateData) => {
	const config = getAuthenticationConfig();

	const response = await axios.put(`${baseUrl}/${id}/updatesaved`, newData, config);
    return response.data;
}

export default { 
  getCollections,
  getData,
  updateOwnData,
  updateSavedData,
}