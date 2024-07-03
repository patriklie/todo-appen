import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleBackground } from '../features/auth/authSlice';
import BG_1 from '../assets/images/BG_1.jpeg';
import BG_2 from '../assets/images/BG_2.jpeg';
import BG_3 from '../assets/images/BG_3.jpeg';
import BG_4 from '../assets/images/BG_4.jpeg';
import BG_5 from '../assets/images/BG_5.jpeg';
import BG_6 from '../assets/images/BG_6.jpeg';
import BG_7 from '../assets/images/BG_7.jpeg';
import BG_8 from '../assets/images/BG_8.jpeg';
import BG_9 from '../assets/images/BG_9.jpeg';
import BG_10 from '../assets/images/BG_10.jpeg';
import BG_11 from '../assets/images/BG_11.jpeg';
import BG_12 from '../assets/images/BG_12.jpeg';
import BG_13 from '../assets/images/BG_13.jpeg';
import BG_14 from '../assets/images/BG_14.jpeg';
import BG_15 from '../assets/images/BG_15.jpeg';
import BG_16 from '../assets/images/BG_16.jpeg';
import BG_17 from '../assets/images/BG_17.jpeg';
import BG_18 from '../assets/images/BG_18.jpeg';

const Home = () => {

  const username = useSelector(state => state.auth.username);
  const backgroundState = useSelector(state => state.auth.background);
  const firstName = username.split(' ')[0];
  const dispatch = useDispatch();


  
  return (
    <>
      <div className='home-container-div'>
        <img className='home-bg-img' src={BG_18} />
        <div className='welcome-container'>
          <h2>Hei {firstName}! 👋</h2>
          <p>Velkommen til <span>TODO</span>appen, et MERN-porteføljeprosjekt hvor jeg har brukt: MongoDB, Express, React, Node, React Router, Redux, Mongoose, Framer Motion samt en rekke andre npm-pakker og middlewares for å lage en interaktiv app (front- og backend). I appen har du full CRUD-funksjonalitet for brukere, lister, oppgaver (todos) og profil.</p>
          <h4>Utforsk Appen! 🕵️</h4>
        </div>
      </div>
    </>
  )
}

export default Home