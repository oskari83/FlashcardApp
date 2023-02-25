import './RecoverView.css';
import { useState, SyntheticEvent } from 'react';
import authService from '../../services/auth';
import { useNavigate } from 'react-router-dom';

const RecoverSuccessView = () => {
	const navigate = useNavigate();

    return(
        <button className='sendButton' onClick={() => navigate('/getstarted')}>Return to Sign In</button>
    )
}

const RecoverPasswordView = ({setError, errorText, selectionChangeFunc}: {setError:any, errorText:string, selectionChangeFunc:any}) => {
	const [email, setEmail] = useState(''); 
	const [buttonText, setButtonText] = useState('Recover Password'); 

	const ResetButton = () => {
		setButtonText('Recover Password');
	}

	const handleLogin = async (event: SyntheticEvent) => {
		event.preventDefault();
		setButtonText('Loading...');

		try {
			const user = await authService.recover({
				email
			});
 
			console.log(user);
			setEmail('');
			selectionChangeFunc(3);
		} catch (exception) {
			console.log("failed");
			ResetButton();
			setError('Encountered a problem, please try again');
			setTimeout(() => {
				setError('');
			}, 5000);
		}
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setEmail(val);
    };

    return(
    <form onSubmit={handleLogin} className='recoverForm'>
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

		<div className='userNameErrorText'>{errorText}</div>

        <button className='sendButton' type='submit'>{buttonText}</button>
	</form>
    )
}

export const RecoverView = () => {
    const [currentSelection, setCurrentSelection] = useState(2);
	const [errorMessageR, setErrorMessageR] = useState('');


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
				<div className={`authContainer${currentSelection===2 ? 'E' : 'F'}`}>
					<div className='authFlexCont'>
						<div className='choiceContainer'>
							<div className={`recoverTitle`}>Recover Password</div>
						</div>
						{currentSelection===2 && 
						<>
						<div className='recoveryText'>
							Please input the email address associated with your account. We will then send you a password recovery email.
						</div>
						</>
						}
						{currentSelection===3 && 
						<>
						<div className='recoveryTextSuccess'>
							Recovery email sent. Please check your inbox and follow the instructions given in the email.
						</div>
						</>
						}

						{currentSelection===2 && <RecoverPasswordView setError={SetErrorR} errorText={errorMessageR} selectionChangeFunc={selectionChange}/>}
						{currentSelection===3 && <RecoverSuccessView />}
					
					</div>
				</div>
			<div className={`emptyCont${currentSelection===2 ? 'E' : 'F'}`}></div>
        </div>
        </>
    )
}