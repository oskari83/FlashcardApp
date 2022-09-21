import { FiSearch } from "react-icons/fi"
import { HiOutlineExternalLink } from "react-icons/hi"
import { useState, useEffect } from 'react';
import { Loading } from '../Loading/Loading';
import { Notification } from '../Notification/Notification';
import { CollectionData } from '../../types';
import { useNavigate } from 'react-router-dom';
import collectionService from '../../services/collections';
import './BrowseView.css';

const CollectionItem = ( { name, creator, count, id }: { name: string, creator: string, count: number, id:string}) => {
	const navigate = useNavigate();

	const ClickedCollection = () => {
		navigate(`/${id}`);
	}
    
    return (
        <div className='collectionItem' onClick={ClickedCollection}>
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
                        <CollectionItem key={col.id}  name={col.name} creator={col.creator} count={col.itemCount} id={col.id}/>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}