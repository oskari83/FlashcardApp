import { Navbar } from './Components/Navbar/Navbar';
import { Footer } from './Components/Footer/Footer';
import { CollectionView } from './Components/CollectionView/CollectionView';
import { BrowseView } from './Components/BrowseView/BrowseView';
import { CreateView } from './Components/CreateView/CreateView';
import { useState } from 'react';
import './App.css';


function App() {
  const [curView, setCurView] = useState(0);

  return (
    <div>

      <Navbar/>

      {curView===2 && <BrowseView />}
      {curView===0 && <CollectionView />}
      {curView===1 && <CreateView />}

      <Footer />

    </div>
  );
}

export default App;