import { useState } from 'react';
import './Card.css';

export const Card = () => {
    const [isRotated, setRotate] = useState(false);
    const onRotate = () => setRotate((rotated) => !rotated);
  
    return(
      <div className={`thecard${isRotated ? 'Rotated' : ''}`} onClick={onRotate}>
          <div className="thefront">
            <div className="fronttext">
            front text
            </div>
          </div>
          <div className="theback">
            <div className="fronttext">
            back text
            </div>
          </div>
      </div>
    )
}