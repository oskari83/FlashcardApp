import './Navbar.css';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { IoCloseSharp } from 'react-icons/io5'
import { AiFillHome, AiOutlineOrderedList } from 'react-icons/ai'
import { FaUserGraduate } from "react-icons/fa";
import { MdCreateNewFolder } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';

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

const NavUser = ({username}: {username:string}) => {
    return(
        <ul className="nav-user">
            <li className="nav-itemUser">
                <a href={'/user'} className="nav-linkUser">
                    Account
                    <div className="nav-icon">
                        <FaUserGraduate size='16px' color='rgb(31,48,76)'/>
                    </div>
                </a>
            </li>
        </ul>
    )
}

const NavMenuMobile = ({CloseFunction}: FuncProps) => {
	const navigate = useNavigate();
	const mobileClick = (a:string) => {
		CloseFunction();
		navigate(a);
	}

    return(
        <ul className='nav-mobile'>
            <li className="nav-item">
                <div className="hover-box" onClick={() => mobileClick('')}></div>
                <AiFillHome size='20px' color='black' />
                <NavLink text='Home' addr='/'/>
            </li>
            <li className="nav-item">
                <div className="hover-box" onClick={() => mobileClick('/browse')}></div>
                <AiOutlineOrderedList size='20px' color='black' />
                <NavLink text='Browse' addr='/browse'/>
            </li>
            <li className="nav-item">
                <div className="hover-box" onClick={() => mobileClick('/create')}></div>
                <MdCreateNewFolder size='20px' color='black' />
                <NavLink text='Create' addr='/create'/>
            </li>
            <li className="nav-item">
                <div className="hover-box" onClick={() => mobileClick('/user')}></div>
                <FaUserGraduate size='20px' color='black' />
                <NavLink text='Profile' addr='/auth'/>
            </li>
        </ul>
    )
}

export const Navbar = ({username}:{username:string}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const hamburgerIcon = <FiMenu size='20px' color='rgb(47, 110, 255)' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}/>
    const closeIcon = <IoCloseSharp size='20px' color='rgb(47, 110, 255)' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}/>
    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    }

    return(
      <div className="navbar-outer">
        <nav className="navbar-tutorial">
            <div className="nav-logo">
				<div className='navbarLogo'></div>
                <a href='/' className="nav-branding">MemNotes.io</a>
            </div>

            <NavMenu/>

            <NavUser username={username}/>

            <div className='hamburger'>
                {mobileMenuOpen ? closeIcon : hamburgerIcon}
            </div>

            {mobileMenuOpen && <NavMenuMobile CloseFunction={closeMobileMenu}/>}
        </nav>
      </div>
    )
}