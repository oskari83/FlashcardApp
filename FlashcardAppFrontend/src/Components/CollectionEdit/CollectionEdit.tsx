import { RiDeleteBinLine } from 'react-icons/ri'
import { IoMdClose } from 'react-icons/io'
import { useState, SyntheticEvent } from 'react';
import { useNavigate } from "react-router-dom";
import { SingleItem } from '../../types';
import objectMap from '../../Utils/objectMap';
import generateID from '../../Utils/idGenerator';
import './CollectionEdit.css'

const NormalTableRow = ({qtext, atext, keyx, removeFunc, asideChangeFunc, qsideChangeFunc}: {qtext: string, atext: string, keyx: number, removeFunc: any, asideChangeFunc: any, qsideChangeFunc: any}) => {
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
        <tr className='enormalRevealRow'>
            <td className='enormalRowTd'> 
				<span 
                    className='inputspan' 
                    onInput={handleItemQuestionChange} 
                    role="textarea" 
                    contentEditable 
                    suppressContentEditableWarning={true}
					onPaste={(e:any) => {
						e.preventDefault();
						const text = (e.originalEvent || e).clipboardData.getData('text/plain');
						window.document.execCommand('insertText', false, text);
					}}
                >{qtext}</span>  
            </td>
            <td className='enormalRowTd'>
				<span 
                    className='inputspan' 
                    onInput={handleItemAnswerChange} 
                    role="textarea" 
                    contentEditable 
                    suppressContentEditableWarning={true}
					onPaste={(e:any) => {
						e.preventDefault();
						const text = (e.originalEvent || e).clipboardData.getData('text/plain');
						window.document.execCommand('insertText', false, text);
					}}
                >{atext}</span>
            </td>
            <td className='enormalRowTd'>
                <div className='delButton' onClick={clickDeleteButton}>
                    <IoMdClose size='20px' color={`rgb(70, 70, 70)`} />
                </div>
            </td>
        </tr>
    );
};

const arrayToObject = (arr: any, key: string) => {
	return arr.reduce((obje:any, item:any) => {
		console.log(item);
		obje = {...obje, [item[key]]: item}
		return obje;
	}, {});
};

export const CollectionEdit = ({items}: {items: any }) => {
	let initialValues: object;
	if(items===undefined){
		initialValues = {};
		setTimeout(() => {
			() => {
				if(items!==undefined){
					initialValues = arrayToObject(items,'key');
				}
			}
		},200);
	}else{
		initialValues=arrayToObject(items,'key');
	}

    const [values, setValues] = useState(initialValues);
    const [collName, setCollName] = useState('');
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
        return (<NormalTableRow 
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

	const saveEditedCollection = (event: SyntheticEvent) => {
        event.preventDefault()
        const itemsAsArray = Object.values(values);
        const collectionObject = {
            name: collName,
            items: itemsAsArray,
        }
        console.log(collectionObject);
    }

	const addRowToTable = () => {
        const id = generateID();
        setValues({...values, [id]: {
            qside: '', 
            aside: '', 
            key: id,
            correct: 0
        }});
        console.log("added row");
    }

    return(
        <div className='editCollectionTable'>
            <form className='editTableForm' onSubmit={saveEditedCollection} id='my-form'>
                
                <div className='aboveTableContainer'>
					<button className='submitButtonE' type="submit">Save</button>
                    <div className='cancelChanges'>Cancel changes</div>
                </div>

                <table className='editTable'>
					<colgroup>
						<col className="editquestionColumn"></col>
						<col className="editanswerColumn"></col>
						<col className='editdeleteColumn'></col>
					</colgroup>
					<tbody>
						<tr className='eboldRow'>
							<td className='eheaderRow'>
								<div className='etdText'>Note</div>
							</td>
							<td className='eheaderRow'>
								<div className='etdText'>Definition</div>
							</td>
							<td className='eheaderRow'>
								<div className='etdText'>
									<div className='editDelIcon'>
										<RiDeleteBinLine size='20px' color={`rgb(70, 70, 70)`} />
									</div>
								</div>
							</td>
						</tr>
						{tableRowArray}
					</tbody>
                </table>

                <div className='addAnotherRowContainer'>
                    <div className='addRowButtonE' onClick={addRowToTable}>+ Add</div>
                </div>

                <div className='belowTableContainer'>
					<button className='submitButtonE' type="submit">Save</button>
                    <div className='cancelChanges'>Cancel changes</div>
                </div>
            </form>
        </div>
    )
}