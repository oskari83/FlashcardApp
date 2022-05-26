import { Card } from './Components/Card';
import './App.css';
import './Navbar.css';

function App() {
  return (
    <div>
      <div className="topBar">
        <div className="topBarContentContainer">
          <div className="logo">
            <img src={require('./Assets/logo.png')} alt="logo" />
          </div>
          <div className="LogoName">Flashcard App</div>
          <div className="navBarHome">Home</div>
          <div className="navBarBrowse">Browse</div>
          <div className="navBarCreate" onClick={() => null}>Create</div>
        </div>
      </div>

      <div className="containerMain">
        <div className="setName">Name of Flashcard Set</div>
        <div className="setInfo">Information about set, Creator: Oskari, Cards: 23</div>
        <div className="cardcontainer">
          <Card/>
        </div>

        <div className="setContents">
          
        </div>
      </div>
    </div>
  );
}

export default App;
