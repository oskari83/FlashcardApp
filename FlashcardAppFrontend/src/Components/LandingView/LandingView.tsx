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
				<div className='textMain'>The tools you need to ace your exams...</div>
				<div className='subText'>Create flashcards and start studying now with no ads or distractions!</div>
				<div className='buttonsOuter'>
					<div className='navTryButton' onClick={() => getFunc()}>Start for free</div>
					<div className='navLearnButton'>Learn more</div>
				</div>

				<div className='imageContainerOuter'>
					<div className='images1'></div>
					<div className='containerRight'>
						<div className='contHeader'>Flashcards</div>
						<div className='contBody'>Memorize anything whether it be definitions, terms, concepts or even a new language by creating sets of flashcards completely for free!</div>
					</div>
				</div>

				<div className='imageContainerOuter'>
					<div className='containerRight'>
						<div className='contHeader2'>Revise with tables</div>
						<div className='contBody2'>Do you like to see multiple flashcards at once or just {`don't`} like flipping through hundreds of cards? {`We've`} got the solution for you! You can now revise more efficiently by revealing the backside of your cards with one click without the need to flip through cards to move to the next one.</div>
					</div>
					<div className='images2'></div>
				</div>

				<div className='imageContainerOuter'>
					<div className='images3'></div>
					<div className='containerRight'>
						<div className='contHeader'>Track your progress</div>
						<div className='contBody'>After every card or table reveal you can provide immediate feedback to track your own progress. Click -1 if you were not happy with your answer, 0 if you feel neutral or +1 if you feel like you got it correct. All of this data is then presented to you to keep track of which cards you have mastered and which ones you still need to work on!</div>
					</div>
				</div>

				<div className='textMain4'>The best part? {`It's completely free!`}</div>
				<div className='subText4' onClick={() => getFunc()}>Sign up and start studying today!</div>
			</div>

		</div>
	);
}