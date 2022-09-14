const validateEmail = (email:string) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};

const validateUsername = (username:string) => {
	return String(username)
		.toLowerCase()
		.match(
			/^[a-zA-Z0-9_]*$/
		);
}

const validatePassword = (pass:string) => {
	return String(pass)
		.toLowerCase()
		.match(
			/^[ A-Za-z0-9_@./#&+-]*$/
		);
}

export const CheckEmail = (email: string): [boolean,string] => {
	if(email===''){
		return [false,'Email empty'];
	}
	if(!validateEmail(email)){
		return [false,'Please give a valid email address'];
	}

	return [true,'Success'];
}

export const CheckUsername = (username:string): [boolean,string] => {
	if(username===''){
		return [false,'Username empty'];
	}
	if(username.length<4){
		return [false,'Username too short (minimum 4 characters)'];
	}
	if(username.length>16){
		return [false,'Username too long (maximum 16 characters)'];
	}
	if(!validateUsername(username)){
		return [false,'Invalid username (special characters not allowed)'];
	}
	return [true,'Success'];
}

export const CheckPassword = (password:string): [boolean,string] => {
	if(password===''){
		return [false,'Password empty'];
	}
	if(password.length<6){
		return [false,'Password too short (minimum 6 characters)'];
	}
	if(password.length>18){
		return [false,'Password too long (maximum 18 characters)'];
	}
	if(!validatePassword(password)){
		return [false,'Invalid username (some characters not allowed)'];
	}
	return [true,'Success'];
}