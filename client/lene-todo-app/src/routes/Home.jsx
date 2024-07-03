import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeBackground } from '../features/auth/authSlice';
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
import BG_19 from '../assets/images/BG_19.jpeg';
import BG_20 from '../assets/images/BG_20.jpeg';
import BG_21 from '../assets/images/BG_21.jpeg';

const Home = () => {

  const username = useSelector(state => state.auth.username);
  const backgroundState = useSelector(state => state.auth.background);
  const firstName = username.split(' ')[0];
  const dispatch = useDispatch();

  const backgrounds = {
    1: BG_1,
    2: BG_2,
    3: BG_3,
    4: BG_4,
    5: BG_5,
    6: BG_6,
    7: BG_7,
    8: BG_8,
    9: BG_9,
    10: BG_10,
    11: BG_11,
    12: BG_12,
    13: BG_13,
    14: BG_14,
    15: BG_15,
    16: BG_16,
    17: BG_17,
    18: BG_18,
    19: BG_19,
    20: BG_20,
    21: BG_21
  };

  const currentBackground = backgrounds[backgroundState];

  const handleBGSwapIncrement = () => {
    if(backgroundState < 21) {
      dispatch(changeBackground(backgroundState + 1));
    } else {
      dispatch(changeBackground(1));
    }
  }

  const handleBGSwapDecrement = () => {
    if(backgroundState > 1 ) {
      dispatch(changeBackground(backgroundState - 1));
    } else {
      dispatch(changeBackground(21));
    }
  }
  
  return (
    <>
      <div className='home-container-div'>
        <img className='home-bg-img' src={currentBackground} />
        <div className='welcome-container'>
          <h2>Hei {firstName}! 👋</h2>
          <p>Velkommen til <span>TODO</span>appen, et MERN-porteføljeprosjekt hvor jeg har brukt: MongoDB, Express, React, Node, React Router, Redux, Mongoose, Framer Motion samt en rekke andre npm-pakker og middlewares for å lage en interaktiv app (front- og backend). I appen har du full CRUD-funksjonalitet for brukere, lister, oppgaver (todos) og profil.</p>
          <h4>Utforsk Appen! 🕵️</h4>


        </div>
        <div className='bg-swapper'>
            <div onClick={handleBGSwapDecrement} class="material-symbols-rounded arrows">chevron_left</div>
            <div className='bg-swapper-text'>Bakgrunn</div>
            <div onClick={handleBGSwapIncrement} class="material-symbols-rounded arrows">chevron_right</div>
          </div>
      </div>
    </>
  )
}

export default Home