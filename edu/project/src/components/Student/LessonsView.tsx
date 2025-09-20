import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Clock, Trophy, Filter, Search, Play } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { Progress } from '../ui/Progress'
import { db, Lesson } from '../../lib/storage'
import { demoLessons } from '../../lib/demo-data'
import { useAuth } from '../../contexts/AuthContext'

export function LessonsView() {
  const { user } = useAuth()
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [filteredLessons, setFilteredLessons] = useState<Lesson[]>([])
  const [selectedSubject, setSelectedSubject] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  useEffect(() => {
    const loadLessons = async () => {
      try {
        const existingLessons = await db.lessons.toArray()
        if (existingLessons.length === 0) {
          await db.lessons.bulkAdd(demoLessons)
          setLessons(demoLessons)
          setFilteredLessons(demoLessons)
        } else {
          setLessons(existingLessons)
          setFilteredLessons(existingLessons)
        }
      } catch (error) {
        console.error('Failed to load lessons:', error)
        setLessons(demoLessons)
        setFilteredLessons(demoLessons)
      }
    }
    
    loadLessons()
  }, [])
  
  useEffect(() => {
    let filtered = lessons
    
    if (selectedSubject !== 'all') {
      filtered = filtered.filter(lesson => lesson.subject === selectedSubject)
    }
    
    if (searchQuery) {
      filtered = filtered.filter(lesson =>
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    setFilteredLessons(filtered)
  }, [lessons, selectedSubject, searchQuery])
  
  const subjects = [
    { id: 'all', name: 'All Subjects', icon: '📚' },
    { id: 'math', name: 'Mathematics', icon: '🔢' },
    { id: 'science', name: 'Science', icon: '🔬' },
    { id: 'physics', name: 'Physics', icon: '⚡' },
    { id: 'chemistry', name: 'Chemistry', icon: '🧪' }
  ]
  
  const getSubjectColor = (subject: string) => {
    const colors = {
      math: 'from-blue-400 to-blue-600',
      science: 'from-green-400 to-green-600',
      physics: 'from-purple-400 to-purple-600',
      chemistry: 'from-orange-400 to-orange-600'
    }
    return colors[subject as keyof typeof colors] || 'from-gray-400 to-gray-600'
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lessons</h1>
          <p className="text-gray-600">
            Explore interactive STEM lessons tailored for your grade level
          </p>
        </motion.div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search lessons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {subjects.map((subject) => (
            <Button
              key={subject.id}
              variant={selectedSubject === subject.id ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedSubject(subject.id)}
              className="whitespace-nowrap"
            >
              <span className="mr-2">{subject.icon}</span>
              {subject.name}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
              <div className={`h-32 bg-gradient-to-br ${getSubjectColor(lesson.subject)} rounded-t-xl relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute top-4 left-4">
                  <Badge variant="default" className="bg-white bg-opacity-20 text-white border-white border-opacity-30">
                    Grade {lesson.grade}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-3xl mb-1">
                    {lesson.subject === 'math' ? '🔢' :
                     lesson.subject === 'science' ? '🔬' :
                     lesson.subject === 'physics' ? '⚡' : '🧪'}
                  </div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="bg-white bg-opacity-20 rounded-full p-3 backdrop-blur-sm"
                  >
                    <Play className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {lesson.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {lesson.duration} min
                  </div>
                  <div className="flex items-center text-sm text-yellow-600">
                    <Trophy className="w-4 h-4 mr-1" />
                    {lesson.xpReward} XP
                  </div>
                </div>
                
                {lesson.completed ? (
                  <div className="space-y-3">
                    <Progress value={100} className="h-2" />
                    <div className="flex justify-between items-center">
                      <Badge variant="success">Completed</Badge>
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Progress value={0} className="h-2" />
                    <Button className="w-full" size="sm">
                      Start Lesson
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {filteredLessons.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No lessons found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </motion.div>
      )}
    </div>
  )
}