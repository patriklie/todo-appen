import React, { useState } from 'react';
import '../dragclose.css';
import { useAnimate, motion, useDragControls, useMotionValue } from 'framer-motion';
import useMeasure from 'react-use-measure';

const DragCloseDrawerExample = () => {

  const [open, setOpen] = useState(false);

  return (
    <div className='drawer-container'>
      {/* <button className='open-button' onClick={() => setOpen(true)} >Open Drawer</button> */}
      <DragCloseDrawer open={open} setOpen={setOpen}>
      <h2 className="h2-drawer">
            Drag the handle at the top of this modal downwards 100px to close it
          </h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima
            laboriosam quos deleniti veniam est culpa quis nihil enim suscipit
            nulla aliquid iure optio quaerat deserunt, molestias quasi facere
            aut quidem reprehenderit maiores.
          </p>
          <p>
            Laudantium corrupti neque rerum labore tempore sapiente. Quos, nobis
            dolores. Esse fuga, cupiditate rerum soluta magni numquam nemo
            aliquid voluptate similique deserunt!
          </p>
      </DragCloseDrawer>

    </div>
  )
}


const DragCloseDrawer = ({ open, setOpen, children }) => {

  const [scope, animate] = useAnimate();
  const controls = useDragControls();
  const y = useMotionValue(0);
  const [drawerRef, { height }] = useMeasure();

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

  return <>
    <motion.div 
/*     initial={{ opacity: 0 }}
    animate={{ opacity: 1 }} */
    ref={scope}
    onClick={handleMinimize}
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

/*           if (height - y.get() >= 100) {
            handleOpen();
          } */

          if (y.get() >= height / 2) {
              handleMinimize();
          }
          
/*           if (!open && height - y.get() >= 100) {
              handleOpen();
          } */
             
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
          top: 0,
          bottom: 1,
        }}
        className='inner-motion'
        >
          <div className='dragContainer'>
            <button onPointerDown={(e) => {controls.start(e)}} className='dragIcon'></button>
          </div>

          <div className='modul-content'>{children}</div>
        </motion.div>

    </motion.div>
  </>
}

export default DragCloseDrawerExample;