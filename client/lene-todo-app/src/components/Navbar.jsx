import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import Hamburger from 'hamburger-react'

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuth);
  const [sidebar, setSidebar] = useState(false);
  
  const logoutUser = () => {  
    localStorage.removeItem("userToken");
    dispatch(logout());
    navigate("/login")
}

const handleNaviClick = () => {
  setSidebar(false);
}

  return (
    <nav className="navbar">
      <div className='navbar-header'>
        <Hamburger toggled={sidebar} toggle={setSidebar} />
        <div className='logo'><Link to="/"><span>TODO</span>appen</Link></div>
      </div>

      <AnimatePresence>
      { sidebar && 
      <>
      <motion.nav
       initial={{ x: -200, opacity: 0 }}
       animate={{ x: 0, opacity: 1 }}
       exit={{ x: -200, opacity: 0 }}
       transition={{ type: "tween" }}
      className='nav-menu'>
        <ul className="navbar-ul">

            {!isAuthenticated && 
            <>
              <li><NavLink onClick={handleNaviClick} to="/login"><span className="material-symbols-outlined sidebar-icons">login</span>LOGIN</NavLink></li>
              <li><NavLink onClick={handleNaviClick} to="/register"><span className="material-symbols-outlined sidebar-icons">person_add</span>REGISTRER</NavLink></li>
            </>
            }

            {isAuthenticated &&
            <>
              <li><NavLink onClick={handleNaviClick} to="/profile"><span className="material-symbols-outlined sidebar-icons">person</span>PROFILE</NavLink></li>
              <li><NavLink onClick={handleNaviClick} to="/"><span className="material-symbols-outlined sidebar-icons">home</span>HJEM</NavLink></li>
              <li><NavLink onClick={handleNaviClick} to="/about"><span className="material-symbols-outlined sidebar-icons">info</span>OM</NavLink></li>
              <li style={{ cursor: "pointer", }} onClick={logoutUser}><span className="material-symbols-outlined sidebar-icons">logout</span>LOGOUT</li>
            </>
            }

        </ul>
      </motion.nav>
      <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='overlay-bg' onClick={() => setSidebar(!sidebar)} ></motion.div>
      </>
      }
      </AnimatePresence>    

    </nav>
  )
}

export default Navbar