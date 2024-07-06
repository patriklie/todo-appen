import React, { useEffect, useRef } from 'react';

import Navbar from '../components/Navbar';
import maskottLiten from '../assets/images/Maskott-utklipp.png';
import { Player } from '@lordicon/react';

const ICON = require(`../assets/lordicons/wired-outline-213-arrow-2-rounded-black.json`);

const AuthenticateLoader = () => {

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);
  const playerRef = useRef(null);
 
  return (
    <>
    <Navbar />
    <div className='loader-list-container'>
    <Player
        ref={playerRef} 
        icon={ICON}
        size={96}
        onComplete={() => playerRef.current?.playFromBeginning()}
        state={"loop-cycle"}
      />
        <div className='load-list-text'>Godkjenner token...</div>
        <img className='liten-maskott' src={maskottLiten} />
    </div>
    </>
  )
}

export default AuthenticateLoader;