import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

export function calculateLevel(xp: number): number {
  return Math.floor(xp / 100) + 1
}

export function getXpForNextLevel(currentXp: number): number {
  const currentLevel = calculateLevel(currentXp)
  return currentLevel * 100 - currentXp
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}