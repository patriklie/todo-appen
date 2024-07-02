import React from 'react';
import { useSelector } from 'react-redux';
import BG from '../assets/images/BG_18.jpeg';
import { motion } from 'framer-motion'

const Home = () => {

  const username = useSelector(state => state.auth.username);
  const firstName = username.split(' ')[0];

  return (
      <>
      <div className='home-container-div'>
        <img className='home-bg-img' src={BG} />
        <div className='welcome-container'>
        <h2>Hei {firstName}! 👋</h2>
        <p>Velkommen til <span>TODO</span>appen, et MERN portefølje prosjekt hvor jeg har brukt: Mongo, Express, React, Node, React Router, Redux, Mongoose, Framer-Motion samt en rekke andre npm's og middlewares til å lage en interaktiv app front/backend. I appen har du full CRUD funksjonalitet på brukere, lister, todos og profil.</p>
        <h4>Utforsk Appen! 🕵️</h4>
        </div>

{/*       <motion.div 
      className='motion-home-intro'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      >
        Dra opp menyen under ⬇️
      </motion.div> */}
      </div>
      </>
  )
}

export default Home