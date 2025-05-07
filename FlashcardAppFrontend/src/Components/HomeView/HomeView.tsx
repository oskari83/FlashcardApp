import { FaUserGraduate } from "react-icons/fa";
import { VscEmptyWindow } from "react-icons/vsc";
import { HiOutlineExternalLink } from "react-icons/hi";
import { CollectionData } from '../../types';
import { useState } from 'react';
import { Notification } from '../Notification/Notification';
import { Loading } from '../Loading/Loading';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './HomeView.css';

const BoxComponentB = () => { 
	return(
		<div className='collectionItemStyleContainerB'></div>
	)
}
const BoxComponentR = () => { 
	return(
		<div className='collectionItemStyleContainerR'></div>
	)
}

const BoxComponentG = () => { 
	return(
		<div className='collectionItemStyleContainerG'></div>
	)
}

const CollectionItemComponent = ( { col }: { col: CollectionData}) => { 
	const navigate = useNavigate();

	const ClickedCollection = () => {
		navigate(`/${col.id}`);
	}
	
    return (
        <div className='collectionItem' onClick={ClickedCollection}>
			{col.name.substring(0,4)==='PIIB' && <BoxComponentB/>}
			{col.name.substring(0,4)==='PIIA' && <BoxComponentR/>}
			{col.name.substring(0,4)==='PI -' && <BoxComponentG/>}
			<div className='collectionItemInnerContainer'>
				<div className='itemName'>
					<div className='itemNameText'>{col.name}</div>
				</div>
				<div className='linkIconBrowse'>
					<HiOutlineExternalLink size='20px' color={`rgb(78, 78, 78)`} />
				</div>
		
				<div className='itemCreator'>Creator: {col.creator}</div>
				
				<div className='itemObjects'>Notes: {col.itemCount}</div>
			</div>
        </div>
    )
}

/*
<div className='linkIcon'>
    <HiOutlineExternalLink size='20px' color={`rgb(78, 78, 78)`} />
</div>
*/
/*
<div className="progressBarOuter">
	<div className="progressBarText" style={{background: `linear-gradient(to right, var(--main-blue) ${(4*col.itemCount)/4}%, var(--gray-blue) ${(4*col.itemCount)/4}%)`}}>
		{(4*col.itemCount)/4}%
	</div>
</div>
*/

const EmptyCollectionsComponent = () => {
    return (
        <div className='collectionEmptyItem'>
            <div className='emptyIcon'>
                <VscEmptyWindow size='20px' color={`rgb(78, 78, 78)`} />
            </div>
            <div className='emptyText'>
                {"Looks empty, browse others or create your own collection to start studying!"}
            </div>
        </div>
    )
}

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // A function that increment 👆🏻 the previous state like here 
    // is better than directly setting `setValue(value + 1)`
}

export const HomeView = ({collectionData, username, notifText, loadingStatus}: {collectionData: Array<CollectionData>, username:string, notifText:string, loadingStatus:number}) => {
    // 0=all, 1=created, 2=saved
    const [curFilter, setCurFilter] = useState(0);
	const [curSort, setCurSort] = useState(0);
    const filterChange = (id: number) => {
        setCurFilter(id)
    }

	const forceUpdate = useForceUpdate();

    //filter to show all, only collections created by user, only created by other users
    let collectionsToShow : CollectionData[] = [];
	switch(curFilter){
		case 1:
			collectionsToShow = collectionData.filter((col) => col.creator===username);
			break;
		case 2:
			collectionsToShow = collectionData.filter((col) => col.creator!==username);
			break;
		default:
			collectionsToShow = collectionData;
			console.log('sorting_clear')
	}	
	
	const clickSort = () => {
		if(collectionsToShow){
			if(curSort===0){
				collectionsToShow = collectionsToShow.sort(function(a:any, b:any) {
					return a.name.localeCompare(b.name);
				})
				setCurSort(1);
			}else{
				collectionsToShow = collectionsToShow.sort(function(a:any, b:any) {
					return b.name.localeCompare(a.name);
				})
				setCurSort(0);
			}
		}
	}

	useEffect(() => {
		if(collectionData){
			collectionData = collectionData.sort(function(a:any, b:any) {
				return b.name.localeCompare(a.name);
			});
			forceUpdate();
		}	
	}, [collectionData])


    return(
        <>
        <div className="homeContainerMain">
            <Notification text={notifText} />
            <div className="homeViewUpperText">Home</div>
            <div className='profileCont'>
                <div className='leftSideCont'>
                    <div className='profileIcon'>
                        <FaUserGraduate size='20px' color={`rgb(47, 110, 255)`} />
                    </div>
                    <div className='profileUsernameText'>{username}</div>
                </div>
            </div>

            <div className={`mainHomeContainer${collectionData.length >= 3 ? '' : 'E'}`}>
                <div className='aboveCollectionsContainer'>
                    <div className='collectionsText'>Collections</div>
                    <div className='filterContainer'>
                        <div className={`filterAll${curFilter===0 ? 'S' : ''}`} onClick={() => filterChange(0)}>ALL</div>
                        <div className={`filterCreated${curFilter===1 ? 'S' : ''}`} onClick={() => filterChange(1)}>CREATED</div>
                        <div className={`filterSaved${curFilter===2 ? 'S' : ''}`} onClick={() => filterChange(2)}>SAVED</div>
						<div className={`filterSaved`} onClick={() => clickSort()}>SORT</div>
                    </div>
                </div>
                <div className='homeCollectionsFlexContainer'>
                    {collectionData.length === 0 && notifText==='' && loadingStatus!==1 &&
                        <EmptyCollectionsComponent />
                    }
                    {loadingStatus===1 && 
                        <Loading />
                    }
                    {collectionsToShow.map( (col) => 
                        <CollectionItemComponent key={col.id} col={col} />
                    )}
                </div>
            </div>
        </div>
        </>
    )
}

/*
<div className='rightSideCont'>
	<LearningStreak />
</div>
*/