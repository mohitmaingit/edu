import React, { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { Navigation } from './components/Layout/Navigation'
import { StudentDashboard } from './components/Student/StudentDashboard'
import { LessonsView } from './components/Student/LessonsView'
import { QuizzesView } from './components/Student/QuizzesView'
import { ProgressView } from './components/Student/ProgressView'
import { RewardsView } from './components/Student/RewardsView'
import { TeacherDashboard } from './components/Teacher/TeacherDashboard'
import { PWAPrompt } from './components/PWA/PWAPrompt'
import { motion, AnimatePresence } from 'framer-motion'
import { Wifi, WifiOff, RefreshCw } from 'lucide-react'
import { Button } from './components/ui/Button'
import { usePWA } from './hooks/usePWA'

function AppContent() {
  const { user, isLoading } = useAuth()
  const { isOnline, syncData } = usePWA()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isSyncing, setIsSyncing] = useState(false)
  
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration)
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })
    }
  }, [])
  
  const handleSync = async () => {
    setIsSyncing(true)
    await syncData()
    setIsSyncing(false)
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <div className="text-xl font-semibold text-gray-900 mb-2">EduSpark</div>
          <div className="text-gray-600">Loading your learning experience...</div>
        </div>
      </div>
    )
  }
  
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">E</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to EduSpark</h1>
          <p className="text-gray-600 mb-6">
            Your gamified STEM learning platform
          </p>
          <div className="text-sm text-gray-500">
            Demo mode - automatically logged in as Rahul Kumar
          </div>
        </motion.div>
      </div>
    )
  }
  
  const renderActiveTab = () => {
    if (user.role === 'teacher') {
      switch (activeTab) {
        case 'dashboard': return <TeacherDashboard />
        case 'students': return <div>Students Management (Coming Soon)</div>
        case 'analytics': return <div>Analytics (Coming Soon)</div>
        case 'lessons': return <LessonsView />
        case 'profile': return <div>Profile (Coming Soon)</div>
        default: return <TeacherDashboard />
      }
    } else {
      switch (activeTab) {
        case 'dashboard': return <StudentDashboard />
        case 'lessons': return <LessonsView />
        case 'quizzes': return <QuizzesView />
        case 'progress': return <ProgressView />
        case 'rewards': return <RewardsView />
        case 'profile': return <div>Profile (Coming Soon)</div>
        default: return <StudentDashboard />
      }
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Online/Offline Status */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 p-2 text-center text-sm text-white ${
          isOnline ? 'bg-green-600' : 'bg-red-600'
        }`}
        style={{ display: isOnline ? 'none' : 'block' }}
      >
        <div className="flex items-center justify-center space-x-2">
          <WifiOff className="w-4 h-4" />
          <span>You're offline - Some features may be limited</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleSync}
            disabled={isSyncing}
            className="text-white hover:bg-red-700"
          >
            {isSyncing ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
          </Button>
        </div>
      </motion.div>
      
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderActiveTab()}
        </motion.div>
      </AnimatePresence>
      
      <PWAPrompt />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App