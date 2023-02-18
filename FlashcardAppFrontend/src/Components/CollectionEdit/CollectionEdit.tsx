import { RiDeleteBinLine } from 'react-icons/ri'
import { IoMdClose } from 'react-icons/io'
import { useState, SyntheticEvent, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { SingleItem, CollectionItem } from '../../types';
import collectionService from '../../services/collections';
import objectMap from '../../Utils/objectMap';
import './CollectionEdit.css'

const ContentEditableWithRef = (props:any) => {
	const defaultValue = useRef(props.value);
	const [init, setInit] = useState(props.value);

	useEffect(() => {
		defaultValue.current = props.value;
		setInit(props.value);
	}, [props.resets]);

	useEffect(() => {
		defaultValue.current = props.value;
		setInit(props.value);
	}, [init]);
  
	const handleInput = (event:any) => {
		if (props.onChange) {
			props.onChange(event.target.innerHTML);
		}
	};
  
	return (
		<span
			contentEditable
			onInput={handleInput}
			className="inputspan"
			role="textarea" 
			dangerouslySetInnerHTML={{ __html: init }}
			suppressContentEditableWarning={true}
			onPaste={(e:any) => {
				e.preventDefault();
				const text = (e.originalEvent || e).clipboardData.getData('text/plain');
				window.document.execCommand('insertText', false, text);
			}}
		/>
	);
  };

const NormalTableRow = ({qtext, atext, keyx, removeFunc, asideChangeFunc, qsideChangeFunc, resets}: {qtext: string, atext: string, keyx: number, removeFunc: any, asideChangeFunc: any, qsideChangeFunc: any, resets:number}) => {
    const [qside,setQside] = useState(qtext);
	const [aside,setAside] = useState(atext);

	useEffect(() => {
		setQside(qtext);
	}, [qtext]);

	useEffect(() => {
		setAside(atext);
	}, [atext]);
	
	const handleItemQuestionChange = (v: string) => {
		let val = v;
        if(val==null){
            val='';
        }
		const cleanedVal = val.replace(/(<([^>]+)>)/ig,"");
		const cleanedVal2 = cleanedVal.replace(/((&nbsp;))*/gmi,'');
        qsideChangeFunc(keyx,cleanedVal2);
		setQside(cleanedVal2);
    }

    const handleItemAnswerChange = (v: string) => {
        let val = v;
        if(val==null){
            val='';
        }
		const cleanedVal = val.replace(/(<([^>]+)>)/ig,"");
		const cleanedVal2 = cleanedVal.replace(/((&nbsp;))*/gmi,'');
        asideChangeFunc(keyx,cleanedVal2);
		setAside(cleanedVal2);
    }

    const clickDeleteButton = () => {
        removeFunc(keyx);
    }
	
	return(
        <tr className='enormalRevealRow'>
            <td className='enormalRowTd'> 
				<ContentEditableWithRef value={qside} onChange={(v:string) => handleItemQuestionChange(v)} resets={resets} />  
            </td>
            <td className='enormalRowTd'>
				<ContentEditableWithRef value={aside} onChange={(v:string) => handleItemAnswerChange(v)} resets={resets}/>
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
		obje = {...obje, [item[key]]: item}
		return obje;
	}, {});
};

export const CollectionEdit = ({items,name, id, notFunction}: {items: any,name:string | undefined, id:string | undefined, notFunction:any}) => {
	const getHighestID = () => {
		const nnnn = Object.entries(values);
		if(items!==undefined){
			return Math.max(...nnnn.map((o:any) => o[1]['key']));
		}
		return 10000002;
	}

    const [values, setValues] = useState( items!==undefined ? arrayToObject(items,'key') : {});
    const [collName, setCollName] = useState(name);
	const [resets, setResets] = useState(0);
    const navigate = useNavigate();

	useEffect(() => {
		setValues(arrayToObject(items,'key'));
	}, [items]);

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
			resets={resets}
        />);
    });

	const tableRowArray = Object.values(tableRowComponents);

	const saveEditedCollection = (event: SyntheticEvent) => {
        event.preventDefault()

		if(collName===''){
			notFunction('Name field is empty, add a name to save set',5000);
			return;
		}
		let empties = false;
		for (const key in values) {
			const obj = values[key as keyof typeof values];
			if(obj['aside']==='' || obj['qside']===''){
				notFunction('Some fields are empty, remove or fill to save set',5000);
				empties = true;
				return;
			}
		}

		if(empties){
			return;
		}

        const itemsAsArray: CollectionItem[] = Object.values(values);

		if(itemsAsArray.length===0){
			notFunction('A collection needs to have at least 1 note',5000);
			return;
		}

        const collectionObject = {
            name: collName,
            items: itemsAsArray,
        }
        console.log(collectionObject);

		if(id){
			collectionService
            .update(id,collectionObject)
            .then(data => {
                console.log(data);
                navigate(0);
            })
            .catch(error => {
                if(error.code==="ERR_NETWORK"){
					notFunction('Network error - please check your internet connection!',5000);
                    //setNotificationMessage('Network error - please check your internet connection!');
                }else if(error.response.data.error === 'token expired'){
					//if our token expires while we are editing collection, not tested, hopefully works
					navigate('/getstarted')
				}else{
					notFunction(error.message,5000);
                }
                console.log(error);
            });
		}
    }

	const CancelAllChanges = () => {
		setValues(arrayToObject(items,'key'));
		setCollName(name);
		setResets((r:number) => r+1);
	}

	const addRowToTable = () => {
        const id = getHighestID() + 1;
		console.log(id);
        setValues({...values, [id]: {
            qside: '', 
            aside: '', 
            key: id,
            correct: 0,
			attempts: 0,
        }});
		console.log(values);
        console.log("added row");
    }

    return(
        <div className='editCollectionTable'>
            <form className='editTableForm' onSubmit={saveEditedCollection} id='my-form'>
                
                <div className='aboveTableContainer'>
					<input type="text" className='nameInputE' value={collName} onChange={handleNameChange} placeholder="Name..."></input>
					<button className='submitButtonE' type="submit">Save</button>
                    <div className='cancelChanges' onClick={CancelAllChanges}>Cancel</div>
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
										<RiDeleteBinLine size='20px' color={`rgb(31,48,76)`} />
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
                    <div className='cancelChanges' onClick={CancelAllChanges}>Cancel</div>
                </div>
            </form>
        </div>
    )
}