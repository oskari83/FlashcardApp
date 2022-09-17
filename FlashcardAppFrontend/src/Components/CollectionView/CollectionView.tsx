import { FlipMode } from '../FlipMode/FlipMode';
import { RevealMode } from '../RevealMode/RevealMode';
import { StatisticsTable } from '../StatisticsTable/StatisticsTable';
import { CollectionEdit } from '../CollectionEdit/CollectionEdit';
import { IoMdStats, IoMdPlay } from 'react-icons/io';
import { AiFillEdit } from 'react-icons/ai';
import { useState } from 'react';
import './CollectionView.css';
import { CollectionData } from '../../types';
import { useParams } from "react-router-dom";

export const CollectionView = ({collections}: {collections: CollectionData[]}) => {
    const [currentSelection, setCurrentSelection] = useState(0);
    const [bookmarked, setBookmarked] = useState(false);

	const id = useParams().id;
	const collection: undefined | CollectionData = collections.find(col => col.id ===id);

    const bookmarkThis = () => {
        setBookmarked(!bookmarked);
    }

    const selectionChange = (id: number) => {
        setCurrentSelection(id)
    }

	const GoToEditCollection = () => {
		setCurrentSelection(3);
	}

    return(
        <>
        <div className="containerMain">
            <div className="setInfoContainer">
            <div className="setName">
                <div className='setNameText'>{collection!==undefined ? collection?.name : 'Loading...'}</div>
                <div className={`setNameIconButton${bookmarked ? 'Saved' : ''} noselect`} onClick={() => bookmarkThis()}>
                    { bookmarked ? "Saved" : "Save"}
                </div>
            </div>
            <div className='setProgress'>43%</div>
            <div className="setInfo">{`Creator: ${collection!==undefined ? collection?.creator : 'Loading...'}, Objects: ${collection!==undefined ? collection?.items.length : 'Loading...'}`}</div>
            </div>

            <div className='setAreaOuter'>
            <div className="setAreaContainer">
                <div className="selectorBar">
                <div className={currentSelection===0 ? `selectorBarItemSelected` : `selectorBarItem`} onClick={() => selectionChange(0)}>
                    <div className='selectorBarItemIcon'><IoMdStats size='16px' color={currentSelection===0 ? `rgb(41, 116, 255)` : `rgb(92, 92, 92)`} /></div>
                    <div className='selectorBarItemText'>Overview</div>
                </div>
                <div className={currentSelection===1 ? `selectorBarItemSelected` : `selectorBarItem`} onClick={() => selectionChange(1)}>
                    <div className='selectorBarItemIcon'><IoMdPlay size='16px' color={currentSelection===1 ? `rgb(41, 116, 255)` : `rgb(92, 92, 92)`} /></div>
                    <div className='selectorBarItemText'>Flip</div>
                </div>
                <div className={currentSelection===2 ? `selectorBarItemSelected` : `selectorBarItem`} onClick={() => selectionChange(2)}>
                    <div className='selectorBarItemIcon'><IoMdPlay size='16px' color={currentSelection===2 ? `rgb(41, 116, 255)` : `rgb(92, 92, 92)`} /></div>
                    <div className='selectorBarItemText'>Reveal</div>
                </div>
                <div className={currentSelection===3 ? `selectorBarItemSelected` : `selectorBarItem`} onClick={() => selectionChange(3)}>
                    <div className='selectorBarItemIcon'><AiFillEdit size='16px' color={currentSelection===3 ? `rgb(41, 116, 255)` : `rgb(92, 92, 92)`} /></div>
                    <div className='selectorBarItemText'>Edit</div>
                </div>
                </div>

                {currentSelection===0 && 
                <StatisticsTable items={collection?.items} />
                } 

                {currentSelection===1 && 
                <FlipMode items={collection?.items} />
                } 

                {currentSelection===2 && 
                <RevealMode items={collection?.items}/>
                } 

                {currentSelection===3 && 
                <CollectionEdit items={collection?.items} name={collection?.name} id={collection?.id}/>
                } 

            </div>
            </div>
        </div>
		<div className='emptyCont'></div>
        </>
    )
}