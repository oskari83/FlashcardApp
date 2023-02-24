import './ResetView.css';
import { useState, SyntheticEvent } from 'react';
import authService from '../../services/auth';
import { BsQuestion, BsCheck, BsX } from 'react-icons/bs';
import {  CheckPassword } from '../../Utils/validation';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ResetPasswordView = ({setError, errorText}: {setError:any, errorText:string }) => {
	const [password, setPassword] = useState(''); 
	const [passwordErrorTimeout, setPasswordErrorTimeout] = useState<null | NodeJS.Timeout>(null);
	const [buttonText, setButtonText] = useState('Set Password');
	const [passwordIcon, setPasswordIcon] = useState(0);
	const [searchParams, setSearchParams] = useSearchParams();
	const [lowestError, setLowestError] = useState('');

	const navigate = useNavigate();

	const key = searchParams.get("key");
	const email = searchParams.get("email");

	const ResetButton = () => {
		setButtonText('Set Password');
	}

	if(errorText!=='' && lowestError===''){
		setLowestError(errorText);
	}

	const ClearLowestError = (time:number) => {
		if(passwordErrorTimeout){
			clearTimeout(passwordErrorTimeout);
		}
		const timeoutPA = setTimeout(() => {
			setLowestError('');
		},time);
		setPasswordErrorTimeout(timeoutPA);
	}

	const CheckPasswordFunc = async (password: string) => {
		const passwordCheck_ = CheckPassword(password);
		if(passwordCheck_[0]===false){
			setLowestError(passwordCheck_[1]);
			ClearLowestError(5000);
			setPasswordIcon(2);
			return;
		}
		setPasswordIcon(1);
		setLowestError('');
	}

	const handleReset = async (event: SyntheticEvent) => {
		event.preventDefault();
		setButtonText('Loading...');

		const passwordCheck = CheckPassword(password);
		if(passwordCheck[0]===false){
			ResetButton();
			setLowestError(passwordCheck[1]);
			ClearLowestError(5000);
			return;
		}

		try {
			const user = await authService.reset({
				key, email, password
			});
 
			console.log(user);
			setPassword('');
			navigate('/getstarted');
		} catch (exception) {
			console.log("failed");
			ResetButton();
			setError('Encountered a problem, please try again');
			setTimeout(() => {
				setError('');
			}, 5000);
		}
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setPassword(val);
		CheckPasswordFunc(val);
    };

    return(
    <form onSubmit={handleReset} className='resetForm'>
        <div className='newPasswordTextContainer'>New Password</div>
        <div className='newpasswordContainer'>
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

		<div className='newPassowrdErrorText'>{lowestError}</div>

        <button className='sendButton' type='submit'>{buttonText}</button>
	</form>
    )
}

export const ResetView = () => {
	const [errorMessageR, setErrorMessageR] = useState('');

	const SetErrorR = (er:string) => {
		setErrorMessageR(er);
		setTimeout(() => {
			setErrorMessageR('');
		},5000)
	}

    return(
        <>
        <div className="containerMainAuthReset">
            <div className="authViewNameReset">Authentication</div>

            <div className={`authContainerReset`}>
                <div className='authFlexContReset'>
					<div className='choiceContainerReset'>
						<div className={`resetTitle`}>Reset Password</div>
					</div>
					<div className='resetText'>
							Please type in a new password for your account.
					</div>
					<ResetPasswordView setError={SetErrorR} errorText={errorMessageR}/>
                </div>
            </div>

            <div className={`emptyContainerReset`}></div>

        </div>
        </>
    )
}