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
				<div className='emailText'>Email: {user.email}</div>

                <div className='statsDetailsText'>Statistics</div>
                <div className='statText'>Collections created: {createdA}</div>
                <div className='statTextBottom'>Collections saved: {savedA}</div>

				<div className='logoutButton' onClick={() => LogoutOfAccount()}>Sign Out</div>
            </div>

            <div className='emptyContainer'></div>
        </div>
        </>
    )
}