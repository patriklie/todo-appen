import { useEffect, useRef } from 'react';
import { Player } from '@lordicon/react';



export default function PlayOnce() {    
  const playerRef = useRef(null);
  const ICON = require('../assets/lordicons/wired-outline-185-trash-bin.json');
  
    useEffect(() => {
        playerRef.current?.playFromBeginning();
    }, [])

    return (
        <Player 
            ref={playerRef} 
            icon={ ICON }
            size={96}
        />
    );
}