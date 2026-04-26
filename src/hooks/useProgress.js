import { useState, useCallback } from 'react'

const STORAGE_KEY = 'ai-curriculum-progress'

function loadProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : {}
  } catch {
    return {}
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // ignore storage errors
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(loadProgress)

  const markComplete = useCallback((lessonId) => {
    setProgress(prev => {
      const next = { ...prev, [lessonId]: true }
      saveProgress(next)
      return next
    })
  }, [])

  const isComplete = useCallback((lessonId) => {
    return !!progress[lessonId]
  }, [progress])

  const getUnitProgress = useCallback((unit) => {
    const total = unit.lessons.length
    const done = unit.lessons.filter(l => progress[l.id]).length
    return { done, total, percent: total > 0 ? Math.round((done / total) * 100) : 0 }
  }, [progress])

  const getTotalProgress = useCallback((units) => {
    const total = units.reduce((s, u) => s + u.lessons.length, 0)
    const done = units.reduce((s, u) => s + u.lessons.filter(l => progress[l.id]).length, 0)
    return { done, total, percent: total > 0 ? Math.round((done / total) * 100) : 0 }
  }, [progress])

  return { progress, markComplete, isComplete, getUnitProgress, getTotalProgress }
}
