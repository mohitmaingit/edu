import { useState, useEffect } from 'react'

export function usePWA() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [isInstalled, setIsInstalled] = useState(false)
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])
  
  useEffect(() => {
    // Check if app is installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }
  }, [])
  
  const syncData = async () => {
    if (isOnline) {
      // Simulate sync with server
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Data synced with server')
      return true
    }
    return false
  }
  
  return {
    isOnline,
    isInstalled,
    syncData
  }
}