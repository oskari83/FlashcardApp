import { MdKeyboardArrowDown } from 'react-icons/md'
import { CollectionItem } from '../../types';
import { BsCheck } from 'react-icons/bs'; 
import { useEffect, useState } from 'react';
import './StatisticsTable.css';

const MasteryBoxElement = ({level}: {level: number | undefined}) => {
	const [mastered, setMastered] = useState(false);
	const [newLevel, setNewLevel] = useState<number>(1);

	useEffect(() => {
		if(level!==undefined){
			if(level>=3){
				setNewLevel(4);
				setMastered(true);
			}else{
				setNewLevel(level+1);
			}
		}	
	}, [level]);

    return(
        <td className='masteryTextTable'>
            <div className='masteryboxes'>
                {[...Array(newLevel)].map(
                (value: undefined, index: number) => (
                    <div className={`masterybox${newLevel}`} key={index}></div>
                )
                )}
				{mastered && <BsCheck size='20px' color={`rgb(65, 228, 112)`} />}
            </div>
        </td>
    )
}

const NormalTableRow = ({item}: {item:CollectionItem}) => {
    return(
        <tr className='normalRow'>
			<td>{item.qside}</td>
			<td className='attemptsTextTable'>{item.correct}</td>
			<MasteryBoxElement level={item.correct}/>
        </tr>
    )
}

export const StatisticsTable = ({items}: {items: CollectionItem[] | undefined}) => {
	const [sortState, setSortState] = useState<number>(0);
	const [itemsShowing,setItemsShowing] = useState<CollectionItem[]>([]);
	//states 0-2 are for name, 3-4 for attempts, 5-6 for level
	useEffect(() => {
		if(items!==undefined){
			if(sortState===0){
				setItemsShowing(items);
			}else if(sortState===1){
				setItemsShowing([...items].sort(function(a:CollectionItem, b:CollectionItem) {
					return a.qside.localeCompare(b.qside);
				}));
			}else if(sortState===2){
				setItemsShowing([...items].sort(function(a:CollectionItem, b:CollectionItem) {
					return b.qside.localeCompare(a.qside);
				}));
			}else if(sortState===3){
				setItemsShowing([...items].sort(function(a:CollectionItem, b:CollectionItem) {
					return a.attempts-b.attempts;
				}));
			}else if(sortState===4){
				setItemsShowing([...items].sort(function(a:CollectionItem, b:CollectionItem) {
					return b.attempts-a.attempts;
				}));
			}else if(sortState===5){
				setItemsShowing([...items].sort(function(a:CollectionItem, b:CollectionItem) {
					return a.correct-b.correct;
				}));
			}else if(sortState===6){
				setItemsShowing([...items].sort(function(a:CollectionItem, b:CollectionItem) {
					return b.correct-a.correct;
				}));
			}	
		}	
	}, [items,sortState]);

	const SortByNameClick = () => {
		if(sortState===2){
			setSortState(0);
		}else if (sortState===0 || sortState===1){
			setSortState((v:number) => v+1);
		}else{
			setSortState(1);
		}
	}

	const SortByAttemptsClick = () => {
		if(sortState===4){
			setSortState(0);
		}else if (sortState===0){
			setSortState(3);
		}else if(sortState===3){
			setSortState((v:number) => v+1);
		}else{
			setSortState(3);
		}
	}

	const SortByMasteryClick = () => {
		if(sortState===6){
			setSortState(0);
		}else if (sortState===0){
			setSortState(5);
		}else if(sortState===5){
			setSortState((v:number) => v+1);
		}else{
			setSortState(5);
		}
	}

    return(
        <div className="setStatisticsTable">
            <table className='statsTable'>
            <colgroup>
                <col className="itemColumn"></col>
                <col className="attemptsColumn"></col>
                <col className="masteryColumn"></col>
            </colgroup>
			<tbody>
				<tr className='boldRow'>
					<td className='headerRow noselect' onClick={SortByNameClick}>
						<div className='tdText  noselect'>Note</div>
						<div className='arrowIcon'><MdKeyboardArrowDown size='20px' color={`rgb(80, 80, 80)`} /></div>
					</td>
					<td className='headerRow attemptsTextTable  noselect' onClick={SortByAttemptsClick}>
						<div className='tdTextAttempts  noselect'>Attempts</div>
						<div className='arrowIcon'><MdKeyboardArrowDown size='20px' color={`rgb(80, 80, 80)`} /></div>
					</td>
					<td className='headerRow masteryTextTable  noselect' onClick={SortByMasteryClick}>
						<div className='tdTextMastery  noselect'>Mastery</div>
						<div className='arrowIconMastery'><MdKeyboardArrowDown size='20px' color={`rgb(80, 80, 80)`} /></div>
					</td>
				</tr>
				<>
				{itemsShowing.map((item:CollectionItem) => {
					return (<NormalTableRow key={item.key} item={item}/>);
				})}
				</>
			</tbody>
            </table>
        </div>
    )
}