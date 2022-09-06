import './HomeView.css';
import { FaUserGraduate } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useState } from 'react';

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

const CollectionItem = ( { name, creator, count }: { name: string, creator: string, count: number}) => {    
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

export const HomeView = () => {
    const [curFilter, setCurFilter] = useState(0);
    const filterChange = (id: number) => {
        setCurFilter(id)
    }

    return(
        <>
        <div className="homeContainerMain">
            <div className="homeViewUpperText">Home</div>
            <div className='profileCont'>
                <div className='leftSideCont'>
                    <div className='profileIcon'>
                        <FaUserGraduate size='20px' color={`rgba(47, 110, 255, 0.8)`} />
                    </div>
                    <div className='profileUsernameText'>oskari83</div>
                </div>
                <div className='rightSideCont'>
                    <LearningStreak />
                </div>
            </div>

            <div className='mainHomeContainer'>
                <div className='aboveCollectionsContainer'>
                    <div className='collectionsText'>Collections</div>
                    <div className='filterContainer'>
                        <div className={`filterAll${curFilter===0 ? 'S' : ''}`} onClick={() => filterChange(0)}>All</div>
                        <div className={`filterCreated${curFilter===1 ? 'S' : ''}`} onClick={() => filterChange(1)}>Created</div>
                        <div className={`filterSaved${curFilter===2 ? 'S' : ''}`} onClick={() => filterChange(2)}>Saved</div>
                    </div>
                </div>
                <div className='homeCollectionsFlexContainer'>
                    <CollectionItem name={"Economics Chapter 1"} creator={"Oskari Peltonen"} count={45} />
                    <CollectionItem name={"Economics Chapter 2"} creator={"Oskari Peltonen"} count={32} />
                    <CollectionItem name={"Economics Chapter 3"} creator={"Oskari Peltonen"} count={41} />
                    <CollectionItem name={"Economics Chapter 4"} creator={"Oskari Peltonen"} count={44} />
                    <CollectionItem name={"Economics Chapter 5"} creator={"Oskari Peltonen"} count={58} />
                    <CollectionItem name={"Economics Chapter 6"} creator={"Oskari Peltonen"} count={12} />
                </div>
            </div>
        </div>
        </>
    )
}