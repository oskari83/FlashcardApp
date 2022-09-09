import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'
import { Card } from '../Card/Card';
import './FlipMode.css';

export const FlipMode = () => {
    return(
        <div>
            <div className='aboveCard'>
                <div className='aboveCardInner'>
                    <div className='cardOutOf'>Card 4/55</div>
                    <div className='randomOuterOuter'>
                        <div className='randomOuter'>
                            <div className='randomizeText'>
                            <label className='randomOrder'>
                                <input type="checkbox" className='checkBoxStyle'/>
                                <span className='checkmark'>
                                <div className='innerCircle'></div>
                                </span>
                            </label>
                            </div>
                        </div>
                        <div>Random order</div>
                    </div>
                </div>
            </div>

            <div className='cardRowContainer'>
                <div className='leftButton'>
                    <MdKeyboardArrowLeft size='20px' color="gray" />
                </div>
                <div className="cardcontainer">
                    <Card cardFrontText='front' cardBackText='back'/>
                </div>
                <div className='rightButton'>
                    <MdKeyboardArrowRight size='20px' color="gray" />
                </div>
            </div>

            <div className='mobileleftandright'>
                <div className='mobileInner'>
                    <div className='mobileLeft'>
                    <MdKeyboardArrowLeft size='20px' color="gray" />
                    </div>
                    <div className='mobileRight'>
                    <MdKeyboardArrowRight size='20px' color="gray" />
                    </div>
                </div>
            </div>

            <div className='belowCard'>
                <div className='belowCardInner'>
                    <div className='feedButtonNeg'>-1</div>
                    <div className='feedButtonNeut'>0</div>
                    <div className='feedButtonPos'>+1</div>
                </div>
            </div>
        </div>
    )
}