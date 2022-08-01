import './Navbar.css';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { IoSettingsSharp, IoCloseSharp } from 'react-icons/io5'

const NavMenu = ({version}: {version: string}) => {
    return(
        <ul className={`nav-${version}`}>
            <li className="nav-item">
                <a href="#" className="nav-link nav-itemHoverable">Home</a>
            </li>
            <li className="nav-item">
                <a href="#" className="nav-link nav-itemHoverable">Browse</a>
            </li>
            <li className="nav-item">
                <a href="#" className="nav-link nav-itemHoverable">Create</a>
            </li>
        </ul>
    )
}

const NavMenuMobile = () => {
    return(
        <ul className='nav-mobile'>
            <li className="nav-item">
                <a href="#" className="nav-link nav-itemHoverable">Home</a>
            </li>
            <li className="nav-item">
                <a href="#" className="nav-link nav-itemHoverable">Browse</a>
            </li>
            <li className="nav-item">
                <a href="#" className="nav-link nav-itemHoverable">Create</a>
            </li>
            <li className="nav-item">
                <a href="#" className="nav-link nav-itemHoverable">Sign In</a>
            </li>
            <li className="nav-item">
                <a href="#" className="nav-link nav-itemHoverable">Settings</a>
            </li>
        </ul>
    )
}

const NavUser = () => {
    return(
        <ul className="nav-user">
            <li className="nav-item nav-itemHoverable">
                <a href="#" className="nav-link nav-itemHoverable">Sign In</a>
            </li>
            <li className="nav-item">
                <a href="#" className="nav-link">|</a>
            </li>
            <li className="nav-icon">
                <IoSettingsSharp size='20px' color='white'/>
            </li>
        </ul>
    )
}

export const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const hamburgerIcon = <FiMenu size='20px' color='white' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}/>
    const closeIcon = <IoCloseSharp size='20px' color='white' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}/>

    return(
      <div className="navbar-outer">
        <nav className="navbar-tutorial">
            <div className="nav-logo">
                <a href='#' className="nav-branding">flashcard app.</a>
            </div>

            <NavMenu version='menu'/>
            <NavUser/>

            <div className='hamburger'>
                {mobileMenuOpen ? closeIcon : hamburgerIcon}
            </div>
            {mobileMenuOpen && <NavMenuMobile/>}
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