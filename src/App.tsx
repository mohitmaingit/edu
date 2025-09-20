@@ .. @@
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
+import { ToastContainer, useToast } from './components/ui/Toast'
+import { LoadingSpinner } from './components/ui/LoadingSpinner'
 import { motion, AnimatePresence } from 'framer-motion'
-import { Wifi, WifiOff, RefreshCw } from 'lucide-react'
+import { WifiOff, RefreshCw } from 'lucide-react'
 import { Button } from './components/ui/Button'
 import { usePWA } from './hooks/usePWA'
 
 function AppContent() {
   const { user, isLoading } = useAuth()
   const { isOnline, syncData } = usePWA()
+  const { toasts, removeToast, info } = useToast()
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
   
+  useEffect(() => {
+    // Show welcome message when user loads
+    if (user && !isLoading) {
+      const timer = setTimeout(() => {
+        info('Welcome back!', `Ready to continue your learning journey, ${user.name}?`)
+      }, 1000)
+      return () => clearTimeout(timer)
+    }
+  }, [user, isLoading, info])
+  
   const handleSync = async () => {
     setIsSyncing(true)
     await syncData()
     setIsSyncing(false)
   }
   
   if (isLoading) {
     return (
-      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
+      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
         <div className="text-center">
-          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
+          <motion.div 
+            className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg"
+            animate={{ 
+              scale: [1, 1.1, 1],
+              rotate: [0, 180, 360]
+            }}
+            transition={{ 
+              duration: 2, 
+              repeat: Infinity,
+              ease: "easeInOut"
+            }}
+          >
             <span className="text-white font-bold text-xl">E</span>
-          </div>
+          </motion.div>
           <div className="text-xl font-semibold text-gray-900 mb-2">EduSpark</div>
-          <div className="text-gray-600">Loading your learning experience...</div>
+          <div className="text-gray-600 mb-4">Loading your learning experience...</div>
+          <LoadingSpinner size="md" />
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
-          className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center"
+          className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center backdrop-blur-sm"
         >
-          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
+          <motion.div 
+            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg"
+            whileHover={{ scale: 1.05, rotate: 5 }}
+          >
             <span className="text-white font-bold text-2xl">E</span>
-          </div>
+          </motion.div>
           <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to EduSpark</h1>
           <p className="text-gray-600 mb-6">
             Your gamified STEM learning platform
           </p>
-          <div className="text-sm text-gray-500">
+          <motion.div 
+            className="text-sm text-gray-500"
+            animate={{ opacity: [0.5, 1, 0.5] }}
+            transition={{ duration: 2, repeat: Infinity }}
+          >
             Demo mode - automatically logged in as Rahul Kumar
-          </div>
+          </motion.div>
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
-    <div className="min-h-screen bg-gray-50">
+    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
       {/* Online/Offline Status */}
-      <motion.div
-        initial={{ opacity: 0, y: -50 }}
-        animate={{ opacity: 1, y: 0 }}
-        className={`fixed top-0 left-0 right-0 z-50 p-2 text-center text-sm text-white ${
-          isOnline ? 'bg-green-600' : 'bg-red-600'
-        }`}
-        style={{ display: isOnline ? 'none' : 'block' }}
-      >
-        <div className="flex items-center justify-center space-x-2">
-          <WifiOff className="w-4 h-4" />
-          <span>You're offline - Some features may be limited</span>
-          <Button
-            size="sm"
-            variant="ghost"
-            onClick={handleSync}
-            disabled={isSyncing}
-            className="text-white hover:bg-red-700"
-          >
-            {isSyncing ? (
-              <RefreshCw className="w-4 h-4 animate-spin" />
-            ) : (
-              <RefreshCw className="w-4 h-4" />
-            )}
-          </Button>
-        </div>
-      </motion.div>
+      <AnimatePresence>
+        {!isOnline && (
+          <motion.div
+            initial={{ opacity: 0, y: -50 }}
+            animate={{ opacity: 1, y: 0 }}
+            exit={{ opacity: 0, y: -50 }}
+            className="fixed top-0 left-0 right-0 z-50 p-3 text-center text-sm text-white bg-gradient-to-r from-red-500 to-red-600 shadow-lg"
+          >
+            <div className="flex items-center justify-center space-x-2">
+              <WifiOff className="w-4 h-4" />
+              <span>You're offline - Some features may be limited</span>
+              <Button
+                size="sm"
+                variant="ghost"
+                onClick={handleSync}
+                disabled={isSyncing}
+                className="text-white hover:bg-red-700 ml-4"
+              >
+                {isSyncing ? (
+                  <RefreshCw className="w-4 h-4 animate-spin" />
+                ) : (
+                  <RefreshCw className="w-4 h-4" />
+                )}
+              </Button>
+            </div>
+          </motion.div>
+        )}
+      </AnimatePresence>
       
       <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
       
       <AnimatePresence mode="wait">
         <motion.div
           key={activeTab}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
-          transition={{ duration: 0.2 }}
+          transition={{ duration: 0.3, ease: "easeInOut" }}
         >
           {renderActiveTab()}
         </motion.div>
       </AnimatePresence>
       
       <PWAPrompt />
+      <ToastContainer toasts={toasts} onRemove={removeToast} />
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