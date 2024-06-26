import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const DraggableArrowMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const y = useMotionValue(0);
  const opacity = useTransform(y, [-200, 0], [1, 0]);

  const handleDragEnd = (info) => {
    if (info.point.y < -100) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div style={{ position: 'relative', height: '300px', width: '100%', backgroundColor: '#white', overflow: 'hidden' }}>
      <motion.div
        drag="y"
        dragConstraints={{ top: -200, bottom: 0 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50px',
          backgroundColor: '#3498db',
          color: 'white',
          textAlign: 'center',
          lineHeight: '50px',
          cursor: 'grab',
          y,
        }}
        onDragEnd={handleDragEnd}
        animate={{ y: isOpen ? -200 : 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        Drag Up
      </motion.div>
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          backgroundColor: '#ecf0f1',
          borderTop: '1px solid #bdc3c7',
          opacity,
          y,
        }}
      >
        <div style={{ padding: '20px' }}>
          <h3>Menu</h3>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default DraggableArrowMenu;
