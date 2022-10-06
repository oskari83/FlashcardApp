/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navbar } from './Components/Navbar/Navbar';
import { Footer } from './Components/Footer/Footer';
import { BrowseView } from './Components/BrowseView/BrowseView';
import { CreateView } from './Components/CreateView/CreateView';
import { HomeView } from './Components/HomeView/HomeView';
import { ProfileView } from './Components/ProfileView/ProfileView';
import { AuthenticationView } from './Components/AuthenticationView/AuthenticationView';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import { CollectionView } from './Components/CollectionView/CollectionView';
import { useState, useEffect } from 'react';
import collectionService from './services/collections';
import userService from './services/user';
import './App.css';
import { LandingView } from './Components/LandingView/LandingView';

const App = () => {
	const [collections, setCollections] = useState([]);
	const [savedCollections, setSavedCollections] = useState([]);
	const [loadingStatus, setLoadingStatus] = useState(1);
	const [notificationMessage, setNotificationMessage] = useState('');
	const [user, setUser] = useState<any>(null);
	const [notificationTimeout, setNotificationTimeout] = useState<null | NodeJS.Timeout>(null);
	const [wantAuth, setWantAuth] = useState(false);

	const SetUserData = (s:any) => {
		setUser(s);
	}

	const DeleteUserData = () => {
		window.localStorage.clear();
		setUser(null);
	}

	const GetStarted = () => {
		setWantAuth(true);
	}

	const ClearNotificationMessage = (time:number) => {
		if(notificationTimeout){
			clearTimeout(notificationTimeout);
		}
		const timeoutN = setTimeout(() => {
			setNotificationMessage('');
		},time);
		setNotificationTimeout(timeoutN);
	}

	const AddNotification = (mes: string, time:number) => {
		setNotificationMessage(mes);
		ClearNotificationMessage(time);
	}
	
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedFlashcardAppUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			collectionService.setToken(user.token);
			userService.setToken(user.token);
		}
	}, []);

	useEffect(() => {
		if(user){
			userService
			.getCollections(user.id)
			.then(data => {
				console.log(data);
				const cols = data.createdCollections.concat(data.savedCollections);
				setCollections(cols);
				setSavedCollections(data.savedCollections);
				setLoadingStatus(0);
			})
			.catch(error => {
				if(error.code==="ERR_NETWORK"){
					AddNotification('Network error - please check your internet connection!',5000);
				}else if(error.response.data!==undefined && error.response.data.error!==undefined && error.response.data.error==='token expired'){
					DeleteUserData();
					AddNotification(error.message,300);
				}else{
					AddNotification(error.message,5000);
				}
				
				console.log(error);
			});
		}
	}, [user]);

	if(user===null){
		if(wantAuth===false){
			return(
				<div>
					<LandingView getFunc={GetStarted}/>
				</div>
			)
		}else{
			return(
				<AuthenticationView setUserFunc={SetUserData}/>
			)
		}
	}

	return (
		<div>
		<Navbar username={user.username}/>

		<Router>
			<Routes>
			<Route path="/:id" element={<CollectionView userId={user.id} savedCols={savedCollections} />} />
			<Route path="/create" element={<CreateView username={user.username}/>} />
			<Route path="/browse" element={<BrowseView username={user.username} savedCols={savedCollections} />} />
			<Route path="/auth" element={<AuthenticationView setUserFunc={SetUserData}/>} />
			<Route path="/user" element={<ProfileView logoutFunc={DeleteUserData} user={user} createdA={collections.length-savedCollections.length} savedA={savedCollections.length}/>} />
			<Route path="/" element={<HomeView collectionData={collections} username={user.username} notifText={notificationMessage} loadingStatus={loadingStatus}/>} />
			</Routes>
		</Router>

		<Footer />

		</div>
	);
}

export default App;