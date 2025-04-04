import { FaUserGraduate } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { VscEmptyWindow } from "react-icons/vsc";
import { CollectionData } from '../../types';
import { useState } from 'react';
import { Notification } from '../Notification/Notification';
import { Loading } from '../Loading/Loading';
import { useNavigate } from "react-router-dom";
import './HomeView.css';

const CollectionItemComponent = ( { col }: { col: CollectionData}) => { 
	const navigate = useNavigate();

	const ClickedCollection = () => {
		navigate(`/${col.id}`);
	}
	
    return (
        <div className='collectionItem' onClick={ClickedCollection}>
            <div className='itemName'>
                <div className='itemNameText'>{col.name}</div>
            </div>
			<div className="progressBarOuter">
				<div className="progressBarText" style={{background: `linear-gradient(to right, var(--main-blue) ${(4*col.itemCount)/4}%, var(--gray-blue) ${(4*col.itemCount)/4}%)`}}>
					{(4*col.itemCount)/4}%
				</div>
			</div>
    
            <div className='itemCreator'>Creator: {col.creator}</div>
			
            <div className='itemObjects'>Notes: {col.itemCount}</div>
        </div>
    )
}

/*
<div className='linkIcon'>
    <HiOutlineExternalLink size='20px' color={`rgb(78, 78, 78)`} />
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

export const HomeView = ({collectionData, username, notifText, loadingStatus}: {collectionData: Array<CollectionData>, username:string, notifText:string, loadingStatus:number}) => {
    // 0=all, 1=created, 2=saved
    const [curFilter, setCurFilter] = useState(0);
    const filterChange = (id: number) => {
        setCurFilter(id)
    }

    //filter to show all, only collections created by user, only created by other users
    let collectionsToShow;
    switch(curFilter){
        case 1:
            collectionsToShow = collectionData.filter((col) => col.creator===username);
            break;
        case 2:
            collectionsToShow = collectionData.filter((col) => col.creator!==username);
            break;
        default:
            collectionsToShow = collectionData; 
    }

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