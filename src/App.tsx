import { Card } from './Components/Card';
import { Navbar } from './Components/Navbar';
import { IoMdStats } from 'react-icons/io'
import './App.css';
import './Footer.css';

function App() {
  return (
    <div>
      <Navbar/>

      <div className="containerMain">
        <div className="setInfoContainer">
          <div className="setName">Name of Flashcard Set</div>
          <div className="setInfo">Information about set, Creator: Oskari, Cards: 23</div>
        </div>
        <div className="setAreaContainer">
          <div className="selectorBar">
            <div className="selectorBarItem">
              <div className='selectorBarItemIcon'><IoMdStats size='20px' color='rgb(92, 92, 92)' /></div>
              <div className='selectorBarItemText'>statistics</div>
            </div>
            <div className="selectorBarItem">revise</div>
            <div className="selectorBarItem">edit</div>
          </div>
          <div className="cardcontainer">
            <Card cardFrontText='front' cardBackText='back'/>
          </div>

          <div className="setContents">
          
          </div> 
        </div>
      </div>
    </div>
  );
}

export default App;