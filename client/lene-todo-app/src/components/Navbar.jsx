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
       className='nav-menu'>

            <div className='sidebar-grid'>
            {!isAuthenticated && 
            <>
              <div><NavLink onClick={handleNaviClick} to="/login"><span className="material-symbols-outlined sidebar-icons">login</span>LOGIN</NavLink></div>
              <div><NavLink onClick={handleNaviClick} to="/register"><span className="material-symbols-outlined sidebar-icons">person_add</span>REGISTRER</NavLink></div>
            </>
            }

            {isAuthenticated &&
            <>

            <NavLink onClick={handleNaviClick} to="/profile" className='sidebar-flex-container'>
              <div className="material-symbols-rounded sidebar-icons">person</div>
              <div className='sidebar-text'>Profile</div>
            </NavLink>

            <NavLink onClick={handleNaviClick} to="/" className='sidebar-flex-container'>
              <div className="material-symbols-rounded sidebar-icons">home</div>
              <div className='sidebar-text'>Hjem</div>
            </NavLink>

            <NavLink onClick={handleNaviClick} to="/todos" className='sidebar-flex-container'>
              <div className="material-symbols-rounded sidebar-icons">checklist_rtl</div>
              <div className='sidebar-text'>Todos</div>
            </NavLink>

            <NavLink onClick={handleNaviClick} to="/about" className='sidebar-flex-container'>
              <div className="material-symbols-rounded sidebar-icons">info</div>
              <div className='sidebar-text'>Om</div>
            </NavLink>

            <div className='sidebar-flex-container'>
              <div className="material-symbols-rounded sidebar-icons">logout</div>
              <div className='sidebar-text logout' onClick={logoutUser}>Logg ut</div>
            </div>

            </>
            }
            </div>


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