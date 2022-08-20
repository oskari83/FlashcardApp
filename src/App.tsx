import { Navbar } from './Components/Navbar/Navbar';
import { Footer } from './Components/Footer/Footer';
import { CollectionView } from './Components/CollectionView/CollectionView';
import { BrowseView } from './Components/BrowseView/BrowseView';
import { useState } from 'react';
import './App.css';

function App() {
  const [curView, setCurView] = useState(0);

  return (
    <div>

      <Navbar/>

      {curView===0 && <BrowseView />}
      {curView===1 && <CollectionView />}

      <Footer />

    </div>
  );
}

export default App;