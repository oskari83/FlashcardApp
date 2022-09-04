import { Navbar } from './Components/Navbar/Navbar';
import { Footer } from './Components/Footer/Footer';
import { CollectionView } from './Components/CollectionView/CollectionView';
import { BrowseView } from './Components/BrowseView/BrowseView';
import { CreateView } from './Components/CreateView/CreateView';
import { AuthenticationView } from './Components/AuthenticationView/AuthenticationView';
import { useState } from 'react';
import {
  Routes, Route, Link
} from "react-router-dom"
import './App.css';


function App() {
  const [curView, setCurView] = useState(0);

  const selectionChange = (id: number) => {
    setCurView(id)
  }

  return (
    <div>

      <Navbar/>

      <Routes>
        <Route path="/create" element={<CreateView />} />
        <Route path="/browse" element={<BrowseView />} />
        <Route path="/auth" element={<AuthenticationView />} />
        <Route path="/" element={<CollectionView />} />
      </Routes>

      {curView===1 && <BrowseView />}
      {curView===2 && <CollectionView />}
      {curView===3 && <CreateView />}
      {curView===4 && <AuthenticationView />}

      <Footer />

    </div>
  );
}

export default App;