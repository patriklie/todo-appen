import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
    <Link to="/" className='logo'><span>TODO</span>app</Link>
    <ul className="navbar-ul">
        <li><NavLink to="/">HOME</NavLink></li>
        <li><NavLink to="about">ABOUT</NavLink></li>
    </ul>
    </nav>
  )
}

export default Navbar