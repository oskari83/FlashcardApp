import { RiDeleteBinLine } from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';
import { SingleItem } from '../../types';
import { useState, SyntheticEvent } from 'react';
import { useNavigate } from "react-router-dom";
import collectionService from '../../services/collections';
import { Notification } from '../Notification/Notification';
import objectMap from '../../Utils/objectMap';
import './CreateView.css';

const NormalCreateTableRow = ({qtext, atext, keyx, removeFunc, asideChangeFunc, qsideChangeFunc}: {qtext: string, atext: string, keyx: number, removeFunc: any, asideChangeFunc: any, qsideChangeFunc: any}) => {

    const handleItemQuestionChange = (event: SyntheticEvent) => {
        let val = event.currentTarget.textContent;
        if(val==null){
            val='';
        }
		const cleanedVal = val.replace(/(<([^>]+)>)/ig,"");
        qsideChangeFunc(keyx,cleanedVal);
    }

    const handleItemAnswerChange = (event: SyntheticEvent) => {
        let val = event.currentTarget.textContent;
        if(val==null){
            val='';
        }
		const cleanedVal = val.replace(/(<([^>]+)>)/ig,"");
        asideChangeFunc(keyx,cleanedVal);
    }

    const clickDeleteButton = () => {
        removeFunc(keyx);
    }

    return(
        <tr className='cnormalRevealRow'>
            <td className='cnormalRowTd'>
                <span 
                    className='cinputspan' 
                    onInput={handleItemQuestionChange} 
                    role="textarea" 
                    contentEditable 
                    suppressContentEditableWarning={true}
					onPaste={(e:any) => {
						e.preventDefault();
						const text = (e.originalEvent || e).clipboardData.getData('text/plain');
						window.document.execCommand('insertText', false, text);
					}}
                ></span>    
            </td>
            <td className='cnormalRowTd'>
				<span 
                    className='cinputspan' 
                    onInput={handleItemAnswerChange} 
                    role="textarea" 
                    contentEditable 
                    suppressContentEditableWarning={true}
					onPaste={(e:any) => {
						e.preventDefault();
						const text = (e.originalEvent || e).clipboardData.getData('text/plain');
						window.document.execCommand('insertText', false, text);
					}}
                ></span> 
            </td>
            <td className='cnormalRowTd'>
                <div className='cdelButton' onClick={clickDeleteButton}>
                    <IoMdClose size='20px' color={`rgb(70, 70, 70)`} />
                </div>
            </td>
        </tr>
    )
}

