import './Card.css';
import { useFitText } from '../../../../Utils/useFitText';

export const Card = ({cardFrontText, cardBackText, cardClass, rotateFunc}: {cardFrontText: string, cardBackText: string, cardClass:string, rotateFunc: any}) => {
	const fontSizeF = useFitText(cardFrontText);
	const fontSizeB = useFitText(cardBackText);

    return(
      <div className={cardClass} onClick={rotateFunc}>
          <div className="thefront noselect">
            <div className="fronttext noselect" style={{ fontSize: fontSizeF }}>{cardFrontText}</div>
          </div>
          <div className="theback noselect">
            <div className="fronttext noselect" style={{ fontSize: fontSizeB }}>{cardBackText}</div>
          </div>
      </div>
    );
};