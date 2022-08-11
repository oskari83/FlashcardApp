import './StatisticsTable.css';
import { MdKeyboardArrowDown } from 'react-icons/md'

const MasteryBoxElement = ({level}: {level: number}) => {
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

const NormalTableRow = ({text, attempts, level}: {text: string,attempts: number,level: number}) => {
    return(
        <tr className='normalRow'>
        <td>{text}</td>
        <td className='attemptsTextTable'>{attempts}</td>
        <MasteryBoxElement level={level}/>
        </tr>
    )
}

export const StatisticsTable = () => {
    return(
        <table className='statsTable'>
        <colgroup>
            <col className="itemColumn"></col>
            <col className="attemptsColumn"></col>
            <col className="masteryColumn"></col>
        </colgroup>
        <tbody>
        <tr className='boldRow'>
            <td className='headerRow'>
                <div className='tdText'>Item</div>
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
        <NormalTableRow text={"non-price determinants of demand"} attempts={5} level={4}/>
        <NormalTableRow text={"the law of supply"} attempts={4} level={2}/>
        <NormalTableRow text={"competetive supply"} attempts={5} level={3}/>
        <NormalTableRow text={"Market equilibrium"} attempts={4} level={1}/>
        <NormalTableRow text={"allocative efficiency"} attempts={4} level={4}/>
        <NormalTableRow text={"where allocative efficiency occurs"} attempts={5} level={4}/>
        </tbody>
        </table>
    )
}