import './AuthenticationView.css';
import { useState } from 'react';

export const AuthenticationView = () => {
    const [currentSelection, setCurrentSelection] = useState(0);

    const selectionChange = (id: number) => {
        setCurrentSelection(id);
    }

    return(
        <>
        <div className="containerMainAuth">
            <div className="authViewName">Authentication</div>

            <div className='authContainer'>
                <div className='authFlexCont'>
                    <div className='signInIcon'>

                    </div>
                    <div className='choiceContainer'>
                        <div className={`signInChoice${currentSelection===0 ? 'A' : ''}`} onClick={() => selectionChange(0)}>Sign In</div>
                        <div className={`registerChoice${currentSelection===1 ? 'A' : ''}`} onClick={() => selectionChange(1)}>Register</div>
                    </div>
                    <div className='emailTextContainer'>Email</div>
                    <div className='emailContainer'>
                        <input type="text" className='emailInput'  placeholder="example@gmail.com"></input>
                    </div>
                    <div className='passwordTextContainer'>Password</div>
                    <div className='passwordContainer'>
                        <input type="password" className='passwordInput'  placeholder="Type your password..."></input>
                    </div>
                    <div className='signinButton'>Sign In</div>
                </div>
            </div>

            <div className='emptyCont'></div>
        </div>
        </>
    )
}