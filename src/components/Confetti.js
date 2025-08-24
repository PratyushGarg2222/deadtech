import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const ConfettiPiece = ({ delay, x, color }) => (
  <motion.div
    initial={{ 
      y: -100, 
      x: x, 
      rotate: 0, 
      opacity: 1,
      scale: 1
    }}
    animate={{ 
      y: typeof window !== 'undefined' ? window.innerHeight + 100 : 800, 
      rotate: 720,
      opacity: 0,
      scale: 0.5
    }}
    transition={{ 
      duration: 3 + Math.random() * 2, 
      delay: delay,
      ease: "easeIn"
    }}
    className={`absolute w-3 h-3 ${color} rounded-sm z-50`}
    style={{ left: x }}
  />
);

export default function Confetti({ trigger, duration = 3000 }) {
  const [key, setKey] = useState(0); // Add a key to force re-render
  const [windowWidth, setWindowWidth] = useState(0);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
    }
  }, []);
  
  useEffect(() => {
    if (trigger) {
      setKey(prev => prev + 1); // Increment key to force new animation
    }
  }, [trigger]);

  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    delay: Math.random() * 0.5,
    x: Math.random() * (windowWidth || 800),
    color: [
      'bg-yellow-400',
      'bg-blue-400', 
      'bg-green-400',
      'bg-purple-400',
      'bg-pink-400',
      'bg-red-400',
      'bg-indigo-400',
      'bg-orange-400'
    ][Math.floor(Math.random() * 8)]
  }));

  return (
    <AnimatePresence>
      {trigger && (
        <div key={key} className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {confettiPieces.map(piece => (
            <ConfettiPiece
              key={`${key}-${piece.id}`}
              delay={piece.delay}
              x={piece.x}
              color={piece.color}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}