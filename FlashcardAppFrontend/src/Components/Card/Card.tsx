import './Card.css';

const Card = ({cardFrontText, cardBackText, cardClass, rotateFunc}: {cardFrontText: string, cardBackText: string, cardClass:string, rotateFunc: any}) => {
  
    return(
      <div className={cardClass} onClick={rotateFunc}>
          <div className="thefront">
            <div className="fronttext">{cardFrontText}</div>
          </div>
          <div className="theback">
            <div className="fronttext">{cardBackText}</div>
          </div>
      </div>
    );
};

export default Card;