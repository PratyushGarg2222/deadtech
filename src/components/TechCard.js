import React from 'react';

import { motion } from 'framer-motion';
import { TrendingUp, Code, Database, Cloud } from 'lucide-react';


import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';


const categoryIcons = {
  programming_language: Code,
  framework: Code,
  database: Database,
  cloud_platform: Cloud,
  tool: TrendingUp
};

export default function TechCard({ 
  tech, 
  onSelect, 
  revealed = false, 
  isWinner = false,
  disabled = false,
  index = 0
}) {
  const IconComponent = categoryIcons[tech.category] || Code;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      whileHover={!disabled ? { scale: 1.02, y: -5 } : {}}
      className="w-full max-w-sm mx-auto"
    >
      <Card className={`relative overflow-hidden transition-all duration-500 ${
        revealed 
          ? isWinner 
            ? 'bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-500/70 shadow-2xl shadow-green-500/20 scale-105'
            : 'bg-gradient-to-br from-red-900/50 to-red-800/50 border-red-500/70 shadow-2xl shadow-red-500/20'
          : 'bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-700/50 hover:border-blue-400/50'
      } backdrop-blur-xl`}>
        
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative p-6 space-y-4">
          {/* Tech logo and name */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center p-2">
                {tech.logo_url ? (
                  <img 
                    src={tech.logo_url} 
                    alt={tech.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className={`w-full h-full ${tech.logo_url ? 'hidden' : 'flex'} items-center justify-center`}>
                  <IconComponent className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{tech.name}</h3>
                <Badge variant="secondary" className="text-xs bg-gray-800/50 text-gray-300">
                  {tech.category?.replace(/_/g, ' ')}
                </Badge>
              </div>
            </div>
          </div>

          {/* Description */}
          {tech.description && (
            <p className="text-gray-300 text-sm leading-relaxed">
              {tech.description}
            </p>
          )}

          {/* Adoption rate - revealed or hidden */}
          <div className="text-center py-4">
            {revealed ? (
              <motion.div
                initial={{ scale: 0, rotateY: -90 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="space-y-2"
              >
                <div className="text-3xl font-bold text-white">
                  {tech.adoption_percentage}%
                </div>
                <div className="text-gray-300 text-sm">
                  yearly adoption rate
                </div>
              </motion.div>
            ) : (
              <div className="space-y-3">
                <div className="w-24 h-8 bg-gray-700/50 rounded-lg mx-auto animate-pulse" />
                <div className="text-gray-300 text-sm font-medium">
                  ? % adoption rate
                </div>
              </div>
            )}
          </div>

          {/* Action button */}
          {!revealed && (
            <Button
              onClick={() => onSelect(tech)}
              disabled={disabled}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Choose {tech.name}
            </Button>
          )}
          
          {/* Winner indicator */}
          {revealed && isWinner && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", bounce: 0.6 }}
              className="text-center"
            >
              <Badge className="bg-green-600/80 text-white font-semibold px-4 py-2 text-lg border border-green-400/50">
                🏆 Winner!
              </Badge>
            </motion.div>
          )}

          {/* Loser indicator */}
          {revealed && !isWinner && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <Badge className="bg-red-600/80 text-white font-semibold px-4 py-2 border border-red-400/50">
                Not this time
              </Badge>
            </motion.div>
          )}
        </div>

        {/* Enhanced glowing effect for winner */}
        {revealed && isWinner && (
          <>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-400/10 to-emerald-400/10 animate-pulse" />
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-green-400/20 to-emerald-400/20 blur-sm" />
          </>
        )}
      </Card>
    </motion.div>
  );
}
