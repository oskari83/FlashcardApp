import './RevealMode.css'
import { useState } from 'react';
import { CollectionItem } from '../../types';

const NormalTableRow = ({item}: {item: CollectionItem}) => {
    const [show, setShow] = useState(0);

    const showAnswer = () => {
        show<2 && setShow(show + 1);
    }

    const giveFeedBack = () => {
        setShow(0);
    }

    return(
        <tr className='normalRevealRow'>
            <td className='normalRowTd'>{item.qside}</td>
            <td className={`normalAnswerTd${show}`} onClick={() => showAnswer()}>
                {item.aside}
                {show===2 && 
                <div className='tdFbOuter'>
                    <div className='fbneg' onClick={() => giveFeedBack()}>-1</div>
                    <div className='fbneu' onClick={() => giveFeedBack()}>0</div>
                    <div className='fbpos' onClick={() => giveFeedBack()}>1</div> 
                </div>                        
                }
            </td>
        </tr>
    )
}

export const RevealMode = ({items}:{items:CollectionItem[] | undefined}) => {
    return(
        <div className='revealmodeTable'>
            <table className='revealTable'>
            <colgroup>
                <col className="questionColumn"></col>
                <col className="answerColumn"></col>
            </colgroup>
            <tbody>
            <tr className='fboldRow'>
                <td className='fheaderRow'>
                    <div className='ftdText'>Object</div>
                </td>
                <td className='fheaderRow'>
                    <div className='ftdText'>Definition {"(click to reveal)"}</div>
                </td>
            </tr>
			{items?.map((item:CollectionItem) => {
				return (<NormalTableRow key={item.key} item={item}/>);
			})}
            </tbody>
            </table>
        </div>
    )
}