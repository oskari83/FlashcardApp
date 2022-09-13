import './AuthenticationView.css';
import { useState, SyntheticEvent } from 'react';
import authService from '../../services/auth';
import collectionService from '../../services/collections';

const ErrorMessageComponent = () => {
	return(
		<div className='loginError'>
			<div className='loginErrorText'>Incorrect email or password</div>
		</div>
	)
}

const SignInView = ({setUserFunc, setError, errorText}: {setUserFunc:any, setError:any, errorText:string}) => {
	const [email, setEmail] = useState(''); 
	const [password, setPassword] = useState(''); 

	const handleLogin = async (event: SyntheticEvent) => {
		event.preventDefault();
		console.log('logging in with', email, password);

		try {
			const user = await authService.login({
				email, password,
			})
			window.localStorage.setItem(
				'loggedFlashcardAppUser', JSON.stringify(user)
			); 
			collectionService.setToken(user.token);
			setUserFunc(user);
			setEmail('');
			setPassword('');
		} catch (exception) {
			console.log("failed");
			setError('Incorrect email or password')
			setTimeout(() => {
				setError('')
			}, 5000)
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
				className='emailInput'  
				placeholder="example@gmail.com"
				onChange={handleEmailChange}
			></input>
        </div>
        <div className='passwordTextContainer'>Password</div>
        <div className='passwordContainer'>
            <input 
				type="password" 
				value={password} 
				className='passwordInput'  
				placeholder="Type your password..."
				onChange={handlePasswordChange}
			></input>
        </div>
		{errorText!=='' && <ErrorMessageComponent />}
        <button className='signinButton' type='submit'>Sign In</button>
	</form>
    )
}

const RegisterView = ({selectionFunc, setError, errorText}: {selectionFunc:any, setError:any, errorText:string}) => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState(''); 
	const [password, setPassword] = useState(''); 
	const [passwordAgain, setPasswordAgain] = useState(''); 

	const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setUsername(val);
    };

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setEmail(val);
    };

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setPassword(val);
    };

	const handlePasswordAgainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setPasswordAgain(val);
    };

	const handleRegister = async (event: SyntheticEvent) => {
		event.preventDefault();
		console.log('registering with', username, email, password);
		if(password!==passwordAgain){
			return setError('Passwords dont match');
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
			selectionFunc(0);
		} catch (exception) {
			console.log(exception);
			setError('Failed to register account, please try again later')
			setTimeout(() => {
				setError('')
			}, 5000)
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
        </div>
        <div className='emailTextContainer'>Email</div>
        <div className='emailContainer'>
            <input 
				type="text" 
				value={email} 
				className='emailInput'  
				placeholder="example@gmail.com"
				onChange={handleEmailChange}
			></input>
        </div>
        <div className='passwordTextContainer'>Password</div>
        <div className='passwordContainer'>
            <input 
				type="password" 
				value={password} 
				className='passwordInput'  
				placeholder="Type your password..."
				onChange={handlePasswordChange}
			></input>
        </div>
        <div className='passwordTextContainer'>Password again</div>
        <div className='passwordContainer'>
            <input 
				type="password" 
				value={passwordAgain} 
				className='passwordInput'  
				placeholder="Repeat your password..."
				onChange={handlePasswordAgainChange}
			></input>
        </div>
		{errorText!=='' && <ErrorMessageComponent />}
		<button className='signinButton' type='submit'>Register</button>
	</form>
    )
}

export const AuthenticationView = ({setUserFunc}: {setUserFunc:any}) => {
    const [currentSelection, setCurrentSelection] = useState(0);
	const [errorMessage, setErrorMessage] = useState('');

	const SetError = (er:string) => {
		setErrorMessage(er);
	}

    const selectionChange = (id: number) => {
        setCurrentSelection(id);
    }

    return(
        <>
        <div className="containerMainAuth">
            <div className="authViewName">Authentication</div>

            <div className={`authContainer${currentSelection===0 ? 
				errorMessage==='' ? 'S' : 'SN' :
				errorMessage==='' ? 'R' : 'RN' }`}>
                <div className='authFlexCont'>
                    <div className='signInIcon'>

                    </div>
                    <div className='choiceContainer'>
                        <div className={`signInChoice${currentSelection===0 ? 'A' : ''}`} onClick={() => selectionChange(0)}>Sign In</div>
                        <div className={`registerChoice${currentSelection===1 ? 'A' : ''}`} onClick={() => selectionChange(1)}>Register</div>
                    </div>

                    {currentSelection===0 && <SignInView setUserFunc={setUserFunc} setError={SetError} errorText={errorMessage}/>}
                    {currentSelection===1 && <RegisterView selectionFunc={selectionChange} setError={SetError} errorText={errorMessage}/>}
                    
                </div>
            </div>

            <div className={`emptyCont${currentSelection===0 ? 'S' : 'R'}`}></div>
        </div>
        </>
    )
}