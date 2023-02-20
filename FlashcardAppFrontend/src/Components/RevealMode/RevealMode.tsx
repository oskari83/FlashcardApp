import { useState, useEffect } from 'react';
import { CollectionItem } from '../../types';
import userService from '../../services/user';
import './RevealMode.css'

const NormalTableRow = ({item,created,collectionId, userId, notFunction, setRefresh}: {item: CollectionItem, created: boolean, collectionId:string, userId:string, notFunction:any, setRefresh:any}) => {
    const [show, setShow] = useState(0);

    const showAnswer = () => {
        show<2 && setShow(show + 1);
    }

    const giveFeedBack = (op:number) => {
		if(created){
			const updateDataObject = {
				colId: collectionId,
				uniqueId: item.uniqueId,
				operation: op,
			}
			userService
				.updateOwnData(userId,updateDataObject)
				.then(resp => {
					console.log(resp);
					setRefresh();
				})
				.catch(error => {
					if(error.code==="ERR_NETWORK"){
						notFunction('Network error - please check your internet connection!',5000);
					}else{
						notFunction(error.message,5000);
					}
					if(error.response.data.error==='token expired'){
						window.localStorage.removeItem('loggedFlashcardAppUser');
						window.location.reload();
					}
					console.log(error);
				});
		}else{
			const updateDataObject = {
				colId: collectionId,
				uniqueId: item.uniqueId,
				operation: op,
			}
			userService
				.updateSavedData(userId,updateDataObject)
				.then(resp => {
					console.log(resp);
					setRefresh();
				})
				.catch(error => {
					if(error.code==="ERR_NETWORK"){
						notFunction('Network error - please check your internet connection!',5000);
					}else{
						notFunction(error.message,5000);
					}
					if(error.response.data.error==='token expired'){
						window.localStorage.removeItem('loggedFlashcardAppUser');
						window.location.reload();
					}
					console.log(error);
				});
		}
        setShow(0);
    }

    return(
        <tr className='normalRevealRow'>
            <td className='normalRowTd'>{item.qside}</td>
            <td className={`normalAnswerTd${show}`} onClick={() => showAnswer()}>
                {item.aside}
                {show===2 && 
                <div className='tdFbOuter'>
                    <div className='fbneg' onClick={() => giveFeedBack(0)}>-1</div>
                    <div className='fbneu' onClick={() => giveFeedBack(1)}>0</div>
                    <div className='fbpos' onClick={() => giveFeedBack(2)}>1</div> 
                </div>                        
                }
            </td>
        </tr>
    )
}

export const RevealMode = ({items, itemdata, created, userId, notFunction, id, setRefresh}:{items:CollectionItem[] | undefined, itemdata:any, created:boolean, userId:string, notFunction:any, id:any, setRefresh:any}) => {
	const [combinedItems, setCombinedItems] = useState<any[]>([]);
	
	useEffect(() => {
		if(items!==undefined && Object.keys(itemdata).length !== 0){
			const datadata = itemdata.data;
			const combinedStuff = items.map(t1 => ({...t1, ...datadata.find((t2:any) => t2.uniqueId === t1.uniqueId)}));
			setCombinedItems(combinedStuff);	
		}	
	}, [items,itemdata]);

    return(
        <div className='revealmodeTable'>
            <table className='revealTable'>
            <colgroup>
                <col className="questionColumn"></col>
                <col className="answerColumn"></col>
            </colgroup>
            <tbody>
            <tr className='fboldRow'>
                <td className='fheaderRow'>
                    <div className='ftdText'>Note</div>
                </td>
                <td className='fheaderRow'>
                    <div className='ftdText'>Definition {"(click to reveal)"}</div>
                </td>
            </tr>
			{combinedItems.map((item:CollectionItem) => {
				return (<NormalTableRow key={item.key} item={item} created={created} collectionId={id} userId={userId} notFunction={notFunction} setRefresh={setRefresh}/>);
			})}
            </tbody>
            </table>
        </div>
    )
}