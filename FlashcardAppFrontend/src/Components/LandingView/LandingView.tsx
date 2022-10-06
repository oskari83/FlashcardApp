import './LandingView.css';

export const LandingView = ({getFunc}:{getFunc:any}) => {

    return(
		<div className='containerOuter'>
			<div className="navbar-outerLanding">
				<nav className="navbar-tutorialLanding">
					<div className="nav-logoLanding">
						<a href='/' className="nav-brandingLanding">
							<div className='navLogo'></div>
							MemNotes.io
						</a>
					</div>
					<div className='navTryOuter'>
						<div className='navTryButton' onClick={() => getFunc()}>Start for free</div>
					</div>
				</nav>
			</div>

			<div className="containerMainLanding">
			<div className='textMain'>Welcome to the future of studying...</div>
			<div className='subText'>Create flashcards and revise using spaced repetition and our unique reveal mode</div>
			</div>

			<div className='images1'></div>
		</div>
	);
}