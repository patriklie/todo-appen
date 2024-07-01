import React, { useEffect, useState } from 'react';
import '../dragclose.css';
import { useAnimate, motion, useDragControls, useMotionValue } from 'framer-motion';
import useMeasure from 'react-use-measure';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const DragMenu = () => {
  const [open, setOpen] = useState(false);
  const [scope, animate] = useAnimate();
  const controls = useDragControls();
  const y = useMotionValue();
  const [drawerRef, { height }] = useMeasure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("elements HEIGHT: ", height)

  const logoutUser = () => {  
    localStorage.removeItem("token");
    toast.warning(`Logget ut! 👋`, {
      position: "bottom-left",
      autoClose: 3000,
    });
    dispatch(logout());

    navigate("/login")
}

  const handleOpen = async () => {
    const yStart = typeof y.get() === "number" ? y.get() : 0;

    console.log("Handle Open yStart", yStart)
    console.log("Handle Open Height", height)
    await animate("#drawer", {
      y: [yStart, 0]
    });
    setOpen(true);
  };

  const handleMinimize = async () => {
    const yStart = typeof y.get() === "number" ? y.get() : 0;

    console.log("Minimize yStart", yStart)
    console.log("Minimize Height", height)

    await animate("#drawer", {
      y: [yStart, height - 50]
    });
    setOpen(false);
  };

  useEffect(() => {
    if (height > 0) {
      y.set(height - 50);
    } else {
      y.set(110);
    }
    
  }, [height])


  return <>



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
            console.log("Y.get: ", y.get())
            console.log("Height: ", height)
            console.log(height - y.get())

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
          <div className='drawer-small-bg'></div>
          <div className='dragContainer'>
            <button onPointerDown={(e) => {controls.start(e)}} className='dragIcon'></button>
          </div>

          <div className='modul-content'>
            <NavLink to="/" >
              <div className="material-symbols-rounded bottom-menu-icons">home</div>
            </NavLink>
            
            <NavLink to="/todos">
              <div className="material-symbols-rounded bottom-menu-icons">checklist_rtl</div>
            </NavLink>

            <NavLink to="/profile">
              <div className="material-symbols-rounded bottom-menu-icons">person</div>
            </NavLink>

            <NavLink to="about">
              <div className="material-symbols-rounded bottom-menu-icons">info</div>
            </NavLink>
            <div onClick={logoutUser} className="material-symbols-rounded bottom-menu-icons">logout</div>
            
          </div>
        </motion.div>
    </motion.div>
  </>
}

export default DragMenu;