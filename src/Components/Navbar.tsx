import './Navbar.css';

export const Navbar = () => {
    return(
      <div className="navbar-outer">
        <nav className="navbar-tutorial">
            <div className="nav-logo">
                <a href='#' className="nav-branding">flashcard app.</a>
            </div>

            <ul className="nav-menu">
                <li className="nav-item">
                    <a href="#" className="nav-link">Home</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">Browse</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">Create</a>
                </li>
            </ul>

            <ul className="nav-user">
                <li className="nav-item">
                    <a href="#" className="nav-link">Sign In</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">|</a>
                </li>
                <li className="nav-icon">
                    <img src={/* eslint-disable */require('../Assets/settingsicon.svg').default} alt='mySvgImage' />
                </li>
            </ul>

            <div className="hamburger">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
      </div>
    )
}

/*
<div className="hamburger">
    <span className="bar"></span>
    <span className="bar"></span>
    <span className="bar"></span>
</div>
*/