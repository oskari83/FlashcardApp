import { useState } from 'react';
import './Card.css';

export const Card = ({cardFrontText, cardBackText}: {cardFrontText: string, cardBackText: string}) => {
    const [isRotated, setRotate] = useState(false);
    const onRotate = () => setRotate((rotated) => !rotated);
  
    return(
      <div className={`thecard${isRotated ? 'Rotated' : ''}`} onClick={onRotate}>
          <div className="thefront">
            <div className="fronttext">{cardFrontText}</div>
          </div>
          <div className="theback">
            <div className="fronttext">{cardBackText}</div>
          </div>
      </div>
    )
}