import './CreateView.css';
import { RiDeleteBinLine } from 'react-icons/ri'
import { IoMdClose } from 'react-icons/io'
import { SyntheticEvent } from 'react';
import { CollectionItem, CollectionData } from '../../Types';
import { useState } from 'react';

const getRandomID = (): number => {
    return Math.floor(Math.random() * 10000000);
}

const NormalCreateTableRow = ({question, answer, keyx, removeFunc}: {question: string ,answer: string, keyx: number, removeFunc: any}) => {
    const [newItem, setNewItem] = useState(
        {
            qside: '',
            aside: ''
        }
    )

    const handleItemQuestionChange = (event: SyntheticEvent) => {
        let val = event.currentTarget.textContent;
        if(val==null){
            val='';
        }
        console.log(val);
        setNewItem(
            {
                ...newItem, 
                qside: val,
            }
        );
    }

    const handleItemAnswerChange = (event: SyntheticEvent) => {
        let val = event.currentTarget.textContent;
        if(val==null){
            val='';
        }
        console.log(val);
        setNewItem(
            {
                ...newItem, 
                aside: val,
            }
        );
    }

    const clickDeleteButton = () => {
        removeFunc(keyx);
        console.log(keyx);
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
                >{question}</span>    
            </td>
            <td className='cnormalRowTd'>
                <span 
                    className='cinputspan'
                    onInput={handleItemAnswerChange} 
                    role="textarea" 
                    contentEditable 
                    suppressContentEditableWarning={true}
                >{answer}</span>  
            </td>
            <td className='cnormalRowTd'>
                <div className='cdelButton' onClick={clickDeleteButton}>
                    <IoMdClose size='20px' color={`rgb(70, 70, 70)`} />
                </div>
            </td>
        </tr>
    )
}

export const CreateView = ({collectionData}: {collectionData: Array<CollectionData>}) => {
    const [newCollection, setNewCollection] = useState(
        [
            {
                qside: '',
                aside: '',
            },
            {
                qside: '',
                aside: '',
            },
            {
                qside: '',
                aside: '',
            },
            {
                qside: '',
                aside: '',
            },
            {
                qside: '',
                aside: '',
            }
        ]
    )
    
    const removeItemFromTable = (ind:number) => {
        setRows(rows.filter(itm => {
            console.log(itm);
            return itm.key !== ind;
        }
        ))
        console.log(rows);
    }

    const initialArr = [
        <NormalCreateTableRow key={0} question={""} answer={""} keyx={0} removeFunc={removeItemFromTable}/>,
        <NormalCreateTableRow key={1} question={""} answer={""} keyx={1} removeFunc={removeItemFromTable}/>,
        <NormalCreateTableRow key={2} question={""} answer={""} keyx={2} removeFunc={removeItemFromTable}/>,
        <NormalCreateTableRow key={3} question={""} answer={""} keyx={3} removeFunc={removeItemFromTable}/>,
        <NormalCreateTableRow key={4} question={""} answer={""} keyx={4} removeFunc={removeItemFromTable}/>
    ]

    const [newItemCount, setNewItemCount] = useState(5);
    const [rows, setRows] = useState(initialArr);

    const addCollection = (event: SyntheticEvent) => {
        event.preventDefault()
        console.log('created collection', event.target)
        const collectionObject = {
            id: collectionData.length + 1,
            name: 'nullUsername',
            creator: 'nullUsername',
            itemCount: 2,
        }
    }

    const addRowToTable = () => {
        const id = getRandomID();
        setRows(rows.concat(<NormalCreateTableRow key={id} question={""} answer={""} keyx={id} removeFunc={removeItemFromTable}/>));
        console.log(rows);
    }
    

    return(
        <>
        <div className="createviewContainerMain">

            <div className='createViewName'>Create Collection</div>

            <div className="collectionNameContainer">
                <input type="text" className='nameInput'  placeholder="Name..."></input>
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
                            {rows}
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