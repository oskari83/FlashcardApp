import { Navbar } from './Components/Navbar/Navbar';
import { Footer } from './Components/Footer/Footer';
import { CollectionView } from './Components/CollectionView/CollectionView';
import { BrowseView } from './Components/BrowseView/BrowseView';
import { CreateView } from './Components/CreateView/CreateView';
import { AuthenticationView } from './Components/AuthenticationView/AuthenticationView';
import { useState } from 'react';
import './App.css';


function App() {
  const [curView, setCurView] = useState(0);

  return (
    <div>

      <Navbar/>

      {curView===1 && <BrowseView />}
      {curView===2 && <CollectionView />}
      {curView===3 && <CreateView />}
      {curView===0 && <AuthenticationView />}

      <Footer />

    </div>
  );
}

export default App;