import { AiOutlineLoading } from "react-icons/ai";
import './Loading.css';

export const Loading = () => {
    return(
        <div className='loadingIcon'>
            <AiOutlineLoading size='40px' color={`rgb(190, 190, 190)`} />
        </div>
    )
}