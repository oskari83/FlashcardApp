import './HomeView.css';
import { FaUserGraduate } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { VscEmptyWindow } from "react-icons/vsc";
import { CollectionItem, CollectionData } from '../../types';
import { useState } from 'react';
import { Notification } from '../Notification/Notification';
import { Loading } from '../Loading/Loading';

const NotYetAuthComponent = () => {
    return(
        <div className='authPossiblyContainer'>
            <div className='authPossiblyText'>Register now to create your own collections and start studying!</div>
            <div className='takeToAuthButton'>Register</div>
        </div>
    )
}

const LearningStreak = () => {
    return(
    <>
        <div className='learningStreakText'>1 day in a row</div>
        <div className='learningStreakCont'>
            <div className='learningStreakBoxGreen'></div>
            <div className='learningStreakBoxGreen'></div>
            <div className='learningStreakBoxGray'></div>
            <div className='learningStreakBoxGray'></div>
            <div className='learningStreakBoxGreen'></div>
            <div className='learningStreakBoxGray'></div>
            <div className='learningStreakBoxGreen'></div>
        </div>
    </>
    )
}

const CollectionItemComponent = ( { name, creator, count }: { name: string, creator: string, count: number}) => {    
    return (
        <div className='collectionItem'>
            <div className='itemName'>
                <div className='itemNameText'>{name}</div>
            </div>
            <div className='linkIcon'>
                <HiOutlineExternalLink size='20px' color={`rgb(78, 78, 78)`} />
            </div>
            <div className='itemCreator'>Creator: {creator}</div>
            <div className='itemObjects'>Objects: {count}</div>
        </div>
    )
}

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
                        <FaUserGraduate size='20px' color={`rgba(47, 110, 255, 0.8)`} />
                    </div>
                    <div className='profileUsernameText'>{username}</div>
                </div>
                <div className='rightSideCont'>
                    <LearningStreak />
                </div>
            </div>

            <div className={`mainHomeContainer${collectionData.length >= 3 ? '' : 'E'}`}>
                <div className='aboveCollectionsContainer'>
                    <div className='collectionsText'>Collections</div>
                    <div className='filterContainer'>
                        <div className={`filterAll${curFilter===0 ? 'S' : ''}`} onClick={() => filterChange(0)}>All</div>
                        <div className={`filterCreated${curFilter===1 ? 'S' : ''}`} onClick={() => filterChange(1)}>Created</div>
                        <div className={`filterSaved${curFilter===2 ? 'S' : ''}`} onClick={() => filterChange(2)}>Saved</div>
                    </div>
                </div>
                <div className='homeCollectionsFlexContainer'>
                    {collectionData.length === 0 && notifText==='' && 
                        <EmptyCollectionsComponent />
                    }
                    {loadingStatus===1 && 
                        <Loading />
                    }
                    {collectionsToShow.map( (col) => 
                        <CollectionItemComponent key={col.id} name={col.name} creator={col.creator} count={col.itemCount} />
                    )}
                </div>
            </div>
        </div>
        </>
    )
}