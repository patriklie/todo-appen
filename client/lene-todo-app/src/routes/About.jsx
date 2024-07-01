import React, { useState, useEffect } from 'react';
import maskottLiten from '../assets/images/Maskott-utklipp.png';
import { easeIn, easeInOut, motion, spring } from 'framer-motion';

const About = () => {

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
      className='container about'>
      <span id="idea-icon" className="material-symbols-rounded">emoji_objects</span>
        <div>Ideen til appen kom da min samboer trengte en oversikt over todos samtidig som jeg skulle starte på et nytt MERN stack prosjekt. En god mulighet til å kunne starte et prosjekt fra scratch og få praksis erfaring etter mye teori - <span>TODOappen!</span></div>
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
        rotate: 0,
        opacity: 1,
      }}
      className='image-container-maskott'>
        <img className='liten-maskott' src={maskottLiten} />
      </motion.div>
      
    </>
  )
}

export default About