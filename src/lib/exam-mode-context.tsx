'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface ExamModeContextValue {
  isExamMode: boolean
  setExamMode: (mode: boolean) => void
}

const ExamModeContext = createContext<ExamModeContextValue>({
  isExamMode: false,
  setExamMode: () => {},
})

export function ExamModeProvider({ children }: { children: ReactNode }) {
  const [isExamMode, setIsExamMode] = useState(false)

  const setExamMode = useCallback((mode: boolean) => {
    setIsExamMode(mode)
  }, [])

  return (
    <ExamModeContext.Provider value={{ isExamMode, setExamMode }}>
      {children}
    </ExamModeContext.Provider>
  )
}

export function useExamMode() {
  return useContext(ExamModeContext)
}