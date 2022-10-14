import { FiSearch } from "react-icons/fi"
import { HiOutlineExternalLink } from "react-icons/hi"
import { useState, useEffect } from 'react';
import { Loading } from '../Loading/Loading';
import { Notification } from '../Notification/Notification';
import { CollectionData } from '../../types';
import { useNavigate } from 'react-router-dom';
import collectionService from '../../services/collections';
import './BrowseView.css';

const PaginationElement = ({id,active,changePage}: {id:number,active:number,changePage:any}) => {
	return(
		<div className={active!==id+1 ? `paginationBox` : `paginationBoxSelected`} onClick={() => changePage(id+1)}>{id+1}</div>
	)
}

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
	const [amountOfPages,setAmountOfPages] = useState(1);
	const [activePage, setActivePage] = useState(1);
	const [searchText,setSearchText] = useState('');
	const [searchNow, setSearchNow] = useState(0);
	const [getRecentNow, setRecentNow] = useState(0);

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

	const collectsShowing = resultCollections.filter((v,i) => {
		return (i<activePage*5 && i>=activePage*5-5);
	});

	const changePage = (pg:number) => {
		setActivePage(pg);
	}

    useEffect(() => {
        collectionService
          .getAll()
          .then(initialCollections => {
			const collectionsToShow = initialCollections.filter((col:any) => col.creator!==username);
			console.log(savedCols);
            setResultCollections(collectionsToShow);
			if(collectionsToShow.length>20){
				setAmountOfPages(5);
			}else if(collectionsToShow.length>15){
				setAmountOfPages(4);
			}else if(collectionsToShow.length>10){
				setAmountOfPages(3);
			}else if(collectionsToShow.length>5){
				setAmountOfPages(2);
			}else {
				setAmountOfPages(1);
			}
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
    }, [getRecentNow]);

	const handleSearchChange = (event:any) => {
		console.log(event.target.value);
		setSearchText(event.target.value);
	}

	const executeSearch = () => {
		if(searchText!==''){
			setLoadingStatusBrowse(1);
			setSearchNow((val) => val+1);
			setResultCollections([]);
			setActivePage(1);
			setAmountOfPages(1);
		}else{
			setRecentNow((val) => val+1);
		}
	}

	useEffect(() => {
		collectionService
			.search(searchText)
			.then(initialCollections => {
				const collectionsToShow = initialCollections.filter((col:any) => col.creator!==username);
				console.log(initialCollections);
				setResultCollections(collectionsToShow);
				if(collectionsToShow.length>20){
					setAmountOfPages(5);
				}else if(collectionsToShow.length>15){
					setAmountOfPages(4);
				}else if(collectionsToShow.length>10){
					setAmountOfPages(3);
				}else if(collectionsToShow.length>5){
					setAmountOfPages(2);
				}else {
					setAmountOfPages(1);
				}
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
	}, [searchNow]);

    return(
        <>
        <div className="containerMain">
            <Notification text={notificationMessage} />

            <div className="browseViewName">Browse Collections</div>
            <div className="searchBarContainer">
                <input type="text" className='searchInput'  placeholder="Search..." value={searchText} onChange={handleSearchChange}></input>
                <div className='searchIcon' onClick={() => executeSearch()}>
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

                    {collectsShowing.map( (col: CollectionData) => 
                        <CollectionItem key={col.id}  name={col.name} creator={col.creator} count={col.itemCount} id={col.id}/>
                    )}
                </div>
				<div className="paginationContainer">
					<div className="paginationInnerContainer">
						{[...Array(amountOfPages)].map((x,i) => 
							<PaginationElement key={i} changePage={changePage} active={activePage} id={i}/>
						)}
					</div>
				</div>
            </div>
        </div>
        </>
    )
}

//box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;