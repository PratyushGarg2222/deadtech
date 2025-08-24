import React from 'react'
import { motion } from 'framer-motion';


const ParallaxRow = ({ technologies, duration, direction = 'left' }) => {
  // We need to have enough items to fill the screen twice for a seamless loop
  const repeatedTechs = [...technologies, ...technologies, ...technologies, ...technologies];

  return (
    <motion.div
      className="flex gap-8"
      animate={{
        x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
      }}
      transition={{
        ease: 'linear',
        duration: duration,
        repeat: Infinity,
      }}
    >
      {repeatedTechs.map((tech, i) => (
        <div key={`${tech.id}-${i}`} className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-slate-800/50 rounded-xl p-2">
          {tech.logo_url ? (
            <img src={tech.logo_url} alt={tech.name} className="w-full h-full object-contain" />
          ) : (
            <span className="text-slate-400 text-xs font-bold">{tech.name.substring(0, 3)}</span>
          )}
        </div>
      ))}
    </motion.div>
  );
};

export default function ParallaxBackground({ technologies }) {
  if (!technologies || technologies.length < 10) return null;

  // Shuffle and slice for variety in each row
  const shuffled = [...technologies].sort(() => 0.5 - Math.random());
  const row1 = shuffled.slice(0, 10);
  const row2 = shuffled.slice(10, 20);
  const row3 = [...shuffled.slice(5, 15)].reverse();
  const row4 = [...shuffled.slice(0, 5), ...shuffled.slice(15, 20)].reverse();

  return (
    <div className="absolute inset-0 z-0 overflow-hidden space-y-8 opacity-30">
      <ParallaxRow technologies={row1} duration={60} direction="left" />
      <ParallaxRow technologies={row2} duration={80} direction="right" />
      <ParallaxRow technologies={row3} duration={70} direction="left" />
      <ParallaxRow technologies={row4} duration={90} direction="right" />
    </div>
  );
}
