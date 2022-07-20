import { Card } from './Components/Card';
import { Navbar } from './Components/Navbar';
import './App.css';
import './Navbar.css';
import './Footer.css';

/*
function App() {
  return (
    <div>
      <div className="topBar">
        <div className="topBarContentContainer">
          <div className="LogoName">Flashcard app</div>
          <div className="navbarContentBar">
            <div className='navbarContentItem'>home</div>
            <div className='navbarContentItem'>browse</div>
            <div className='navbarContentItem'>create</div>
          </div>
        </div>
      </div>

      <div className="containerMain">
        <div className="setInfoContainer">
          <div className="setName">Name of Flashcard Set</div>
          <div className="setInfo">Information about set, Creator: Oskari, Cards: 23</div>
        </div>
        <div className="setAreaContainer">
          <div className="selectorBar">
            <div className="selectorBarItem">statistics</div>
            <div className="selectorBarItem">revise</div>
            <div className="selectorBarItem">edit</div>
          </div>
          <div className="cardcontainer">
            <Card/>
          </div>

          <div className="setContents">
          
          </div> 
        </div>
      </div>
    </div>
  );
}
*/

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
            <div className="selectorBarItem">statistics</div>
            <div className="selectorBarItem">revise</div>
            <div className="selectorBarItem">edit</div>
          </div>
          <div className="cardcontainer">
            <Card/>
          </div>

          <div className="setContents">
          
          </div> 
        </div>
      </div>
    </div>
  );
}

export default App;
