import './Card.css';
import { useFitText } from '../../../../Utils/useFitText';
import { BsCheck } from 'react-icons/bs'; 
import { useEffect, useState } from 'react';

export const Card = ({cardFrontText, cardBackText, cardClass, rotateFunc, cardMastery}: {cardFrontText: string, cardBackText: string, cardClass:string, rotateFunc: any, cardMastery: number}) => {
	const fontSizeF = useFitText(cardFrontText);
	const fontSizeB = useFitText(cardBackText);

	const [mastered, setMastered] = useState(false);
	const [newLevel, setNewLevel] = useState<number>(1);

	useEffect(() => {
		if(cardMastery!==undefined){
			if(cardMastery>=4){
				setNewLevel(4);
				setMastered(true);
			}else{
				setNewLevel(cardMastery+1);
				setMastered(false);
			}
		}	
	}, [cardMastery]);

    return(
      <div className={cardClass} onClick={rotateFunc}>
          <div className="thefront noselect">
            <div className="fronttext noselect" style={{ fontSize: fontSizeF }}>{cardFrontText}</div>
			<div className="cardMasteryDiv">
				{cardFrontText.substring(0,4)!=='----' &&
				<div className='masteryboxesCard'>
					{[...Array(newLevel)].map(
					(value: undefined, index: number) => (
						<div className={`masterybox${newLevel}`} key={index}></div>
					)
					)}
					{mastered && <BsCheck size='20px' color={`rgb(65, 228, 112)`} />}
				</div>
				}
			</div>
          </div>
          <div className="theback noselect">
            <div className="fronttext noselect" style={{ fontSize: fontSizeB }}>{cardBackText}</div>
          </div>
      </div>
    );
};