import { FlipMode } from '../FlipMode/FlipMode';
import { RevealMode } from '../RevealMode/RevealMode';
import { StatisticsTable } from '../StatisticsTable/StatisticsTable';
import { CollectionEdit } from '../CollectionEdit/CollectionEdit';
import { IoMdStats, IoMdPlay } from 'react-icons/io';
import { AiFillEdit } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { CollectionData, PossiblyEmptyCollectionData, PossiblyEmptyData } from '../../types';
import { Loading } from '../Loading/Loading';
import { useParams, useNavigate } from "react-router-dom";
import { Notification } from '../Notification/Notification';
import collectionService from '../../services/collections';
import userService from '../../services/user';
import './CollectionView.css';

export const CollectionView = ({userId, savedCols}: {userId:string,savedCols:CollectionData[] | undefined}) => {
    const [currentSelection, setCurrentSelection] = useState(0);
    const [bookmarked, setBookmarked] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState('');
	const [notificationTimeout, setNotificationTimeout] = useState<null | NodeJS.Timeout>(null);
	const [id, setID] = useState(useParams().id);
	const [collection, setCollection] = useState<PossiblyEmptyCollectionData>({});
	const [colData, setColData] = useState<PossiblyEmptyData>({});
	const [loadingStatus, setLoadingStatus] = useState(0);
	const [created, setCreated] = useState(false);
	const [requireRefresh, setRequireRefresh] = useState(false);
	const [executeRefresh,setExecuteRefresh] = useState(0);
	const [percentComplete,setPercentComplete] = useState(0);
	const navigate = useNavigate();

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

	const SetRefreshAsRequired = () => {
		setRequireRefresh(true);
	}

	useEffect(() => {
		console.log('i fire once',id);
		setLoadingStatus(2);
		if(id!==undefined){
			collectionService
				.getSingle(id)
				.then(initialCollection => {
					console.log(initialCollection);
					if(initialCollection.user.toString()===userId){
						setCreated(true);
					}
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
					console.log(data);
					setColData(data);
					if(data.data!==undefined){
						let sm2=0;
						for(let i=0;i<data.data.length;i++){
							let nm=0;
							if(Number(data.data[i].correct)>4){
								nm=4;
							}else{
								nm=Number(data.data[i].correct);
							}
							sm2+=nm;
						}
						const mm = 4*data.data.length;
						setPercentComplete(Math.round((sm2/mm) * 100));
					}
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
    }, [id,executeRefresh]);

	const clickDelButton = () => {
		if(created){
			if (window.confirm("Do you really want to delete collection forever?") && id!==undefined) {
				setBookmarked(true);
				console.log('confirmed');
				collectionService
					.deleteCollection(id)
					.then((data) => {
						console.log(data);
						navigate('/');
						navigate(0);
					})
					.catch(error => {
						console.log(error);
						SetNotificaiton(error.message,5000);
						setBookmarked(false);
					});
			}
		}else{
			if (window.confirm("Do you really want to remove this collection from your saved collections?") && id!==undefined) {
				console.log('confirmed');
				setBookmarked(true);
				collectionService
					.unSaveCollection(id)
					.then((data) => {
						console.log(data);
						navigate('/');
						navigate(0);
					})
					.catch(error => {
						console.log(error);
						SetNotificaiton(error.message,5000);
						setBookmarked(false);
					});
			}
		}
    }

    const selectionChange = (id: number) => {
        setCurrentSelection(id);
		if(requireRefresh){
			setExecuteRefresh((v:number) => v+1);
			setRequireRefresh(false);
		}
    }

    return(
        <>
        <div className="containerMain">
			<Notification text={notificationMessage}/>
            <div className="setInfoContainer">
            <div className="setName">
                <div className='setNameText'>{collection!==undefined ? collection?.name : 'Loading...'}</div>
                
				<div className={`setNameIconButton noselect`} onClick={() => clickDelButton()}>
					{ bookmarked ? "Deleting..." : "Delete"}
				</div>
				
            </div>
            <div className='setProgress'>{percentComplete}%</div>
            <div className="setInfo">{`Creator: ${collection!==undefined ? collection?.creator : 'Loading...'}, Notes: ${collection!==undefined ? collection?.itemCount : 'Loading...'}`}</div>
            </div>

            <div className='setAreaOuter'>
            <div className="setAreaContainer">
                <div className="selectorBar">
                <div className={currentSelection===0 ? `selectorBarItemSelected` : `selectorBarItem`} onClick={() => selectionChange(0)}>
                    <div className='selectorBarItemIcon'><IoMdStats size='16px' color={currentSelection===0 ? `rgb(47, 110, 255)` : `rgb(31,48,76)`} /></div>
                    <div className='selectorBarItemText'>OVERVIEW</div>
                </div>
                <div className={currentSelection===1 ? `selectorBarItemSelected` : `selectorBarItem`} onClick={() => selectionChange(1)}>
                    <div className='selectorBarItemIcon'><IoMdPlay size='16px' color={currentSelection===1 ? `rgb(47, 110, 255)` : `rgb(31,48,76)`} /></div>
                    <div className='selectorBarItemText'>FLIP</div>
                </div>
                <div className={currentSelection===2 ? `selectorBarItemSelected` : `selectorBarItem`} onClick={() => selectionChange(2)}>
                    <div className='selectorBarItemIcon'><IoMdPlay size='16px' color={currentSelection===2 ? `rgb(47, 110, 255)` : `rgb(31,48,76)`} /></div>
                    <div className='selectorBarItemText'>REVEAL</div>
                </div>
				{ created &&
                (<div className={currentSelection===3 ? `selectorBarItemSelected` : `selectorBarItem`} onClick={() => selectionChange(3)}>
                    <div className='selectorBarItemIcon'><AiFillEdit size='16px' color={currentSelection===3 ? `rgb(47, 110, 255)` : `rgb(31,48,76)`} /></div>
                    <div className='selectorBarItemText'>EDIT</div>
                </div>)
				}					
                </div>
		
				{loadingStatus!==0 && 
					(<div className='setAreaLoadingOuter'>
						<Loading />
					</div>)
				}
                {currentSelection===0 && loadingStatus===0 &&
                <StatisticsTable items={collection?.items} itemdata={colData}/>
                } 

                {currentSelection===1 && loadingStatus===0 &&
                <FlipMode items={collection?.items} created={created} id={collection?.id} itemdata={colData} userId={userId} notFunction={SetNotificaiton} setRefresh={SetRefreshAsRequired}/>
                } 

                {currentSelection===2 && loadingStatus===0 &&
                <RevealMode items={collection?.items} created={created} id={collection?.id} itemdata={colData} userId={userId} notFunction={SetNotificaiton} setRefresh={SetRefreshAsRequired}/>
                } 

                {currentSelection===3 && loadingStatus===0 &&
                <CollectionEdit items={collection?.items} name={collection?.name} id={collection?.id} notFunction={SetNotificaiton}/>
                } 

            </div>
            </div>
        </div>
		<div className='emptyCont'></div>
        </>
    )
}