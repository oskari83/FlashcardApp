/* eslint-disable @typescript-eslint/no-explicit-any */
import './App.css';
import { Navbar } from './Components/Navbar';
import { Footer, Footer2 } from './Components/Footer';
import { CollectionView } from './Components/CollectionView';
import { BrowseView } from './Components/BrowseView';
import { CreateView } from './Components/CreateView';
import { HomeView } from './Components/HomeView';
import { ProfileView } from './Components/ProfileView';
import { AuthenticationView } from './Components/AuthenticationView';
import { RecoverView } from './Components/RecoverView';
import { ResetView } from './Components/ResetView';
import { LandingView } from './Components/LandingView';
import { setToken } from './Utils/token';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from 'react';
import userService from './services/user';

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
			setToken(user.token);
		}else{
			if(location.pathname!=='/' && location.pathname!=='/getstarted' && !location.pathname.startsWith('/reset/')){
				GetStarted();
			}
		}

		if(location.pathname==='/getstarted'){
			setFooterStatus(false);
		}

		if(location.pathname==='/recover'){
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
					<Route path="/recover" element={<RecoverView />} />
					<Route path="/reset" element={<ResetView />} />

					<Route path="/user" element={<AuthenticationView setUserFunc={SetUserData}/>} />
					<Route path="/:id" element={<AuthenticationView setUserFunc={SetUserData}/>} />
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

			<Route path="/getstarted" element={<AuthenticationView setUserFunc={SetUserData}/>} />
			<Route path="/recover" element={<RecoverView />} />
			<Route path="/reset" element={<ResetView />} />
		</Routes>
		
		<Footer />

		</div>
	);
}

export default App;