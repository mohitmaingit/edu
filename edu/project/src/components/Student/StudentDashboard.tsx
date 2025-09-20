import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Brain, 
  Trophy, 
  Flame,
  Star,
  TrendingUp,
  Clock,
  Target
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Button } from '../ui/Button'
import { Progress } from '../ui/Progress'
import { Badge } from '../ui/Badge'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { db, Lesson } from '../../lib/storage'
import { demoLessons } from '../../lib/demo-data'
import { calculateLevel, getXpForNextLevel } from '../../lib/utils'

export function StudentDashboard() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [recentLessons, setRecentLessons] = useState<Lesson[]>([])
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const existingLessons = await db.lessons.toArray()
        if (existingLessons.length === 0) {
          await db.lessons.bulkAdd(demoLessons)
          setRecentLessons(demoLessons.slice(0, 3))
        } else {
          setRecentLessons(existingLessons.slice(0, 3))
        }
      } catch (error) {
        console.error('Failed to load lessons:', error)
        setRecentLessons(demoLessons.slice(0, 3))
      }
    }
    
    loadData()
  }, [])
  
  if (!user) return null
  
  const currentLevel = calculateLevel(user.xp)
  const xpForNext = getXpForNextLevel(user.xp)
  const levelProgress = ((user.xp % 100) / 100) * 100
  
  const stats = [
    {
      title: t('totalxp'),
      value: user.xp.toLocaleString(),
      icon: Star,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50'
    },
    {
      title: t('level'),
      value: currentLevel.toString(),
      icon: Trophy,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      title: t('dailystreak'),
      value: `${user.streak} days`,
      icon: Flame,
      color: 'text-red-600',
      bg: 'bg-red-50'
    },
    {
      title: 'Completion Rate',
      value: '85%',
      icon: Target,
      color: 'text-green-600',
      bg: 'bg-green-50'
    }
  ]
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center sm:text-left"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('welcome')}, {user.name}! 👋
          </h1>
          <p className="text-gray-600">
            Ready to continue your learning journey?
          </p>
        </motion.div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Level Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Level Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Level {currentLevel}</span>
                <span className="text-sm text-gray-500">
                  {xpForNext} XP to Level {currentLevel + 1}
                </span>
              </div>
              <Progress value={levelProgress} showLabel={false} />
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Continue Learning */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>{t('continuelearning')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        lesson.subject === 'math' ? 'bg-blue-100' :
                        lesson.subject === 'science' ? 'bg-green-100' :
                        lesson.subject === 'physics' ? 'bg-purple-100' : 'bg-orange-100'
                      }`}>
                        {lesson.subject === 'math' ? '🔢' :
                         lesson.subject === 'science' ? '🔬' :
                         lesson.subject === 'physics' ? '⚡' : '🧪'}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                        <p className="text-sm text-gray-600">{lesson.description}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="flex items-center text-xs text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            {lesson.duration} min
                          </span>
                          <Badge variant={lesson.completed ? 'success' : 'default'}>
                            {lesson.completed ? 'Completed' : 'In Progress'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button size="sm">
                      {lesson.completed ? t('retry') : t('continue')}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Recent Badges */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                <span>{t('recentbadges')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.badges.map((badge) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="text-2xl">{badge.icon}</div>
                    <div>
                      <h4 className="font-medium text-gray-900">{badge.name}</h4>
                      <p className="text-xs text-gray-600">{badge.description}</p>
                    </div>
                  </motion.div>
                ))}
                {user.badges.length === 0 && (
                  <div className="text-center py-8">
                    <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">Complete lessons to earn badges!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}