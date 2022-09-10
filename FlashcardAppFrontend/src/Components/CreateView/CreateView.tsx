import './CreateView.css';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';
import { ChangeEvent, SyntheticEvent } from 'react';
import { CollectionItem, CollectionData } from '../../types';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import collectionService from '../../services/collections';
import { Notification } from '../Notification/Notification';

const objectMap = (obj: object, fn: any) =>
  Object.fromEntries(
    Object.entries(obj).map(
      ([k, v], i) => [k, fn(v, k, i)]
    )
)

const NormalCreateTableRow = ({qtext, atext, keyx, removeFunc, asideChangeFunc, qsideChangeFunc}: {qtext: string, atext: string, keyx: number, removeFunc: any, asideChangeFunc: any, qsideChangeFunc: any}) => {

    const handleItemQuestionChange = (event: SyntheticEvent) => {
        let val = event.currentTarget.textContent;
        if(val==null){
            val='';
        }
        console.log(val);
        qsideChangeFunc(keyx,val);
    }

    const handleItemAnswerChange = (event: SyntheticEvent) => {
        let val = event.currentTarget.textContent;
        if(val==null){
            val='';
        }
        console.log(val);
        asideChangeFunc(keyx,val);
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
                    
                ></span>    
            </td>
            <td className='cnormalRowTd'>
                <span 
                    className='cinputspan'
                    onInput={handleItemAnswerChange} 
                    role="textarea" 
                    contentEditable 
                    suppressContentEditableWarning={true}
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

interface SingleItem {
    aside: string,
    qside: string, 
    key: number,
}

export const CreateView = ({collectionData, createFunc}: {collectionData: Array<CollectionData>, createFunc: any}) => {
    const initVals = {
        "0": { qside: '', aside: '', key: 0, correct: 0},
        "1": { qside: '', aside: '', key: 1, correct: 0},
        "2": { qside: '', aside: '', key: 2, correct: 0},
        "3": { qside: '', aside: '', key: 3, correct: 0},
        "4": { qside: '', aside: '', key: 4, correct: 0},
    }
    const initID = 5;
    const [values, setValues] = useState(initVals)
    const [collName, setCollName] = useState('');
    const [newID, setNewID] = useState(initID);
    const [notificationMessage, setNotificationMessage] = useState('');
    const navigate = useNavigate();

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
        return <NormalCreateTableRow 
            qtext={item.qside}
            atext={item.aside}
            key={item.key} 
            keyx={item.key} 
            removeFunc={removeItemFromTable} 
            asideChangeFunc={handleAsideChange}
            qsideChangeFunc={handleQsideChange}
        />
    });

    const tableRowArray = Object.values(tableRowComponents);

    const addCollection = (event: SyntheticEvent) => {
        event.preventDefault()
        const itemsAsArray = Object.values(values);
        const collectionObject = {
            name: collName,
            creator: 'nullUsername',
            itemCount: tableRowArray.length,
            items: itemsAsArray,
        }
        console.log(collectionObject);
        collectionService
            .create(collectionObject)
            .then(returnedCollection => {
                console.log(returnedCollection);
                //createFunc(collectionObject);
                navigate('/');
            })
            .catch(error => {
                if(error.code==="ERR_NETWORK"){
                    setNotificationMessage('Network error - please check your internet connection!');
                }else{
                    setNotificationMessage(error.message);
                }
                console.log(error);
                setTimeout(() => setNotificationMessage(''), 5000);
            });
    }

    const addRowToTable = () => {
        const id = newID;
        setNewID(newID + 1);
        setValues({...values, [id]: {
            qside: '', 
            aside: '', 
            key: id,
            correct: 0
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
                                <div className='ctdText'>Object</div>
                            </td>
                            <td className='cheaderRow'>
                                <div className='ctdText'>Definition</div>
                            </td>
                            <td className='cheaderRow'>
                                <div className='ctdText'>
                                    <div className='cDelIcon'>
                                        <RiDeleteBinLine size='20px' color={`rgb(70, 70, 70)`} />
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