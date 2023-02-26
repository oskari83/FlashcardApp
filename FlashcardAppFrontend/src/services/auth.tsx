import axios from 'axios';

const login = async (credentials:any) => {
	const response = await axios.post('api/login', credentials);
	return response.data;
}

const register = async (credentials:any) => {
	const response = await axios.post('api/users/signup', credentials);
	return response.data;
}

const recover = async (credentials:any) => {
	const response = await axios.post('api/users/recover', credentials);
	return response.data;
}

const reset = async (credentials:any) => {
	const response = await axios.post('/api/users/reset', credentials);
	return response.data;
}

const checkUsername = async (credentials:any) => {
	const response = await axios.post('api/users/checkusername', credentials);
	return response.data;
}

const checkEmail = async (credentials:any) => {
	const response = await axios.post('api/users/checkemail', credentials);
	return response.data;
}

export default { 
  login,
  register,
  recover,
  reset,
  checkUsername,
  checkEmail
}