import './Notification.css';
import { AiFillWarning } from 'react-icons/ai';

export const Notification = ({text}: {text: string}) => {
    return(
        <div className={`notificationContainer${text === '' ? '' : 'A'}`}>
            <div className='notificationIcon'><AiFillWarning size='20px' color={`rgb(255, 255, 255)`} /></div>
            <div className='notificationMessage'>{text}</div>
        </div>
    )
}