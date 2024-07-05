import React, { useEffect, useState, useRef } from 'react';
import { Player } from '@lordicon/react';

export default function IconContainer({ iconName, size, reveal, hover, onClick }) {    
  const playerRef = useRef(null);
  const ICON = require(`../assets/lordicons/${iconName}.json`);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, [isHovered]);

  const handleHover = () => {
    setIsHovered(true)
    playerRef.current?.playFromBeginning();
  }

  return (
    <div onClick={onClick} style={{ display: "inline-block", cursor: "pointer"}} onMouseEnter={handleHover}>
      <Player
        ref={playerRef} 
        icon={ICON}
        size={size}
        state={isHovered ? hover : reveal }
      />
    </div>
  );
}
