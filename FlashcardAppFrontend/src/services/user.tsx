import axios from 'axios';

const baseUrl = 'api/users';

let token2: string | number | boolean;

const setToken = (newToken: string) => {
	token2 = `bearer ${newToken}`;
}

const get = async (id:string) => {
	const config = {
		headers: { Authorization: token2 }
	}
	const response = await axios.get(`${baseUrl}/${id}`, config);
    return response.data;
}

export default { 
  get,
  setToken
}