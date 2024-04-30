import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuth);
  
  const logoutUser = () => {  
    localStorage.removeItem('jsonwebtoken');
    dispatch(logout());
    navigate("/login")
}

  return (
    <nav className="navbar">
    <Link to="/" className='logo'><span>TODO</span>appen</Link>
    <ul className="navbar-ul">
        <li><NavLink to="/login">LOGIN</NavLink></li>
        <li><NavLink to="/register">REGISTRER</NavLink></li>
        <li><NavLink to="/profile">PROFILE</NavLink></li>
        <li><NavLink to="/">HJEM</NavLink></li>
        <li><NavLink to="about">OM</NavLink></li>
        {
          isAuthenticated && <li onClick={logoutUser}>LOGOUT</li>
        }
    </ul>
    </nav>
  )
}

export default Navbar