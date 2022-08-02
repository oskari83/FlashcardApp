import './Navbar.css';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { IoSettingsSharp, IoCloseSharp, IoLogInSharp } from 'react-icons/io5'
import { AiFillHome, AiOutlineOrderedList } from 'react-icons/ai'
import { MdCreateNewFolder } from 'react-icons/md'

interface FuncProps {
    CloseFunction: () => void
}

const NavLink = ({text}: {text: string}) => {
    return(
        <a href="#" className="nav-link nav-itemHoverable">{text}</a>
    )
}

const NavItemHoverable = ({text}: {text: string}) => {
    return (
        <li className="nav-item">
            <NavLink text={text} />
        </li>
    )
}

const NavMenu = () => {
    return(
        <ul className='nav-menu'>
            <NavItemHoverable text='Home' />
            <NavItemHoverable text='Browse' />
            <NavItemHoverable text='Create' />
        </ul>
    )
}

const NavUser = () => {
    return(
        <ul className="nav-user">
            <NavItemHoverable text='Sign In' />
            <li className="nav-itemDivider">
                <a href="#" className="nav-link">|</a>
            </li>
            <li className="nav-icon">
                <IoSettingsSharp size='20px' color='white'/>
            </li>
        </ul>
    )
}

const NavMenuMobile = ({CloseFunction}: FuncProps) => {
    return(
        <ul className='nav-mobile'>
            <li className="nav-item">
                <div className="hover-box" onClick={() => CloseFunction()}></div>
                <AiFillHome size='20px' color='white' />
                <NavLink text='Home' />
            </li>
            <li className="nav-item">
                <div className="hover-box" onClick={() => CloseFunction()}></div>
                <AiOutlineOrderedList size='20px' color='white' />
                <NavLink text='Browse' />
            </li>
            <li className="nav-item">
                <div className="hover-box" onClick={() => CloseFunction()}></div>
                <MdCreateNewFolder size='20px' color='white' />
                <NavLink text='Create' />
            </li>
            <li className="nav-item">
                <div className="hover-box" onClick={() => CloseFunction()}></div>
                <IoLogInSharp size='20px' color='white' />
                <NavLink text='Sign in' />
            </li>
            <li className="nav-item">
                <div className="hover-box" onClick={() => CloseFunction()}></div>
                <IoSettingsSharp size='20px' color='white' />
                <NavLink text='Settings' />
            </li>
        </ul>
    )
}

export const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const hamburgerIcon = <FiMenu size='20px' color='white' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}/>
    const closeIcon = <IoCloseSharp size='20px' color='white' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}/>
    const closeMobileMenu = () => setMobileMenuOpen(false);

    return(
      <div className="navbar-outer">
        <nav className="navbar-tutorial">
            <div className="nav-logo">
                <a href='#' className="nav-branding">flashcard app.</a>
            </div>

            <NavMenu/>
            
            <NavUser/>

            <div className='hamburger'>
                {mobileMenuOpen ? closeIcon : hamburgerIcon}
            </div>

            {mobileMenuOpen && <NavMenuMobile CloseFunction={closeMobileMenu}/>}
        </nav>
      </div>
    )
}