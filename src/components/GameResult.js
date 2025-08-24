
import { motion } from 'framer-motion';
import { Trophy, RotateCcw, TrendingUp } from 'lucide-react';
import React from 'react'


import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';


export default function GameResult({ score, totalRounds, onRestart }) {
  const percentage = Math.round((score / totalRounds) * 100);
  
  const getGrade = () => {
    if (percentage >= 90) return { grade: 'A++', color: 'from-yellow-300 via-yellow-400 to-orange-500', emoji: '🏆' };
    if (percentage >= 80) return { grade: 'A', color: 'from-green-400 via-emerald-500 to-teal-600', emoji: '⭐' };
    if (percentage >= 70) return { grade: 'B', color: 'from-blue-400 via-blue-500 to-indigo-600', emoji: '✨' };
    if (percentage >= 60) return { grade: 'C', color: 'from-purple-400 via-purple-500 to-pink-600', emoji: '🎯' };
    return { grade: 'D', color: 'from-rose-400 via-rose-500 to-red-600', emoji: '💪' };
  };

  const { grade, color, emoji } = getGrade();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-lg mx-auto"
    >
      <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border-gray-700/50 overflow-hidden">
        <div className="relative p-8 text-center space-y-6">
          {/* Celebration Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
          
          {/* Grade Display */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="relative bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
          >
            <div className="text-gray-400 text-sm font-medium mb-2">Your Grade</div>
            <div className="flex items-center justify-center gap-3">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center text-3xl font-black text-white shadow-lg`}>
                {grade}
              </div>
              <div className="text-left">
                <div className="text-4xl">{emoji}</div>
                <div className="text-gray-400 text-sm mt-1">
                  {percentage >= 90 ? "Outstanding!" :
                   percentage >= 80 ? "Excellent!" :
                   percentage >= 70 ? "Great Job!" :
                   percentage >= 60 ? "Good Effort!" :
                   "Keep Practicing!"}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">Game Complete!</h2>
            
            <div className="space-y-2">
              <div className="text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {score}/{totalRounds}
              </div>
              <div className="text-gray-300">
                {percentage}% accuracy
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <TrendingUp className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{score}</div>
                <div className="text-gray-400 text-sm">Correct</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <Trophy className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{totalRounds - score}</div>
                <div className="text-gray-400 text-sm">Missed</div>
              </div>
            </div>

            {/* Best Score */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/50 rounded-lg p-4 mt-4"
            >
              <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              {(() => {
                const bestScore = parseInt(localStorage.getItem('deadtech-best-score') || '0', 10);
                const isNewBest = score > bestScore;
                return (
                  <div className="text-xl font-bold">
                    {isNewBest ? (
                      <span className="text-yellow-400">New Best Score!</span>
                    ) : (
                      <span className="text-white">Best Score: {bestScore}/{totalRounds}</span>
                    )}
                  </div>
                );
              })()}
            </motion.div>
          </div>

          {/* Actions */}
          <div className="pt-4 relative z-50">
            <Button
              onClick={onRestart}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}