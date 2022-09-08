import './BrowseView.css';
import { FiSearch } from "react-icons/fi"
import { HiOutlineExternalLink } from "react-icons/hi"
import { BsBookmark,BsBookmarkCheckFill } from "react-icons/bs"
import { useState, useEffect } from 'react';
import collectionService from '../../services/collections';
import browseresultsService from '../../services/browseresults';
import { CollectionData } from '../../Types';

const CollectionItem = ( { collectionWhole, name, creator, count, updateFunc }: { collectionWhole:CollectionData, name: string, creator: string, count: number, updateFunc:any}) => {
    const [bookmarked, setBookmarked] = useState(collectionWhole.saved);
    const [thisCollection, setThisCollection] = useState(collectionWhole);

    const addToOwnCollections = (col: CollectionData) => {
        collectionService
            .create(col)
            .then(returnedCollection => {
                console.log(returnedCollection);
            }
        );
    }

    const bookmarkThis = () => {
        console.log(thisCollection);
        if(bookmarked===false){
            const changedCollection = {...thisCollection, saved: true}
            const id = collectionWhole.id;

            updateFunc(id,changedCollection);
            addToOwnCollections(changedCollection);

            setBookmarked(!bookmarked);
        }else{
            const colObject = {...thisCollection, saved: false}
            setBookmarked(!bookmarked);
        }
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
    const [resultCollections, setResultCollections] = useState<CollectionData[]>([]);

    const updateResultsCollection = (id:number, colObject: CollectionData) => {
        browseresultsService
            .update(id, colObject).then(returnedCollection => {
            setResultCollections(resultCollections.map((n) => {
                if(n.id!==id){
                    return n;
                }else{
                    return returnedCollection;
                }
            }))
        })
    }

    useEffect(() => {
        browseresultsService
            .getAll()
            .then(initialResults => {
                setResultCollections(initialResults)
            })
    }, [])

    return(
        <>
        <div className="containerMain">
            <div className="browseViewName">Browse Collections</div>
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
                    {resultCollections.map( (col: CollectionData) => 
                        <CollectionItem key={col.id} collectionWhole={col} name={col.name} creator={col.creator} count={col.itemCount} updateFunc={updateResultsCollection} />
                    )}
                </div>
            </div>
        </div>
        </>
    )
}