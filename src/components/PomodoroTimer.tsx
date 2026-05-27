import { useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, Coffee, Timer } from 'lucide-react'
import { useTimerStore } from '@/stores/timerStore'

const DURATION_OPTIONS = [
  { label: '25分钟', value: 25 },
  { label: '45分钟', value: 45 },
  { label: '60分钟', value: 60 },
]

const BREAK_OPTIONS = [
  { label: '5分钟', value: 5 },
  { label: '10分钟', value: 10 },
  { label: '15分钟', value: 15 },
]

export default function PomodoroTimer() {
  const {
    duration,
    breakDuration,
    timeLeft,
    isRunning,
    isBreak,
    start,
    pause,
    reset,
    tick,
    setDuration,
    setBreakDuration,
  } = useTimerStore()

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        tick()
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, tick])

  const totalTime = isBreak ? breakDuration : duration
  const progress = totalTime > 0 ? (totalTime - timeLeft) / totalTime : 0
  const circumference = 2 * Math.PI * 140
  const strokeDashoffset = circumference * (1 - progress)

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-[320px] h-[320px] flex items-center justify-center">
        <svg
          className="absolute inset-0 -rotate-90"
          width="320"
          height="320"
          viewBox="0 0 320 320"
        >
          <circle
            cx="160"
            cy="160"
            r="140"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          <circle
            cx="160"
            cy="160"
            r="140"
            fill="none"
            stroke={isBreak ? '#4ade80' : '#f0a500'}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>

        <div className="flex flex-col items-center gap-1 z-10">
          <span className="text-sm text-white/50 font-medium tracking-widest uppercase flex items-center gap-2">
            {isBreak ? (
              <>
                <Coffee size={14} />
                休息中
              </>
            ) : (
              <>
                <Timer size={14} />
                专注中
              </>
            )}
          </span>
          <span
            className="text-6xl font-mono font-bold text-white tracking-tight"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300 hover:scale-110"
          title="重置"
        >
          <RotateCcw size={18} />
        </button>
        <button
          onClick={isRunning ? pause : start}
          className="w-16 h-16 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg"
          style={{
            background: isBreak
              ? 'linear-gradient(135deg, #4ade80, #22c55e)'
              : 'linear-gradient(135deg, #f0a500, #e09000)',
            boxShadow: isBreak
              ? '0 0 30px rgba(74,222,128,0.4)'
              : '0 0 30px rgba(240,165,0,0.4)',
          }}
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </button>
        <button
          onClick={() => {
            if (!isRunning && !isBreak) {
              setDuration(duration / 60)
            }
          }}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300 hover:scale-110"
          title="跳过"
          style={{ visibility: 'hidden' }}
        >
          <RotateCcw size={18} />
        </button>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40 w-16">专注时长</span>
          <div className="flex gap-1.5 flex-1">
            {DURATION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setDuration(opt.value)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                  duration === opt.value * 60
                    ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50'
                    : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/70'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40 w-16">休息时长</span>
          <div className="flex gap-1.5 flex-1">
            {BREAK_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setBreakDuration(opt.value)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                  breakDuration === opt.value * 60
                    ? 'bg-green-500/30 text-green-300 border border-green-500/50'
                    : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/70'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
