import React, { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'hi'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    lessons: 'Lessons',
    quizzes: 'Quizzes',
    progress: 'Progress',
    rewards: 'Rewards',
    leaderboard: 'Leaderboard',
    profile: 'Profile',
    
    // Student Dashboard
    welcome: 'Welcome back',
    continuelearning: 'Continue Learning',
    dailystreak: 'Daily Streak',
    totalxp: 'Total XP',
    level: 'Level',
    recentbadges: 'Recent Badges',
    
    // Teacher Dashboard
    classstats: 'Class Statistics',
    totalstudents: 'Total Students',
    avgprogress: 'Average Progress',
    completionrate: 'Completion Rate',
    recentactivity: 'Recent Activity',
    
    // Common
    start: 'Start',
    continue: 'Continue',
    complete: 'Complete',
    retry: 'Retry',
    submit: 'Submit',
    cancel: 'Cancel',
    next: 'Next',
    previous: 'Previous',
    close: 'Close'
  },
  hi: {
    // Navigation
    dashboard: 'डैशबोर्ड',
    lessons: 'पाठ',
    quizzes: 'प्रश्नोत्तरी',
    progress: 'प्रगति',
    rewards: 'पुरस्कार',
    leaderboard: 'लीडरबोर्ड',
    profile: 'प्रोफ़ाइल',
    
    // Student Dashboard
    welcome: 'वापसी पर स्वागत',
    continuelearning: 'सीखना जारी रखें',
    dailystreak: 'दैनिक स्ट्रीक',
    totalxp: 'कुल XP',
    level: 'स्तर',
    recentbadges: 'हाल के बैज',
    
    // Teacher Dashboard
    classstats: 'कक्षा सांख्यिकी',
    totalstudents: 'कुल छात्र',
    avgprogress: 'औसत प्रगति',
    completionrate: 'पूर्णता दर',
    recentactivity: 'हाल की गतिविधि',
    
    // Common
    start: 'शुरू करें',
    continue: 'जारी रखें',
    complete: 'पूरा करें',
    retry: 'फिर कोशिश करें',
    submit: 'जमा करें',
    cancel: 'रद्द करें',
    next: 'अगला',
    previous: 'पिछला',
    close: 'बंद करें'
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key
  }
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}