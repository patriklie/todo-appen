import React, { useEffect, useState } from 'react';
import '../dragclose.css';
import { useAnimate, motion, useDragControls, useMotionValue } from 'framer-motion';
import useMeasure from 'react-use-measure';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const DragMenu = () => {
/*   const [open, setOpen] = useState(false); */
  const [scope, animate] = useAnimate();
  const controls = useDragControls();
  const y = useMotionValue();
  const [drawerRef, { height }] = useMeasure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [lastScrollY, setLastScrollY] = useState(0);

  const logoutUser = () => {  
    localStorage.removeItem("token");
    toast.success(`Logget ut! 👋`, {
      position: "bottom-left",
      autoClose: 3000,
    });
    dispatch(logout());
    navigate("/login")
}

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      handleMinimize();
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const handleOpen = async () => {
    const yStart = typeof y.get() === "number" ? y.get() : 0;

    // console.log("Handle Open yStart", yStart)
    // console.log("Handle Open Height", height) 

    await animate("#drawer", {
      y: [yStart, 0]
    });
   /*  setOpen(true); */
  };

  const handleMinimize = async () => {
    const yStart = typeof y.get() === "number" ? y.get() : 0;

    console.log("Minimize yStart", yStart)
    console.log("Minimize Height", height)

    await animate("#drawer", {
      y: [yStart, height - 90] // denne stod på 50 før jeg increase dragcontainer med 40px
    });
    /* setOpen(false); */
  };

  useEffect(() => {
    if (height > 0) {
      y.set(height - 90); // denne stod på 50
    } else {
      y.set(150); // denne stod på 110
    }
    
  }, [height])


  return (
    <>
    <motion.div 
    ref={scope}
    className='outer-motion'
    >
        <motion.div
        ref={drawerRef}
        id="drawer"
        onClick={(e) => e.stopPropagation()}
        style={{ y }}
        transition={{
          ease: "easeInOut"
        }}
        onDragEnd={() => {
            // console.log("Y.get: ", y.get())
            // console.log("Height: ", height)
            // console.log(height - y.get())
            if (y.get() >= height / 2) {
                handleMinimize();
            } else {
              handleOpen();
            }
          }
        }
        drag="y"
        dragControls={controls}
        dragListener={false}
        dragConstraints={{
          top: 0,
          bottom: 0,
        }}
        dragElastic={{
          top: 0.2,
          bottom: 1,
        }}
        className='inner-motion'
        >
         
          <div 
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => {
            e.stopPropagation();
            controls.start(e);
            }}
            className='dragContainer'>
            <div className='dragIcon'></div>
          </div>
          {/* <div className='drawer-small-bg'></div> */}
          <div className='modul-content'>
            <NavLink to="/" >
              <motion.div 
              className="material-symbols-rounded bottom-menu-icons"
              whileHover={{ scale: 1.2 }}
              whileTap={{
                scale: 0.8,
                borderRadius: "100%"
              }}
              >home</motion.div>
            </NavLink>
            
            <NavLink to="/lists">
            <motion.div 
              className="material-symbols-rounded bottom-menu-icons"
              whileHover={{ scale: 1.2 }}
              whileTap={{
                scale: 0.8,
                borderRadius: "100%"
              }}
              >checklist_rtl</motion.div>
            </NavLink>

            <NavLink to="/profile">
            <motion.div 
              className="material-symbols-rounded bottom-menu-icons"
              whileHover={{ scale: 1.2 }}
              whileTap={{
                scale: 0.8,
                borderRadius: "100%"
              }}
              >person</motion.div>
            </NavLink>

            <NavLink to="about">
            <motion.div 
              className="material-symbols-rounded bottom-menu-icons"
              whileHover={{ scale: 1.2 }}
              whileTap={{
                scale: 0.8,
                borderRadius: "100%"
              }}
              >info</motion.div>
            </NavLink>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{
                scale: 0.8,
                borderRadius: "100%"
                }}
            onClick={logoutUser} className="material-symbols-rounded bottom-menu-icons">logout</motion.div>
            
          </div>
        </motion.div>
    </motion.div>
  </>
  )
}

export default DragMenu;