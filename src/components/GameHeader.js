import React from 'react'

import { motion } from 'framer-motion';
import { Trophy, Zap, Target, Info } from 'lucide-react';


import { Badge } from '@/components/ui/Badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/Dialog";

export default function GameHeader({ score, round, totalRounds = 10 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-6 mb-8"
    >
      {/* Game Title */}
      <div className="space-y-2">
        <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          DEAD<span className="text-white">TECH</span>
        </h1>
        <p className="text-gray-400 text-lg flex items-center justify-center gap-2">
          Which technology has higher adoption?
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-blue-400 hover:text-blue-300 transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black">
                <Info className="w-5 h-5" />
              </button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700 text-gray-200">
              <DialogHeader>
                <DialogTitle>About The Metric</DialogTitle>
                <DialogDescription className="text-gray-400 pt-2">
                  The game compares technologies based on their &ldquo;Yearly Adoption Percentage&rdquo;. This data is sourced from large-scale developer surveys (like the Stack Overflow Developer Survey) and represents the percentage of professional developers who reported using that specific technology in the past year.
                  <br /><br />
                  Your goal is to guess which of the two technologies has a higher adoption rate. Good luck!
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </p>
      </div>

      {/* Game Stats */}
      <div className="flex justify-center items-center space-x-6">
        <Badge className="bg-gray-800/50 text-gray-200 px-4 py-2 text-sm font-semibold">
          <Trophy className="w-4 h-4 mr-2" />
          Score: {score}
        </Badge>
        
        <Badge className="bg-gray-800/50 text-gray-200 px-4 py-2 text-sm font-semibold">
          <Target className="w-4 h-4 mr-2" />
          Round: {round}/{totalRounds}
        </Badge>
        
        <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-semibold">
          <Zap className="w-4 h-4 mr-2" />
          Playing
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="max-w-md mx-auto">
        <div className="w-full bg-gray-800 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((round - 1) / totalRounds) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-gray-500 text-xs mt-2">
          Progress: {Math.round(((round - 1) / totalRounds) * 100)}%
        </p>
      </div>
    </motion.div>
  );
}
