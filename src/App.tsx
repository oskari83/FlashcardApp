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
import collectionService from './services/collections';
import './App.css';

const App = () => {
  const [collections, setCollections] = useState([]);
  const [user, setUser] = useState('oskari83');
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    collectionService
      .getAll()
      .then(initialCollections => {
        setCollections(initialCollections)
      })
      .catch(error => {
        if(error.code==="ERR_NETWORK"){
            setNotificationMessage('Network error - please check your internet connection!');
        }else{
            setNotificationMessage(error.message);
        }
        console.log(error);
    });
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
          <Route path="/" element={<HomeView collectionData={collections} username={user} notifText={notificationMessage}/>} />
        </Routes>
      </Router>
      <Footer />

    </div>
  );
}

export default App;