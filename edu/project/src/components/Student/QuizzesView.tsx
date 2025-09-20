import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Clock, Trophy, X, CheckCircle, XCircle, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Button } from '../ui/Button'
import { Progress } from '../ui/Progress'
import { db, Quiz, QuizAttempt, Question } from '../../lib/storage'
import { demoQuizzes } from '../../lib/demo-data'
import { useAuth } from '../../contexts/AuthContext'
import { generateId } from '../../lib/utils'

interface QuizModalProps {
  quiz: Quiz
  onClose: () => void
  onComplete: (score: number) => void
}

function QuizModal({ quiz, onClose, onComplete }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit * 60)
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  
  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleSubmit()
    }
  }, [timeLeft, showResults])
  
  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer })
  }
  
  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }
  
  const handleSubmit = () => {
    let correctAnswers = 0
    quiz.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++
      }
    })
    
    const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100)
    setScore(finalScore)
    setShowResults(true)
  }
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  const currentQ = quiz.questions[currentQuestion]
  
  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-xl p-8 max-w-md w-full text-center"
        >
          <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
            score >= 70 ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {score >= 70 ? (
              <CheckCircle className="w-8 h-8 text-green-600" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600" />
            )}
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {score >= 70 ? 'Great Job!' : 'Keep Trying!'}
          </h3>
          
          <p className="text-gray-600 mb-6">
            You scored {score}% on this quiz
          </p>
          
          <div className="space-y-3">
            <Button
              onClick={() => {
                onComplete(score)
                onClose()
              }}
              className="w-full"
            >
              Continue Learning
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full">
              Retry Quiz
            </Button>
          </div>
        </motion.div>
      </motion.div>
    )
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl w-full max-w-2xl max-h-screen overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{quiz.title}</h2>
            <p className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {formatTime(timeLeft)}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Progress */}
        <div className="px-6 py-3 border-b">
          <Progress value={((currentQuestion + 1) / quiz.questions.length) * 100} />
        </div>
        
        {/* Question */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">
            {currentQ.question}
          </h3>
          
          {currentQ.type === 'multiple-choice' && currentQ.options && (
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(currentQ.id, option)}
                  className={`w-full p-4 text-left border rounded-lg transition-colors ${
                    answers[currentQ.id] === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      answers[currentQ.id] === option
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {answers[currentQ.id] === option && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    {option}
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
        
        {/* Navigation */}
        <div className="flex items-center justify-between p-6 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          <div className="flex space-x-2">
            {quiz.questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentQuestion
                    ? 'bg-blue-500'
                    : answers[quiz.questions[index].id]
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          {currentQuestion === quiz.questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={!answers[currentQ.id]}
            >
              Submit Quiz
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!answers[currentQ.id]}
            >
              Next <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function QuizzesView() {
  const { user } = useAuth()
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
  
  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const existingQuizzes = await db.quizzes.toArray()
        if (existingQuizzes.length === 0) {
          await db.quizzes.bulkAdd(demoQuizzes)
          setQuizzes(demoQuizzes)
        } else {
          setQuizzes(existingQuizzes)
        }
      } catch (error) {
        console.error('Failed to load quizzes:', error)
        setQuizzes(demoQuizzes)
      }
    }
    
    loadQuizzes()
  }, [])
  
  const handleQuizComplete = async (score: number) => {
    if (!user || !selectedQuiz) return
    
    try {
      const attempt: QuizAttempt = {
        id: generateId(),
        userId: user.id,
        quizId: selectedQuiz.id,
        score,
        answers: {},
        completedAt: new Date(),
        timeSpent: 0
      }
      
      await db.attempts.add(attempt)
      
      // Update user XP
      const xpGain = Math.floor(score * 2) // 2 XP per percentage point
      const updatedUser = { ...user, xp: user.xp + xpGain }
      await db.users.update(user.id, updatedUser)
      
    } catch (error) {
      console.error('Failed to save quiz attempt:', error)
    }
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quizzes</h1>
          <p className="text-gray-600">
            Test your knowledge with interactive quizzes
          </p>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz, index) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Brain className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {quiz.timeLimit} min
                  </div>
                </div>
                <CardTitle className="text-lg">{quiz.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{quiz.questions.length} questions</span>
                    <div className="flex items-center">
                      <Trophy className="w-4 h-4 mr-1 text-yellow-500" />
                      <span>Up to {quiz.questions.length * 20} XP</span>
                    </div>
                  </div>
                  
                  {quiz.attempts.length > 0 ? (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Best Score</span>
                        <span className="font-medium text-green-600">
                          {Math.max(...quiz.attempts.map(a => a.score))}%
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setSelectedQuiz(quiz)}
                      >
                        Retry Quiz
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() => setSelectedQuiz(quiz)}
                    >
                      Start Quiz
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <AnimatePresence>
        {selectedQuiz && (
          <QuizModal
            quiz={selectedQuiz}
            onClose={() => setSelectedQuiz(null)}
            onComplete={handleQuizComplete}
          />
        )}
      </AnimatePresence>
    </div>
  )
}