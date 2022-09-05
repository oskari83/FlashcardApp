import './Navbar.css';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { IoSettingsSharp, IoCloseSharp, IoLogInSharp } from 'react-icons/io5'
import { AiFillHome, AiOutlineOrderedList } from 'react-icons/ai'
import { MdCreateNewFolder } from 'react-icons/md'

interface FuncProps {
    CloseFunction: () => void
}

const NavLink = ({text,addr}: {text: string, addr:string}) => {
    return(
        <a href={addr} className="nav-link nav-itemHoverable">{text}</a>
    )
}

const NavItemHoverable = ({text,addr}: {text: string, addr:string}) => {
    return (
        <li className="nav-item">
            <NavLink text={text} addr={addr}/>
        </li>
    )
}

const NavMenu = () => {
    return(
        <ul className='nav-menu'>
            <NavItemHoverable text='Home' addr='/'/>
            <NavItemHoverable text='Browse' addr='/browse'/>
            <NavItemHoverable text='Create' addr='/create'/>
        </ul>
    )
}

const NavUser = () => {
    return(
        <ul className="nav-user">
            <NavItemHoverable text='Sign In' addr='/auth'/>
            <li className="nav-itemDivider">
                <a href="/auth" className="nav-link">|</a>
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
                <NavLink text='Home' addr='/'/>
            </li>
            <li className="nav-item">
                <div className="hover-box" onClick={() => CloseFunction()}></div>
                <AiOutlineOrderedList size='20px' color='white' />
                <NavLink text='Browse' addr='/browse'/>
            </li>
            <li className="nav-item">
                <div className="hover-box" onClick={() => CloseFunction()}></div>
                <MdCreateNewFolder size='20px' color='white' />
                <NavLink text='Create' addr='/create'/>
            </li>
            <li className="nav-item">
                <div className="hover-box" onClick={() => CloseFunction()}></div>
                <IoLogInSharp size='20px' color='white' />
                <NavLink text='Sign in' addr='/auth'/>
            </li>
            <li className="nav-item">
                <div className="hover-box" onClick={() => CloseFunction()}></div>
                <IoSettingsSharp size='20px' color='white' />
                <NavLink text='Settings' addr=''/>
            </li>
        </ul>
    )
}

export const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const hamburgerIcon = <FiMenu size='20px' color='white' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}/>
    const closeIcon = <IoCloseSharp size='20px' color='white' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}/>
    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
        window.location.href="/";
    }

    return(
      <div className="navbar-outer">
        <nav className="navbar-tutorial">
            <div className="nav-logo">
                <a href='/' className="nav-branding">classic flashcards.</a>
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