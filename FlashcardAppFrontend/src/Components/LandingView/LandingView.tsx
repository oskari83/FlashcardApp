import './LandingView.css';
import { BsCardText, BsChatQuote, BsBoundingBox } from 'react-icons/bs';
import { ImStatsDots } from 'react-icons/im'

export const LandingView = ({getFunc}:{getFunc:any}) => {

	const scrollToTop = () =>{
		window.scrollTo({
			top: 300, 
			behavior: 'smooth'
		});
	};

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
				<div className='textMain'>The tools to make your studying and memorization easier.</div>
				<div className='subText'>Create flashcards and start studying now with no ads or distractions. Easy progress tracking with clear and individual card-based statistics.</div>
				<div className='buttonsOuter'>
					<div className='navTryButton' onClick={() => getFunc()}>Start for free</div>
					<div className='navLearnButton' onClick={() => scrollToTop()}>Learn more</div>
				</div>

				<div className='blockOuter'>
					<div className='innerBlock'>
						<div className='innerBlockTitle'>
							<BsCardText size='28px' color='rgb(31,48,76)'/>
							<div className='innerBlockHeader'>
								Unlimited flashcards and notes
							</div>
						</div>
						<div className='innerBlockText'>
							Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
						</div>
					</div>
					<div className='innerBlock'>
						<div className='innerBlockTitle'>
							<BsBoundingBox size='28px' color='rgb(31,48,76)'/>
							<div className='innerBlockHeader'>
								Innovative new reveal mode
							</div>
						</div>
						<div className='innerBlockText'>
							Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
						</div>
					</div>
					<div className='innerBlock'>
						<div className='innerBlockTitle'>
							<ImStatsDots size='28px' color='rgb(31,48,76)'/>
							<div className='innerBlockHeader'>
								Detailed statistics and data
							</div>
						</div>
						<div className='innerBlockText'>
							Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
						</div>
					</div>
					<div className='innerBlock'>
						<div className='innerBlockTitle'>
							<BsChatQuote size='28px' color='rgb(31,48,76)'/>
							<div className='innerBlockHeader'>
								Free support and help
							</div>
						</div>
						<div className='innerBlockText'>
							Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
						</div>
					</div>
				</div>

				<div className='usersOuter'>
					<div className='usersInner'>
						Over &nbsp; <div className='boldedInner'>1000 students</div> &nbsp; from all around the world trust MemNotes.io to help their studying.
					</div>
					<div className='logosOuter'>
						<div className='images1'></div>
						<div className='images2'></div>
						<div className='images3'></div>
					</div>
				</div>

				<div className='textMain4'>What are you waiting for?</div>
				<div className='subText4' onClick={() => getFunc()}>Sign up and start studying today!</div>
			</div>

		</div>
	);
}