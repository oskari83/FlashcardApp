import { FlipMode } from '../FlipMode/FlipMode';
import { RevealMode } from '../RevealMode/RevealMode';
import { StatisticsTable } from '../StatisticsTable/StatisticsTable';
import { CollectionEdit } from '../CollectionEdit/CollectionEdit';
import { IoMdStats, IoMdPlay } from 'react-icons/io';
import { AiFillEdit } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { PossiblyEmptyCollectionData, PossiblyEmptyData } from '../../types';
import { Loading } from '../Loading/Loading';
import { useParams } from "react-router-dom";
import { Notification } from '../Notification/Notification';
import collectionService from '../../services/collections';
import userService from '../../services/user';
import './CollectionView.css';

export const CollectionView = ({userId}: {userId:string}) => {
    const [currentSelection, setCurrentSelection] = useState(0);
    const [bookmarked, setBookmarked] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState('');
	const [notificationTimeout, setNotificationTimeout] = useState<null | NodeJS.Timeout>(null);
	const [id, setID] = useState(useParams().id);
	const [collection, setCollection] = useState<PossiblyEmptyCollectionData>({});
	const [colData, setColData] = useState<PossiblyEmptyData>({});
	const [loadingStatus, setLoadingStatus] = useState(2);

	const ClearNotificationError = (time:number) => {
		if(notificationTimeout){
			clearTimeout(notificationTimeout);
		}
		const timeoutN = setTimeout(() => {
			setNotificationMessage('');
		},time);
		setNotificationTimeout(timeoutN);
	}

	const SetNotificaiton = (text:string,time:number) => {
		setNotificationMessage(text);
		ClearNotificationError(time);
	}

	useEffect(() => {
		console.log('i fire once',id);
		if(id!==undefined){
			collectionService
				.getSingle(id)
				.then(initialCollection => {
					console.log(initialCollection);
					setCollection(initialCollection);
					setLoadingStatus((n:number) => n-1);
				})
				.catch(error => {
					if(error.code==="ERR_NETWORK"){
						SetNotificaiton('Network error - please check your internet connection!',5000);
					}else{
						SetNotificaiton(error.message,5000);
					}
					console.log(error);
				});

			userService
				.getData(userId,id)
				.then((data:PossiblyEmptyData) => {
					console.log(data)
					setColData(data);
					setLoadingStatus((n:number) => n-1);
				})
				.catch((error:any) => {
					if(error.code==="ERR_NETWORK"){
						SetNotificaiton('Network error - please check your internet connection!',5000);
					}else{
						SetNotificaiton(error.message,5000);
					}
					console.log(error);
				});
		}
    }, [id]);


    const bookmarkThis = () => {
        setBookmarked(!bookmarked);
    }

    const selectionChange = (id: number) => {
        setCurrentSelection(id)
    }

    return(
        <>
        <div className="containerMain">
			<Notification text={notificationMessage}/>
            <div className="setInfoContainer">
            <div className="setName">
                <div className='setNameText'>{collection!==undefined ? collection?.name : 'Loading...'}</div>
                <div className={`setNameIconButton${bookmarked ? 'Saved' : ''} noselect`} onClick={() => bookmarkThis()}>
                    { bookmarked ? "Saved" : "Save"}
                </div>
            </div>
            <div className='setProgress'>43%</div>
            <div className="setInfo">{`Creator: ${collection!==undefined ? collection?.creator : 'Loading...'}, Objects: ${collection!==undefined ? collection?.itemCount : 'Loading...'}`}</div>
            </div>

            <div className='setAreaOuter'>
            <div className="setAreaContainer">
                <div className="selectorBar">
                <div className={currentSelection===0 ? `selectorBarItemSelected` : `selectorBarItem`} onClick={() => selectionChange(0)}>
                    <div className='selectorBarItemIcon'><IoMdStats size='16px' color={currentSelection===0 ? `rgb(41, 116, 255)` : `rgb(92, 92, 92)`} /></div>
                    <div className='selectorBarItemText'>Overview</div>
                </div>
                <div className={currentSelection===1 ? `selectorBarItemSelected` : `selectorBarItem`} onClick={() => selectionChange(1)}>
                    <div className='selectorBarItemIcon'><IoMdPlay size='16px' color={currentSelection===1 ? `rgb(41, 116, 255)` : `rgb(92, 92, 92)`} /></div>
                    <div className='selectorBarItemText'>Flip</div>
                </div>
                <div className={currentSelection===2 ? `selectorBarItemSelected` : `selectorBarItem`} onClick={() => selectionChange(2)}>
                    <div className='selectorBarItemIcon'><IoMdPlay size='16px' color={currentSelection===2 ? `rgb(41, 116, 255)` : `rgb(92, 92, 92)`} /></div>
                    <div className='selectorBarItemText'>Reveal</div>
                </div>
                <div className={currentSelection===3 ? `selectorBarItemSelected` : `selectorBarItem`} onClick={() => selectionChange(3)}>
                    <div className='selectorBarItemIcon'><AiFillEdit size='16px' color={currentSelection===3 ? `rgb(41, 116, 255)` : `rgb(92, 92, 92)`} /></div>
                    <div className='selectorBarItemText'>Edit</div>
                </div>
                </div>
				<div className='setAreaLoadingOuter'>
					{loadingStatus!==0 && 
							<Loading />
					}
				</div>
                {currentSelection===0 && 
                <StatisticsTable items={collection?.items} itemdata={colData}/>
                } 

                {currentSelection===1 && 
                <FlipMode items={collection?.items} />
                } 

                {currentSelection===2 && 
                <RevealMode items={collection?.items}/>
                } 

                {currentSelection===3 && 
                <CollectionEdit items={collection?.items} name={collection?.name} id={collection?.id} notFunction={SetNotificaiton}/>
                } 

            </div>
            </div>
        </div>
		<div className='emptyCont'></div>
        </>
    )
}