import { MdKeyboardArrowDown } from 'react-icons/md'
import { CollectionItem } from '../../types';
import './StatisticsTable.css';

const MasteryBoxElement = ({level}: {level: number | undefined}) => {
	let newLevel: number;
	if(level===undefined){
		newLevel = 1;
	}else{
		newLevel = level + 1;
	}

    return(
        <td className='masteryTextTable'>
            <div className='masteryboxes'>
                {[...Array(newLevel)].map(
                (value: undefined, index: number) => (
                    <div className={`masterybox${newLevel}`} key={index}></div>
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
						<div className='tdText'>Note</div>
						<div className='arrowIcon'><MdKeyboardArrowDown size='20px' color={`rgb(80, 80, 80)`} /></div>
					</td>
					<td className='headerRow attemptsTextTable'>
						<div className='tdTextAttempts'>Attempts</div>
						<div className='arrowIcon'><MdKeyboardArrowDown size='20px' color={`rgb(80, 80, 80)`} /></div>
					</td>
					<td className='headerRow masteryTextTable'>
						<div className='tdTextMastery'>Mastery</div>
						<div className='arrowIconMastery'><MdKeyboardArrowDown size='20px' color={`rgb(80, 80, 80)`} /></div>
					</td>
				</tr>
				<>
				{items?.map((item:CollectionItem) => {
					return (<NormalTableRow key={item.key} item={item}/>);
				})}
				</>
			</tbody>
            </table>
        </div>
    )
}