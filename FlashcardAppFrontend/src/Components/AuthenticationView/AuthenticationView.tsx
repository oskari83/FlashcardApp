import './AuthenticationView.css';
import { useState } from 'react';

const SignInView = () => {
    return(
    <>
        <div className='emailTextContainer'>Email</div>
        <div className='emailContainer'>
            <input type="text" className='emailInput'  placeholder="example@gmail.com"></input>
        </div>
        <div className='passwordTextContainer'>Password</div>
        <div className='passwordContainer'>
            <input type="password" className='passwordInput'  placeholder="Type your password..."></input>
        </div>
        <div className='signinButton'>Sign In</div>
    </>
    )
}

const RegisterView = () => {
    return(
    <>
        <div className='usernameTextContainer'>Username</div>
        <div className='usernameContainer'>
            <input type="text" className='usernameInput'  placeholder="Username..."></input>
        </div>
        <div className='emailTextContainer'>Email</div>
        <div className='emailContainer'>
            <input type="text" className='emailInput'  placeholder="example@gmail.com"></input>
        </div>
        <div className='passwordTextContainer'>Password</div>
        <div className='passwordContainer'>
            <input type="password" className='passwordInput'  placeholder="Type your password..."></input>
        </div>
        <div className='passwordTextContainer'>Password again</div>
        <div className='passwordContainer'>
            <input type="password" className='passwordInput'  placeholder="Repeat your password..."></input>
        </div>
        <div className='signinButton'>Register</div>
    </>
    )
}

export const AuthenticationView = () => {
    const [currentSelection, setCurrentSelection] = useState(0);

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

                    {currentSelection===0 && <SignInView />}
                    {currentSelection===1 && <RegisterView />}
                    
                </div>
            </div>

            <div className={`emptyCont${currentSelection===0 ? 'S' : 'R'}`}></div>
        </div>
        </>
    )
}