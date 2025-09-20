# EduSpark - Gamified STEM Learning Platform

A comprehensive Progressive Web App (PWA) designed for rural students (Grades 6-12) featuring gamification, offline capabilities, and multilingual support.

## 🚀 Features

### Core Functionality
- **Student Dashboard**: Personalized learning experience with progress tracking
- **Teacher Dashboard**: Class management and analytics tools
- **Interactive Lessons**: STEM content with multimedia support
- **Adaptive Quizzing**: Difficulty adjustment based on performance
- **Gamification System**: Points, badges, streaks, and leaderboards

### PWA Features
- **Offline Support**: Service worker caching for core functionality
- **Installable**: Add to home screen capability
- **Responsive Design**: Mobile-first design with tablet and desktop support
- **Background Sync**: Automatic data synchronization when online

### Gamification Elements
- **XP System**: Earn experience points for completing activities
- **Level Progression**: User levels based on total XP earned
- **Badge Collection**: Achievements for various milestones
- **Daily Streaks**: Consecutive learning day tracking
- **Leaderboards**: Class-wide competition and rankings

### Multilingual Support
- **Language Toggle**: Switch between English and Hindi
- **Expandable**: Easy to add more languages
- **Localized Content**: UI elements and messages in selected language

## 🛠 Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: TailwindCSS with custom design system
- **UI Components**: Custom components with Radix UI primitives
- **Animations**: Framer Motion for smooth interactions
- **State Management**: React Context API
- **Offline Storage**: IndexedDB with Dexie.js
- **PWA**: Workbox service worker integration

## 🏗 Architecture

### File Structure
```
src/
├── components/
│   ├── Layout/
│   │   └── Navigation.tsx
│   ├── Student/
│   │   ├── StudentDashboard.tsx
│   │   ├── LessonsView.tsx
│   │   ├── QuizzesView.tsx
│   │   ├── ProgressView.tsx
│   │   └── RewardsView.tsx
│   ├── Teacher/
│   │   └── TeacherDashboard.tsx
│   ├── PWA/
│   │   └── PWAPrompt.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Progress.tsx
│       └── Badge.tsx
├── contexts/
│   ├── AuthContext.tsx
│   └── LanguageContext.tsx
├── lib/
│   ├── utils.ts
│   ├── storage.ts
│   └── demo-data.ts
└── hooks/
    └── usePWA.ts
```

### Data Models
- **User**: Student/teacher profiles with XP, level, and badges
- **Lesson**: STEM content with metadata and completion tracking
- **Quiz**: Interactive assessments with questions and attempts
- **Progress**: Individual lesson progress tracking
- **Badge**: Achievement system with unlock conditions

## 🎮 Gamification System

### XP & Levels
- Lessons: 80-120 XP based on difficulty
- Quizzes: 2 XP per percentage point scored
- Level calculation: Level = floor(XP / 100) + 1

### Badge System
- **First Steps**: Complete first lesson
- **Week Warrior**: 7-day learning streak
- **Quiz Master**: Score 100% on 5 quizzes
- **Subject Mastery**: Complete all lessons in a subject

### Adaptive Difficulty
- Quiz difficulty adjusts based on recent performance
- Lesson recommendations based on skill level
- Personalized learning paths

## 📱 PWA Implementation

### Service Worker Features
- **App Shell Caching**: Core UI components cached for offline use
- **Content Caching**: Lessons and quizzes stored locally
- **Background Sync**: Automatic sync when connection restored
- **Update Notifications**: Prompt users for new versions

### Offline Capabilities
- View previously accessed lessons
- Take quizzes offline (sync scores later)
- Progress tracking continues offline
- Badge notifications work offline

## 🌐 Deployment

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### PWA Testing
1. Build the production version
2. Serve over HTTPS (required for PWA features)
3. Test offline functionality by disabling network
4. Verify install prompt appears
5. Test background sync when reconnecting

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6) - Main actions and branding
- **Secondary**: Green (#10B981) - Success states and progress
- **Accent**: Purple (#8B5CF6) - Gamification elements
- **Warning**: Amber (#F59E0B) - Alerts and cautions
- **Error**: Red (#EF4444) - Error states

### Typography
- **Headings**: Inter font family, multiple weights
- **Body**: System font stack for optimal performance
- **Line Heights**: 120% for headings, 150% for body text

### Spacing
- **Base Unit**: 8px grid system
- **Component Padding**: 16px, 24px, 32px
- **Section Margins**: 32px, 48px, 64px

## 🔧 Customization

### Adding New Languages
1. Update `translations` object in `LanguageContext.tsx`
2. Add new language type to `Language` union
3. Update language selector UI

### Creating New Badge Types
1. Add badge definition to demo data
2. Implement unlock logic in gamification system
3. Update badge display components

### Adding New Subjects
1. Extend subject type in storage models
2. Add subject-specific styling and icons
3. Update lesson creation and filtering logic

## 🚀 Future Enhancements

- Real-time multiplayer quizzes
- Voice-to-text for accessibility
- AR/VR lesson integration
- Advanced analytics dashboard
- Parent/guardian portal
- Peer-to-peer learning features

## 📄 License

This project is part of a demo/prototype and is intended for educational purposes.

---

Built with ❤️ for rural STEM education