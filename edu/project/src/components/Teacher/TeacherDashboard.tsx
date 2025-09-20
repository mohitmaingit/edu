import React from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  TrendingUp, 
  BookOpen, 
  Award,
  Clock,
  Target,
  BarChart3,
  Calendar
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Progress } from '../ui/Progress'
import { Badge } from '../ui/Badge'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'

export function TeacherDashboard() {
  const { user } = useAuth()
  const { t } = useLanguage()
  
  if (!user) return null
  
  const classStats = [
    {
      title: t('totalstudents'),
      value: '32',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      change: '+2 this week'
    },
    {
      title: t('avgprogress'),
      value: '68%',
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50',
      change: '+5% this week'
    },
    {
      title: t('completionrate'),
      value: '84%',
      icon: Target,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      change: '+3% this week'
    },
    {
      title: 'Active Today',
      value: '24',
      icon: Clock,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      change: 'of 32 students'
    }
  ]
  
  const recentActivity = [
    {
      student: 'Rahul Kumar',
      action: 'Completed "Introduction to Algebra"',
      time: '2 hours ago',
      score: 95,
      avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'
    },
    {
      student: 'Priya Sharma',
      action: 'Started "States of Matter" quiz',
      time: '3 hours ago',
      score: null,
      avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'
    },
    {
      student: 'Arjun Patel',
      action: 'Achieved "Week Warrior" badge',
      time: '5 hours ago',
      score: null,
      avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'
    },
    {
      student: 'Anita Desai',
      action: 'Completed physics lesson',
      time: '1 day ago',
      score: 87,
      avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'
    }
  ]
  
  const subjectProgress = [
    { subject: 'Mathematics', students: 28, avgScore: 82, color: 'bg-blue-500' },
    { subject: 'Science', students: 25, avgScore: 76, color: 'bg-green-500' },
    { subject: 'Physics', students: 18, avgScore: 71, color: 'bg-purple-500' },
    { subject: 'Chemistry', students: 15, avgScore: 68, color: 'bg-orange-500' }
  ]
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('welcome')}, {user.name}! 👨‍🏫
          </h1>
          <p className="text-gray-600">
            Monitor your class progress and student achievements
          </p>
        </motion.div>
      </div>
      
      {/* Class Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {classStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full ${stat.bg}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.title}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">{stat.change}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Subject Progress */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span>Subject Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {subjectProgress.map((subject, index) => (
                  <motion.div
                    key={subject.subject}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{subject.subject}</h4>
                        <p className="text-sm text-gray-600">
                          {subject.students} students • Avg: {subject.avgScore}%
                        </p>
                      </div>
                      <Badge variant={subject.avgScore >= 75 ? 'success' : 'default'}>
                        {subject.avgScore}%
                      </Badge>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${subject.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${subject.avgScore}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-green-600" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Create Lesson</h4>
                      <p className="text-xs text-gray-600">Add new content</p>
                    </div>
                  </div>
                </button>
                
                <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Award className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">View Analytics</h4>
                      <p className="text-xs text-gray-600">Detailed reports</p>
                    </div>
                  </div>
                </button>
                
                <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Users className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Manage Students</h4>
                      <p className="text-xs text-gray-600">Student profiles</p>
                    </div>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <span>{t('recentactivity')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={activity.avatar}
                      alt={activity.student}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{activity.student}</h4>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                  
                  {activity.score && (
                    <Badge variant={activity.score >= 90 ? 'success' : 'default'}>
                      {activity.score}%
                    </Badge>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}