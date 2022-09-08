import { Navbar } from './Components/Navbar/Navbar';
import { Footer } from './Components/Footer/Footer';
//import { CollectionView } from './Components/CollectionView/CollectionView';
import { BrowseView } from './Components/BrowseView/BrowseView';
import { CreateView } from './Components/CreateView/CreateView';
import { HomeView } from './Components/HomeView/HomeView';
import { ProfileView } from './Components/ProfileView/ProfileView';
import { AuthenticationView } from './Components/AuthenticationView/AuthenticationView';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CollectionItem, CollectionData } from './Types';
import axios from 'axios';
import './App.css';

const App = () => {
  const [collections, setCollections] = useState([])
  const [user, setUser] = useState('oskari83')

  useEffect(() => {
    axios
      .get('http://localhost:3011/collections')
      .then(response => {
        setCollections(response.data)
      })
  }, [])

  const AppendToCollections = (collectionItem:any) => {
    console.log(collectionItem);
    setCollections(collections.concat(collectionItem));
    console.log(collections);
  }

  return (
    <div>

      <Navbar/>
      <Router>
        <Routes>
          <Route path="/create" element={<CreateView collectionData={collections} createFunc={AppendToCollections}/>} />
          <Route path="/browse" element={<BrowseView />} />
          <Route path="/auth" element={<AuthenticationView />} />
          <Route path="/user" element={<ProfileView />} />
          <Route path="/" element={<HomeView collectionData={collections} username={user}/>} />
        </Routes>
      </Router>
      <Footer />

    </div>
  );
}

export default App;