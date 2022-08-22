import './BrowseView.css';
import { FiSearch } from "react-icons/fi"
import { HiOutlineExternalLink } from "react-icons/hi"
import { BsBookmark,BsBookmarkCheckFill } from "react-icons/bs"
import { useState } from 'react';

const CollectionItem = ( { name, creator, count }: { name: string, creator: string, count: number}) => {
    const [bookmarked, setBookmarked] = useState(false);

    const bookmarkThis = () => {
        setBookmarked(!bookmarked);
    }
    
    return (
        <div className='collectionItem'>
            <div className='itemName'>
                <div className='itemNameText'>{name}</div>
                <div className='itemNameIcon' onClick={() => bookmarkThis()}>
                    { bookmarked ? 
                    <BsBookmarkCheckFill size='16px' color={`rgb(248, 222, 106)`} />
                    :
                    <BsBookmark size='16px' color={`rgb(119, 119, 119)`} />
                    }
                    <div className='innerItemNameText'>
                        { bookmarked ? "Saved" : "Save"}
                    </div>
                </div>
            </div>
            <div className='linkIcon'>
                <HiOutlineExternalLink size='20px' color={`rgb(78, 78, 78)`} />
            </div>
            <div className='itemCreator'>Creator: {creator}</div>
            <div className='itemObjects'>Objects: {count}</div>
        </div>
    )
}

export const BrowseView = () => {
    return(
        <>
        <div className="containerMain">
            <div className="searchBarContainer">
                <input type="text" className='searchInput'  placeholder="Search..."></input>
                <div className='searchIcon'>
                    <FiSearch size='20px' color={`rgb(78, 78, 78)`} />
                </div>
            </div>

            <div className='collectionsContainer'>
                <div className='aboveResultsContainer'>
                    Recently Added Collections
                </div>
                <div className='collectionsFlexContainer'>
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