export const CreateView = ({username}: {username:string}) => {
    const initVals = {
        "0": { qside: '', aside: '', key: 0, correct: 0, attempts: 0},
        "1": { qside: '', aside: '', key: 1, correct: 0, attempts: 0},
        "2": { qside: '', aside: '', key: 2, correct: 0, attempts: 0},
        "3": { qside: '', aside: '', key: 3, correct: 0, attempts: 0},
        "4": { qside: '', aside: '', key: 4, correct: 0, attempts: 0},
    }
    const initID = 5;
    const [values, setValues] = useState(initVals)
    const [collName, setCollName] = useState('');
    const [newID, setNewID] = useState(initID);
    const [notificationMessage, setNotificationMessage] = useState('');
	const [notificationTimeout, setNotificationTimeout] = useState<null | NodeJS.Timeout>(null);
    const navigate = useNavigate();

	const ClearNotificationError = (time:number) => {
		if(notificationTimeout){
			clearTimeout(notificationTimeout);
		}
		const timeoutN = setTimeout(() => {
			setNotificationMessage('');
		},time);
		setNotificationTimeout(timeoutN);
	}

    const removeItemFromTable = (ind:number) => {
        const newValuesDictionary = Object.assign({}, values);
        delete newValuesDictionary[ind as keyof object];
        setValues(newValuesDictionary);
        console.log(newValuesDictionary);
    }
    
    const handleQsideChange = (fieldId: number, value: string) => {
        const indx = fieldId.toString();
        const oldItem:object = values[indx as keyof object];
        setValues({...values, [fieldId]: {...oldItem, qside: value}});
    };

    const handleAsideChange = (fieldId: number, value: string) => {
        const indx = fieldId.toString();
        const oldItem:object = values[indx as keyof object];
        setValues({...values, [fieldId]: {...oldItem, aside: value}});
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        console.log(val);
        setCollName(val);
    };

    const tableRowComponents = objectMap(values, (item: SingleItem) => {
        return (<NormalCreateTableRow 
            qtext={item.qside}
            atext={item.aside}
            key={item.key} 
            keyx={item.key} 
            removeFunc={removeItemFromTable} 
            asideChangeFunc={handleAsideChange}
            qsideChangeFunc={handleQsideChange}
        />);
    });

    const tableRowArray = Object.values(tableRowComponents);

    const addCollection = (event: SyntheticEvent) => {
        event.preventDefault();

		if(collName===''){
			setNotificationMessage('Name field is empty, add a name to create set');
			ClearNotificationError(5000);
			return;
		}
		let empties = false;
		for (const key in values) {
			const obj = values[key as keyof typeof values];
			if(obj['aside']==='' || obj['qside']===''){
				setNotificationMessage('Some fields are empty, remove or fill to create set');
				ClearNotificationError(5000);
				empties = true;
				return;
			}
		}

		if(empties){
			return;
		}

        const itemsAsArray = Object.values(values);

		if(itemsAsArray.length===0){
			setNotificationMessage('A collection needs to have at least 1 note');
			ClearNotificationError(5000);
			return;
		}

        const collectionObject = {
            name: collName,
            creator: username,
            itemCount: tableRowArray.length,
            items: itemsAsArray,
        }
        console.log(collectionObject);
        collectionService
            .create(collectionObject)
            .then(returnedCollection => {
                console.log(returnedCollection);
                navigate('/');
                navigate(0);
            })
            .catch(error => {
                if(error.code==="ERR_NETWORK"){
                    setNotificationMessage('Network error - please check your internet connection!');
                }else{
                    setNotificationMessage(error.message);
                }
				if(error.response.data.error==='token expired'){
					window.localStorage.removeItem('loggedFlashcardAppUser');
					window.location.reload();
				}
                console.log(error);
                ClearNotificationError(5000);
            });
    }

    const addRowToTable = () => {
        const id = newID;
        setNewID(newID + 1);
        setValues({...values, [id]: {
            qside: '', 
            aside: '', 
            key: id,
            correct: 0,
			attempts: 0
        }});
        console.log("added row");
    }
    
    return(
        <>
        <div className="createviewContainerMain">

            <Notification text={notificationMessage}/>

            <div className='createViewName'>Create Collection</div>

            <div className="collectionNameContainer">
                <input type="text" className='nameInput' value={collName} onChange={handleNameChange} placeholder="Name..."></input>
                <button className='submitButtonName' form='my-form' type='submit'>Create</button>
            </div>

            <div className='creationContainer'>
                <div className='createCollectionTable'>
                    <form className='cTableForm' onSubmit={addCollection} id='my-form'>
            
                        <table className='createTable'>
                        <colgroup>
                            <col className="cquestionColumn"></col>
                            <col className="canswerColumn"></col>
                            <col className='cdeleteColumn'></col>
                        </colgroup>
                        <tbody>
                        <tr className='cboldRow'>
                            <td className='cheaderRow'>
                                <div className='ctdText'>Note</div>
                            </td>
                            <td className='cheaderRow'>
                                <div className='ctdText'>Definition</div>
                            </td>
                            <td className='cheaderRow'>
                                <div className='ctdText'>
                                    <div className='cDelIcon'>
                                        <RiDeleteBinLine size='20px' color={`rgb(31,48,76)`} />
                                    </div>
                                </div>
                            </td>
                        </tr>
                            {tableRowArray}
                        </tbody>
                        </table>

                        <div className='caddAnotherRowContainer'>
                            <div className='addRowButton' onClick={addRowToTable}>+ Add</div>
                        </div>

                        <div className='cbelowTableContainer'>
                            <button className='submitButton' type="submit">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}