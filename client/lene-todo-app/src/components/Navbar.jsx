import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import Hamburger from 'hamburger-react'
import maskott from "../assets/images/IMG_0333.JPEG"
import maskott2 from "../assets/images/IMG_0336-removebg.png"

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuth);
  const loggedInUser = useSelector(state => state.auth.username);
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
        <div className="navbar-ham">
          <Hamburger rounded color="#fff" toggled={sidebar} toggle={setSidebar} />
        </div>
        <div className='profile-link'>
          <div className='profile-name'><Link to="/profile">{ loggedInUser }</Link></div>
        </div>
        <div className='logo'>
          <Link to="/"><span>TODO</span>appen</Link>
        </div>
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
              <li><NavLink onClick={handleNaviClick} to="/todos"><span className="material-symbols-outlined sidebar-icons">checklist_rtl</span>TODOS</NavLink></li>
              <li><NavLink onClick={handleNaviClick} to="/about"><span className="material-symbols-outlined sidebar-icons">info</span>OM</NavLink></li>
              <li style={{ cursor: "pointer", color: "white" }} onClick={logoutUser}><span className="material-symbols-outlined sidebar-icons">logout</span>LOGOUT</li>
            </>
            }

        </ul>
          <img style={{ width: "100%" }} src={maskott2}></img>
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