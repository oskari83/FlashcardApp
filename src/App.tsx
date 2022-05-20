import React from 'react';
import { useState } from 'react';
import './App.css';

function App() {
  const [isRotated, setRotate] = useState(false);
  const onRotate = () => setRotate((rotated) => !rotated);

  return (
    <div className="maincontainer">
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
    </div>
  );
}

export default App;
