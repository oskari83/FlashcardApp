import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'
import { CollectionItem } from '../../types';
import Card from '../Card/Card';
import { useState, useEffect, useRef } from 'react';
import './FlipMode.css';

export const FlipMode = ({items}:{items:CollectionItem[] | undefined}) => {
	const [order,setOrder] = useState(0);
	let itemsToShow = order===0 ? items : items?.sort((a,b) => 0.5 - Math.random());
	const [itemIndex,setItemIndex] = useState(0);

	const cardRef = useRef<any>()
	const cur: {onRotateBack:any} | undefined = cardRef.current;

	if(itemsToShow===undefined){
		itemsToShow=[];
	}

	const cardData = {
		front: itemsToShow[itemIndex].qside,
		back: itemsToShow[itemIndex].aside
	}

	const IncrementIndex = () => {
		if(cur){
			cur.onRotateBack();
		}
		setTimeout(() => {
			setItemIndex(itemIndex+1);
		},200);
	}

	const DecrementIndex = () => {
		if(cur){
			cur.onRotateBack();
		}
		setTimeout(() => {
			setItemIndex(itemIndex-1);
		},200);
	}

    return(
        <div className='flipModeOuter'>
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
                <div className='leftButton' onClick={() => DecrementIndex()}>
                    <MdKeyboardArrowLeft size='20px' color="gray" />
                </div>
                <div className="cardcontainer">
                    <Card ref={cardRef} cardFrontText={cardData.front} cardBackText={cardData.back}/>
                </div>
                <div className='rightButton' onClick={() => IncrementIndex()}>
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