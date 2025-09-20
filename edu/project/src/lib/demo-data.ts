import { User, Lesson, Quiz, Badge } from './storage'

export const demoUsers: User[] = [
  {
    id: 'user1',
    name: 'Rahul Kumar',
    email: 'rahul@demo.com',
    role: 'student',
    grade: 8,
    xp: 1250,
    level: 13,
    streak: 7,
    lastActive: new Date(),
    badges: [
      {
        id: 'first-lesson',
        name: 'First Steps',
        description: 'Complete your first lesson',
        icon: '🌟',
        unlockedAt: new Date('2024-01-15')
      },
      {
        id: 'week-streak',
        name: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        icon: '🔥',
        unlockedAt: new Date('2024-01-20')
      }
    ],
    avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: 'user2',
    name: 'Priya Sharma',
    email: 'priya@demo.com',
    role: 'student',
    grade: 10,
    xp: 890,
    level: 9,
    streak: 3,
    lastActive: new Date(),
    badges: [
      {
        id: 'quiz-master',
        name: 'Quiz Master',
        description: 'Score 100% on 5 quizzes',
        icon: '🎯',
        unlockedAt: new Date('2024-01-18')
      }
    ],
    avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: 'teacher1',
    name: 'Dr. Anil Verma',
    email: 'anil@demo.com',
    role: 'teacher',
    xp: 0,
    level: 1,
    streak: 0,
    lastActive: new Date(),
    badges: [],
    avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  }
]

export const demoLessons: Lesson[] = [
  {
    id: 'lesson1',
    title: 'Introduction to Algebra',
    description: 'Learn the basics of algebraic expressions and equations',
    subject: 'math',
    grade: 8,
    content: 'In this lesson, we will explore the fundamentals of algebra...',
    duration: 30,
    xpReward: 100,
    completed: true
  },
  {
    id: 'lesson2',
    title: 'States of Matter',
    description: 'Understand the different states of matter and their properties',
    subject: 'science',
    grade: 8,
    content: 'Matter exists in different states: solid, liquid, gas...',
    duration: 25,
    xpReward: 80,
    completed: false
  },
  {
    id: 'lesson3',
    title: 'Newton\'s Laws of Motion',
    description: 'Discover the fundamental laws that govern motion',
    subject: 'physics',
    grade: 10,
    content: 'Newton\'s three laws of motion explain how objects move...',
    duration: 40,
    xpReward: 120,
    completed: false
  }
]

export const demoQuizzes: Quiz[] = [
  {
    id: 'quiz1',
    lessonId: 'lesson1',
    title: 'Algebra Basics Quiz',
    timeLimit: 10,
    attempts: [],
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'What is the value of x in the equation: 2x + 5 = 11?',
        options: ['2', '3', '4', '5'],
        correctAnswer: '3',
        explanation: '2x + 5 = 11, so 2x = 6, therefore x = 3',
        difficulty: 'easy'
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Simplify: 3x + 2x',
        options: ['5x', '6x', '5x²', '6'],
        correctAnswer: '5x',
        explanation: 'Like terms can be added: 3x + 2x = 5x',
        difficulty: 'easy'
      }
    ]
  },
  {
    id: 'quiz2',
    lessonId: 'lesson2',
    title: 'States of Matter Quiz',
    timeLimit: 8,
    attempts: [],
    questions: [
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'Which state of matter has a definite shape and volume?',
        options: ['Solid', 'Liquid', 'Gas', 'Plasma'],
        correctAnswer: 'Solid',
        explanation: 'Solids have both definite shape and volume due to strong intermolecular forces',
        difficulty: 'easy'
      }
    ]
  }
]