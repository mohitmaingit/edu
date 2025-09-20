@@ .. @@
 import React from 'react'
-import { motion } from 'framer-motion'
+import { motion, AnimatePresence } from 'framer-motion'
 import { 
   Home, 
   BookOpen, 
   Brain, 
   TrendingUp, 
   Award,
   Users,
   User,
-  Settings,
-  Globe
+  Globe,
+  Menu,
+  X,
+  Bell,
+  Search
 } from 'lucide-react'
 import { useAuth } from '../../contexts/AuthContext'
 import { useLanguage } from '../../contexts/LanguageContext'
 import { Button } from '../ui/Button'
+import { Badge } from '../ui/Badge'
 
 interface NavigationProps {
   activeTab: string
   onTabChange: (tab: string) => void
 }
 
 export function Navigation({ activeTab, onTabChange }: NavigationProps) {
   const { user } = useAuth()
   const { language, setLanguage, t } = useLanguage()
+  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
+  const [notifications] = React.useState(3) // Mock notification count
   
   const studentTabs = [
     { id: 'dashboard', label: t('dashboard'), icon: Home },
     { id: 'lessons', label: t('lessons'), icon: BookOpen },
     { id: 'quizzes', label: t('quizzes'), icon: Brain },
     { id: 'progress', label: t('progress'), icon: TrendingUp },
     { id: 'rewards', label: t('rewards'), icon: Award },
     { id: 'profile', label: t('profile'), icon: User },
   ]
   
   const teacherTabs = [
     { id: 'dashboard', label: t('dashboard'), icon: Home },
     { id: 'students', label: 'Students', icon: Users },
     { id: 'analytics', label: 'Analytics', icon: TrendingUp },
     { id: 'lessons', label: t('lessons'), icon: BookOpen },
     { id: 'profile', label: t('profile'), icon: User },
   ]
   
   const tabs = user?.role === 'teacher' ? teacherTabs : studentTabs
   
   return (
-    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
+    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex justify-between h-16">
           <div className="flex">
             <div className="flex-shrink-0 flex items-center">
               <motion.div
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
+                whileHover={{ scale: 1.05 }}
                 className="flex items-center space-x-2"
               >
-                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
+                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                   <span className="text-white font-bold text-sm">E</span>
                 </div>
                 <span className="text-xl font-bold text-gray-900">EduSpark</span>
               </motion.div>
             </div>
             
             <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
               {tabs.map((tab) => (
-                <button
+                <motion.button
                   key={tab.id}
+                  whileHover={{ y: -2 }}
+                  whileTap={{ y: 0 }}
                   onClick={() => onTabChange(tab.id)}
                   className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                     activeTab === tab.id
                       ? 'border-blue-500 text-blue-600'
                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                   }`}
                 >
                   <tab.icon className="w-4 h-4 mr-2" />
                   {tab.label}
-                </button>
+                </motion.button>
               ))}
             </div>
           </div>
           
           <div className="flex items-center space-x-4">
+            {/* Search Button */}
+            <Button
+              variant="ghost"
+              size="sm"
+              className="hidden sm:flex"
+            >
+              <Search className="w-4 h-4" />
+            </Button>
+            
+            {/* Notifications */}
+            <div className="relative">
+              <Button
+                variant="ghost"
+                size="sm"
+                className="relative"
+              >
+                <Bell className="w-4 h-4" />
+                {notifications > 0 && (
+                  <Badge 
+                    variant="error" 
+                    className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center p-0 min-w-0"
+                  >
+                    {notifications}
+                  </Badge>
+                )}
+              </Button>
+            </div>
+            
+            {/* Language Toggle */}
             <Button
               variant="ghost"
               size="sm"
               onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
               className="flex items-center space-x-1"
             >
               <Globe className="w-4 h-4" />
               <span>{language.toUpperCase()}</span>
             </Button>
             
+            {/* Mobile Menu Button */}
+            <Button
+              variant="ghost"
+              size="sm"
+              className="sm:hidden"
+              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
+            >
+              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
+            </Button>
+            
             {user && (
-              <div className="flex items-center space-x-3">
+              <motion.div 
+                className="hidden sm:flex items-center space-x-3"
+                whileHover={{ scale: 1.02 }}
+              >
                 <div className="hidden sm:block text-right">
                   <p className="text-sm font-medium text-gray-900">{user.name}</p>
                   <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                 </div>
                 <img
                   src={user.avatar}
                   alt={user.name}
-                  className="w-8 h-8 rounded-full"
+                  className="w-8 h-8 rounded-full ring-2 ring-blue-100 hover:ring-blue-200 transition-all"
                 />
-              </div>
+              </motion.div>
             )}
           </div>
         </div>
       </div>
       
       {/* Mobile navigation */}
-      <div className="sm:hidden border-t border-gray-200">
-        <div className="px-2 py-3 space-y-1">
-          {tabs.map((tab) => (
-            <button
-              key={tab.id}
-              onClick={() => onTabChange(tab.id)}
-              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left ${
-                activeTab === tab.id
-                  ? 'bg-blue-50 text-blue-600'
-                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
-              }`}
-            >
-              <tab.icon className="w-4 h-4 mr-3" />
-              {tab.label}
-            </button>
-          ))}
+      <AnimatePresence>
+        {isMobileMenuOpen && (
+          <motion.div
+            initial={{ opacity: 0, height: 0 }}
+            animate={{ opacity: 1, height: 'auto' }}
+            exit={{ opacity: 0, height: 0 }}
+            className="sm:hidden border-t border-gray-200 bg-white"
+          >
+            <div className="px-2 py-3 space-y-1">
+              {/* User Profile on Mobile */}
+              {user && (
+                <div className="flex items-center space-x-3 px-2 py-3 border-b border-gray-100 mb-2">
+                  <img
+                    src={user.avatar}
+                    alt={user.name}
+                    className="w-10 h-10 rounded-full"
+                  />
+                  <div>
+                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
+                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
+                  </div>
+                </div>
+              )}
+              
+              {tabs.map((tab) => (
+                <motion.button
+                  key={tab.id}
+                  initial={{ opacity: 0, x: -20 }}
+                  animate={{ opacity: 1, x: 0 }}
+                  onClick={() => {
+                    onTabChange(tab.id)
+                    setIsMobileMenuOpen(false)
+                  }}
+                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left transition-colors ${
+                    activeTab === tab.id
+                      ? 'bg-blue-50 text-blue-600'
+                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
+                  }`}
+                >
+                  <tab.icon className="w-4 h-4 mr-3" />
+                  {tab.label}
+                </motion.button>
+              ))}
+            </div>
+          </motion.div>
+        )}
+      </AnimatePresence>
+      
+      {/* Mobile Menu Overlay */}
+      <AnimatePresence>
+        {isMobileMenuOpen && (
+          <motion.div
+            initial={{ opacity: 0 }}
+            animate={{ opacity: 1 }}
+            exit={{ opacity: 0 }}
+            className="fixed inset-0 bg-black bg-opacity-25 z-30 sm:hidden"
+            onClick={() => setIsMobileMenuOpen(false)}
+          />
+        )}
+      </AnimatePresence>
+    </nav>
+  )
+}