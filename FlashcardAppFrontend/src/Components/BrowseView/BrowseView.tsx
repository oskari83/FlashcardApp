import './BrowseView.css';
import { FiSearch } from "react-icons/fi"
import { HiOutlineExternalLink } from "react-icons/hi"
import { BsBookmark,BsBookmarkCheckFill } from "react-icons/bs"
import { useState, useEffect } from 'react';
import { Loading } from '../Loading/Loading';
import { Notification } from '../Notification/Notification';
import { CollectionData } from '../../types';
import collectionService from '../../services/collections';

const CollectionItem = ( { collectionWhole, name, creator, count, setError }: { collectionWhole:CollectionData, name: string, creator: string, count: number,setError:any}) => {
    const [bookmarked, setBookmarked] = useState(false);
	const [bookmarkStatus, setBookmarkStatus] = useState(0);

	if(collectionWhole.saved && bookmarked===false){
		setBookmarked(true);
		setBookmarkStatus(2);
	}

    const bookmarkThis = () => {
        if(bookmarked===false){
            const id = collectionWhole.id;
			setBookmarkStatus(1);

			collectionService
				.saveCollection(id)
				.then((data) => {
					console.log(data);
					setBookmarked(true);
					setBookmarkStatus(2);
				})
				.catch(error => {
					console.log(error);
					setError(error.message,5000);
					setBookmarkStatus(0);
				});
        }else{
			const id = collectionWhole.id;
			setBookmarkStatus(3);
			
            collectionService
				.unSaveCollection(id)
				.then((data) => {
					console.log(data);
					setBookmarked(false);
					setBookmarkStatus(0);
				})
				.catch(error => {
					console.log(error);
					setError(error.message,5000);
					setBookmarkStatus(2);
				});
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
                        {bookmarkStatus===0 && 'Save'}
						{bookmarkStatus===1 && 'Saving...'}
						{bookmarkStatus===2 && 'Saved'}
						{bookmarkStatus===3 && 'Unsaving...'}
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

export const BrowseView = ({username, savedCols}:{username:string,savedCols:CollectionData[]}) => {
    const [resultCollections, setResultCollections] = useState<CollectionData[]>([]);
    const [loadingStatusBrowse, setLoadingStatusBrowse] = useState(1);
    const [notificationMessage, setNotificationMessage] = useState('');
	const [check,setCheck] = useState(0);
	const [notificationTimeout, setNotificationTimeout] = useState<null | NodeJS.Timeout>(null);

	if (savedCols.length!==0 && check===0 && resultCollections.length!==0) {
		console.log(savedCols);
		const collectionsNew = resultCollections.map((col:CollectionData) => {
			for(let i=0;i<savedCols.length;i++){
				if(col.id===savedCols[i].id){
					col.saved = true;
				}
			}
			return col;
		});
		setCheck(1);
		setResultCollections(collectionsNew);
	}

	const ClearNotificationMessage = (time:number) => {
		if(notificationTimeout){
			clearTimeout(notificationTimeout);
		}
		const timeoutN = setTimeout(() => {
			setNotificationMessage('');
		},time);
		setNotificationTimeout(timeoutN);
	}

	const AddNotification = (mes: string, time:number) => {
		setNotificationMessage(mes);
		ClearNotificationMessage(time);
	}

    useEffect(() => {
        collectionService
          .getAll()
          .then(initialCollections => {
			const collectionsToShow = initialCollections.filter((col:any) => col.creator!==username);
			console.log(savedCols);
            setResultCollections(collectionsToShow);
            setLoadingStatusBrowse(0);
          })
          .catch(error => {
            if(error.code==="ERR_NETWORK"){
				AddNotification('Network error - please check your internet connection!',5000);
            }else{
				AddNotification(error.message,5000);
            }
            console.log(error);
        });
    }, []);

    return(
        <>
        <div className="containerMain">
            <Notification text={notificationMessage} />

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
                    {loadingStatusBrowse===1 && 
                        <Loading />
                    }

                    {resultCollections.map( (col: CollectionData) => 
                        <CollectionItem key={col.id} collectionWhole={col} name={col.name} creator={col.creator} count={col.itemCount} setError={AddNotification}/>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}