import { FlipMode } from '../FlipMode/FlipMode';
import { RevealMode } from '../RevealMode/RevealMode';
import { StatisticsTable } from '../StatisticsTable/StatisticsTable';
import { CollectionEdit } from '../CollectionEdit/CollectionEdit';
import { IoMdStats, IoMdPlay } from 'react-icons/io'
import { RiDeleteBin2Line } from 'react-icons/ri';
import { BsBookmark,BsBookmarkCheckFill } from "react-icons/bs"
import { AiFillEdit } from 'react-icons/ai'
import { useState } from 'react';
import './CollectionView.css';
import { CollectionData } from '../../types';
import { useParams } from "react-router-dom";

export const CollectionView = ({collections}: {collections: CollectionData[]}) => {
    const [currentSelection, setCurrentSelection] = useState(0);
    const [bookmarked, setBookmarked] = useState(false);
	const [collection, setCollection] = useState<null | CollectionData>(null);
	const [check,setCheck] = useState(0);

	const id = useParams().id;
	const collection2 = collections.find(col => col.id ===id);
	console.log(collection2);

	if(collection2!==undefined && check===0){
		setCollection(collection2);
		setCheck(1);
	}

    const bookmarkThis = () => {
        setBookmarked(!bookmarked);
    }

    const selectionChange = (id: number) => {
        setCurrentSelection(id)
    }

    return(
        <>
        <div className="containerMain">
            <div className="setInfoContainer">
            <div className="setName">
                <div className='setNameText'>{collection!==null ? collection?.name : 'Loading...'}</div>
                <div className='setNameIcon' onClick={() => bookmarkThis()}>
                    { bookmarked ? 
                    <BsBookmarkCheckFill size='16px' color={`rgb(248, 222, 106)`} />
                    :
                    <BsBookmark size='16px' color={`rgb(78, 78, 78)`} />
                    }
                    <div className='innerSetNameText'>
                        { bookmarked ? "Saved" : "Save"}
                    </div>
                </div>
                <div className='setDelIcon'>
                    <RiDeleteBin2Line size='20px' color={`rgb(116, 116, 116)`} />
                    <div className='innerSetNameText'>Delete</div>
                </div>
            </div>
            <div className='setProgress'>43%</div>
            <div className="setInfo">{`Creator: ${collection!==null ? collection?.creator : 'Loading...'}, Objects: ${collection!==null ? collection?.items.length : 'Loading...'}`}</div>
            </div>

            <div className='setAreaOuter'>
            <div className="setAreaContainer">
                <div className="selectorBar">
                <div className={currentSelection===0 ? `selectorBarItemSelected` : `selectorBarItem`} onClick={() => selectionChange(0)}>
                    <div className='selectorBarItemIcon'><IoMdStats size='20px' color={currentSelection===0 ? `rgb(41, 116, 255)` : `rgb(92, 92, 92)`} /></div>
                    <div className='selectorBarItemText'>Overview</div>
                </div>
                <div className={currentSelection===1 ? `selectorBarItemSelected` : `selectorBarItem`} onClick={() => selectionChange(1)}>
                    <div className='selectorBarItemIcon'><IoMdPlay size='20px' color={currentSelection===1 ? `rgb(41, 116, 255)` : `rgb(92, 92, 92)`} /></div>
                    <div className='selectorBarItemText'>Flip</div>
                </div>
                <div className={currentSelection===2 ? `selectorBarItemSelected` : `selectorBarItem`} onClick={() => selectionChange(2)}>
                    <div className='selectorBarItemIcon'><IoMdPlay size='20px' color={currentSelection===2 ? `rgb(41, 116, 255)` : `rgb(92, 92, 92)`} /></div>
                    <div className='selectorBarItemText'>Reveal</div>
                </div>
                <div className={currentSelection===3 ? `selectorBarItemSelected` : `selectorBarItem`} onClick={() => selectionChange(3)}>
                    <div className='selectorBarItemIcon'><AiFillEdit size='20px' color={currentSelection===3 ? `rgb(41, 116, 255)` : `rgb(92, 92, 92)`} /></div>
                    <div className='selectorBarItemText'>Edit</div>
                </div>
                </div>

                {currentSelection===0 && 
                <StatisticsTable items={collection?.items} />
                } 

                {currentSelection===1 && 
                <FlipMode />
                } 

                {currentSelection===2 && 
                <RevealMode />
                } 

                {currentSelection===3 && 
                <CollectionEdit />
                } 

            </div>
            </div>
        </div>
        </>
    )
}