import './AuthenticationView.css';
import { useState, SyntheticEvent } from 'react';
import authService from '../../services/auth';
import collectionService from '../../services/collections';
import userService from '../../services/user';
import { BsQuestion, BsCheck, BsX } from 'react-icons/bs';
import { CheckEmail, CheckUsername, CheckPassword } from '../../Utils/validation';
import { useNavigate } from 'react-router-dom';

const SignInView = ({setUserFunc, setError, errorText}: {setUserFunc:any, setError:any, errorText:string}) => {
	const [email, setEmail] = useState(''); 
	const [password, setPassword] = useState(''); 
	const [emailError, setEmailError] = useState('');
	const [buttonText, setButtonText] = useState('Sign In'); 
	const navigate = useNavigate();

	const ResetButton = () => {
		setButtonText('Sign In');
	}

	const handleLogin = async (event: SyntheticEvent) => {
		event.preventDefault();
		setButtonText('Loading...');

		const emailCheck = CheckEmail(email);

		if(emailCheck[0]===false){
			setEmailError(emailCheck[1]);
			setTimeout(() => {
				setEmailError('');
			}, 5000);
			ResetButton();
			return;
		}

		try {
			const user = await authService.login({
				email, password,
			});
			window.localStorage.setItem(
				'loggedFlashcardAppUser', JSON.stringify(user)
			); 
			console.log(user);
			collectionService.setToken(user.token);
			userService.setToken(user.token);
			setUserFunc(user);
			setEmail('');
			setPassword('');
			ResetButton();
			navigate('/');
		} catch (exception) {
			console.log("failed");
			ResetButton();
			setError('Incorrect email or password');
			setTimeout(() => {
				setError('');
			}, 5000);
		}
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setEmail(val);
    };

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setPassword(val);
    };

    return(
    <form onSubmit={handleLogin} className='loginForm'>
        <div className='emailTextContainer'>Email</div>
        <div className='emailContainer'>
            <input 
				type="text" 
				value={email} 
				className='emailInputS'  
				placeholder="example@gmail.com"
				onChange={handleEmailChange}
			></input>
        </div>

		<div className='userNameErrorText2'>{emailError}</div>

        <div className='passwordTextContainer'>Password</div>
        <div className='passwordContainer'>
            <input 
				type="password" 
				value={password} 
				className='passwordInputS'  
				placeholder="Type your password..."
				onChange={handlePasswordChange}
			></input>
        </div>
		
		<div className='loginOptionsContainer'>
			<div className='forgotPasswordLink'>Forgot password?</div>
			<div className='rememberMeBox'>
				<div className='rememberMeButton'>
					<div className='rememberMeButtonButton'>
						<label className='rememberLabel'>
							<input type="checkbox" className='rememberCheckBox'></input>
							<span className='checkMarkInRemember'>
								<div className='innerRememberCircle'></div>
							</span>
						</label>
					</div>
				</div>
				<div>Remember me</div>
			</div>
		</div>
		<div className='userNameErrorText'>{errorText}</div>

        <button className='signinButton' type='submit'>{buttonText}</button>
	</form>
    )
}

