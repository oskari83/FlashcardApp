import axios from 'axios';
const loginUrl = 'api/login';
const registerUrl = 'api/users/signup';

const login = async (credentials:any) => {
	const response = await axios.post(loginUrl, credentials)
	return response.data;
}

const register = async (credentials:any) => {
	const response = await axios.post(registerUrl, credentials)
	return response.data;
}

const checkUsername = async (credentials:any) => {
	const response = await axios.post('api/users/checkusername', credentials)
	return response.data;
}

const checkEmail = async (credentials:any) => {
	const response = await axios.post('api/users/checkemail', credentials)
	return response.data;
}

export default { 
  login,
  register,
  checkUsername,
  checkEmail
}