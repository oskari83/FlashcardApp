import './HomeView.css';
import { FaUserGraduate } from "react-icons/fa"

const NotYetAuthComponent = () => {
    return(
        <div className='authPossiblyContainer'>
            <div className='authPossiblyText'>Register now to create your own collections and start studying!</div>
            <div className='takeToAuthButton'>Register</div>
        </div>
    )
}

export const HomeView = () => {
    return(
        <>
        <div className="homeContainerMain">
            <div className='profileCont'>
                <div className='leftSideCont'>
                    <div className='profileIcon'>
                        <FaUserGraduate size='20px' color={`rgba(47, 110, 255, 0.8)`} />
                    </div>
                    <div className='profileUsernameText'>oskari83</div>
                </div>
                <div className='rightSideCont'>
                    <div className='learningStreakText'>1 day in a row</div>
                    <div className='learningStreakCont'>
                        <div className='learningStreakBoxGreen'></div>
                        <div className='learningStreakBoxGreen'></div>
                        <div className='learningStreakBoxGray'></div>
                        <div className='learningStreakBoxGray'></div>
                        <div className='learningStreakBoxGreen'></div>
                        <div className='learningStreakBoxGray'></div>
                        <div className='learningStreakBoxGreen'></div>
                    </div>
                </div>
            </div>

            <div className='mainHomeContainer'>
                
            </div>
        </div>
        </>
    )
}