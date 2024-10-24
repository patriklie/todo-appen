import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Squash as Hamburger } from 'hamburger-react'
import { toast } from 'react-toastify';
import maskott from '../assets/images/IMG_0336-removebg.png'

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuth);
  const loggedInUser = useSelector(state => state.auth.username);
  const [sidebar, setSidebar] = useState(false);
  
  const logoutUser = () => {  
    localStorage.removeItem("token");
    toast.success(`Logget ut! 👋`, {
      position: "bottom-left",
      autoClose: 3000,
    });
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
          <Hamburger rounded color="#fff" toggled={sidebar} toggle={setSidebar} distance='sm' hideOutline={false} />
        </div>

        { loggedInUser && 
        <div className='profile-link'>
          <div className='profile-name'><Link to="/profile">{ loggedInUser }</Link></div>
        </div>
        }

        <div style={{ justifySelf: !loggedInUser ? "center" : "" }} className='logo'>
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
       className='nav-menu'
       >

            <div className='sidebar-grid'>
            {!isAuthenticated && 

            <>
            <NavLink onClick={handleNaviClick} to="/login" className='sidebar-flex-container'>
              <div className="material-symbols-rounded sidebar-icons">login</div>
              <div className='sidebar-text'>LOGIN</div>
            </NavLink>

            <NavLink onClick={handleNaviClick} to="/register" className='sidebar-flex-container'>
              <div className="material-symbols-rounded sidebar-icons">person_add</div>
              <div className='sidebar-text'>REGISTRER</div>
            </NavLink>
            </>
            }

            {isAuthenticated &&
            <>
            <NavLink onClick={handleNaviClick} to="/" className='sidebar-flex-container'>
              <div className="material-symbols-rounded sidebar-icons">home</div>
              <div className='sidebar-text'>Hjem</div>
            </NavLink>

            <NavLink onClick={handleNaviClick} to="/lists" className='sidebar-flex-container'>
              <div className="material-symbols-rounded sidebar-icons">checklist_rtl</div>
              <div className='sidebar-text'>Lister</div>
            </NavLink>

            <NavLink onClick={handleNaviClick} to="/profile" className='sidebar-flex-container'>
              <div className="material-symbols-rounded sidebar-icons">person</div>
              <div className='sidebar-text'>Profil</div>
            </NavLink>

            <NavLink onClick={handleNaviClick} to="/about" className='sidebar-flex-container'>
              <div className="material-symbols-rounded sidebar-icons">info</div>
              <div className='sidebar-text'>Om</div>
            </NavLink>

            <div className='sidebar-flex-container'>
              <div className="material-symbols-rounded sidebar-icons">logout</div>
              <div className='sidebar-text logout' onClick={logoutUser}>Logg ut</div>
            </div>

            <div className='navbar-maskott-container'>
              <img className='navbar-maskott' src={maskott} />
            </div>
            </>
            }
            </div>

      </motion.nav>

      <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='overlay-bg' onClick={() => setSidebar(!sidebar)}>
      </motion.div>

      </>
      }
      </AnimatePresence>
    </nav>
  )
}

export default Navbar;