import { Card } from './Components/Card';
import './App.css'

function App() {
  return (
    <div>
      <div className="topBar">
        <div className="topBarContent">
          <p>hi</p>
        </div>
      </div>

      <div className="containerMain">
        <div className="cardcontainer">
          <Card/>
        </div>
      </div>
    </div>
  );
}

export default App;
