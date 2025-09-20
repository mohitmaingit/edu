import Dexie, { Table } from 'dexie'

export interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'teacher'
  grade?: number
  xp: number
  level: number
  streak: number
  lastActive: Date
  badges: Badge[]
  avatar: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt: Date
}

export interface Lesson {
  id: string
  title: string
  description: string
  subject: 'math' | 'science' | 'physics' | 'chemistry'
  grade: number
  content: string
  duration: number
  xpReward: number
  completed: boolean
}

export interface Quiz {
  id: string
  lessonId: string
  title: string
  questions: Question[]
  timeLimit: number
  attempts: QuizAttempt[]
}

export interface Question {
  id: string
  type: 'multiple-choice' | 'drag-drop' | 'fill-blank'
  question: string
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface QuizAttempt {
  id: string
  userId: string
  quizId: string
  score: number
  answers: Record<string, string>
  completedAt: Date
  timeSpent: number
}

export interface Progress {
  id: string
  userId: string
  lessonId: string
  progress: number
  lastAccessed: Date
}

export class EduSparkDB extends Dexie {
  users!: Table<User>
  lessons!: Table<Lesson>
  quizzes!: Table<Quiz>
  attempts!: Table<QuizAttempt>
  progress!: Table<Progress>

  constructor() {
    super('EduSparkDB')
    this.version(1).stores({
      users: 'id, name, role, grade, xp, streak',
      lessons: 'id, subject, grade, title',
      quizzes: 'id, lessonId, title',
      attempts: 'id, userId, quizId, completedAt, score',
      progress: 'id, userId, lessonId, progress'
    })
  }
}

export const db = new EduSparkDB()