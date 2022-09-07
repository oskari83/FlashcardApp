import './ProfileView.css';
import { useState } from 'react';

export const ProfileView = () => {
    const [emailChange, setEmailChange] = useState(0);
    const [pwChange, setPwChange] = useState(0);

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
                <div className='usernameText'>Username: oskari83</div>
                <div className='emailText'>
                    { emailChange === 0 ? 
                    <>
                        <div className='emailAddress'>Email: oskpelto@gmail.com</div>
                        <div className='emailChangeButton' onClick={() => emailChangeStatus(1)}>Change</div>
                    </>
                    :
                    <>
                        <div className='emailAddress'>Email: oskpelto@gmail.com</div>
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
                <div className='statText'>Collections created: 8</div>
                <div className='statText'>Collections saved: 2</div>
                <div className='statText'>Collections progress: 12%</div>
                <div className='statTextBottom'>Account created: 12.02.2021</div>
            </div>

            <div className='emptyContainer'></div>
        </div>
        </>
    )
}