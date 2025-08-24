
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import React, { useState } from 'react';

import Confetti from '../components/Confetti.js';
import GameHeader from '../components/GameHeader.js';
import GameResult from '../components/GameResult.js';
import ParallaxBackground from '../components/ParallaxBackground.js';
import TechCard from '../components/TechCard.js';
import { technologiesData } from '../components/technologies.js';
import { Button } from '../components/ui/Button.js';

export default function DeadTech() {
  const generateInitialPair = () => {
    if (technologiesData.length < 2) return { techs: [], pair: [], state: 'finished' };
    const shuffled = [...technologiesData].sort(() => 0.5 - Math.random());
    return { 
      techs: technologiesData, 
      pair: [shuffled[0], shuffled[1]], 
      state: 'playing' 
    };
  };

  const { techs, pair, state } = generateInitialPair();
  const [technologies, setTechnologies] = useState(techs);
  const [currentPair, setCurrentPair] = useState(pair);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [gameState, setGameState] = useState(state);
  const [_selectedTech, setSelectedTech] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const totalRounds = 10;

  const generateNewPair = (techs) => {
    if (techs.length < 2) return;
    
    const shuffled = [...techs].sort(() => 0.5 - Math.random());
    setCurrentPair([shuffled[0], shuffled[1]]);
    setSelectedTech(null);
  };

  const handleTechSelect = (tech) => {
    setSelectedTech(tech);
    setGameState('revealed');
    
    const winner = currentPair[0].adoption_percentage > currentPair[1].adoption_percentage 
      ? currentPair[0] 
      : currentPair[1];
    
    const isCorrect = tech.id === winner.id;
    if (isCorrect) {
      setScore(prev => prev + 1);
      setShowConfetti(false);  // Reset first
      requestAnimationFrame(() => setShowConfetti(true));  // Then set true on next frame
    }

    // Auto advance to next round after 3 seconds
    setTimeout(() => {
      if (round >= totalRounds) {
        const finalScore = score + (isCorrect ? 1 : 0);
        // Save final score to history
        const existingScores = JSON.parse(localStorage.getItem('deadtech-scores') || '[]');
        const scoreEntry = {
          score: finalScore,
          totalRounds,
          date: new Date().toISOString()
        };
        const updatedScores = [scoreEntry, ...existingScores].slice(0, 10);
        localStorage.setItem('deadtech-scores', JSON.stringify(updatedScores));
        
        // Update best score if needed
        const bestScore = parseInt(localStorage.getItem('deadtech-best-score') || '0', 10);
        if (finalScore > bestScore) {
          localStorage.setItem('deadtech-best-score', finalScore.toString());
        }
        
        setScore(finalScore);
        setGameState('finished');
      } else {
        setRound(prev => prev + 1);
        generateNewPair(technologies);
        setGameState('playing');
        setShowConfetti(false); // Reset confetti for the next round
      }
    }, 3000);
  };

  const handleRestart = () => {
    console.log("in on restart");
    
    // First set the basic game state
    setScore(0);
    setRound(1);
    setSelectedTech(null);
    setShowConfetti(false);
    
    // Set game state to playing, pairs will be set after animation
    setGameState('playing');
  };



  const winner = currentPair.length === 2 
    ? (currentPair[0].adoption_percentage > currentPair[1].adoption_percentage ? currentPair[0] : currentPair[1])
    : null;


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Confetti effect */}
      <Confetti trigger={showConfetti} />
      
      {/* Parallax background of tech logos */}
      <ParallaxBackground technologies={technologies} />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <AnimatePresence mode="wait" onExitComplete={() => {
          if (gameState === 'playing' && round === 1) {
            // Reset animation completed, now show the new game state
            const { techs, pair } = generateInitialPair();
            setTechnologies(techs);
            setCurrentPair(pair);
          }
        }}>
          {gameState === 'finished' ? (
            <GameResult
              key="game-result"
              score={score}
              totalRounds={totalRounds}
              onRestart={handleRestart}
            />
          ) : technologies.length < 2 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                DEAD<span className="text-white">TECH</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-md mx-auto">
                No technologies found in the database. Add some technologies to start playing!
              </p>
              <Button
                onClick={() => {
                  const { techs, pair, state } = generateInitialPair();
                  setTechnologies(techs);
                  setCurrentPair(pair);
                  setGameState(state);
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-8 py-3 rounded-xl"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </motion.div>
          ) : (
            <motion.div key="game-play">
              <GameHeader score={score} round={round} totalRounds={totalRounds} />
              
              {currentPair.length === 2 && (
                <div className="max-w-6xl mx-auto">
                  <motion.div
                    key={round}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                    className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
                  >
                    <TechCard
                      tech={currentPair[0]}
                      onSelect={handleTechSelect}
                      revealed={gameState === 'revealed'}
                      isWinner={gameState === 'revealed' && winner?.id === currentPair[0].id}
                      disabled={gameState === 'revealed'}
                      index={0}
                    />
                    
                    {/* VS Divider */}
                    <div className="flex justify-center items-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:z-20">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black text-xl px-6 py-3 rounded-full shadow-2xl border-4 border-gray-800"
                      >
                        VS
                      </motion.div>
                    </div>
                    
                    <TechCard
                      tech={currentPair[1]}
                      onSelect={handleTechSelect}
                      revealed={gameState === 'revealed'}
                      isWinner={gameState === 'revealed' && winner?.id === currentPair[1].id}
                      disabled={gameState === 'revealed'}
                      index={1}
                    />
                  </motion.div>

                  {/* Next round indicator */}
                  {gameState === 'revealed' && round < totalRounds && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="text-center mt-8"
                    >
                      <p className="text-gray-400">Next round in 3 seconds...</p>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
