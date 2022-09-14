import './StatisticsTable.css';
import { MdKeyboardArrowDown } from 'react-icons/md'
import { CollectionData, CollectionItem } from '../../types';
import { useState } from 'react';

const MasteryBoxElement = ({level}: {level: number | undefined}) => {
    return(
        <td className='masteryTextTable'>
            <div className='masteryboxes'>
                {[...Array(level)].map(
                (value: undefined, index: number) => (
                    <div className={`masterybox${level}`} key={index}></div>
                )
                )}
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
	const [itemss, setItemss] = useState<null | CollectionItem[]>(null);
	const [check,setCheck] = useState(0);

	if(items!==undefined && check===0){
		setItemss(items);
		setCheck(1);
		console.log(items);
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
				<td className='headerRow'>
					<div className='tdText'>Object</div>
					<div className='arrowIcon'><MdKeyboardArrowDown size='20px' color={`rgb(78, 78, 78)`} /></div>
				</td>
				<td className='headerRow attemptsTextTable'>
					<div className='tdTextAttempts'>Attempts</div>
					<div className='arrowIcon'><MdKeyboardArrowDown size='20px' color={`rgb(78, 78, 78)`} /></div>
				</td>
				<td className='headerRow masteryTextTable'>
					<div className='tdTextMastery'>Mastery</div>
					<div className='arrowIconMastery'><MdKeyboardArrowDown size='20px' color={`rgb(78, 78, 78)`} /></div>
				</td>
			</tr>
			<>
			{itemss?.map((item:CollectionItem) => {
				<NormalTableRow item={item}/>
			})}
			</>
			</tbody>
            </table>
        </div>
    )
}