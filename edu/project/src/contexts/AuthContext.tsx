import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, db } from '../lib/storage'
import { demoUsers } from '../lib/demo-data'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Initialize demo data
    const initializeData = async () => {
      try {
        const existingUsers = await db.users.toArray()
        if (existingUsers.length === 0) {
          await db.users.bulkAdd(demoUsers)
        }
        
        // Auto-login first demo user for prototype
        const demoUser = await db.users.get('user1')
        if (demoUser) {
          setUser(demoUser)
        }
      } catch (error) {
        console.error('Failed to initialize data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    initializeData()
  }, [])
  
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = await db.users.toArray()
      const foundUser = users.find(u => u.email === email)
      
      if (foundUser) {
        setUser(foundUser)
        return true
      }
      return false
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }
  
  const logout = () => {
    setUser(null)
  }
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}