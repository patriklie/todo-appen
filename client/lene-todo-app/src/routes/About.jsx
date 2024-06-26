import React, { useState, useEffect } from 'react';
import maskottLiten from '../assets/images/Maskott-utklipp.png';
import { easeIn, easeInOut, motion, spring } from 'framer-motion';

const About = () => {

  const [triggerSecondAnimation, setTriggerSecondAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTriggerSecondAnimation(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <motion.div 
            initial={{
              x: 0,
              y: 100,
              scale: 0,
              rotate: 0,
              opacity: 0,
            }}
            animate={{
              x: 0,
              y: 0,
              scale: 1,
              rotate: 0,
              opacity: 1,
            }}
            transition={{
              delay: 0.4,
            }}
      className='container about'>
      <span id="idea-icon" className="material-symbols-rounded">emoji_objects</span>
        <div>Ideen til denne appen kommer fra min samboer som trengte en oversikt over todos. Så hvorfor ikke lage <span>TODOappen!</span></div>
      </motion.div>
      <motion.div
      initial={{
        x: 0,
        y: 100,
        scale: 0,
        rotate: 0,
        opacity: 0,
      }}
      animate={{
        x: 0,
        y: 0,
        scale: 1,
        rotate: triggerSecondAnimation ? [0, 20, -20, 0] : 0,
        opacity: 1,
      }}
      transition={{
        type: "spring",
        damping: 5,
        stiffness: 100,
      }}

      className='image-container-maskott'>
        <img className='liten-maskott' src={maskottLiten} />
      </motion.div>
      
    </>
  )
}

export default About