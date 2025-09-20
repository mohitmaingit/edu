import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Calendar, Target, Award, BookOpen, Brain } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Progress } from '../ui/Progress'
import { useAuth } from '../../contexts/AuthContext'
import { calculateLevel, getXpForNextLevel } from '../../lib/utils'

export function ProgressView() {
  const { user } = useAuth()
  
  if (!user) return null
  
  const currentLevel = calculateLevel(user.xp)
  const xpForNext = getXpForNextLevel(user.xp)
  const levelProgress = ((user.xp % 100) / 100) * 100
  
  const weeklyData = [
    { day: 'Mon', xp: 50, lessons: 2 },
    { day: 'Tue', xp: 80, lessons: 3 },
    { day: 'Wed', xp: 0, lessons: 0 },
    { day: 'Thu', xp: 120, lessons: 4 },
    { day: 'Fri', xp: 90, lessons: 3 },
    { day: 'Sat', xp: 60, lessons: 2 },
    { day: 'Sun', xp: 30, lessons: 1 }
  ]
  
  const subjectProgress = [
    { subject: 'Mathematics', progress: 85, color: 'bg-blue-500' },
    { subject: 'Science', progress: 60, color: 'bg-green-500' },
    { subject: 'Physics', progress: 40, color: 'bg-purple-500' },
    { subject: 'Chemistry', progress: 25, color: 'bg-orange-500' }
  ]
  
  const achievements = [
    {
      title: 'Lessons Completed',
      value: '24',
      total: '30',
      icon: BookOpen,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Quizzes Taken',
      value: '18',
      total: '25',
      icon: Brain,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      title: 'Current Streak',
      value: `${user.streak}`,
      total: '30',
      icon: Calendar,
      color: 'text-red-600',
      bg: 'bg-red-50'
    }
  ]
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Progress</h1>
          <p className="text-gray-600">
            Track your learning journey and achievements
          </p>
        </motion.div>
      </div>
      
      {/* Level Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Level {currentLevel}</h2>
                <p className="text-blue-100">
                  {xpForNext} XP to Level {currentLevel + 1}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{user.xp.toLocaleString()}</div>
                <div className="text-blue-100">Total XP</div>
              </div>
            </div>
            <Progress
              value={levelProgress}
              className="h-3"
            />
          </CardContent>
        </Card>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Weekly Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>Weekly Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between h-40 space-x-2">
                {weeklyData.map((data, index) => (
                  <motion.div
                    key={data.day}
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.xp / 120) * 100}%` }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div
                      className="w-full bg-gradient-to-t from-blue-400 to-blue-600 rounded-t-lg mb-2 min-h-[4px] relative group"
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        {data.xp} XP
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">{data.day}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-600" />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    <div className={`p-3 rounded-lg ${achievement.bg}`}>
                      <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          {achievement.title}
                        </span>
                        <span className="text-sm text-gray-600">
                          {achievement.value}/{achievement.total}
                        </span>
                      </div>
                      <Progress
                        value={(parseInt(achievement.value) / parseInt(achievement.total)) * 100}
                        className="h-2"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Subject Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-600" />
              <span>Subject Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subjectProgress.map((subject, index) => (
                <motion.div
                  key={subject.subject}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{subject.subject}</span>
                    <span className="text-sm text-gray-600">{subject.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${subject.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${subject.progress}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}