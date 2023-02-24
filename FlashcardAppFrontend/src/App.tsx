/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navbar } from './Components/Navbar/Navbar';
import { Footer, Footer2 } from './Components/Footer/Footer';
import { BrowseView } from './Components/BrowseView/BrowseView';
import { CreateView } from './Components/CreateView/CreateView';
import { HomeView } from './Components/HomeView/HomeView';
import { ProfileView } from './Components/ProfileView/ProfileView';
import { AuthenticationView } from './Components/AuthenticationView/AuthenticationView';
import { ResetView } from './Components/ResetView/ResetView';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
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
	const [footerStatus, setFooterStatus] = useState(true);
	
	const navigate = useNavigate();
	const location = useLocation();

	const SetUserData = (s:any) => {
		setUser(s);
	}

	const DeleteUserData = () => {
		window.localStorage.removeItem('loggedFlashcardAppUser');
		setUser(null);
	}

	const GetStarted = () => {
		setFooterStatus(false);
		navigate('/getstarted');
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
		}else{
			if(location.pathname!=='/' && location.pathname!=='/getstarted' && !location.pathname.startsWith('/reset/')){
				GetStarted();
			}
		}

		if(location.pathname==='/getstarted'){
			setFooterStatus(false);
		}

		if(location.pathname.startsWith('/reset')){
			setFooterStatus(false);
		}
	}, []);

	useEffect(() => {
		if(location.pathname==='/'){
			setFooterStatus(true);
		}
	}, [location.pathname==='/']);

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
		return(
			<div className='landingBackground'>		
				<Routes>
					<Route path="/" element={<LandingView getFunc={GetStarted}/>} />
					<Route path="/getstarted" element={<AuthenticationView setUserFunc={SetUserData}/>} />
					<Route path="/reset" element={<ResetView />} />
				</Routes>

				<Footer2 status={footerStatus}/>
			</div>
		)
	}

	return (
		<div>
		<Navbar username={user.username}/>

		<Routes>
			<Route path="/:id" element={<CollectionView userId={user.id} savedCols={savedCollections} />} />
			<Route path="/create" element={<CreateView username={user.username}/>} />
			<Route path="/browse" element={<BrowseView username={user.username} savedCols={savedCollections} />} />
			<Route path="/auth" element={<AuthenticationView setUserFunc={SetUserData}/>} />
			<Route path="/user" element={<ProfileView logoutFunc={DeleteUserData} user={user} createdA={collections.length-savedCollections.length} savedA={savedCollections.length}/>} />
			<Route path="/" element={<HomeView collectionData={collections} username={user.username} notifText={notificationMessage} loadingStatus={loadingStatus}/>} />
		</Routes>
		
		<Footer />

		</div>
	);
}

export default App;