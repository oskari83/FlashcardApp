import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'
import { CollectionItem } from '../../types';
import { useState, useEffect } from 'react';
import userService from '../../services/user';
import Card from '../Card/Card';
import './FlipMode.css';

const FinishedComponent = ({restartFunc}:{restartFunc:any}) => {
    return(
      <div className={'thecardFinished'}>
          <div className="thefrontFinished noselect">
            <div className="fronttextFinished noselect">Hooray🥳🎉, finished revising collection</div>
			<div className='fronttextFinishedClickToRestart' onClick={restartFunc}>Click to restart</div>
          </div>
      </div>
    );
};

export const FlipMode = ({items, itemdata, created, userId, notFunction, id, setRefresh}:{items:CollectionItem[] | undefined, itemdata:any, created:boolean, userId:string, notFunction:any, id:any, setRefresh:any}) => {
	const [order,setOrder] = useState(true);
	const [itemIndex,setItemIndex] = useState(0);
	const [isRotated, setRotate] = useState(false);
	const [cardClass, setCardClass] = useState('thecard');
	const [itemsToShow, SetItems] = useState<any[]>([]);
	const [finishedPanel, setFinishedPanel] = useState(false);
	const [combinedItems, setCombinedItems] = useState<any[]>([]);
	
	useEffect(() => {
		if(items!==undefined && Object.keys(itemdata).length !== 0){
			const datadata = itemdata.data;
			const combinedStuff = items.map(t1 => ({...t1, ...datadata.find((t2:any) => t2.uniqueId === t1.uniqueId)}));
			SetItems(combinedStuff);	
			setCombinedItems(combinedStuff);
		}	
	}, [items,itemdata]);

	const CreateRandomOrder = () => {
		const sortedItems = [...combinedItems].sort((a,b) => 0.5 - Math.random());
		SetItems(sortedItems);
	}

	const SetNormalOrder = () => {
		SetItems(combinedItems);
	}

	const cardData = itemsToShow.length>0 ? {
		front: itemsToShow[itemIndex].qside,
		back: itemsToShow[itemIndex].aside
	} : {front: '', back: ''}

	const giveFeedBack = (op:number) => {
		if(created){
			const updateDataObject = {
				colId: id,
				uniqueId: itemsToShow[itemIndex].uniqueId,
				operation: op,
			}
			userService
				.updateOwnData(userId,updateDataObject)
				.then(resp => {
					console.log(resp);
					setRefresh();
				})
				.catch(error => {
					if(error.code==="ERR_NETWORK"){
						notFunction('Network error - please check your internet connection!',5000);
					}else{
						notFunction(error.message,5000);
					}
					if(error.response.data.error==='token expired'){
						window.localStorage.clear();
						window.location.reload();
					}
					console.log(error);
				});
		}else{
			const updateDataObject = {
				colId: id,
				uniqueId: itemsToShow[itemIndex].uniqueId,
				operation: op,
			}
			userService
				.updateSavedData(userId,updateDataObject)
				.then(resp => {
					console.log(resp);
					setRefresh();
				})
				.catch(error => {
					if(error.code==="ERR_NETWORK"){
						notFunction('Network error - please check your internet connection!',5000);
					}else{
						notFunction(error.message,5000);
					}
					if(error.response.data.error==='token expired'){
						window.localStorage.clear();
						window.location.reload();
					}
					console.log(error);
				});
		}
        IncrementIndex();
    }

	const IncrementIndex = () => {
		if(itemsToShow!==undefined && itemIndex!==(itemsToShow.length)-1){
			setItemIndex((ind) => ind+1);
		}else if (itemsToShow!== undefined && itemIndex===itemsToShow.length-1){
			setFinishedPanel(true);
		}
		AutoRotateOnSwitch();
	}

	const DecrementIndex = () => {
		if(itemIndex!==0){
			if(finishedPanel){
				setFinishedPanel(false);
			}else{
				setItemIndex((ind) => ind-1);
			}
		}
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

	const RestartFlipping = () => {
		setFinishedPanel(false);
		setItemIndex(0);
		setCardClass('thecard');
		setRotate(false);
	}

    return(
        <div className='flipModeOuter'>
            <div className='aboveCard'>
                <div className='aboveCardInner'>
                    <div className='cardOutOf'>
					{finishedPanel && 'Finished collection!'}
					{!finishedPanel &&
						`Card: ${itemIndex+1}/${itemsToShow?.length}`
					}
					</div>
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
                <div className='leftButton noselect' onClick={() => DecrementIndex()}>
                    <MdKeyboardArrowLeft size='20px' color="gray" />
                </div>
                <div className="cardcontainer">
					{finishedPanel && <FinishedComponent restartFunc={RestartFlipping}/>}
					{!finishedPanel &&
						<Card cardFrontText={cardData.front} cardBackText={cardData.back} cardClass={cardClass} rotateFunc={RotateCard}/>
					}
                </div>
                <div className='rightButton noselect' onClick={() => IncrementIndex()}>
                    <MdKeyboardArrowRight size='20px' color="gray" />
                </div>
            </div>

            <div className='mobileleftandright'>
                <div className='mobileInner'>
                    <div className='mobileLeft noselect' onClick={() => DecrementIndex()}>
                    <MdKeyboardArrowLeft size='20px' color="gray" />
                    </div>
                    <div className='mobileRight noselect' onClick={() => IncrementIndex()}>
                    <MdKeyboardArrowRight size='20px' color="gray" />
                    </div>
                </div>
            </div>

            <div className='belowCard'>
                <div className='belowCardInner'>
                    <div className='feedButtonNeg noselect' onClick={() => giveFeedBack(0)}>-1</div>
                    <div className='feedButtonNeut noselect' onClick={() => giveFeedBack(1)}>0</div>
                    <div className='feedButtonPos noselect' onClick={() => giveFeedBack(2)}>+1</div>
                </div>
            </div>
        </div>
    )
}