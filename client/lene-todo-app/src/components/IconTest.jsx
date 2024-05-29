import React, { useEffect, useState, useRef } from 'react';
import { Player } from '@lordicon/react';

export default function PlayOnce() {    
  const playerRef = useRef(null);
  const ICON = require('../assets/lordicons/wired-outline-185-trash-bin.json');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, [isHovered]);

  const handleHover = () => {
    setIsHovered(true)
    playerRef.current?.playFromBeginning();
  }

  return (
    <div style={{ display: "inline-block", cursor: "pointer"}} onMouseEnter={handleHover}>
      <Player
        ref={playerRef} 
        icon={ICON}
        size={96}
        state={isHovered ? "hover-empty" : "in-reveal"}
      />
    </div>
  );
}
