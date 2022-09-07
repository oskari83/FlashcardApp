import { Navbar } from './Components/Navbar/Navbar';
import { Footer } from './Components/Footer/Footer';
//import { CollectionView } from './Components/CollectionView/CollectionView';
import { BrowseView } from './Components/BrowseView/BrowseView';
import { CreateView } from './Components/CreateView/CreateView';
import { HomeView } from './Components/HomeView/HomeView';
import { ProfileView } from './Components/ProfileView/ProfileView';
import { AuthenticationView } from './Components/AuthenticationView/AuthenticationView';
import { useState } from 'react';
import { Routes, Route } from "react-router-dom"
import './App.css';

const collectionsData = [
  {
    id: 1,
    name: "Economics Chapter 1",
    creator: "oskari83",
    itemCount: 3,
    items: [
      {
        qside: "what is demand",
        aside: "Quantity of goods consumers are willing and able to purchase at any given price over a period of time",
        correct: 3,
      },
      {
        qside: "normal good",
        aside: "when income rises demand for a good rises",
        correct: 1,
      },
      {
        qside: "competetive supply",
        aside: "output of a product takes place as an alternative to other products, apples and oranges",
        correct: 0,
      },
    ]
  },
  {
    id: 1,
    name: "Economics Chapter 2",
    creator: "oskari83",
    itemCount: 2,
    items: [
      {
        qside: "consumer surplus",
        aside: "refers to the benefits to buyers who are able to purchase a product for less than they are willing to do so",
        correct: 2,
      },
      {
        qside: "producer surplus",
        aside: "the difference between the price that firms receive and the price they are willing to supply at",
        correct: 4,
      },
    ]
  },
]

const App = () => {
  const [collections, setCollections] = useState(collectionsData)

  return (
    <div>

      <Navbar/>

      <Routes>
        <Route path="/create" element={<CreateView collectionData={collections}/>} />
        <Route path="/browse" element={<BrowseView />} />
        <Route path="/auth" element={<AuthenticationView />} />
        <Route path="/user" element={<ProfileView />} />
        <Route path="/" element={<HomeView collectionData={collections}/>} />
      </Routes>

      <Footer />

    </div>
  );
}

export default App;