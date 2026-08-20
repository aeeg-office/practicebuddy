'use client'

import { useEffect, useState, useCallback, useRef } from "react"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimerProps {
  /** Time limit in seconds */
  timeLimit: number
  /** Called when the timer reaches 0 */
  onTimeUp: () => void
  /** Pause the countdown (e.g. when switching away) */
  paused?: boolean
}

function getTimeStatus(remaining: number, total: number): {
  color: string
  barColor: string
  bgClass: string
  textClass: string
} {
  const ratio = remaining / total
  if (ratio <= 0.15) {
    return {
      color: "red",
      barColor: "bg-red-500",
      bgClass: "bg-red-50 border-red-200",
      textClass: "text-red-700",
    }
  }
  if (ratio <= 0.33) {
    return {
      color: "yellow",
      barColor: "bg-yellow-500",
      bgClass: "bg-yellow-50 border-yellow-200",
      textClass: "text-yellow-800",
    }
  }
  return {
    color: "green",
    barColor: "bg-[rgb(71,32,183)]",
    bgClass: "bg-white border-gray-200",
    textClass: "text-[rgb(30,39,97)]",
  }
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

export default function Timer({ timeLimit, onTimeUp, paused = false }: TimerProps) {
  const [remaining, setRemaining] = useState<number>(timeLimit)
  const onTimeUpRef = useRef(onTimeUp)
  onTimeUpRef.current = onTimeUp

  useEffect(() => {
    setRemaining(timeLimit)
  }, [timeLimit])

  useEffect(() => {
    if (paused) return

    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(id)
          // Defer callback to avoid state update during render
          setTimeout(() => onTimeUpRef.current(), 0)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(id)
  }, [paused, timeLimit])

  const progress = timeLimit > 0 ? remaining / timeLimit : 0
  const status = getTimeStatus(remaining, timeLimit)
  const isCritical = progress <= 0.15

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border px-4 py-2.5 transition-colors duration-500",
        status.bgClass,
      )}
      role="timer"
      aria-label={`${formatTime(remaining)} remaining`}
    >
      {/* Icon + Time */}
      <div className="flex items-center gap-1.5 shrink-0">
        <Clock
          className={cn("h-4 w-4 transition-colors duration-500", {
            "text-red-500": status.color === "red",
            "text-yellow-500": status.color === "yellow",
            "text-[rgb(71,32,183)]": status.color === "green",
          })}
        />
        <span
          className={cn(
            "font-bold tabular-nums transition-colors duration-500",
            status.textClass,
            isCritical && "animate-pulse",
          )}
        >
          {formatTime(remaining)}
        </span>
      </div>

      {/* Progress bar */}
      <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden min-w-[60px]">
        <div
          className={cn("h-full rounded-full transition-all duration-700 ease-linear", status.barColor)}
          style={{ width: `${Math.max(0, progress * 100)}%` }}
        />
      </div>
    </div>
  )
}