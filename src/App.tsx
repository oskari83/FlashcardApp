import { Navbar } from './Components/Navbar/Navbar';
import { Footer } from './Components/Footer/Footer';
import { FlipMode } from './Components/FlipMode/FlipMode';
import { RevealMode } from './Components/RevealMode/RevealMode';
import { StatisticsTable } from './Components/StatisticsTable/StatisticsTable';
import { IoMdStats, IoMdPlay } from 'react-icons/io'
import { AiFillEdit } from 'react-icons/ai'
import { useState } from 'react';
import './App.css';

function App() {
  const [currentSelection, setCurrentSelection] = useState(0);

  const selectionChange = (id: number) => {
    setCurrentSelection(id)
  }

  return (
    <div>

      <Navbar/>

      <div className="containerMain">
        <div className="setInfoContainer">
          <div className="setName">Name of Collection</div>
          <div className='setProgress'>43%</div>
          <div className="setInfo">Information about set, Creator: Oskari, Cards: 23</div>
        </div>

        <div className='setAreaOuter'>
          <div className="setAreaContainer">
            <div className="selectorBar">
              <div className={currentSelection===0 ? `selectorBarItemSelected` : `selectorBarItem`} onClick={() => selectionChange(0)}>
                <div className='selectorBarItemIcon'><IoMdStats size='20px' color={currentSelection===0 ? `rgb(41, 116, 255)` : `rgb(92, 92, 92)`} /></div>
                <div className='selectorBarItemText'>Overview</div>
              </div>
              <div className={currentSelection===1 ? `selectorBarItemSelected` : `selectorBarItem`} onClick={() => selectionChange(1)}>
                <div className='selectorBarItemIcon'><IoMdPlay size='20px' color={currentSelection===1 ? `rgb(41, 116, 255)` : `rgb(92, 92, 92)`} /></div>
                <div className='selectorBarItemText'>Flip</div>
              </div>
              <div className={currentSelection===2 ? `selectorBarItemSelected` : `selectorBarItem`} onClick={() => selectionChange(2)}>
                <div className='selectorBarItemIcon'><IoMdPlay size='20px' color={currentSelection===2 ? `rgb(41, 116, 255)` : `rgb(92, 92, 92)`} /></div>
                <div className='selectorBarItemText'>Reveal</div>
              </div>
              <div className={currentSelection===3 ? `selectorBarItemSelected` : `selectorBarItem`} onClick={() => selectionChange(3)}>
                <div className='selectorBarItemIcon'><AiFillEdit size='20px' color={currentSelection===3 ? `rgb(41, 116, 255)` : `rgb(92, 92, 92)`} /></div>
                <div className='selectorBarItemText'>Edit</div>
              </div>
            </div>

            {currentSelection===0 && 
              <StatisticsTable />
            } 

            {currentSelection===1 && 
              <FlipMode />
            } 

            {currentSelection===2 && 
              <RevealMode />
            } 

          </div>
        </div>
      </div>

      <Footer />

    </div>
  );
}

export default App;