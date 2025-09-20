import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Star, Crown, Zap, Lock, Users, Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Progress } from '../ui/Progress'
import { useAuth } from '../../contexts/AuthContext'
import { calculateLevel } from '../../lib/utils'

export function RewardsView() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'badges' | 'leaderboard'>('badges')
  
  if (!user) return null
  
  const currentLevel = calculateLevel(user.xp)
  
  const availableBadges = [
    {
      id: 'first-lesson',
      name: 'First Steps',
      description: 'Complete your first lesson',
      icon: '🌟',
      unlocked: user.badges.some(b => b.id === 'first-lesson'),
      progress: 100,
      requirement: 'Complete 1 lesson'
    },
    {
      id: 'week-streak',
      name: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: '🔥',
      unlocked: user.badges.some(b => b.id === 'week-streak'),
      progress: Math.min(100, (user.streak / 7) * 100),
      requirement: 'Study for 7 consecutive days'
    },
    {
      id: 'quiz-master',
      name: 'Quiz Master',
      description: 'Score 100% on 5 quizzes',
      icon: '🎯',
      unlocked: user.badges.some(b => b.id === 'quiz-master'),
      progress: 60,
      requirement: 'Score perfect on 5 quizzes'
    },
    {
      id: 'math-genius',
      name: 'Math Genius',
      description: 'Complete all math lessons',
      icon: '🔢',
      unlocked: false,
      progress: 75,
      requirement: 'Complete all math lessons'
    },
    {
      id: 'science-explorer',
      name: 'Science Explorer',
      description: 'Complete all science lessons',
      icon: '🔬',
      unlocked: false,
      progress: 45,
      requirement: 'Complete all science lessons'
    },
    {
      id: 'speed-learner',
      name: 'Speed Learner',
      description: 'Complete 5 lessons in one day',
      icon: '⚡',
      unlocked: false,
      progress: 20,
      requirement: 'Complete 5 lessons in one day'
    }
  ]
  
  const leaderboardData = [
    { rank: 1, name: 'Arjun Patel', xp: 2150, level: 22, avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop' },
    { rank: 2, name: 'Priya Sharma', xp: 1890, level: 19, avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop' },
    { rank: 3, name: user.name, xp: user.xp, level: currentLevel, avatar: user.avatar, isCurrentUser: true },
    { rank: 4, name: 'Vikram Singh', xp: 1180, level: 12, avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop' },
    { rank: 5, name: 'Anita Desai', xp: 950, level: 10, avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop' }
  ]
  
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />
      case 2: return <Trophy className="w-5 h-5 text-gray-400" />
      case 3: return <Trophy className="w-5 h-5 text-yellow-600" />
      default: return <span className="text-gray-500 font-medium">#{rank}</span>
    }
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rewards</h1>
          <p className="text-gray-600">
            Earn badges and climb the leaderboard
          </p>
        </motion.div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 w-fit">
        <button
          onClick={() => setActiveTab('badges')}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'badges'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Trophy className="w-4 h-4 inline mr-2" />
          Badges
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'leaderboard'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Users className="w-4 h-4 inline mr-2" />
          Leaderboard
        </button>
      </div>
      
      {activeTab === 'badges' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableBadges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`relative overflow-hidden ${
                badge.unlocked 
                  ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' 
                  : 'bg-gray-50'
              }`}>
                {badge.unlocked && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="success">Earned</Badge>
                  </div>
                )}
                {!badge.unlocked && badge.progress === 0 && (
                  <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                
                <CardContent className="p-6 text-center">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: badge.unlocked ? 1.1 : 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-6xl mb-4"
                  >
                    {badge.unlocked ? badge.icon : '🔒'}
                  </motion.div>
                  
                  <h3 className={`text-lg font-bold mb-2 ${
                    badge.unlocked ? 'text-yellow-800' : 'text-gray-600'
                  }`}>
                    {badge.name}
                  </h3>
                  
                  <p className={`text-sm mb-4 ${
                    badge.unlocked ? 'text-yellow-700' : 'text-gray-500'
                  }`}>
                    {badge.description}
                  </p>
                  
                  {!badge.unlocked && badge.progress > 0 && (
                    <div className="space-y-2">
                      <Progress value={badge.progress} className="h-2" />
                      <p className="text-xs text-gray-600">{badge.requirement}</p>
                    </div>
                  )}
                  
                  {badge.unlocked && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-center space-x-1 text-yellow-600"
                    >
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-medium">Completed</span>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Crown className="w-5 h-5 text-yellow-600" />
              <span>Class Leaderboard</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboardData.map((student, index) => (
                <motion.div
                  key={student.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    student.isCurrentUser 
                      ? 'bg-blue-50 border-2 border-blue-200' 
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10">
                      {getRankIcon(student.rank)}
                    </div>
                    
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-10 h-10 rounded-full"
                    />
                    
                    <div>
                      <h4 className={`font-medium ${
                        student.isCurrentUser ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {student.name}
                        {student.isCurrentUser && (
                          <Badge variant="default" className="ml-2 text-xs">You</Badge>
                        )}
                      </h4>
                      <p className="text-sm text-gray-600">Level {student.level}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`font-bold ${
                      student.isCurrentUser ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {student.xp.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">XP</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}