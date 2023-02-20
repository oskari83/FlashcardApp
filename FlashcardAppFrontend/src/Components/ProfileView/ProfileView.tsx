import { useNavigate } from 'react-router-dom';
import './ProfileView.css';

export const ProfileView = ({logoutFunc, user, createdA, savedA}:{logoutFunc:any, user:any, savedA:number, createdA:number}) => {
	const navigate = useNavigate();

	const LogoutOfAccount = () => {
		logoutFunc();
		window.localStorage.removeItem('rememberPassword');
		navigate('/');
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