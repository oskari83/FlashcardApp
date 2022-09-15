/* eslint-disable react/display-name */
import { useState, forwardRef, useImperativeHandle } from 'react'
import './Card.css';

const Card = forwardRef(({cardFrontText, cardBackText}: {cardFrontText: string, cardBackText: string},refs:any) => {
    const [isRotated, setRotate] = useState(false);
    const onRotate = () => setRotate((rotated) => !rotated);

	const onRotateBack = () => {
		if(isRotated===true){
			setRotate((rotated) => !rotated);
		}
	}

	useImperativeHandle(refs, () => {
		return {
			onRotateBack
		};
	});
  
    return(
      <div className={`thecard${isRotated ? 'Rotated' : ''}`} onClick={onRotate}>
          <div className="thefront">
            <div className="fronttext">{cardFrontText}</div>
          </div>
          <div className="theback">
            <div className="fronttext">{cardBackText}</div>
          </div>
      </div>
    );
});

export default Card;