const RegisterView = ({selectionFunc, setError, errorText}: {selectionFunc:any, setError:any, errorText:string}) => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState(''); 
	const [password, setPassword] = useState(''); 
	const [passwordAgain, setPasswordAgain] = useState('');
	const [usernameError, setUsernameError] = useState(''); 
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [lowestError, setLowestError] = useState('');
	const [buttonText, setButtonText] = useState('Register');

	const [usernameTimeout, setUsernameTimeout] = useState<null | NodeJS.Timeout>(null);
	const [emailTimeout, setEmailTimeout] = useState<null | NodeJS.Timeout>(null);
	const [usernameErrorTimeout, setUsernameErrorTimeout] = useState<null | NodeJS.Timeout>(null);
	const [emailErrorTimeout, setEmailErrorTimeout] = useState<null | NodeJS.Timeout>(null);
	const [passwordErrorTimeout, setPasswordErrorTimeout] = useState<null | NodeJS.Timeout>(null);
	const [passwordAgainErrorTimeout, setPasswordAgainErrorTimeout] = useState<null | NodeJS.Timeout>(null);

	const [usernameUniqueIcon, setUsernameIcon] = useState(0);
	const [emailUniqueIcon, setEmailIcon] = useState(0);
	const [passwordIcon, setPasswordIcon] = useState(0);
	const [passwordAgainIcon, setPasswordAgainIcon] = useState(0);

	const ResetButton = () => {
		setButtonText('Register');
	}

	if(errorText!=='' && lowestError===''){
		setLowestError(errorText);
	}

	const ClearUsernameError = (time:number) => {
		if(usernameErrorTimeout){
			clearTimeout(usernameErrorTimeout);
		}
		const timeoutU = setTimeout(() => {
			setUsernameError('');
		},time);
		setUsernameErrorTimeout(timeoutU);
	}

	const ClearEmailError = (time:number) => {
		if(emailErrorTimeout){
			clearTimeout(emailErrorTimeout);
		}
		const timeoutE = setTimeout(() => {
			setEmailError('');
		},time);
		setEmailErrorTimeout(timeoutE);
	}

	const ClearPasswordError = (time:number) => {
		if(passwordErrorTimeout){
			clearTimeout(passwordErrorTimeout);
		}
		const timeoutP = setTimeout(() => {
			setPasswordError('');
		},time);
		setPasswordErrorTimeout(timeoutP);
	}

	const ClearLowestError = (time:number) => {
		if(passwordAgainErrorTimeout){
			clearTimeout(passwordAgainErrorTimeout);
		}
		const timeoutPA = setTimeout(() => {
			setLowestError('');
		},time);
		setPasswordAgainErrorTimeout(timeoutPA);
	}

	const CheckUsernameFunc = async (username: string) => {
		const usernameCheck = CheckUsername(username);
		if(usernameCheck[0]===false){
			setUsernameError(usernameCheck[1]);
			setUsernameIcon(2);
			ClearUsernameError(5000);
			return;
		}

		const checkResp = await authService.checkUsername({
			username,
		});
		console.log(checkResp);
		if(checkResp.answer==='ok'){
			setUsernameIcon(1);
			setUsernameError('');
		} else if (checkResp.answer==='fail'){
			setUsernameIcon(2);
			setUsernameError('Account with this username already exists');
			ClearUsernameError(5000);
		} else {
			setUsernameIcon(0);
		}
	}

	const CheckEmailFunc = async (email: string) => {
		const emailCheck = CheckEmail(email);
		if(emailCheck[0]===false){
			setEmailError(emailCheck[1]);
			setEmailIcon(2);
			ClearEmailError(5000);
			return;
		}

		const checkResp = await authService.checkEmail({
			email,
		});
		console.log(checkResp);
		if(checkResp.answer==='ok'){
			setEmailIcon(1);
			setEmailError('');
		} else if (checkResp.answer==='fail'){
			setEmailIcon(2);
			setEmailError('Account with this email already exists');
			ClearEmailError(5000);
		} else {
			setEmailIcon(0);
		}
	}

	const CheckPasswordFunc = async (password: string) => {
		const passwordCheck_ = CheckPassword(password);
		if(passwordCheck_[0]===false){
			setPasswordError(passwordCheck_[1]);
			setPasswordIcon(2);
			ClearPasswordError(5000);
			return;
		}
		setPasswordIcon(1);
		ClearPasswordError(0);
	}

	const CheckPasswordAgainFunc = async (passwordA: string) => {
		if(passwordA!==password){
			setLowestError('Passwords dont match');
			setPasswordAgainIcon(2);
			ClearLowestError(5000);
			return;
		}
		setPasswordAgainIcon(1);
		setLowestError('');
	}

	const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(usernameTimeout){
			clearTimeout(usernameTimeout);
		}
        const val = event.target.value;
        setUsername(val);
		const timeout1 = setTimeout(() => {
			CheckUsernameFunc(val);
		},500);
		setUsernameTimeout(timeout1);
    };

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(emailTimeout){
			clearTimeout(emailTimeout);
		}
        const val = event.target.value;
        setEmail(val);
		const timeout2 = setTimeout(() => {
			CheckEmailFunc(val);
		},500);
		setEmailTimeout(timeout2);
    };

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setPassword(val);
		CheckPasswordFunc(val);
    };

	const handlePasswordAgainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setPasswordAgain(val);
		CheckPasswordAgainFunc(val);
    };

	const handleRegister = async (event: SyntheticEvent) => {
		event.preventDefault();
		console.log('registering with', username, email, password);
		setButtonText('Loading...');

		const emailCheck = CheckEmail(email);
		const usrnmCheck = CheckUsername(username);
		const passwordCheck = CheckPassword(password);

		if(emailCheck[0]===false){
			ResetButton();
			setEmailIcon(2);
			setEmailError(emailCheck[1]);
			ClearEmailError(5000);
			return;
		}

		if(usrnmCheck[0]===false){
			ResetButton();
			setUsernameIcon(2);
			setUsernameError(usrnmCheck[1]);
			ClearUsernameError(5000);
			return;
		}

		if(passwordCheck[0]===false){
			ResetButton();
			setPasswordError(passwordCheck[1]);
			ClearPasswordError(5000);
			return;
		}

		if(password!==passwordAgain){
			ResetButton();
			setLowestError('Passwords dont match');
			ClearLowestError(5000);
			return;
		}

		try {
			const user = await authService.register({
				username, email, password,
			})
			console.log(user);
			setUsername('');
			setEmail('');
			setPassword('');
			setPasswordAgain('');
			ResetButton();
			selectionFunc(0);
		} catch (exception) {
			console.log(exception);
			ResetButton();
			setError('Failed to register account, please try again later');
			setTimeout(() => {
				setError('')
			}, 5000);
		}
	};

    return(
	<form onSubmit={handleRegister} className='loginForm'>
        <div className='usernameTextContainer'>Username</div>
        <div className='usernameContainer'>
            <input 
				type="text" 
				value={username} 
				className='usernameInput'  
				placeholder="Username..."
				onChange={handleUsernameChange}
			></input>
			<div className='usernameIconCheck'>
				{usernameUniqueIcon===0 && <BsQuestion size='20px' color={`rgb(70, 70, 70)`} />}
				{usernameUniqueIcon===1 && <BsCheck size='20px' color={`rgb(65, 228, 112)`} />}
				{usernameUniqueIcon===2 && <BsX size='20px' color={`rgb(255, 80, 80)`} />}
			</div>
        </div>

		<div className='userNameErrorText2'>{usernameError}</div>

        <div className='emailTextContainer'>Email</div>
        <div className='emailContainer'>
            <input 
				type="text" 
				value={email} 
				className='emailInput'  
				placeholder="example@gmail.com"
				onChange={handleEmailChange}
			></input>
			<div className='usernameIconCheck'>
				{emailUniqueIcon===0 && <BsQuestion size='20px' color={`rgb(70, 70, 70)`} />}
				{emailUniqueIcon===1 && <BsCheck size='20px' color={`rgb(65, 228, 112)`} />}
				{emailUniqueIcon===2 && <BsX size='20px' color={`rgb(255, 80, 80)`} />}
			</div>
        </div>

		<div className='userNameErrorText2'>{emailError}</div>

        <div className='passwordTextContainer'>Password</div>
        <div className='passwordContainer'>
            <input 
				type="password" 
				value={password} 
				className='passwordInput'  
				placeholder="Type your password..."
				onChange={handlePasswordChange}
			></input>
			<div className='usernameIconCheck'>
				{passwordIcon===0 && <BsQuestion size='20px' color={`rgb(70, 70, 70)`} />}
				{passwordIcon===1 && <BsCheck size='20px' color={`rgb(65, 228, 112)`} />}
				{passwordIcon===2 && <BsX size='20px' color={`rgb(255, 80, 80)`} />}
			</div>
        </div>

		<div className='userNameErrorText2'>{passwordError}</div>

        <div className='passwordTextContainer'>Password again</div>
        <div className='passwordContainer'>
            <input 
				type="password" 
				value={passwordAgain} 
				className='passwordInput'  
				placeholder="Repeat your password..."
				onChange={handlePasswordAgainChange}
			></input>
			<div className='usernameIconCheck'>
				{passwordAgainIcon===0 && <BsQuestion size='20px' color={`rgb(70, 70, 70)`} />}
				{passwordAgainIcon===1 && <BsCheck size='20px' color={`rgb(65, 228, 112)`} />}
				{passwordAgainIcon===2 && <BsX size='20px' color={`rgb(255, 80, 80)`} />}
			</div>
        </div>

		<div className='userNameErrorText2'>{lowestError}</div>

		<button className='registerButton' type='submit'>{buttonText}</button>
	</form>
    )
}

