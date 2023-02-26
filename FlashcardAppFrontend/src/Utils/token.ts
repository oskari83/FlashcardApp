export const setToken = (newToken: string) => {
	localStorage.setItem('accessToken', newToken);
};
  
export const getAuthenticationConfig = () => {
	const config = {
		headers: {},
	};
  
	const token = localStorage.getItem('accessToken');
  
	if (token) {
		config.headers = {
			Authorization: `bearer ${token}`,
		};
	}
  
	return config;
};