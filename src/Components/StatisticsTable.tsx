import './StatisticsTable.css';

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
            <td>Item</td>
            <td className='attemptsTextTable'>Attempts</td>
            <td className='masteryTextTable'>Mastery</td>
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