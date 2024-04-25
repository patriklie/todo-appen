import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
    <Link to="/" className='logo'><span>TODO</span>appen</Link>
    <ul className="navbar-ul">
        <li><NavLink to="/register">REGISTRER</NavLink></li>
        <li><NavLink to="/">HJEM</NavLink></li>
        <li><NavLink to="about">OM</NavLink></li>
    </ul>
    </nav>
  )
}

export default Navbar