export const AuthenticationView = ({setUserFunc}: {setUserFunc:any}) => {
    const [currentSelection, setCurrentSelection] = useState(0);
	const [errorMessageS, setErrorMessageS] = useState('');
	const [errorMessageR, setErrorMessageR] = useState('');

	const SetErrorS = (er:string) => {
		setErrorMessageS(er);
	}

	const SetErrorR = (er:string) => {
		setErrorMessageR(er);
		setTimeout(() => {
			setErrorMessageR('');
		},5000)
	}

    const selectionChange = (id: number) => {
        setCurrentSelection(id);
    }

    return(
        <>
        <div className="containerMainAuth">
            <div className="authViewName">Authentication</div>

            <div className={`authContainer${currentSelection===0 ? 'S' : 'R'}`}>
                <div className='authFlexCont'>
                    <div className='signInIcon'>

                    </div>
                    <div className='choiceContainer'>
                        <div className={`signInChoice${currentSelection===0 ? 'A' : ''}`} onClick={() => selectionChange(0)}>Sign In</div>
                        <div className={`registerChoice${currentSelection===1 ? 'A' : ''}`} onClick={() => selectionChange(1)}>Register</div>
                    </div>

                    {currentSelection===0 && <SignInView setUserFunc={setUserFunc} setError={SetErrorS} errorText={errorMessageS}/>}
                    {currentSelection===1 && <RegisterView selectionFunc={selectionChange} setError={SetErrorR} errorText={errorMessageR}/>}
                    
                </div>
            </div>

            <div className={`emptyCont${currentSelection===0 ? 'S' : 'R'}`}></div>
        </div>
        </>
    )
}