import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './ProfileView.css';

export const ProfileView = ({logoutFunc, user, createdA, savedA}:{logoutFunc:any, user:any, savedA:number, createdA:number}) => {
    const [emailChange, setEmailChange] = useState(0);
    const [pwChange, setPwChange] = useState(0);
	const navigate = useNavigate();

	const LogoutOfAccount = () => {
		logoutFunc();
		navigate('/');
	}

    const emailChangeStatus = (id: number) => {
        setEmailChange(id);
    }

    const pwChangeStatus = (id: number) => {
        setPwChange(id);
    }

    const emailChangeSubmit = () => {
        emailChangeStatus(0);
        console.log('email changed');
    }

    const emailChangeCancel = () => {
        emailChangeStatus(0);
    }

    const pwChangeSubmit = () => {
        setPwChange(0);
        console.log('password changed');
    }

    const pwChangeCancel = () => {
        setPwChange(0);
    }

    return(
        <>
        <div className="containerMainProf">
            <div className="profViewName">Profile</div>

            <div className='profileContainer'>
                <div className='accountDetailsText'>Account Details</div>
                <div className='usernameText'>Username: {user.username}</div>
                <div className='emailText'>
                    { emailChange === 0 ? 
                    <>
                        <div className='emailAddress'>Email: {user.email}</div>
                        <div className='emailChangeButton' onClick={() => emailChangeStatus(1)}>Change</div>
                    </>
                    :
                    <>
                        <div className='emailAddress'>Email: {user.email}</div>
                    </>
                    }
                </div>

                { emailChange === 0 ? 
                <>
                </>
                :
                <>
                    <div className='emailChangeContainer'>
                        <div className='emailAddress'>New:</div>
                        <input type="text" className='emailChangeInput'  placeholder="email here..."></input>
                        <div className='emailChangeButton' onClick={() => emailChangeSubmit()}>Submit</div>
                        <div className='emailChangeCancelButton' onClick={() => emailChangeCancel()}>Cancel</div>
                    </div>
                </>
                }

                <div className='passwordText'>
                    { pwChange === 0 ? 
                    <>
                        <div className='apw'>Password: *******</div>
                        <div className='pwChangeButton' onClick={() => pwChangeStatus(1)}>Change</div>
                    </>
                    :
                    <>
                        <div className='apw'>Password: *******</div>
                    </>
                    }
                </div>

                { pwChange === 0 ? 
                <>
                </>
                :
                <>
                    <div className='pwChangeContainer'>
                    <div className='apw'>New:</div>
                        <input type="text" className='pwChangeInput'  placeholder="password here..."></input>
                        <div className='pwChangeButton' onClick={() => pwChangeSubmit()}>Submit</div>
                        <div className='pwChangeCancelButton' onClick={() => pwChangeCancel()}>Cancel</div>
                    </div>
                </>
                }

                <div className='statsDetailsText'>Statistics</div>
                <div className='statText'>Collections created: {createdA}</div>
                <div className='statText'>Collections saved: {savedA}</div>
                <div className='statText'>Collections progress: {'null'}%</div>
                <div className='statTextBottom'>Account created: {'null'}</div>

				<div className='logoutButton' onClick={() => LogoutOfAccount()}>Sign Out</div>
            </div>

            <div className='emptyContainer'></div>
        </div>
        </>
    )
}