import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'
import { CollectionItem } from '../../types';
import Card from '../Card/Card';
import { useState, useEffect } from 'react';
import './FlipMode.css';

export const FlipMode = ({items}:{items:CollectionItem[] | undefined}) => {
	const [order,setOrder] = useState(true);
	const [itemIndex,setItemIndex] = useState(0);
	const [isRotated, setRotate] = useState(false);
	const [cardClass, setCardClass] = useState('thecard');
	const [itemsToShow, SetItems] = useState(items);

	const CreateRandomOrder = () => {
		if(items!==undefined){
			const sortedItems = [...items].sort((a,b) => 0.5 - Math.random());
			SetItems(sortedItems);
		}else{
			SetItems([]);
		}
	}

	const SetNormalOrder = () => {
		SetItems(items);
	}

	if(itemsToShow===undefined){
		SetItems(items);
	}

	const cardData = itemsToShow!==undefined ? {
		front: itemsToShow[itemIndex].qside,
		back: itemsToShow[itemIndex].aside
	} : {front: '', back: ''}

	const IncrementIndex = () => {
		setItemIndex(itemIndex+1);
		AutoRotateOnSwitch();
	}

	const DecrementIndex = () => {
		setItemIndex(itemIndex-1);
		AutoRotateOnSwitch();
	}

	const AutoRotateOnSwitch  = () => {
		const cardclassname = isRotated ? 'thecardNoAnim' : 'thecard';
		setCardClass(cardclassname);
		if(isRotated){
			SwitchStatus();
		}
	}

	const RotateCard = () => {
		const cclass = (isRotated ? 'thecard' : 'thecardRotated');
		setCardClass(cclass);
		SwitchStatus();
	}

	const SwitchStatus = () => {
		setRotate((rotated) => {
			//console.log("setting to", !rotated);
			return !rotated;
		});
	}

	const setRandom = () => {
		if(order){
			CreateRandomOrder();
		}else{
			SetNormalOrder();
		}
		setOrder((order) => !order);
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
                                <input type="checkbox" className='checkBoxStyle' onClick={() => setRandom()}/>
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
                    <Card cardFrontText={cardData.front} cardBackText={cardData.back} cardClass={cardClass} rotateFunc={RotateCard}/>
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