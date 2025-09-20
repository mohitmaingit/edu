import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, CheckCircle, Clock, Trophy } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { Progress } from '../ui/Progress'
import { Badge } from '../ui/Badge'
import { Lesson } from '../../lib/storage'

interface LessonModalProps {
  lesson: Lesson | null
  isOpen: boolean
  onClose: () => void
  onComplete: (lessonId: string) => void
}

export function LessonModal({ lesson, isOpen, onClose, onComplete }: LessonModalProps) {
  const [currentProgress, setCurrentProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeSpent, setTimeSpent] = useState(0)
  
  React.useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isPlaying && currentProgress < 100) {
      interval = setInterval(() => {
        setCurrentProgress(prev => {
          const newProgress = Math.min(prev + 2, 100)
          if (newProgress === 100) {
            setIsPlaying(false)
          }
          return newProgress
        })
        setTimeSpent(prev => prev + 1)
      }, 1000)
    }
    
    return () => clearInterval(interval)
  }, [isPlaying, currentProgress])
  
  const handleComplete = () => {
    if (lesson) {
      onComplete(lesson.id)
      onClose()
    }
  }
  
  const handleReset = () => {
    setCurrentProgress(0)
    setTimeSpent(0)
    setIsPlaying(false)
  }
  
  if (!lesson) return null
  
  const isCompleted = currentProgress === 100
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={lesson.title}
      size="lg"
    >
      <div className="space-y-6">
        {/* Lesson Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${
              lesson.subject === 'math' ? 'bg-blue-100' :
              lesson.subject === 'science' ? 'bg-green-100' :
              lesson.subject === 'physics' ? 'bg-purple-100' : 'bg-orange-100'
            }`}>
              {lesson.subject === 'math' ? '🔢' :
               lesson.subject === 'science' ? '🔬' :
               lesson.subject === 'physics' ? '⚡' : '🧪'}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
              <p className="text-sm text-gray-600">{lesson.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="default">Grade {lesson.grade}</Badge>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {lesson.duration} min
            </div>
          </div>
        </div>
        
        {/* Progress */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">{currentProgress}%</span>
          </div>
          <Progress value={currentProgress} />
        </div>
        
        {/* Video Player Simulation */}
        <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700"
            animate={{
              scale: isPlaying ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: isPlaying ? Infinity : 0,
              ease: "easeInOut"
            }}
          />
          
          <div className="relative z-10 text-center text-white">
            <motion.div
              className="text-6xl mb-4"
              animate={{
                rotate: isPlaying ? 360 : 0,
              }}
              transition={{
                duration: 3,
                repeat: isPlaying ? Infinity : 0,
                ease: "linear"
              }}
            >
              {lesson.subject === 'math' ? '🔢' :
               lesson.subject === 'science' ? '🔬' :
               lesson.subject === 'physics' ? '⚡' : '🧪'}
            </motion.div>
            
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:bg-white hover:bg-opacity-20"
                disabled={isCompleted}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-white hover:bg-white hover:bg-opacity-20"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="mt-4 text-sm opacity-75">
              Time: {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
            </div>
          </div>
          
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-green-600 bg-opacity-90 flex items-center justify-center"
            >
              <div className="text-center text-white">
                <CheckCircle className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Lesson Complete!</h3>
                <div className="flex items-center justify-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-300" />
                  <span>+{lesson.xpReward} XP</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Lesson Content */}
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">
            {lesson.content}
          </p>
        </div>
        
        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span>Earn {lesson.xpReward} XP upon completion</span>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {isCompleted && (
              <Button onClick={handleComplete}>
                Complete Lesson
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}